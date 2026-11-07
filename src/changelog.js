import { t, pick, formatDate } from "./i18n.js";

const versionText = document.querySelector("#version");
const list = document.querySelector("#changelog");

let entries = [];

/** Load the version history. The newest version comes first. */
export async function loadChangelog() {
    entries = await (await fetch("changelog.json")).json();
}

/** Version of the installed app files. */
export function installedVersion() {
    return entries[0].version;
}

/** Show the installed version and the history in the current language. */
export function showChangelog() {
    versionText.textContent = t("footer.version", { version: entries[0].version });
    list.replaceChildren();

    for (const entry of entries) {
        const title = document.createElement("h3");
        title.className = "changelog-version";
        title.textContent = `${entry.version} · ${formatDate(entry.date)}`;

        const changes = document.createElement("ul");
        changes.className = "changelog-changes";
        for (const change of pick(entry.changes)) {
            const item = document.createElement("li");
            item.textContent = change;
            changes.append(item);
        }

        list.append(title, changes);
    }
}