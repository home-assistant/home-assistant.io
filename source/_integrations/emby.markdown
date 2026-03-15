---
title: Emby
description: Instructions on how to integrate Emby into Home Assistant.
ha_category:
  - Media player
ha_release: 0.32
ha_iot_class: Local Push
ha_codeowners:
  - '@mezz64'
  - '@jbergler'
ha_domain: emby
ha_platforms:
  - media_player
ha_integration_type: integration
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: bronze
---

The **Emby** {% term integration %} allows you to control a [Emby](https://emby.media/) multimedia system from Home Assistant.

# Prerequisites

You need to create an API key in your Emby instance in order to configure this integration:

1. Navigate to your Emby admin interface.
2. Select *API Keys* from *Advanced* in the menu.
3. Create and API key and copy the value.

{% include integrations/config_flow.md %}

{% configuration %}
host:
  description: The host name or IP address of the device that is running Emby.
  required: false
  default: localhost
  type: string
api_key:
  description: The API key to use to authenticate.
  required: true
  type: string
ssl:
  description: Connect with HTTPS/WSS. Your SSL certificate must be valid.
  required: false
  default: false
  type: boolean
port:
  description: The port number of the device that is running Emby.
  required: false
  default: 8096 (No SSL),  8920 (SSL)
  type: integer
{% endconfiguration %}

## Supported functionality

### Entities

The **Emby** integration creates a `media_player` entity for each active session connected to your Emby server. A session represents a client device — such as a phone, TV, or browser — that is currently connected to Emby.

#### Media player

Each media player entity reflects the current playback state of that client and supports the following:

- **States**: playing, paused, idle, or unavailable (when the client disconnects).
- **Playback controls**: play, pause, stop, and seek to a position in the current item.
- **Volume control**: adjust the volume or mute the client, where supported by the client device.
- **Media information**: the title, media type (movie, TV episode, or music track), and thumbnail artwork of the currently playing item.
- **Rich metadata**: for TV episodes, the show name, season number, and episode number are available. For music, the artist name and album title are exposed.

{% note %}
Entities are created dynamically as clients connect to Emby and are removed when they disconnect. If you want to use a media player entity in an automation, make sure the client is connected and has an active session.
{% endnote %}

