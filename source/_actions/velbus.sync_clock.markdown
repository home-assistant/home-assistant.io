---
title: "Sync clock"
action: velbus.sync_clock
domain: velbus
description: "Synchronizes the clock of the Velbus modules to the Home Assistant clock."
related_actions:
  - velbus.scan
  - velbus.set_memo_text
  - velbus.clear_cache
---

Use this action to synchronize the clock of your Velbus modules to the Home Assistant clock. This is the same as the **Sync clock** button in the VelbusLink software.

{% include actions/ui_header.md %}

To sync the clock from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Velbus: Sync clock**.
6. Select the **Config entry** for the Velbus connection you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Velbus connection to send the command to.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `velbus.sync_clock`:

{% example %}
action: |
  action: velbus.sync_clock
  data:
    config_entry: "01JGE8XB3MNPZFA836TTZ3KZ46"
{% endexample %}

This synchronizes the clock of the Velbus modules on the selected connection.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Velbus connection to send the command to.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
