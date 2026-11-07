import { calculateDoses, productsInWeek } from "./calculator.js";
import { languages, detectLanguage, loadLanguage, saveLanguage, language, t, plural, formatNumber, pick } from "./i18n.js";
import { initTheme } from "./theme.js";
import { loadChangelog, showChangelog } from "./changelog.js";

initTheme();
await loadLanguage(detectLanguage());
await loadChangelog();

// All brands from data/index.json; one file per brand
const brandFiles = await (await fetch("data/index.json")).json();
const brands = await Promise.all(brandFiles.map(async (file) => (await fetch(`data/${file}`)).json()));
// Last selection (brand, schedule, phase, week, water unit), restored on start
const saved = JSON.parse(localStorage.getItem("selection") ?? "{}");
let brand = brands.find((item) => item.brand.id === saved.brand) ?? brands[0];
let schedule = brand.schedules.find((item) => item.id === saved.schedule) ?? brand.schedules[0];

const brandSelect = document.querySelector("#brand");
const scheduleSelect = document.querySelector("#schedule");
const phaseBox = document.querySelector("#phase");
const weekSelect = document.querySelector("#week");
const optionalBox = document.querySelector("#optional");
const waterInput = document.querySelector("#water");
const unitSelect = document.querySelector("#water-unit");
const resultList = document.querySelector("#result");
const waterInfo = document.querySelector("#water-info");
const resultCard = document.querySelector("#result-card");
const weekLabel = document.querySelector('label[for="week"]');
const scheduleNotes = document.querySelector("#schedule-notes");

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

// Brand and schedule
for (const item of brands) {
  const option = document.createElement("option");
  option.value = item.brand.id;
  option.textContent = item.brand.name;
  brandSelect.append(option);
}

function fillSchedules() {
  scheduleSelect.replaceChildren();
  for (const item of brand.schedules) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = pick(item.name);
    scheduleSelect.append(option);
  }
  scheduleSelect.value = schedule.id;
}

brandSelect.addEventListener("input", () => {
  brand = brands.find((item) => item.brand.id === brandSelect.value);
  schedule = brand.schedules[0];
  buildSchedule();
});

scheduleSelect.addEventListener("input", () => {
  schedule = brand.schedules.find((item) => item.id === scheduleSelect.value);
  buildSchedule();
});

// Phase boxes; starts with the given phase if the schedule has it
function buildPhases(startPhase) {
  for (const label of phaseBox.querySelectorAll("label")) label.remove();
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
  const phase = phases.includes(startPhase) ? startPhase : phases[0];
  phaseBox.querySelector(`input[value="${phase}"]`).checked = true;
  fillWeeks(phase);
}

function currentPhase() {
  return phaseBox.querySelector("input:checked").value;
}

// Weeks: a number, or a name with duration (e.g. "Vegetative I · 0–3 weeks")
function weekText(entry) {
  if (!entry.label) return String(entry.week);
  const name = pick(entry.label);
  return entry.duration ? `${name} · ${pick(entry.duration)}` : name;
}

function fillWeeks(phase, keepSelection = false) {
  const previous = weekSelect.value;
  weekSelect.replaceChildren();
  for (const entry of schedule.weeks.filter((w) => w.phase === phase)) {
    const option = document.createElement("option");
    option.value = entry.week;
    option.textContent = weekText(entry);
    weekSelect.append(option);
  }
  if (keepSelection) weekSelect.value = previous;
}

phaseBox.addEventListener("input", (event) => fillWeeks(event.target.value));

// Optional products (checkbox) and choice groups (one of several, radio)
function addOption(container, product, type, name) {
  const item = document.createElement("div");
  item.className = "option-item";
  item.dataset.product = product.id;

  const label = document.createElement("label");
  label.className = "option";
  const input = document.createElement("input");
  input.type = type;
  input.value = product.id;
  if (name) input.name = name;
  const text = document.createElement("span");
  text.id = `name-${product.id}`;
  label.append(input, text);
  item.append(label);

  if (product.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.id = `note-${product.id}`;
    item.append(note);
  }
  container.append(item);
}

const groups = new Map();

