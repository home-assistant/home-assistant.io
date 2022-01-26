---
title: "MQTT Notify service"
description: "Instructions on how to integrate MQTT notify service within Home Assistant."
ha_category:
  - Notify service
ha_release: 2022.3
ha_iot_class: Configurable
ha_domain: mqtt
---

The `mqtt` notify service uses MQTT to notify targets.

## Configuration

MQTT notify services are supported through [MQTT discovery](/docs/mqtt/discovery/), and manual setup through `configuration.yaml`.
The discovery topic needs to be: `<discovery_prefix>/notify/[<node_id>/]<object_id>/config`. This integration does not create entities like other `mqtt` platforms, it will register a notify service. A `device` context is only supported through MQTT discovery. The device will automatically be created, updated and removed following discovery updates. If a discovered device is removed from Home Assistant the corresponding service will be removed as well.

As alternative you can also choose to [publish notifications directly](/examples/notify.mqtt).

{% configuration %}
command_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to generate the payload to send to `command_topic`. The variable `value` will be assigned with the `message` parameter that was given when calling the notify service. The service parameters `message`, `name`, `service`, `title` and `target` can be used as variables in the template. Use the `data` service parameter to add additional variables.
  required: false
  type: template
command_topic:
  description: The MQTT topic to publish the notification message. To use `title`, `target` config or `data` service parameters in the payload, use `command_template` to format the payload.
  required: false
  type: string
device:
  description: "Information about the device this device trigger is a part of to tie it into the [device registry](https://developers.home-assistant.io/docs/en/device_registry_index.html). At least one of identifiers or connections must be present to identify the device."
  required: true
  type: map
  keys:
    configuration_url:
      description: 'A link to the webpage that can manage the configuration of this device. Can be either an HTTP or HTTPS link.'
      required: false
      type: string
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
name:
  description: "The name for the notify service. The name will be available as variable `name` in the `command_template`. The actual `service_name` will be derived from the name and cannot contain other then lowercase characters numbers and `_`. The notify service will be exposed as service `notify.{service_name}`. The `service_name` must be unique. If a service with the specified name already is registered, the setup will fail."
  required: false
  type: string
  default: "mqtt"
targets:
  description: An optional of list targets that are supported by the notify service. When configured additional services in the format `notify.{service_name}_{target}` will be registered to be able to notify the targets directly. When calling the base notify service `notify.{service_name}` the `target` parameter should can used to specify a list of addressed targets. The `target` (`list`) is available for use in the `command_template`. When a target parameter is not specified when calling the base notify service `notify.{service_name}` all configured targets will be included in the `target` variable.
  required: false
  type: list
title:
  description: The default title to be assigned to the `title` variable in `command_template`. If `title` is specified with the service call, this will override this default title.
  required: false
  type: string
  default: "Home Assistant"
{% endconfiguration %}

## Examples

In this section, you will find some real-life examples of how to use the notify service.

### Full configuration

The example below shows a full configuration for a MQTT notify service. The example will register a service `notify.intrusion_text_notification`, `notify.intrusion_text_notification_panel1` and `notify.intrusion_text_notification_panel2` that will publish at topic `home/alarm/notify/message`.

{% raw %}

```yaml
# Example configuration.yaml entry
notify:
  - platform: mqtt
    name: "Intrusion text notification"
    command_topic: "home/alarm/notify/message"
    command_template: "{{ title }}: {{ message }}"
    targets:
      - "panel1"
      - "panel2"
    title: "Intrusion detected"
    qos: 0
    retain: true
```

{% endraw %}
