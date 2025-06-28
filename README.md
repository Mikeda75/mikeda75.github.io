# CWE Production Dashboard

This project is a web application embedded in a Google Sheet that streamlines the production workflow for cast concrete panels. It reads data directly from your sheet, generates an interactive production schedule, and provides tools to create printable tracking sheets, panel stickers, and an interactive casting layout visualization.

## 1. Setup Instructions

Follow these steps to integrate the dashboard into your Google Sheet.

### Step 1: Prepare Your Google Sheet

1.  Create a new Google Sheet or open the one you want to use for your project.
2.  Create and name the following three tabs exactly as written (they are case-sensitive):
    *   `Project Information`
    *   `Panel Legend`
    *   `Casting Schedule`
3.  Populate these sheets with your project data according to the format described in the **"Required Sheet Format"** section below.

### Step 2: Add the Script Files

1.  In your Google Sheet, go to `Extensions` > `Apps Script`. This will open the script editor.
2.  **Add `Code.gs`:**
    *   In the script editor, you will see a file named `Code.gs`. Delete any existing content.
    *   Copy the entire content of the `Code.gs` file from this project.
    *   Paste it into the `Code.gs` file in your Apps Script editor.
3.  **Add `index.html`:**
    *   In the Apps Script editor, click the `+` icon next to "Files" and select "HTML".
    *   Name the new file `index.html` (the name must be exact) and press Enter.
    *   Delete any existing content in the new `index.html` file.
    *   Copy the entire content of the `index.html` file from this project.
    *   Paste it into the `index.html` file in your Apps Script editor.
4.  **Save the project:** Click the "Save project" icon (it looks like a floppy disk).

### Step 3: Authorize and Run

1.  **Refresh your Google Sheet:** Go back to your Google Sheet tab and refresh the page.
2.  **Open the Dashboard:** A new menu named **"CWE Tools"** should appear. Click it, then select **"Open CWE Dashboard"**.
3.  **Authorize the Script:**
    *   The first time you run it, a dialog will appear asking for authorization. Click "Continue".
    *   Choose your Google account.
    *   You may see a warning that the app isn't verified. Click "Advanced", then "Go to [Your Project Name] (unsafe)".
    *   Review the permissions and click "Allow".
4.  The dashboard will now open in a modal dialog and begin loading your data.

---

## 2. User Guide

### 2.1. Data Review
Once the dashboard loads, it will present you with the **Data Review** screen. Here you can verify that the data from your three sheets was parsed correctly.

### 2.2. Main Hub (Schedule View)
After clicking **"Confirm and Generate Schedule"**, you will be taken to the main hub, which displays the casting schedule. From here, you can use the navigation bar at the top to access all other features.

*   **Print Schedule**: Prints the main casting schedule.
*   **Generate Tracking Sheet**: Creates a printable QC checklist for every unique panel.
*   **Generate Stickers**: Takes you to the sticker configuration screen to create printable labels for each panel.
*   **View Casting Layout**: Opens the interactive tool to visualize and arrange forms for each cast.

### 2.3. Sub-Modules (Stickers, Tracking, Layout)
When you navigate to a sub-module, the navigation bar will update. Use the **"Back to Schedule"** button to return to the main hub at any time.

---

## 3. Required Sheet Format

### 3.1. Project Information
This sheet uses a simple key-value format. Column A is the label (e.g., "Project Name"), and Column B is the value.

| A              | B                  |
|----------------|--------------------|
| Project Name   | City Hall Expansion|
| Project Number | 2025-01            |
| Address        | 123 Main St.       |

### 3.2. Panel Legend
This sheet defines every unique panel type. The header row must be present and contain `Panel ID`.

| Panel ID | Length    | Width     | Thickness | Finish | Color |
|----------|-----------|-----------|-----------|--------|-------|
| P1       | 10' 5"    | 4' 2 1/2" | 3"        | Smooth | Grey  |
| P2       | 8' 0"     | 4' 0"     | 3"        | Broom  | Buff  |

### 3.3. Casting Schedule
This sheet defines the quantity of each panel needed for each cast. The header row must contain the `Panel ID`s from your Panel Legend.

| Cast # | P1 | P2 | P3 |
|--------|----|----|----|
| 1      | 4  | 8  | 0  |
| 2      | 4  | 4  | 6  |
| 3      | 0  | 4  | 6  |