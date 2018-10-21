---
layout: page
title: "Somfy MyLink"
description: "Instructions on how to integrate Somfy MyLink devices with Home Assistant."
date: 2018-10-20 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tahoma.png
ha_category: Hub
ha_release: 0.81
ha_iot_class: "Assumed State"
---

The `Somfy MyLink` component platform is used as an interface to a compatible Somfy MyLink hub utilizing the `Synergy` API. It adds covers and scenes from the Somfy MyLink platform.

To use your compatible `Somfy MyLink` devices in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
somfy_mylink:
  host: 10.1.1.100
  password: mylink_id
```

{% configuration %}
host:
  description: The IP address of the Somfy MyLink hub device.
  required: true
  type: string
password:
  description: The `System ID` of the Somfy MyLink hub. This can be found in the `Integration` menu in the mobile app.
  required: true
  type: string
cover_options:
  description: Allows setting specific options on a per-cover basis.
  required: false
  type: list
  keys:
    name:
      description: The name of the device to apply the specified options to. A 'star' symbol (`*`) can be used as a wildcard to apply for all devices.
      required: true
      type: string
    move_time:
      description: The time it takes for the cover to open or close in seconds. This value is used to emulate setting and reading the position of the cover. If this value is omitted the ability to set a specific position will be disabled.
      required: false
      type: float
    reverse:
      description: Reverses the direction of the cover. Possible values are `true` or `false`.
      required: false
      type: boolean
{% endconfiguration %}

```yaml
# Advanced configuration.yaml entry setting specific options on a per-cover basis
somfy_mylink:
  host: 10.1.1.100
  password: mylink_id
  cover_options:
    - name: "*"
      reverse: true
    - name: "Bedroom"
      move_time: 20.5
    - name: "Living Room"
      move_time: 22
```
