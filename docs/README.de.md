[English](../README.md) | **Deutsch**

<div align="center">

# ✦ grow-feed-calculator

**Ein kleiner, offener Rechner für Düngermengen.**<br>
Hersteller, Phase und Woche wählen, die Wassermenge eingeben – und für jedes Produkt die genaue Menge bekommen.

![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Module-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-5FA04E?logo=nodedotjs&logoColor=white)
![Düngeschemas](https://img.shields.io/badge/D%C3%BCngeschemas-Hesi%20Erde-059669)
![Status](https://img.shields.io/badge/Status-erste%20Version-orange)
![Lizenz](https://img.shields.io/badge/Lizenz-GPL--3.0-blue)
![Sprachen](https://img.shields.io/badge/Sprachen-EN%20%C2%B7%20DE-8a2be2)

</div>

---

> [!WARNING]
> **Das ist eine sehr frühe Version.**
> Es gibt eine erste Rechner-Seite ohne Design, die du lokal starten kannst. Design, weitere Sprachen
> und die App für den Homescreen (offline, fühlt sich an wie eine App) kommen als Nächstes.

Er **rechnet nur**. Er verfolgt oder überwacht deine Pflanzen nicht. Das übernimmt später ein eigener
**Grow Manager**, der diesen Rechner dann über eine API nutzen kann.

## Funktionen

- Mengen für jede Wassermenge, umgerechnet aus dem Düngeschema des Herstellers
- Produkte mit eigener Einheit, z. B. ml pro 10 L oder Tropfen pro 4,5 L
- Wasser in L oder ml, mit Komma oder Punkt (`0,7` oder `0.7`)
- Optionale Produkte (wie PowerZyme) nur, wenn du sie einschaltest
- Vormisch-Produkte (wie SuperVit) stehen beim Wasser statt als Dosis,
  weil sich winzige Mengen wie 0,16 Tropfen nicht abmessen lassen
- Kurze Anwendungshinweise je Produkt, direkt aus den Daten
- Produktnamen je Sprache – Englisch ist immer vorhanden, andere Sprachen dort, wo der Name abweicht
- Eine Datendatei pro Hersteller, neue Hersteller kommen ohne Änderung am Code dazu

## Enthaltene Düngeschemas

| Hersteller | Schema | Wochen |
|---|---|---|
| Hesi | Erde | Sämling/Steckling, 2 × Wuchs, 8 × Blüte (Woche 8: mit reinem Wasser spülen) |

## So funktioniert es

Die Dosierungen eines Düngeschemas liegen als reine Daten in `data/<hersteller>.json`.
Jede Dosis bezieht sich auf die Bezugsmenge ihres Produkts:

```
Menge = Dosis × Wasser ÷ Bezugsmenge
```

Beispiel: Blüh Complex ist 50 ml pro 10 L. Für 5 L Wasser sind das 50 × 5 ÷ 10 = **25 ml**.

### Datenformat

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

| Feld | Bedeutung |
|---|---|
| `id` | Fester technischer Name, genutzt vom Code und später von der API |
| `name` | Produktname je Sprache, `en` ist Pflicht |
| `unit` | `ml` oder `drops` (Tropfen) |
| `baseVolumeLiters` | Wassermenge, auf die sich die Dosis bezieht |
| `optional` | `true`, wenn man das Produkt pro Gießen selbst einschaltet |
| `premix` | `true`, wenn das Produkt vorher ins Wasser gemischt wird (steht beim Wasser, nicht als Dosis) |
| `note` | Optionaler kurzer Anwendungshinweis je Sprache, steht unter dem Schalter des Produkts |
| `phase` | `start` (Sämling oder Steckling), `growth` oder `bloom` – die angezeigten Wörter kommen aus den Sprachdateien der App |
| `doses` | Produkt-ID → Dosis. Fehlt ein Produkt, wird es in dieser Woche nicht gegeben, eine leere Liste heißt reines Wasser |

## Ausprobieren

Du brauchst [Node.js](https://nodejs.org) 18 oder neuer.

```bash
git clone https://github.com/gerry-git-ops/grow-feed-calculator.git
cd grow-feed-calculator
node try.js
```

`try.js` rechnet Blüte-Woche 4 für 5 L Wasser mit eingeschaltetem PowerZyme.

Um die Rechner-Seite zu öffnen, stelle den Ordner über einen lokalen Webserver bereit – öffnest du
`index.html` direkt, lädt der Browser die Datendatei nicht. Zum Beispiel:

- VS Code: Erweiterung **Live Server**, dann *Open with Live Server* auf `index.html`
- Terminal: `npx serve` und die angezeigte Adresse öffnen

## Projektstruktur

```
grow-feed-calculator/
├── data/
│   └── hesi.json        # Hesi-Düngeschemas
├── src/
│   ├── app.js           # Rechner-Seite: Eingaben und Ergebnis
│   └── calculator.js    # findWeek und calculateDoses
├── index.html           # Rechner-Seite
├── try.js               # schneller Test von Hand
└── package.json         # schaltet ES-Module ein
```

## Hinweis

Dieses Projekt steht **in keiner Verbindung zu Hesi** oder einem anderen Hersteller und wird von ihnen
weder unterstützt noch gesponsert. Marken- und Produktnamen werden nur genannt, um zu sagen, zu welchen
Produkten die Werte gehören. Die Werte wurden aus dem öffentlichen Düngeschema des Herstellers abgetippt
und sind **ohne Gewähr**. Prüfe vor der Anwendung immer das Etikett deines Produkts.

## Lizenz

[GPL-3.0](/LICENSE)
