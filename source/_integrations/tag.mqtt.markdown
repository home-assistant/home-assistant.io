---
title: "MQTT Tag Scanner"
description: "Instructions on how to integrate MQTT scanner within Home Assistant."
ha_category:
  - Tag Scanner
ha_release: 0.116
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` tag scanner platform uses an MQTT message payload to generate tag scanned events.

## Configuration

MQTT scanners are only supported through [MQTT discovery](/docs/mqtt/discovery/), manual setup through `configuration.yaml` is not supported.
The discovery topic needs to be: `<discovery_prefix>/tag/[<node_id>/]<object_id>/config`.

{% configuration %}
topic:
  description: The MQTT topic subscribed to receive tag scanned events.
  required: true
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) that returns a tag ID."
  required: false
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
    sw_version:
      description: The firmware version of the device.
      required: false
      type: string
    via_device:
      description: 'Identifier of a device that routes messages between this device and Home Assistant. Examples of such devices are hubs, or parent devices of a sub-device. This is used to show device topology in Home Assistant.'
      required: false
      type: string
{% endconfiguration %}

## Examples

In this section, you will find some real-life examples of how to use this sensor.

### Full configuration with tag ID extracted from JSON data

This is an example of a configuration where the tag ID is extracted from a JSON formatted MQTT message.
To test, you can use the command line tool `mosquitto_pub` shipped with `mosquitto` or the `mosquitto-clients` package to send MQTT messages.

Discover the tag scanner:

```bash
mosquitto_pub -h 127.0.0.1 -t homeassistant/tag/0AFFD2/config -m '{"topic": "0AFFD2/tag_scanned", "value_template": "{{ value_json.PN532.UID }}"}'
```

Generate tag scanned event:

{% raw %}

```bash
mosquitto_pub -h 127.0.0.1 -t 0AFFD2/tag_scanned -m '{"Time":"2020-09-28T17:02:10","PN532":{"UID":"E9F35959", "DATA":"ILOVETASMOTA"}}'
```

{% endraw %}

