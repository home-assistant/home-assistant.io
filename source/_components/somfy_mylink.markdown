---
layout: page
title: "Somfy MyLink"
description: "Instructions on how to integrate Somfy MyLink devices with Home Assistant."
date: 2019-03-29 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tahoma.png
ha_category:
  - Hub
  - Cover
ha_release: 0.92
ha_iot_class: "Assumed State"
---

The `Somfy MyLink` component platform is used as an interface to a compatible Somfy MyLink hub utilizing the `Synergy` API. It adds covers and scenes from the Somfy MyLink platform.

To use your compatible `Somfy MyLink` devices in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
somfy_mylink:
  host: IP_ADDRESS
  system_id: MYLINK_ID
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
        reverse:
          description: Reverses the direction of the cover. Possible values are `true` or `false`.
          required: false
          type: boolean
{% endconfiguration %}

```yaml
# Advanced configuration.yaml entry setting specific options on a per-cover basis
somfy_mylink:
  host: IP_ADDRESS
  system_id: MYLINK_ID
  default_reverse: false
  entity_config:
    cover.outdoor_awning:
        reverse: true
```
