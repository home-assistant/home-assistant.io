---
title: "Export MQTT messages"
action: mqtt.dump
domain: mqtt
description: "Writes all messages on a topic to a file for debugging."
related_actions:
  - mqtt.publish
  - mqtt.reload
---

Use this action to capture every message published on a topic and write them to a file. A common use is to debug a device or integration, so you can see exactly what it sends over MQTT.

The messages are written to the `mqtt_dump.txt` file in your configuration folder. Home Assistant listens for the duration you set, then writes the collected messages to the file.

{% include actions/ui_header.md %}

To export messages from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Export**.
6. Enter the **Topic** to listen to. You can use a wildcard, like `zigbee2mqtt/#`.
7. Optionally, set the **Duration** to listen for, in seconds.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Topic:
  description: The topic to listen to. You can use a wildcard, such as `#` or `+`, to capture messages from multiple topics.
Duration:
  description: How long to listen for messages, in seconds. By default, Home Assistant listens for 5 seconds.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mqtt.dump`. A basic example looks like this:

{% example %}
action: |
  action: mqtt.dump
  data:
    topic: zigbee2mqtt/#
{% endexample %}

### Options in YAML

{% options_yaml %}
topic:
  description: The topic to listen to. You can use a wildcard, such as `#` or `+`, to capture messages from multiple topics.
  required: true
  type: string
duration:
  description: How long to listen for messages, in seconds. By default, Home Assistant listens for 5 seconds.
  required: false
  type: integer
  default: 5
{% endoptions_yaml %}

## Good to know

- This action is mainly a debugging tool. You usually run it from {% my developer_services title="**Settings** > **Tools** > **Actions**" %} when you want to inspect what a device sends.
- The collected messages are written to the `mqtt_dump.txt` file in your configuration folder. Each run overwrites the previous file.

{% include actions/stuck.md %}

{% include actions/related.md %}
