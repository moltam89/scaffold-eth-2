import { execa } from "execa";
import type { ExternalExtension, Options } from "./types";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import ncp from "ncp";
import { COMMIT_HASH_LOG, DELETED_FILES_LOG, SOLIDITY_FRAMEWORK_LOG } from "./dev/create-extension-from-scaffold-eth";

const EXTERNAL_EXTENSION_TMP_DIR = "tmp-external-extension";

const copy = promisify(ncp);

const cloneGitRepo = async (repositoryUrl: string, targetDir: string): Promise<void> => {
  try {
    // 1. Create the target directory if it doesn't exist
    await fs.promises.mkdir(targetDir, { recursive: true });

    // 2. Clone the repository
    await execa("git", ["clone", repositoryUrl, targetDir], { cwd: targetDir });

    console.log(`Repository cloned to ${targetDir}`);
  } catch (error: any) {
    console.error(`Error cloning repository: ${error.message}`);
    throw error;
  }
};

const resetToCommitHash = async (externalExtensionPath: string, targetDir: string) => {
  const logPath = path.join(externalExtensionPath, COMMIT_HASH_LOG);

  if (fs.existsSync(logPath)) {
    const commitHash = (await fs.promises.readFile(logPath, "utf8")).trim();
    if (commitHash) {
      try {
        console.log(`Resetting repository to commit hash: ${commitHash}`);
        await execa("git", ["reset", "--hard", commitHash], { cwd: targetDir });
        console.log(`Repository successfully reset to commit hash: ${commitHash}`);
      } catch (error: any) {
        console.error(`Error resetting to commit hash: ${error.message}`);
        throw error;
      }
    } else {
      console.warn("Commit hash log is empty. Skipping reset.");
    }
  } else {
    console.warn(`No commit hash log found at: ${logPath}. Skipping reset.`);
  }
};

const removeLoggedDeletedFiles = async (externalExtensionPath: string, targetDir: string) => {
  const logPath = path.join(externalExtensionPath, DELETED_FILES_LOG);
  console.log(`Checking for previously logged deleted files at: ${logPath}`);
  if (fs.existsSync(logPath)) {
    const deletedFilesContent = await fs.promises.readFile(logPath, "utf8");
    const deletedFiles = deletedFilesContent.split("\n").filter(Boolean);

    for (const file of deletedFiles) {
      const filePath = path.join(targetDir, file);
      console.log(`Checking deleted file: ${file}`, filePath);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log(`Removed previously logged deleted file: ${file}`);
      }
    }
  }
};

const commitChanges = async (targetDir: string) => {
  try {
    console.log("Staging all changes...");
    await execa("git", ["add", "--all"], { cwd: targetDir });

    console.log("Committing changes...");
    await execa("git", ["commit", "-m", "Apply changes from extension"], { cwd: targetDir });

    console.log("Changes committed successfully.");
  } catch (error: any) {
    console.error(`Error committing changes: ${error.message}`);
    throw error;
  }
};

const setUpExternalExtensionFiles = async (options: Options, tmpDir: string) => {
  // 1. Create tmp directory to clone external extension
  await fs.promises.mkdir(tmpDir);

  const { repository, branch } = options.externalExtension as ExternalExtension;

  // 2. Clone external extension
  if (branch) {
    await execa("git", ["clone", "--branch", branch, repository, tmpDir], {
      cwd: tmpDir,
    });
  } else {
    await execa("git", ["clone", repository, tmpDir], { cwd: tmpDir });
  }
};

export const createProjectFromScaffoldEth = async (options: Options, targetDir: string) => {
  await cloneGitRepo("https://github.com/scaffold-eth/scaffold-eth-2", targetDir);

  const tmpDir = path.join(targetDir, EXTERNAL_EXTENSION_TMP_DIR);

  let externalExtensionPath = path.join(tmpDir, "extension");

  if (options.dev) {
    externalExtensionPath = path.join("externalExtensions", options.externalExtension as string, "extension");
  } else {
    await setUpExternalExtensionFiles(options, tmpDir);
  }

  await resetToCommitHash(externalExtensionPath, targetDir);

  await copy(externalExtensionPath, targetDir, {
    filter: file => {
      const relativePath = path.relative(externalExtensionPath, file);
      return ![COMMIT_HASH_LOG, DELETED_FILES_LOG, SOLIDITY_FRAMEWORK_LOG].includes(relativePath);
    },
  });

  await removeLoggedDeletedFiles(externalExtensionPath, targetDir);

  await commitChanges(targetDir);
};
