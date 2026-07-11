# Publishing

`triangles` is published to npm by GitHub Actions using **tokenless OIDC trusted
publishing** — no `NPM_TOKEN` secret is stored in the repository. Pushing a `v*`
tag whose version matches `package.json` runs
[`.github/workflows/publish.yml`](.github/workflows/publish.yml), which validates,
builds, and publishes the package with a provenance attestation.

Pushing to `main` separately deploys the playground to GitHub Pages via
[`.github/workflows/pages.yml`](.github/workflows/pages.yml).

## One-time setup

Do this once per package; it does not need repeating for each release.

1. **Configure the npm trusted publisher.** On
   `https://www.npmjs.com/package/triangles/access` → **Trusted Publisher**, add a
   GitHub Actions publisher whose fields match the workflow **exactly**:

   | Field                | Value         |
   | -------------------- | ------------- |
   | Organization or user | `msurguy`     |
   | Repository           | `triangles`   |
   | Workflow filename    | `publish.yml` |
   | Environment          | *(blank)*     |

2. **Keep `package.json` `repository.url` pointed at the GitHub repo.** npm
   requires it to match for provenance and trusted publishing.

The workflow already grants the `id-token: write` permission OIDC needs and
upgrades npm to a version that supports OIDC-authenticated publishing (see
[Why the workflow upgrades npm](#why-the-workflow-upgrades-npm)).

## Releasing a new version

1. **Bump the version and update the changelog.**

   ```sh
   npm version <major|minor|patch>   # edits package.json and creates a commit + tag
   ```

   Then add a matching section to [`CHANGELOG.md`](CHANGELOG.md) and amend/commit
   it. (Or edit `version` in `package.json` by hand and commit — just make sure the
   commit lands on `main` before the tag is pushed.)

2. **Validate locally** (the same checks CI runs):

   ```sh
   npm run check        # typecheck + tests + library build
   npm pack --dry-run   # inspect the tarball contents
   ```

3. **Push `main`, then push the tag.** The tag must equal `v` + the
   `package.json` version, and the workflow used is the one **at the tagged
   commit**, so push `main` first.

   ```sh
   git push origin main
   git push origin vX.Y.Z          # e.g. v2.1.0 — `npm version` already created it
   ```

4. **Watch the run** and confirm it published:

   ```sh
   gh run watch                                  # follow the Publish package run
   npm view triangles version                    # should report the new version
   npm view triangles dist-tags                  # `latest` should point to it
   ```

The npmjs.com website UI can lag the registry by a few minutes; trust
`npm view` over the website.

## Verifying a release

From a throwaway directory:

```sh
npm install triangles@X.Y.Z
npm audit signatures        # expect "verified registry signatures" + "verified attestation"
```

## Manual fallback (no trusted publishing)

If CI trusted publishing is unavailable, publish from a machine logged in as an
npm owner. This produces **no provenance attestation**.

```sh
npm login
npm run build:library
npm publish                 # prompts for a 2FA OTP
```

## Troubleshooting

**`404 Not Found - PUT https://registry.npmjs.org/triangles` during publish.**
npm returns a 404 (not 401/403) when the publish request has no valid
publishing credential. Two common causes:

- **npm on the runner is too old.** OIDC-authenticated publishing needs npm
  `>= 11.5.1`. Older npm can *sign provenance* via OIDC but then falls back to an
  empty `NODE_AUTH_TOKEN` and is rejected. The workflow runs
  `npm install -g npm@latest` to avoid this.
- **The trusted-publisher config does not match the run.** The org/user, repo,
  workflow filename, and environment must match exactly (no extra spaces, correct
  file name, environment blank if the workflow sets none).

**`syntax error near unexpected token '('` in the version-check step.** Caused by
escaped quotes in a plain YAML `run:` scalar being passed to bash literally. The
step uses a multi-line block with an intermediate variable to avoid nested
quoting.

**Tag pushed but the run used old workflow code.** Tag-triggered runs use the
workflow file at the tagged commit. If you fix the workflow after tagging, move
the tag to the fixed commit before re-running:

```sh
git tag -f vX.Y.Z
git push origin vX.Y.Z --force
```

## Why the workflow upgrades npm

Node 22 (used by the workflow) bundles npm 10, which supports `--provenance`
signing but **not** OIDC-authenticated publishing. Trusted publishing needs npm
`>= 11.5.1`, so the workflow installs the latest npm before `npm ci`. See the
[npm trusted publishing announcement](https://github.blog/changelog/2025-07-31-npm-trusted-publishing-with-oidc-is-generally-available/)
and [npm docs](https://docs.npmjs.com/trusted-publishers/).
