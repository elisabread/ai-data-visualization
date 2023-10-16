"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divideByTime = void 0;
function divideByTime(data, labels, time_labels) {
    const dividedData = labels.map((label) => {
        return { label: label, data: [] };
    });
    console.log(dividedData);
    time_labels.forEach((time, i) => {
        const timeTo = Math.floor(new Date(time.time_to).getTime() / 1000);
        const timeFrom = Math.floor(new Date(time.time_from).getTime() / 1000);
        data.forEach((obj) => {
            const objTime = Math.floor(new Date(obj.publication_date).getTime() / 1000);
            if (objTime >= timeFrom && objTime <= timeTo) {
                dividedData[i - 1].data.push(obj);
            }
        });
    });
    console.log("Objs divided into different months: ", dividedData);
    return dividedData;
}
exports.divideByTime = divideByTime;
exports.default = divideByTime;
