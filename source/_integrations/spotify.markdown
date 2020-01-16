---
title: Spotify
description: Instructions on how to integrate Spotify into Home Assistant.
logo: spotify.png
ha_category:
  - Media Player
ha_release: 0.43
ha_iot_class: Cloud Polling
---

The `spotify` media player platform allows you to control
[Spotify](https://www.spotify.com/) playback from Home Assistant.

## Prerequisites

- Spotify account
- Spotify application, properly configured (see below)

<div class='note'>
Controlling the Spotify integration (pause, play, next, etc.) requires a Premium account. If you do not have a Premium account, the integration in the frontend will not show the controls.
</div>

To create the required Spotify application:

- Login to [Spotify Developer](https://developer.spotify.com)
- Visit the [My Applications](https://developer.spotify.com/my-applications/#!/applications) page
- Select **Create An App**. Enter any name and description. Once your application is created, view it and copy your **Client ID** and **Client Secret**, which are used in the Home Assistant configuration file.
- Add a **Redirect URI** in one of the following forms:

 If you are not using SSL:
  `http://<your_home_assistant_url_or_local_ip>/api/spotify`

 If you are using SSL:
  `https://<your_home_assistant_url_or_local_ip>/api/spotify`

- Click **Save** after adding the URI.

If you are using an externally accessible address you will likely also need to set the `base_url` attribute of the [HTTP Component](/integrations/http/). This should be set using the same base URL as the redirect URI, e.g., if you used a domain name (not local IP) in the redirect, then use the same domain name in your `base_url`.

## Configuration

To add Spotify to your installation,
add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: spotify
    client_id: YOUR_CLIENT_ID
    client_secret: YOUR_CLIENT_SECRET
    aliases:
        abc123def456: 'Living Room'
        9183abas000: 'Bed Room'
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
cache_path:
  description: Path to cache authentication token.
  required: false
  type: string
  default: .spotify-token-cache
aliases:
  description: "Dictionary of device ids to be aliased, handy for devices that Spotify cannot properly determine the device name of. New devices will be logged to the `info` channel for ease of aliasing."
  required: false
  type: map
name:
  description: The name of the device used in the frontend.
  required: false
  type: string
  default: Spotify
{% endconfiguration %}

## Setup

After the prerequisites and configuration are complete, restart Home Assistant.
Under notifications a **Spotify** configurator element will be available. Click on "Link Spotify account" and follow the instructions to
authorize Home Assistant to access your Spotify account. A Spotify media player
will then appear. If you are prompted to download a file after completing
authorization, discard the download. It is not needed.

## Sources
The sources are based on if you have streamed to these devices before in
Spotify. If you don't have any sources, then simply stream from your phone to
another device in your house: Bluetooth, echo, etc. Once you do, the sources will
show up in the Spotify developer console as a device to cast/stream to. 
Go to https://developer.spotify.com and login. Click on "Console" in top menu and then "Player" in the left menu. Select 	"/v1/me/player/devices" in the list. Then click "Get token", accept the terms and click "Try it". Your active Spotify devices will then be listed in the right panel, beneath the curl-line (for example, "name": "Web Player (Chrome)").  
These names can then be used in for example an input selector:

```yaml
  spotify_source:
    name: 'Source:'
    options:
      - Spotifyd@rock64
      - Web Player (Chrome)
```

The devices won't show up in the dev-console as sources unless they are powered on as well.

## URI Links For Playlists/Etc.
You can send playlists to spotify via the `"media_content_type": "playlist"` and something like (depending on your content ID)
`"media_content_id": "spotify:user:spotify:playlist:37i9dQZF1DWSkkUxEhrBdF"`
which are part of the
[media_player.play_media](/integrations/media_player/#service-media_playerplay_media)
service. You can test this from the services
control panel in the Home Assistant frontend.

## Services
Extra services besides the default ones in component [Media Player component](/integrations/media_player/).

### Service `play_playlist`

Play a Spotify playlist with an option to start on a random position of the playlist.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `media_content_id`     | no       | Spotify URI of playlist. Must be playlist kind of URI.
| `random_song`          | yes      | True to select random song at start, False to start from beginning.


The above playlist example is a URI link to the "Reggae Infusions" playlist.
[This support document from Spotify](https://support.spotify.com/us/article/sharing-music/)
explains how to get this URI value to use for playlists in the Spotify component.

## Unsupported Devices

- **Sonos**: Although Sonos is a Spotify Connect device, it is not supported by the official Spotify API.
