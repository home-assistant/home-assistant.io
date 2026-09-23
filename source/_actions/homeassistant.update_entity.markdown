---
title: "Update entity"
action: homeassistant.update_entity
domain: homeassistant
description: "Forces one or more entities to refresh their data right away."
related_actions:
  - homeassistant.reload_config_entry
---

Use this action to force one or more entities to refresh their data immediately, instead of waiting for their next scheduled update. A common use is to get a fresh reading from a sensor that only polls every few minutes, for example right before an automation reads its value.

This action only asks the entity to update now. It does not change how often the entity updates on its own.

{% include actions/ui_header.md %}

To update an entity from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Update entity**.
6. Under **Entities to update**, select one or more entities to refresh.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entities to update:
  description: One or more entities to refresh right away.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.update_entity`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.update_entity
  data:
    entity_id:
      - sensor.outdoor_temperature
      - sensor.living_room_humidity
{% endexample %}

### Options in YAML

{% options_yaml %}
entity_id:
  description: One or more entities to refresh right away.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- This action requests an immediate update. The entity's normal update schedule continues unchanged.
- Some entities do not poll for data on a schedule. For those, this action has no effect.

{% include actions/stuck.md %}

{% include actions/related.md %}
