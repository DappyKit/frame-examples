# DappyKit Frame Example

In this example, Frame for Farcaster demonstrates [authorization](https://github.com/DappyKit/farcaster-auth) for [Delegated FS](https://github.com/DappyKit/farcaster-auth/tree/master/src/service/delegated-fs). With this Frame, you can request access from the user to their data for writing purposes.

Delegated FS provides access to a unique data slot for the user+application. Data can be modified for free through the Rollup Gateway. Periodically, all user data is uploaded to IPFS and anchored in a smart contract with proofs.

The data of all other users is public and can be accessed through the [DappyKit SDK](https://github.com/DappyKit/sdk).

The project consists of two main files: `src/frame.tsx` and `src/webhook.ts`. The first file contains all the UI and logic for the Frame, while the second file contains the Webhook for receiving responses from the Auth system. Delegated keys are stored in a KV store managed by the developer.

## Installation

* Install Node.js 18+.
* Create a Cloudflare account for deploying Frame and Webhook.
* Register your application in the Auth system: **TBD**

```shell
# Copy configuration file for the frame, fill the data
cp example.wrangler-frame.toml wrangler-frame.toml

# Copy configuration file for the webhook, fill the data
cp example.wrangler-webhook.toml wrangler-webhook.toml

# Deploy scripts to Cloudflare
npm run wrangler:deploy-all

# Or deploy just the webhook
npm run wrangler:deploy-webhook

Or deploy just the Frame
npm run wrangler:deploy-frame
```
