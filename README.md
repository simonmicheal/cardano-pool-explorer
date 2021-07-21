## Demo: Cardano Pool explorer

This repository provides a demo application to display pools built using  *Blockfrost.io*, Cardano API-as-a-Service.

You can see the demo itself running on [cardano-tokens.com](https://cardano-tokens.com).

### Before you start

Make sure you have downloaded and installed [Node.js LTS](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/lang/en/docs/install/) and git or just run `nix-shell` if you are using NixOS.

Login to the [blockfrost.io](https://blockfrost.io). Create a project and get your API key.

<img src="https://i.imgur.com/smY12ro.png">
<br/>
<br/>

Once you have it, rename `.env.example` → `.env` and insert your API key.

### Run locally

```bash
$ yarn
$ yarn dev
```
Go or to https://simonmicheal.github.io/cardano-pool-explorer/ and enjoy.

