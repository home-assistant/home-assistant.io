---
layout: page
title: "Hyperion"
description: "Instructions on how to integrate Hyperion into Home Assistant."
date: 2015-10-25 22:43
sidebar: true
comments: false
sharing: true
footer: true
logo: hyperion.png
ha_category: Light
ha_release: 0.7.6
ha_iot_class: "Local Polling"
---

The `hyperion` platform allows you to integrate your [Hyperion](https://hyperion-project.org/wiki) into Home Assistant. Hyperion is an open source Ambilight implementation which runs on many platforms.

## {% linkable_title Configuration %}

To use your Hyperion light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: hyperion
    host: IP_ADDRESS
```

{% configuration %}
  host:
    description: The IP address of the device the Hyperion service is running on.
    required: true
    type: string
  port:
    description: The port used to communicate with the Hyperion service.
    required: false
    type: int
    default: 19444
  name:
    description: The name of the device used in the frontend.
    required: false
    type: string
  priority:
    description: The priority of the Hyperion instance.
    required: false
    type: int
    default: 128
  hdmi_priority:
    description: The priority of the HDMI grabber of this Hyperion instance, note that this priority must be higher than all other priorities used for correct behavior.
    required: false
    type: int
    default: 880
  default_color:
    description: The color of the light.
    required: false
    type: list
    default: "[255, 255, 255]"
  effect_list:
    description: The list of effects that can be used.
    required: false
    type: list
    default: "['HDMI', 'Cinema brighten lights', 'Cinema dim lights', 'Knight rider', 'Blue mood blobs', 'Cold mood blobs', 'Full color mood blobs', 'Green mood blobs', 'Red mood blobs', 'Warm mood blobs', 'Police Lights Single', 'Police Lights Solid', 'Rainbow mood', 'Rainbow swirl fast', 'Rainbow swirl', 'Random', 'Running dots', 'System Shutdown', 'Snake', 'Sparks Color', 'Sparks', 'Strobe blue', 'Strobe Raspbmc', 'Strobe white', 'Color traces', 'UDP multicast listener', 'UDP listener', 'X-Mas']"
{% endconfiguration %}
