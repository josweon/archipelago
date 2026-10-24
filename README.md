# Archipelago

AI X Fintech Hackathon: an agentic, policy-guarded cross-border payment demo on XRPL Testnet.

This repository starts with the Next.js/React application from [Scaffold-XRP](https://github.com/XRPL-Commons/scaffold-xrp), cloned at commit `8cdf24f9339f4642b4cbf2f5d9dd094ca8726bd2`. The existing Archipelago Git history and origin are preserved. The Nuxt application, scaffold publishing CLI, and experimental Bedrock project are not included.

## First-time setup

Start with the team's [requirements checklist](requirenment.txt). Application dependencies are declared in the workspace `package.json` files and installed together by pnpm using `pnpm-lock.yaml`.

### 1. Install Git and Node.js

- Install [Git](https://git-scm.com/install/) for your operating system.
- Install [Node.js 22.23.4](https://nodejs.org/en/download/archive/v22.23.4), the version pinned in `.nvmrc`. Choose the macOS `.pkg` or Windows `.msi` installer for your machine. Node.js includes npm and Corepack.
- On macOS or Linux, you can also install Node using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating). After cloning the project in the next step, run `nvm install` and `nvm use` inside its folder.

Open a new terminal after installation. Use Terminal on macOS/Linux or PowerShell on Windows. Confirm Git and Node are available:

```sh
git --version
node --version
```

`node --version` should print `v22.23.4`. If you chose nvm, check this after running `nvm install` and `nvm use` in the cloned repository.

### 2. Clone Archipelago and install dependencies

Choose a folder for your projects, then run these commands. If you already have this repository, open a terminal in its root folder and skip the first two lines.

```sh
git clone https://github.com/josweon/archipelago.git
cd archipelago
corepack enable
pnpm --version
pnpm install --frozen-lockfile
```

`corepack enable` makes the `pnpm` command available. Inside this repository, Corepack downloads and uses **pnpm 10.34.6**, pinned in `package.json`; `pnpm --version` should print `10.34.6`. Allow the download if prompted. The install command handles the framework, XRPL, wallet, and development dependencies.

### 3. Create your local environment file

On macOS/Linux or in Git Bash:

```sh
cp apps/web/.env.example apps/web/.env.local
```

On Windows PowerShell:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
```

Do this once for a new checkout; keep your existing `.env.local` when returning to the project. It is ignored by Git. The example already selects **Testnet**, and blank wallet identifiers are sufficient to view the starter and run verification.

For wallet testing, GemWallet needs its browser extension; Xaman and WalletConnect need their respective public app identifiers in `.env.local`. Keep wallet seeds and private API keys out of `NEXT_PUBLIC_*` variables. Restart the development server after changing environment variables.

### 4. Start the app

From the repository root:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The starter includes a wallet connector, account details, Testnet/Devnet selection, and an XRP payment form. Leave the terminal running while using the app; press **Ctrl+C** to stop it.

On subsequent visits, open a terminal in the repository, run `nvm use` if you installed Node with nvm, then run `pnpm dev`. Run `pnpm install --frozen-lockfile` again after pulling dependency changes.

### Common setup problems

- **`git`, `node`, or `corepack` command not found:** finish installing Git and the pinned Node version, then open a new terminal. With nvm, run `nvm use` in the repository first.
- **`pnpm` command not found or wrong version:** run `corepack enable` with the correct Node version active, then run `pnpm --version` from the repository root.
- **Permission denied during `corepack enable`:** use a user-owned Node installation, such as nvm on macOS/Linux. With a system Node installation on Windows, enable Corepack once from an administrator PowerShell, then use a normal terminal for project commands.
- **Port 3000 is already in use:** open the local URL printed by Next.js, or stop the other development server.
- **The RPC check cannot connect:** check your internet connection and whether your network allows the Testnet WebSocket endpoint on port 51233.

## Verify the setup

```sh
pnpm lint
pnpm type-check
pnpm test
pnpm build
pnpm check:rpc
```

`check:rpc` connects to XRPL Testnet over WebSocket, requests `server_info`, prints the network and validated ledger, and disconnects. It does not create or fund accounts or submit transactions. It requires internet access to `wss://s.altnet.rippletest.net:51233/`.

For a production preview, run `pnpm --filter web start` after building.

## Project layout

```text
apps/web/
  app/                    Next.js App Router
  components/             Wallet, account, payment, and UI components
  lib/                    Network settings, XRPL client, and payment helpers
  scripts/check-xrpl.mts   Read-only Testnet connection check
pnpm-workspace.yaml       Workspace and dependency build settings
turbo.json                Development and verification tasks
```

## Issue context

The setup follows [#12: Initialize repo framework & configure XRPL testnet client](https://github.com/josweon/archipelago/issues/12). The planned demo is described by issues [#13–#22](https://github.com/josweon/archipelago/issues?q=is%3Aissue+is%3Aopen): seed/reset state, payment routes, policy checks, a signer and executor, SQLite audit records, an agent loop, and a dashboard. These application features are still to be implemented.

Some earlier issues describe an arbitrage dashboard. This setup follows the repository description and the cross-border payment flow in #12–#22. Archipelago is a hackathon demo and does not claim Swift integration.

## License

The imported Scaffold-XRP code is licensed under the [MIT license](LICENSE).
