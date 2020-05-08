---
title: Mediaroom
description: Instructions on how to integrate Mediaroom Set-Top Boxes into Home Assistant.
ha_category:
  - Media Player
ha_iot_class: Local Polling
ha_release: 0.63
ha_codeowners:
  - '@dgomes'
ha_domain: mediaroom
---

The `mediaroom` integration allows you to control a [Mediaroom](https://en.wikipedia.org/wiki/Ericsson_Mediaroom) Set-Top Box (STB) from Home Assistant.

To add a Mediaroom STB to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: mediaroom
```

{% configuration %}
  host:
    description: The hostname or IP address of the device.
    required: false
    type: string
    default: Tries to discovery your device.
  name:
    description: The name of the device used in the frontend.
    required: false
    type: string
    default: Mediaroom STB
  optimistic:
    description: In case the integration cannot determine the status of the box, consider the box always ON.
    required: false
    type: boolean
    default: false
{% endconfiguration %}

Notice that all parameters are optional, and discovery should configure everything for you.

#### Using the Mediaroom integration

The integration has been developed for Portuguese TV operators currently using the Mediaroom platform, but should also work in other deployments in which the STB can be controlled remotely through a socket on port 8082.

In most cases (single STB) you just need to setup the *platform* and discovery will do the rest.

If the STB is on the same network segment as Home Assistant, it can determine whether the device is turned on or off. Without this, the integration will fail to determine the Set-top box status, and you are required to add the *optimistic* configuration variable.

## Examples

### Example `press_button` script

The `play_media` function can be used in scripts to change channels and emulate button pressing from a remote control.

{% raw %}
```yaml
# Example play_media script
#
press_button:
  sequence:
    service: media_player.play_media
    data_template:
      entity_id: media_player.mediaroom_stb
      media_content_id: "{{ value }}"
      media_content_type: "channel"
```
{% endraw %}

### Example configuration with 2 STB

```yaml
# Example configuration.yaml entry for 2 STB
media_player:
  - platform: mediaroom
    host: 192.168.1.64
    name: Living Room STB
  - platform: mediaroom
    host: 192.168.1.65
    name: Bedroom STB
```
