---
title: "Override schedule work area"
action: husqvarna_automower.override_schedule_work_area
domain: husqvarna_automower
description: "Lets the mower mow for a given duration in a specified work area, overriding all schedules."
related_actions:
  - husqvarna_automower.override_schedule
---

The **Override schedule work area** action lets your mower mow a specific work area for a set duration, overriding all of its configured schedules for that time.

This is handy when you want to focus the mower on one part of the garden, for example mowing only the front lawn before a barbecue. The duration can be between 1 minute and 42 days. This action is available only on mowers that support work areas.

{% include actions/ui_header.md %}

To override the schedule for a work area from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the mower you want to control.
6. From the actions shown for that target, select **Override schedule work area**.
7. Set the **Duration** and the **Work area ID**.
8. Select **Save**.

You can find the work area ID on the **Work area** sensor of your mower.

![Work area sensor](/images/integrations/husqvarna_automower/work_area_sensor.png)

### Options in the UI

{% options_ui %}
Duration:
  description: How long the override should last. Minimum 1 minute, maximum 42 days.
  required: true
Work area ID:
  description: The work area the mower should mow. You can find it on the **Work area** sensor.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `husqvarna_automower.override_schedule_work_area`. A basic example looks like this:

{% example %}
action: |
  action: husqvarna_automower.override_schedule_work_area
  target:
    entity_id: lawn_mower.garden
  data:
    duration:
      days: 1
      hours: 12
      minutes: 30
    work_area_id: 123456
{% endexample %}

This sends `lawn_mower.garden` to mow work area `123456` for one day, 12 hours, and 30 minutes, ignoring its schedules during that time.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long the override should last. Accepts a Home Assistant duration object
    with `days`, `hours`, `minutes`, and `seconds` keys, or an ISO 8601 duration
    string like "00:15:00". Minimum 1 minute, maximum 42 days.
  required: true
  type: time
work_area_id:
  description: >
    The work area the mower should mow. You can find it on the **Work area**
    sensor.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="lawn_mower" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
