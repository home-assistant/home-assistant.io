---
title: "Reload MQTT entities"
action: mqtt.reload
domain: mqtt
description: "Reloads MQTT entities from your YAML configuration."
related_actions:
  - mqtt.publish
  - mqtt.dump
---

Use this action to reload the MQTT entities you configured manually in YAML, without restarting Home Assistant. A common use is to apply your changes right after you edit MQTT entities in your {% term "`configuration.yaml`" %} file.

This action only reloads entities you set up through YAML. Entities that are added automatically through MQTT discovery are not affected.

{% include actions/ui_header.md %}

To reload MQTT entities from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mqtt.reload`. It takes no options:

{% example %}
action: |
  action: mqtt.reload
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- You usually run this action straight from {% my developer_services title="**Settings** > **Tools** > **Actions**" %} right after editing your MQTT entities, so you can see the result without a restart.
- When the reload finishes, Home Assistant fires an `event_mqtt_reloaded` event. You can use this event as an automation trigger.
- Only administrators can run this action.

{% include actions/stuck.md %}

{% include actions/related.md %}
