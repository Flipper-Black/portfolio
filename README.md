# Philipp Wirth — Terminal portfolio

**[Open the portfolio →](https://flipper-black.github.io/)**

A macOS Terminal-inspired personal website for Flipper-Black. A translucent charcoal window sits above a midnight blue and purple wallpaper, with native system monospace typography, colored shell prompts, amber links, and a block cursor.

## Content

- Introduction and a dedicated About section: co-founding Barcona with Kenan, practical software and engineering, and the enjoyment of collaboration and hands-on experimentation. Includes links to Kenan’s portfolio and Barcona’s official website.
- Barcona Systems — camera-based inventory and barcode recognition. [Official website](https://barconasystems.de/).
- GYPT — Magnetic Carousel — experimental physics at Phaenovum. [Official problem](https://iypt.org/iypt-2027-problems/).
- HeronShield — AI-guided water spray to help protect fish ponds.
- ZeroXWaste — camera-based sorting into four waste categories.
- [GitHub](https://github.com/Flipper-Black) and the owner’s approved [LinkedIn profile](https://www.linkedin.com/in/philipp-wirth-398b2a384/).

## Interaction

Each native `details` control opens a project. With JavaScript enabled, a short decorative code sequence types out over 740 ms, then reveals the project notes. This is a visual effect; no arbitrary code is executed. Closing a panel cancels its animation. Reduced-motion preferences or the persisted Motion toggle reveal notes immediately. Typed characters are hidden from screen readers, with one completion announcement.

Window controls hide/minimize and restore the terminal, or expand it within the browser. Escape restores the normal window size. Keyboard focus is retained when restoring. The site remains readable and project notes remain available without JavaScript; window controls are disabled until JavaScript is ready.

## Development

Static HTML, CSS, and JavaScript. No build step, external fonts, libraries, trackers, or third-party scripts. The only stored browser preference is the Motion setting.

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Edit `index.html` for content, `styles.css` for appearance, and `interactions.js` for enhancements. Assets use relative paths. GitHub Pages serves `main` from the repository root. `.nojekyll` keeps it buildless. `portfolio/index.html` redirects the old `/portfolio/` URL to the root.

## Verification

Checked in Safari at desktop, 390 px, and 320 px widths: Terminal frame, project navigation, expanded project text and code wrapping, Motion toggle, minimize/restore, and expand/Escape. Static checks cover asset paths, section links, labels, project count, and public social URLs.
