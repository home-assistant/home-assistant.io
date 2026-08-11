---
title: "Reload config entry"
action: homeassistant.reload_config_entry
domain: homeassistant
description: "Reloads an integration's config entry without restarting Home Assistant."
related_actions:
  - homeassistant.reload_all
  - homeassistant.update_entity
---

Use this action to reload a single integration's configuration entry. Reloading unloads and sets the entry up again, which is a quick way to recover an integration that has stopped responding without restarting all of Home Assistant. A common use is to reconnect an integration after its device or service was briefly unavailable.

You can point this action at a target, such as an entity, a device, or an area, and Home Assistant reloads the configuration entries behind it. You can also provide a config entry ID directly. If you provide both, Home Assistant reloads the combined set of entries.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To reload a configuration entry from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload config entry**.
6. Under **Targets** (see [Targets](#targets)), select an entity, device, or area that belongs to the integration you want to reload. As an alternative, set **Config entry ID** to reload a specific entry.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Config entry ID:
  description: The configuration entry to reload. Use this instead of, or together with, a target.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.reload_config_entry`. To reload the configuration entry behind an entity:

{% example %}
action: |
  action: homeassistant.reload_config_entry
  target:
    entity_id: sensor.living_room_temperature
{% endexample %}

To reload a specific configuration entry by its ID:

{% example %}
action: |
  action: homeassistant.reload_config_entry
  data:
    entry_id: "8d1f3a2b9c4e5f60718293a4b5c6d7e8"
{% endexample %}

### Options in YAML

{% options_yaml %}
entry_id:
  description: The configuration entry to reload. Use this instead of, or together with, a target.
  required: false
  type: string
{% endoptions_yaml %}

You must provide a target, a configuration entry ID, or both.

<a id="targets"></a>

## Targets of the action

The target tells Home Assistant which configuration entries to reload. You can point the action at a single entity, a device, an area, a floor, or a label, and Home Assistant reloads the configuration entry behind every matching item.

- **Entity**: the configuration entry behind one specific entity.
- **Device**: the configuration entries behind a device.
- **Area**: the configuration entries behind every device and entity in an area.
- **Floor**: the configuration entries behind everything on a floor.
- **Label**: the configuration entries behind everything that shares a label.

You can combine a target with a configuration entry ID. Home Assistant then reloads the combined set of entries.

## Good to know

- Reloading briefly unloads the integration, so its entities are unavailable for a moment while it sets up again.

{% include actions/stuck.md %}

{% include actions/related.md %}
