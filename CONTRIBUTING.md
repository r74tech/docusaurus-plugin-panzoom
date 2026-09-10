# Contributing to docusaurus-plugin-panzoom

I appreciate your consideration to contribute to this project! This document is a guide to help make your contribution easier and more effective.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) LTS (CI follows the latest LTS release)
- pnpm 11.24.0, as declared in `package.json`

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/r74tech/docusaurus-plugin-panzoom.git
    ```

2. Move to the directory and install dependencies

    ```bash
    cd docusaurus-plugin-panzoom
    pnpm install --frozen-lockfile
    ```

### Development

The main scripts used during development are:

- `pnpm build`: Builds the TypeScript code.
- `pnpm lint`: Checks source code with Oxlint; `pnpm lint:fix` applies fixes.
- `pnpm format`: Formats source code with Oxfmt; `pnpm format:check` checks without writing.
- `pnpm typecheck`: Checks TypeScript types without emitting files.

The documentation project has the same lint, format, and typecheck commands. Build
the plugin first, then run `pnpm --dir docs install --frozen-lockfile` and the
checks with `pnpm --dir docs <command>`. CI checks both projects on pull requests.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request, please open an issue on GitHub.

1. Check [the Issue Tracker](https://github.com/r74tech/docusaurus-plugin-panzoom/issues) for existing issues.
2. When requesting a new issue or feature, please provide as much detail as possible.

### Development

1. Check [the Issue Tracker](https://github.com/r74tech/docusaurus-plugin-panzoom/issues), make sure if there is anything relevant to the problem you are trying to solve.
2. Keep the repository you did folk up to date.

   ```bash
    git fetch upstream
    git rebase upstream/main
   ```

3. Create a new branch.

   ```bash
   git switch -c feature/your-feature-name
   ```

4. Make changes to the code and run tests to make sure everything is working properly.
5. Write a clear commit message following the Conventional Commits style.

### Commit Messages

- Commit messages should concisely describe the changes you made.
- Commits should be split into appropriate chunks, and we recommend using [the Conventional Commits](https://www.conventionalcommits.org/) style. Below are the available Conventional Commits types:
  - `feat`: a commit that adds new functionality (triggers a MINOR version bump).
  - `fix`: a commit that fixes a bug (triggers a PATCH version bump).
  - `docs`: a commit that adds or improves documentation.
  - `style`: changes that do not affect the meaning of the code.
  - `refactor`: a code change that neither fixes a bug nor adds a feature.
  - `perf`: a commit that improves performance, without functional changes.
  - `test`: adding missing tests or correcting existing tests.
  - `build`: changes that affect the build system or external dependencies.
  - `ci`: changes to our CI configuration files and scripts.
  - `chore`: other changes that don't modify src or test files.
  - `revert`: reverts a previous commit.

> [!NOTE]
> If there is a single commit in the pull request, the commit message must be the same as a pull request title. Because the merge strategy in this repository is "Squash and merge". When you "Squash and merge" a pull request on a branch that has only one commit, the default commit message will be the commit message in that branch.
>
> cf. [About pull request merges - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#merge-message-for-a-squash-merge)

### Breaking Changes

For commits that introduce breaking changes, add an exclamation mark after the type and include a "BREAKING CHANGE:" section in the commit body:

```
feat!: completely revamp the API

BREAKING CHANGE: The new API is not compatible with previous versions
```

### Pull Requests

1. Write the title of pull request in the [the Conventional Commits](https://www.conventionalcommits.org/) style.
2. Create a pull request and include the following information:
   - Description of the change
   - Purpose of the change
   - Relevant issue number (if any)

## Automated Releases

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated version management and package publishing. The release process is triggered automatically when changes are merged into the main branch.

The `release` job builds the plugin, determines the version, creates a tarball,
and updates the GitHub release without npm OIDC permissions. The separate
`publish` job receives only that tarball and publishes it with npm trusted
publishing and `--ignore-scripts`. It does not check out the repository, install
dependencies, restore caches, or run package code. The runtime follows Node LTS;
its bundled npm must be at least 11.5.1 for trusted publishing. The npm trusted publisher must
authorize this repository's `ci.yml` workflow.

If npm publishing fails after the GitHub release is created, use **Re-run failed
jobs** on the same Actions run within 30 days to reuse its release artifact.
Do not restart the entire workflow: semantic-release will find the existing tag
and will not prepare that version again. Do not start a newer release until the
failed publish has been resolved. No npm publishing occurs on pull requests.

- `fix:` commits trigger a PATCH version bump (e.g., 1.0.0 → 1.0.1)
- `feat:` commits trigger a MINOR version bump (e.g., 1.0.0 → 1.1.0)
- Commits with `BREAKING CHANGE:` trigger a MAJOR version bump (e.g., 1.0.0 → 2.0.0)

## License

This project is based on [MIT License](/LICENSE).
