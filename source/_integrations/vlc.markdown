---
title: VLC media player
description: Instructions on how to integrate VLC media player into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.35
ha_iot_class: Local Polling
ha_domain: vlc
---

The `vlc` platform allows you to control [VLC media player](https://www.videolan.org/vlc/index.html).

<div class='note'>

The VLC media player integration, is currently only available for installations that are based on the Home Assistant Core in a Python virtual environment.

</div>

## Configuration

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
    arguments: "--alsa-audio-device=hw:1,0"
```

## Additional configuration on macOS

On macOS `python-vlc` won’t find the VLC plugin directory unless you add this to the user’s `.bash_profile` that is running Home Assistant:

```bash
export VLC_PLUGIN_PATH=$VLC_PLUGIN_PATH:/Applications/VLC.app/Contents/MacOS/plugins
```

## Additional configuration on Linux

You need to add the `homeassistant` user to the `audio` group:

```bash
sudo usermod -a -G audio homeassistant
```
