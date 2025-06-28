# Using the Google Apps Script in Your Google Sheet

This document provides instructions on how to use the container-bound Google Apps Script associated with this Google Sheet. The script allows you to read data from and write sample data to your sheet using custom menus.

## Table of Contents
1.  [Opening the Apps Script Editor](#1-opening-the-apps-script-editor)
2.  [Using the Custom Scripts Menu](#2-using-the-custom-scripts-menu)
3.  [User Authentication](#3-user-authentication)
4.  [Script Functions Explained](#4-script-functions-explained)
5.  [Usage Notes & Best Practices](#5-usage-notes--best-practices)

---

### 1. Opening the Apps Script Editor

To view or edit the script, you need to open the Google Apps Script editor.

1.  Open your Google Sheet.
2.  Click on **Extensions** in the top menu bar.
3.  Select **Apps Script**.

This will open the script editor in a new browser tab, where you can see the `Code.gs` file containing the script's source code.

### 2. Using the Custom Scripts Menu

The script automatically creates a custom menu named **"Custom Scripts"** in the Google Sheet's UI every time the spreadsheet is opened.

This menu contains two items:
*   **Read Sheet Data**: Triggers a function to read all the data from the currently active sheet.
*   **Write Sample Data**: Triggers a function to clear the current sheet and write a predefined set of sample data.

To use the menu:
1.  Click on **Custom Scripts** in the menu bar.
2.  Select either **Read Sheet Data** or **Write Sample Data** from the dropdown to execute the corresponding function.
3.  An alert will appear confirming that the action has been completed.

### 3. User Authentication

The first time you try to run a function from the "Custom Scripts" menu, Google will require you to authorize the script.

1.  **Authorization Prompt**: A dialog box will appear stating "Authorization Required." Click **Continue**.
2.  **Choose Account**: Select the Google account you want to use to run the script.
3.  **"Google hasn't verified this app" Screen**: You may see a warning screen. This is standard for custom scripts that haven't been published to the Google Workspace Marketplace.
    *   Click **Advanced**.
    *   Click **Go to [Your Sheet Name] (unsafe)**.
4.  **Grant Permissions**: A final screen will ask for permission for the script to "View and manage your spreadsheets in Google Drive." This permission is required for the script to read and write data.
    *   Review the permissions and click **Allow**.

This is a **one-time process**. Once you have authorized the script, you will not need to do it again unless the script's permissions (scopes) are changed.

### 4. Script Functions Explained

*   `runReadSheetData()`:
    *   This function reads all the data from the active sheet.
    *   The data is then logged to the Apps Script **Execution log**.
    *   To view the log, open the Apps Script editor, go to the **View** menu, and select **Logs**.

*   `runWriteSheetData()`:
    *   **Warning**: This function will **clear all existing content** in the active sheet.
    *   It then writes a sample 2D array of data to the sheet, starting at cell A1.

### 5. Usage Notes & Best Practices

*   **Authorization Scope**: The script uses `/** @OnlyCurrentDoc */`, which limits its access to **only the spreadsheet it is bound to**. It cannot access any of your other files in Google Drive.
*   **Active Sheet**: The script always operates on the *currently active sheet* (the one you have open and selected). Be sure to select the correct sheet tab before running a script.
*   **Execution Logs**: For debugging or viewing the output of the `readSheetData` function, the Execution Log in the Apps Script editor is a valuable tool.
*   **Data Overwriting**: Be cautious when using the "Write Sample Data" function, as it will permanently delete the existing data on the active sheet.
