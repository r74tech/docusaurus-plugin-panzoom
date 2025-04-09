import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manually defined sidebar with specific items
  tutorialSidebar: [
    'index', // Main documentation page (docs/index.md)
    'usage/basic', // Basic usage guide
    'example/index', // Examples page
  ],
};

export default sidebars;