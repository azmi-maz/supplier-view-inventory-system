  let newPRList = [];

function updatePendingPO() {
  const getTblPRLastRow = mainSheet.getSheetByName("tblPR").getLastRow();
  const getTblPOLastRow = mainSheet.getSheetByName("tblPO").getLastRow();
  const getPendingPOLastRow = mediSheet.getSheetByName("Pending PO").getLastRow();

  let tblPRList = mainSheet.getSheetByName("tblPR").getRange(2,1,getTblPRLastRow-1,10).getValues();
  let tblPOList = mainSheet.getSheetByName("tblPO").getRange(2,1,getTblPOLastRow-1,8).getValues();
  let tblPRJustPRList = mainSheet.getSheetByName("tblPR").getRange(2,2,getTblPRLastRow-1,1).getValues();
  let tblPOJustPRList = mainSheet.getSheetByName("tblPO").getRange(2,3,getTblPOLastRow-1,1).getValues();
  let masterList = mainSheet.getSheetByName("MasterL").getRange(2,1,getMasterListLastRow-1,17).getValues();
  let masterListJustCode = mainSheet.getSheetByName("MasterL").getRange(2,1,getMasterListLastRow-1,1).getValues();


  let cleanedtblPRJustPRList = [];
  for (a = 0; a < tblPRJustPRList.length; a++){
    cleanedtblPRJustPRList.push(tblPRJustPRList[a].toString());
  }

  let cleanedtblPOJustPRList = [];
  for (a = 0; a < tblPOJustPRList.length; a++){
    cleanedtblPOJustPRList.push(tblPOJustPRList[a].toString());
  }

  let cleanedmasterListJustCode = [];
  for (a = 0; a < masterListJustCode.length; a++){
    cleanedmasterListJustCode.push(masterListJustCode[a].toString());
  }

  // Get PR list
  let findPOValue = "";
  for (a = 0; a < tblPRList.length; a++){
      checkAvail = cleanedtblPOJustPRList.includes(tblPRList[a][1]);
      findPORow = cleanedtblPOJustPRList.indexOf(tblPRList[a][1]);
      findMasterIndex = cleanedmasterListJustCode.indexOf(tblPRList[a][2]);
      getItemName = masterList[findMasterIndex][1];
      getItemType = masterList[findMasterIndex][2];
      getListCode = masterList[findMasterIndex][11];
      getCompany = masterList[findMasterIndex][16];

if(tblPRList[a][7] !== 0 && getCompany === 'Medicorp'){

      if (checkAvail){

      findPOValue = tblPOList[findPORow][1];

      } else if (!checkAvail){

      findPOValue = "No PO yet"  

      }

      newPRList.push([
        tblPRList[a][1],      // PR Number
        findPOValue,          // PO Number
        tblPRList[a][2],      // Item Code
        getListCode,          // List Code
        getItemName,          // Item Name
        getItemType,          // Item Type
        tblPRList[a][6],      // Quantity Ordered
        tblPRList[a][7],      // Quantity Left
        ]) 
      }
    }
    //console.log(newPRList.length)

    if (getPendingPOLastRow-1 === 0){
    } else {
    mediSheet.getSheetByName("Pending PO").getRange(2,1,getPendingPOLastRow-1,8).clearContent();
    mediSheet.getSheetByName("Pending PO").getRange(2,1,getPendingPOLastRow-1,8).getFilter().remove();
    }

    mediSheet.getSheetByName("Pending PO").getRange(2,1,newPRList.length,newPRList[0].length).setValues(newPRList).sort([{column: 2,ascending: true},{column: 5,ascending: true}]);
    mediSheet.getSheetByName("Pending PO").getRange(1,1,newPRList.length+1,8).createFilter();



}
