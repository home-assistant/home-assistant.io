---
title: VLC media player
description: Instructions on how to integrate VLC media player into Home Assistant.
logo: videolan.png
ha_category:
  - Media Player
ha_release: 0.35
ha_iot_class: Local Polling
---

The `vlc` platform allows you to control [VLC media player](https://www.videolan.org/vlc/index.html).

To add a VLC media player to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vlc
```

{% configuration %}
name:
  description: The name to use in the frontend.
  required: false
  type: string
arguments:
  description: Additional arguments to be passed to VLC.
  required: false
  type: string
{% endconfiguration %}

Only the "music" media type is supported for now.

This service will control a background VLC instance, therefore you cannot use this to control a VLC instance launched on your desktop, unlike the Kodi media player for example.

## Full configuration

A full configuration for VLC could look like the one below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: vlc
    name: speaker_1
    arguments: '--alsa-audio-device=hw:1,0'
```

##### Additional configuration on macOS

On macOS `python-vlc` won’t find the VLC plugin directory unless you add this to the user’s `.bash_profile` that is running Home Assistant:

```bash
export VLC_PLUGIN_PATH=$VLC_PLUGIN_PATH:/Applications/VLC.app/Contents/MacOS/plugins
```

##### Additional configuration for Rasperry Pi

You need to add the `homeassistant` user to the `audio` group:

```bash
sudo usermod -a -G audio homeassistant
```

##### VLC currently not supported with Hass.io

According to the forum topic ["How to add VLC into my Hassio"](https://community.home-assistant.io/t/how-to-add-vlc-into-my-hassio/23000/5), it is not possible to install packages like VLC on Hass.io.
