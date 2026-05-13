---
title: Reload persons
action: person.reload
domain: person
description: "Reloads persons from the YAML configuration."
---

The **Reload persons** action reloads person definitions from YAML. Use it after you change YAML-defined persons and want Home Assistant to apply those changes without a restart.

This action only reloads persons that are defined in YAML. It does not change people you manage from the UI.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reload persons**.
6. Select **Save**.

Select what you want to control. Under **By target**, there is nothing to select for this action because it reloads the `person` integration itself.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `person.reload`:

{% example %}
action: |
  action: person.reload
{% endexample %}

This reloads persons that are defined in YAML.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- This action reloads YAML-defined persons only.
- People you add or edit from the UI are not changed by this action.
- If you have not changed your YAML, running this action does not make any visible changes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reload YAML-defined persons from a helper

If you want a simple way to apply person changes from a dashboard, you can create a {% term helper %} separately and let it trigger this action.

- **Trigger**: A user-created helper turns on
- **Action**: Reload persons

{% details "YAML example for reloading persons from a helper" %}

{% example %}
automation: |
  alias: "Reload persons from a helper"
  triggers:
    - trigger: state
      entity_id: input_boolean.reload_persons
      to: "on"
  actions:
    - action: person.reload
    - action: input_boolean.turn_off
      target:
        entity_id: input_boolean.reload_persons
{% endexample %}

{% enddetails %}

### Automation: reload YAML-defined persons after a scheduled sync

If another process updates your person YAML before a set time, you can schedule this action so Home Assistant picks up those changes automatically.

- **Trigger**: A scheduled time
- **Action**: Reload persons

{% details "YAML example for reloading persons after a scheduled sync" %}

{% example %}
automation: |
  alias: "Reload persons after nightly YAML sync"
  triggers:
    - trigger: time
      at: "03:05:00"
  actions:
    - action: person.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
