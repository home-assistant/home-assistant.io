---
title: "MQTT Device trigger"
description: "Instructions on how to integrate MQTT device triggers within Home Assistant."
ha_category:
  - Device automation
ha_release: 0.106
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` device trigger platform uses an MQTT message payload to generate device trigger events.

An MQTT device trigger is a better option than a [binary sensor](/integrations/binary_sensor.mqtt/) for buttons, remote controls etc.

## Configuration

MQTT device triggers are only supported through [MQTT discovery](/integrations/mqtt/#mqtt-discovery), manual setup through `configuration.yaml` is not supported.
The discovery topic needs to be: `<discovery_prefix>/device_automation/[<node_id>/]<object_id>/config`. Note that only one trigger may be defined per unique discovery topic. Also note that the combination of `type` and `subtype` should be unique for a device.

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
  description: The maximum QoS level to be used when receiving and publishing messages.
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
  description: "Information about the device this device trigger is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). At least one of identifiers or connections must be present to identify the device."
  required: true
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an `http://`, `https://` or an internal `homeassistant://` URL.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
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
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the value."
  required: false
  type: template
{% endconfiguration %}

### Example MQTT discovery

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

### Example attaching a trigger from a device automation using templates

A device automation with an MQTT device trigger can be fully set up through the UI.
In some cases it can be useful to to use templates, e.g. to set the `discovery_id` using a variable.
The parameters `discovery_id`, `type` and `subtype` support templating using the [trigger variables](/docs/automation/trigger/#trigger-variables).

{% raw %}

The following example shows how the `discovery_id` can be set as a variable to be using in a template.

```yaml
# Example configuration.yaml
automation:
  trigger_variables:
    discovery_id: '0x90fd9ffffedf1266'
  trigger:
  - platform: device
    domain: mqtt
    device_id: c2962db89494eb88654c20c34fab9285
    type: action
    subtype: arrow_left_click
    discovery_id: '{{ discovery_id }} action_arrow_left_click'
  condition: []
  action:
  - service: notify.persistent_notification
    data:
      message: "Arrow left clicked"
  mode: single
```

{% endraw %}

### Example setting up MQTT device trigger using a blueprint

The following shows an example how MQTT triggers can be set up using a blueprint:

{% raw %}

```yaml
blueprint:
  name: Ikea Tradfri Dimmer as Shutter Remote (Zigbee2MQTT)
  description: |
    Control a shutter with an Ikea Tradfri Dimmer over Zigbee2MQTT
  domain: automation
  input:
    remote:
      name: Remote
      description: IKEA Tradfri Dimmer remote to use
      selector:
        device:
          integration: mqtt
          manufacturer: IKEA
          model: TRADFRI ON/OFF switch (E1743)
    cover:
      name: Shutter
      description: The shutter to control
      selector:
        target:
          entity:
            domain: cover
              
trigger_variables:
  input_remote: !input remote
  input_cover: !input cover
  input_discovery_id: "{{ device_entities(input_remote)[0].split('.')[1].split('_')[0] }}"

trigger:
  - platform: device
    domain: mqtt
    device_id: !input remote
    type: action
    subtype: "on"
    discovery_id: "{{ input_discovery_id }} action_on"
    
  - platform: device
    domain: mqtt
    device_id: !input remote
    type: action
    subtype: "off"
    discovery_id: "{{ input_discovery_id }} action_off"
    
action:
- choose:
  - conditions:
    - '{{ trigger.payload == "on" }}'
    sequence:
    - service: >
        {% if is_state(input_cover.entity_id, 'opening') %}
          cover.stop_cover
        {% else %}
          cover.open_cover
        {% endif %}
      target: !input cover
  - conditions:
    - '{{ trigger.payload == "off" }}'
    sequence:
    - service: >
        {% if is_state(input_cover.entity_id, 'closing') %}
          cover.stop_cover
        {% else %}
          cover.close_cover
        {% endif %}
      target: !input cover
mode: restart
```

{% endraw %}
