**English** | [Deutsch](/docs/README.de.md)

<div align="center">

<img src="assets/logo.webp" alt="Grow Feed Calculator logo" width="360">

# 🌱 Grow Feed Calculator

**A small, open calculator for fertilizer amounts – right on your phone.**<br>
Pick a manufacturer, a schedule and a week, enter how much water you mix, and get the exact amount of every product.

![Version](https://img.shields.io/badge/Version-0.8.0-a3e635)
![PWA](https://img.shields.io/badge/PWA-installable%20%C2%B7%20offline-059669)
![License](https://img.shields.io/badge/License-GPL--3.0-blue)

![Feeding charts](https://img.shields.io/badge/Feeding%20charts-Hesi-059669)![BioBizz](https://img.shields.io/badge/BioBizz-d97706)![Canna](https://img.shields.io/badge/Canna-2563eb)
&nbsp;
![Languages](https://img.shields.io/badge/Languages-EN-6366f1)![DE](https://img.shields.io/badge/DE-8a2be2)![FR](https://img.shields.io/badge/FR-db2777)

### 👉 [Open the app](https://gerry-git-ops.github.io/grow-feed-calculator/)

</div>

---

> [!NOTE]
> **Early version.** The calculator works and can be installed on your home screen.
> More feeding charts will follow.

The app only **calculates**. It does not track or monitor your plants – that is the job of a future
**Grow Manager**, which will be able to use this calculator through an API.

## 📸 Screenshots

<div align="center">

<img src="docs/images/screen-dark.webp" alt="Calculator in dark mode" width="260">
<img src="docs/images/screen-light.webp" alt="Calculator in light mode" width="260">
<img src="docs/images/screen-changelog.webp" alt="Version history" width="260">

</div>

> [!TIP]
> The screenshots are **example images** that show the whole page at once. On your phone you scroll
> through it, and depending on device and browser the app can look slightly different.
>
> **Development and test environment:** iPhone 16 Pro Max with iOS 26.6.2.

## ✨ Features

- 🏭 **Several manufacturers and schedules** – the app remembers your last choice
- 🧮 Exact amounts for any amount of water, scaled from the manufacturer's feeding chart
- 📏 **Ranges** where the manufacturer gives them, e.g. `3.5–4.9 ml`
- 💧 Water in **ml or L**, with comma or dot (`700`, `0,7` or `0.7`)
- 🧴 Products with their own units – ml, drops or grams, per 1 L, 4.5 L or 10 L
- ☑️ **Optional products** only when you switch them on – and only in the weeks where they are used
- 🔀 **Either-or products** – choose one of several products that replace each other
- 🫗 **Premix products** are shown with the water instead of as a dose –
  tiny amounts like 0.16 drops cannot be measured, so you mix them into your watering water beforehand
- 📝 Usage notes per product and per schedule, straight from the manufacturer's chart
- 🌍 **English, German and French**, chosen automatically from your device, switchable at any time
- 🌗 **Light and dark mode**, follows your device until you switch it yourself
- 🔔 **Update notice** when a new version is available – or automatic updates, your choice
- 📲 **Installable** on your home screen and works **offline**
- 🏷️ Version and change history right in the app

## 📲 Install

<details>
<summary><b>iPhone / iPad (Safari)</b></summary>

1. Open the [app](https://gerry-git-ops.github.io/grow-feed-calculator/) in Safari.
2. Tap the share button (square with arrow).
3. Choose **Add to Home Screen**.

</details>

<details>
<summary><b>Android (Chrome)</b></summary>

1. Open the [app](https://gerry-git-ops.github.io/grow-feed-calculator/) in Chrome.
2. Tap the menu (⋮).
3. Choose **Add to Home screen** or **Install app**.

</details>

## 🔄 Updates and offline use

- **The app always runs from the copy stored on your device** – online and offline.
- **Online:** every time you open the app, it only loads the small version list (`changelog.json`)
  and checks whether there is a newer version – also every time you bring it back from the background.
  If it stays open on screen, it checks again every 48 hours.
- **Auto-Update on** (default): a new version is loaded and the app restarts right away.
- **Auto-Update off:** the version turns yellow and a notice shows what is new. You choose
  *Update now*, *Later* or *Don't show again for this version*. The app files are only loaded when you update.
- **What is stored on your device:** the app files (about 0.8 MB), your settings for language and
  light/dark mode, your update settings, and your last choice of manufacturer, schedule, phase, week and water unit.
  Your water amount is **not** saved, and nothing is sent to a server.

The installed version is shown at the bottom right of the app – green when it is up to date,
yellow when a newer version is available. Tap it to see what changed – when a newer version is
available, the history already shows what it brings. The button at the top of the history checks for
updates, or starts the update right away. The **Auto-Update** switch sits right next to the version.

## 🏷️ Changelog

<details>
<summary><b>0.8.0</b> · 2026-11-07</summary>

- French as app language – notes from the feeding charts are still shown in English

</details>

<details>
<summary><b>0.7.0</b> · 2026-11-07</summary>

- Checks for updates every time the app comes back from the background
- Version history shows what the new version brings
- Button to check for updates or to update right away

</details>

<details>
<summary><b>0.6.1</b> · 2026-11-07</summary>

- Small fix in the update process

</details>

<details>
<summary><b>0.6.0</b> · 2026-11-07</summary>

- Notice when a new version is available
- Auto-Update switch next to the version
- Checks again every 48 hours while the app stays open

</details>

<details>
<summary><b>0.5.0</b> · 2026-11-07</summary>

- New feeding charts: BioBizz (All-Mix, Light-Mix / Coco-Mix) and Canna Terra
- Choose brand and schedule – the app remembers your last choice
- Dose ranges, either-or products and notes per schedule
- Optional products only show up in weeks where they are used

</details>

<details>
<summary><b>0.4.0</b> · 2026-11-07</summary>

- New logo and app icon
- Install the app on your home screen
- Works offline

</details>

<details>
<summary><b>0.3.0</b> · 2026-11-07</summary>

- Light and dark mode
- English and German
- Switches for language and theme

</details>

<details>
<summary><b>0.2.0</b> · 2026-11-07</summary>

- First calculator page
- Water in ml or L, with comma or dot
- Optional and premixed products

</details>

<details>
<summary><b>0.1.0</b> · 2026-11-06</summary>

- Hesi soil feeding chart
- Dose calculation

</details>

The same history is shown in the app. It is kept in [`changelog.json`](changelog.json).

## 🧪 Included feeding charts

| Manufacturer | Schedule | Stages |
|---|---|---|
| Hesi | Soil | Seedling/clone, 2 weeks growth, 8 weeks bloom (week 8: flush with plain water) |
| BioBizz | All-Mix | Propagation, growth, 8 weeks bloom, week 9 water only |
| BioBizz | Light-Mix / Coco-Mix | Propagation, growth, 8 weeks bloom, week 9 water only |
| Canna | Terra | Start, 2 growth stages, 4 bloom stages – with dose ranges |

Missing your fertilizer? Let me know in an [issue](https://github.com/gerry-git-ops/grow-feed-calculator/issues).

## ⚙️ How it works

Every dose in a feeding chart refers to an amount of water, its *base volume*:

```
amount = dose × water ÷ base volume
```

Example: a product with 50 ml per 10 L. For 700 ml of water that is 50 × 0.7 ÷ 10 = **3.5 ml**.

<details>
<summary><b>Data format</b> – for adding your own feeding charts</summary>

Each manufacturer has one file in `data/<manufacturer>.json`, listed in `data/index.json`.
A shortened example:

```json
{
  "schemaVersion": 2,
  "brand": { "id": "example", "name": "Example" },
  "schedules": [
    {
      "id": "soil",
      "name": { "en": "Soil", "de": "Erde" },
      "medium": "soil",
      "notes": [{ "en": "A note for the whole schedule", "de": "Ein Hinweis zum ganzen Schema" }],
      "products": [
        { "id": "grow-a", "name": { "en": "Grow A" }, "unit": "ml", "baseVolumeLiters": 10 },
        { "id": "grow-b", "name": { "en": "Grow B" }, "unit": "ml", "baseVolumeLiters": 1, "group": "base" },
        { "id": "grow-c", "name": { "en": "Grow C" }, "unit": "ml", "baseVolumeLiters": 1, "group": "base" },
        { "id": "booster", "name": { "en": "Booster" }, "unit": "ml", "baseVolumeLiters": 10, "optional": true,
          "note": { "en": "Short usage hint", "de": "Kurzer Anwendungshinweis" } }
      ],
      "weeks": [
        { "phase": "growth", "week": 1, "doses": { "grow-a": [30, 50], "grow-b": 2, "grow-c": 2 } },
        { "phase": "bloom", "week": 1, "label": { "en": "Bloom I", "de": "Blüte I" },
          "duration": { "en": "2–3 weeks", "de": "2–3 Wochen" }, "doses": { "booster": 20 } }
      ]
    }
  ]
}
```

**Schedule**

| Field | Meaning |
|---|---|
| `id`, `name` | Technical name and shown name per language |
| `medium` | Growing medium, e.g. `soil` |
| `notes` | Optional notes for the whole schedule, per language |

**Products**

| Field | Meaning |
|---|---|
| `id` | Fixed technical name, used by the code and later by the API |
| `name` | Product name per language, `en` is required |
| `unit` | `ml`, `drops` or `g` |
| `baseVolumeLiters` | Amount of water the dose refers to |
| `optional` | `true` if the user switches the product on per feeding |
| `group` | Products with the same group replace each other – the user chooses one |
| `premix` | `true` if the product is mixed into the water beforehand (shown with the water, not as a dose) |
| `note` | Optional short usage hint per language |

**Weeks and stages**

| Field | Meaning |
|---|---|
| `phase` | `start` (seedling or clone), `growth` or `bloom` – the shown words come from the app's language files |
| `week` | Number within the phase |
| `label`, `duration` | Optional name and duration per language for charts with stages instead of weeks |
| `doses` | Product ID → dose, as a number or a range `[min, max]`. A missing product is not given in that week, an empty list means plain water |

</details>

<details>
<summary><b>Run it locally</b></summary>

Serve the folder with any local web server – the browser does not load the data files when you open
`index.html` directly. For example:

- VS Code: extension **Live Server**, then *Open with Live Server* on `index.html`
- Terminal: `npx serve` and open the shown address

</details>

<details>
<summary><b>Project structure</b></summary>

```
grow-feed-calculator/
├── assets/              # logo and app icons
├── css/style.css        # design
├── data/
│   ├── index.json       # list of all manufacturer files
│   └── *.json           # one feeding chart file per manufacturer
├── fonts/geist/         # Geist font
├── i18n/                # texts per language (en, de, fr)
├── src/
│   ├── app.js           # calculator page: inputs and result
│   ├── calculator.js    # dose calculation
│   ├── changelog.js     # version and history
│   ├── i18n.js          # language, plurals, number and date format
│   ├── theme.js         # light / dark
│   └── update.js        # version check and updates
├── changelog.json       # version history
├── index.html           # calculator page
├── manifest.webmanifest # home screen app
└── sw.js                # offline support
```

</details>

## ⚠️ Disclaimer

This project is **not affiliated with, endorsed or sponsored by any fertilizer manufacturer**.
Brand and product names are used only to say which products the values belong to.
The values were taken from the manufacturers' public feeding charts and come **without any warranty**.
Always check the label of your product before you use it.

## 📄 License

- **Code:** [GPL-3.0](LICENSE)
- **Font:** [Geist](https://vercel.com/font) by Vercel, under the [SIL Open Font License 1.1](fonts/geist/OFL.txt)
