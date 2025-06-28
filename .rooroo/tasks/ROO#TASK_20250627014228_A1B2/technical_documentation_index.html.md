# Technical Documentation: CWE Production Dashboard (index.html)

## 1. Overview

This document provides a deep technical analysis of the `index.html` file, which constitutes the entire frontend for the CWE Production Dashboard. The application is a self-contained, single-page web app designed to be run as a Google Apps Script web app. Its primary purpose is to fetch production data from a Google Sheet, allow the user to review it, and then generate several key production documents: a casting schedule, quality control tracking sheets, printable panel stickers, and an interactive casting layout visualization.

The application is designed for a specific workflow:
1.  **Data Loading**: Automatically fetches data from the associated Google Sheet on startup.
2.  **Data Review**: Presents the parsed project information, panel legend, and casting schedule for user confirmation.
3.  **Document Generation**: Upon confirmation, it generates and displays the primary casting schedule.
4.  **Auxiliary Views**: Allows the user to navigate to different views to generate and print stickers, tracking sheets, and visualize/manipulate the casting layout.

---

## 2. Architecture

The application employs a monolithic, single-file architecture. All necessary HTML, CSS, and JavaScript are contained within [`index.html`](index.html:1). This design choice is common for Google Apps Script web apps, as it simplifies deployment—only one file needs to be served.

-   **HTML**: Defines the structure of the user interface, including all containers for different views (data review, schedule output, sticker generation, etc.).
-   **CSS**: Contained within a `<style>` block in the `<head>`. It defines a modern, dark-themed UI, a complete set of utility styles (buttons, forms, cards), and comprehensive print-specific styles to format the output for physical documents.
-   **JavaScript**: Contained within a `<script>` block at the end of the `<body>`. It encompasses all client-side logic, including communication with the Google Apps Script backend, data parsing, state management, UI manipulation, and the complex logic for the interactive canvas-based layout editor.

---

## 3. HTML Structure

The HTML body is organized into several key containers that function as different "views" or "pages" within the single-page application. The visibility of these views is controlled by JavaScript.

### Core Containers

-   [`<div id="loading-overlay">`](index.html:445): A full-screen overlay with a spinner, displayed while the initial data is being fetched from the Google Apps Script backend.
-   [`<div class="main-container">`](index.html:452): The primary wrapper for all application content. It uses `flex-direction: column` and `overflow-y: auto` to manage the layout and allow scrolling of content while the body itself is fixed.

### Main Views & UI Sections

The application's UI is divided into distinct sections, each with a specific purpose. JavaScript's `Navigation` module manages which section is visible at any time.

-   **Header & Navigation Controls**:
    -   [`<div id="output-controls">`](index.html:453): A persistent navigation bar that appears after the initial data review. It contains buttons to go "Back to Review," "Back to Schedule," and to trigger the generation of other documents like stickers and tracking sheets.
    -   [`<div id="review-actions">`](index.html:470): A sticky bar visible only during the review step, containing the "Confirm and Generate Schedule" button.

-   **Primary Content Views**:
    -   [`<div id="review-container">`](index.html:473): The initial view shown after data is loaded. It contains subsections to display parsed `Project Information`, `Panel Legend`, and `Casting Schedule` for user verification.
    -   [`<div id="output">`](index.html:489): Displays the main generated casting schedule in a series of tables, one for each cast.
    -   [`<div id="sticker-sheet-container">`](index.html:493): The view for generating and displaying printable stickers. It includes a collapsible `<details>` element ([`<details id="sticker-settings-details">`](index.html:499)) that allows the user to configure the sticker sheet layout (dimensions, margins, etc.). The generated stickers are injected into [`<div id="sticker-sheets-output">`](index.html:544).
    -   [`<div id="tracking-sheet-container">`](index.html:546): Displays the generated QC tracking sheets, organized by cast.
    -   [`<div id="casting-layout-container">`](index.html:547): The most complex view, containing the interactive casting layout editor. It includes controls for selecting a casting area preset, saving/loading/resetting layouts, and a wrapper ([`<div id="layouts-wrapper">`](index.html:576)) where the canvas elements for each cast are dynamically created.
    -   [`<div id="form-info-box">`](index.html:579): A small, absolutely positioned `div` that acts as a tooltip, displaying information about a form on the canvas when hovered.

-   **Print-Only Containers**:
    -   [`<div id="printable-layout-container">`](index.html:582): A hidden container that is populated with an SVG representation of the casting layouts specifically for high-quality printing.

---

## 4. CSS Styling

The CSS is defined within a single [`<style>`](index.html:7) tag and implements a cohesive, modern design system.

