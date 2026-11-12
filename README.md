# Flipper-Black — Projects

Projects in software, engineering, and experimental physics.

**[Visit the portfolio →](https://flipper-black.github.io/portfolio/)**

## Projects

### Barcona Systems

A collaborative project for camera-based inventory systems that read barcodes and associate items with shelf locations.

[Visit the project website](https://thegreatwave21.github.io/barcona-systems/)

### GYPT — Magnetic Carousel · Problem 16

An ongoing experimental physics project at Phaenovum. More details after completion.

The Info section introduces the experiment: a steel ball above a rotating disc of alternating magnets can move with or against the disc’s rotation. [Official problem description](https://iypt.org/iypt-2027-problems/).

### HeronShield

An AI-based water sprayer that uses a camera to detect herons near a pond and activates a directed spray of water to deter them and help protect the fish.

### ZeroXWaste

A camera-based waste sorter with a rotating plate that directs items into four categories: organic waste, lightweight packaging (Gelber Sack), residual waste and paper.

Every project has a short, expandable **Info** section. Native HTML details/summary controls support touch, keyboard and use without JavaScript.

The project graphics are original abstract SVG illustrations. The magnetic carousel graphic is an illustration, not a scientific simulation or a presentation of results.

## Built with

- Semantic HTML, responsive CSS, inline SVG artwork, and local system fonts.
- A small, dependency-free JavaScript file for the Pause motion control, one-time scroll reveals, and a pointer-position card reflection.
- All text, illustrations, and links remain usable without JavaScript.
- No external fonts, third-party libraries, trackers, analytics, cookies, or unnecessary external services.

Three slow light fields use CSS transform animations. The script pauses them when the page is hidden or the user pauses motion. The OS reduced-motion preference disables CSS animation and JavaScript motion effects. Pointer effects are limited to fine hover-capable pointers and use event-driven animation frames; no permanent JavaScript animation loop or polling timer is used.

## Local preview

Open this repository's folder and run:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Then open [localhost:4174](http://127.0.0.1:4174/). No package installation or build is required.

## Editing

`index.html` is the single source for the hero and project content. Find the **PROJECT CONTENT** comment to edit project titles, descriptions, tags, statuses, illustrations, and the approved public project link.

`styles.css` contains the palette, light-field animations, card styling, breakpoints, focus styles, and reduced-motion overrides. `interactions.js` adds only progressive interaction behavior. `favicon.svg` contains the original bracket/slash mark.

All runtime asset paths are relative and support GitHub Pages under `/portfolio/`. GitHub Pages serves the `main` branch from the repository root. `.nojekyll` keeps the site buildless.

## Scope and identity

Only the GitHub alias Flipper-Black is used as the owner's identity in the current website. No real name, private contact information, or private repository destination is included. The externally linked Barcona website may identify its public team members.

This repository contains only the portfolio website and this README. Featured projects are maintained separately; their inclusion does not imply that source code or internal materials are public. Barcona remains an external link only.

