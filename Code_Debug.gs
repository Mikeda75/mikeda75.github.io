/**
 * Debug function to extract all data from specified Google Sheets and log it.
 * This function can be run manually from the Google Apps Script editor.
 */
function debugExtractSheetData() {
  try {
    const sheetData = getSheetData(); // Call the existing function to get data
    
    if (sheetData.error) {
      Logger.log("Error extracting sheet data: " + sheetData.error);
      return sheetData;
    }

    Logger.log("--- Extracted Sheet Data ---");
    Logger.log("Project Information Data:");
    Logger.log(JSON.stringify(sheetData.projectInfoData, null, 2));
    Logger.log("Panel Legend Data:");
    Logger.log(JSON.stringify(sheetData.panelLegendData, null, 2));
    Logger.log("Casting Schedule Data:");
    Logger.log(JSON.stringify(sheetData.castingScheduleData, null, 2));
    Logger.log("Project Info For Schedule (if Casting Schedule is null):");
    Logger.log(JSON.stringify(sheetData.projectInfoForSchedule, null, 2));
    Logger.log("--- End Extracted Sheet Data ---");

    return { success: true, message: "Sheet data extracted and logged successfully." };

  } catch (e) {
    Logger.log("An unexpected error occurred during debug extraction: " + e.message);
    return { error: e.message };
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