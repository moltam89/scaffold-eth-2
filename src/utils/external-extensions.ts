import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ExternalExtension, RawOptions, SolidityFramework } from "../types";
import curatedExtension from "../extensions.json";
import { SOLIDITY_FRAMEWORKS } from "./consts";
import { assertRepoExists, deconstructGithubUrl, parseExtensionString } from "./common";
import { SOLIDITY_FRAMEWORK_LOG } from "../dev/from-scaffold-eth";

type ExtensionJSON = {
  extensionFlagValue: string;
  repository: string;
  branch?: string;
  // fields usefull for scaffoldeth.io
  description: string;
  version?: string; // if not present we default to latest
  name?: string; // human redable name, if not present we default to branch or extensionFlagValue on UI
};

const TRUSTED_GITHUB_ORGANIZATIONS = ["scaffold-eth", "buidlguidl"];

const extensions: ExtensionJSON[] = curatedExtension;
const CURATED_EXTENSIONS = extensions.reduce<Record<string, ExternalExtension>>((acc, ext) => {
  if (!ext.repository) {
    throw new Error(`Extension must have 'repository': ${JSON.stringify(ext)}`);
  }
  if (!ext.extensionFlagValue) {
    throw new Error(`Extension must have 'extensionFlagValue': ${JSON.stringify(ext)}`);
  }

  acc[ext.extensionFlagValue] = {
    repository: ext.repository,
    branch: ext.branch,
  };
  return acc;
}, {});

export const validateExternalExtension = async (
  extensionName: string,
  dev: boolean,
): Promise<{ repository: string; branch?: string; isTrusted: boolean } | string> => {
  if (dev) {
    // Check externalExtensions/${extensionName} exists
    try {
      const currentFileUrl = import.meta.url;
      const externalExtensionsDirectory = path.resolve(
        decodeURI(fileURLToPath(currentFileUrl)),
        "../../externalExtensions",
      );
      await fs.promises.access(`${externalExtensionsDirectory}/${extensionName}`);
    } catch {
      throw new Error(`Extension not found in "externalExtensions/${extensionName}"`);
    }

    return extensionName;
  }

  const { githubUrl, githubBranchUrl, branch, owner } = getDataFromExternalExtensionArgument(extensionName);
  const isTrusted = TRUSTED_GITHUB_ORGANIZATIONS.includes(owner.toLowerCase()) || !!CURATED_EXTENSIONS[extensionName];

  await assertRepoExists(githubBranchUrl, githubUrl);

  return { repository: githubUrl, branch, isTrusted };
};

// Gets the data from the argument passed to the `--extension` option.
export const getDataFromExternalExtensionArgument = (externalExtension: string) => {
  if (CURATED_EXTENSIONS[externalExtension]) {
    externalExtension = getArgumentFromExternalExtensionOption(CURATED_EXTENSIONS[externalExtension]);
  }

  return parseExtensionString(externalExtension);
};

// Parse the externalExtensionOption object into a argument string.
// e.g. { repository: "owner/project", branch: "branch" } => "owner/project:branch"
export const getArgumentFromExternalExtensionOption = (externalExtensionOption: RawOptions["externalExtension"]) => {
  const { repository, branch } = (externalExtensionOption as ExternalExtension) || {};

  const owner = repository?.split("/")[3];
  const project = repository?.split("/")[4];

  return `${owner}/${project}${branch ? `:${branch}` : ""}`;
};

