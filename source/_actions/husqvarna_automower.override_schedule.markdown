---
title: "Override schedule"
action: husqvarna_automower.override_schedule
domain: husqvarna_automower
description: "Lets the mower either mow or park for a given duration, overriding all schedules."
related_actions:
  - husqvarna_automower.override_schedule_work_area
---

The **Override schedule** action lets your mower mow or park for a set duration, overriding all of its configured schedules for that time.

This is handy when you want a one-off change without touching your regular schedule, for example sending the mower out for an extra hour before guests arrive, or parking it while the kids play in the garden. The duration can be between 1 minute and 42 days.

{% include actions/ui_header.md %}

To override the schedule from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the mower you want to control.
6. From the actions shown for that target, select **Override schedule**.
7. Set the **Duration** and the **Override mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the override should last. Minimum 1 minute, maximum 42 days.
  required: true
Override mode:
  description: Whether the mower should mow or park during the override.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `husqvarna_automower.override_schedule`. A basic example looks like this:

{% example %}
action: |
  action: husqvarna_automower.override_schedule
  target:
    entity_id: lawn_mower.garden
  data:
    duration:
      days: 1
      hours: 12
      minutes: 30
    override_mode: mow
{% endexample %}

This sends `lawn_mower.garden` out to mow for one day, 12 hours, and 30 minutes, ignoring its schedules during that time.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long the override should last. Minimum 1 minute, maximum 42 days.
  required: true
  type: time
override_mode:
  description: >
    Whether the mower should mow or park during the override. One of mow or
    park.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="lawn_mower" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
