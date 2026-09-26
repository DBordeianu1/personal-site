## My personal website

### [A personal website](https://daniela-bordeianu.vercel.app/) featuring a recursively-tiled gallery

---

It is built incrementally as new ideas take shape.

The centrepiece is a recursively-tiled [gallery](https://daniela-bordeianu.vercel.app/gallery) that fills the viewport with *n* photos and zero empty space. The mathematical proof is soon to come!

---

**Tech stack**

- **Framework**: Next.js
- **Languages**: TypeScript, CSS, JavaScript
- **Deployment**: Vercel

---

## Running locally

### Prerequisites

- Node.js 18+

### Getting started

Install dependencies:

```
npm install
```

Start the dev server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the frontend.

### After installing packages

Whenever you run `npm install` (e.g., after adding a package or pulling commits that change `package.json`), follow up with:

```
npm audit
```

Review any new advisories before continuing.

---

## Development

### Adding new images

All images are in the .jpg or .png format in this project. Images are served `unoptimized` (Vercel does not resize or re-compress them), so each file must be resized before it is added. Download and use the ImageMagick open source tool:

```
magick -version
```

Resize to the largest size the image is displayed at, and keep quality high. `>` only shrinks, it never enlarges:

```
magick input.jpg -resize "2560x2560>" -quality 90 output.jpg
```

Keep the full-size originals outside the repo. Only run the command on new files: `mogrify` or `*.jpg` re-saves every file, including ones that were already processed, and each re-save loses a little quality.

Check the result (dimensions, file size, quality):

```
magick identify -format "%f %wx%h %b Q%Q\n" output.jpg
```