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

- Spotify Premium account.
- Spotify Application, properly configured.

To create the required Spotify Application, login to [Spotify Developer](https://developer.spotify.com), visit the [My Applications](https://developer.spotify.com/my-applications/#!/applications) page, and select **Create An App**. Enter any name and description. Once your application is created, you can view it and discover your **Client ID** and **Client Secret**, which are placed in the Home Assistant configuration file. Finally, add a **Redirect URI** in the following form:

`http://<your_home_assistant_url_or_local_ip>/api/spotify`

Remember to select **Save** after adding the URI.


## {% linkable_title Configuration %}

To add Spotify to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: spotify
    client_id: <your client id>
    client_secret: <your client secret>
```

Configuration variables:

- **client_id** (*Required*): Client ID from your Spotify Application.
- **client_secret** (*Required*): Client Secret from your Spotify Application.
- **cache_path** (*Optional*): Path to cache authentication token (defaults to configuration directory).

## {% linkable_title Setup %}

After the prerequisites and configuration are complete, restart Home Assistant. A **Spotify** configurator element will be available. Follow the instructions to authorize Home Assistant to access your Spotify account. A Spotify media player will then appear.

## {% linkable_title Sources %}

The sources are based on if you have streamed to these devices before in Spotify.  If you don't have any sources, then simply stream from your phone to another device in your house, bluetooth, echo, etc.  Once you do the sources will show up in the developer console as a device to cast/stream to.
