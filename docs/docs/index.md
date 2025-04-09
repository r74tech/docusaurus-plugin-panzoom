---
sidebar_position: 1
---

# Introduction

**docusaurus-plugin-panzoom** is a plugin that adds pan and zoom functionality to images and SVG images in Docusaurus websites.

## Overview

Complex diagrams and charts, especially those generated with mermaid.js, can be difficult to examine in detail in a browser. This plugin allows users to drag to move (pan) and zoom in or out of diagrams for better visibility.

This plugin implements the excellent [@panzoom/panzoom](https://www.npmjs.com/package/@panzoom/panzoom) library.

## Key Features

- Adds pan and zoom functionality to images and SVG elements
- Works with mermaid.js generated diagrams
- Customizable selectors to target specific elements
- Option to wrap elements to contain them within their original container
- Wheel zoom and double-click reset functionality

## Demo

Here's an example of an element with pan and zoom functionality enabled. Try dragging to pan, using the mouse wheel to zoom, and double-clicking to reset.

<div class="panzoom-example">
  Drag here, use wheel to zoom, double-click to reset
</div>

## Installation

```bash
npm install @r74tech/docusaurus-plugin-panzoom
```

```javascript
// Add to docusaurus.config.js
// ...
plugins: ['@r74tech/docusaurus-plugin-panzoom'],
// or
plugins: [['@r74tech/docusaurus-plugin-panzoom', {} /* options */]],
```

## Next Steps

- Check out the [Basic Usage](usage/basic)
- See [Examples](example)

## License

MIT, see [LICENSE](https://github.com/r74tech/docusaurus-plugin-panzoom/blob/main/LICENSE) for more details.

> [!NOTE]
> This package is a fork of [act-org/docusaurus-plugin-panzoom](https://github.com/act-org/docusaurus-plugin-panzoom) under the MIT license. It was forked because the original package was not being actively maintained.
>
> If the original package is updated and maintained again, we recommend migrating back to the original package. This fork will continue to be maintained until then.
