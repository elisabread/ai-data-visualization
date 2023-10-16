"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validateChartArg(config, chartArg) {
    return chartArg.data_label in config.valid_data_labels;
}
