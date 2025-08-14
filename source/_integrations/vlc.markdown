---
title: VLC media player
description: Instructions on how to integrate VLC media player into Home Assistant.
ha_category:
  - Media player
ha_release: 0.35
ha_iot_class: Local Polling
ha_domain: vlc
ha_platforms:
  - media_player
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `vlc` platform allows you to control [VLC media player](https://www.videolan.org/vlc/index.html).

{% important %}
The **VLC media player** {% term integration %}, is currently only available for installations that are based on the Home Assistant Core in a Python virtual environment.
{% endimportant %}

## Configuration

To add a VLC media player to your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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

This action will control a background VLC instance, therefore you cannot use this to control a VLC instance launched on your desktop, unlike the Kodi media player for example.

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
