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

/** Show the installed version and a history in the current language.
 *  The history can be newer than the installed version; new entries are marked. */
export function showChangelog(history = entries) {
    versionText.textContent = t("footer.version", { version: installedVersion() });
    list.replaceChildren();

    for (const entry of history) {
        const isNew = !entries.some((installed) => installed.version === entry.version);
        const title = document.createElement("h3");
        title.className = isNew ? "changelog-version changelog-new" : "changelog-version";
        title.textContent = `${entry.version} · ${formatDate(entry.date)}`;
        if (isNew) title.textContent += ` · ${t("update.new")}`;

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