import { execa } from "execa";
import fs from "fs";
import https from "https";

export const parseExtensionString = (extension: string) => {
  const isGithubUrl = extension.startsWith("https://github.com/");
  const regex = /^[^/]+\/[^/]+(:[^/]+)?$/;

  if (!regex.test(extension) && !isGithubUrl) {
    throw new Error(`Invalid extension format. Use "owner/project", "owner/project:branch" or github url.`);
  }

  let owner, project, branch;

  if (isGithubUrl) {
    const { ownerName, repoName, branch: urlBranch } = deconstructGithubUrl(extension);
    owner = ownerName;
    project = repoName;
    branch = urlBranch;
  } else {
    owner = extension.split("/")[0];
    project = extension.split(":")[0].split("/")[1];
    branch = extension.split(":")[1];
  }

  const githubUrl = `https://github.com/${owner}/${project}`;
  const githubBranchUrl = branch ? `https://github.com/${owner}/${project}/tree/${branch}` : githubUrl;

  return {
    githubUrl,
    githubBranchUrl,
    owner,
    project,
    branch,
  };
};

export function deconstructGithubUrl(url: string) {
  const urlParts = url.split("/");
  const ownerName = urlParts[3];
  const repoName = urlParts[4];
  const branch = urlParts[5] === "tree" ? urlParts[6] : undefined;

  return { ownerName, repoName, branch };
}

export async function assertRepoExists(githubBranchUrl: string, githubUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(githubBranchUrl, res => {
        if (res.statusCode !== 200) {
          reject(new Error(`Extension not found: ${githubUrl}`));
        } else {
          resolve();
        }
      })
      .on("error", err => {
        reject(err);
      });
  });
}

export const setUpRepository = async (
  repository: string,
  targetDirectory: string,
  branch?: string | null,
  shouldCreateDir: boolean = true,
  cloneToCurrentDir: boolean = false,
) => {
  if (shouldCreateDir) await fs.promises.mkdir(targetDirectory);
  const gitArgs = ["clone"];
  if (branch) gitArgs.push("--branch", branch);
  gitArgs.push(repository, cloneToCurrentDir ? "." : targetDirectory);
  await execa("git", gitArgs, { cwd: targetDirectory });
};
