---
layout: page
title: "MediaRoom"
description: "Instructions how to integrate Mediaroom Set-Top Boxes into Home Assistant."
date: 2018-01-22 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mediaroom.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: "0.62"
---

The `mediaroom` component allows you to control a [Mediaroom](https://en.wikipedia.org/wiki/Ericsson_Mediaroom) Set-Top Box from Home Assistant.

To add a Mediaroom to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: mediaroom
    host: 192.168.1.64
    name: TV Operator Box
```

{% configuration %}
  host:
    description: The hostname or address of the device.
    required: false
    type: string
  name:
    description: The name of the device used in the frontend.
    required: false
    type: string
  optimistic:
    description: In case the component can't determine the status of the box, consider the box always ON.
    required: false
    type: boolean
{% endconfiguration %}

Notice that all parameters are optional, and discovery shoud configure everything for you.

#### {% linkable_title Using the Mediaroom component %}

The component has been developed for Portuguese TV operators using the Mediaroom platform but should also work in other deployments in which the Set-top box can be controlled remotely through a socket on port 8082.

In most cases (1 Set-Top box) you just need to setup the *name* and discovery will do the rest. In case you have more than 1 Set-Top box you are required to set the *host* in each one of the entries. 

If the set-top box is in the same network segment as Home Assistant we can determine whether the device is turned on or off. Without this, the component will fail to determine the Set-top box status and you are required to add the *optimistic* configuration variable.
