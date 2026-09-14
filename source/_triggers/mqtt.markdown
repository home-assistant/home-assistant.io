---
title: "MQTT"
trigger: mqtt
domain: mqtt
description: "Triggers when Home Assistant receives a message on an MQTT topic."
related_triggers:
  - event
  - state
---

The **MQTT** trigger fires an automation when Home Assistant receives a message on a specific MQTT topic. Use it when a device or service publishes MQTT messages that you want to use in an automation, and the device is not already represented by an entity.

{% note %}
This trigger listens directly to an MQTT topic. It is different from [MQTT device triggers](/integrations/device_trigger.mqtt/), which are discovered as part of an MQTT device and appear as device triggers in the automation editor.
{% endnote %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Search for and select **MQTT**.
5. In **Topic**, enter the MQTT topic to listen to.
6. Optional: In **Payload (optional)**, enter the payload that must match before the trigger fires.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Topic:
  description: The MQTT topic to listen to.
  required: true
Payload (optional):
  description: Optional payload that must match before the trigger fires. If omitted, the trigger fires for any message on the topic.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, use `trigger: mqtt`. A basic example looks like this:

<!-- Disable terminology test, because the MQTT trigger key is lowercase. -->
<!-- textlint-disable terminology -->

{% example %}
trigger: |
  trigger: mqtt
  topic: "living_room/switch/action"
  payload: "single"
{% endexample %}

<!-- textlint-enable terminology -->

This runs when Home Assistant receives `single` on the `living_room/switch/action` topic.

### Options in YAML

{% options_yaml %}
trigger:
  description: The trigger type. For this trigger, use `mqtt`.
  required: true
  type: string
topic:
  description: The MQTT topic to listen to. This option supports limited templates.
  required: true
  type: string
payload:
  description: Optional payload that must match before the trigger fires. This option supports limited templates. If omitted, the trigger fires for any message on the topic.
  required: false
  type: string
value_template:
  description: Optional template that processes the incoming payload before Home Assistant compares it with `payload`.
  required: false
  type: template
encoding:
  description: The payload encoding. To work with binary payloads, set this to an empty string.
  required: false
  type: string
  default: utf-8
qos:
  description: "The maximum quality of service level to use: 0 (at most once), 1 (at least once), or 2 (exactly once)."
  required: false
  type: integer
  default: 0
{% endoptions_yaml %}

You can use `trigger_variables` with limited templates in `topic` or `payload`. This can be useful in blueprints or automations where the MQTT topic is built from variables.

<!-- Disable terminology test, because the MQTT trigger key is lowercase. -->
<!-- textlint-disable terminology -->

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

<!-- textlint-enable terminology -->

## Good to know

- If you do not set **Payload** (`payload`), the trigger fires for any message on the configured topic.
- The `topic` and `payload` options support [limited templates](/docs/templating/where-to-use/#limited-templates). These templates are evaluated when the trigger is set up. They are not re-evaluated for each incoming MQTT message.
- By default, MQTT payloads are decoded as `utf-8`. If the payload is binary data, such as an image or another byte payload, set `encoding` to an empty string in YAML.
- If the incoming payload contains valid JSON, the trigger data includes `trigger.payload_json`.

{% include triggers/try_it.md %}

To test this trigger, publish a message to the same topic from {% my developer_services title="**Settings** > **Tools** > **Actions**" %} with the **Publish an MQTT message** action.

{% include triggers/more_examples.md %}

### Automation: toggle a light from an MQTT button

If a button or remote publishes an MQTT message when you press it, this automation toggles a light when Home Assistant receives the matching payload.

- **Trigger**: MQTT
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

- **Trigger**: MQTT
  - **Topic**: `living_room/remote`
  - **Value template**: `{{ value_json.action }}`
  - **Payload**: `single`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying from a JSON MQTT message" %}

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

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
