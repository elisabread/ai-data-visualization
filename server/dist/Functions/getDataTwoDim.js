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
const convertDataToChartObj_1 = __importDefault(require("./Utils/convertDataToChartObj"));
const divideByTime_1 = __importDefault(require("./Utils/divideByTime"));
const filterByLabel_1 = __importDefault(require("./Utils/filterByLabel"));
const filterByTime_1 = __importDefault(require("./Utils/filterByTime"));
function getDataTwoDim(args) {
    return __awaiter(this, void 0, void 0, function* () {
        //Read file
        const data = yield (0, ReadFile_1.default)("jobads_23.json");
        //Filter by Time
        if (data) {
            const timeTo = Math.floor(new Date(args.time_to).getTime() / 1000);
            const timeFrom = Math.floor(new Date(args.time_from).getTime() / 1000);
            let dataFilterdByTime = (0, filterByTime_1.default)(data, timeTo, timeFrom);
            const label = args.data_label;
            //Filter by Label value
            if (dataFilterdByTime) {
                const dataFilterdByLabel = (0, filterByLabel_1.default)(dataFilterdByTime, args.data_label, args.data_label_nested, args.data_label_values);
                //Divide data by time .. Day? Month?
                const dataDividedByTime = (0, divideByTime_1.default)(dataFilterdByLabel, args.labels, args.time_labels);
                if (dataDividedByTime) {
                    //Count instances for each data division
                    const frequencies = new Map();
                    for (const time of dataDividedByTime) {
                        frequencies.set(time.label, 0);
                        for (let obj of time.data) {
                            const n = frequencies.get(time.label);
                            frequencies.set(time.label, 1 + (n !== undefined ? n : 0));
                        }
                    }
                    console.log("Final freq: ", frequencies);
                    //Transform data to Chart.js format
                    let chartObj = (0, convertDataToChartObj_1.default)(frequencies, args);
                    //Return to client
                    return chartObj;
                }
            }
        }
    });
}
exports.default = getDataTwoDim;
/*

OpenAI chart args:  {
  name: 'getDataTwoDim',
  arguments: '{\n' +
    '  "type": "line",\n' +
    '  "data_label": "occupation",\n' +
    '  "data_label_nested": "label",\n' +
    '  "data_label_values": ["Inköpare"],\n' +
    '  "time_from": "2023-01-01",\n' +
    '  "time_to": "2023-12-31",\n' +
    '  "label": "Amount",\n' +
    '  "labels": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],\n' +
    '  "time_labels": [\n' +
    '    {"time_from": "2023-01-01", "time_to": "2023-01-31"},\n' +
    '    {"time_from": "2023-02-01", "time_to": "2023-02-28"},\n' +
    '    {"time_from": "2023-03-01", "time_to": "2023-03-31"},\n' +
    '    {"time_from": "2023-04-01", "time_to": "2023-04-30"},\n' +
    '    {"time_from": "2023-05-01", "time_to": "2023-05-31"},\n' +
    '    {"time_from": "2023-06-01", "time_to": "2023-06-30"},\n' +
    '    {"time_from": "2023-07-01", "time_to": "2023-07-31"},\n' +
    '    {"time_from": "2023-08-01", "time_to": "2023-08-31"},\n' +
    '    {"time_from": "2023-09-01", "time_to": "2023-09-30"},\n' +
    '    {"time_from": "2023-10-01", "time_to": "2023-10-31"},\n' +
    '    {"time_from": "2023-11-01", "time_to": "2023-11-30"},\n' +
    '    {"time_from": "2023-12-01", "time_to": "2023-12-31"}\n' +
    '  ]\n' +
    '}'
}


*/