### Design System (CSS Variables)

A comprehensive set of CSS variables (custom properties) is defined in [`:root`](index.html:10) to ensure consistency in colors, fonts, and shadows across the application. This makes the UI easy to theme and maintain.

-   **Colors**: `bg-main`, `bg-card`, `text-primary`, `text-secondary`, `border-color`, and various accent colors for different states (primary, success, danger).
-   **Typography**: `font-family-sans` is set to 'Inter'.
-   **Shadows**: Pre-defined `box-shadow` values (`shadow-sm`, `shadow-md`, `shadow-lg`) provide consistent depth.

### Component Styling

The CSS provides styles for all standard UI elements, giving the application a custom look and feel.

-   **Cards** ([`.card`](index.html:73)): The primary container for content sections, featuring a background color, border, border-radius, and shadow.
-   **Buttons** ([`button`](index.html:106), `.btn-primary`, etc.): A variety of button styles are defined, including primary, secondary, and success variants, with hover effects and disabled states.
-   **Forms & Inputs** ([`input`](index.html:170), `select`, `textarea`): All form elements are styled to match the dark theme, with consistent padding, borders, and focus states.
-   **Tables** ([`table`](index.html:194)): Tables are styled for readability with alternating row colors and distinct headers.
-   **Collapsible Details** ([`details`](index.html:348)): The `<details>` element is custom-styled to look like an accordion, with the default marker replaced by a rotating `▶` icon.

### Layout & Responsiveness

-   The main layout is managed by Flexbox (e.g., in `.main-container` and button groups).
-   The sticker layout settings use CSS Grid for a responsive arrangement of input fields.
-   The sticker sheets themselves are generated using CSS Grid or Flexbox depending on the version, to precisely position the stickers for printing.

### Print Styles (`@media print`)

A critical feature is the extensive set of print styles starting at [`@media print`](index.html:398). These rules completely transform the application's appearance for printing.

-   **Page Setup**: Defines default page size and margins using `@page`. Specific page rules are also defined for different document types (e.g., `@page schedule-page`).
-   **Visibility**: Hides all interactive UI elements like headers, buttons, and navigation.
-   **Content Display**: Explicitly sets the containers for the content to be printed (e.g., `#output`, `#sticker-sheet-container`) to `display: block !important`.
-   **Styling Reset**: Resets colors to black on white (`* { color: #000 !important; background-color: #fff !important; }`) and removes shadows.
-   **Page Breaks**: Uses `page-break-after` and `page-break-inside` to control how content flows across printed pages, preventing tables and stickers from being awkwardly split.
-   **Targeted Printing**: A helper class system ([`body.printing .printing-target`](index.html:428)) is used by the `prepareAndPrint` JavaScript function to ensure only the desired container is visible during the print operation.

---

## 5. JavaScript Application Logic

The application's logic is contained within a single [`<script>`](index.html:588) tag. It is well-structured into "modules" using comments.

### Module: Google Apps Script Integration

-   **`loadDataFromActiveSheet()`**: This is the entry point for data fetching. It calls the `getSheetData` function on the server-side (`Code.gs`) using `google.script.run`.
    -   It displays the [`#loading-overlay`](index.html:445) before the call.
    -   It uses `.withSuccessHandler()` to pass the returned data to the `processData` function.
    -   It uses `.withFailureHandler()` to log any communication errors.

### Module: Navigation

This logic is encapsulated in an IIFE (Immediately Invoked Function Expression) named `Navigation`.

-   **`Navigation.showView(viewId)`**: The core function for controlling the UI. It iterates through a list of known view IDs, showing the one that matches `viewId` and hiding all others. It then calls `updateControls`.
-   **`Navigation.updateControls(viewId)`**: Manages the state of the navigation controls based on the currently active view. It shows/hides the main control bar, the review actions bar, and dynamically adds/removes view-specific buttons (like "Print Stickers").

### Module: App State & Initialization

This section defines the global state objects.

-   **`appState`**: A centralized object that holds all the critical data for the application once it's parsed.
    -   `panelLegend`: Object containing details for each panel type.
    -   `castingSchedule`: Array of objects, where each object represents a day's cast.
    -   `projectInfo`: Key-value object of project metadata.
    -   `projectName`: The project name, extracted for easy access.
-   **`castingAreas`**: A configuration object defining the dimensions and properties of preset casting areas (e.g., "Preset A", "Preset B").
-   **`layoutState`**: Holds the state for the interactive casting layout editor.
    -   `layouts`: An object where each key is a cast index and the value is the layout data for that cast (form positions, rotations, etc.).
    -   `isDragging`, `isRotating`, `rKeyDown`: Booleans that track the user's interaction state with the canvas.

