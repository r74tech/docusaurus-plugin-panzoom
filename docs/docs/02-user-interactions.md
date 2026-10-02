# User Interactions

For elements with pan and zoom functionality enabled, users can:

- **Pan**: Click and drag the element to move the view area
- **Zoom**: Use the mouse wheel (and/or shift + mouse wheel) to zoom in and out of the element
- **Reset**: Double-click the element to reset to the original view state

If the toolbar is enabled, users can also use the toolbar buttons to zoom in, zoom out, and reset the view. See the
[Configuration](03-getting-started/02-configuration.md) section to learn how to enable/disable the toolbar.

## Pinning to select text

The toolbar also has a pin button. Pinning suspends pan and zoom while keeping the current view, so that users can
select and copy the text inside the element (e.g. labels of a diagram). While pinned:

- dragging selects text instead of panning, and the cursor behaves as usual (e.g. a text cursor over text)
- the mouse wheel scrolls the page instead of zooming
- double-clicking selects a word instead of resetting the view
- the zoom buttons are disabled and the toolbar stays visible

Click the pin button again to resume pan and zoom.
