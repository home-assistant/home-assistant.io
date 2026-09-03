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

Select the configuration entry you want to reload, and Home Assistant reloads just that entry.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To reload a configuration entry from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Reload config entry**.
6. For **Config entry ID**, select the configuration entry you want to reload.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Config entry ID:
  description: The configuration entry to reload.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.reload_config_entry`. To reload a configuration entry by its ID:

{% example %}
action: |
  action: homeassistant.reload_config_entry
  data:
    entry_id: "8d1f3a2b9c4e5f60718293a4b5c6d7e8"
{% endexample %}

### Options in YAML

{% options_yaml %}
entry_id:
  description: The configuration entry to reload.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- Reloading briefly unloads the integration, so its entities are unavailable for a moment while it sets up again.

{% include actions/stuck.md %}

{% include actions/related.md %}
