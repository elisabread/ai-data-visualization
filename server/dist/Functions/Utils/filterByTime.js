"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDataTime = void 0;
function filterDataTime(data, timeTo, timeFrom) {
    const relevantObjs = [];
    data.forEach((obj) => {
        const objTime = Math.floor(new Date(obj.publication_date).getTime() / 1000);
        if (objTime > timeFrom && objTime < timeTo) {
            relevantObjs.push(obj);
        }
    });
    return relevantObjs;
}
exports.filterDataTime = filterDataTime;
exports.default = filterDataTime;
