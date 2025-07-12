import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Docusaurus Plugin PanZoom',
  tagline: 'Add pan and zoom functionality to images, SVGs, or any HTML elements in your Docusaurus site',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://r74tech.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docusaurus-plugin-panzoom/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'r74tech', // Usually your GitHub org/user name.
  projectName: 'docusaurus-plugin-panzoom', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/r74tech/docusaurus-plugin-panzoom/tree/main/docs/',
          routeBasePath: '/docs',
        },
        blog: false, // Disable the blog feature
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    '@r74tech/docusaurus-plugin-panzoom'
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',

    navbar: {
      title: 'Docusaurus Plugin PanZoom',
      logo: {
        alt: 'Docusaurus Plugin PanZoom Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/r74tech/docusaurus-plugin-panzoom',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/r74tech/docusaurus-plugin-panzoom',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/@r74tech/docusaurus-plugin-panzoom',
            },
          ],
        },
        {
          title: 'About',
          items: [
            {
              label: 'Contributing',
              href: 'https://github.com/r74tech/docusaurus-plugin-panzoom/blob/main/CONTRIBUTING.md',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/r74tech/docusaurus-plugin-panzoom/blob/main/CHANGELOG.md',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} r74tech. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

    zoom: {
      selectors: [
        'div.mermaid[data-processed="true"]:not(.panzoom-exclude *)',
        'div.docusaurus-mermaid-container:not(.panzoom-exclude *)',
        '.drawio',
        '.panzoom-example'
      ],
      wrap: true,
      timeout: 1000,
      excludeClass: 'panzoom-exclude',
      toolbarEnabled: true,
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
