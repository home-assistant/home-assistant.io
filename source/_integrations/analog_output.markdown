---
title: Analog output
description: Instructions on how to setup your analog outputs with Home Assistant.
ha_category:
  - Analog Outout
ha_release: pre 0.109
ha_quality_scale: internal
ha_domain: analog_output
---

This integration allows you to set up analog outpuys. Read the integration documentation for your particular analog output device or hardware to learn how to enable it.

### Default turn-on values

The default turn-on value is specified in the config file with the 'initial' value.

### Service `analog_output.turn_on`

Turns one analog_output on or multiple outputs on using [groups]({{site_root}}/integrations/group/).

Analog outputs do support all attributes. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of analog outputs. To target all the analog outputs use all as `entity_id`.
| `value` | yes | Integer supported minimal- and maximal value for the output value. Minimum and maximum depends per hardware. With a value of 0 the device will be switched off. If no value is given, the analog output will revert to the value when it was last switched on, or, if a set_value service has been executed before it was swiched on, to the value specified in this last service.
| `value_pct`| yes | Alternatively, you can specify the output value in percent (a number between 0 and 100), where 0 means the output is off, 1 is the minimum and 100 is the maximum value supported by the output.

<div class='note'>

In order to apply attributes to an entity, you will need to add `data:` to the configuration. See example below

</div>

```yaml
# Example configuration.yaml entry
automation:
- id: one
  alias: Turn on analog output when motion is detected
  trigger:
    - platform: state
      entity_id: binary_sensor.motion_1
      to: 'on'
  action:
    - service: analog_output.turn_on
      data:
        entity_id: output.pwm_pump_1
        value_pct: 50
```

### Service `analog_output.turn_off`

Turns one or multiple analog outputs off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`s of the analog outputs. To target all the analog outputs use all as `entity_id`.

### Service `analog_output.toggle`

Toggles the state of one or multiple analog outputs. Takes the same arguments as [`turn_on`](#service-analog_outputturn_on) service.


### Service `analog_output.decrement'

Decrements the value of the analog output with 1 by default. The amount can be configured with the 'step' parameter.

### Service `analog_output.increment'

Increments the value of the analog output with 1 by default. The amount can be configured with the 'step' parameter.

### Service `analog_output.set_value'

Sets the value of the analog output. If the output is on when the value is set, the value is immedeatly applied, if the output was off during this service call, the value is stored and applied when the turn-on service is called.




