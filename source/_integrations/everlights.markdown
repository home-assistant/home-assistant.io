---
title: EverLights
description: Instructions on how to set up EverLights within Home Assistant.
ha_category:
  - Light
ha_iot_class: Local Polling
ha_release: 0.87
ha_domain: everlights
ha_platforms:
  - light
ha_integration_type: integration
---

[EverLights](https://myeverlights.com/) are permanent Christmas lights installed on a home's gutters or flashing. This integration can change all LEDs in a zone to a single color or activate a pattern that was previously saved to the control box.

### Configuration Details

To enable EverLights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: everlights
    hosts:
      - 192.168.1.123
      - 192.168.1.124
```

{% configuration %}
hosts:
  description: EverLights control box IP addresses.
  required: true
  type: list
{% endconfiguration %}

### Effects

EverLights patterns saved to the control box can be activated using the effect parameter to the `light.turn_on` service. If an effect is specified, then the color and brightness are ignored.

### Limitations

The EverLights control box status indicates if a zone is active but does not indicate the current color or pattern. The color and effect in the state attributes are based on the last execution of `light.turn_on`. If the control box scheduler or another app makes a change, then the state attributes are not updated.