### Module: Data Parsing

These are utility functions for transforming the raw, 2D-array data from Google Sheets into structured JavaScript objects.

-   **`parseDim(dimStr)`**: A robust function that parses dimension strings like `"10' 5 1/2\""` into a single numerical value in inches. It handles feet, inches, and fractions.
-   **`parseSheetAsKeyValue(data)`**: Parses a two-column sheet into a simple key-value object. Used for `Project Information`.
-   **`parseSheetAsObjects(data, keyColumn)`**: Parses a sheet with headers into an array of objects. Used for the `Panel Legend`.
-   **`parseCastingSchedule(data, panelLegend)`**: The most complex parser. It intelligently finds the header row in the casting schedule data and parses the grid of quantities into an array of cast objects.
-   **`processData(rawData)`**: The orchestrator function called after data is fetched. It uses the other parsing functions to process the raw data, populates the `appState` object, and then calls `displayReviewData()` to render the initial confirmation view.

### Module: UI & Output Generation

These functions are responsible for rendering data into the HTML DOM.

-   **`displayReviewData()`**: Builds and injects HTML tables into the `#review-container` to show the user the parsed data for confirmation.
-   **`generateSchedule(...)`**: Generates the HTML for the main casting schedule view (`#output`).
-   **`generateStickers()`**: A complex function that:
    1.  Reads sticker layout settings from the UI form.
    2.  Generates unique IDs for every single panel instance across all casts (e.g., `P1.01`, `P1.02`).
    3.  Dynamically creates a `<style>` tag with CSS rules tailored to the user's layout settings.
    4.  Generates the HTML for each sticker and arranges them into "sheets" that respect the configured rows and columns.
    5.  Injects the final HTML into the `#sticker-sheets-output` container.
-   **`generateTrackingSheet()`**: Generates HTML tables for the quality control tracking sheets, with a row for each unique panel instance.

### Module: Casting Layout Visualization (Interactive)

This is the most advanced feature of the application, providing an interactive, canvas-based editor.

-   **Initialization**:
    -   **`initializeLayoutForCast(castIndex)`**: When the layout view is opened, this function is called for each cast. It generates the initial set of "form" objects for the cast, including their dimensions (parsed from the `panelLegend`).
    -   **`autoPackForms(...)`**: A simple packing algorithm that provides a default, non-overlapping arrangement of forms on the casting tables. This gives the user a reasonable starting point.
-   **Drawing**:
    -   **`drawCastingLayout(castIndex, canvas)`**: The main rendering function. It gets the 2D context of a given canvas and draws the entire layout for that cast.
    -   It calculates a `scale` factor to fit the entire casting area onto the canvas.
    -   It draws the casting tables (the background).
    -   It iterates through each `form` in the `layoutState`, applies its position (`x`, `y`) and `rotation` using canvas transforms (`translate`, `rotate`), and draws it as a colored rectangle with its ID as text.
-   **Event Handling**:
    -   A set of event handlers (`handleCanvasMouseDown`, `handleCanvasMouseMove`, `handleCanvasMouseUp`, `handleKeyDown`, `handleKeyUp`) work together to manage user interaction.
    -   **Dragging**: On `mousedown`, it identifies which form was clicked, sets `isDragging` to true, and records the starting position. On `mousemove`, it updates the form's `x` and `y` coordinates and redraws the canvas.
    -   **Rotating**: It listens for the 'r' key. If 'r' is held down while dragging, it changes the interaction from moving the form to rotating it.
-   **Persistence**:
    -   **`saveLayout()`** and **`loadLayout()`**: These functions use the browser's `localStorage` to save and retrieve the state of a cast's layout, allowing the user's arrangements to persist between sessions.
-   **Printing**:
    -   **`generatePrintableLayout()`**: This function generates a high-quality, printable version of the layouts. Instead of relying on a canvas screenshot, it creates an `<svg>` representation of each layout, which provides crisp vector graphics when printed. It then uses the `prepareAndPrint` utility to print this SVG content.

### Module: Event Listeners & UI Handlers

-   **`DOMContentLoaded` Listener**: The main entry point of the application. It waits for the page to be fully loaded and then attaches all the necessary event listeners to the buttons and other interactive elements.
-   **`prepareAndPrint(containerId)`**: A utility function that prepares the page for printing by adding a special class to the body and the target container. This allows the `@media print` CSS rules to correctly show only the desired content. It uses a timeout to ensure the browser has time to apply the style changes before the print dialog opens.
