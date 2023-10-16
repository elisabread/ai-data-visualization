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
const ReadFile_1 = __importDefault(require("./ReadFile"));
////////////////////////////////////////////////////////////////////////////////
// FILTER DATA
////////////////////////////////////////////////////////////////////////////////
//Function that sorts through and returns data needed to render a Doughnut Chart with Chart.js
function getDataDoughnutChart(args) {
    return __awaiter(this, void 0, void 0, function* () {
        //First we read the data file
        const data = yield (0, ReadFile_1.default)("jobads_23.json");
        //Then we filter the data with time paramaters
        const timeTo = Math.floor(new Date(args.time_to).getTime() / 1000);
        const timeFrom = Math.floor(new Date(args.time_from).getTime() / 1000);
        let relevantObjs = [];
        let chartData;
        ////////////////////////////////////////////////////////////////////////////////
        // If there is any specific key values to filter on
        ////////////////////////////////////////////////////////////////////////////////
        if (args.data_label_values && data) {
            //Count all instances of each data label value in the dataset.
            //For example: If the data label is "occupation_title" and data label value is "Inköpare".
            //We would through the entire dataset and find all instances of occupation_label:"Inköpare" and count them
            args.data_label_values.forEach((value) => {
                data.forEach((obj) => {
                    //If the objects occupation label matches the desired value
                    if (obj.occupation.label === value) {
                        //Check if the time filter is also valid
                        const objTime = Math.floor(new Date(obj.publication_date).getTime() / 1000);
                        if (objTime > timeFrom && objTime < timeTo) {
                            relevantObjs.push();
                        }
                    }
                });
            });
            //Finally convert the filtred data into the data model Chart.js requires
            chartData = {
                labels: args.data_label_values,
                datasets: [{ data: [relevantObjs.length] }],
            };
            console.log("Chart data: ", chartData);
            return chartData;
            ////////////////////////////////////////////////////////////////////////////////
            // If the user wants to find all unique key values
            ////////////////////////////////////////////////////////////////////////////////
        }
        else if (!args.data_label_values && data) {
            //Count all unique instances of the different occupation labels
            const frequencies = new Map(); //Map key values. No order like an array has arr[0]. use indexes to find values instead
            for (let obj of data) {
                const n = frequencies.get(obj.occupation.label);
                if (n === undefined) {
                    frequencies.set(obj.occupation.label, 1);
                }
                else {
                    frequencies.set(obj.occupation.label, 1 + n);
                }
            }
            //Finally convert the filtred data into the data model Chart.js requires
            let dataset = [];
            let labels = [];
            for (const [key, value] of frequencies) {
                dataset.push(value);
                labels.push(key);
            }
            chartData = {
                labels,
                datasets: [{ data: dataset }],
            };
            return chartData;
        }
        else {
            console.log("No data was found.");
        }
    });
}
exports.default = getDataDoughnutChart;
