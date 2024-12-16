# Cloudflare Image Cache

This repo contains a CloudFlare worker called "placeholder-zoo". The worker runs image generation models on Replicate, stores the output files in CloudFlare, and serves them with dynamic image resizing using Cloudflare Transformations.

👉 Follow the guide at https://replicate.com/docs/guides/cloudflare-image-cache

---

![image](https://github.com/user-attachments/assets/e873eee7-d6b1-4582-8d66-1409474a52f9)


## Prerequisites

- A [Cloudflare account](https://www.cloudflare.com/plans/free/). You can sign up and [run workers for free](https://workers.cloudflare.com/).
- A [Replicate account](https://replicate.com/)
- [Node.js 20](https://nodejs.org/en/download/prebuilt-installer) or later
- [Git](https://chatgpt.com/share/673d65dc-8e50-8003-8ce2-4bc7053d0e3a), for storing your code changes as you build.

## Usage

Read the [guide](https://replicate.com/docs/guides/cloudflare-image-cache) for step-by-step instructions to create this app, or jump right into using it with the commands below.

First, clone this repo:

```
git clone https://github.com/replicate/cloudflare-image-cache
cd cloudflare-image-cache
```

Then, install dependencies:

```
npm install
```

Then, [set up secrets for your worker](https://replicate.com/docs/guides/cloudflare-image-cache#step-3-set-up-secrets-for-your-worker). You'll need these secrets:

- `REPLICATE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_IMAGE_ACCOUNT_HASH`

Then run your worker locally:

```
npm run dev
```