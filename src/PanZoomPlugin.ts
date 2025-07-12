import type { PluginModule, ThemeConfigValidationContext } from '@docusaurus/types';
import { Joi } from '@docusaurus/utils-validation';
import { PanZoomPluginOptions, PanZoomPluginToolbarPosition } from './PanzoomPluginOptions';
import { resolve } from 'path';

/**
 * Main module for the PanZoom plugin
 * @param context
 * @param options
 * @returns
 */
export const PanZoomPlugin: PluginModule = (context, options) => {
  return {
    name: 'docusaurus-plugin-panzoom',
    getClientModules() {
      return [resolve(__dirname, './PanZoom'), resolve(__dirname, './styles/panzoom.css')];
    },
  };
};

// Extract the valid toolbar position values from the enum
const validToolbarPositions = Object.values(PanZoomPluginToolbarPosition);

/**
 * Theme validation rules for this plugin
 */
const panZoomValidator = Joi.object({
  zoom: Joi.object({
    selectors: Joi.array<string>(),
    wrap: Joi.boolean(),
    timeout: Joi.number(),
    excludeClass: Joi.string(),
    toolbarEnabled: Joi.boolean(),
    toolbarPosition: Joi.string().valid(...validToolbarPositions),
    toolbarOpacity: Joi.number().min(0).max(1),
  }),
});

/**
 * Add a validation for the theme configuration
 * @param data
 * @returns
 */
export function validatedThemeConfig(data: ThemeConfigValidationContext<PanZoomPluginOptions>) {
  const { themeConfig, validate } = data;
  const validated = validate(panZoomValidator, themeConfig);
  return validated;
}
