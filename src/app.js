import { calculateDoses } from "./calculator.js";
import { languages, detectLanguage, loadLanguage, saveLanguage, language, t, plural, formatNumber, pick } from "./i18n.js";
import { initTheme } from "./theme.js";

initTheme();
await loadLanguage(detectLanguage());

const response = await fetch("data/hesi.json");
const brand = await response.json();
const schedule = brand.schedules[0];

const phaseBox = document.querySelector("#phase");
const weekSelect = document.querySelector("#week");
const optionalBox = document.querySelector("#optional");
const waterInput = document.querySelector("#water");
const unitSelect = document.querySelector("#water-unit");
const resultList = document.querySelector("#result");
const waterInfo = document.querySelector("#water-info");

// Language switch
const languageSelect = document.querySelector("#language");

for (const lang of languages) {
  const option = document.createElement("option");
  option.value = lang;
  option.textContent = lang.toUpperCase();
  languageSelect.append(option);
}
languageSelect.value = language();

languageSelect.addEventListener("change", async () => {
  saveLanguage(languageSelect.value);
  await loadLanguage(languageSelect.value);
  updateTexts();
});

// Phase boxes
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
  box.dataset.i18n = `phase.${phase}`;
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

phaseBox.addEventListener("change", (event) => fillWeeks(event.target.value));
phaseBox.querySelector("input").checked = true;
fillWeeks(phases[0]);

// Optional products
const optionalProducts = schedule.products.filter((p) => p.optional);

for (const product of optionalProducts) {
  const label = document.createElement("label");
  label.className = "option";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = product.id;
  const name = document.createElement("span");
  name.id = `name-${product.id}`;
  label.append(checkbox, name);
  optionalBox.append(label);

  if (product.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.id = `note-${product.id}`;
    optionalBox.append(note);
  }
}

// Texts in the current language
function updateTexts() {
  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n);
  }
  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  }
  for (const element of document.querySelectorAll("[data-i18n-label]")) {
    element.ariaLabel = t(element.dataset.i18nLabel);
    element.title = t(element.dataset.i18nLabel);
  }
  document.title = t("app.title");
  for (const product of optionalProducts) {
    document.querySelector(`#name-${product.id}`).textContent = pick(product.name);
    if (product.note) {
      document.querySelector(`#note-${product.id}`).textContent = pick(product.note);
    }
  }
  showResult();
}

// Result
function readLiters() {
  const value = Number(waterInput.value.replace(",", "."));
  if (!(value > 0)) return null;
  return unitSelect.value === "ml" ? value / 1000 : value;
}

function unitText(unit, amount) {
  return unit === "drops" ? plural("unit.drops", amount) : t(`unit.${unit}`);
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
      const amount = formatNumber(dose.amount, 2);
      premixed.push(`${amount} ${unitText(dose.unit, dose.amount)} ${pick(product.name)}`);
      continue;
    }
    const digits = dose.unit === "drops" ? 0 : 1;
    const item = document.createElement("li");
    item.className = "dose";
    const name = document.createElement("span");
    name.textContent = pick(product.name);
    const amount = document.createElement("span");
    amount.className = "dose-amount";
    amount.textContent = `${formatNumber(dose.amount, digits)} ${unitText(dose.unit, dose.amount)}`;
    item.append(name, amount);
    resultList.append(item);
  }

  const amount = `${waterInput.value} ${t(`unit.${unitSelect.value}`)}`;
  waterInfo.textContent = premixed.length
    ? t("water.premixed", { amount, products: premixed.join(", ") })
    : t("water.clear", { amount });
}

document.addEventListener("input", showResult);
document.addEventListener("change", showResult);

updateTexts();