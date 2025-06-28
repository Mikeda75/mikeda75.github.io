/**
 * @OnlyCurrentDoc
 */

/**
 * Creates a custom menu in the spreadsheet UI.
 * The onOpen function runs automatically when the spreadsheet is opened.
 */
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('CWE Tools')
      .addItem('Open CWE Dashboard', 'showUrlDialog') // Point to the redirect function
      .addToUi();
}

/**
 * This is a shim function to handle Google's trigger caching.
 * It catches calls to the old function name and redirects them to the correct one.
 */
function showUrlDialog() {
  showDashboardDialog();
}

/**
 * Shows a modal dialog with the content of the index.html file.
 * This method renders the UI directly in the sheet, providing the most stable experience.
 */
function showDashboardDialog() {
  try {
    // Create an HTML output object from the index.html file.
    // .evaluate() is crucial as it processes any scriptlets in the HTML file.
    // By setting a very large width and height, we force the dialog to the maximum possible size.
    var htmlOutput = HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setWidth(4000)
        .setHeight(4000);
    
    // Open the HTML in a modal dialog.
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'CWE Production Dashboard');
  } catch (e) {
    Logger.log(e);
    SpreadsheetApp.getUi().alert('An error occurred while trying to open the dashboard: ' + e.message);
  }
}

/**
 * A server-side function to be called from the client-side HTML.
 * It reads data from sheets named "Project Information", "Panel Legend",
 * and "Casting Schedule" in the active spreadsheet.
 *
 * @returns {object} An object containing the parsed data from the sheets.
 *                   Returns {error: "message"} if a required sheet is not found.
 */
function getSheetData() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const projectInfoSheet = ss.getSheetByName("Project Information");
    const panelLegendSheet = ss.getSheetByName("Panel Legend");
    const castingScheduleSheet = ss.getSheetByName("Casting Schedule");

    if (!panelLegendSheet) {
      return { error: 'Sheet "Panel Legend" not found. Please ensure it exists and is named correctly.' };
    }

    const projectInfoData = projectInfoSheet ? projectInfoSheet.getDataRange().getValues() : null;
    const panelLegendData = panelLegendSheet ? panelLegendSheet.getDataRange().getValues() : null;
    
    // The client will decide whether to use castingScheduleSheet or projectInfoSheet for the schedule
    const castingScheduleData = castingScheduleSheet ? castingScheduleSheet.getDataRange().getValues() : null;

    return {
      projectInfoData: projectInfoData,
      panelLegendData: panelLegendData,
      castingScheduleData: castingScheduleData,
      // Also pass projectInfoData again in a separate property if castingScheduleData is null, so client can check it.
      projectInfoForSchedule: castingScheduleData ? null : projectInfoData
    };
  } catch (e) {
    Logger.log(e);
    return { error: e.message };
  }
}