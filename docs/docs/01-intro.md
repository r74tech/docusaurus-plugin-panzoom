# Introduction

**docusaurus-plugin-panzoom** is a plugin that adds pan and zoom functionality to images and SVG elements in Docusaurus
websites.

## Overview

Complex diagrams and charts, especially those generated with [Mermaid](https://mermaid-js.github.io/mermaid/), can be
difficult to examine in detail in a browser. This plugin allows users to drag to move (pan) and zoom in or out of
diagrams for better visibility.

This plugin implements the excellent [@panzoom/panzoom](https://www.npmjs.com/package/@panzoom/panzoom) library.

## Key Features

- Adds pan and zoom functionality to images, SVG elements, or any other HTML elements in Docusaurus
- Works with [Mermaid](https://mermaid-js.github.io/mermaid/) generated diagrams
- Customizable selectors to target specific elements
- Option to wrap elements to contain them within their original container
- Option to use mouse wheel or pinch to zoom
- Option to use shift + mouse wheel or pinch to zoom
- Option to use double-click to reset the zoom
- Option to restrict zooming out beyond the original size of the element
- Toolbar for zooming in and out and resetting the view

## Note

This package is a fork of [act-org/docusaurus-plugin-panzoom](https://github.com/act-org/docusaurus-plugin-panzoom)
under the MIT license. It was forked because the original package was not being actively maintained.

If the original package is updated and maintained again, we recommend migrating back to the original package. This fork
will continue to be maintained until then.

## License

MIT, see [LICENSE](https://github.com/r74tech/docusaurus-plugin-panzoom/blob/main/LICENSE) for more details.
