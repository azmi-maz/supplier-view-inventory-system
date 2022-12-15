function getBestExp() {

const getBestExpLastRow = mediSheet.getSheetByName("BestExp").getLastRow();
const getBatchNoValue = `${new Date(mediSheet.getSheetByName("BestExp").getRange(1,2,1,1).getValue()).toLocaleDateString("en-UK")},${mediSheet.getSheetByName("BestExp").getRange(1,3,1,1).getValue()}`;
const getTblBestExpLastRow = mainSheet.getSheetByName("tblBestExp").getLastRow();

const today = new Date();
      const dateEachItemDay = today.getDate();
      const dateEachItemMonth = today.getMonth()+1;
      const dateEachItemYear = today.getFullYear();
      const dateEachItemHours = today.getHours();
      const dateEachItemMinutes = today.getMinutes();
      const dateEachItemSeconds = today.getSeconds();
let time = `${dateEachItemMonth}/${dateEachItemDay}/${dateEachItemYear} ${dateEachItemHours}:${dateEachItemMinutes}:${dateEachItemSeconds}`;

let getNewBestExpArray = mediSheet.getSheetByName("BestExp").getRange(4,1,getBestExpLastRow-3,9).getValues();

//console.log(getBatchNoValue);
//console.log(getNewBestExpArray);

// Append all rows with expiry dates
let getMatchedItemWithNewExp = [];
for (k = 0; k < getNewBestExpArray.length; k++){
    if (getNewBestExpArray[k][8] !== ""){
        getMatchedItemWithNewExp.push([
          time,
          getBatchNoValue,            // Batch number
          getNewBestExpArray[k][0],   // PR Number
          getNewBestExpArray[k][1],   // PO Number
          getNewBestExpArray[k][2],   // Item Code
          getNewBestExpArray[k][4],   // Item Name
          getNewBestExpArray[k][5],   // Item Type
          getNewBestExpArray[k][6],   // Quantity Ordered
          getNewBestExpArray[k][7],   // Quantity Remaining
          getNewBestExpArray[k][8]    // Exp Date Offered
        ])
    }
}
//console.log(getMatchedItemWithNewExp);

// Paste the Best Exp List
//(TO UPDATE ON LAST ROW PASTE)
mainSheet.getSheetByName("tblBestExp").getRange(getTblBestExpLastRow+1,1,getMatchedItemWithNewExp.length,getMatchedItemWithNewExp[0].length).setValues(getMatchedItemWithNewExp);

// To clear off the bestexp table
mediSheet.getSheetByName("BestExp").getRange(4,9,getBestExpLastRow-3,1).clearContent();

// Successful message box after running the script
const promptForSuccess = SpreadsheetApp.getUi().alert("New expiry dates received. Thank you!", SpreadsheetApp.getUi().ButtonSet.OK);
SpreadsheetApp.getActive().toast(promptForSuccess);

}
