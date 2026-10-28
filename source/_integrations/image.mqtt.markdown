---
title: "MQTT Image"
description: "Instructions on how to use an MQTT image message as an Image within Home Assistant."
ha_release: 2023.7
ha_iot_class: Configurable
ha_domain: mqtt
---

The **MQTT Image** {% term integration %} allows you to integrate the content of an image file sent through MQTT into Home Assistant as an image.
The `image` platform is a simplified version of the `camera` platform that only accepts images.
Every time a message under the `image_topic` in the configuration is received, the image displayed in Home Assistant will also be updated. Messages received on `image_topic` should contain the full contents of an image file, for example, a JPEG image, without any additional encoding or metadata.

This can be used with an application or a service capable of sending images through MQTT.

An alternative setup is to use the `url_topic` option to receive an image URL for a new picture to show.

## Configuration

{% include integrations/mqtt_config_methods.md item="image entity" platform="image" subentry=true %}

```yaml
# Example configuration.yaml entry
mqtt:
  - image:
      url_topic: mynas/status/url
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
content_type:
  description: The content type of and image data message received on `image_topic`. This option cannot be used with the `url_topic` because the content type is derived when downloading the image.
  required: false
  type: string
  default: image/jpeg
default_entity_id:
  description: Use `default_entity_id` instead of name for automatic generation of the entity ID. For example, `image.foobar`. When used without a `unique_id`, the entity ID will update during restart or reload if the entity ID is available. If the entity ID already exists, the entity ID will be created with a number at the end. When used with a `unique_id`, the `default_entity_id` is only used when the entity is added for the first time. When set, this overrides a user-customized entity ID if the entity was deleted and added again.
  required: false
  type: string
{% include integrations/mqtt_device.md %}
enabled_by_default:
  description: Controls whether this entity is enabled by default. When set to `true`, the entity is enabled and usable immediately. When set to `false`, Home Assistant adds the entity as disabled. A disabled entity has no state, and you can't use it in automations or dashboards until you [enable it](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
  required: false
  type: boolean
  default: true
encoding:
  description: The encoding of the payloads received. Set to `""` to disable decoding of incoming payload. Use `image_encoding` to enable `Base64` decoding on `image_topic`.
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
image_topic:
  description: The MQTT topic to subscribe to receive the image payload of the image to be downloaded. Ensure the `content_type` type option is set to the corresponding content type. This option cannot be used together with the `url_topic` option. But at least one of these option is required.
  required: exclusive
  type: string
json_attributes_template:
  description: Defines a [template](/docs/templating/where-to-use/#mqtt) to extract the JSON dictionary from messages received on the `json_attributes_topic`.
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as sensor attributes. Implies `force_update` of the current sensor state when a message is received on this topic.
  required: false
  type: string
name:
  description: The name of the image. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this image. If two images have the same unique ID Home Assistant will raise an exception. Required when used with device-based discovery.
  required: false
  type: string
url_template:
  description: Defines a [template](/docs/templating/where-to-use/#mqtt) to extract the image URL from a message received at `url_topic`.
  required: false
  type: template
url_topic:
  description: The MQTT topic to subscribe to receive an image URL. A `url_template` option can extract the URL from the message. The `content_type` will be derived from the image when downloaded. This option cannot be used together with the `image_topic` option, but at least one of these options is required.
  required: exclusive
  type: string
visible_by_default:
  description: Control whether this entity is visible by default. When set to false, the entity is hidden and does not appear on dashboards until you manually make it visible in its settings.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

### Example receiving images from a URL

Add the configuration below to your {% term "`configuration.yaml`" %}.

To test it publish an image URL to the topic from the console:

```shell
mosquitto_pub -h <mqtt_broker> -t mynas/status/url -m "https://brands.home-assistant.io/_/homeassistant/logo.png"
```

```yaml
# Example configuration.yaml entry
mqtt:
  - image:
      url_topic: mynas/status/url
```

### Example receiving images from a file

Add the configuration below to your {% term "`configuration.yaml`" %}.

To test it, publish an image URL to the topic from the console:

```shell
mosquitto_pub -h <mqtt_broker> -t mynas/status/file -f <logo.png>
```

```yaml
# Example configuration.yaml entry
mqtt:
  - image:
      image_topic: mynas/status/file
      content_type: image/png
```
