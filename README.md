**English** | [Deutsch](/docs/README.de.md)

<div align="center">

# ✦ grow-feed-calculator

**A small, open calculator for fertilizer amounts.**<br>
Pick a brand, a phase and a week, enter how much water you mix – and get the exact amount of every product.

![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-F7DF1E?logo=javascript&logoColor=black)
![Feeding charts](https://img.shields.io/badge/Feeding%20charts-Hesi%20Soil-059669)
![Status](https://img.shields.io/badge/Status-early%20version-orange)
![License](https://img.shields.io/badge/License-GPL--3.0-blue)
![Languages](https://img.shields.io/badge/Languages-EN%20%C2%B7%20DE-8a2be2)

</div>

---

> [!WARNING]
> **This is an early version.**
> The calculator works and can be installed on your home screen, but so far only with the Hesi soil chart.

It only **calculates**. It does not track or monitor your plants. That is the job of a future
**Grow Manager**, which can later use this calculator through an API.

## Features

- Doses for any amount of water, scaled from the manufacturer's feeding chart
- Products with their own units, e.g. ml per 10 L or drops per 4.5 L
- Water in L or ml, with comma or dot (`0,7` or `0.7`)
- Optional products (like PowerZyme) only when you switch them on
- Premix products (like SuperVit) are shown with the water instead of as a dose,
  because tiny amounts like 0.16 drops cannot be measured
- Short usage notes per product, straight from the data
- Product names per language – English is always there, other languages where the name differs
- One data file per brand, so new brands can be added without touching the code

## Included feeding charts

| Brand | Schedule | Weeks |
|---|---|---|
| Hesi | Soil | Seedling/clone, 2 × growth, 8 × bloom (week 8: flush with plain water) |

## How it works

The doses of a feeding chart are stored as plain data in `data/<brand>.json`.
Every dose refers to the base volume of its product:

```
amount = dose × water ÷ base volume
```

Example: Bloom Complex is 50 ml per 10 L. For 5 L of water that is 50 × 5 ÷ 10 = **25 ml**.

### Data format

```json
{
  "schemaVersion": 1,
  "brand": { "id": "hesi", "name": "Hesi" },
  "schedules": [
    {
      "id": "soil",
      "medium": "soil",
      "products": [
        { "id": "bloom-complex", "name": { "en": "Bloom Complex", "de": "Blüh Complex" },
          "unit": "ml", "baseVolumeLiters": 10 }
      ],
      "weeks": [
        { "phase": "bloom", "week": 1, "doses": { "bloom-complex": 50 } }
      ]
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `id` | Fixed technical name, used by the code and later by the API |
| `name` | Product name per language, `en` is required |
| `unit` | `ml` or `drops` |
| `baseVolumeLiters` | Amount of water the dose refers to |
| `optional` | `true` if the user switches the product on per feeding |
| `premix` | `true` if the product is mixed into the water beforehand (shown with the water, not as a dose) |
| `note` | Optional short usage hint per language, shown below the product's switch |
| `phase` | `start` (seedling or clone), `growth` or `bloom` – the shown words come from the app's language files |
| `doses` | Product ID → dose. A missing product is not given that week, an empty list means plain water |

## Use it

Open **[https://gerry-git-ops.github.io/grow-feed-calculator/](https://gerry-git-ops.github.io/grow-feed-calculator/)** on your phone.
To install it, use *Add to Home Screen* in your browser – it then works offline like an app.

To run it locally, serve the folder with any local web server – the browser does not load the
data files when you open `index.html` directly. For example:

- VS Code: extension **Live Server**, then *Open with Live Server* on `index.html`
- Terminal: `npx serve` and open the shown address

## Project structure

```
grow-feed-calculator/
├── assets/              # logo and app icons
├── css/style.css        # design
├── data/hesi.json       # Hesi feeding charts
├── fonts/geist/         # Geist font (SIL Open Font License)
├── i18n/                # texts per language (en, de)
├── src/
│   ├── app.js           # calculator page: inputs and result
│   ├── calculator.js    # findWeek and calculateDoses
│   ├── changelog.js     # version and history
│   ├── i18n.js          # language, plurals, number and date format
│   └── theme.js         # light / dark
├── changelog.json       # version history
├── index.html           # calculator page
├── manifest.webmanifest # home screen app
└── sw.js                # offline support
```

## Disclaimer

This project is **not affiliated with, endorsed or sponsored by Hesi** or any other manufacturer.
Brand and product names are used only to say which products the values belong to.
The values were typed from the manufacturer's public feeding chart and come **without any warranty**.
Always check the label of your product before you use it.

## License

[GPL-3.0](LICENSE)
