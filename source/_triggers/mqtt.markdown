---
title: "MQTT message received"
trigger: mqtt
domain: mqtt
description: "Triggers when a message is received on an MQTT topic."
related_triggers:
  - event
  - state
---

The **MQTT message received** trigger fires when a message arrives on an [MQTT](/integrations/mqtt/) topic. Use it to react to devices or services that publish messages over MQTT, such as a sensor that reports a value or a button that sends a message when pressed.

You can react to every message on a topic, or only to messages with a specific payload.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select **MQTT message received**.
5. In **Topic**, enter the MQTT topic to listen to.
6. Optional: In **Payload**, enter the payload the message must have. Leave it empty to trigger on every message on the topic.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Topic:
  description: The MQTT topic to listen to.
  required: true
Payload:
  description: The payload the message must have. If you leave it empty, any message on the topic starts the automation.
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

- This trigger needs the [MQTT integration](/integrations/mqtt/) to be set up and connected to your MQTT broker.
- The templates in `topic` and `payload` are evaluated only when the trigger is set up. They are not re-evaluated for every incoming message.
- `value_template` is evaluated for every incoming message on the topic.
- The UI shows **Topic** and **Payload**. To use `value_template`, `encoding`, or `qos`, edit the trigger in YAML.

{% include triggers/try_it.md %}

For this trigger, there is no target entity to change. To test it, publish a message to the topic. You can do this from the MQTT integration: go to {% my integrations title="**Settings** > **Devices & services**" %}, select **MQTT**, and select {% icon "mdi:cog-outline" %} **Configure** next to your broker. Under **Publish a packet**, enter the topic and payload, and select **Publish**.

{% include triggers/stuck.md %}

{% include triggers/related.md %}
