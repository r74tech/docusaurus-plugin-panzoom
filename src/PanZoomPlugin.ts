import type { PluginModule, ThemeConfigValidationContext } from '@docusaurus/types';
import  { Joi } from "@docusaurus/utils-validation";
import { PanZoomPluginOptions } from './PanzoomPluginOptions';
import { resolve } from 'path';

/**
 * Main module for the PanZoom plugin
 * @param context 
 * @param options 
 * @returns 
 */
export const PanZoomPlugin: PluginModule = (context, options) => {
    return {
        name: "docusaurus-plugin-panzoom",
        getClientModules() {
          return [
            resolve(__dirname, "./PanZoom")
          ]
        }
    }
};

/**
 * Theme validation rules for this plugin
 */
const panZoomValidator = Joi.object({
  zoom: Joi.object({
    selectors: Joi.array<string>(),
    wrap: Joi.boolean(),
    timeout: Joi.number(),
    excludeClass: Joi.string(),
    contain: Joi.alternatives().try(
      Joi.string().valid('inside', 'outside'),
      Joi.boolean().valid(false)
    ),
    disablePan: Joi.boolean(),
    disableXAxis: Joi.boolean(),
    disableYAxis: Joi.boolean(),
    doubleClick: Joi.alternatives().try(
      Joi.string().valid('reset', 'zoomIn', 'zoomOut'),
      Joi.boolean().valid(false)
    ),
  })
})

/**
 * Add a validation for the theme configuration
 * @param data
 * @returns
 */
export function validatedThemeConfig(data: ThemeConfigValidationContext<PanZoomPluginOptions>) {
    const {themeConfig, validate} = data;
    const validated = validate(panZoomValidator, themeConfig);
    return validated;
}
