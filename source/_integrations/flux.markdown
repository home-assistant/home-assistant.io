---
title: Flux
description: Instructions on how to automate the color temperature of your lights based on the time of day with Home Assistant
ha_category:
  - Automation
ha_release: 0.21
ha_quality_scale: internal
ha_domain: flux
ha_iot_class: Calculated
ha_platforms:
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `flux` switch {% term integration %} will change the temperature of your lights similar to the way flux works on your computer, using circadian rhythm. They will be bright during the day, and gradually fade to a red/orange at night. The `flux` switch restores its last state after startup.

The {% term integration %} will update your lights based on the time of day. It will only affect lights that are turned on and listed in the flux configuration.

During the day (in between `start_time` and `sunset_time`), it will fade the lights from the `start_colortemp` to the `sunset_colortemp`. After sunset (between `sunset_time` and `stop_time`), the lights will fade from the `sunset_colortemp` to the `stop_colortemp`. If the lights are still on after the `stop_time` it will continue to change the light to the `stop_colortemp` until the light is turned off. The fade effect is created by updating the lights periodically.

The value of `sunset_time` is automatically calculated based on the location specified in your [Home Assistant configuration](/docs/configuration/basic).

The color temperature is specified in kelvin, and accepted values are between 1000 and 40000 kelvin. Lower values will seem more red, while higher will look more white.

If you want to update at variable intervals, you can leave the switch turned off and use automation rules that use the `switch.<name>_update` action whenever you want the lights updated, where `<name>` equals the `name:` property in the switch configuration.

To use the Flux switch in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: flux
    lights:
      - light.desk
      - light.lamp
```

{% configuration %}
lights:
  description: array list of light entities.
  required: true
  type: list
name:
  description: The name to use when displaying this switch.
  required: false
  default: Flux
  type: string
start_time:
  description: The start time.
  required: false
  default: sunrise
  type: time
stop_time:
  description: The stop time.
  required: false
  default: dusk
  type: time
start_colortemp:
  description: The color temperature at the start.
  required: false
  default: 4000
  type: integer
sunset_colortemp:
  description: The sun set color temperature.
  required: false
  default: 3000
  type: integer
stop_colortemp:
  description: The color temperature at the end.
  required: false
  default: 1900
  type: integer
brightness:
  description: Constant brightness of the lights. Besides color temperature, brightness is also adjusted unless a value is specified here.
  required: false
  type: integer
disable_brightness_adjust:
  description: If true, brightness will not be adjusted, only color temperature.
  required: false
  type: boolean
  default: false
mode:
  description: Select how color temperature is passed to lights. Valid values are `xy`, `mired` (alias to kelvin) and `rgb`.
  required: false
  default: xy
  type: string
transition:
  description: Transition time in seconds for the light changes (high values may not be supported by all light models).
  required: false
  default: 30
  type: integer
interval:
  description: Frequency in seconds at which the lights should be updated.
  required: false
  default: 30
  type: integer
unique_id:
  description: An ID that uniquely identifies this switch. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
{% endconfiguration %}

Full example of an entry in the {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: flux
    lights:
      - light.desk
      - light.lamp
    name: Fluxer
    start_time: "7:00"
    stop_time: "23:00"
    start_colortemp: 4000
    sunset_colortemp: 3000
    stop_colortemp: 1900
    brightness: 200
    disable_brightness_adjust: true
    mode: xy
    transition: 30
    interval: 60
```
