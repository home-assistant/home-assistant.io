---
title: "MQTT Device trigger"
description: "Instructions on how to integrate MQTT device triggers within Home Assistant."
ha_release: 0.106
ha_iot_class: Configurable
ha_domain: mqtt
---

The **MQTT Device trigger** {% term integration %} uses an MQTT message payload to generate device trigger events.

An MQTT device trigger is a better option than a [binary sensor](/integrations/binary_sensor.mqtt/) for buttons and remote controls.

## Configuration

{% include integrations/mqtt_config_methods.md item="device trigger" platform="device_automation" yaml=false %}

Manual setup through {% term "`configuration.yaml`" %} is not supported. Note that only one trigger may be defined per unique discovery topic. Also note that the combination of `type` and `subtype` should be unique for a device.

{% configuration %}
automation_type:
  description: The type of automation, must be 'trigger'.
  required: true
  type: string
payload:
  description: Optional payload to match the payload being sent over the topic.
  required: false
  type: string
platform:
  description: Must be `device_automation`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
topic:
  description: The MQTT topic subscribed to receive trigger events.
  required: true
  type: string
type:
  description: "The type of the trigger, for example, `button_short_press`. Entries supported by the frontend: `button_short_press`, `button_short_release`, `button_long_press`, `button_long_release`, `button_double_press`, `button_triple_press`, `button_quadruple_press`, `button_quintuple_press`. If set to an unsupported value, will render as `subtype type`, for example, `button_1 spammed` with `type` set to `spammed` and `subtype` set to `button_1`"
  required: true
  type: string
subtype:
  description: "The subtype of the trigger, for example, `button_1`. Entries supported by the frontend: `turn_on`, `turn_off`, `button_1`, `button_2`, `button_3`, `button_4`, `button_5`, `button_6`. If set to an unsupported value, will render as `subtype type`, for example, `left_button pressed` with `type` set to `button_short_press` and `subtype` set to `left_button`"
  required: true
  type: string
{% include integrations/mqtt_device.md item="device trigger" required=true unique_id=false %}
value_template:
  description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract the value."
  required: false
  type: template
{% endconfiguration %}

### Example

This shows a complete example of defining a remote control type device with two triggers: "left arrow click" and "right arrow click".

Note that it is not necessary to provide the full device information in each message, but the identifying information, `identifier` in the example, must be the same.

#### Left arrow click configuration

- Discovery topic: `homeassistant/device_automation/0x90fd9ffffedf1266/action_arrow_left_click/config`
- Discovery payload:

  ```json
  {
      "automation_type": "trigger",
      "type": "action",
      "subtype": "arrow_left_click",
      "payload": "arrow_left_click",
      "topic": "zigbee2mqtt/0x90fd9ffffedf1266/action",
      "device": {
          "identifiers": [
              "zigbee2mqtt_0x90fd9ffffedf1266"
          ],
          "name": "0x90fd9ffffedf1266",
          "sw_version": "Zigbee2MQTT 1.14.0",
          "model": "TRADFRI remote control (E1524/E1810)",
          "manufacturer": "IKEA"
      }
  }
  ```

- Trigger topic: `zigbee2mqtt/0x90fd9ffffedf1266/action`
- Trigger payload: `arrow_left_click`

#### Right arrow click configuration

- Discovery topic: `homeassistant/device_automation/0x90fd9ffffedf1266/action_arrow_right_click/config`
- Discovery payload:

  ```json
  {
      "automation_type": "trigger",
      "type": "action",
      "subtype": "arrow_right_click",
      "payload": "arrow_right_click",
      "topic": "zigbee2mqtt/0x90fd9ffffedf1266/action",
      "device": {
          "identifiers": [
              "zigbee2mqtt_0x90fd9ffffedf1266"
          ]
      }
  }   
  ```

- Trigger topic: `zigbee2mqtt/0x90fd9ffffedf1266/action`
- Trigger payload: `arrow_right_click`
