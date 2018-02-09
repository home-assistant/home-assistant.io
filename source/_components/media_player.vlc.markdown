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

Only the "music" media type is supported for now.

This service will control a background VLC instance, therefore you cannot use this to control a VLC instance launched on your desktop, unlike the Kodi media player for example.

## {% linkable_title Full configuration %}

A full configuration for VLC could look like the one below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vlc
    name: speaker_1
    arguments: '--alsa-audio-device=hw:1,0'
```

##### {% linkable_title Additional configuration on macOS %}

On macOS `python-vlc` won’t find the VLC plugin directory unless you add this to the user’s `.bash_profile` that is running Home Assistant:

```bash
export VLC_PLUGIN_PATH=$VLC_PLUGIN_PATH:/Applications/VLC.app/Contents/MacOS/plugins
```

##### {% linkable_title Additional configuration for Rasperry Pi %}

You need to add the `homeassistant` user to the `audio` group:

```bash
sudo usermod -a -G audio homeassistant
```

##### {% linkable_title VLC currently not supported with Hassio %}

According to the forum topic "How to add VLC into my Hassio", it is not possible to install packages like VLC on Hass.io. (For this to work an add-on needs to be created that can run VLC)  

[Source](http://community.home-assistant.io/t/how-to-add-vlc-into-my-hassio/23000/5?u=partybug)
