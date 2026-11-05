# FormFlow

A responsive, schema-driven form demonstration using HTML, CSS and vanilla JavaScript. Define fields in `form.json` and the UI renders inputs, select menus and text areas automatically. Validation includes required fields, email, numeric input, allowed options and character limits.

## Run

Start `python -m http.server 8000` and open http://localhost:8000. The app fetches the JSON schema locally and must be served over HTTP.

## Tests

Requires Node.js 18+. Run `npm test` to execute seven validation tests; GitHub Actions runs them on pull requests.

## Privacy

Submissions are only displayed as a local JSON preview. They are not sent to any server or saved. This prototype has no backend, access control, anti-spam controls, or server-side validation and is not a production form service.
