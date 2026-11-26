# Spotify

Playback, playlists and library on Spotify.

Maintained independently from [Switchboard](https://github.com/tader/switchboard).

## Installation

Open **Plugins → Community** in Switchboard and install **Spotify**. Alternatively use **Install from GitHub** with repository `tader/switchboard-plugin-spotify` and path `plugins/spotify`. Review the dependency preview and apply it.

Dependencies: `oauth2` (^1.0.0). Missing external dependencies are resolved through the live community catalog; OAuth and API Keys are built into Switchboard.

## Existing installations

Install this repository before upgrading a Switchboard instance that bundles `spotify`. The plugin ID, service IDs, authentication methods, settings and persistent data paths are preserved. Installed plugins replace the built-in copy. Existing connections and saved calls continue to work; keep the instance data directory and encryption key.

## Development

Use Node.js 24 or newer. Run `npm ci` and `npm run check`. The plugin folder includes local type declarations, so development does not require a Switchboard checkout. Type imports are erased at runtime; shared helpers are provided by `ctx.require()` and the manifest declares compatible versions.

Keep `plugin.json` and `package.json` versions in sync. Commit version changes before tagging a release; `gh release create` does not bump versions. Switchboard follows the branch, tag or commit selected during installation.

## Releases

Release-please opens version and changelog pull requests from Conventional Commits. Merge the release PR to publish its tag and GitHub release. Plugin manifests are updated with their package versions. Family repositories maintain an independent version for each plugin.

## Activity output preview

With a compatible Switchboard installation and output storage enabled, audited local user-OAuth `GET https://api.spotify.com/v1/me` data calls can show a redacted Activity preview containing only `account_id`. [Spotify documents this field as its stable account identifier](https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile). The separate `id`, email, images, display name, subscription and all other fields are omitted.

Only HTTP 200 JSON objects qualify, with an account ID of 1–128 UTF-8 bytes containing no whitespace or control characters. Missing or invalid account IDs, credential echoes, responses over 16 KiB, upstream errors and redirects are omitted. Sign-in identification, token exchanges, app-only connections and peer requests are excluded. Original response delivery is unchanged. Existing core versions ignore this optional declaration.

Previews default to four hours, independently of request retention. Administrators can change or disable storage in Activity retention. The viewer fetches on demand and renews a maximum 15-second display grant while visible. Managed restores discard live previews. Installations lacking isolated storage or compatible restore invalidation omit capture.

Synthetic verification: `npm run check && npm test` checks the exact rule and excluded app authentication. Core's generic integration suite covers authorization, projection, credential echoes, decoded-input limits, interrupted streams, error statuses, retries and restore fencing; no live Spotify account is required.
