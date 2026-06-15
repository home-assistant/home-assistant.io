---
title: "Snooze reminder"
action: smarttub.snooze_reminder
domain: smarttub
description: "Temporarily suppresses a maintenance reminder on a hot tub."
---

Use this action to temporarily suppress a maintenance reminder on your hot tub for a number of days.

{% include actions/ui_header.md %}

To snooze a reminder from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SmartTub: Snooze a reminder**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your hot tub's reminder binary sensor.
7. Enter the number of **Days** to snooze the reminder.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Days:
  description: The number of days to snooze the reminder. Must be between 10 and 120.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `smarttub.snooze_reminder`. A basic example looks like this:

{% example %}
action: |
  action: smarttub.snooze_reminder
  target:
    entity_id: binary_sensor.jacuzzi_j_335_refresh_water_reminder
  data:
    days: 10
{% endexample %}

This snoozes the reminder for 10 days.

### Options in YAML

{% options_yaml %}
days:
  description: >
    The number of days to snooze the reminder. Must be between 10 and 120.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="binary_sensor" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
