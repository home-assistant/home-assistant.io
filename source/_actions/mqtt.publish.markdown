---
title: "Publish an MQTT message"
action: mqtt.publish
domain: mqtt
description: "Publishes a message to an MQTT topic."
related_actions:
  - mqtt.dump
  - mqtt.reload
---

Use this action to publish a message to an MQTT topic. A common use is to send a command to a device that listens on MQTT, for example switching a light or relay, or to publish a value other systems can subscribe to.

{% include actions/ui_header.md %}

To publish a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Publish**.
6. Enter the **Topic** to publish to.
7. Optionally, enter the **Payload** to send. Under **Publish options**, you can also set the quality of service, the retain flag, and other options.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Topic:
  description: The topic to publish the message to.
Payload:
  description: The message to publish. When you leave this empty, an empty message is published.
  required: false
Evaluate payload:
  description: When the payload is a Python bytes literal, evaluate it and publish the raw data. Off by default.
  required: false
QoS:
  description: "The quality of service to use: 0 (at most once), 1 (at least once), or 2 (exactly once). The default is 0."
  required: false
Retain:
  description: When turned on, the broker stores the most recent message on the topic and sends it to new subscribers. Off by default.
  required: false
Message Expiry Interval:
  description: How long the broker keeps the message before it expires, in seconds. Only supported with MQTT protocol version 5.0.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mqtt.publish`. A basic example looks like this:

{% example %}
action: |
  action: mqtt.publish
  data:
    topic: "homeassistant/light/1/command"
    payload: "ON"
{% endexample %}

### Options in YAML

{% options_yaml %}
topic:
  description: The topic to publish the message to.
  required: true
  type: string
payload:
  description: The message to publish. When omitted, an empty message is published.
  required: false
  type: string
evaluate_payload:
  description: When the payload is a Python bytes literal, evaluate it and publish the raw data.
  required: false
  type: boolean
  default: false
qos:
  description: "The quality of service to use: 0 (at most once), 1 (at least once), or 2 (exactly once)."
  required: false
  type: integer
  default: 0
retain:
  description: When set, the broker stores the most recent message on the topic and sends it to new subscribers.
  required: false
  type: boolean
  default: false
message_expiry_interval:
  description: How long the broker keeps the message before it expires, in seconds. Only supported with MQTT protocol version 5.0.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- The payload must be a string. The MQTT integration supports [templates](/docs/templating/where-to-use/#mqtt), so you can build the payload from the state of your entities.
- To publish JSON, format and escape it as a string. A folded block keeps it readable:

  ```yaml
  topic: "homeassistant/light/1/state"
  payload: >-
    {"Status": "off", "Data": "something"}
  ```

- When the payload is a Python bytes literal and you want to publish raw data instead of text, turn on **Evaluate payload**.
- Publishing an empty message with **Retain** turned on clears a previously retained message on that topic.

{% include actions/more_examples.md %}

### Automation: turn on a device when you get home

Send a command to a device over MQTT as soon as you arrive home.

- **Trigger**: You arrive home
- **Action**: Publish an MQTT message

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Turn on the porch light when I get home"
  triggers:
    - trigger: state
      entity_id: person.me
      to: "home"
  actions:
    - action: mqtt.publish
      data:
        topic: "homeassistant/light/porch/command"
        payload: "ON"
        retain: true
{% endexample %}

{% enddetails %}

### Publish an MQTT discovery configuration

You can use this action to set up a device through [MQTT discovery](/integrations/mqtt/#mqtt-discovery) by publishing a configuration message. The example below sets up a temperature sensor.

{% details "Show example YAML" %}

{% example %}
action: |
  action: mqtt.publish
  data:
    topic: "homeassistant/sensor/bathroom_temperature/config"
    payload: >-
      {"device_class": "temperature",
      "unit_of_measurement": "\u00b0C",
      "value_template": "{{ value | float }}",
      "state_topic": "sensors/bathroom/temperature",
      "unique_id": "bathroom_temperature",
      "device": {
      "identifiers": "bathroom_sensor",
      "name": "Bathroom",
      "manufacturer": "rtl_433" }
      }
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
