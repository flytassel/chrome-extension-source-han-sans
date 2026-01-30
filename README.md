# Force Source Han Sans Chrome Extension

A lightweight Chrome extension that forces web pages to use **Source Han Sans** (思源黑体) instead of default fonts like SimSun (宋体).

## Features
- Forces font substitution for all web elements.
- Prioritizes Source Han Sans and other high-quality sans-serif fonts.
- Injects styles at `document_start` for a seamless experience.
- **Website Exclusions**: Easily exclude specific websites (like Google Docs or GitHub) to maintain their original design.

## How to Exclude Websites
If you find that this extension breaks the layout of certain websites, you can add their URLs to the `exclude_matches` section in `manifest.json`:

```json
"exclude_matches": [
  "https://example.com/*",
  "https://*.another-site.org/*"
]
```

## How to Install
1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the directory containing this extension.
5. Refresh your tabs to see the changes.

## License
MIT
