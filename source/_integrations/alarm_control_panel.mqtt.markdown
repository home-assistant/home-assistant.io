---
title: "MQTT Alarm Control Panel"
description: "Instructions on how to integrate MQTT capable Alarm Panels into Home Assistant."
ha_category:
  - Alarm
ha_release: 0.7.4
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` alarm panel platform enables the possibility to control MQTT capable alarm panels. The Alarm icon will change state after receiving a new state from `state_topic`. If these messages are published with *RETAIN* flag, the MQTT alarm panel will receive an instant state update after subscription and will start with the correct state. Otherwise, the initial state will be `unknown`.

The integration will accept the following states from your Alarm Panel (in lower case):

- `disarmed`
- `armed_home`
- `armed_away`
- `armed_night`
- `armed_vacation`
- `armed_custom_bypass`
- `pending`
- `triggered`
- `arming`
- `disarming`

The integration can control your Alarm Panel by publishing to the `command_topic` when a user interacts with the Home Assistant frontend.

## Configuration

To enable this platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
mqtt:
  alarm_control_panel:
    - state_topic: "home/alarm"
      command_topic: "home/alarm/set"
```

<a id='new_format'></a>

{% details "Previous configuration format" %}

The configuration format of manual configured MQTT items has changed.
The old format that places configurations under the `alarm_control_panel` platform key
should no longer be used and is deprecated.

The above example shows the new and modern way,
this is the previous/old example:

```yaml
alarm_control_panel:
  - platform: mqtt
    state_topic: "home/alarm"
    command_topic: "home/alarm/set"
```

{% enddetails %}

{% configuration %}
availability:
  description: A list of MQTT topics subscribed to receive availability (online/offline) updates. Must not be used together with `availability_topic`.
  required: false
  type: list
  keys:
    payload_available:
      description: The payload that represents the available state.
      required: false
      type: string
      default: online
    payload_not_available:
      description: The payload that represents the unavailable state.
      required: false
      type: string
      default: offline
    topic:
      description: An MQTT topic subscribed to receive availability (online/offline) updates.
      required: true
      type: string
    value_template:
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
code:
  description: If defined, specifies a code to enable or disable the alarm in the frontend. Note that the code is validated locally and blocks sending MQTT messages to the remote device. For remote code validation, the code can be configured to either of the special values `REMOTE_CODE` (numeric code) or `REMOTE_CODE_TEXT` (text code). In this case, local code validation is bypassed but the frontend will still show a numeric or text code dialog. Use `command_template` to send the code to the remote device. Example configurations for remote code validation [can be found here](./#configurations-with-remote-code-validation).
  required: false
  type: string
code_arm_required:
  description: If true the code is required to arm the alarm. If false the code is not validated.
  required: false
  type: boolean
  default: true
code_disarm_required:
  description: If true the code is required to disarm the alarm. If false the code is not validated.
  required: false
  type: boolean
  default: true
code_trigger_required:
  description: If true the code is required to trigger the alarm. If false the code is not validated.
  required: false
  type: boolean
  default: true
command_template:
  description: "The [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) used for the command payload. Available variables: `action` and `code`."
  required: false
  type: string
  default: action
command_topic:
  description: The MQTT topic to publish commands to change the alarm state.
  required: true
  type: string
device:
  description: "Information about the device this alarm panel is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works through [MQTT discovery](/docs/mqtt/discovery/) and when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
  required: false
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an HTTP or HTTPS link.'
      required: false
      type: string
    connections:
      description: 'A list of connections of the device to the outside world as a list of tuples `[connection_type, connection_identifier]`. For example the MAC address of a network interface: `"connections": [["mac", "02:5b:26:a8:dc:12"]]`.'
      required: false
      type: list
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
    identifiers:
      description: "A list of IDs that uniquely identify the device. For example a serial number."
      required: false
      type: [list, string]
    manufacturer:
      description: "The manufacturer of the device."
      required: false
      type: string
    model:
      description: "The model of the device."
      required: false
      type: string
    name:
      description: "The name of the device."
      required: false
      type: string
    suggested_area:
      description: 'Suggest an area if the device isn’t in one yet.'
      required: false
      type: string
    sw_version:
      description: "The firmware version of the device."
      required: false
      type: string
    via_device:
      description: "Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant."
      required: false
      type: string
enabled_by_default:
  description: Flag which defines if the entity should be enabled when first added.
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received and published messages. Set to `""` to disable decoding of incoming payload.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://developers.home-assistant.io/docs/core/entity#generic-properties) of the entity.
  required: false
  type: string
  default: None
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
name:
  description: The name of the alarm.
  required: false
  type: string
  default: MQTT Alarm
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
payload_arm_away:
  description: The payload to set armed-away mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_AWAY
payload_arm_home:
  description: The payload to set armed-home mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_HOME
payload_arm_night:
  description: The payload to set armed-night mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_NIGHT
payload_arm_vacation:
  description: The payload to set armed-vacation mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_VACATION
payload_arm_custom_bypass:
  description: The payload to set armed-custom-bypass mode on your Alarm Panel.
  required: false
  type: string
  default: ARM_CUSTOM_BYPASS
payload_available:
  description: The payload that represents the available state.
  required: false
  type: string
  default: online
payload_disarm:
  description: The payload to disarm your Alarm Panel.
  required: false
  type: string
  default: DISARM
payload_not_available:
  description: The payload that represents the unavailable state.
  required: false
  type: string
  default: offline
payload_trigger:
  description: The payload to trigger the alarm on your Alarm Panel.
  required: false
  type: string
  default: TRIGGER
qos:
  description: The maximum QoS level of the state topic.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
state_topic:
  description: The MQTT topic subscribed to receive state updates.
  required: true
  type: string
unique_id:
   description: An ID that uniquely identifies this alarm panel. If two alarm panels have the same unique ID, Home Assistant will raise an exception.
   required: false
   type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the value."
  required: false
  type: template
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this alarm control panel.

### Configuration with local code validation

The example below shows a full configuration with local code validation.

{% raw %}

```yaml
# Example using text based code with local validation configuration.yaml
mqtt:
  alarm_control_panel:
    - name: "Alarm Panel With Numeric Keypad"
      state_topic: "alarmdecoder/panel"
      value_template: "{{value_json.state}}"
      command_topic: "alarmdecoder/panel/set"
      code: mys3cretc0de
```

{% endraw %}

### Configurations with remote code validation

The example below shows a full configuration with remote code validation and `command_template`.

{% raw %}

```yaml
# Example using text code with remote validation configuration.yaml
mqtt:
  alarm_control_panel:
    - name: "Alarm Panel With Text Code Dialog"
      state_topic: "alarmdecoder/panel"
      value_template: "{{ value_json.state }}"
      command_topic: "alarmdecoder/panel/set"
      code: REMOTE_CODE_TEXT
      command_template: >
        { "action": "{{ action }}", "code": "{{ code }}" }
```

```yaml
# Example using numeric code with remote validation configuration.yaml
mqtt:
  alarm_control_panel:
    - name: "Alarm Panel With Numeric Keypad"
      state_topic: "alarmdecoder/panel"
      value_template: "{{ value_json.state }}"
      command_topic: "alarmdecoder/panel/set"
      code: REMOTE_CODE
      command_template: >
        { "action": "{{ action }}", "code": "{{ code }}" }
```

{% endraw %}

<div class='note warning'>

When your MQTT connection is not secured, this will send your secret code over the network unprotected!

</div>
