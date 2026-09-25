# Bärn Kit

Übersicht und gemeinsames Designsystem der kleinen Bern-Web-Apps von richardcervenka111-create.

Live: **https://richardcervenka111-create.github.io/-brig/**

## Was hier liegt

- `index.html`: die Übersichtsseite mit Logo, Beschreibung und Links (Live-Seite, Repository, Redesign-PR) für jedes Projekt.
- `assets/fonts/`: Manrope Variable (SIL Open Font License 1.1), selbst gehostet, damit keine Anfrage an Google Fonts nötig ist.
- `kit/kit.css`, `kit/kit.js`: das geteilte Designsystem (Tokens, Buttons, Chips, Splash, Mikro-Interaktionen), so wie es in jedem Projekt eingebettet ist.
- `kit/logos/`: die SVG-Logos aller Projekte.

## Prinzipien

1. Eine HTML-Datei pro Projekt, kein Build, kein Server, kein Tracking.
2. Selbst gehostete OFL-Schriften, keine CDN-Abhängigkeit (Leaflet ist in den Karten-Projekten vendored).
3. Hell- und Dunkelmodus nach Systemeinstellung, Kontrast AA, Fokus-Ringe, 44-px-Ziele, `prefers-reduced-motion`.
4. Jedes Projekt hat ein eigenes Logo im selben Raster (24×24, Strich 2.1, runde Enden) und eine kurze Splash-Animation (einmal pro Sitzung).

## GitHub Pages

Im Repository unter Settings → Pages den Branch `main` (Ordner `/`) wählen.
