'use strict'

/**
 *** This function is used to: 
  * Remove a item from array / list.
  *  
  * 
 *** Information about parameters.
 ** @param arr It represent the array / list.
  * 
 ** @param item It is the specific item that you wan to remove.
  * 
  * 
  * The function will return:
  * The array / list @var arr with the item alreade deleted.
  *
**/
function removeItemFromArr(arr, item) {
    var identifier = arr.indexOf(item);
    identifier !== -1 && arr.splice(identifier, 1);
    return arr
}


/**
 *** This function is used to: 
  * Get the actual @var date with the format dd/mm/yyyyThh:mm.
  *  
  * 
 *** Information about parameters.
  * N/A
  * 
  * 
 *** The function will return:
  * The date @var dateFormatted.
  *
**/
function getActualDate() {
    var date = new Date()
    var dateFormatted = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
    return dateFormatted
}

module.exports = {
    removeItemFromArr,
    getActualDate
}