---
title: Spotify
description: Instructions on how to integrate Spotify into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.43
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_quality_scale: silver
ha_codeowners:
  - '@frenck'
ha_domain: spotify
---

The `spotify` media player integration allows you to control [Spotify](https://www.spotify.com/) playback from Home Assistant.

## Prerequisites

- Spotify account
- Spotify application, properly configured (see below).

<div class='note'>
  Controlling the Spotify integration (pause, play, next, etc.) requires a Premium account.
  If you do not have a Premium account, the integration in the frontend will not show the controls.
</div>

To create the required Spotify application:

- Login to [Spotify Developer](https://developer.spotify.com).
- Visit the [My Applications](https://developer.spotify.com/my-applications/#!/applications) page.
- Select **Create An App**. Enter any name and description.
- Once your application is created, view it and copy your **Client ID** and **Client Secret**, which are used in the Home Assistant configuration file.
- Add a **Redirect URI** in one of the following forms:
  - If you are not using SSL: `http://<your_home_assistant_url_or_local_ip>:<port>/auth/external/callback`
  - If you are using SSL: `https://<your_home_assistant_url_or_local_ip>:<port>/auth/external/callback`
- Click **Save** after adding the URI.

If you are using an externally accessible address, you will likely also need to set the `base_url` attribute of the [HTTP Integration](/integrations/http/). This should be set using the same base URL as the redirect URI, e.g., if you used a domain name (not local IP) in the redirect, then use the same domain name in your `base_url`.

## Configuration

To add Spotify to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
spotify:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

{% configuration %}
client_id:
  description: Client ID from your Spotify application.
  required: true
  type: string
client_secret:
  description: Client Secret from your Spotify application.
  required: true
  type: string
{% endconfiguration %}

## Activating the Spotify integration

After you have set up the above:

- Go to the integrations page in the Home Assistant frontend
- Go to **Integrations**
- Add a new **Spotify** integration.
- Follow the steps shown to authenticate Home Assistant with your Spotify account.

<div class='note'>
  
  If you receive an `INVALID_CLIENT: Invalid redirect URI` error while trying to authenticate with your Spotify account, make sure to check the Redirect URI in the address bar after adding the new integration. Compare this value with the Redirect URL defined in the Spotify Developer Portal.

</div>

## URI Links For Playlists

You can send playlists to Spotify using the `"media_content_type": "playlist"`, which are part of the
[media_player.play_media](/integrations/media_player/#service-media_playerplay_media) service.
The `media_content_id` can be obtained from the Spotify desktop-app by clicking on the more options ("...") next to the album art picture, selecting "share" and then "Copy Spotify URI" or "Copy Playlist Link" (also available in the Spotify phone and web app).

## Unsupported Devices

- **Sonos**: Although Sonos is a Spotify Connect device, it is not supported by the official Spotify API.
