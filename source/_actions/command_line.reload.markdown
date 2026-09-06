---
title: Reload Command Line
action: command_line.reload
domain: command_line
description: "Reloads the Command Line configuration from your YAML configuration."
---

The **Reload Command Line** action reloads all Command Line entities from your YAML configuration. Use it after you change your Command Line setup in `configuration.yaml` and want Home Assistant to apply those changes without a restart.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reload Command Line**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `command_line.reload`:

{% example %}
action: |
  action: command_line.reload
{% endexample %}

This reloads all Command Line entities defined in your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- This action reloads every Command Line sensor, binary sensor, cover, switch, and notify entity defined in your YAML configuration.
- Because all Command Line entities are configured in YAML, there are no UI-managed entities to worry about.
- If you have not changed your YAML, running this action does not make any visible changes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reload after editing your YAML

If you edit your Command Line configuration and toggle a helper to apply the change, you can reload without restarting Home Assistant.

- **Trigger**: A user-created helper turns on
- **Action**: Reload Command Line

{% details "YAML example for reloading Command Line from a helper" %}

{% example %}
automation: |
  alias: "Reload Command Line from a helper"
  triggers:
    - trigger: state
      entity_id: input_boolean.reload_command_line
      to: "on"
  actions:
    - action: command_line.reload
    - action: input_boolean.turn_off
      target:
        entity_id: input_boolean.reload_command_line
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
