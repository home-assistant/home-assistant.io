---
title: Volumio
description: How to set up the Volumio media player platform
ha_category:
  - Media Player
ha_release: 0.41
ha_domain: volumio
---

The `Volumio` platform allows you to control a [Volumio](https://volumio.org/) media player from Home Assistant.

The preferred way to set up the Volumio platform is by enabling the [discovery component](/integrations/discovery/).

In case the discovery does not work, or you need specific configuration variables, you can add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: volumio
    host: homeaudio.local
    port: 3000
```

{% configuration %}
name:
  description: The name of the device.
  required: false
  default: Volumio
  type: string
host:
  description: The IP address or hostname of the device.
  required: true
  default: localhost
  type: string
port:
  description: The Port number of Volumio service.
  required: true
  default: 3000
  type: integer
  
media_content_type: 
  description: Content type of current playing media
  required: false 
  type: string
state:
  Return the state of the device
  required: false 
  type: string
media_title:
  Title of current playing media
  required: false 
  type: string
media_artist:
  Artist of current playing media (Music track only).
  required: false 
  type: string
media_album_name:
  Artist of current playing media (Music track only).
  required: false 
  type: string
media_image_url:
  Image url of current playing media.
  required: false 
  type: string
media_seek_position:
  Time in seconds of current seek position.
  required: false 
  type: integer
media_duration:
  Time in seconds of current song duration.
  required: false 
  type: integer
volume_level:
  Volume level of the media player (0..1).
  required: false 
  type: integer
is_volume_muted:
  Boolean if volume is currently muted.
  required: false 
  type: boolean
shuffle:
  Boolean if shuffle is enabled.
  required: false 
  type: boolean
source_list:
  Return the list of available input sources.
  required: false 
  type: string
source:
  Name of the current input source.
  required: false 
  type: string
supported_features:
  Flag of media commands that are supported.
  required: false 
  type: string
async_media_next_track:
  Send media_next command to media player.
  required: false 
  type: string
async_media_previous_track:
  Send media_previous command to media player.
  required: false 
  type: string
async_media_play:
  Send media_play command to media player.
  required: false 
  type: string
async_media_play:
  Send media_play command to media player.
  required: false 
  type: string
async_set_volume_level:
  Send volume_up command to media player.
  required: false 
  type: integer
async_volume_up:
  Service to send the Volumio the command for volume up."
  required: false 
  type: integer
async_volume_down:
  Service to send the Volumio the command for volume down.
  required: false 
  type: integer
async_mute_volume:
  Send mute command to media player.
  required: false 
  type: integer
async_set_shuffle:
  Enable/disable shuffle mode.
  required: false 
  type: boolean
async_select_source:
  Choose a different available playlist and play it.
  required: false 
  type: string
async_clear_playlist:
  Clear players playlist.
  required: false 
  type: string
async_update_playlists:
  Update available Volumio playlists.
  required: false 
  type: string
{% endconfiguration %}
