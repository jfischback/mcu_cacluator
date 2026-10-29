// Run with: node tests/check.js
const assert = require("assert");
const { calculate } = require("../calc.js");

const cases = [
  [{ oel: 10, idlh: "", respirator: "APR, full facepiece" }, { apf: 50, calculatedMuc: 500, idlh: "None entered", muc: 500, note: "No IDLH entered, so the MUC equals APF × OEL. The MUC also cannot exceed the cartridge or canister limits." }],
  [{ oel: 10, idlh: 2000, respirator: "SAR continuous flow, full facepiece" }, { apf: 1000, calculatedMuc: 10000, idlh: 2000, muc: 2000, note: "Calculated MUC is above the IDLH, so the MUC is set at the IDLH." }],
  [{ oel: 50, idlh: 2000, respirator: "APR, half mask (incl. filtering facepiece)" }, { apf: 10, calculatedMuc: 500, idlh: 2000, muc: 500, note: "Calculated MUC is below the IDLH. The MUC also cannot exceed the cartridge or canister limits." }],
  [{ oel: "", idlh: "", respirator: "" }, { apf: "Select respirator", calculatedMuc: "Enter OEL", muc: "Enter OEL", note: "" }],
  [{ oel: 10, idlh: 100, respirator: "" }, { apf: "Select respirator", calculatedMuc: "Select respirator", idlh: 100, muc: "Select respirator", note: "" }],
  [{ oel: 0.1, idlh: "", respirator: "APR, half mask (incl. filtering facepiece)" }, { calculatedMuc: 1, muc: 1 }],
];

for (const [input, expected] of cases) {
  const r = calculate(input);
  for (const k of Object.keys(expected)) assert.strictEqual(r[k], expected[k], `${JSON.stringify(input)} ${k}`);
  console.log("ok", JSON.stringify(input), "->", r.apf, "|", r.calculatedMuc, "|", r.idlh, "|", r.muc, "|", r.note);
}
