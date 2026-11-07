[English](/README.md) | **Deutsch**

<div align="center">

<img src="../assets/logo.webp" alt="Logo des Dünger-Rechners" width="360">

# 🌱 Dünger-Rechner

**Ein kleiner, offener Rechner für Düngermengen – direkt auf dem Handy.**<br>
Phase und Woche wählen, die Wassermenge eingeben und für jedes Produkt die genaue Menge bekommen.

![Version](https://img.shields.io/badge/Version-0.4.0-a3e635)
![PWA](https://img.shields.io/badge/PWA-installierbar%20%C2%B7%20offline-059669)
![Düngeschemas](https://img.shields.io/badge/D%C3%BCngeschemas-Hesi%20Erde-059669)
![Sprachen](https://img.shields.io/badge/Sprachen-EN%20%C2%B7%20DE-8a2be2)
![Lizenz](https://img.shields.io/badge/Lizenz-GPL--3.0-blue)

### 👉 [App öffnen](https://gerry-git-ops.github.io/grow-feed-calculator/)

</div>

---

> [!NOTE]
> **Frühe Version.** Der Rechner funktioniert und lässt sich auf dem Home-Bildschirm installieren,
> bisher aber nur mit dem Hesi-Erde-Düngeschema.

Die App **rechnet nur**. Sie verfolgt oder überwacht deine Pflanzen nicht – das übernimmt später ein eigener
**Grow Manager**, der diesen Rechner über eine API nutzen kann.

## 📸 Bildschirmfotos

<div align="center">

<img src="images/screen-dark.webp" alt="Rechner im Dunkelmodus" width="260">
<img src="images/screen-light.webp" alt="Rechner im Hellmodus" width="260">
<img src="images/screen-changelog.webp" alt="Versionsverlauf" width="260">

</div>

> [!TIP]
> Die Bildschirmfotos sind **Beispielbilder**, die die ganze Seite auf einmal zeigen. Am Handy scrollst du
> durch die Seite, und je nach Gerät und Browser kann die App etwas anders aussehen.
>
> **Entwicklungs- und Testumgebung:** iPhone 16 Pro Max mit iOS 26.6.2.

## ✨ Funktionen

- 🧮 Genaue Mengen für jede Wassermenge, umgerechnet aus dem Düngeschema des Herstellers
- 💧 Wasser in **ml oder L**, mit Komma oder Punkt (`700`, `0,7` oder `0.7`)
- 🧴 Produkte mit eigener Einheit, z. B. ml pro 10 L oder Tropfen pro 4,5 L
- ☑️ **Optionale Produkte** (wie PowerZyme) nur, wenn du sie einschaltest – mit kurzem Anwendungshinweis
- 🫗 **Vormisch-Produkte** (wie SuperVit) stehen beim Wasser statt als Dosis –
  winzige Mengen wie 0,16 Tropfen lassen sich nicht abmessen, deshalb mischst du sie vorher ins Gießwasser
- 🌍 **Englisch und Deutsch**, automatisch passend zum Gerät, jederzeit umschaltbar
- 🌗 **Hell- und Dunkelmodus**, folgt dem Gerät, bis du selbst umschaltest
- 📲 **Installierbar** auf dem Home-Bildschirm und läuft **offline**
- 🏷️ Version und Änderungsverlauf direkt in der App

## 📲 Installieren

<details>
<summary><b>iPhone / iPad (Safari)</b></summary>

1. Die [App](https://gerry-git-ops.github.io/grow-feed-calculator/) in Safari öffnen.
2. Auf das Teilen-Symbol tippen (Quadrat mit Pfeil).
3. **Zum Home-Bildschirm** wählen.

</details>

<details>
<summary><b>Android (Chrome)</b></summary>

1. Die [App](https://gerry-git-ops.github.io/grow-feed-calculator/) in Chrome öffnen.
2. Auf das Menü (⋮) tippen.
3. **Zum Startbildschirm hinzufügen** oder **App installieren** wählen.

</details>

## 🔄 Updates und Offline-Betrieb

- **Online:** Bei jedem Öffnen prüft die App kurz, ob es eine neuere Version gibt.
  Geladen werden nur geänderte Dateien – hat sich nichts geändert, wird nichts geladen.
- **Offline:** Die App nutzt die auf dem Gerät gespeicherte Kopie und funktioniert wie gewohnt.
- **Was auf dem Gerät gespeichert wird:** die App-Dateien (etwa 0,8 MB) und deine Einstellungen für
  Sprache und Hell/Dunkel. Deine Eingaben werden **nicht** gespeichert, und nichts wird an einen Server geschickt.

Unten in der App steht die installierte Version – antippen zeigt, was sich geändert hat.

> [!NOTE]
> Geplant: ein Schalter, um automatische Updates auszuschalten. Dann erscheint ein Hinweis, wenn eine
> neue Version da ist, und du entscheidest selbst, wann du aktualisierst.

## 🏷️ Änderungsverlauf

<details>
<summary><b>0.4.0</b> · 07.11.2026</summary>

- Neues Logo und App-Icon
- App auf dem Home-Bildschirm installierbar
- Funktioniert offline

</details>

<details>
<summary><b>0.3.0</b> · 07.11.2026</summary>

- Hell- und Dunkelmodus
- Englisch und Deutsch
- Umschalter für Sprache und Design

</details>

<details>
<summary><b>0.2.0</b> · 07.11.2026</summary>

- Erste Rechner-Seite
- Wasser in ml oder L, mit Komma oder Punkt
- Optionale und vorgemischte Produkte

</details>

<details>
<summary><b>0.1.0</b> · 06.11.2026</summary>

- Hesi-Erde-Düngeschema
- Berechnung der Mengen

</details>

Derselbe Verlauf steht in der App. Er liegt in [`changelog.json`](../changelog.json).

## 🧪 Enthaltene Düngeschemas

| Hersteller | Schema | Wochen |
|---|---|---|
| Hesi | Erde | Sämling/Steckling, 2 × Wuchs, 8 × Blüte (Woche 8: mit reinem Wasser spülen) |

## ⚙️ So funktioniert es

Jede Dosis in einem Düngeschema bezieht sich auf eine Wassermenge, ihre *Bezugsmenge*:

```
Menge = Dosis × Wasser ÷ Bezugsmenge
```

Beispiel: Blüh Complex ist 50 ml pro 10 L. Für 700 ml Wasser sind das 50 × 0,7 ÷ 10 = **3,5 ml**.

<details>
<summary><b>Datenformat</b> – um eigene Düngeschemas hinzuzufügen</summary>

Jeder Hersteller hat eine Datei in `data/<hersteller>.json`:

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

</details>

<details>
<summary><b>Lokal starten</b></summary>

Stelle den Ordner über einen lokalen Webserver bereit – öffnest du `index.html` direkt, lädt der Browser
die Datendateien nicht. Zum Beispiel:

- VS Code: Erweiterung **Live Server**, dann *Open with Live Server* auf `index.html`
- Terminal: `npx serve` und die angezeigte Adresse öffnen

</details>

<details>
<summary><b>Projektstruktur</b></summary>

```
grow-feed-calculator/
├── assets/              # Logo und App-Icons
├── css/style.css        # Design
├── data/hesi.json       # Hesi-Düngeschemas
├── fonts/geist/         # Schrift Geist
├── i18n/                # Texte je Sprache (en, de)
├── src/
│   ├── app.js           # Rechner-Seite: Eingaben und Ergebnis
│   ├── calculator.js    # findWeek und calculateDoses
│   ├── changelog.js     # Version und Verlauf
│   ├── i18n.js          # Sprache, Mehrzahl, Zahlen- und Datumsformat
│   └── theme.js         # Hell / Dunkel
├── changelog.json       # Versionsverlauf
├── index.html           # Rechner-Seite
├── manifest.webmanifest # App für den Home-Bildschirm
└── sw.js                # Offline-Betrieb
```

</details>

## ⚠️ Hinweis

Dieses Projekt steht **in keiner Verbindung zu Hesi** oder einem anderen Hersteller und wird von ihnen
weder unterstützt noch gesponsert. Marken- und Produktnamen werden nur genannt, um zu sagen, zu welchen
Produkten die Werte gehören. Die Werte wurden aus dem öffentlichen Düngeschema des Herstellers abgetippt
und sind **ohne Gewähr**. Prüfe vor der Anwendung immer das Etikett deines Produkts.

## 📄 Lizenz

- **Code:** [GPL-3.0](../LICENSE)
- **Schrift:** [Geist](https://vercel.com/font) von Vercel, unter der [SIL Open Font License 1.1](../fonts/geist/OFL.txt)
