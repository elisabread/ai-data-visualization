"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByLabel = void 0;
function filterByLabel(data, data_label, data_label_nested, data_label_values) {
    const relevantObjs = [];
    data_label_values.forEach((value) => {
        data.forEach((obj) => {
            if (obj[data_label][data_label_nested] === value) {
                relevantObjs.push(obj);
            }
        });
    });
    return relevantObjs;
}
exports.filterByLabel = filterByLabel;
exports.default = filterByLabel;
