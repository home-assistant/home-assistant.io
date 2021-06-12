---
title: "MQTT Device Trigger"
description: "Instructions on how to integrate MQTT device triggers within Home Assistant."
ha_category:
  - Device Automation
ha_release: 0.106
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` device trigger platform uses an MQTT message payload to generate device trigger events.

An MQTT device trigger is a better option than a [binary sensor](/integrations/binary_sensor.mqtt/) for buttons, remote controls etc.

## Configuration

MQTT device triggers are only supported through [MQTT discovery](/docs/mqtt/discovery/), manual setup through `configuration.yaml` is not supported.
The discovery topic needs to be: `<discovery_prefix>/device_automation/[<node_id>/]<object_id>/config`.

{% configuration %}
automation_type:
  description: The type of automation, must be 'trigger'.
  required: true
  type: string
payload:
  description: Optional payload to match the payload being sent over the topic.
  required: false
  type: string
qos:
  description: The maximum QoS level to be used when receiving messages.
  required: false
  type: integer
  default: 0
topic:
  description: The MQTT topic subscribed to receive trigger events.
  required: true
  type: string
type:
  description: "The type of the trigger, e.g. `button_short_press`. Entries supported by the frontend: `button_short_press`, `button_short_release`, `button_long_press`, `button_long_release`, `button_double_press`, `button_triple_press`, `button_quadruple_press`, `button_quintuple_press`. If set to an unsupported value, will render as `subtype type`, e.g. `button_1 spammed` with `type` set to `spammed` and `subtype` set to `button_1`"
  required: true
  type: string
subtype:
  description: "The subtype of the trigger, e.g. `button_1`. Entries supported by the frontend: `turn_on`, `turn_off`, `button_1`, `button_2`, `button_3`, `button_4`, `button_5`, `button_6`. If set to an unsupported value, will render as `subtype type`, e.g. `left_button pressed` with `type` set to `button_short_press` and `subtype` set to `left_button`"
  required: true
  type: string
device:
  description: "Information about the device this device trigger is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html)."
  required: true
  type: map
  keys:
    connections:
      description: "A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `'connections': ['mac', '02:5b:26:a8:dc:12']`."
      required: false
      type: [list, map]
    identifiers:
      description: A list of IDs that uniquely identify the device. For example a serial number.
      required: false
      type: [list, string]
    manufacturer:
      description: The manufacturer of the device.
      required: false
      type: string
    model:
      description: The model of the device.
      required: false
      type: string
    name:
      description: The name of the device.
      required: false
      type: string
    suggested_area:
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
{% endconfiguration %}
