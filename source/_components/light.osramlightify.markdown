---
layout: page
title: "Osram Lightify"
description: "Instructions on how to integrate Osram Lightify into Home Assistant."
date: 2016-05-29 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: osramlightify.png
ha_category: Light
ha_release: 0.21
---

The `osramlightify` platform allows you to integrate your [Osram Lightify](https://www.osram.com/cb/lightify/index.jsp) into Home Assistant.

```yaml
# Example configuration.yaml entry
light:
  - platform: osramlightify
    host: 192.168.1.50
```

{% configuration %}
host:
  description: "IP address of the Osram Lightify bridge, e.g., `192.168.1.50`."
  required: true
  type: string
allow_lightify_nodes:
  description: (true/false) Should Home Assistant import individual lights?
  required: false
  default: true
  type: boolean
allow_lightify_sensors:
  description: (true/false) Should Home Assistant import contact and motion sensors?  Takes effect only if `allow_lightify_nodes` is `true`.
  required: false
  default: false
  type: boolean
allow_lightify_switches:
  description: (true/false) Should Home Assistant import switches?  Takes effect only if `allow_lightify_nodes` is `true`.
  required: false
  default: false
  type: boolean
allow_lightify_groups:
  description: (true/false) Should Home Assistant import groups?
  required: false
  default: true
  type: boolean
interval_lightify_status:
  description: Minimum interval in seconds between querying light status (for both individual lights and groups).
  required: false
  default: 5
  type: integer
interval_lightify_conf:
  description: Minimum interval in seconds between querying groups and scenes configuration.
  required: false
  default: 3600
  type: integer
{% endconfiguration %}

At the moment there is not much functionality for Osram Lightify switches and sensors and they are
not imported by default. The only thing that you can do is to track whether they are available or
not.

It is suggested to make [scan_interval](https://www.home-assistant.io/docs/configuration/platform_options/#scan-interval)
(30 seconds by default) less or equal to `interval_lightify_status`, oherwise the latter won't work
as expected. Shorter `scan_interval` may improve synchronization speed between individual lights and
groups. For example, if you turn on a group, all its lights may be updated to `on` immediately,
without querying the bridge.

Please note that to update all light statuses, only one query to the bridge is actually needed.

If a group has associated scenes, they will be imported as light effects and visible in `Effect`
dropdown on UI. You can apply a scene by clicking an item from the dropdown or by calling
`light.turn_on` service:

```yaml
  - service: light.turn_on
    entity_id: light.bed
    data:
      effect: Romance
```
