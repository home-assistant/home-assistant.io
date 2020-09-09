---
title: "Teletask Light"
description: "Instructions on how to integrate Teletask lights with Home Assistant."
ha_category:
  - Light
ha_release: 0.115
ha_iot_class: Local Push
ha_domain: teletask
---

<div class='note'>

The `teletask` integration must be configured correctly to use this integration, see [Teletask Integration](/integrations/teletask).

</div>

The `teletask light` integration is used as an interface to control KNX actuators for lighting applications

## Configuration

To use your Teletask light in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: teletask
    address: 1
    brightness_address: 1
    name: Socket 1
```

{% configuration %}
address:
  description: Teletask group address for switching the light on and off.
  required: true
  type: integer
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
doip_component:
  description: The type of instruction where the light is attached to. Possible values are: relay, switch, globmood, locmood or switch.
  required: false
  type: string
brightness_address:
  description: Teletask group address for the dimming component.
  required: false
  type: integer
{% endconfiguration %}