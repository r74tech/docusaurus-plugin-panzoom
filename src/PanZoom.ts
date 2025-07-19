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
  toolbar: { enabled = false, position = PanZoomPluginToolbarPosition.TopRight, opacity = 0 } = {},
  enableWheelZoom = true,
  enableWheelZoomWithShift = false,
  enableDoubleClickResetZoom = true,
  restrictZoomOutBeyondOrigin = false,
  ...panZoomConfig
} = zoom;

/**
 * Creates a toolbar with zoom controls for a panzoom instance
 *
 * @param container The container element to append the toolbar to
 * @param instance The panzoom instance to control
 * @param position The position of the toolbar
 */
const createToolbar = (container: HTMLElement, instance: PanzoomObject, position: PanZoomPluginToolbarPosition) => {
  const toolbar = document.createElement('div');
  toolbar.className = `panzoom-toolbar panzoom-toolbar-${position} ${excludeClass}`;

  // Apply custom opacity from configuration
  toolbar.style.opacity = opacity.toString();

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
    // Zoom in
    createButton(SvgZoomIn, 'Zoom in', () => {
      instance.zoomIn();
    }),
    // Zoom out
    createButton(SvgZoomOut, 'Zoom out', () => {
      if (!restrictZoomOutBeyondOrigin) {
        instance.zoomOut();
        return;
      }
      if (instance.getScale() > 1) {
        instance.zoomOut();
      }
    }),
    // Reset zoom
    createButton(SvgZoomReset, 'Reset zoom', () => {
      instance.reset();
    }),
  ];

  buttons.forEach((button) => toolbar.appendChild(button));
  container.appendChild(toolbar);
};

/**
 * Attach event listeners to the element where panzoom is applied.
 * The listeners to add are based on the configuration options provided.
 *
 * @param element The element to add event listeners to
 * @param instance The panzoom instance to control
 */
const addEventListeners = (element: HTMLElement, instance: PanzoomObject) => {
  const handleZoomWithWheel = (event: WheelEvent) => {
    if (restrictZoomOutBeyondOrigin) {
      // Allow zooming in or zooming out only to the original size
      if (event.deltaY < 0 || (event.deltaY > 0 && instance.getScale() > 1)) {
        instance.zoomWithWheel(event);
      }
    } else {
      instance.zoomWithWheel(event);
    }
  };

  // Handle the wheel zoom functionality if at least one of the options is enabled
  if (enableWheelZoom || enableWheelZoomWithShift) {
    element.addEventListener('wheel', (event) => {
      // Handle zoom with shift key
      if (enableWheelZoomWithShift && event.shiftKey) {
        handleZoomWithWheel(event);
        return;
      }

      // Handle regular zoom
      if (enableWheelZoom && !event.shiftKey) {
        handleZoomWithWheel(event);
      }
    });
  }

  // Handle double-click reset zoom
  if (enableDoubleClickResetZoom) {
    element.addEventListener('dblclick', () => {
      instance.reset();
    });
  }
};

/**
 * Main work method to zoom the set of elements.  You can pass in global options to the pan zoom component
 * as well as control whether the items will be wrapped.
 *
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
      container = wrapper;
    } else {
      const htmlElement = element as HTMLElement;
      htmlElement.style.position = 'relative';
      container = htmlElement;
    }

    addEventListeners(container, instance);

    // Add toolbar if enabled
    if (enabled) {
      createToolbar(container, instance, position);
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
