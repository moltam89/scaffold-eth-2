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
