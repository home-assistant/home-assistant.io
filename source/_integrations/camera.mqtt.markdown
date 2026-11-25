---
title: "MQTT Camera"
description: "Instructions on how to use an MQTT image message as a Camera within Home Assistant."
ha_release: 0.43
ha_iot_class: Configurable
ha_domain: mqtt
---

The **MQTT camera** {% term integration %} allows you to integrate the content of an image file sent through MQTT into Home Assistant as a camera. Every time a message under the `topic` in the configuration is received, the image displayed in Home Assistant will also be updated. Messages received on `topic` should contain the full contents of an image file, for example, a JPEG image, without any additional encoding or metadata.

This can be used with an application or a service capable of sending images through MQTT.

## Configuration

{% include integrations/mqtt_config_methods.md item="camera" platform="camera" subentry=false %}

```yaml
# Example configuration.yaml entry
mqtt:
  - camera:
      topic: zanzito/shared_locations/my-device
```

The sample configuration above can be tested by publishing an image to the topic from the console:

```shell
mosquitto_pub -h <mqtt_broker> -t zanzito/shared_locations/my-device -f <camera_imaga.jpg>
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
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `camera.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available. If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
{% include integrations/mqtt_device.md %}
enabled_by_default:
  description: Controls whether this entity is enabled by default. When set to `true`, the entity is enabled and usable immediately. When set to `false`, Home Assistant adds the entity as disabled. A disabled entity has no state, and you can't use it in automations or dashboards until you [enable it](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received. Set to `""` to disable decoding of incoming payload. Use `image_encoding` to enable `Base64` decoding on `topic`.
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
image_encoding:
  description: The encoding of the image payloads received. Set to `"b64"` to enable base64 decoding of image payload. If not set, the image payload must be raw binary data.
  required: false
  type: string
json_attributes_template:
  description: "Defines a [template](/docs/templating/where-to-use/#mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies `force_update` of the current sensor state when a message is received on this topic.
  required: false
  type: string
name:
  description: The name of the camera. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
topic:
  description: The MQTT topic to subscribe to.
  required: true
  type: string
unique_id:
  description: An ID that uniquely identifies this camera. If two cameras have the same unique ID Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
visible_by_default:
  description: Control whether this entity is visible by default. When set to false, the entity is hidden and does not appear on dashboards until you manually make it visible in its settings.
  required: false
  type: boolean
  default: true
{% endconfiguration %}
