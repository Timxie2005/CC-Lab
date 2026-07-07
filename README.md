# CC Lab Projects

This repository collects a set of small Creative Coding Lab projects, p5.js exercises, and starter templates. Most folders are standalone static web sketches: open the folder, load its `index.html`, and the sketch runs in the browser. Hope you have fun when exploring!

## Repo Structure

### Main course projects

- `Project_A/`: CCLab Project A, a generative creature called "The Peeper". The sketch reacts to mouse speed and switches between roaming, hiding, and alert states.
- `Project_B/`: CCLab Project B, a scroll-based narrative about the history of communication. Includes animated background elements, an interactive smartphone section, a telegraph section, and a second ending page at `page2.html`.

### Smaller studies and class exercises

- `Confetti/`: particle exercise that spawns confetti bursts while the mouse is pressed.
- `OOP1/`: object-oriented p5 sketch with animated taxis and sound effects.
- `cows-and-chicken/`: draggable animal composition using image assets; cows and chickens behave differently depending on screen region.
- `paper_plane/`: early scroll experiment with an image moving on a sine-wave path as the page scrolls.
- `zora-scroll/`: simple scroll-mapping prototype that moves text/emoji based on scroll progress.
- `css_layout/`: basic p5 sketch embedded into a multi-box HTML/CSS layout.
- `css_center_layout/`: centered page layout exercise with a linked subpage in `more_info/`.

### Templates and starter files

- `web_template/`: minimal p5.js webpage starter.
- `particleworld-template/`: particle-system template with mirrored particle motion.
- `object-dancers-template/`: class exercise template for building a dancer object; this repo includes a customized `TianchenDancer`.

## Common Folder Pattern

Most project folders follow the same structure:

- `index.html`: page entry point.
- `sketch.js` or `script.js`: p5.js code.
- `style.css`: page styling.
- `library/`, `lib/`, or `libraries/`: local copy of p5.js and optional p5.sound.
- `assets/`: images or audio used by the sketch.

## How To Run

These projects do not need a build step or package install. They are plain HTML/CSS/JS sketches.

### Recommended: run with a local static server

From the repo root:

```bash
python3 -m http.server 8000
```

Then open one of these URLs in your browser:

- `http://localhost:8000/Project_A/`
- `http://localhost:8000/Project_B/`
- `http://localhost:8000/Confetti/`

Using a local server is the safest option for sketches that load assets like images or sound files.

### Alternative

You can also use VS Code Live Server or any other static file server and open the folder you want to preview.

## Suggested Starting Points

If you are new to the repo, start here:

- `Project_A/` for a polished interactive creature project.
- `Project_B/` for the most complex multi-section narrative piece.
- `Confetti/` or `web_template/` for a very small p5.js example.

## Notes

- Each folder is mostly independent; there is no shared app-wide config.
- p5.js is vendored inside the project folders instead of being installed through npm.
- Most folders are clearly exercises or prototypes rather than final polished pieces, which is normal for a course workspace like this. I just hope you can at least find them interesting!
