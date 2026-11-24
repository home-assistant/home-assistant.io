---
title: "MQTT button"
description: "Instructions on how to integrate MQTT buttons into Home Assistant."
ha_release: 2021.12
ha_iot_class: Configurable
ha_domain: mqtt
---

The **MQTT button** {% term integration %} lets you send an MQTT message when the button is pressed in the frontend or the button press action is called. This can be used to expose some service of a remote device, for example reboot.

## Configuration

{% include integrations/mqtt_config_methods.md item="button" platform="button" subentry=true %}

```yaml
# Example configuration.yaml entry
mqtt:
  - button:
      command_topic: "home/bedroom/switch1/reboot"
```

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
      description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_mode:
  description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
  required: false
  type: string
  default: latest
availability_template:
  description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
command_template:
  description: Defines a [template](/docs/templating/where-to-use/#mqtt) to generate the payload to send to `command_topic`.
  required: false
  type: template
command_topic:
  description: The MQTT topic that Home Assistant publishes to when you press the button in Home Assistant, including when you call the `button.press` action.
  required: true
  type: string
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `button.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available. If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
{% include integrations/mqtt_device.md %}
device_class:
  description: The [type/class](/integrations/button/#device-class) of the button to set the icon in the frontend. The `device_class` can be `null`.
  required: false
  type: device_class
enabled_by_default:
  description: Controls whether this entity is enabled by default. When set to `true`, the entity is enabled and usable immediately. When set to `false`, Home Assistant adds the entity as disabled. A disabled entity has no state, and you can't use it in automations or dashboards until you [enable it](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the published messages.
  required: false
  type: string
  default: "utf-8"
entity_category:
  description: The [category](https://contributors.home-assistant.io/core/entities/entity-class/#generic-properties) of the entity.
  required: false
  type: string
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
icon:
  description: "[Icon](/integrations/homeassistant/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-template-configuration) documentation."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Usage example can be found in [MQTT sensor](/integrations/sensor.mqtt/#json-attributes-topic-configuration) documentation.
  required: false
  type: string
message_expiry_interval:
  description: "Controls how long queued or retained messages sent from Home Assistant persist at the broker for offline subscribers. This option prevents the broker from retaining stale messages. The expected value for this option is a JSON mapping, for example, `{\"days\": 1, \"hours\": 2, \"minutes\": 20, \"seconds\": 30}` or `{\"seconds\": 3600}`."
  required: false
  type: map
  keys:
    days:
      description: "Number of days published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    hours:
      description: "Number of hours published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    minutes:
      description: "Number of minutes published messages are queued or retained for offline subscribers."
      required: false
      type: integer
    seconds:
      description: "Number of seconds published messages are queued or retained for offline subscribers."
      required: false
      type: integer
name:
  description: The name to use when displaying this button. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
  default: MQTT Button
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
payload_press:
  description: The payload To send to trigger the button.
  required: false
  type: string
  default: "PRESS"
platform:
  description: Must be `button`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
unique_id:
  description: An ID that uniquely identifies this button entity. If two buttons have the same unique ID, Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
visible_by_default:
  description: Control whether this entity is visible by default. When set to false, the entity is hidden and does not appear on dashboards until you manually make it visible in its settings.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Examples

In this section, you will find some real-life examples of how to use this feature.

### Full configuration

The example below shows a full configuration for a button.

```yaml
# Example configuration.yaml entry
mqtt:
  - button:
      unique_id: bedroom_switch_reboot_btn
      name: "Restart Bedroom Switch"
      command_topic: "home/bedroom/switch1/commands"
      payload_press: "restart"
      availability:
        - topic: "home/bedroom/switch1/available"
      qos: 0
      retain: false
      entity_category: "config"
      device_class: "restart"
```
