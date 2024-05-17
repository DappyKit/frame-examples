# DappyKit Frame Example

In this example, Frame for Farcaster demonstrates [authorization](https://github.com/DappyKit/farcaster-auth) for [Delegated FS](https://github.com/DappyKit/farcaster-auth/tree/master/src/service/delegated-fs). With this Frame, you can request access from the user to their data for writing purposes.

Delegated FS provides access to a unique data slot for the user+application. Data can be modified for free through the Rollup Gateway. Periodically, all user data is uploaded to IPFS and anchored in a smart contract with proofs.

The data of all other users is public and can be accessed through the [DappyKit SDK](https://github.com/DappyKit/sdk).

The project consists of two main files: `src/frame.tsx` and `src/webhook.ts`. The first file contains all the UI and logic for the Frame, while the second file contains the Webhook for receiving responses from the Auth system. Delegated keys are stored in a KV store managed by the developer.

## Installation

* Install Node.js 18+ and npm.
* Install Git.
* Create a Cloudflare account for deploying Frame and Webhook.
* Create ETH address/private key. Using Metamask or other wallets/services.

```shell
# Clone the repo
git clone https://github.com/DappyKit/frame-examples.git

# Install dependencies with NPM >= 18
npm ci

# Copy configuration file for the frame, fill the data
cp example.wrangler-frame.toml wrangler-frame.toml

# Copy configuration file for the webhook, fill the data
cp example.wrangler-webhook.toml wrangler-webhook.toml

# Create a KV in Cloudflare for storing user data. Copy the IDs from the two KVs into `wrangler-frame.toml` and `wrangler-webhook.toml`.
npm run wrangler:create-namespaces

# Deploy scripts to Cloudflare
npm run wrangler:deploy-all

# The first published link is the Frame, which you can publish in your Farcaster. 
# The second published link is the Webhook for receiving data about granted permissions.
# Using these links, you can register your application in the Auth system.
```

One by one deployment.

```shell
# Or deploy just the webhook
npm run wrangler:deploy-webhook

# Or deploy just the Frame
npm run wrangler:deploy-frame
```

## Application registration

After successfully publishing your Frame, it must be registered in the Auth system.
To do this, go to the link [**TBD**] and enter all the necessary information. Upon successful registration, you can publish your Frame on your own or any other Farcaster page.

Each new user will go through a quick authorization without leaving Farcaster.
