"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLabel = exports.labels = void 0;
// https://mariusschulz.com/blog/tagged-union-types-in-typescript
// type ChartDatum = Record<string, any>;
// const datum: ChartDatum = {
// 	s: "asdasd",
// 	123: "asdasd",
// };
// type DataSchema = Record<string, DataSchemaType>;
// type DataTypes = Date | Number | Array
// type Date = {
// 	kind: "Date";
// };
// type Number = {
// 	kind: "Number";
// };
exports.labels = ["occupation", "occupation_field"];
function isValidLabel(x) {
    return x in exports.labels;
}
exports.isValidLabel = isValidLabel;
