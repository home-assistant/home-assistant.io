---
title: Somfy MyLink
description: Instructions on how to integrate Somfy MyLink devices with Home Assistant.
ha_category:
  - Hub
  - Cover
ha_release: 0.92
ha_iot_class: Assumed State
ha_domain: somfy_mylink
---

The `Somfy MyLink` integration is used as an interface to a compatible Somfy MyLink hub utilizing the `Synergy` API. It allows the addition of covers from the Somfy MyLink platform to Home Assistant.

To use your compatible `Somfy MyLink` devices in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
somfy_mylink:
  host: IP_ADDRESS
  system_id: SYSTEM_ID
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
  default: false
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
          default: false
{% endconfiguration %}

```yaml
# Advanced configuration.yaml entry setting specific options on a per-cover basis
somfy_mylink:
  host: IP_ADDRESS
  system_id: SYSTEM_ID
  default_reverse: true
  entity_config:
    cover.outdoor_awning:
        reverse: false
```
