---
layout: page
title: "Horizon HD Recorder"
description: "Instructions how to integrate the Unitymedia Horizon HD Recorder into Home Assistant."
date: 2018-05-02 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: unitymedia.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.72
---

The `horizon` component allows you to control a [Unitymedia](https://www.unitymedia.de) Horizon HD Recorder from Home Assistant.

To add a Horizon HD Recorder to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: horizon
    host: 192.168.0.127
```

{% configuration %}
  host:
    description: The hostname or address of the device.
    required: true
    type: string
  port:
    description: The port of the device to connect to.
    required: false
    type: integer
  name:
    description: The name of the device used in the frontend.
    required: false
    type: string
{% endconfiguration %}


#### {% linkable_title Preparation of the Horizon HD Recorder %}

The Home Networking ("Heimnetzwerk") service needs to be enabled at the settings menu of the Horizon receiver. Once you have set up the Media Library ("Medienbibliothek"), we can determine whether the device is turned on or off. Without this, the component will fail to start.
