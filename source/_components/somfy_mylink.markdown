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
ha_release: 0.85
ha_iot_class: "Assumed State"
---

The `Somfy MyLink` component platform is used as an interface to a compatible Somfy MyLink hub utilizing the `Synergy` API. It adds covers and scenes from the Somfy MyLink platform.

To use your compatible `Somfy MyLink` devices in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
somfy_mylink:
  host: 10.1.1.100
  system_id: mylink_id
```

{% configuration %}
host:
  description: The IP address of the Somfy MyLink hub device.
  required: true
  type: string
system_id:
  description: The `System ID` of the Somfy MyLink hub. This can be found in the `Integration` menu in the mobile app.
  required: true
  type: string
default_move_time:
  description: Sets the default time it takes for covers to open or close in seconds. This value is used to emulate setting and reading the position of the cover. If this value is omitted the ability to set a specific position will be disabled by default. This value can be applied on a per-cover basis (see `entity_config` below)
  required: false
  type: float
default_reverse:
  description: Sets the default reversal status of the cover. Possible values are `true` or `false`. This value can be applied on a per-cover basis (see `entity_config` below)
  required: false
  type: boolean
entity_config:
  description: Configuration for specific cover entities. All subordinate keys are the corresponding entity ids to the domains, e.g., `cover.bedroom_blinds`.
  required: false
  type: map
  keys:
    '`<ENTITY_ID>`':
      description: Additional options for specific entities.
      required: false
      type: map
      keys:
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
  system_id: mylink_id
  default_move_time: 21.5
  default_reverse: false
  entity_config:
    cover.bedroom:
        move_time: 20.5
    cover.outdoor_awning:
        reverse: true
```
