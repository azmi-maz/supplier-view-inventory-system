const mediSheet = SpreadsheetApp.open(DriveApp.getFileById('112cK9eQ46rDTaCUN1-XG0J1UbEctLL5OyU2uwpctmBY'));
const mainSheet = SpreadsheetApp.open(DriveApp.getFileById('1DA_8fUuL4t9OM61inJ-E4ElOMapTTt7QdZHvUHDeBkk'));
const getMasterListLastRow = mainSheet.getSheetByName("MasterL").getLastRow();
let remainingIDLeftForQOHList = [];

function updateOUTGOING() {
    const getTblStockINLastRow = mainSheet.getSheetByName("tblStockIN").getLastRow();
    const getTblStockOUTLastRow = mainSheet.getSheetByName("tblStockOUT").getLastRow();

    let getTblStockINarray = mainSheet.getSheetByName("tblStockIN").getRange(2,1,getTblStockINLastRow-1,3).getValues();
    let getTblStockOUTarray = [];
    if(getTblStockOUTLastRow === 1){
      getTblStockOUTarray = [];
    } else {
      getTblStockOUTarray = mainSheet.getSheetByName("tblStockOUT").getRange(2,1,getTblStockOUTLastRow-1,3).getValues();
    }  

    //console.log(getTblStockINarray);
    //console.log(getTblUniqueINIDarray);


    let collectAllIncomingUniqueID = [];

    for (i = 0; i < getTblStockINarray.length; i++){
      collectAllIncomingUniqueID.push(getTblStockINarray[i][1]);
    }

    //console.log(collectAllIncomingUniqueID);
    //console.log(collectAllIncomingUniqueID.length);

    let collectAllOutgoingUniqueID = [];

    for (j = 0; j < getTblStockOUTarray.length; j++){
      collectAllOutgoingUniqueID.push(getTblStockOUTarray[j][1]);
    }

    //console.log(collectAllOutgoingUniqueID);

    // Calculate the QOH using custom function
    remainingIDLeftForQOHList = findRemainingUniqueID(collectAllIncomingUniqueID.sort(), collectAllOutgoingUniqueID.sort());

}


