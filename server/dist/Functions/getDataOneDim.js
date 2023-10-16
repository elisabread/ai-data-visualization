"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReadFile_1 = __importDefault(require("./Utils/ReadFile"));
function getDataOneDim(args) {
    return __awaiter(this, void 0, void 0, function* () {
        //First we read the data file
        const data = yield (0, ReadFile_1.default)("jobads_23.json");
        if (data) {
            //Then we filter the data with time parameters
            const timeTo = Math.floor(new Date(args.time_to).getTime() / 1000);
            const timeFrom = Math.floor(new Date(args.time_from).getTime() / 1000);
            let dataTimeFilterd = filterDataTime(data, timeTo, timeFrom);
            const label = args.data_label;
            ////////////////////////////////////////////////////////////////////////////////
            // Specific label to filter on
            ////////////////////////////////////////////////////////////////////////////////
            if (args.data_label_values && dataTimeFilterd) {
                //Count all instances of each data label value in the dataset.
                //For example: If the data label is "occupation_title" and data label value is "Inköpare".
                //We would through the entire dataset and find all instances of occupation_label:"Inköpare" and count them
                const frequencies = new Map();
                for (const value of args.data_label_values) {
                    for (let obj of dataTimeFilterd) {
                        if (obj[args.data_label][args.data_label_nested] === value) {
                            const n = frequencies.get(obj[args.data_label][args.data_label_nested]);
                            if (n === undefined) {
                                frequencies.set(obj[args.data_label][args.data_label_nested], 1);
                            }
                            else {
                                frequencies.set(obj[args.data_label][args.data_label_nested], 1 + n);
                            }
                        }
                    }
                }
                //Finally convert the filtred data into the data model Chart.js requires
                let chartObj = convertDataToChartObj(frequencies, args);
                return chartObj;
                ////////////////////////////////////////////////////////////////////////////////
                // If the user wants to find all unique key values
                ////////////////////////////////////////////////////////////////////////////////
            }
            else if (!args.data_label_values && dataTimeFilterd) {
                //Count all unique instances of the different occupation labels
                const frequencies = new Map(); //Map key values. No order like an array has arr[0]. use indexes to find values instead
                for (let obj of dataTimeFilterd) {
                    const n = frequencies.get(obj[args.data_label][args.data_label_nested]);
                    if (n === undefined) {
                        frequencies.set(obj[args.data_label][args.data_label_nested], 1);
                    }
                    else {
                        frequencies.set(obj[args.data_label][args.data_label_nested], 1 + n);
                    }
                }
                //Finally convert the filtred data into the data model Chart.js requires
                let chartObj = convertDataToChartObj(frequencies, args);
                return chartObj;
            }
            else {
                console.log("No data was found.");
            }
        }
    });
}
exports.default = getDataOneDim;
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
        type: args.type,
    };
    return { chartData: chartData, chartType: args.type };
}
