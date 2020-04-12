'use strict'


function removeItemFromArr(arr, item) {
    var identifier = arr.indexOf(item);
    identifier !== -1 && arr.splice(identifier, 1);
    return arr
}

function getActualDate() {
    var date = new Date()
    var dateFormatted = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        + "T" + date.getHours() + ":" + date.getMinutes()
    return dateFormatted
}

module.exports = {
    removeItemFromArr,
    getActualDate
}