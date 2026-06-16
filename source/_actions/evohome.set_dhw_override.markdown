---
title: "Set DHW override"
action: evohome.set_dhw_override
domain: evohome
description: "Overrides the domestic hot water state, either indefinitely or for a set time."
related_actions:
  - evohome.set_zone_override
  - evohome.set_system_mode
---

Use this action to override the scheduled state of a <abbr title="domestic hot water">DHW</abbr> controller, for example to heat the water now rather than waiting for the next scheduled period. The override can be indefinite, or it can run for a set time after which the controller goes back to following its schedule.

{% include actions/ui_header.md %}

To override the hot water state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the hot water controller you want to override.
6. From the actions shown for that target, select **Set DHW override**.
7. Set the **State** and, optionally, a **Duration**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
State:
  description: Turn the hot water on to heat up to the setpoint, or off.
Duration:
  description: How long the override lasts before the controller returns to its schedule. If left empty, the override is indefinite. If set to zero, the override lasts until the next scheduled state change.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `evohome.set_dhw_override`. A basic example looks like this:

{% example %}
action: |
  action: evohome.set_dhw_override
  target:
    entity_id: water_heater.dhw_controller
  data:
    state: true
    duration: "02:00"
{% endexample %}

This heats the water for two hours, then lets the controller return to its schedule.

### Options in YAML

{% options_yaml %}
state:
  description: >
    Turn the hot water on (`true`) to heat up to the setpoint, or off
    (`false`).
  required: true
  type: boolean
  default: false
duration:
  description: >
    How long the override lasts before the controller returns to its
    schedule, up to 24 hours. If omitted, the override is indefinite. If set
    to zero, the override lasts until the next scheduled state change.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md domain="water_heater" %}

## Good to know

- Leave the duration empty for a permanent override that stays until you change it. Set a duration for a temporary override that reverts on its own.
- A duration of zero is a special case: the override lasts only until the next scheduled state change.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: heat the water when off-peak electricity starts

When your off-peak electricity rate begins, override the hot water on for two hours so it heats up while power is cheaper.

- **Trigger**: Off-peak tariff starts
- **Action**: Set DHW override on, for two hours

{% details "YAML example for heating water off-peak" %}

{% example %}
automation: |
  alias: "Heat water during off-peak hours"
  triggers:
    - trigger: state
      entity_id: binary_sensor.off_peak_tariff
      to: "on"
  actions:
    - action: evohome.set_dhw_override
      target:
        entity_id: water_heater.dhw_controller
      data:
        state: true
        duration: "02:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
