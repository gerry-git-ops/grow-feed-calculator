import { calculateDoses } from "./calculator.js";

const response = await fetch("data/hesi.json");
const brand = await response.json();
const schedule = brand.schedules[0];

const phaseBox = document.querySelector("#phase");
const weekSelect = document.querySelector("#week");

const phases = [...new Set(schedule.weeks.map((w) => w.phase))];

for (const phase of phases) {
  const label = document.createElement("label");
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "phase";
  radio.value = phase;
  radio.className = "choice-input";
  const box = document.createElement("span");
  box.className = "choice-box";
  box.textContent = phase;
  label.append(radio, box);
  phaseBox.append(label);
}

function fillWeeks(phase) {
  weekSelect.replaceChildren();
  for (const entry of schedule.weeks.filter((w) => w.phase === phase)) {
    const option = document.createElement("option");
    option.value = entry.week;
    option.textContent = entry.week;
    weekSelect.append(option);
  }
}

const optionalBox = document.querySelector("#optional");

for (const product of schedule.products.filter((p) => p.optional)) {
  const label = document.createElement("label");
  label.className = "option";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = product.id;
  label.append(checkbox, product.name.en);
  optionalBox.append(label);

  if (product.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = product.note.en;
    optionalBox.append(note);
  }
}

phaseBox.addEventListener("change", (event) => fillWeeks(event.target.value));

phaseBox.querySelector("input").checked = true;
fillWeeks(phases[0]);

const waterInput = document.querySelector("#water");
const unitSelect = document.querySelector("#water-unit");
const resultList = document.querySelector("#result");
const waterInfo = document.querySelector("#water-info");

function readLiters() {
  const value = Number(waterInput.value.replace(",", "."));
  if (!(value > 0)) return null;
  return unitSelect.value === "ml" ? value / 1000 : value;
}

function showResult() {
  resultList.replaceChildren();
  waterInfo.textContent = "";
  const liters = readLiters();
  if (liters === null) return;

  const phase = phaseBox.querySelector("input:checked").value;
  const week = Number(weekSelect.value);
  const enabled = [...optionalBox.querySelectorAll("input:checked")].map((c) => c.value);
  const doses = calculateDoses(schedule, phase, week, liters, enabled);

  const premixed = [];
  for (const dose of doses) {
    const product = schedule.products.find((p) => p.id === dose.productId);
    if (product.premix) {
      premixed.push(`${dose.amount.toFixed(2)} ${dose.unit} ${product.name.en}`);
      continue;
    }
    const digits = dose.unit === "drops" ? 0 : 1;
    const item = document.createElement("li");
    item.className = "dose";
    const name = document.createElement("span");
    name.textContent = product.name.en;
    const amount = document.createElement("span");
    amount.className = "dose-amount";
    amount.textContent = `${dose.amount.toFixed(digits)} ${dose.unit}`;
    item.append(name, amount);
    resultList.append(item);
  }

  const amount = `${waterInput.value} ${unitSelect.selectedOptions[0].textContent}`;
  waterInfo.textContent = premixed.length
    ? `${amount} premixed water with ${premixed.join(", ")}`
    : `${amount} clear water`;
}

document.addEventListener("input", showResult);
document.addEventListener("change", showResult);