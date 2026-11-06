import { readFileSync } from "node:fs";
import { calculateDoses } from "./src/calculator.js";

const brand = JSON.parse(readFileSync("data/hesi.json", "utf8"));
const soil = brand.schedules[0];

console.log(calculateDoses(soil, "bloom", 4, 5, ["powerzyme"]));
