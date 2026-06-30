---
title: "Reset reminder"
action: smarttub.reset_reminder
domain: smarttub
description: "Resets a maintenance reminder on a hot tub."
---

Use this action to reset a maintenance reminder on your hot tub, setting when the next reminder should trigger.

{% include actions/ui_header.md %}

To reset a reminder from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SmartTub: Reset a reminder**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your hot tub's reminder binary sensor.
7. Enter the number of **Days** until the next reminder.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Days:
  description: The number of days until the next reminder triggers. Must be between 30 and 365.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `smarttub.reset_reminder`. A basic example looks like this:

{% example %}
action: |
  action: smarttub.reset_reminder
  target:
    entity_id: binary_sensor.jacuzzi_j_335_refresh_water_reminder
  data:
    days: 180
{% endexample %}

This resets the reminder so it triggers again in 180 days.

### Options in YAML

{% options_yaml %}
days:
  description: >
    The number of days until the next reminder triggers. Must be between 30
    and 365.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="binary_sensor" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reset the reminder after refreshing the water

When you mark the water as refreshed, here by pressing a button helper, reset the reminder so it triggers again in 180 days.

- **Trigger**: The water refreshed button is pressed
- **Action**: SmartTub: Reset a reminder

{% details "YAML example for resetting the reminder after refreshing the water" %}

{% example %}
automation: |
  alias: "Reset hot tub reminder after water change"
  triggers:
    - trigger: state
      entity_id: input_button.hot_tub_water_refreshed
  actions:
    - action: smarttub.reset_reminder
      target:
        entity_id: binary_sensor.jacuzzi_j_335_refresh_water_reminder
      data:
        days: 180
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
