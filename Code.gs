const SPREADSHEET_ID = '1t4FVLJGOXt7D0gOVdSNABCmXdSB4Mz3tqTv6zM6jzwQ';
const SHEET_NAME = 'NOTE';

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('MindMeld');
}

function getSpreadsheet() {
  try {
    // Try to get as container-bound
    const activeSS = SpreadsheetApp.getActiveSpreadsheet();
    if (activeSS) return activeSS;
  } catch (e) {
    console.warn('Not container bound, falling back to ID');
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getNoteSheet() {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['ID', 'Title', 'Icon', 'Color', 'IconColor', 'UserEmail', 'CreatedAt']);
  }
  return sheet;
}

function getNotes() {
  const email = Session.getActiveUser().getEmail();
  const sheet = getNoteSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  const headers = data.shift();

  return data
    .filter(row => row[5] === email)
    .map(row => {
      return {
        id: row[0],
        title: row[1],
        icon: row[2],
        color: row[3],
        iconColor: row[4],
        userEmail: row[5],
        createdAt: row[6].toString()
      };
    });
}

function getNoteById(id) {
  const email = Session.getActiveUser().getEmail();
  const sheet = getNoteSheet();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return null;
  data.shift(); // remove headers

  const note = data.find(row => row[0].toString() === id.toString() && row[5] === email);
  if (note) {
    return {
      id: note[0],
      title: note[1],
      icon: note[2],
      color: note[3],
      iconColor: note[4],
      userEmail: note[5],
      createdAt: note[6].toString()
    };
  }
  return null;
}

function createNote(noteData) {
  const email = Session.getActiveUser().getEmail();
  const sheet = getNoteSheet();
  const id = Utilities.getUuid();
  const createdAt = new Date();

  sheet.appendRow([
    id,
    noteData.title,
    noteData.icon || 'book',
    noteData.color || 'bg-primary-container',
    noteData.iconColor || 'text-on-primary-container',
    email,
    createdAt
  ]);

  return { id, ...noteData, userEmail: email, createdAt: createdAt.toString() };
}

function getUserEmail() {
  return Session.getActiveUser().getEmail();
}
