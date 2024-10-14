# create-eth

## 0.0.57

### Patch Changes

- ad4c237: deprecate default alchemy key (scaffold-eth#955)
- b6f0d70: Add template support for solidity compilers

## 0.0.56

### Patch Changes

- foundry: foundry template now uses keystore for deployer account management
- cli: breaking changes to foundry `Deploy.s.sol.template.mjs` file. Please refer to [`Deploy.s.sol.args.mjs`](https://github.com/scaffold-eth/create-eth-extensions/blob/erc-20/extension/packages/foundry/script/Deploy.s.sol.args.mjs) for updated usage.
- extension: eip-5792 extension to curated extension
- Up next react sept 24 (https://github.com/scaffold-eth/scaffold-eth-2/pull/933)
- remove unused type (https://github.com/scaffold-eth/scaffold-eth-2/pull/941)
- Remove nprogress + use next-nprogress-bar (https://github.com/scaffold-eth/scaffold-eth-2/pull/943)
- address component showBoth prop (https://github.com/scaffold-eth/scaffold-eth-2/pull/924)
- Fix rounding issue when converting to wei (https://github.com/scaffold-eth/scaffold-eth-2/pull/940)
- Update hardhat related deps (https://github.com/scaffold-eth/scaffold-eth-2/pull/946)
- make solidity complier as arrays (https://github.com/scaffold-eth/scaffold-eth-2/pull/938)
- chore: up required node to 18.18 (https://github.com/scaffold-eth/scaffold-eth-2/pull/952)

## 0.0.55

### Patch Changes

- fix: different contracts on different chains (https://github.com/scaffold-eth/scaffold-eth-2/pull/920)
- bug: Reset enteredEns on Address input when changing the value (https://github.com/scaffold-eth/scaffold-eth-2/pull/926)
- Up viem, wagmi and rainbowkit (https://github.com/scaffold-eth/scaffold-eth-2/pull/925)
- cli: show yarn install ouput (4bec81e)
- cli: Allow solidity versions and networks + tailwind extend theme (2064f18:)

## 0.0.54

### Patch Changes

- 7d5626f: cli: templatise tailwind and hardhat config
- c74730d: - revert #875 (https://github.com/scaffold-eth/scaffold-eth-2/pull/905)
  - Fix typos (https://github.com/scaffold-eth/scaffold-eth-2/pull/906)
  - Exclude external links from triggering progress bar ([#909](https://github.com/scaffold-eth/scaffold-eth-2/pull/909))
  - Handle tx revert in `useTransactor` (https://github.com/scaffold-eth/scaffold-eth-2/pull/907)
  - show blockexplorer link when transaction is reverted (https://github.com/scaffold-eth/scaffold-eth-2/pull/910)
  - fix: useScaffoldEventHistory caching (https://github.com/scaffold-eth/scaffold-eth-2/pull/916)
  - allow json module imports (https://github.com/scaffold-eth/scaffold-eth-2/pull/921)
- c56aac4: cli: allow case-sensitive extension names

## 0.0.53

### Patch Changes

- fix: vscode eslint not working (https://github.com/scaffold-eth/scaffold-eth-2/pull/905)
- cli: display correct solidity framework options based on extension
- cli: Add curated ERC-20 extension
- cli: fix: copy only chosen solidity framework folder

## 0.0.52

### Patch Changes

- 12ae58d: Add curated Ponder extension
- 6d21542: add onchainkit to curated extension
- 6d21542: feat: template files update

## 0.0.51

### Patch Changes

- fix: BigInt parsing losing precision in IntegerInput (https://github.com/scaffold-eth/scaffold-eth-2/pull/893)
- feat: bundler module resolution (https://github.com/scaffold-eth/scaffold-eth-2/pull/885)
- fix: ignore strings starting with 0 (https://github.com/scaffold-eth/scaffold-eth-2/pull/894)
- cli: don't prompt for install + remove prettier plugins (#80)

## 0.0.50

### Patch Changes

- 5901f51: cli: prettier formatting error

## 0.0.49

### Patch Changes

- 4db51ac: cli: format instance with prettier from cli
- a9545d5: up prettier (scaffold-eth#875)

## 0.0.48

### Patch Changes

- Allow developing externalExtensions with --dev
- remove vercelignore from root dir + clean base package.json
- cli: help command
- foundry: use forge to setup libraries + do early check for foundryup
- foundry: fix verification script failing in latest foundry version
- cli: solidity framework options
- Better transaction result formatting in debug page (#853)
- fix: address components copy icon on small screens (#864)
- lock typescript and abitype version (#871)
- rewrite useScaffoldEventHistory hook (#869)
- fix bug foundry gh action fails

## 0.0.47

### Patch Changes

- Cleanup unused extensions
- Fix listr spamming
- Migrate from husky to lefthook
- Upgrade dependencies
- Templatized foundry deploy script
- Add eip712 curated extension

## 0.0.46

### Patch Changes

- edf9f23: fix: cli immediately exiting after npx create-eth@latest

## 0.0.45

### Patch Changes

- a2c8bab: foundry: fix untracked OZ lib after inital commit
- 2425584: fix: add decimals to native currency price (#854)

  fix: add use effect on Balance component for the price (#856)

  feat: bump burner-connector version (#857)

  feat: useDisplayUsdMode hook (#859)

  feat: up wagmi viem rainbowkit (scaffold-eth#862)

- 8365035: fix foundry gh-actions

## 0.0.44

### Patch Changes

- bec8b09: Bump wagmi, viem and rainbowkit versions (scaffold-eth#849)
- e0c3546: Support for external extensions with -e
- bec8b09: Add default favicon (scaffold-eth#851)

## 0.0.43

### Patch Changes

- 4aba9ad: update useTransactor parameter types (scaffold-eth#846)
- 20b9886: bump burner-connector version

## 0.0.42

### Patch Changes

- AddressInfoModal fix copy icon size on bigger fonts (scaffold-eth#836)
- bump burner-connector version (scaffold-eth#842)
- export useWatchBalance & useTargetNetwork form hooks index file (scaffold-eth#840)
- improve meta handling (scaffold-eth#811)
- fix: useScaffoldWatchContractEvent logs args types (scaffold-eth#837)

## 0.0.41

### Patch Changes

- c46b006: fix dir of TransactionComp in [txHash] page
- c46b006: add engines fields in package.json

## 0.0.40

### Patch Changes

- use burner-connector package
- Update useScaffoldEventHistory hook
- fix: types typo
- add useWatchBalance hook

## 0.0.39

### Patch Changes

- 812e9fc: Add generateStaticParams to blockexplorer address and txHash page

## 0.0.38

### Patch Changes

- c021277: Testing the publishing to npm with new repo

## 0.0.37

### Patch Changes

- Wagmi v2 migration (#700)
- Tailwind dark variant working (#810)
- Gitignored dist folder and updated gitigore files (#804)
- Fixed the main frontend path in README (#808)

## 0.0.36

### Patch Changes

- Extract metadata title and description (#770)
- Remove Goerli from supported networks (#771)
- fix: redundant error notifications on block explorer (#775)
- chore: fix typo (#777)
- fix: vercel deployment linking from github (#780)
- Remove useAccountBalance (#788)
- Templatise README in CLI (#790, #782)
- Add .env to .gitignore in nextjs package (#798)

## 0.0.35

### Patch Changes

- Yarn flatten (#745, 62553fd)
- Add format with prettier task (b03c011)
- Fix local next build (#749)
- Fix emit event value in contract (#765, 833d09b)
- Fix useScaffoldContractWrite so it properly throws errors (#758)
- Fix vercel deployment mismatch (#757)
- Remove extra notifications when using useTransactor (#766)
- Ignore JetBrains IDE settings file (#732)
- Fix hardhat lint errors (ac1d2ac)

## 0.0.34

### Patch Changes

- 092f2ad: 1. basic example to show connected address (#721) 2. Standardize displaying of address and follow ERC-55 (#734) 3. fix contract balance hot reload balance issue (#739) 4. Fix cursor stealing & display loading for AddressInput (#738) 5. Fix blockexplorer code tab (#741) 6. Match link name with actual tab name for Debug Contracts (#743)

## 0.0.33

### Patch Changes

- Feat: Better complex struct inputs (#702)
- improve debug struct UI (#726)
- use next-themes to handle theme and update usehooks-ts (#707)
- up rainbowkit version to 1.3.5 (#719)
- Use arbitrumSepolia instead of Goerli (#716)
- Add Optimism Sepolia config (#711)
- Update screenshot example on Readme (#705)
- add use client to inputs barrel file (#699)
- add baseSepolia in hardhat.config (#696)
- removed "use client" from EtherInput, IntergerInput and AddessInput (#688)

## 0.0.32

### Patch Changes

- App router migration (#535)
- Update hardhat package plugins and add hardhat-verify (#637)
- Update homepage file route and add Viem to README tech stack (#691)
- Ethers v6 migration in hardhat (#692)

## 0.0.31

### Patch Changes

- Track hardhat-deploy deployments, except localhost (#666)
- feat: add external flag to external contracts (#647)
- Remove `.github/ISSUE_TEMPLATE` and pull request template when using npx

## 0.0.30

### Patch Changes

- Daisy UI: update to v4 (#656)
- JSDoc cleanup (#665)
- use default values for safeConnector (#667)
- Typos (#668)
- Remove custom Spinner component (#669)

## 0.0.29

### Patch Changes

- Update wagmi to latest version: (#660)
- Fix externalContracts object example code (#653)
- Add question for installation method in template Issue (#651)

## 0.0.28

### Patch Changes

- a9d873d: - Allow user to set his preference for AddressType in `abi.d.ts` (#630 & #641)
  - Check for exact path segment for inheritedFunctions sources (#643)
  - Fix displaying of custom solidity errors (#638)
  - Check cause?.data on getParsedError (#649)

## 0.0.27

### Patch Changes

- Feat/support multi chain (#615)
- Add links to the docs for components and hooks (#620)
- Fix useScaffoldEventHistory hook new events order (#622)
- Add requiredFilters param to useScaffoldEventHistory hook (#621)
- update wagmi, viem and rainbowkit versions (#626)
- Refactor: types/interfaces (#627)

## 0.0.26

### Patch Changes

- Show inherited functions in Debug page (when deploying with foundry)
- Add disableMultiplyBy1e18 flag to IntegerInput component (#609)
- Add pooling interval to EventHistory hook (#597)
- Fix AbiFunctionReturnType removing [0] (#610)

## 0.0.25

### Patch Changes

- 0135237: - Fix typos in comments (#596)
  - Show inherited functions in Debug (when deploying with hardhat) (#564)

## 0.0.24

### Patch Changes

- 06ba1eb: - remove chainId from useContractWrite (#584)
  - Add copy to clipboard to TxReceipt (#590)
  - Add event logs to transaction page (#591)
  - deployedContracts & externalContracts (#592)

## 0.0.23

### Patch Changes

- 30d9000:

  1. Extract header menu links (#570)
  2. Move Block Explorer to footer (#574)
  3. Remove ExampleUI (pages, components, assets, content) (#578)
  4. update wagmi, viem, rainbowkit (#580) 5. add zkSync, scroll & polygonZkEvm to foundry.toml ([88b4218](https://github.com/scaffold-eth/scaffold-eth-2/pull/582/commits/88b421860a5260d2c8ad4877adaf07c1d667f2b6))

## 0.0.22

### Patch Changes

- 16f1a72: Tweak DaisyUI link (#560)

  Improve ENS support (accept all TLDs) (#563)

  fix: memo history events (#565)

  update DEVELOPER-GUIDE.md with backmerge-main instructions

## 0.0.21

### Patch Changes

- 9c967d9: 1. Fix RainbowKitCustomConnectButton dropdown styles (#500)

  2. chore: footer missalignment & home page on small screens (#502)

  3. Update and typescript version (#499)

  4. fix: header links wrapping icons and text (#510)

  5. Fix typos in useScaffoldContractWrite logs (#512)

  6. fix: spelling in test file name (#522)

  7. Add polygonZkEvm and polygonZkEvmTestnet (#309)

  8. fix: eth price showing 0 on sepolia network (#532)

  9. use websockets client in useFetchBlocks hooks (#529)

  10. Move from react-blockies to blo (#538)

  11. add Prettify type helper locally (#541)

  12. update hardhat version (#546)

  13. Add indexed args to events (#540)

  14. add out of box compatibility with SAFE{Wallet} (#346)

  15. remove parseEther from useScaffoldContractWrite (#548)

  16. Add Scroll Sepolia testnet (#547)

  17. use BuidlGuidl logo on footer (#551)

  18. add types to even data in useScaffoldEventHistory (#553)

  19. foundry: add chain id 31337 while forking chain (#531)

## 0.0.20

### Patch Changes

- 32caee5: 1. Fix RainbowKitCustomConnectButton dropdown styles #500

  2. chore: footer missalignment on mobile screens #502

  3. Update and typescript version #499

  4. add grid and grid-flow class to li manually #510

  5. Fix typos in getScaffoldContractWrite lines 57 & 65 #512

  6. fix: test file name #522

  7. add support for `yarn verify --network networkName` in foundry similar to hardhat #489

  8. updated the Git task title from "Initializing Git repository" => "Initializing Git repository and submodules" when the user selects foundry as an extension