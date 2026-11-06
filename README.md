**English** | [Deutsch](/docs/README.de.md)

<div align="center">

# ✦ grow-feed-calculator

**A small, open calculator for fertilizer amounts.**<br>
Pick a brand, a phase and a week, enter how much water you mix – and get the exact amount of every product.

![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-5FA04E?logo=nodedotjs&logoColor=white)
![Feeding charts](https://img.shields.io/badge/Feeding%20charts-Hesi%20Soil-059669)
![Status](https://img.shields.io/badge/Status-first%20version-orange)
![License](https://img.shields.io/badge/License-GPL--3.0-blue)
![Languages](https://img.shields.io/badge/Languages-EN%20%C2%B7%20DE-8a2be2)

</div>

---

> [!WARNING]
> **This is the very first version and it cannot really do much yet.**
> There is no app to open yet – only the feeding chart data and the calculation logic,
> which you can try in the terminal. The app itself (a page you can put on your home screen) comes next.

It only **calculates**. It does not track or monitor your plants. That is the job of a future
**Grow Manager**, which can later use this calculator through an API.

## Features

- Doses for any amount of water, scaled from the manufacturer's feeding chart
- Products with their own units, e.g. ml per 10 L or drops per 4.5 L
- Optional products (like PowerZyme) only when you switch them on
- Product names per language – English is always there, other languages where the name differs
- One data file per brand, so new brands can be added without touching the code

## Included feeding charts

| Brand | Schedule | Weeks |
|---|---|---|
| Hesi | Soil | Clone, 2 × growth, 8 × bloom (week 8: flush with plain water) |

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
| `phase` | `clone`, `growth` or `bloom` – the shown words come from the app's language files |
| `doses` | Product ID → dose. A missing product is not given that week, an empty list means plain water |

## Try it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/gerry-git-ops/grow-feed-calculator.git
cd grow-feed-calculator
node try.js
```

`try.js` calculates bloom week 4 for 5 L of water with PowerZyme switched on.

## Project structure

```
grow-feed-calculator/
├── data/
│   └── hesi.json        # Hesi feeding charts
├── src/
│   └── calculator.js    # findWeek and calculateDoses
├── try.js               # quick manual check
└── package.json         # enables ES modules
```

## Disclaimer

This project is **not affiliated with, endorsed or sponsored by Hesi** or any other manufacturer.
Brand and product names are used only to say which products the values belong to.
The values were typed from the manufacturer's public feeding chart and come **without any warranty**.
Always check the label of your product before you use it.

## License

[GPL-3.0](LICENSE)
