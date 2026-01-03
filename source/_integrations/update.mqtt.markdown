---
title: "MQTT Update"
description: "Instructions on how to interact with a device exposing an Update entity through MQTT from within Home Assistant."
ha_category:
  - Update
ha_release: "2021.11"
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` Update platform allows you to integrate devices that might expose firmware/software installed and the latest versions through MQTT into Home Assistant as an Update entity. Every time a message under the `topic` in the configuration is received, the entity will be updated in Home Assistant.

## Configuration

To enable MQTT Update in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
mqtt:
  - update:
      state_topic: topic-installed
      latest_version_topic: topic-latest
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
      description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
      required: false
      type: template
availability_topic:
  description: The MQTT topic subscribed to receive availability (online/offline) updates. Must not be used together with `availability`.
  required: false
  type: string
availability_mode:
   description: When `availability` is configured, this controls the conditions needed to set the entity to `available`. Valid entries are `all`, `any`, and `latest`. If set to `all`, `payload_available` must be received on all configured availability topics before the entity is marked as online. If set to `any`, `payload_available` must be received on at least one configured availability topic before the entity is marked as online. If set to `latest`, the last `payload_available` or `payload_not_available` received on any configured availability topic controls the availability.
   required: false
   type: string
   default: latest
availability_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract device's availability from the `availability_topic`. To determine the devices's availability result of this template will be compared to `payload_available` and `payload_not_available`."
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish `payload_install` to start installing process.
  required: false
  type: string
device:
  description: "Information about the device this Update is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). Only works when [`unique_id`](#unique_id) is set. At least one of identifiers or connections must be present to identify the device."
  required: false
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
    hw_version:
      description: The hardware version of the device.
      required: false
      type: string
    identifiers:
      description: 'A list of IDs that uniquely identify the device. For example a serial number.'
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
    model_id:
      description: The model identifier of the device.
      required: false
      type: string
    name:
      description: The name of the device.
      required: false
      type: string
    serial_number:
      description: "The serial number of the device."
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
device_class:
  description: The [type/class](/integrations/update/#device-classes) of the update to set the icon in the frontend. The `device_class` can be `null`.
  required: false
  type: device_class
display_precision:
  description: Number of decimal digits for display of update progress.
  required: false
  type: integer
  default: 0
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
entity_picture:
  description: "Picture URL for the entity."
  required: false
  type: string
icon:
  description: "[Icon](/docs/configuration/customizing-devices/#icon) for the entity."
  required: false
  type: icon
json_attributes_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the JSON dictionary from messages received on the `json_attributes_topic`."
  required: false
  type: template
json_attributes_topic:
  description: The MQTT topic subscribed to receive a JSON dictionary payload and then set as entity attributes. Implies `force_update` of the current select state when a message is received on this topic.
  required: false
  type: string
latest_version_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the latest version value. Use `state_topic` with a `value_template` if all update state values can be extracted from a single JSON payload."
  required: false
  type: template
latest_version_topic:
  description: The MQTT topic subscribed to receive an update of the latest version. Use `state_topic` with a `value_template` if all update state values can be extracted from a single JSON payload.
  required: false
  type: string
name:
  description: The name of the Update. Can be set to `null` if only the device name is relevant.
  required: false
  type: string
object_id:
  description: Used instead of `name` for automatic generation of `entity_id`
  required: false
  type: string
payload_install:
  description: The MQTT payload to start installing process.
  required: false
  type: string
platform:
  description: Must be `update`. Only allowed and required in [MQTT auto discovery device messages](/integrations/mqtt/#device-discovery-payload).
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
release_summary:
  description: Summary of the release notes or changelog. This is suitable a brief update description of max 255 characters.
  required: false
  type: string
release_url:
  description: URL to the full release notes of the latest version available.
  required: false
  type: string
retain:
  description: If the published message should have the retain flag on or not.
  required: false
  type: boolean
  default: false
state_topic:
  description: "The MQTT topic subscribed to receive state updates. The state update may be either JSON or a simple string with `installed_version` value. When a JSON payload is detected, the state value of the JSON payload should supply the `installed_version` and can optionally supply: `latest_version`, `title`, `release_summary`, `release_url`, and an `entity_picture` URL. To allow progress monitoring `in_progress` (a boolean to indicate an update is in progress), or `update_percentage` (a float value to indicate the progress percentage) may be part of the JSON message."
  required: false
  type: string
title:
  description: Title of the software, or firmware update. This helps to differentiate between the device or entity name versus the title of the software installed.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this Update. If two Updates have the same unique ID Home Assistant will raise an exception.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to extract the `installed_version` state value or to render to a valid JSON payload on from the payload received on `state_topic`."
  required: false
  type: template
{% endconfiguration %}

{% important %}
Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.
{% endimportant %}

## Examples

This is an example of Update entity configuration for Shelly Gen1 device.

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - update:
      name: "Shelly Plug S Firmware Update"
      title: "Shelly Plug S Firmware"
      release_url: "https://shelly-api-docs.shelly.cloud/gen1/#changelog"
      entity_picture: "https://brands.home-assistant.io/_/shelly/icon.png"
      state_topic: "shellies/shellyplug-s-112233/info"
      value_template: "{{ value_json['update'].old_version }}"
      latest_version_topic: "shellies/shellyplug-s-112233/info"
      latest_version_template: "{% if value_json['update'].new_version %}{{ value_json['update'].new_version }}{% else %}{{ value_json['update'].old_version }}{% endif %}"
      device_class: "firmware"
      command_topic: "shellies/shellyplug-s-112233/command"
      payload_install: "update_fw"
```

