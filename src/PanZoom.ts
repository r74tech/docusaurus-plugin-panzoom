import type { ClientModule } from '@docusaurus/types';
import panzoom, { type PanzoomObject } from '@panzoom/panzoom';
import type { PanZoomPluginOptions } from './PanzoomPluginOptions';

const config = require('@generated/docusaurus.config').default;
const { themeConfig } = config;
const { zoom }: { zoom: PanZoomPluginOptions } = themeConfig;
const {
  selectors = ['div.mermaid[data-processed="true"]', 'div.docusaurus-mermaid-container', '.drawio'],
  wrap = true,
  timeout = 1000,
  excludeClass = 'panzoom-exclude',
  doubleClick = 'reset',
  ...panZoomConfig
} = zoom;

/**
 * Main work method to zoom the set of elements.  You can pass in global options to the pan zoom component
 * as well as control whether the items will be wrapped.
 * @param selectors
 */
const zoomElements = (selectors: string[]) => {
  const foundElements: Element[] = [];
  for (const selector of selectors) {
    foundElements.push(...document.querySelectorAll(selector));
  }
  for (const element of foundElements) {
    // Create PanZoom instance with all options
    const instance = panzoom(element as HTMLElement, { excludeClass, ...panZoomConfig });

    // Handle wrapping
    if (wrap) {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('style', 'overflow: hidden');
      element.parentElement?.insertBefore(wrapper, element);
      wrapper.appendChild(element);

      // Add wheel event for zoom
      wrapper.addEventListener('wheel', (event) => {
        instance.zoomWithWheel(event);
      });

      // Handle double-click behavior
      if (doubleClick !== false) {
        wrapper.addEventListener('dblclick', (_event) => {
          handleDoubleClick(instance, doubleClick);
        });
      }
    } else {
      // Add wheel event for zoom
      (element as HTMLElement).addEventListener('wheel', (event) => {
        instance.zoomWithWheel(event);
      });

      // Handle double-click behavior
      if (doubleClick !== false) {
        (element as HTMLElement).addEventListener('dblclick', (_event) => {
          handleDoubleClick(instance, doubleClick);
        });
      }
    }

    // Add event listeners for panzoom events
    element.addEventListener('panzoomstart', (_event) => {
      // Event when panzoom starts - can be used for custom handling
    });

    element.addEventListener('panzoomchange', (_event) => {
      // Event when panzoom changes - can be used for custom handling
    });

    element.addEventListener('panzoomend', (_event) => {
      // Event when panzoom ends - can be used for custom handling
    });
  }
};

/**
 * Handle different double-click behaviors
 * @param instance The panzoom instance
 * @param action The doubleClick action
 */
const handleDoubleClick = (instance: PanzoomObject, action: 'reset' | 'zoomIn' | 'zoomOut') => {
  switch (action) {
    case 'reset':
      instance.reset();
      break;
    case 'zoomIn': {
      const currentScale = instance.getScale();
      instance.zoom(currentScale * 1.5, { animate: true });
      break;
    }
    case 'zoomOut': {
      const currentScale2 = instance.getScale();
      instance.zoom(currentScale2 / 1.5, { animate: true });
      break;
    }
  }
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
