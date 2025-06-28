# Plan Overview: Integrate index.html with Google Sheets via Google Apps Script

## Overall Strategy
The objective is to enable `index.html` to directly read data from an *open* Google Sheet using Google Apps Script. This will be achieved by:
1.  Developing a server-side Google Apps Script function (`Code.gs`) to securely fetch data from specified sheets within the active spreadsheet.
2.  Modifying the client-side `index.html` to invoke this Apps Script function using `google.script.run`, replacing the current Google Drive API and CORS proxy approach.
3.  Providing comprehensive deployment instructions, as `index.html` must be deployed as a Google Apps Script Web App for `google.script.run` to function correctly.

## Sub-tasks

### 1. Implement Google Apps Script Backend
*   **Task ID:** ROO#SUB_ROO#TASK_20250626191416_1a2b3c-DEV_S001_20250626191420_a1b2c3
*   **Expert:** 🧑💻 Rooroo Developer
*   **Objective:** Create a Google Apps Script function in `Code.gs` that reads data from the "Project Information", "Panel Legend", and "Casting Schedule" sheets of the active Google Sheet and returns it as a structured JSON object.

### 2. Integrate Frontend with Apps Script
*   **Task ID:** ROO#SUB_ROO#TASK_20250626191416_1a2b3c-DEV_S002_20250626191420_d4e5f6
*   **Expert:** 🧑💻 Rooroo Developer
*   **Objective:** Modify `index.html` to remove the existing Google Drive API integration and CORS proxy. Implement `google.script.run` to call the Apps Script function from Sub-task 1 and process the returned data, updating the UI accordingly.

### 3. Provide Deployment Instructions
*   **Task ID:** ROO#SUB_ROO#TASK_20250626191416_1a2b3c-DOC_S003_20250626191420_g7h8i9
*   **Expert:** ✍️ Rooroo Documenter
*   **Objective:** Create a new file `DEPLOYMENT.md` containing detailed, step-by-step instructions on how to deploy the Google Apps Script project (including `index.html` and `Code.gs`) as a Web App, and how to access it.

## Key Dependencies
*   Sub-task 2 depends on Sub-task 1.
*   Sub-task 3 depends on Sub-tasks 1 and 2.

## Assumptions Made
*   The user intends to deploy `index.html` as a Google Apps Script Web App.
*   The Google Sheet will contain sheets named "Project Information", "Panel Legend", and "Casting Schedule" with the expected data structure.
*   The `index.html` file is the primary frontend interface.

## Potential Risks
*   Google Apps Script execution limits or authorization issues.
*   Complexity of handling very large datasets directly via `google.script.run` (though current data size seems manageable).