/**
 * =========================================================================
 * KUTTY STUDY CIRCLE - GOOGLE APPS SCRIPT LEAD COLLECTOR
 * =========================================================================
 * 
 * Instructions to Deploy:
 * 1. Open Google Sheets (create a new sheet or open existing: e.g. "KSC Leads 2026").
 * 2. In Google Sheets menu, click: Extensions -> Apps Script.
 * 3. Delete any default code in Code.gs and paste this entire code.
 * 4. Click the Save icon (Ctrl + S).
 * 5. Click "Deploy" (top right button) -> "New deployment".
 * 6. Select Type: "Web app" (click gear icon next to Select type).
 * 7. Fill in:
 *    - Description: "KSC Website Lead Collector"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (VERY IMPORTANT so leads can be submitted from website)
 * 8. Click "Deploy".
 * 9. Authorize access if Google asks.
 * 10. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/.../exec)
 * 11. Paste that URL into GOOGLE_SCRIPT_WEB_APP_URL in your React App.jsx!
 * =========================================================================
 */

// Name of the tab in your Google Sheet where leads should be stored
var SHEET_NAME = "Leads";

// Optional: Enter your email to receive an instant alert for every new lead (leave empty "" to disable)
var NOTIFICATION_EMAIL = "kuttystudycircle.in@gmail.com";

/**
 * Handles POST requests from the website form
 */
function doPost(e) {
  return handleRequest(e);
}

/**
 * Handles GET requests (for easy testing in browser or URL parameter fallback)
 */
function doGet(e) {
  return handleRequest(e);
}

/**
 * Core processor for incoming lead data
 */
function handleRequest(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 30 seconds for concurrent requests to prevent row overwriting
  lock.tryLock(30000);

  try {
    var data = {};

    // 1. Parse JSON payload if sent in postData
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        // Fallback if URL encoded
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Extract fields
    var fullName = data.name || data.fullName || "Anonymous";
    var mobile = data.mobile || data.phone || "Not Provided";
    var course = data.course || "General Enquiry";
    var mode = data.mode === "online" ? "Online (Virtual)" : "Offline (Classroom)";
    var branch = data.branch || (data.mode === "online" ? "Virtual Online" : "Tirupati");
    var timestamp = new Date();
    
    // Formatted IST Date and Time: e.g. "24/10/2026, 06:45 PM"
    var formattedDate = Utilities.formatDate(
      timestamp,
      "Asia/Kolkata",
      "dd/MM/yyyy, hh:mm:ss a"
    );

    // 2. Open Spreadsheet & ensure Header Row exists
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Create the tab if it doesn't exist yet
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    // If sheet is completely empty, insert beautiful branded headers
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp (IST)",
        "Student Name",
        "Mobile Number",
        "Target Course",
        "Preferred Mode",
        "Nearest Branch",
        "Lead Source",
        "Lead Status"
      ];
      
      sheet.appendRow(headers);
      
      // Style headers: Navy background, White bold text
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0B356D");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // 3. Append the lead row to the sheet
    var newRow = [
      formattedDate,
      fullName,
      "'" + mobile, // Prefix single quote to keep mobile leading zeros / prevent scientific notation
      course,
      mode,
      branch,
      "Website Landing Page (DM)",
      "New - Needs Callback"
    ];

    sheet.appendRow(newRow);

    // Auto-fit column widths for clean readability
    sheet.autoResizeColumns(1, 8);

    // 4. Send Instant Email Alert to Institute (Optional)
    if (NOTIFICATION_EMAIL && NOTIFICATION_EMAIL.indexOf("@") !== -1) {
      try {
        var emailSubject = "🔥 New Student Demo Lead: " + fullName + " (" + course + ")";
        var emailBody = 
          "New Student Registration Received:\n\n" +
          "• Student Name: " + fullName + "\n" +
          "• Mobile Number: " + mobile + "\n" +
          "• Course: " + course + "\n" +
          "• Mode: " + mode + "\n" +
          "• Branch: " + branch + "\n" +
          "• Time: " + formattedDate + "\n\n" +
          "Please call the student within 15 minutes as promised on the landing page.\n\n" +
          "- Kutty Study Circle Automated Lead Desk";

        MailApp.sendEmail(NOTIFICATION_EMAIL, emailSubject, emailBody);
      } catch (mailErr) {
        // Logging mail error without breaking the sheet append
        Logger.log("Email alert error: " + mailErr.toString());
      }
    }

    // 5. Return success JSON
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Lead recorded successfully",
        name: fullName,
        mobile: mobile,
        timestamp: formattedDate
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    Logger.log("Error in lead collection: " + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    // Release script lock
    lock.releaseLock();
  }
}
