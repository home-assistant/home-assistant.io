---
title: "KNX Binary Sensor"
description: "Instructions on how to setup the KNX binary sensors within Home Assistant."
ha_category:
  - Binary Sensor
ha_release: 0.24
ha_iot_class: Local Push
ha_domain: knx
---

<div class='note'>
  
The `knx` integration must be configured correctly to use this integration, see [KNX Integration](/integrations/knx).

</div>

The `knx` sensor platform allows you to monitor [KNX](https://www.knx.org/) binary sensors.

Binary sensors are read-only. To write to the knx-bus configure an exposure [KNX Integration - Expose](/integrations/knx/#exposing-sensor-values-or-time-to-knx-bus).

## Configuration

The `knx` integration must be configured correctly, see [KNX Integration](/integrations/knx).

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: knx
    state_address: '6/0/2'
```

{% configuration %}
state_address:
  description: KNX group address of the binary sensor.
  required: true
  type: string
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
sync_state:
  description: Actively read the value from the bus. If `False` no GroupValueRead telegrams will be sent to the bus.
  required: false
  type: boolean
  default: True
device_class:
  description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
significant_bit:
  description: Specify which significant bit of the KNX value should be used.
  required: false
  type: integer
  default: 1
reset_after:
  description: Reset back to OFF state after specified milliseconds.
  required: false
  type: integer
{% endconfiguration %}

### Automation actions

You can also attach actions to binary sensors (e.g., to switch on a light when a switch was pressed). In this example, one light is switched on when the button was pressed once and two others when the button was pressed a second time.

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: knx
    name: Livingroom.3Switch3
    state_address: '5/0/26'
    automation:
      - counter: 1
        hook: 'on'
        action:
          - entity_id: light.hue_color_lamp_1
            service: homeassistant.turn_on
      - counter: 2
        hook: 'on'
        action:
          - entity_id: light.hue_bloom_1
            service: homeassistant.turn_on
          - entity_id: light.hue_bloom_2
            service: homeassistant.turn_on
```

{% configuration %}
name:
  description: A name for this device used within Home Assistant.
  required: false
  type: string
counter:
  description: Set to 2 if your only want the action to be executed if the button was pressed twice. To 3 for three times button pressed.
  required: false
  type: integer
  default: 1
hook:
  description: Indicates if the automation should be executed on what state of the binary sensor. Values are "on" or "off".
  required: false
  type: string
  default: "on"
action:
  description: Specify a list of actions analog to the [automation rules](/docs/automation/action/).
  required: false
  type: list
{% endconfiguration %}
