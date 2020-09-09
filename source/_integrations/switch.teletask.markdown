---
title: "Teletask Switch"
description: "Instructions on how to integrate Teletask switches with Home Assistant."
ha_category:
  - Switch
ha_release: 0.115
ha_iot_class: Local Push
ha_domain: teletask
---

<div class='note'>

The `teletask` integration must be configured correctly to use this integration, see [Teletask Integration](/integrations/teletask).

</div>

The `teletask switch` integration is used as an interface to control KNX actuators for switches.

## Configuration

To use your Teletask switch in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: teletask
    address: 1
    name: Socket 1
```

{% configuration %}
address:
  description: Teletask group address for switching the switch on and off.
  required: true
  type: integer
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
doip_component:
  description: The type of instruction where the switch is attached to. Possible values are: relay, switch, globmood, locmood or switch.
  required: false
  type: string
{% endconfiguration %}