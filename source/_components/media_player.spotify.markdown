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

The `spotify` media player platform allows you to control [Spotify](https://www.spotify.com/) playback from Home Assistant.

## {% linkable_title Prerequisites %}

- Spotify account.
- Spotify Application, properly configured

<p class='note'>
Controlling the Spotify component (pause, play, next, etc) requires a Premium account. If you do not have a Premium account, the component in the frontend will not show the controls.
</p>

To create the required Spotify Application:

- Login to [Spotify Developer](https://developer.spotify.com)
- Visit the [My Applications](https://developer.spotify.com/my-applications/#!/applications) page
- Select **Create An App**. Enter any name and description. Once your application is created, view it and copy your **Client ID** and **Client Secret**, which are used in the Home Assistant configuration file. 
- Add a **Redirect URI** in the following forms:

 No SSL: `http://<your_home_assistant_url_or_local_ip>:<port>/api/spotify`

 If using SSL: `https://<your_home_assistant_url_or_local_ip>:<port>/api/spotify`

The URL is whatever you use to access Home Assistant from outside your network (including port if applicable).

- Click **Save** after adding the URI. You may also need to set the `base_url` attribute of the [HTTP Component](https://home-assistant.io/components/http/).


## {% linkable_title Configuration %}

To add Spotify to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: spotify
    client_id: <your client id>
    client_secret: <your client secret>
    aliases:
        abc123def456: 'Living Room'
        9183abas000: 'Bed Room'
```

Configuration variables:

- **client_id** (*Required*): Client ID from your Spotify Application.
- **client_secret** (*Required*): Client Secret from your Spotify Application.
- **cache_path** (*Optional*): Path to cache authentication token (defaults to configuration directory).
- **aliases** (*Optional*): Dictionary of device ids to be aliased, handy for devices that Spotify cannot properly determine the device name of. New devices will be logged to the `info` channel for ease of aliasing.

## {% linkable_title Setup %}

After the prerequisites and configuration are complete, restart Home Assistant. A **Spotify** configurator element will be available. Follow the instructions to authorize Home Assistant to access your Spotify account. A Spotify media player will then appear. If Spotify prompts you to download a file after completing authorization, discard the download. It is not needed.

## {% linkable_title Sources %}
The sources are based on if you have streamed to these devices before in Spotify. If you don't have any sources, then simply stream from your phone to another device in your house, bluetooth, echo, etc. Once you do the sources will show up in the developer console as a device to cast/stream to. Also know that the devices won't show up in the dev-console as sources unless they are powered on as well.

## {% linkable_title URI Links For Playlists/Etc %}
You can send playlists to spotify via the "media_content_type": "playlist" and "media_content_id": "spotify:user:spotify:playlist:37i9dQZF1DWSkkUxEhrBdF" which are a part of the media_player.play_media service, you can test this from the services control panel in the Home Assistant frontend.

Usually, the naming convention is: https://open.spotify.com/user/_USERNAME_/playlist/_PLAYLIST-UID_ - In the given example you will find the playlist with the URL: https://open.spotify.com/user/spotify/playlist/37i9dQZF1DWSkkUxEhrBdF

Automation example:
```yaml
# Play a foreign playlist you don't own or follow by username and playlist uid
script:
  script_play_music_foreign_playlist:
    sequence:
      - service: media_player.select_source
        data_template:
          source: "{{ source }}"
      - service: media_player.play_media
        data:
          media_content_type: playlist
          media_content_id: 'spotify:user:spotify:playlist:37i9dQZF1DWSkkUxEhrBdF'
          entity_id: media_player.spotify
```

## {% linkable_title Owned/Starred Playlists %}
As you own or follow some playlists in Spotify they will expose on the media_player attribute "media_available_playlists". You can call them by their name on automations or on the media_player state card in the Home Assistant frontend.

Automation example:
```yaml
# Play a owned/starred playlist by the name
script:
  script_play_music_starred_playlist:
    sequence:
      - service: media_player.select_source
        data_template:
          source: "{{ source }}"
      - service: media_player.play_media
        data:
          media_content_type: playlist
          media_content_id: 'Top 50 Charts'
          entity_id: media_player.spotify
```
