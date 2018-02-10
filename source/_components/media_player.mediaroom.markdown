---
layout: page
title: "Mediaroom"
description: "Instructions how to integrate Mediaroom Set-Top Boxes into Home Assistant."
date: 2018-01-22 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mediaroom.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: "0.63"
---

The `mediaroom` component allows you to control a [Mediaroom](https://en.wikipedia.org/wiki/Ericsson_Mediaroom) Set-Top Box (STB) from Home Assistant.

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
    description: In case the component cannot determine the status of the box, consider the box always ON.
    required: false
    type: boolean
    default: false
{% endconfiguration %}

Notice that all parameters are optional, and discovery should configure everything for you.

#### {% linkable_title Using the Mediaroom component %}

The component has been developed for Portuguese TV operators currently using the Mediaroom platform, but should also work in other deployments in which the STB can be controlled remotely through a socket on port 8082.

In most cases (single STB) you just need to setup the *name* and discovery will do the rest. In case you have more than one STB you are required to set the *host* in each one of the entries. 

If the STB is on the same network segment as Home Assistant, it can determine whether the device is turned on or off. Without this, the component will fail to determine the Set-top box status, and you are required to add the *optimistic* configuration variable.

### {% linkable_title Example `press_button` script %}

The `play_media` function can be used in scripts to change channels. 

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
