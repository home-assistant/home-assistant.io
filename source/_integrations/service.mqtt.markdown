---
title: "MQTT Service"
description: "Instructions on how to interact with a device exposing custom services through MQTT from within Home Assistant."
ha_release: "2023.3"
ha_iot_class: Configurable
ha_domain: mqtt
---

The MQTT Service platform allows you to integrate devices that show capabilities that can be accessed though a custom service. This allows to expose capabilities that are not supported via an entity based platform. MQTT Services are only supported through via [MQTT discovery](/integrations/mqtt/#mqtt-discovery).
MQTT Services created can be used in automations and will, when called, publish an MQTT payload that can be based on the the service parameters using a `command_template`.

## Configuration

MQTT services are only supported through [MQTT discovery](/integrations/mqtt/#mqtt-discovery), manual setup through `configuration.yaml` is not supported.
The discovery topic needs to be: `<discovery_prefix>/service/[<node_id>/]<object_id>/config`.

{% configuration %}
command_template:
  description: Defines a [template](/docs/configuration/templating/#using-templates-with-the-mqtt-integration) to generate the payload to send to `command_topic` when the MQTT service is called. The supplied service parameters are available as variables.
  required: true
  type: template
command_topic:
  description: The MQTT topic to publish the rendered payload.
  required: true
  type: string
encoding:
  description: The encoding of the payload of published messages.
  required: false
  type: string
  default: "utf-8"
name:
  description: The name of the MQTT service. The service will get a name `mqtt.{name}`. If a service with that name already exists an error will be logged. The `name` cannot be set to `dump`, `publish` or `reload`, since these reserved for the built-in MQTT services. If the `name` is not set the service will get a name `mqtt.service_{node_id}`. The `node_id` is the `node_id` used in the discovery topic.
  required: false
  type: string
qos:
  description: The maximum QoS level set for published payloads.
  required: false
  type: integer
  default: 0
retain:
  description: If the published payload should have the retain flag on or not.
  required: false
  type: boolean
  default: false
schema:
  description: Provides the schema for the service parameters.
  required: false
  type: list
  keys:
    name:
      description: Then `name` of the field to identify the parameter exposed in variables passed to the `command_template`.
      required: true
      type: string
    type:
      description: The `type` of the parameter that is to be used. It must be set to a [supported service parameter type](/integrations/service.mqtt/#service-parameter-types).
      required: true
      type: string
    description:
      description: The description of the parameter shown in the UI.
      required: false
      type: string
    example:
      description: The example text shown with the parameter. If not set a default suggestion is shown depending on `type`. The default example is shown in the table below.
      required: false
      type: string
    options:
      description: When a `select` or `dropdown` type is used, this provides the options shown. The list can be a simple list of strings or a list of `value` and `label` key pairs.
      required: false
      type: list
      keys:
        value:
          description: The value for the `option` that is expose to the `command_template` variables. Must be configured with label.
          required: false
          type: string
        label:
          description: The label shown in the UI for the `option`.  Must be configured with value.
          required: false
          type: string
    multiple:
      description: When a `select` or `dropdown` type is used, this option is set to allow multiple options to be selected.
      required: false
      type: boolean
      default: false
    custom_value:
      description: When a `select` or `dropdown` type is used, this option allows to set a value that is not in the list.
      required: false
      type: boolean
      default: false
    required:
      description: Makes the service parameter required.
      required: false
      type: boolean
      default: false
    exclusive:
      description: Makes the service parameter exclusive from other service parameters that have the same `exclusive` key set.
      required: false
      type: string
    inclusive:
      description: Makes the service parameter inclusive with other service parameters that have the same `inclusive` key set.
      required: false
      type: string
{% endconfiguration %}

## Service parameter types

The table below shows the available options for service parameter `type`.

`type` | Description | Returns | Example
---|---|---|---
`bool` | Option switch | `bool` | False
`dropdown` | Dropdown box | `list` |
`int` | Integer input | `int` | 42
`float` | Float input | `float` | 12.3
`string` | String input | `string` | Abc
`multiline` | Multiline input | `string` | Abc
`password` | Masked input | `string` | s3cretp@assw0rd
`select` | Listed select | `list` |

Service parameters will return `None` if they are not set.

<div class='note warning'>

Make sure that your topic matches exactly. `some-topic/` and `some-topic` are different topics.

</div>

## Examples

In the example we assume that MQTT discovery is enabled with a default `discovery_prefix`.

This is an example JSON payload of a discoverable MQTT Service item. For readability the the payload is expanded.
To enable a demo service the payload below be send to topic: `homeassistant/service/test123/config`. The `node_id` in this example is `test123`.

{% raw %}

```json
{
  "name": "Test service",
  "description": "Test service for a demo",
  "command_topic": "test/cmdservice",
  "command_template": "{\"message\": \"{{ message }}\", \"happy\": {{ happy }}, \"letter\": {{ letter }} \"color\": {{ color[0] }} }",
  "schema": [
    {
      "name": "message",
      "description": "Enter a text",
      "type": "string",
      "required": true
    },
    {
      "name": "happy",
      "description": "Select for happy mode",
      "type": "bool"
    },
    {
      "name": "letter",
      "description": "Select one or more letters",
      "type": "select",
      "example": "a",
      "multiple": true,
      "custom_value": true,
      "options": [
        "a",
        "b",
        "c"
      ]
    },
    {
      "name": "color",
      "description": "Select a color",
      "type": "dropdown",
      "example": "Red",
      "required": true,
      "options": [
        {
          "value": "r",
          "label": "Red"
        },
        {
          "value": "g",
          "label": "Green"
        },
        {
          "value": "b",
          "label": "Blue"
        }
      ]
    }
  ]
}
```

{% endraw %}
