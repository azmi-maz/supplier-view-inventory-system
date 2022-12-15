function findRemainingUniqueID(arrayIN, arrayOUT) {

  for (let i = 0; i < arrayIN.length; i++){
    for (let j = 0; j < arrayOUT.length; j++){
      if (arrayIN[i] === arrayOUT[j]){

        removeItemOnce(arrayIN, arrayOUT[j]);

      }
    }
  }

  return arrayIN;
  //console.log(arrayIN);
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function countArrayElem(arr){

let countedItems = arr.reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++
  }
  else {
    allNames[name] = 1
  }
  return allNames
}, {})

// Return number 1
let listOfItems = [];
for (const prop in countedItems) {

  listOfItems.push(prop);  
}

// Return number 2
let listCountedItems = [];
  for (const prop in countedItems) {
  listCountedItems.push(countedItems[prop]);
}

// Return number 3
let listOfNewCount = [];
for (const prop in countedItems) {

  listOfNewCount.push([prop, countedItems[prop]]);  
}

return [listOfItems, listCountedItems, listOfNewCount];

}