---
title: "Reload timers"
action: timer.reload
domain: timer
description: "Reloads timers from the YAML configuration."
related_actions:
  - timer.start
  - timer.change
---

The **Reload timers** action reloads timers that are configured in YAML without restarting Home Assistant. Use it after you update the `timer:` section in your {% term "`configuration.yaml`" %} file.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. From the available actions, select **Reload timers**.
6. Select **Save**.

### Options in the UI

{% options_ui %}
No options:
  description: This action has no additional options in the UI.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.reload`. A basic example looks like this:

{% example %}
action: |
  action: timer.reload
{% endexample %}

This reloads all timers that are configured in YAML.

### Options in YAML

{% options_yaml %}
No options:
  description: This action has no additional YAML options.
{% endoptions_yaml %}

## Targets of the action

This action does not use a target. It reloads all timers that are configured in YAML.

## Good to know

- This action applies only to timers configured in YAML.
- If you create and manage timers only from the UI, you do not need this action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reload YAML timers after Home Assistant starts

If you manage timers in YAML, you can reload them automatically after Home Assistant starts.

- **Trigger**: Home Assistant starts
- **Action**: Reload timers

{% details "YAML example for reloading YAML timers at startup" %}

{% example %}
automation: |
  alias: "Reload YAML timers after Home Assistant starts"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: timer.reload
{% endexample %}

{% enddetails %}

### Automation: reload YAML timers during a nightly maintenance window

If you update YAML files from version control or another process, you can reload timers on a schedule.

- **Trigger**: Time: 03:00
- **Action**: Reload timers

{% details "YAML example for reloading YAML timers on a schedule" %}

{% example %}
automation: |
  alias: "Reload YAML timers during nightly maintenance"
  triggers:
    - trigger: time
      at: "03:00:00"
  actions:
    - action: timer.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
