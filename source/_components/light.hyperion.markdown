---
layout: page
title: "Hyperion"
description: "Instructions how to integrate Hyperion into Home Assistant."
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

To use your Hyperion light in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: hyperion
    host: IP_ADDRESS
```

Configuration variables:

- **host** (*Required*): The IP address of the device the Hyperion service is running on.
- **port** (*Optional*): The port used to communicate with the Hyperion service. Defaults to `19444`.
- **name** (*Optional*): The name of the device used in the frontend.
- **priority** (*Optional*): The priority of the Hyperion instance. Defaults to `128`.
- **hdmi_priority** (*Optional*): The priority of the HDMI grabber of this Hyperion instance, note that this priority must be higher than all other priorities used for correct behavior. Defaults to `880`.
- **default_color** (*Optional*): The color of the light. Defaults to `[255, 255, 255]`.
- **effect_list** (*Optional*): The list of effects that can be used. Defaults to `['HDMI', 'Cinema brighten lights', 'Cinema dim lights', 'Knight rider', 'Blue mood blobs', 'Cold mood blobs', 'Full color mood blobs', 'Green mood blobs', 'Red mood blobs', 'Warm mood blobs', 'Police Lights Single', 'Police Lights Solid', 'Rainbow mood', 'Rainbow swirl fast', 'Rainbow swirl', 'Random', 'Running dots', 'System Shutdown', 'Snake', 'Sparks Color', 'Sparks', 'Strobe blue', 'Strobe Raspbmc', 'Strobe white', 'Color traces', 'UDP multicast listener', 'UDP listener', 'X-Mas']`.
