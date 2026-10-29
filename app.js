const form = document.getElementById("form");
const $ = (id) => document.getElementById(id);

// Number inputs: blank or not greater than 0 is treated as blank.
function num(id) {
  const raw = $(id).value.trim();
  if (raw === "") return "";
  const v = Number(raw);
  return Number.isFinite(v) && v > 0 ? v : "";
}

function fmt(value) {
  return typeof value === "number" ? value.toLocaleString("en-US", { maximumFractionDigits: 2 }) : value;
}

// Fill the respirator dropdown and the APF table from APF_TABLE.
for (const r of APF_TABLE) {
  $("respirator").add(new Option(r.name, r.name));
  const tr = document.createElement("tr");
  tr.innerHTML = "<td></td><td class=\"apf\"></td>";
  tr.cells[0].textContent = r.name;
  tr.cells[1].textContent = fmt(r.apf);
  $("apfRows").append(tr);
}

// Shows a result value; its units show only when the value is a number.
function show(id, value, units) {
  const isNum = typeof value === "number";
  const el = $(id);
  el.textContent = fmt(value);
  (el.classList.contains("min") ? el : el.parentElement).classList.toggle("text", !isNum);
  const unit = $(id + "Unit");
  if (unit) unit.textContent = isNum ? units : "";
}

function update() {
  const units = $("units").value;
  document.querySelectorAll("[data-unit]").forEach((el) => (el.textContent = units));

  const r = calculate({ oel: num("oel"), idlh: num("idlh"), respirator: $("respirator").value });

  const contaminant = $("contaminant").value.trim();
  $("sub").textContent = (contaminant ? contaminant + " · " : "") + "Lower of APF × OEL and the IDLH";

  show("muc", r.muc, units);
  show("apf", r.apf, "");
  show("calculatedMuc", r.calculatedMuc, units);
  show("idlhOut", r.idlh, units);
  $("note").textContent = r.note;
}

form.addEventListener("input", update);
form.addEventListener("change", update);
update();
