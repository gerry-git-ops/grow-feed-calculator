import { t, pick } from "./i18n.js";
import { installedVersion, showChangelog } from "./changelog.js";

const versionText = document.querySelector("#version");
const notice = document.querySelector("#update-notice");
const noticeTitle = document.querySelector("#update-title");
const noticeChanges = document.querySelector("#update-changes");
const updateButton = document.querySelector("#update-now");
const laterButton = document.querySelector("#update-later");
const hideButton = document.querySelector("#update-hide");
const autoSwitch = document.querySelector("#auto-update");
const checkButton = document.querySelector("#update-check");

// While the app stays open on screen, check again after this many hours
const CHECK_HOURS = 48;

// Newest version on the server; saved so it is also known offline
let latest = JSON.parse(localStorage.getItem("latestChangelog") ?? "null");
// Short state of the check button: idle, checking, current, offline or updating
let buttonState = "idle";

const autoUpdate = () => localStorage.getItem("autoUpdate") !== "off";
const newestVersion = () => latest?.[0].version;
const isOutdated = () => Boolean(latest) && newestVersion() !== installedVersion();

/** Load the new files through the service worker, then reload the page. */
async function update() {
    updateButton.disabled = true;
    buttonState = "updating";
    showCheckButton();
    const worker = (await navigator.serviceWorker.ready).active;
    worker.postMessage("update");
}

// Answer from the service worker after an update
navigator.serviceWorker?.addEventListener("message", (event) => {
    if (event.data === "updated") location.reload();
    if (event.data === "update-failed") {
        updateButton.disabled = false;
        buttonState = "offline";
        showCheckButton();
    }
});

/** Text of the button in the version history. */
function showCheckButton() {
    checkButton.classList.toggle("button-update", isOutdated() && buttonState === "idle");
    checkButton.disabled = buttonState === "checking" || buttonState === "updating";
    if (buttonState !== "idle") {
        checkButton.textContent = t(`update.${buttonState}`);
    } else if (isOutdated()) {
        checkButton.textContent = t("update.to", { version: newestVersion() });
    } else {
        checkButton.textContent = t("update.check");
    }
}

/** Show the version color, the history and the notice in the current language. */
export function showUpdate() {
    versionText.classList.toggle("version-outdated", isOutdated());
    autoSwitch.checked = autoUpdate();
    // When outdated, the history already shows what the new version brings
    if (isOutdated()) showChangelog(latest);
    showCheckButton();

    const hidden = localStorage.getItem("hiddenUpdate") === newestVersion();
    notice.hidden = !isOutdated() || autoUpdate() || hidden;
    if (notice.hidden) return;

    noticeTitle.textContent = t("update.available", { version: newestVersion() });
    noticeChanges.replaceChildren();
    for (const change of pick(latest[0].changes)) {
        const item = document.createElement("li");
        item.textContent = change;
        noticeChanges.append(item);
    }
}

/** Look for a newer version on the server (only the changelog is loaded). Returns false when offline. */
async function check() {
    try {
        latest = await (await fetch("changelog.json?latest", { cache: "no-store" })).json();
        localStorage.setItem("latestChangelog", JSON.stringify(latest));
        localStorage.setItem("lastUpdateCheck", Date.now());
    } catch {
        // Offline: keep the saved version
        showUpdate();
        return false;
    }

    if (isOutdated() && autoUpdate()) {
        update();
        return true;
    }
    showUpdate();
    return true;
}

/** Check again if the last check is older than CHECK_HOURS. */
function checkIfDue() {
    const last = Number(localStorage.getItem("lastUpdateCheck") ?? 0);
    if (Date.now() - last > CHECK_HOURS * 60 * 60 * 1000) check();
}

/** Start offline support and look for a newer version. */
export async function checkForUpdate() {
    if (!("serviceWorker" in navigator)) {
        checkButton.hidden = true;
        return;
    }
    await navigator.serviceWorker.register("sw.js");
    await check();

    // Every time the app comes back from the background
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") check();
    });
    // While it stays open on screen
    setInterval(checkIfDue, 60 * 60 * 1000);
}

checkButton.addEventListener("click", async () => {
    if (isOutdated()) {
        update();
        return;
    }
    buttonState = "checking";
    showCheckButton();
    const online = await check();
    if (buttonState === "updating") return;
    buttonState = online ? "current" : "offline";
    if (online && isOutdated()) buttonState = "idle";
    showCheckButton();
    // Back to the normal text after a moment
    setTimeout(() => {
        if (buttonState === "current" || buttonState === "offline") {
            buttonState = "idle";
            showCheckButton();
        }
    }, 3000);
});

updateButton.addEventListener("click", update);

laterButton.addEventListener("click", () => {
    notice.hidden = true;
});

hideButton.addEventListener("click", () => {
    localStorage.setItem("hiddenUpdate", newestVersion());
    notice.hidden = true;
});

autoSwitch.addEventListener("change", () => {
    localStorage.setItem("autoUpdate", autoSwitch.checked ? "on" : "off");
    if (autoSwitch.checked && isOutdated()) update();
    else showUpdate();
});
