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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const fs = require("fs");
const path = require("path");
////////////////////////////////////////////////////////////////////////////////
// READ THE DATA FILE
////////////////////////////////////////////////////////////////////////////////
//Function that reads the data file and parses the data into JSON
function readFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filePath = path.join(__dirname, "/Data", fileName);
            const data = fs.readFileSync(filePath, "utf8");
            const dataJSON = JSON.parse(data);
            return dataJSON;
        }
        catch (err) {
            console.error(err);
            return;
        }
    });
}
exports.readFile = readFile;
exports.default = readFile;
