---
title: "KNX Light"
description: "Instructions on how to integrate KNX lights with Home Assistant."
ha_category:
  - Light
ha_release: 0.44
ha_iot_class: Local Push
ha_domain: knx
---

<div class='note'>
  
The `knx` integration must be configured correctly to use this integration, see [KNX Integration](/integrations/knx).

</div>

The `knx light` integration is used as an interface to control KNX actuators for lighting applications such as:

- switching actuators
- dimming actuators
- LED controllers
- DALI gateways

## Configuration

To use your KNX light in your installation, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: knx
    address: '1/0/9'
```

{% configuration %}
address:
  description: KNX group address for switching the light on and off. *DPT 1.001*
  required: true
  type: string
state_address:
  description: KNX group address for retrieving the switch state of the light. *DPT 1.001*
  required: false
  type: string
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
brightness_address:
  description: KNX group address for setting the brightness of the light in percent (absolute dimming). *DPT 5.001*
  required: false
  type: string
brightness_state_address:
  description: KNX group address for retrieving the brightness of the light in percent. *DPT 5.001*
  required: false
  type: string
color_address:
  description: KNX group address for setting the RGB color of the light. *DPT 232.600*
  required: false
  type: string
color_state_address:
  description: KNX group address for retrieving the RGB color of the light. *DPT 232.600*
  required: false
  type: string
rgbw_address:
  description: KNX group address for setting the RGBW color of the light. *DPT 251.600*
  required: false
  type: string
rgbw_state_address:
  description: KNX group address for retrieving the RGBW color of the light. *DPT 251.600*
  required: false
  type: string
color_temperature_address:
  description: KNX group address for setting the color temperature of the light. *DPT 5.001 or 7.600 based on color_temperature_mode*
  required: false
  type: string
color_temperature_state_address:
  description: KNX group address for retrieving the color temperature of the light. *DPT 5.001 or 7.600 based on color_temperature_mode*
  required: false
  type: string
color_temperature_mode:
  description: Color temperature group address data type. `absolute` color temperature in Kelvin. *color_temperature_address -> DPT 7.600*. `relative` color temperature in percent cold white (0% warmest; 100% coldest). *color_temperature_address -> DPT 5.001*
  required: false
  type: string
  default: absolute
min_kelvin:
  description: Warmest possible color temperature in Kelvin. (Used in combination with *color_temperature_address*)
  required: false
  type: integer
  default: 2700
max_kelvin:
  description: Coldest possible color temperature in Kelvin. (Used in combination with *color_temperature_address*)
  required: false
  type: integer
  default: 6000
{% endconfiguration %}

Many KNX devices can change their state internally without a message to the switch address on the KNX bus, e.g., if you configure a scene or a timer on a channel. The optional `state_address` can be used to inform Home Assistant about these state changes. If a KNX message is seen on the bus addressed to the given `state_address` (in most cases from the light actuator), it will overwrite the state of the switch object.

For switching/light actuators that are only controlled by a single group address and don't have dedicated state communication objects you can set `state_address` to the same value as `address`.

*Note on tunable white:* Home Assistant uses Mireds as the unit for color temperature, whereas KNX typically uses Kelvin. The Kelvin/Mireds relationship is reciprocal, not linear, therefore the color temperature pickers (sliders) in Home Assistant may not align with ones of KNX visualizations. This is the expected behavior.

## Extended configuration example

```yaml
light:
  # dimmable light
  - platform: knx
    name: Bedroom-Light-1
    address: '1/0/9'
    state_address: '1/1/9'
    brightness_address: '1/2/9'
    brightness_state_address: '1/3/9'
  #
  # RGB light
  - platform: knx
    name: Bathroom-Light-1
    address: '1/0/9'
    state_address: '1/1/9'
    brightness_address: '1/2/9'
    brightness_state_address: '1/3/9'
    color_address: '1/4/9'
    color_state_address: '1/5/9'
  #
  # tunable white light
  - platform: knx
    name: Office-Light-1
    address: '1/0/21'
    state_address: '1/1/21'
    brightness_address: '1/2/21'
    brightness_state_address: '1/3/21'
    color_temperature_address: '1/4/21'
    color_temperature_state_address: '1/5/21'
    color_temperature_mode: absolute
    min_kelvin: 2550
    max_kelvin: 6200
  #
  # actuator without dedicated state communication object
  - platform: knx
    name: Cellar-Light-1
    address: '1/0/5'
    state_address: '1/0/5'
```
