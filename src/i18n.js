export const languages = ["en", "de", "fr"];
const fallback = "en";

let current = fallback;
let texts = {};
let fallbackTexts = {};

/** Pick the saved language, else the device language, else English. */
export function detectLanguage() {
    const saved = localStorage.getItem("language");
    if (languages.includes(saved)) return saved;
    const device = navigator.language.slice(0, 2);
    return languages.includes(device) ? device : fallback;
}

/** Load the texts of a language. English is always loaded as fallback. */
export async function loadLanguage(lang) {
    fallbackTexts = await (await fetch(`i18n/${fallback}.json`)).json();
    texts = lang === fallback ? fallbackTexts : await (await fetch(`i18n/${lang}.json`)).json();
    current = lang;
    document.documentElement.lang = lang;
}

export function language() {
    return current;
}

/** Remember a language the user picked. */
export function saveLanguage(lang) {
    localStorage.setItem("language", lang);
}

function lookup(source, key) {
    return key.split(".").reduce((part, name) => part?.[name], source);
}

/** Text for a key like "label.week"; {name} parts are replaced by values. */
export function t(key, values = {}) {
    const text = lookup(texts, key) ?? lookup(fallbackTexts, key) ?? key;
    return text.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

/** Singular or plural text, e.g. plural("unit.drops", 2) → "drops". */
export function plural(key, count) {
    const form = new Intl.PluralRules(current).select(count);
    return t(`${key}.${form}`);
}

/** Number in the format of the language, e.g. 3.5 → "3,5" in German. */
export function formatNumber(value, digits) {
    return new Intl.NumberFormat(current, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(value);
}

/** Date in the format of the language, e.g. "2026-11-07" → "07.11.2026" in German. */
export function formatDate(isoDate) {
    return new Intl.DateTimeFormat(current, { dateStyle: "medium" }).format(new Date(isoDate));
}

/** Name or note of a product: current language, else English. */
export function pick(textsPerLanguage) {
    return textsPerLanguage[current] ?? textsPerLanguage[fallback];
}