import type { PanzoomOptions } from '@panzoom/panzoom';

export type PanZoomPluginOptions = PanzoomOptions & {

  /**
   * A list of selectors to look for elements to enable pan and zoom
   *
   * The default value is ['div.mermaid[data-processed="true"]', '.drawio']
   */
  selectors?: string[];

  /**
   * Whether to wrap the panzoom items in a div with overflow:hidden.  This constrains
   * the pan zoom detail into the original container.
   *
   * default: true
   */
  wrap?: boolean;

  /**
   * The amount of time to wait in MS before the plugin client module tries to look for
   * and alter pan zoom elements.  Some renders take a little bit before they appear in the
   * dom to find.
   *
   * The default is 1000
   */
  timeout?: number;

  /**
   * Add this class to any element within the Panzoom element that you want to exclude from Panzoom handling.
   * That element's children will also be excluded. e.g. links and buttons that should not propagate the click event.
   * 
   * default: 'panzoom-exclude'
   */
  excludeClass?: string;

  /**
   * Contain the panning within the parent element.
   *
   * Possible values:
   * - 'inside': The panzoom element can only be panned inside the parent element
   * - 'outside': The panzoom element can only be panned such that it's not completely outside the parent element
   * - false: No containment (default)
   */
  contain?: 'inside' | 'outside' | false;

  /**
   * Disable panning functionality.
   *
   * default: false
   */
  disablePan?: boolean;

  /**
   * Disable panning in the X direction.
   *
   * default: false
   */
  disableXAxis?: boolean;

  /**
   * Disable panning in the Y direction.
   *
   * default: false
   */
  disableYAxis?: boolean;

  /**
   * Customize the behavior of the double-click action.
   *
   * Possible values:
   * - 'reset': Reset the pan/zoom to the initial state (default)
   * - 'zoomIn': Zoom in by the step amount
   * - 'zoomOut': Zoom out by the step amount
   * - false: Disable double-click handling
   */
  doubleClick?: 'reset' | 'zoomIn' | 'zoomOut' | false;
}