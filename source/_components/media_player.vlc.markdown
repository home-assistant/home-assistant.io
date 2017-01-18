---
layout: page
title: "VLC"
description: "Instructions on how to integrate VLC media player into Home Assistant."
date: 2016-11-02 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: videolan.png
ha_category: Media Player
featured: false
ha_release: 0.35
ha_iot_class: "Local Polling"
---

The `vlc` platform allows you to control [VLC media player](http://www.videolan.org/vlc/index.html).

To add a VLC media player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vlc
```

Configuration variables:

- **name** (*Optional*): The name to use in the frontend.
- **arguments** (*Optional*): Additional arguments to be passed to VLC.

Only "music" media type is supported for now.

This service will control a background VLC instance, therefore you cannot use this to control a VLC instance launched on your desktop, unlike the Kodi media player for example.

## {% linkable_title Full configuration %}

A full configuration for VLC could llok like the one below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vlc
    name: speaker_1
    arguments: '--alsa-audio-device=hw:1,0'
```

##### {% linkable_title Additional configuration on macOS %}

On macOS phython-vlc won’t find the VLC plugin directory unless you add this to the user’s `.bash_profile` that is running Home Assistant:

```bash
export VLC_PLUGIN_PATH=$VLC_PLUGIN_PATH:/Applications/VLC.app/Contents/MacOS/plugins
```