function updateQOHList(){

    updateOUTGOING();
    const getTblUniqueINIDLastRow = mainSheet.getSheetByName("tblUniqueINID").getLastRow();
    const getLotNumberInUniqueListLastRow = mainSheet.getSheetByName("tblUniqueINID").getLastRow();
    const getPRLISTLastRow = mediSheet.getSheetByName("QOH PR").getLastRow();
    const getFOCLISTLastRow = mediSheet.getSheetByName("QOH FOC").getLastRow();

    let getListOfCurrentINIDarray = remainingIDLeftForQOHList; //mainSheet.getSheetByName("OUTGOING").getRange(2,2,getListOfCurrentINIDLastRow-1,1).getValues(); // Change to remainingIDLeftForQOHList
    let getTblUniqueINIDarray = mainSheet.getSheetByName("tblUniqueINID").getRange(2,1,getTblUniqueINIDLastRow-1,5).getValues();
    let getTblUniqueINIDLotNumbersarray = mainSheet.getSheetByName("tblUniqueINID").getRange(2,3,getLotNumberInUniqueListLastRow-1,3).getValues();
    let getMasterList = mainSheet.getSheetByName("MasterL").getRange(2,1,getMasterListLastRow-1,17).getValues();

    //console.log(getListOfCurrentINIDarray);
    //console.log(getTblUniqueINIDLotNumbersarray);

    // Expand on the CurrentID list
    let expandedListOfCurrentID = [];
    let listOfItemCodes = [];
    let listOfLotNumbers = [];
    let listOfItemCodesPlusLot =[];

    let getItemCodeValue = '';
    let getItemNameValue = '';
    let getItemTypeValue = '';
    let getItemLocationValue = '';
    let getItemPRType = '';

    for (let j = 0; j < getListOfCurrentINIDarray.length; j++){
      for (let k = 0; k < getTblUniqueINIDarray.length; k++){
        
        if (getListOfCurrentINIDarray[j] === getTblUniqueINIDarray[k][0]){
          
          for (let l = 0; l < getMasterList.length; l++){
            
            if (getTblUniqueINIDarray[k][2] === getMasterList[l][0]){
              
              
              getItemCodeValue = getMasterList[l][0];
              getItemNameValue = getMasterList[l][1];
              getItemTypeValue = getMasterList[l][2];
              getItemLocationValue = getMasterList[l][3];
              getItemPRType = getMasterList[l][5];
            }
          }
         
          expandedListOfCurrentID.push([
                                     getItemCodeValue,                // Item Code
                                     getItemNameValue,                // Item Name
                                     getItemTypeValue,                // Item Type
                                     getItemLocationValue,            // Item Location
                                     "'"+getTblUniqueINIDarray[k][3], // Lot Number
                                     getTblUniqueINIDarray[k][4],     // Exp date
                                     getItemPRType                    // PR/FOC
                                     ])
          listOfItemCodes.push([getItemCodeValue]);
          listOfItemCodesPlusLot.push([getItemCodeValue,
                                       "'"+getTblUniqueINIDarray[k][3]]);
          listOfLotNumbers.push(["'"+getTblUniqueINIDarray[k][3]]);

        }
      }
    }
    //console.log(expandedListOfCurrentID);
    //console.log(listOfItemCodes)
    //console.log(listOfItemCodesPlusLot);

    // To calculate the QOH based on current OUTGOING LIST
    // Basically, showing the QOH by cartridges in the QOH display column

    let sentToCountEachItemCode = countArrayElem(listOfItemCodesPlusLot);
    let newArrayOfQOHListCodes = sentToCountEachItemCode[0];
    let newArrayOfQOHListCodesCount = sentToCountEachItemCode[1];
    let newArrayOfQOHLotNumbers = sentToCountEachItemCode[0];

    //console.log(newArrayOfQOHListCodes)
    //console.log(newArrayOfQOHListCodesCount)
    //console.log(newArrayOfQOHLotNumbers)

    let getItemNameFromMasterList = '';
    let getLocationFromMasterList = '';
    let getMultiCountFromMasterList = '';
    let getItemTypeFromMasterList = '';
    let getPRTypeFromMasterList = '';
    let getCompanyFromMasterList = '';
    
    let captureNewArray = [];


    for (let j = 0; j < newArrayOfQOHListCodes.length; j++){
        for (let l = 0; l < getMasterList.length; l++){
            
            if (newArrayOfQOHListCodes[j].split(",")[0] === getMasterList[l][0]){
              
              
              getItemNameFromMasterList = getMasterList[l][1];
              getLocationFromMasterList = getMasterList[l][3];
              getMultiCountFromMasterList = getMasterList[l][7];
              getItemTypeFromMasterList = getMasterList[l][2];
              getPRTypeFromMasterList = getMasterList[l][5];
              getCompanyFromMasterList = getMasterList[l][16];
              

            }
          }
         
          captureNewArray.push([
                                     getItemNameFromMasterList,               // Item Name
                                     newArrayOfQOHLotNumbers[j],              // Item Code + Lot Numbers
                                     newArrayOfQOHListCodesCount[j],          // Quantity per cartridge
                                     getMultiCountFromMasterList,             // MultiCount
                                     getLocationFromMasterList,               // Item Location
                                     getItemTypeFromMasterList,               // Item Type
                                     getPRTypeFromMasterList,                 // PR/FOC
                                     getCompanyFromMasterList                 // Company
                                     ])

        }
        //console.log(captureNewArray);
        //console.log(captureNewArray[0][1]);
        //console.log(captureNewArray[0][1]);
        //console.log(getTblUniqueINIDLotNumbersarray[0][0]);

    // To look for exp date and calculate quantity in boxes
    
    let valueToMatchLotNumber = '';
    let extractedLotNumberValue = '';
    let valueToMatchQuantityPerCartridge = 0;
    let valueToMatchMulticount = 0;
    let valueToMatchItemName = '';
    let valueToMatchItemType = '';
    let valueToMatchItemLocation = '';
    let lookForExpDateValue = '';
    let countForQuantityInBoxes = 0;


    let readyArrayFortblQOHPRpaste = []; // Made to global variable

    for (let m = 0; m < captureNewArray.length; m++){
      if (captureNewArray[m][6] === 'PR' && captureNewArray[m][7] === 'Medicorp'){
        valueToMatchLotNumber = captureNewArray[m][1]                                                           // Item Code + Lot number
        extractedLotNumberValue = "'" + captureNewArray[m][1].substring(6,captureNewArray[m][1].length+6);      // Extracted Lot Number
        valueToMatchQuantityPerCartridge = captureNewArray[m][2]                                                // Quantity per cartridge
        valueToMatchMulticount = captureNewArray[m][3]                                                          // MultiCount
        valueToMatchItemName = captureNewArray[m][0]                                                            // Item Name
        valueToMatchItemType = captureNewArray[m][5]                                                            // Item Type
        valueToMatchItemLocation = captureNewArray[m][4]                                                        // Item Location
        
        countForQuantityInBoxes = valueToMatchQuantityPerCartridge/valueToMatchMulticount;

        //console.log(valueToMatchLotNumber);
        //console.log(extractedLotNumberValue);

      for (let n = 0; n < getTblUniqueINIDLotNumbersarray.length; n++){
        let searchInTblUniqueItemCodeAndLot = getTblUniqueINIDLotNumbersarray[n][0]+",'"+getTblUniqueINIDLotNumbersarray[n][1];
        //console.log(searchInTblUniqueItemCodeAndLot);
        if (valueToMatchLotNumber === searchInTblUniqueItemCodeAndLot){
          lookForExpDateValue = getTblUniqueINIDLotNumbersarray[n][2];
        }
      }

      readyArrayFortblQOHPRpaste.push([
                                     valueToMatchItemName,                    // Item Name
                                     valueToMatchItemType,                    // Item Type
                                     extractedLotNumberValue,                 // Lot Numbers
                                     lookForExpDateValue,                     // Exp Date
                                     valueToMatchQuantityPerCartridge,        // Quantity per cartridge
                                     countForQuantityInBoxes,                 // Quantity in boxes
                                     valueToMatchItemLocation,                // Item Location
      ])
    }
  }

  //console.log(readyArrayFortblQOHPRpaste)


  let filteredQOHPRList = []; 

  for (let q = 0; q < readyArrayFortblQOHPRpaste.length; q++){

      filteredQOHPRList.push([
                              readyArrayFortblQOHPRpaste[q][0],
                              readyArrayFortblQOHPRpaste[q][1],
                              readyArrayFortblQOHPRpaste[q][2],
                              readyArrayFortblQOHPRpaste[q][3],
                              readyArrayFortblQOHPRpaste[q][4],
                              readyArrayFortblQOHPRpaste[q][5],
                              readyArrayFortblQOHPRpaste[q][6],
      ])
  
}
    //console.log(readyArrayFortblQOHPRpaste);
    //console.log(filteredQOHPRList);

    // Clear off the sheet first
    if (getPRLISTLastRow-1 === 0){
    } else {
    mediSheet.getSheetByName("QOH PR").getRange(2,1,getPRLISTLastRow-1,7).clearContent();
    mediSheet.getSheetByName("QOH PR").getRange(2,1,getPRLISTLastRow-1,7).getFilter().remove();
    }

    // No Filter paste
    mediSheet.getSheetByName("QOH PR").getRange(2,1,readyArrayFortblQOHPRpaste.length,readyArrayFortblQOHPRpaste[0].length).setValues(readyArrayFortblQOHPRpaste).sort([{column: 1,ascending: true},{column: 4,ascending: true}]);
    // Set filter for user
    mediSheet.getSheetByName("QOH PR").getRange(1,1,readyArrayFortblQOHPRpaste.length+1,7).createFilter();
    mediSheet.getSheetByName("QOH PR").getRange(2,4,readyArrayFortblQOHPRpaste.length+1,1).setNumberFormat("DD/MM/YYYY");




    let readyArrayFortblQOHFOCpaste = [];  // Make it to global variable

    for (let r = 0; r < captureNewArray.length; r++){
      if (captureNewArray[r][6] === 'FOC'){
        valueToMatchLotNumber = captureNewArray[r][1]                                                           // Item Code + Lot number
        extractedLotNumberValue = "'" + captureNewArray[r][1].substring(6,captureNewArray[r][1].length+6);      // Extracted Lot Number
        valueToMatchQuantityPerCartridge = captureNewArray[r][2]                                                // Quantity per cartridge
        valueToMatchMulticount = captureNewArray[r][3]                                                          // MultiCount
        valueToMatchItemName = captureNewArray[r][0]                                                            // Item Name
        valueToMatchItemType = captureNewArray[r][5]                                                            // Item Type
        valueToMatchItemLocation = captureNewArray[r][4]                                                        // Item Location
        
        countForQuantityInBoxes = valueToMatchQuantityPerCartridge/valueToMatchMulticount;

        //console.log(valueToMatchLotNumber);
        //console.log(extractedLotNumberValue);

      for (let n = 0; n < getTblUniqueINIDLotNumbersarray.length; n++){
        let searchInTblUniqueItemCodeAndLot = getTblUniqueINIDLotNumbersarray[n][0]+",'"+getTblUniqueINIDLotNumbersarray[n][1];
        //console.log(searchInTblUniqueItemCodeAndLot);
        if (valueToMatchLotNumber === searchInTblUniqueItemCodeAndLot){
          lookForExpDateValue = getTblUniqueINIDLotNumbersarray[n][2];
        }
      }

      readyArrayFortblQOHFOCpaste.push([
                                     valueToMatchItemName,                    // Item Name
                                     valueToMatchItemType,                    // Item Type
                                     extractedLotNumberValue,                 // Lot Numbers
                                     lookForExpDateValue,                     // Exp Date
                                     valueToMatchQuantityPerCartridge,        // Quantity per cartridge
                                     countForQuantityInBoxes,                 // Quantity in boxes
                                     valueToMatchItemLocation,                // Item Location
      ])
    }
  }

  let filteredQOHFOCList = []; 

  for (let t = 0; t < readyArrayFortblQOHFOCpaste.length; t++){

      filteredQOHFOCList.push([
                              readyArrayFortblQOHFOCpaste[t][0],
                              readyArrayFortblQOHFOCpaste[t][1],
                              readyArrayFortblQOHFOCpaste[t][2],
                              readyArrayFortblQOHFOCpaste[t][3],
                              readyArrayFortblQOHFOCpaste[t][4],
                              readyArrayFortblQOHFOCpaste[t][5],
                              readyArrayFortblQOHFOCpaste[t][6],
      ])
}
    //console.log(filteredQOHFOCList);
    //console.log(readyArrayFortblQOHFOCpaste);
    
    // Clear off the sheet first
    if (getFOCLISTLastRow-1 === 0){
    } else {
    mediSheet.getSheetByName("QOH FOC").getRange(2,1,getFOCLISTLastRow-1,7).clearContent();
    mediSheet.getSheetByName("QOH FOC").getRange(2,1,getFOCLISTLastRow-1,7).getFilter().remove();
    }

    // No Filter paste
    mediSheet.getSheetByName("QOH FOC").getRange(2,1,readyArrayFortblQOHFOCpaste.length,readyArrayFortblQOHFOCpaste[0].length).setValues(readyArrayFortblQOHFOCpaste).sort([{column: 1,ascending: true},{column: 4,ascending: true}]);
    // Set filter for user
    mediSheet.getSheetByName("QOH FOC").getRange(1,1,readyArrayFortblQOHFOCpaste.length+1,7).createFilter();
    mediSheet.getSheetByName("QOH FOC").getRange(2,4,readyArrayFortblQOHFOCpaste.length+1,1).setNumberFormat("DD/MM/YYYY");



}


function updateBestExp() {

    const getBestExpLastRow = mediSheet.getSheetByName("BestExp").getLastRow();

    // Collect PR arrays to fill up BestExp form
    updatePendingPO();
    let onlyQuantityLeftPRlist = newPRList;
    //console.log(onlyQuantityLeftPRlist);

    // Need to clear up BestExp table to handle different length of Incomplete PR list
    if (getBestExpLastRow-3 === 0){
    } else {mediSheet.getSheetByName("BestExp").getRange(4,1,getBestExpLastRow-3,9).clearContent();
    }

    // Paste the updated list of Incomplete PR to BestExp table
    mediSheet.getSheetByName("BestExp").getRange(4,1,onlyQuantityLeftPRlist.length,onlyQuantityLeftPRlist[0].length).setValues(onlyQuantityLeftPRlist).sort([{column: 2,ascending: true},{column: 5,ascending: true}]);

}
