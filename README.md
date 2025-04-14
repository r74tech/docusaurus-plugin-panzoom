# docusaurus-plugin-panzoom

This plugin adds the ability to pan and zoom images and SVG images inside of a docusaurus website.  This is useful for embedding diagrams or
complex mermaid.js renders around models and object schemas.  The normal theme doesn't scale tremendously well in a browser so some augmentation
for complex diagrams is necessary.

This implements the excellent [@panzoom/panzoom](https://www.npmjs.com/package/@panzoom/panzoom) plugin 

## Installation

```bash
npm install @r74tech/docusaurus-plugin-panzoom
```

```javascript
// In docusaurus.config.js
// ...
plugins: ['@r74tech/docusaurus-plugin-panzoom'],
// or
plugins: [['@r74tech/docusaurus-plugin-panzoom', {} /* options */]],
```

## Configuration

The plugin accepts the following configuration options:

```javascript
// In docusaurus.config.js
// ...
themeConfig: {
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
    
    // Add this class to any element within the Panzoom element that you want to exclude from Panzoom handling.
    // That element's children will also be excluded. e.g. links and buttons that should not propagate the click event.
    // Default: 'panzoom-exclude'
    excludeClass: 'panzoom-exclude',
    
    // You can also pass any options supported by @panzoom/panzoom
    // See: https://github.com/timmywil/panzoom for available options
  }
}
```

> [!NOTE]
> This package is a fork of [act-org/docusaurus-plugin-panzoom](https://github.com/act-org/docusaurus-plugin-panzoom) under the MIT license. It was forked because the original package was not being actively maintained.
>
> If the original package is updated and maintained again, we recommend migrating back to the original package. This fork will continue to be maintained until then.

## License

MIT, see [LICENSE](LICENSE) for more details.