function buildOptions() {
  optionalBox.replaceChildren();
  groups.clear();
  for (const product of schedule.products) {
    if (product.group) {
      let box = groups.get(product.group);
      if (!box) {
        box = document.createElement("fieldset");
        box.className = "option-group";
        const legend = document.createElement("legend");
        legend.className = "label";
        legend.dataset.i18n = "label.choice";
        box.append(legend);
        optionalBox.append(box);
        groups.set(product.group, box);
      }
      addOption(box, product, "radio", `group-${product.group}`);
    } else if (product.optional) {
      addOption(optionalBox, product, "checkbox");
    }
  }
  for (const box of groups.values()) {
    box.querySelector("input").checked = true;
  }
}

// Rebuild everything that depends on the chosen schedule
function buildSchedule(startPhase, startWeek) {
  weekLabel.dataset.i18n = schedule.weeks.some((w) => w.label) ? "label.stage" : "label.week";
  buildPhases(startPhase);
  if ([...weekSelect.options].some((option) => option.value === startWeek)) weekSelect.value = startWeek;
  buildOptions();
  updateTexts();
}

// Show only the options that have a dose in the chosen week
function updateOptions() {
  const available = productsInWeek(schedule, currentPhase(), Number(weekSelect.value)).map((p) => p.id);
  for (const item of optionalBox.querySelectorAll(".option-item")) {
    item.hidden = !available.includes(item.dataset.product);
  }
  for (const box of groups.values()) {
    box.hidden = !box.querySelector(".option-item:not([hidden])");
  }
}

// Notes for the whole schedule, e.g. about EC and pH
function showScheduleNotes() {
  scheduleNotes.replaceChildren();
  for (const note of schedule.notes ?? []) {
    const item = document.createElement("li");
    item.textContent = pick(note);
    scheduleNotes.append(item);
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
  showChangelog();
  fillSchedules();
  fillWeeks(currentPhase(), true);
  showScheduleNotes();
  for (const product of schedule.products) {
    const name = document.querySelector(`#name-${product.id}`);
    if (name) name.textContent = pick(product.name);
    const note = document.querySelector(`#note-${product.id}`);
    if (note) note.textContent = pick(product.note);
  }
  refresh();
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

// One amount or a range, e.g. "3,5 ml" or "2,1–3,5 ml"
function amountText(amount, unit, digits) {
  const values = Array.isArray(amount) ? amount : [amount];
  const numbers = values.map((value) => formatNumber(value, digits)).join("–");
  return `${numbers} ${unitText(unit, values.at(-1))}`;
}

const digitsPerUnit = { ml: 1, drops: 0, g: 2 };

function showResult() {
  resultList.replaceChildren();
  waterInfo.textContent = "";
  const liters = readLiters();
  resultCard.hidden = liters === null;
  if (liters === null) return;

  const selected = [...optionalBox.querySelectorAll("input:checked")].map((input) => input.value);
  const doses = calculateDoses(schedule, currentPhase(), Number(weekSelect.value), liters, selected);

  const premixed = [];
  for (const dose of doses) {
    const product = schedule.products.find((p) => p.id === dose.productId);
    if (product.premix) {
      premixed.push(`${amountText(dose.amount, dose.unit, 2)} ${pick(product.name)}`);
      continue;
    }
    const item = document.createElement("li");
    item.className = "dose";
    const name = document.createElement("span");
    name.textContent = pick(product.name);
    const amount = document.createElement("span");
    amount.className = "dose-amount";
    amount.textContent = amountText(dose.amount, dose.unit, digitsPerUnit[dose.unit] ?? 1);
    item.append(name, amount);
    resultList.append(item);
  }

  const amount = `${waterInput.value} ${t(`unit.${unitSelect.value}`)}`;
  waterInfo.textContent = premixed.length
    ? t("water.premixed", { amount, products: premixed.join(", ") })
    : t("water.clear", { amount });
}

function saveSelection() {
  localStorage.setItem("selection", JSON.stringify({
    brand: brand.brand.id,
    schedule: schedule.id,
    phase: currentPhase(),
    week: weekSelect.value,
    unit: unitSelect.value,
  }));
}

function refresh() {
  updateOptions();
  showResult();
  saveSelection();
}

document.addEventListener("input", refresh);
document.addEventListener("change", refresh);

brandSelect.value = brand.brand.id;
if (saved.unit) unitSelect.value = saved.unit;
buildSchedule(saved.phase, saved.week);

// Offline support
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}