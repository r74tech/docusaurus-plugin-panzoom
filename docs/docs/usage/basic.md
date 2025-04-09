---
sidebar_position: 1
---

# Basic Usage

This page explains the basic usage of docusaurus-plugin-panzoom.

## Installation

First, install the plugin using npm:

```bash
npm install @r74tech/docusaurus-plugin-panzoom
```

## Configuration

### Adding the Plugin

Add the plugin to your Docusaurus configuration file (`docusaurus.config.js` or `docusaurus.config.ts`):

```javascript
// Add to docusaurus.config.js
module.exports = {
  // ...
  plugins: ['@r74tech/docusaurus-plugin-panzoom'],
  // ...
};
```

Or, if you want to specify options:

```javascript
// Add to docusaurus.config.js
module.exports = {
  // ...
  plugins: [
    [
      '@r74tech/docusaurus-plugin-panzoom',
      {
        // Options can be specified here (currently not used)
      }
    ]
  ],
  // ...
};
```

### Theme Configuration

To customize the plugin's behavior, add a `zoom` object to the `themeConfig` section:

```javascript
// Add to docusaurus.config.js
module.exports = {
  // ...
  themeConfig: {
    // ...
    zoom: {
      // A list of selectors to look for elements to enable pan and zoom
      // Default: ['div.mermaid[data-processed="true"]', 'div.docusaurus-mermaid-container', '.drawio']
      selectors: ['div.mermaid[data-processed="true"]', '.drawio'],
      
      // Whether to wrap the panzoom items in a div with overflow:hidden
      // This constrains the pan zoom detail into the original container
      // Default: true
      wrap: true,
      
      // The amount of time to wait in MS before the plugin client module tries to look for
      // and alter pan zoom elements. Some renders take a little bit before they appear in the
      // dom to find.
      // Default: 1000
      timeout: 1000,
      
      // You can also pass any options supported by @panzoom/panzoom
      // See: https://github.com/timmywil/panzoom for available options
    }
  },
  // ...
};
```

## Basic Usage

Once you've installed and configured the plugin, pan and zoom functionality will be automatically added to elements matching the specified selectors.

### Default Behavior

By default, pan and zoom functionality is added to the following elements:

1. `div.mermaid[data-processed="true"]` - Processed mermaid.js diagrams
2. `div.docusaurus-mermaid-container` - Docusaurus mermaid containers
3. `.drawio` - Diagrams created with draw.io

### User Interactions

For elements with pan and zoom functionality enabled, users can:

- **Pan**: Click and drag the element to move the view area
- **Zoom**: Use the mouse wheel to zoom in and out of the element
- **Reset**: Double-click the element to reset to the original view state

## Adding Custom Selectors

If you want to add pan and zoom functionality to specific elements, add custom selectors to the `selectors` array:

```javascript
zoom: {
  selectors: [
    'div.mermaid[data-processed="true"]',
    '.drawio',
    '.my-custom-diagram',  // Add a custom selector
    '#specific-image'      // Add a specific ID element
  ],
  // Other options...
}
```

Check out the [Examples](../example) page for demonstrations.