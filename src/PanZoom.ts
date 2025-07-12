import panzoom, { PanzoomObject } from '@panzoom/panzoom';
import type { ClientModule } from '@docusaurus/types';
import { PanZoomPluginOptions, PanZoomPluginToolbarPosition } from './PanzoomPluginOptions';
import SvgZoomIn from './img/zoom-in';
import SvgZoomOut from './img/zoom-out';
import SvgZoomReset from './img/zoom-reset';
import './styles/panzoom.css';

const config = require('@generated/docusaurus.config').default;
const { themeConfig } = config;
const { zoom }: { zoom: PanZoomPluginOptions } = themeConfig;
const {
  selectors = ['div.mermaid[data-processed="true"]', 'div.docusaurus-mermaid-container', '.drawio'],
  wrap = true,
  timeout = 1000,
  excludeClass = 'panzoom-exclude',
  toolbarEnabled = false,
  toolbarPosition = PanZoomPluginToolbarPosition.TopRight,
  toolbarOpacity = 0,
  ...panZoomConfig
} = zoom;

/**
 * Creates a toolbar with zoom controls for a panzoom instance
 * @param container The container element to append the toolbar to
 * @param instance The panzoom instance to control
 * @param position The position of the toolbar
 */
const createToolbar = (container: HTMLElement, instance: PanzoomObject, position: PanZoomPluginToolbarPosition) => {
  const toolbar = document.createElement('div');
  toolbar.className = `panzoom-toolbar panzoom-toolbar-${position} ${excludeClass}`;

  // Apply custom opacity from configuration
  toolbar.style.opacity = toolbarOpacity.toString();

  // Prevent double-click events from bubbling up to the container
  // By default the panzoom library will reset on double click
  toolbar.addEventListener('dblclick', (e) => {
    e.stopPropagation();
  });

  // Helper function to create toolbar buttons
  const createButton = (svg: string, title: string, action: () => void): HTMLButtonElement => {
    const button = document.createElement('button');
    button.innerHTML = svg;
    button.title = title;
    button.className = excludeClass;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      action();
    });
    return button;
  };

  // Create and append all buttons
  const buttons = [
    createButton(SvgZoomIn, 'Zoom in', () => instance.zoomIn()),
    createButton(SvgZoomOut, 'Zoom out', () => instance.zoomOut()),
    createButton(SvgZoomReset, 'Reset zoom', () => instance.reset()),
  ];

  buttons.forEach((button) => toolbar.appendChild(button));
  container.appendChild(toolbar);
};

/**
 * Main work method to zoom the set of elements.  You can pass in global options to the pan zoom component
 * as well as control whether the items will be wrapped.
 * @param selectors
 */
const zoomElements = (selectors: string[]) => {
  const foundElements: Element[] = [];
  selectors.forEach((selector) => {
    foundElements.push(...document.querySelectorAll(selector));
  });
  foundElements.forEach((element) => {
    const instance = panzoom(element as HTMLElement, { excludeClass, ...panZoomConfig });
    let container: HTMLElement;

    if (wrap) {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('style', 'overflow: hidden; position: relative;');
      element.parentElement?.insertBefore(wrapper, element);
      wrapper.appendChild(element);
      wrapper.addEventListener('wheel', (event) => {
        instance.zoomWithWheel(event);
      });
      wrapper.addEventListener('dblclick', () => {
        instance.reset();
      });
      container = wrapper;
    } else {
      (element as HTMLElement).style.position = 'relative';
      (element as HTMLElement).addEventListener('wheel', (event) => {
        instance.zoomWithWheel(event);
      });
      (element as HTMLElement).addEventListener('dblclick', () => {
        instance.reset();
      });
      container = element as HTMLElement;
    }

    // Add toolbar if enabled
    if (toolbarEnabled) {
      createToolbar(container, instance, toolbarPosition);
    }
  });
};

/**
 * Client module implementation.  Wait a bit before trying this, some components like mermaid take a second to process / render
 */
const ZoomModule: ClientModule = {
  onRouteDidUpdate() {
    setTimeout(() => {
      zoomElements(selectors);
    }, timeout);
  },
};

export default ZoomModule;
