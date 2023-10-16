"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const openai_1 = require("openai");
const dotenv = __importStar(require("dotenv"));
const getDataOneDim_1 = __importDefault(require("./getDataOneDim"));
const getDataTwoDim_1 = __importDefault(require("./getDataTwoDim"));
const papiClient = require("@etl/papi-client");
dotenv.config();
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const functions = [
    {
        name: "getDataOneDim",
        description: "This function will get the data needed for a one dimentional chart. A doughnut or bar chart is good to use when we need to focus on describing the relationships among the circles, they are often used to describe components of an idea or concept.",
        parameters: {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: ["doughnut", "bar"],
                    description: "The type of graph to be renderd",
                },
                data_label: {
                    type: "string",
                    description: "The label (JSON key name) of the desired data you want to render a chart with. For instance 'occupation'",
                },
                data_label_nested: {
                    type: "string",
                    description: "The label (JSON key name) of the desired data you want to render a chart with. For instance 'label'",
                },
                data_label_values: {
                    type: "array",
                    description: "The actual values (JSON values) of the desired data you want to compare. For instance ['Inköpare', 'Ventilationstekniker']",
                    items: {
                        type: "string",
                    },
                },
                time_from: {
                    type: "string",
                    description: "Used to filter the data. This argument tells us the first date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
                },
                time_to: {
                    type: "string",
                    description: "used to fitler the data. This argument tells us the last date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
                },
                label: {
                    type: "string",
                    description: "The Charts label. A sumamry of what the data is visualation. For example: 'Amount'. Max 20 characters long.",
                },
            },
            required: ["type", "data_label", "time_from", "time_to", "label"],
        },
    },
    {
        name: "getDataTwoDim",
        description: "This function will get the data needed for a two dimentional chart. A line or bar chart is good to use when we need to track changes over short and long periods of time",
        parameters: {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    enum: ["line", "bar"],
                    description: "The type of graph to be renderd",
                },
                data_label: {
                    type: "string",
                    description: "The label (JSON key name) of the desired data you want to render a chart with. For instance 'occupation'",
                },
                data_label_nested: {
                    type: "string",
                    description: "The label (JSON key name) of the desired data you want to render a chart with. For instance 'label'",
                },
                data_label_values: {
                    type: "array",
                    description: "The actual values (JSON values) of the desired data you want to compare. For instance ['Inköpare', 'Ventilationstekniker']",
                    items: {
                        type: "string",
                    },
                },
                time_from: {
                    type: "string",
                    description: "Used to filter the data. This argument tells us the first date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
                },
                time_to: {
                    type: "string",
                    description: "used to fitler the data. This argument tells us the last date in the data set that we want to get data from. Will always be formatted like this '2023-09-04 13:45:32 UTC'",
                },
                label: {
                    type: "string",
                    description: "The Charts label. A sumamry of what the data is visualation. For example: 'Amount'. Max 20 characters long.",
                },
                labels: {
                    type: "array",
                    description: 'These labels will be the x-dimension showing change over time. For instance ["January", "February", "March", "April", "May", "June", "July"]',
                    items: {
                        type: "string",
                    },
                },
                time_labels: {
                    type: "array",
                    description: 'These labels will be the x-dimension showing change over time. For instance [{"time_from": "2023-09-01 00:00:32", "time_to": "2023-09-30 00:00:32"}, {"time_from": "2023-10-01 00:00:32", "time_to": "2023-10-30 00:00:32"}]',
                    items: {
                        type: "object",
                        properties: {
                            time_to: {
                                type: "string",
                                description: "The start time of requested time span. Will be in the format of UTC like this: 2023-09-01 00:00:32 UTC",
                            },
                            time_from: {
                                type: "string",
                                description: "The end time of requested time span. Will be in the format of UTC like this: 2023-09-30 00:00:32 UTC",
                            },
                        },
                    },
                },
            },
            required: [
                "type",
                "data_label",
                "data_label_values",
                "time_from",
                "time_to",
                "time_labels",
                "label",
                "labels",
            ],
        },
    },
];
function callOpenAI(messages) {
    return __awaiter(this, void 0, void 0, function* () {
        //OpenAI determines what chart we want to render & what data is needed to do so
        const res = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            functions: functions,
            function_call: "auto",
        });
        console.log(res);
        const openAiRes = res.choices[0].message;
        console.log("OpenAI response: ", openAiRes);
        //Save the function call response
        const chartArgs = res.choices[0].message.function_call;
        console.log("OpenAI chart args: ", chartArgs);
        //Call suggested function based on the reccomended chart args determined by OpenAI
        switch (chartArgs === null || chartArgs === void 0 ? void 0 : chartArgs.name) {
            case "getDataOneDim": {
                const res = yield (0, getDataOneDim_1.default)(JSON.parse(chartArgs.arguments));
                console.log("One dim data: ", res);
                return { resType: "chart", res: res };
            }
            case "getDataTwoDim": {
                const res = yield (0, getDataTwoDim_1.default)(JSON.parse(chartArgs.arguments));
                console.log("Two dim data: ", res);
                return { resType: "chart", res: res };
            }
            default:
                return { resType: "message", res: openAiRes };
        }
    });
}
exports.default = callOpenAI;
