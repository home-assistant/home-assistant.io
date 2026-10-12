---
title: "MQTT message received"
trigger: mqtt
domain: mqtt
description: "Triggers when a message is received on an MQTT topic."
related_triggers:
  - event
  - state
---

The **MQTT message received** trigger fires an automation when Home Assistant receives a message on a specific MQTT topic. Use it when a device or service publishes MQTT messages that you want to use in an automation, and the device is not already represented by an entity.

{% note %}
This trigger listens directly to an MQTT topic. It is different from [MQTT device triggers](/integrations/device_trigger.mqtt/), which are discovered as part of an MQTT device and appear as device triggers in the visual automation editor.
{% endnote %}

## Prerequisites

The [MQTT integration](/integrations/mqtt/) must be set up and connected to your MQTT broker.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select **MQTT message received**.
5. Optional: Select **Payload** and enter the payload that must match before the trigger fires.
6. In **Topic**, enter the MQTT topic to listen to.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Topic:
  description: The MQTT topic to listen to.
  required: true
Payload:
  description: Optional payload that must match before the trigger fires. If omitted, the trigger fires for any message on the topic.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: mqtt`. A basic example looks like this:

{% example %}
trigger: |
  trigger: mqtt
  topic: "living_room/switch/ac"
  payload: "on"
{% endexample %}

This runs when the message `on` is received on the `living_room/switch/ac` topic.

If the message is JSON, use `value_template` to pick the part you want to compare with `payload`. The trigger below only fires when the message on `living_room/switch/ac` is valid JSON with a `state` key that has the value `on`.

{% example %}
trigger: |
  trigger: mqtt
  topic: "living_room/switch/ac"
  payload: "on"
  value_template: "{{ value_json.state }}"
{% endexample %}

You can use [limited templates](/docs/templating/where-to-use/#limited-templates) in `topic` and `payload`, for example with [trigger variables](/docs/automation/trigger/#trigger-variables).

{% example %}
automation: |
  trigger_variables:
    room: "living_room"
    node: "ac"
    value: "on"
  triggers:
    - trigger: mqtt
      topic: "{{ room ~ '/switch/' ~ node }}"
      payload: "{{ 'state:' ~ value }}"
{% endexample %}

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `mqtt`.
  required: true
  type: string
topic:
  description: The MQTT topic to listen to. Supports limited templates.
  required: true
  type: string
payload:
  description: The payload the message must have. If omitted, any message on the topic starts the automation. Supports limited templates.
  required: false
  type: string
value_template:
  description: A template that processes the received message before it is compared with `payload`. Use `value_json` to access a JSON message.
  required: false
  type: template
encoding:
  description: The encoding of the message payload. Set it to an empty string (`""`) to receive the raw bytes, for example for images.
  required: false
  type: string
  default: utf-8
qos:
  description: The MQTT quality of service level to subscribe with. Use `0`, `1`, or `2`.
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

## Good to know

- If you do not set **Payload** (`payload`), the trigger fires for any message on the configured topic.
- The `topic` and `payload` options support [limited templates](/docs/templating/where-to-use/#limited-templates). These templates are evaluated when the trigger is set up. They are not re-evaluated for each incoming MQTT message.
- By default, MQTT payloads are decoded as `utf-8`. If the payload is binary data, such as an image or another byte payload, set `encoding` to an empty string in YAML.
- If the incoming payload contains valid JSON, the trigger data includes `trigger.payload_json`.

## Try it yourself

For this trigger, there is no target entity to change. To test it, publish a message to the topic. You can do this from the MQTT integration: go to {% my integrations title="**Settings** > **Devices & services**" %}, select **MQTT**, and select {% icon "mdi:cog-outline" %} **Configure** next to your broker. Under **Publish a packet**, enter the topic and payload, and select **Publish**.

{% include triggers/more_examples.md %}

### Automation: toggle a light from an MQTT button

If a button or remote publishes an MQTT message when you press it, this automation toggles a light when Home Assistant receives the matching payload.

- **Trigger**: MQTT message received
  - **Topic**: `living_room/switch/action`
  - **Payload**: `single`
- **Action**: Toggle light

{% details "YAML example for toggling a light from an MQTT button" %}

<!-- Disable terminology test, because the MQTT trigger key is lowercase. -->
<!-- textlint-disable terminology -->

{% example %}
automation: |
  alias: "Toggle the living room light from an MQTT button"
  triggers:
    - trigger: mqtt
      topic: "living_room/switch/action"
      payload: "single"
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room
{% endexample %}

<!-- textlint-enable terminology -->

{% enddetails %}

### Automation: send a notification from a JSON MQTT message

If a device publishes JSON data, this automation uses a value template to read the `action` field before checking the payload. Set up this example in YAML because `value_template` is a YAML option.

- **Trigger**: MQTT message received
  - **Topic**: `living_room/remote`
  - **Payload**: `single`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

<!-- Disable terminology test, because the MQTT trigger key is lowercase. -->
<!-- textlint-disable terminology -->

{% example %}
automation: |
  alias: "Notify when the living room remote sends a single press"
  triggers:
    - trigger: mqtt
      topic: "living_room/remote"
      value_template: "{{ value_json.action }}"
      payload: "single"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The living room remote sent a single press."
{% endexample %}

<!-- textlint-enable terminology -->

{% include triggers/stuck.md %}

{% include triggers/related.md %}
