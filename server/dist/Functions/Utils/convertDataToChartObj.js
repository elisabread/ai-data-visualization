"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDataToChartObj = void 0;
function convertDataToChartObj(frequencies, args) {
    let dataset = [];
    let labels = [];
    for (const [key, value] of frequencies) {
        dataset.push(value);
        labels.push(key);
    }
    let chartData = {
        labels,
        datasets: [{ data: dataset, label: args.label }],
        type: "chart",
    };
    return { chartData: chartData, chartType: args.type };
}
exports.convertDataToChartObj = convertDataToChartObj;
exports.default = convertDataToChartObj;