{% endraw %}

JSON can also be used as `state_topic` payload. Note that this feature also allows to process and show live progress information.

{% raw %}

```json
{
  "installed_version": "1.21.0",
  "latest_version": "1.22.0",
  "title": "Device Firmware",
  "release_url": "https://example.com/release",
  "release_summary": "A new version of our amazing firmware",
  "entity_picture": "https://example.com/icon.png"
}
```

{% endraw %}

Simple progress state update example:

{% raw %}

```json
{
  "installed_version": "1.21.0",
  "latest_version": "1.22.0",
  "title": "Device Firmware",
  "release_url": "https://example.com/release",
  "release_summary": "A new version of our amazing firmware",
  "entity_picture": "https://example.com/icon.png",
  "in_progress": true
}
```

{% endraw %}

Update percentage state update example:

{% raw %}

```json
{
  "installed_version": "1.21.0",
  "latest_version": "1.22.0",
  "title": "Device Firmware",
  "release_url": "https://example.com/release",
  "release_summary": "A new version of our amazing firmware",
  "entity_picture": "https://example.com/icon.png",
  "update_percentage": 78
}
```

{% endraw %}

Publish `null` to reset the update percentage state update's:

{% raw %}

```json
{
  "installed_version": "1.22.0",
  "latest_version": "1.22.0",
  "title": "Device Firmware",
  "release_url": "https://example.com/release",
  "release_summary": "A new version of our amazing firmware",
  "entity_picture": "https://example.com/icon.png",
  "update_percentage": null
}
```

{% endraw %}

The values in the JSON are optional but must be valid within the following schema:

{% configuration %}
installed_version:
  description: The software or firmware version installed.
  required: false
  type: string
latest_version:
  description: The latest software or firmware version available.
  required: false
  type: string
title:
  description: Title of the software or firmware update available.
  required: false
  type: string
release_summary:
  description: Summary of the software or firmware update available.
  required: false
  type: string
release_url:
  description: URL pointing to the software release notes.
  required: false
  type: string
entity_picture:
  description: URL pointing to an image of the update to be applied as entity picture.
  required: false
  type: string
in_progress:
  description: Boolean to report an update is in progress or not.
  required: false
  default: false
  type: boolean
update_percentage:
  description: Number between 0 and 100 to report the update process. A `null` value resets the in-progress state.
  required: false
  type: ["integer", "float"]
{% endconfiguration %}

For the above JSON payload examples, the `update` entity configuration should look like this:

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
  - update:
      name: "Amazing Device Update"
      title: "Device Firmware"
      state_topic: "amazing-device/state-topic"
      device_class: "firmware"
      command_topic: "amazing-device/command"
      payload_install: "install"
```

{% endraw %}

If the device/service sends data as JSON but the schema differs, `value_template` can be use to reformat the JSON.

{% raw %}

```json
{
  "installed_ver": "2022.11",
  "new_ver": "2022.12"
}
```

{% endraw %}

For the above JSON payload, the `update` entity configuration should look like this:

{% raw %}

```yaml
# Example configuration.yaml entry
mqtt:
   update:
      name: "Amazing Device Update"
      title: "Device Firmware"
      state_topic: "amazing-device/state-topic"
      value_template: "{{ {'installed_version': value_json.installed_ver, 'latest_version': value_json.new_ver } | to_json }}"
      device_class: "firmware"
      command_topic: "amazing-device/command"
      payload_install: "install"
```

{% endraw %}
