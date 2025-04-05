import path from "path";
import fs from "fs";
import { execa } from "execa";
import { EXTERNAL_EXTENSIONS_DIR, ncpPromise, prettyLog, TARGET_EXTENSION_DIR } from "./common";
import { assertRepoExists, parseExtensionString, setUpRepository } from "../utils/common";
import { SOLIDITY_FRAMEWORKS } from "../utils/consts";

export const DELETED_FILES_LOG = "deletedFiles.log";
export const COMMIT_HASH_LOG = "commitHash.log";
export const SOLIDITY_FRAMEWORK_LOG = "solidityFramework.log";

const getDeletedAndRenamedFilesSinceCommit = async (projectName: string, commitHash: string): Promise<string[]> => {
  const { stdout: gitOutput } = await execa(
    "git",
    ["diff", "--diff-filter=DR", "--name-status", `${commitHash}..HEAD`],
    { cwd: projectName },
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

const getChangedFilesSinceCommit = async (projectName: string, commitHash: string): Promise<string[]> => {
  const { stdout } = await execa("git", ["diff", "--diff-filter=d", "--name-only", `${commitHash}..HEAD`], {
    cwd: projectName,
  });

  return stdout.split("\n").filter(Boolean);
};

const createDirectories = async (filePath: string, projectName: string) => {
  const dirPath = path.join(EXTERNAL_EXTENSIONS_DIR, projectName, TARGET_EXTENSION_DIR, path.dirname(filePath));
  await fs.promises.mkdir(dirPath, { recursive: true });
};

const copyChangedFiles = async (changedFiles: string[], projectName: string) => {
  for (const file of changedFiles) {
    const sourcePath = path.resolve(projectName, file);
    const destPath = path.join(EXTERNAL_EXTENSIONS_DIR, projectName, TARGET_EXTENSION_DIR, file);
    if (!fs.existsSync(sourcePath)) continue;
    await createDirectories(file, projectName);
    await ncpPromise(sourcePath, destPath);
  }
};

const logData = async (projectName: string, fileName: string, fileContent: string) => {
  const logPath = path.join(EXTERNAL_EXTENSIONS_DIR, projectName, TARGET_EXTENSION_DIR, fileName);
  await fs.promises.writeFile(logPath, fileContent, "utf8");
  prettyLog.success(`${fileName} logged to ${logPath}\n`, 1);
};

const getMergeBaseCommitHash = async (
  projectName: string,
): Promise<{ mergeBaseCommitHash: string; solidityFramework: string }> => {
  try {
    // Add the scaffold-eth-2 remote if not already added
    await execa("git", ["remote", "add", "scaffold-eth-2", "https://github.com/scaffold-eth/scaffold-eth-2"], {
      cwd: projectName,
      reject: false, // Ignore errors if remote already exists
    });

    // Fetch the branches without tags
    await execa("git", ["fetch", "scaffold-eth-2", "main", "--no-tags"], { cwd: projectName });
    await execa("git", ["fetch", "scaffold-eth-2", "foundry", "--no-tags"], { cwd: projectName });

    // Get the merge bases
    const { stdout: mainMergeBase } = await execa("git", ["merge-base", "HEAD", "scaffold-eth-2/main"], {
      cwd: projectName,
    });

    const { stdout: foundryMergeBase } = await execa("git", ["merge-base", "HEAD", "scaffold-eth-2/foundry"], {
      cwd: projectName,
    });

    if (!mainMergeBase && !foundryMergeBase) {
      throw new Error("No  merge base with scaffold-eth-2");
    }

    console.log("mainMergeBase", mainMergeBase);
    console.log("foundryMergeBase", foundryMergeBase);

    if (mainMergeBase === foundryMergeBase) {
      return { mergeBaseCommitHash: mainMergeBase, solidityFramework: SOLIDITY_FRAMEWORKS.HARDHAT };
    }

    return { mergeBaseCommitHash: foundryMergeBase, solidityFramework: SOLIDITY_FRAMEWORKS.FOUNDRY };
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

    prettyLog.success(`Initialized git repository and made initial commit in ${targetPath}\n`, 1);
  } catch (error: any) {
    prettyLog.error(`Failed to initialize git repository: ${error.message}`);
  }
};

// Todo: check yarn.lock file
// Todo: yarn create-extension scaffold-eth-2 -f -f moltam89/scaffold-eth-2:UniswapX

export const createExtensionFromScaffoldEth = async (projectName: string, scaffoldEthRepo: string | null) => {
  try {
    let cleanUpProjectNameFolder = false;

    if (scaffoldEthRepo) {
      const { githubUrl, githubBranchUrl, branch } = parseExtensionString(scaffoldEthRepo);

      await assertRepoExists(githubBranchUrl, githubUrl);

      prettyLog.info(`Creating ${projectName} folder and cloning ${githubBranchUrl}...`, 1);

      await setUpRepository({ repository: githubUrl, branch }, projectName, true);
      cleanUpProjectNameFolder = true;

      prettyLog.success(`Cloned ${githubBranchUrl} into ${projectName}\n`, 1);
    }

    prettyLog.info("Finding merge base commit hash...", 1);
    const { mergeBaseCommitHash, solidityFramework } = await getMergeBaseCommitHash(projectName);
    prettyLog.success(`Merge base commit hash: ${mergeBaseCommitHash}\n`, 1);

    prettyLog.info("Getting list of changed files...", 1);
    const changedFiles = await getChangedFilesSinceCommit(projectName, mergeBaseCommitHash);
    const deletedAndRenamedFiles = await getDeletedAndRenamedFilesSinceCommit(projectName, mergeBaseCommitHash);

    if (!changedFiles.length && !deletedAndRenamedFiles.length) {
      prettyLog.warning("No files to process.");
      return;
    }

    if (changedFiles.length) {
      await copyChangedFiles(changedFiles, projectName);
      prettyLog.success(`Copied ${changedFiles.length} changed files\n`, 1);
    }

    if (deletedAndRenamedFiles.length) {
      await logData(projectName, DELETED_FILES_LOG, deletedAndRenamedFiles.join("\n"));
    }

    await logData(projectName, COMMIT_HASH_LOG, mergeBaseCommitHash);

    await logData(projectName, SOLIDITY_FRAMEWORK_LOG, solidityFramework);

    await initGitRepo(path.join(EXTERNAL_EXTENSIONS_DIR, projectName));

    // Remove the project name folder if it was created
    if (cleanUpProjectNameFolder) {
      const projectPath = path.join(process.cwd(), projectName);
      await fs.promises.rm(projectPath, { recursive: true, force: true });
      prettyLog.info(`Cleaned up temporary folder: ${projectPath}\n`, 1);
    }

    prettyLog.info(`Files processed successfully, updated ${EXTERNAL_EXTENSIONS_DIR}/${projectName} directory.`);
  } catch (err: any) {
    prettyLog.error(`Error: ${err.message}`);
  }
};
