// MUC calculation, ported from the "MUC Calculator" Google Sheet.
// APFs are from OSHA 29 CFR 1910.134(d)(3)(i)(A), Table 1.
// Blank or invalid inputs are represented as "".

const APF_TABLE = [
  { name: "APR, quarter mask", apf: 5 },
  { name: "APR, half mask (incl. filtering facepiece)", apf: 10 },
  { name: "APR, full facepiece", apf: 50 },
  { name: "PAPR, half mask", apf: 50 },
  { name: "PAPR, full facepiece", apf: 1000 },
  { name: "PAPR, helmet/hood (WPF/SWPF ≥ 1,000)", apf: 1000 },
  { name: "PAPR, helmet/hood (no WPF/SWPF test)", apf: 25 },
  { name: "PAPR, loose-fitting facepiece", apf: 25 },
  { name: "SAR demand, half mask", apf: 10 },
  { name: "SAR demand, full facepiece", apf: 50 },
  { name: "SAR continuous flow, half mask", apf: 50 },
  { name: "SAR continuous flow, full facepiece", apf: 1000 },
  { name: "SAR continuous flow, helmet/hood (WPF/SWPF ≥ 1,000)", apf: 1000 },
  { name: "SAR continuous flow, helmet/hood (no WPF/SWPF test)", apf: 25 },
  { name: "SAR continuous flow, loose-fitting facepiece", apf: 25 },
  { name: "SAR pressure-demand, half mask", apf: 50 },
  { name: "SAR pressure-demand, full facepiece", apf: 1000 },
  { name: "SCBA demand, half mask", apf: 10 },
  { name: "SCBA demand, full facepiece", apf: 50 },
  { name: "SCBA demand, helmet/hood", apf: 50 },
  { name: "SCBA pressure-demand, full facepiece", apf: 10000 },
  { name: "SCBA pressure-demand, helmet/hood", apf: 10000 },
];

// Keeps JS float noise out of results (e.g. 0.30000000000000004 -> 0.3).
function clean(x) {
  return Number(x.toPrecision(15));
}

const NOTES = {
  noIdlh: "No IDLH entered, so the MUC equals APF × OEL. The MUC also cannot exceed the cartridge or canister limits.",
  aboveIdlh: "Calculated MUC is above the IDLH, so the MUC is set at the IDLH.",
  belowIdlh: "Calculated MUC is below the IDLH. The MUC also cannot exceed the cartridge or canister limits.",
};

function calculate(i) {
  const oel = i.oel;
  const idlh = i.idlh;
  const row = APF_TABLE.find((r) => r.name === i.respirator);

  // Assigned protection factor
  const apf = row ? row.apf : "Select respirator";

  // Calculated MUC = APF x OEL
  let calculatedMuc;
  if (oel === "") calculatedMuc = "Enter OEL";
  else if (!row) calculatedMuc = "Select respirator";
  else calculatedMuc = clean(row.apf * oel);

  const idlhOut = idlh === "" ? "None entered" : idlh;

  // Maximum use concentration: capped at the IDLH when one is entered
  const hasMuc = typeof calculatedMuc === "number";
  let muc;
  if (hasMuc && idlh !== "") muc = Math.min(calculatedMuc, idlh);
  else muc = calculatedMuc;

  let note = "";
  if (hasMuc) {
    if (idlh === "") note = NOTES.noIdlh;
    else if (calculatedMuc > idlh) note = NOTES.aboveIdlh;
    else note = NOTES.belowIdlh;
  }

  return { apf, calculatedMuc, idlh: idlhOut, muc, note };
}

if (typeof module !== "undefined") module.exports = { calculate, APF_TABLE };
