# Iglesia Pentecostal de Broward – Mini App

A simple mobile-friendly website people open by scanning a QR code. Nothing to download.

## Files
- `index.html`: all the content (Visitantes, Anuncios, Horario de Servicios, Nuestra Misión, Ofrendas y Diezmos, Redes Sociales). Edit the text here.
- `styles.css`: colors and layout. Change `--primary` and `--accent` at the top to match the church colors.
- `app.js`: switches between the menu and each section.
- `logo.png`: the church logo (transparent background).
- `header-photo.jpg`: the photo behind the header (shown blurred). Replace it to change the background.
- `visitantes-photo.jpg`: the header photo shown on the Visitantes page.
- `horarios-photo.jpg`: the header photo shown on the Horario de Servicios page.
- `ofrendas-photo.jpg`: the header photo shown on the Ofrendas y Diezmos page.

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Publishing (free)
GitHub Pages can host this for free: repo **Settings → Pages → Deploy from branch → `main` / root**.
The site will be at `https://<username>.github.io/church-mini-app/`. Make the QR code point to that URL.
