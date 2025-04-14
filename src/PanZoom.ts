import panzoom, { PanzoomObject } from "@panzoom/panzoom";
import type { ClientModule } from '@docusaurus/types';
import { PanZoomPluginOptions } from "./PanzoomPluginOptions";

const config = require('@generated/docusaurus.config').default;
const { themeConfig } = config;
const { zoom }: { zoom: PanZoomPluginOptions } = themeConfig;
const { selectors = ['div.mermaid[data-processed="true"]', 'div.docusaurus-mermaid-container', '.drawio'], wrap = true, timeout = 1000, excludeClass = 'panzoom-exclude', ...panZoomConfig } = zoom;

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
    if (wrap) {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('style', "overflow: hidden");
      element.parentElement?.insertBefore(wrapper, element);
      wrapper.appendChild(element);
      wrapper.addEventListener('wheel', (event) => {
        instance.zoomWithWheel(event);
      });
      wrapper.addEventListener('dblclick', (event) => {
        instance.reset();
      });
    }
    if (!wrap) {
      (element as HTMLElement).addEventListener('wheel', (event) => {
        instance.zoomWithWheel(event);
      });
      (element as HTMLElement).addEventListener('dblclick', (event) => {
        instance.reset();
      });
    }
  })
}

/**
 * Client module implementation.  Wait a bit before trying this, some components like mermaid take a second to process / render
 */
const ZoomModule: ClientModule = {
  onRouteDidUpdate() {
    setTimeout(() => {
      zoomElements(selectors);
    }, timeout
    );
  },
}

export default ZoomModule;