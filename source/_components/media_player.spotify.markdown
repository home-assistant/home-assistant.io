---
layout: page
title: "Spotify"
description: "Instructions on how to integrate Spotify into Home Assistant."
date: 2017-04-10 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: spotify.png
ha_category: Media Player
featured: false
ha_release: 0.43
ha_iot_class: "Cloud Polling"
---

The `spotify` media player platform allows you to control
[Spotify](https://www.spotify.com/) playback from Home Assistant.

## {% linkable_title Prerequisites %}

- Spotify account.
- Spotify Application, properly configured

<p class='note'>
Controlling the Spotify component (pause, play, next, etc) requires a Premium account.
If you do not have a Premium account, the component in the frontend will not show the controls.
</p>

To create the required Spotify Application:

- Login to [Spotify Developer](https://developer.spotify.com)
- Visit the [My Applications](https://developer.spotify.com/my-applications/#!/applications) page
- Select **Create An App**. Enter any name and description. Once your application is created, view it and copy your **Client ID** and **Client Secret**, which are used in the Home Assistant configuration file.
- Add a **Redirect URI** in the following forms:

 No SSL:
  `http://<your_home_assistant_url_or_local_ip>:<port>/api/spotify`

 If using SSL:
  `https://<your_home_assistant_url_or_local_ip>:<port>/api/spotify`

 The URL is whatever you use to access Home Assistant from outside your network
 (including port if applicable).

- Click **Save** after adding the URI. You may also need to set the `base_url` attribute of the [HTTP Component](/components/http/).

## {% linkable_title Configuration %}

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
  description: Client ID from your Spotify Application.
  required: true
  type: string
client_secret:
  description: Client Secret from your Spotify Application.
  required: true
  type: string
cache_path:
  description: Path to cache authentication token (defaults to configuration directory).
  required: false
  type: string
aliases:
  description: >
    "Dictionary of device ids to be aliased, handy for devices that Spotify
    cannot properly determine the device name of.
    New devices will be logged to the `info` channel for ease of aliasing."
  required: false
  type: map
{% endconfiguration %}

## {% linkable_title Setup %}

After the prerequisites and configuration are complete, restart Home Assistant.
A **Spotify** configurator element will be available. Follow the instructions to
authorize Home Assistant to access your Spotify account. A Spotify media player
will then appear. If Spotify prompts you to download a file after completing
authorization, discard the download. It is not needed.

## {% linkable_title Sources %}
The sources are based on if you have streamed to these devices before in
Spotify. If you don't have any sources, then simply stream from your phone to
another device in your house, Bluetooth, echo, etc. Once you do the sources will
show up in the developer console as a device to cast/stream to. Also know that
the devices won't show up in the dev-console as sources unless they are powered
on as well.

## {% linkable_title URI Links For Playlists/Etc %}
You can send playlists to spotify via the "media_content_type": "playlist" and
"media_content_id": "spotify:user:spotify:playlist:37i9dQZF1DWSkkUxEhrBdF" which
are a part of the media_player.play_media service, you can test this from the
services control panel in the Home Assistant frontend.

In this example this is a URI link to the Reggae Infusions playlist,
[this support document from Spotify](https://support.spotify.com/us/article/sharing-music/)
explains how to get this URI value to use for playlists in the Spotify component.
