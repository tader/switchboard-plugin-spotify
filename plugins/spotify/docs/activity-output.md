---
title: Spotify Activity output
services: [spotify]
---

For a local **Sign in with Spotify** connection, a successful GET /v1/me request can save an Activity output preview containing only account_id. Email, images, display name, the separate user id and all other fields are omitted.

Open the request in Activity and choose **View output**. The default availability is four hours; an administrator can change it in **Admin → Activity retention**. Expired previews cannot be recovered. Retry only reloads the preview.

App-only connections, peer requests, sign-in, token exchanges, upstream errors and redirects do not save previews. Missing or invalid account IDs and responses larger than 16 KiB are also omitted. Capture requires a compatible Switchboard installation with output storage enabled. Managed restores discard live previews.
