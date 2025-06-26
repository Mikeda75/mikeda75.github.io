# Printable Output Implemented

Implemented the printable output functionality for the casting layout in `paneloptimizerfinal.html`.

**Changes:**

1.  **Added "Print Layout" Button:** A new button with `id="print-layout-btn"` has been added to the layout controls section.
2.  **Printable SVG Container:** A new `div` with `id="printable-layout-container"` was added to hold the generated SVG for printing.
3.  **`generatePrintableLayout()` Function:** This new JavaScript function dynamically creates an SVG representation of the current casting layout, ensuring dimensional accuracy by setting the `viewBox` attribute to the panel's dimensions in inches.
4.  **Print-Specific CSS:** Added `@media print` styles to hide all UI elements except for the `#printable-layout-container`, ensuring only the layout is printed on a landscape page.
5.  **Event Listener:** An event listener for the "Print Layout" button was added to call `generatePrintableLayout()` and trigger the browser's print dialog.