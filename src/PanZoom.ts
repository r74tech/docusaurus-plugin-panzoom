import panzoom, { PanzoomObject } from '@panzoom/panzoom';
import type { ClientModule } from '@docusaurus/types';
import { PanZoomPluginOptions, PanZoomPluginToolbarPosition } from './PanzoomPluginOptions';
import SvgZoomIn from './img/zoom-in';
import SvgZoomOut from './img/zoom-out';
import SvgZoomReset from './img/zoom-reset';
import SvgPin from './img/pin';
import SvgPinFilled from './img/pin-filled';
import './styles/panzoom.css';

// oxlint-disable-next-line typescript/no-require-imports
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
 * Per-element state shared between the toolbar and the event listeners
 */
type PanZoomState = {
  /**
   * While pinned, pan/zoom is suspended at the current view so that text can be selected
   */
  pinned: boolean;
};

// Inline styles that panzoom sets to make the element draggable. They are cleared while pinned.
const INTERACTION_STYLES = ['cursor', 'userSelect', 'touchAction'] as const;

/**
 * Suspend or resume pan/zoom on the element while keeping the current transform.
 * While pinned, the pointer handlers are unbound and the element behaves like normal content
 * (text cursor, text selection), so that the user can select the text inside it.
 *
 * @returns A function that toggles the pinned state
 */
const createPinController = (element: HTMLElement, instance: PanzoomObject, state: PanZoomState) => {
  const targets = [element, element.parentElement].filter((target): target is HTMLElement => target !== null);
  const savedStyles = new Map<HTMLElement, Record<string, string>>();

  return (pinned: boolean) => {
    if (state.pinned === pinned) {
      return;
    }
    state.pinned = pinned;

    if (pinned) {
      // destroy() only unbinds the pointer handlers. The current transform is kept.
      instance.destroy();
      targets.forEach((target) => {
        const saved: Record<string, string> = {};
        INTERACTION_STYLES.forEach((prop) => {
          saved[prop] = target.style[prop];
          target.style[prop] = '';
        });
        savedStyles.set(target, saved);
      });
      return;
    }

    targets.forEach((target) => {
      const saved = savedStyles.get(target);
      INTERACTION_STYLES.forEach((prop) => {
        target.style[prop] = saved?.[prop] ?? '';
      });
    });
    savedStyles.clear();
    instance.bind();
  };
};

/**
 * Creates a toolbar with zoom controls for a panzoom instance
 *
 * @param container The container element to append the toolbar to
 * @param instance The panzoom instance to control
 * @param position The position of the toolbar
 * @param state The state of the panzoom element
 * @param setPinned Function to suspend or resume pan/zoom
 */
const createToolbar = (
  container: HTMLElement,
  instance: PanzoomObject,
  position: PanZoomPluginToolbarPosition,
  state: PanZoomState,
  setPinned: (pinned: boolean) => void,
) => {
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

  const zoomButtons = [
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

  // Pin the current view to allow text selection
  const pinButton = createButton(SvgPin, '', () => {
    setPinned(!state.pinned);
    updatePinState();
  });

  const updatePinState = () => {
    const { pinned } = state;
    pinButton.innerHTML = pinned ? SvgPinFilled : SvgPin;
    pinButton.title = pinned ? 'Unpin to enable pan and zoom' : 'Pin to select text';
    pinButton.setAttribute('aria-pressed', String(pinned));
    container.classList.toggle('panzoom-pinned', pinned);
    zoomButtons.forEach((button) => {
      button.disabled = pinned;
    });
  };
  updatePinState();

  [...zoomButtons, pinButton].forEach((button) => toolbar.appendChild(button));
  container.appendChild(toolbar);
};

/**
 * Attach event listeners to the element where panzoom is applied.
 * The listeners to add are based on the configuration options provided.
 *
 * @param element The element to add event listeners to
 * @param instance The panzoom instance to control
 * @param state The state of the panzoom element
 */
const addEventListeners = (element: HTMLElement, instance: PanzoomObject, state: PanZoomState) => {
  const handleZoomWithWheel = (event: WheelEvent) => {
    // Leave the wheel to the page scroll while pinned
    if (state.pinned) {
      return;
    }

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
      // Double-click selects a word while pinned
      if (state.pinned) {
        return;
      }
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
    const instance = panzoom(element as HTMLElement, { excludeClass, ...panZoomConfig });
    const state: PanZoomState = { pinned: false };

    addEventListeners(container, instance, state);

    // Add toolbar if enabled
    if (enabled) {
      const setPinned = createPinController(element as HTMLElement, instance, state);
      createToolbar(container, instance, position, state, setPinned);
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
