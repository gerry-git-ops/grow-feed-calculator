const button = document.querySelector("#theme");
const deviceDark = matchMedia("(prefers-color-scheme: dark)").matches;

const themeColor = document.querySelector('meta[name="theme-color"]');

function apply(theme) {
    document.documentElement.dataset.theme = theme;
    button.textContent = theme === "dark" ? "☀" : "☾";
    themeColor.content = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
}

/** Use the saved theme, else the device setting. The button switches and saves. */
export function initTheme() {
    apply(localStorage.getItem("theme") ?? (deviceDark ? "dark" : "light"));

    button.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", next);
        apply(next);
    });
}