// Gets the solidity framework directories from the external extension repository
export const getSolidityFrameworkDirsFromExternalExtension = async (
  externalExtension: NonNullable<RawOptions["externalExtension"]>,
) => {
  const solidityFrameworks = Object.values(SOLIDITY_FRAMEWORKS);
  const filterSolidityFrameworkDirs = (dirs: string[]) => {
    return dirs.filter(dir => solidityFrameworks.includes(dir as SolidityFramework)).reverse() as SolidityFramework[];
  };

  if (typeof externalExtension === "string") {
    const externalExtensionsDirectory = getExternalExtensionsDirectory();

    const externalExtensionSolidityFrameworkDirs = await fs.promises.readdir(
      `${externalExtensionsDirectory}/${externalExtension}/extension/packages`,
    );

    return filterSolidityFrameworkDirs(externalExtensionSolidityFrameworkDirs);
  }

  const { branch, repository } = externalExtension;
  const { ownerName, repoName } = deconstructGithubUrl(repository);
  const githubApiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/contents/extension/packages${branch ? `?ref=${branch}` : ""}`;
  const res = await fetch(githubApiUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch the githubApiUrl ${githubApiUrl}`);
  }
  const listOfContents = (await res.json()) as { name: string; type: "dir" | "file" }[];
  const directories = listOfContents.filter(item => item.type === "dir").map(dir => dir.name);

  return filterSolidityFrameworkDirs(directories);
};

// If the extension was created from scaffold-eth, it will have a file called ${SOLIDITY_FRAMEWORK_LOG}
export const detectFromScaffoldEth = async (
  externalExtension: NonNullable<RawOptions["externalExtension"]>,
): Promise<{ fromScaffoldEth: boolean; fromScaffoldEthSolidityFramework: SolidityFramework | null }> => {
  // dev mode
  if (typeof externalExtension === "string") {
    try {
      const externalExtensionsDirectory = getExternalExtensionsDirectory();

      const logPath = `${externalExtensionsDirectory}/${externalExtension}/extension/${SOLIDITY_FRAMEWORK_LOG}`;

      const solidityFramework = (await fs.promises.readFile(logPath, "utf8")).trim();
      if (solidityFramework) {
        if (solidityFramework !== SOLIDITY_FRAMEWORKS.HARDHAT && solidityFramework !== SOLIDITY_FRAMEWORKS.FOUNDRY) {
          throw new Error(`Invalid Solidity framework: ${solidityFramework}`);
        }
        return { fromScaffoldEth: true, fromScaffoldEthSolidityFramework: solidityFramework };
      }
      return { fromScaffoldEth: false, fromScaffoldEthSolidityFramework: null };
    } catch {
      return { fromScaffoldEth: false, fromScaffoldEthSolidityFramework: null };
    }
  }

  const { branch, repository } = externalExtension;
  const { ownerName, repoName } = deconstructGithubUrl(repository);

  const githubApiUrl = `https://api.github.com/repos/${ownerName}/${repoName}/contents/extension/${SOLIDITY_FRAMEWORK_LOG}${branch ? `?ref=${branch}` : ""}`;
  try {
    const res = await fetch(githubApiUrl);
    if (res.ok) {
      const data = await res.json();
      // GitHub API returns content in base64, so we need to decode it
      const content = atob(data.content); // Decode base64 to string
      const solidityFramework = content.trim();
      if (solidityFramework) {
        if (solidityFramework !== SOLIDITY_FRAMEWORKS.HARDHAT && solidityFramework !== SOLIDITY_FRAMEWORKS.FOUNDRY) {
          throw new Error(`Invalid Solidity framework: ${solidityFramework}`);
        }
        return { fromScaffoldEth: true, fromScaffoldEthSolidityFramework: solidityFramework };
      }
      return { fromScaffoldEth: true, fromScaffoldEthSolidityFramework: null };
    } else if (res.status === 404) {
      // If the response is 404 (Not Found), the file does not exist
      return { fromScaffoldEth: false, fromScaffoldEthSolidityFramework: null };
    } else {
      throw new Error(`Failed to fetch ${githubApiUrl}: ${res.statusText}`);
    }
  } catch (error: any) {
    console.error(`Error checking ${SOLIDITY_FRAMEWORK_LOG}: ${error}`);
    return { fromScaffoldEth: false, fromScaffoldEthSolidityFramework: null }; // Return false on network errors or other failures
  }
};

const getExternalExtensionsDirectory = (): string => {
  const currentFileUrl = import.meta.url;
  return path.resolve(decodeURI(fileURLToPath(currentFileUrl)), "../../externalExtensions");
};
