---
title: Jellyfin
description: Instructions on how to integrate the Jellyfin integration into Home Assistant.
ha_category:
  - Media player
  - Media source
  - Remote
  - Sensor
ha_release: '2021.12'
ha_iot_class: Local Polling
ha_codeowners:
  - '@RunC0deRun'
  - '@ctalkington'
ha_config_flow: true
ha_domain: jellyfin
ha_platforms:
  - diagnostics
  - media_player
  - remote
  - sensor
ha_integration_type: service
---

The **Jellyfin** {% term integration %} exposes a [Jellyfin](https://jellyfin.org/) server as a media source in Home Assistant. This integration has been tested with Jellyfin server version 10.6.4 and later.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: The URL of the Jellyfin server. Please supply the full URL including the protocol and optional webroot. For example `https://media.example.com`, `http://10.1.1.100:8096` or `http://home.example.com/jellyfin`.
Username:
  description: The Jellyfin user whose libraries you want to retrieve.
Password:
  description: The password of the supplied user.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Audio Codec:
  description: Sets the audio encoding codec to a Jellyfin API supported codec (aac, mp3, vorbis, wma)
{% endconfiguration_basic %}

## Entities

### Media player entities

This integration sets up every media session connected to the Jellyfin server as a [media player](/integrations/media_player/) in Home Assistant. These entities display media information, playback progress, and playback controls.

To browse, search, or play Jellyfin media from an automation or a script, use the shared [media player actions](/integrations/media_player/#list-of-actions) with your Jellyfin media player entity.

Jellyfin supports the `next` and `add` enqueue options for the `media_player.play_media` action. The `play` and `replace` options replace the current play queue, as if `enqueue` was not set. The selection of `media_content_type` is generally inconsequential to Jellyfin, and any string can be supplied here to pass validation.

The following examples show how to play Jellyfin media from a script. Replace the `media_content_id` values with IDs from your own Jellyfin library. You can find these IDs by browsing or searching your Jellyfin library with the `media_player.browse_media` and `media_player.search_media` actions.

Play a movie on a Jellyfin client that supports playback:

{% example %}
automation: |
  alias: "Play Jellyfin movie"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room
      data:
        media_content_id: a982a31451450daeda02c89952e6d7cf
        media_content_type: movie
{% endexample %}

Add a TV episode to play next on a Jellyfin client:

{% example %}
automation: |
  alias: "Queue Jellyfin episode"
  sequence:
    - action: media_player.play_media
      target:
        entity_id: media_player.living_room
      data:
        media_content_id: 5ae55567cae75c26671a0a6b027bdd5b
        media_content_type: episode
        enqueue: next
{% endexample %}

### Remote entities

This integration also creates a `remote` {% term entity %} for sending [Jellyfin remote commands](https://github.com/jellyfin/jellyfin/blob/master/MediaBrowser.Model/Session/GeneralCommandType.cs) to each client, if supported. For example, the following script can be used to tell the client to navigate right twice, down once, and select the focused item:

{% example %}
script: |
  alias: "Jellyfin Remote Script"
  sequence:
    - action: remote.send_command
      target:
        entity_id: remote.jellyfin_client
      data:
        delay_secs: 1.5
        command:
          - MoveRight
          - MoveRight
          - MoveDown
          - Select
{% endexample %}

{% include integrations/actions.md %}

## Known limitations

- Support is currently limited to music, movie, and TV show libraries only. Other libraries do not appear in the media browser.
