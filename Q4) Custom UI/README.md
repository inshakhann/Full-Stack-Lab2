# Orbit — Custom UI Assignment

A responsive focus dashboard made with plain HTML, CSS, and a small amount of vanilla JavaScript. No frameworks, downloads, API keys, or internet connection are needed to run the submitted files.

## Run your assignment

1. Extract the ZIP file.
2. Open `index.html` in Chrome, Edge, Firefox, or Safari.
3. To edit, open the extracted folder in VS Code. You may optionally use the Live Server extension.

## Files

- `index.html` — semantic page structure and accessible controls.
- `style.css` — all custom design, responsive layout, themes, and animations.
- `script.js` — timer, task checkboxes, adding tasks, and theme switching.
- `README.md` — instructions and a guide for explaining the work.

## CSS concepts demonstrated

| Concept | Where it appears | Purpose |
| --- | --- | --- |
| CSS variables | `:root`, light theme | Reuse colors, shadows, and border radii |
| Box model | Universal `box-sizing`, card padding, margins | Keep dimensions and spacing predictable |
| Flexbox | Header, buttons, task rows, footer | Align items and distribute space |
| CSS Grid | `.workspace-grid` | Create an asymmetric two-column layout |
| Gradients | Background and timer ring | Add atmosphere and display session progress |
| Positioning | Ambient layer, checkbox input, card labels | Place decorative and functional elements |
| Pseudo-elements | `::before`, `::after` | Add timer outlines and checkbox checkmarks |
| Pseudo-classes | `:hover`, `:checked`, `:focus-visible`, `:focus-within` | Provide interaction and keyboard feedback |
| Attribute selectors | `[aria-pressed="true"]`, `[data-theme="light"]` | Style selected timer modes and themes |
| Sibling selectors | `.task input:checked ~ .task-copy` | Update completed task appearance |
| Transforms and transitions | Buttons and reminder card | Create smooth hover feedback |
| Keyframe animation | `@keyframes drift` | Slowly move the ambient background |
| Responsive sizing | `clamp()`, `min()`, aspect-ratio | Fit typography and timer to screen size |
| Media queries | 900px, 680px, 360px | Adapt layout for desktop, tablet, and mobile |
| Reduced motion | `prefers-reduced-motion` | Respect accessibility preferences |
| Typography | Letter spacing, line height, tabular numerals | Establish hierarchy and keep the timer stable |
| Borders and shadows | Cards, pills, buttons | Separate content and create depth |

## How to demonstrate

1. Explain the two-column Grid layout and Flexbox task rows.
2. Hover over the orange button and reminder card.
3. Select a timer mode, start, pause, resume, and reset it.
4. Check an intention: the text and progress indicator update.
5. Add your own intention.
6. Toggle light and dark modes.
7. Resize the browser to show the single-column mobile layout.
8. Use Tab to show visible keyboard focus.

## Short presentation explanation

“I designed Orbit, a personal focus dashboard. CSS Grid creates the main layout, and Flexbox aligns controls and tasks. I used custom properties to manage the dark and light themes. The timer ring uses a conic gradient, while pseudo-elements create the dashed outline and custom checkmarks. Media queries make the design responsive. Transitions and keyframes add movement, with a reduced-motion option for accessibility. JavaScript handles the timer and task interactions; CSS handles the visual design.”

## Notes

- The initial intentions are sample tasks and can be completed or extended.
- Tasks and completed session count reset on page reload; theme preference is saved on this browser where storage is allowed.
- The timer uses a deadline rather than counting interval callbacks, so returning from a background tab updates the time correctly. It does not run after the page closes and does not send notifications.
- No external fonts, images, libraries, or network requests are required.
- CSS sections are numbered and commented to help you explain the code. Review them against the exact concepts covered in your class.
