import { t, pick } from "./i18n.js";
import { installedVersion } from "./changelog.js";

const versionText = document.querySelector("#version");
const notice = document.querySelector("#update-notice");
const noticeTitle = document.querySelector("#update-title");
const noticeChanges = document.querySelector("#update-changes");
const updateButton = document.querySelector("#update-now");
const laterButton = document.querySelector("#update-later");
const hideButton = document.querySelector("#update-hide");
const autoSwitch = document.querySelector("#auto-update");

// When the app stays open for a long time, check again after this many hours
const CHECK_HOURS = 48;

// Newest version on the server; saved so it is also known offline
let latest = JSON.parse(localStorage.getItem("latestChangelog") ?? "null");

const autoUpdate = () => localStorage.getItem("autoUpdate") !== "off";
const newestVersion = () => latest?.[0].version;
const isOutdated = () => Boolean(latest) && newestVersion() !== installedVersion();

/** Load the new files through the service worker, then reload the page. */
async function update() {
  updateButton.disabled = true;
  const worker = (await navigator.serviceWorker.ready).active;
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data === "updated") location.reload();
    if (event.data === "update-failed") updateButton.disabled = false;
  });
  worker.postMessage("update");
}

/** Show the version color and the notice in the current language. */
export function showUpdate() {
  versionText.classList.toggle("version-outdated", isOutdated());
  autoSwitch.checked = autoUpdate();

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

/** Look for a newer version on the server (only the changelog is loaded). */
async function check() {
  try {
    latest = await (await fetch("changelog.json?latest", { cache: "no-store" })).json();
    localStorage.setItem("latestChangelog", JSON.stringify(latest));
    localStorage.setItem("lastUpdateCheck", Date.now());
  } catch {
    // Offline: keep the saved version
    showUpdate();
    return;
  }

  if (isOutdated() && autoUpdate()) {
    update();
    return;
  }
  showUpdate();
}

/** Check again if the last check is older than CHECK_HOURS. */
function checkIfDue() {
  const last = Number(localStorage.getItem("lastUpdateCheck") ?? 0);
  if (Date.now() - last > CHECK_HOURS * 60 * 60 * 1000) check();
}

/** Start offline support and look for a newer version. */
export async function checkForUpdate() {
  if (!("serviceWorker" in navigator)) return;
  await navigator.serviceWorker.register("sw.js");
  await check();

  // App comes back from the background, or stays open on screen
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkIfDue();
  });
  setInterval(checkIfDue, 60 * 60 * 1000);
}

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