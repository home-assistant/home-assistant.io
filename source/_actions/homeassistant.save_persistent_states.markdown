---
title: "Save persistent states"
action: homeassistant.save_persistent_states
domain: homeassistant
description: "Saves the persistent states of entities immediately."
---

Use this action to save the persistent states of entities right away. Some entities restore their last value after a restart, and Home Assistant normally saves those values at startup, every 15 minutes, and at shutdown. A common use is to save them just before planned maintenance, so the most recent values are kept if you restart or power off.

Calling this action does not change the normal saving schedule. It just adds an extra checkpoint at the moment you call it.

{% include actions/ui_header.md %}

To save persistent states from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Save persistent states**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.save_persistent_states`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.save_persistent_states
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- Persistent states apply to entities that restore their last value after a restart.
- This action does not replace the normal saving schedule. Home Assistant still saves at startup, every 15 minutes, and at shutdown.

{% include actions/stuck.md %}

{% include actions/related.md %}
