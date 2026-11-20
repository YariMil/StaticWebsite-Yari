# BasicStaticWebsite
This is static website content for learning HTML and CSS

## Preview and deploy

Run commands from this repository's root (the folder containing `firebase.json`).

Preview the files locally:

```sh
python3 -m http.server 8000 --directory public
```

Open <http://localhost:8000/>. Stop the server with Ctrl+C.

To publish the saved files in `public/` to this project's live Firebase site:

```sh
firebase deploy --only hosting --project static-website-yari
```

Open <https://static-website-yari.web.app/> after deployment finishes. Firebase
uploads the local `public/` files; committing to Git is not required for this
command. Deploying from another checkout can upload an older version.

## If the deployed site looks outdated

Try a hard refresh (Command+Shift+R in Chrome or Firefox on Mac), or open the
site in a private window. Confirm that you are visiting the live URL above.

`firebase.json` sets `Cache-Control: no-cache` for hosted files. This lets browsers
keep copies but requires checking with the server before reusing them, so changes
to HTML, CSS, and JavaScript are picked up on subsequent visits. The setting takes
effect after deployment; an older cached page may still need a hard refresh once.

Counter values and Dark Mode preferences use browser local storage. They are
separate for localhost and the Firebase domain, and private windows have separate
storage too.
