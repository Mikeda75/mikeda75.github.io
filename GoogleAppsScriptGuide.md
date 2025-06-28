# A Guide to Google Apps Script in Google Sheets

This guide provides detailed instructions on how to set up and use Google Apps Script within a Google Sheets file. We'll cover creating, writing, and running scripts, and how to link them to sheet actions or triggers.

## 1. What is Google Apps Script?

Google Apps Script is a cloud-based scripting language for light-weight application development in the Google Workspace platform. It is based on JavaScript, but it runs on Google's servers. It allows you to automate tasks, create custom functions and menus, and integrate Google Sheets with other Google services like Docs, Forms, and Gmail.

## 2. Accessing the Script Editor

Every Google Sheet has a bound script project. To access it:

1.  Open your Google Sheet.
2.  Click on **Extensions** in the menu bar.
3.  Select **Apps Script**.

This will open the Apps Script editor in a new browser tab, linked to your spreadsheet. You will see a default file named `Code.gs`. This is where you will write your script.

## 3. Creating and Writing a Script

You can write your code directly in the `Code.gs` file. Let's start with a simple example.

**Example: "Hello, World"**

Replace any existing code in [`Code.gs`](Code.gs:1) with the following:

```javascript
function helloWorld() {
  SpreadsheetApp.getUi().alert('Hello, world!');
}
```

*   `function helloWorld()`: This defines a new function named `helloWorld`.
*   `SpreadsheetApp.getUi()`: This gets the user interface environment for the active spreadsheet, allowing the script to interact with it.
*   `.alert('Hello, world!')`: This creates a simple dialog box with the specified message.

## 4. Running a Script Manually

To run your `helloWorld` function:

1.  **Save the script:** Click the floppy disk icon (Save project) in the editor's toolbar.
2.  **Select the function to run:** From the dropdown menu in the toolbar, select `helloWorld`.
3.  **Run the function:** Click the **Run** button (it looks like a play button).

The first time you run a script, Google will ask for authorization.

### Authorization

*   A "Authorization required" dialog will appear. Click **Review permissions**.
*   Choose the Google account you want to authorize the script for.
*   You may see a "Google hasn’t verified this app" screen. This is normal for your own scripts. Click **Advanced**, and then click **Go to [Your Project Name] (unsafe)**.
*   Review the permissions the script is requesting and click **Allow**.

After authorization, the script will run. Go back to your spreadsheet, and you should see an alert box with "Hello, world!".

## 5. Understanding the `Code.gs` Example

The provided [`Code.gs`](Code.gs:1) file demonstrates more advanced concepts. Let's break down its key parts.

### Creating a Custom Menu (`onOpen`)

The `onOpen()` function is a **simple trigger**. It runs automatically every time the spreadsheet is opened.

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('CWE Dashboard') // Creates a new menu named "CWE Dashboard"
      .addItem('Open Dashboard', 'showSidebar') // Adds an item that runs 'showSidebar'
      .addSeparator() // Adds a dividing line in the menu
      .addItem('Read All Project Data', 'runGetProjectData')
      .addToUi(); // Adds the menu to the spreadsheet's UI
}
```

This script creates a custom menu in your sheet, allowing you to easily trigger other functions.

### Interacting with the Spreadsheet

*   **Reading Data:** The `getSheetData()` function reads data from multiple sheets (`Panel Legend`, `Casting Schedule`, etc.) and formats it into a JavaScript object. It uses `SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SheetName")` to get a specific sheet and `sheet.getDataRange().getValues()` to get all the data from that sheet.

*   **Writing Data:** The `writeSheetData(data)` function takes a 2D array of data and writes it to the active sheet using `sheet.getRange(1, 1, numRows, numCols).setValues(data)`.

## 6. Linking Scripts to Triggers

Triggers are a powerful feature that allows you to automate your scripts.

### Simple Triggers

Apps Script has a few reserved function names for simple triggers:
*   `onOpen()`: Runs when the spreadsheet is opened.
*   `onEdit(e)`: Runs when a user changes a value in the spreadsheet. The event object `e` contains information about the edit.
*   `onInstall(e)`: Runs when a user installs an Editor Add-on.

### Installable Triggers

For more control, you can create **installable triggers** programmatically or manually:

1.  In the Apps Script editor, click the **Triggers** icon (a clock) on the left sidebar.
2.  Click the **+ Add Trigger** button in the bottom right.
3.  Configure the trigger:
    *   **Choose which function to run:** Select one of your script's functions.
    *   **Select event source:** Choose `From spreadsheet`.
    *   **Select event type:** Choose an event like `On edit`, `On change`, or `Time-driven` (e.g., run a script every day).
4.  Click **Save**.

This allows you to run scripts in response to specific events without needing a user to manually run them from the menu.

---

By following these steps, you can effectively use Google Apps Script to automate and enhance your Google Sheets. The existing [`Code.gs`](Code.gs:1) file in your project is an excellent reference for building more complex functionality.