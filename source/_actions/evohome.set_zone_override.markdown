---
title: "Set zone override"
action: evohome.set_zone_override
domain: evohome
description: "Overrides a heating zone's setpoint, either indefinitely or for a set time."
related_actions:
  - evohome.set_dhw_override
  - evohome.set_system_mode
---

Use this action to override the scheduled temperature of a heating zone, for example to warm up the living room earlier than the schedule would. The override can be indefinite, or it can run for a set time after which the zone goes back to following its schedule.

{% include actions/ui_header.md %}

To override a zone's setpoint from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the heating zone you want to override.
6. From the actions shown for that target, select **Set zone override**.
7. Set the **Setpoint** and, optionally, a **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Setpoint:
  description: The temperature to use instead of the scheduled setpoint.
Duration:
  description: How long the override lasts before the zone returns to its schedule. If left empty, the override is indefinite. If set to zero, the override lasts until the next scheduled setpoint.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `evohome.set_zone_override`. A basic example looks like this:

{% example %}
action: |
  action: evohome.set_zone_override
  target:
    entity_id: climate.lounge_room
  data:
    setpoint: 19.5
    duration: "02:00"
{% endexample %}

This holds the lounge at 19.5 °C for two hours, then lets it return to its schedule.

### Options in YAML

{% options_yaml %}
setpoint:
  description: >
    The temperature to use instead of the scheduled setpoint, between 4 and
    35 °C.
  required: true
  type: float
duration:
  description: >
    How long the override lasts before the zone returns to its schedule, up
    to 24 hours. If omitted, the override is indefinite. If set to zero, the
    override lasts until the next scheduled setpoint.
  required: false
  type: time
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- Leave the duration empty for a permanent override that stays until you change it. Set a duration for a temporary override that reverts on its own.
- A duration of zero is a special case: the override lasts only until the next scheduled setpoint.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: warm the bathroom before the morning alarm

Half an hour before the weekday alarm, override the bathroom zone to a comfortable temperature, then let it return to its schedule.

- **Trigger**: Time, 06:00 on weekdays
- **Action**: Set zone override on the bathroom, with a higher setpoint for one hour

{% details "YAML example for warming the bathroom" %}

{% example %}
automation: |
  alias: "Warm the bathroom before the alarm"
  triggers:
    - trigger: time
      at: "06:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: evohome.set_zone_override
      target:
        entity_id: climate.bathroom
      data:
        setpoint: 21
        duration: "01:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
