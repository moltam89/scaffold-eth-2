import { execa } from "execa";
import type { ExternalExtension, Options } from "./types";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import ncp from "ncp";
import { COMMIT_HASH_LOG, DELETED_FILES_LOG, SOLIDITY_FRAMEWORK_LOG } from "./dev/create-extension-from-scaffold-eth";
import { deleteTempDirectory, EXTERNAL_EXTENSION_TMP_DIR, setupRepository } from "./utils/common";
import { SOLIDITY_FRAMEWORKS } from "./utils/consts";

// ToDo: Prepare for branch switching, main branch uses hardhat right now, but it can change in the future
const SCAFFOLD_ETH_2_REPOSITORY_URL = "https://github.com/scaffold-eth/scaffold-eth-2";
const FOUNDRY_BRANCH = "foundry";

const copy = promisify(ncp);

export const createProjectFromScaffoldEth = async (options: Options, projectName: string) => {
  await setupRepository(
    projectName,
    SCAFFOLD_ETH_2_REPOSITORY_URL,
    options.solidityFramework === SOLIDITY_FRAMEWORKS.FOUNDRY ? FOUNDRY_BRANCH : null,
  );

  let externalExtensionPath = path.join("externalExtensions", options.externalExtension as string, "extension");

  if (!options.dev) {
    await setupRepository(
      getTempDirectory(projectName),
      (options.externalExtension as ExternalExtension).repository,
      (options.externalExtension as ExternalExtension).branch,
    );

    externalExtensionPath = externalExtensionPath = path.join(getTempDirectory(projectName), "extension");
  }

  await resetToCommitHash(externalExtensionPath, projectName);

  await copy(externalExtensionPath, projectName, {
    filter: file => {
      const relativePath = path.relative(externalExtensionPath, file);
      return ![COMMIT_HASH_LOG, DELETED_FILES_LOG, SOLIDITY_FRAMEWORK_LOG].includes(relativePath);
    },
  });

  await removeLoggedDeletedFiles(externalExtensionPath, projectName);

  await deleteTempDirectory(options, getTempDirectory(projectName));

  await commitChanges(projectName);
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

const getTempDirectory = (projectName: string) => path.join(projectName, EXTERNAL_EXTENSION_TMP_DIR);
