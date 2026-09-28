# henry-xrk.github.io

Personal portfolio of Rongkai Xu — Data, Analytics & Applied AI.

The site is a static React app. Content lives in `src/data/portfolio.ts`.

## Prerequisites

- Node.js 22 or newer
- npm

## Local development

```bash
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` typechecks with `tsc -b` and writes the static site to `dist/`.

## GitHub Pages

This repository is a user site, so Vite `base` is `/`. The workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it when `main` is pushed, and it can also be run manually.

Before the first deploy, set the repository’s Pages source to **GitHub Actions** (Settings → Pages). This project does not change that setting for you.

## Content

Edit `src/data/portfolio.ts` for copy and links. Leave email, LinkedIn, and resume empty until you have real values. Empty links are not rendered.
