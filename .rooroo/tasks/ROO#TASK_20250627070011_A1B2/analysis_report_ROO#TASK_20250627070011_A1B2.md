# Analysis Report: Casting Layout Placement and Position Parameters

**Task ID:** ROO#TASK_20250627070011_A1B2
**Goal:** Identify parameters controlling casting layout placement and position on print dialogue sheets within the project's codebase or documentation.

## Summary

This report identifies the key parameters and their origins that control the placement, sizing, and orientation of casting layouts on both the interactive visualization and the printable output sheets. The primary source of these controls is the `index.html` file, which contains the JavaScript logic for the interactive dashboard.

## Key Findings

The parameters influencing casting layout placement and position can be categorized into form-specific attributes, casting area dimensions, SVG viewport settings for printing, and general print CSS rules.

### 1. Form-Specific Placement and Dimensions

These parameters define the individual position, size, and orientation of each panel form within a casting area. They are stored and manipulated in the `layoutState.layouts[castIndex].forms` array within `index.html`.

*   **`x`**: The X-coordinate of the form's top-left corner, relative to the casting area's origin. (Units: inches)
    *   **Origin**: Initialized in [`initializeLayoutForCast()`](index.html:1365) and adjusted by [`autoPackForms()`](index.html:1375) for initial placement. Modified by user interaction in [`handleCanvasMouseMove()`](index.html:1741).
*   **`y`**: The Y-coordinate of the form's top-left corner, relative to the casting area's origin. (Units: inches)
    *   **Origin**: Initialized in [`initializeLayoutForCast()`](index.html:1366) and adjusted by [`autoPackForms()`](index.html:1375) for initial placement. Modified by user interaction in [`handleCanvasMouseMove()`](index.html:1742).
*   **`length`**: The length (dimension along the X-axis) of the form. (Units: inches)
    *   **Origin**: Parsed from the `panelLegend` data using [`parseDim()`](index.html:1368). Can be swapped with `width` during rotation for packing in [`autoPackForms()`](index.html:1448).
*   **`width`**: The width (dimension along the Y-axis) of the form. (Units: inches)
    *   **Origin**: Parsed from the `panelLegend` data using [`parseDim()`](index.html:1369). Can be swapped with `length` during rotation for packing in [`autoPackForms()`](index.html:1448).
*   **`rotation`**: The rotation angle of the form. (Units: degrees)
    *   **Origin**: Initialized to `0` in [`initializeLayoutForCast()`](index.html:1367). Can be set to `90` for packing in [`autoPackForms()`](index.html:1447). Modified by user interaction (holding 'R' and dragging) in [`handleCanvasMouseMove()`](index.html:1739).

### 2. Casting Area Dimensions

These parameters define the overall dimensions of the virtual casting area where forms are placed. They influence the scaling and arrangement of forms.

*   **`panelDimensions.length`**: The total length of the active casting area. (Units: inches)
    *   **Origin**: Part of [`layoutState`](index.html:767). Set by [`handleCastingAreaChange()`](index.html:1961) based on `castingAreas` presets or user input.
*   **`panelDimensions.width`**: The total width of the active casting area. (Units: inches)
    *   **Origin**: Part of [`layoutState`](index.html:767). Set by [`handleCastingAreaChange()`](index.html:1962) based on `castingAreas` presets or user input.
*   **`castingAreas` (presets)**: Predefined configurations for casting tables, including their individual `length` and `width`, and calculated `totalLength` and `totalWidth` for the combined area.
    *   **Origin**: Defined in [`index.html`](index.html:741-757).
*   **`layoutState.selectedCastingArea`**: Determines which preset (`presetA`, `presetB`) or custom area is currently active.
    *   **Origin**: Part of [`layoutState`](index.html:768). Controlled by the "Casting Area" dropdown (`#casting-area-selector`) and handled by [`handleCastingAreaChange()`](index.html:1946).

### 3. Printable SVG Viewport and Transformations

When the "Print Layout" button is clicked, the [`generatePrintableLayout()`](index.html:1876) function creates an SVG representation of the layout. The SVG's `viewBox` and the `<g>` element's `transform` attributes are crucial for controlling the placement and position on the printed page.

*   **SVG `viewBox` attribute**: Defines the coordinate system and visible area of the SVG.
    *   **Origin**: Constructed in [`generatePrintableLayout()`](index.html:1889) as `viewBox="-10 ${viewBoxY} ${panelLength + 20} ${viewBoxHeight}"`.
        *   `viewBoxY`: Calculated based on `titleAreaHeight` (line 1891).
        *   `panelLength + 20`: The width of the SVG viewport, including padding.
        *   `viewBoxHeight`: Calculated based on `panelWidth` and `titleAreaHeight` (line 1892).
*   **SVG `<g>` element `transform` attribute**: Applies translation and rotation to each individual form within the SVG.
    *   **Origin**: Constructed in [`generatePrintableLayout()`](index.html:1901) as `transform="translate(${x}, ${y}) rotate(${rotation}, ${length / 2}, ${width / 2})"`. This directly uses the form's `x`, `y`, `length`, `width`, and `rotation` values to position and orient it on the printed sheet.

### 4. Print Dialogue Sheet Layout (CSS `@page` Rules)

While not directly controlling the *casting layout* itself, these CSS rules define the overall paper size, orientation, and margins for the print dialogue sheets, which in turn affect how the casting layout is presented on the physical page.

*   **`@page { size: letter landscape; margin: 0.5in; }`**: The default page size and margins applied to the entire document when printing.
    *   **Origin**: Defined in the `<style>` block of [`index.html`](index.html:399).
*   **`@page schedule-page { size: letter landscape; margin: 0.25in; }`**: Specific page settings for the casting schedule.
    *   **Origin**: Defined in the `<style>` block of [`index.html`](index.html:417).
*   **`@page tracking-sheet-page { size: letter landscape; margin: 0.25in; }`**: Specific page settings for the tracking sheet.
    *   **Origin**: Defined in the `<style>` block of [`index.html`](index.html:420).
*   **`@page sticker-page { size: letter portrait; margin: ${settings.marginTop}in ${settings.marginLeft}in; }`**: Dynamically generated page settings for sticker sheets, based on user input.
    *   **Origin**: Dynamically created and appended to the document head by [`generateStickers()`](index.html:1193-1196).