# Repository Guidelines

## Working With the Student

The repository owner is an Honors Topics student learning to use AI responsibly. Check factual claims and assumptions rather than agreeing automatically; correct mistakes respectfully, explain the reasoning, and acknowledge uncertainty when a claim cannot be verified. Write at a college freshman level, using a teaching-oriented, neutral, slightly friendly tone. Explain relevant concepts and decisions clearly enough to support learning.

When making changes, explain why they work and point the student to the relevant files, code, or behavior to examine.

Do not delete files without the user's permission.

## Local Change Log

At the end of each task that makes changes, append the final change summary to `LOCAL_CHANGES.md` in the repository root. Each entry must have a heading containing the local date, time, timezone, and a one-sentence summary of the work. Include relevant changes, validation results, and limitations. Keep this file outside `public/` and untracked using `.git/info/exclude`; do not stage or commit it.

## Project Structure & Module Organization

This is a static HTML, CSS, and JavaScript site. `public/index.html` is the main page; `public/game.html` hosts the canvas game. Shared page styles live in `public/style.css`, while `public/scripts/main.js` handles the visit counter and `public/scripts/game.js` implements the game. Place new browser assets under `public/` and reference them with relative paths. `firebase.json` configures Firebase Hosting to serve `public/` and rewrite unmatched routes to `index.html`.

## Build, Test, and Development Commands

No package manager, build step, or automated test command is configured. To serve the site locally, run:

```sh
python3 -m http.server 8000 --directory public
```

Open `http://localhost:8000/` for the main page or `http://localhost:8000/game.html` for the game. Stop the server with Ctrl+C. Firebase Hosting configuration can be checked with `firebase emulators:start --only hosting` if the Firebase CLI is installed.

## Coding Style & Naming Conventions

Follow standard conventions for each language and the surrounding file's formatting: JavaScript and CSS generally use four-space indentation, single-quoted JavaScript strings, and camelCase for variables and methods. Use descriptive names and keep browser scripts in `public/scripts/`. Match existing HTML indentation when editing a page. No formatter or linter is configured; keep changes consistent and avoid unrelated reformatting.

## Testing Guidelines

There is no test framework or coverage requirement. Manually exercise affected pages in a browser and check the developer console for errors. For counter changes, reload the main page and verify the count persists in local storage. For game changes, check arrow-key movement, collisions, and any scoring behavior. Include relevant browser and interaction details in the pull request.

## Commit & Pull Request Guidelines

Existing commit subjects are short, descriptive sentences, such as `First deploy`; use a concise subject describing the change. Pull requests should explain the purpose and behavior of the change, list manual checks performed, and link any relevant issue. Include screenshots or a short recording for visible page or game changes.
