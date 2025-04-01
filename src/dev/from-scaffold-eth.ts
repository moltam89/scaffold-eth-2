import path from "path";
import fs from "fs";
import { execa } from "execa";
import { EXTERNAL_EXTENSIONS_DIR, ncpPromise, prettyLog, TARGET_EXTENSION_DIR } from "./common";
import { assertRepoExists, parseExtensionString } from "../utils/common";

const DELETED_FILES_LOG = "deletedFiles.log";
const COMMIT_HASH_LOG = "commitHash.log";

const getDeletedAndRenamedFilesSinceCommit = async (projectPath: string, commitHash: string): Promise<string[]> => {
  const { stdout: gitOutput } = await execa(
    "git",
    ["diff", "--diff-filter=DR", "--name-status", `${commitHash}..HEAD`],
    { cwd: projectPath },
  );

  // Process the output to extract deleted and renamed files
  const deletedAndRenamedFiles = gitOutput
    .split("\n") // Split into lines
    .filter(Boolean) // Remove empty lines
    .map(line => {
      const parts = line.split("\t");
      if (line.startsWith("D")) {
        return parts[1]; // For deleted files, return the file name
      } else if (line.startsWith("R")) {
        return parts[1]; // For renamed files, return the original file name
      }
      return null; // Ignore other cases
    })
    .filter(Boolean); // Remove null entries

  return deletedAndRenamedFiles as string[];
};

const getChangedFilesSinceCommit = async (projectPath: string, commitHash: string): Promise<string[]> => {
  const { stdout } = await execa("git", ["diff", "--diff-filter=d", "--name-only", `${commitHash}..HEAD`], {
    cwd: projectPath,
  });

  return stdout.split("\n").filter(Boolean);
};

const createDirectories = async (filePath: string, projectName: string) => {
  const dirPath = path.join(EXTERNAL_EXTENSIONS_DIR, projectName, TARGET_EXTENSION_DIR, path.dirname(filePath));
  await fs.promises.mkdir(dirPath, { recursive: true });
};

const copyChangedFiles = async (changedFiles: string[], projectName: string, projectPath: string) => {
  for (const file of changedFiles) {
    const sourcePath = path.resolve(projectPath, file);
    const destPath = path.join(EXTERNAL_EXTENSIONS_DIR, projectName, TARGET_EXTENSION_DIR, file);
    if (!fs.existsSync(sourcePath)) continue;
    await createDirectories(file, projectName);
    await ncpPromise(sourcePath, destPath);
    prettyLog.success(`Copied changed file: ${file}`, 2);
  }
};

const logCommitHash = async (commitHash: string, projectPath: string) => {
  const logPath = path.join(EXTERNAL_EXTENSIONS_DIR, projectPath, TARGET_EXTENSION_DIR, COMMIT_HASH_LOG);
  await fs.promises.writeFile(logPath, commitHash, "utf8");
  prettyLog.success(`Commit hash logged to ${logPath}\n`, 1);
};

const logDeletedFiles = async (deletedFiles: string[], projectPath: string) => {
  const logPath = path.join(EXTERNAL_EXTENSIONS_DIR, projectPath, TARGET_EXTENSION_DIR, DELETED_FILES_LOG);
  const logContent = deletedFiles.join("\n");
  await fs.promises.writeFile(logPath, logContent, "utf8");
  console.log("");
  console.log("Deleted files:", deletedFiles);
  prettyLog.success(`Deleted files logged to ${logPath}\n`, 1);
};

const getMergeBaseCommitHash = async (projectPath: string): Promise<string> => {
  try {
    // Add the scaffold-eth-2 remote if not already added
    await execa("git", ["remote", "add", "scaffold-eth-2", "https://github.com/scaffold-eth/scaffold-eth-2"], {
      cwd: projectPath,
      reject: false, // Ignore errors if remote already exists
    });

    // Fetch the branches without tags
    await execa("git", ["fetch", "scaffold-eth-2", "main", "--no-tags"], { cwd: projectPath });
    await execa("git", ["fetch", "scaffold-eth-2", "foundry", "--no-tags"], { cwd: projectPath });

    // Get the merge bases
    const { stdout: mainMergeBase } = await execa("git", ["merge-base", "HEAD", "scaffold-eth-2/main"], {
      cwd: projectPath,
    });

    const { stdout: foundryMergeBase } = await execa("git", ["merge-base", "HEAD", "scaffold-eth-2/foundry"], {
      cwd: projectPath,
    });

    if (!mainMergeBase && !foundryMergeBase) {
      throw new Error("No  merge base with scaffold-eth-2");
    }

    if (mainMergeBase === foundryMergeBase) {
      return mainMergeBase;
    }

    return foundryMergeBase;
  } catch (err: any) {
    throw new Error(`Failed to get merge base: ${err.message}`);
  }
};

const initGitRepo = async (targetPath: string) => {
  try {
    const gitDir = path.join(targetPath, ".git");
    if (fs.existsSync(gitDir)) {
      return; // Git repository already exists
    }

    await execa("git", ["init"], { cwd: targetPath });
    await execa("git", ["add", "."], { cwd: targetPath });
    await execa("git", ["commit", "-m", "Initial commit"], { cwd: targetPath });

    prettyLog.success(`Initialized git repository and made initial commit in ${targetPath}`, 1);
  } catch (error: any) {
    prettyLog.error(`Failed to initialize git repository: ${error.message}`);
  }
};

// Todo: check yarn.lock file

export const createExtensionFromScaffoldEth = async (
  projectPath: string,
  fromScaffoldEth: boolean,
  scaffoldEthSource: string | null,
) => {
  try {
    console.log("projectPath", projectPath);
    console.log("fromScaffoldEth", fromScaffoldEth);
    console.log("scaffoldEthSource", scaffoldEthSource);

    if (scaffoldEthSource) {
      const { githubUrl, githubBranchUrl, branch, owner } = parseExtensionString(scaffoldEthSource);

      console.log("githubUrl", githubUrl);
      console.log("githubBranchUrl", githubBranchUrl);
      console.log("branch", branch);
      console.log("owner", owner);

      await assertRepoExists(githubBranchUrl, githubUrl);
    }

    const projectName = path.basename(projectPath);

    prettyLog.info(`Extension name: ${projectName}\n`);

    const mergeBaseCommitHash = await getMergeBaseCommitHash(projectPath);
    console.log("mergeBase", mergeBaseCommitHash);

    prettyLog.info("Getting list of changed files...", 1);
    const changedFiles = await getChangedFilesSinceCommit(projectPath, mergeBaseCommitHash);
    const deletedAndRenamedFiles = await getDeletedAndRenamedFilesSinceCommit(projectPath, mergeBaseCommitHash);

    if (!changedFiles.length && !deletedAndRenamedFiles.length) {
      prettyLog.warning("No files to process.");
      return;
    }

    if (changedFiles.length) {
      await copyChangedFiles(changedFiles, projectName, projectPath);
    }

    if (deletedAndRenamedFiles.length) {
      await logDeletedFiles(deletedAndRenamedFiles, projectPath);
    }

    await logCommitHash(mergeBaseCommitHash, projectName);

    await initGitRepo(path.join(EXTERNAL_EXTENSIONS_DIR, projectName));

    prettyLog.info(`Files processed successfully, updated ${EXTERNAL_EXTENSIONS_DIR}/${projectName} directory.`);
  } catch (err: any) {
    prettyLog.error(`Error: ${err.message}`);
  }
};
