---
title: "Boost a Matter water heater"
action: matter.water_heater_boost
domain: matter
description: "Enables boost mode on a Matter water heater for a set duration."
---

Use this action to turn on boost mode on a Matter water heater for a set period. A common use is to heat extra water ahead of time, for example before everyone gets up for a morning shower.

{% include actions/ui_header.md %}

To boost a water heater from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the water heater you want to boost.
6. From the actions shown for that target, select **Boost a Matter water heater**.
7. Set the **Duration** of the boost.
8. Optionally, turn on **Emergency boost** or set a **Temporary setpoint** for the boost period.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the boost runs, in seconds. For example, enter 3600 for one hour.
Emergency boost:
  description: Heat the water as quickly as possible for the duration of the boost. Off by default.
  required: false
Temporary setpoint:
  description: The target temperature to use during the boost, in degrees Celsius. Must be between 30 and 65.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `matter.water_heater_boost`. A basic example looks like this:

{% example %}
action: |
  action: matter.water_heater_boost
  target:
    entity_id: water_heater.hot_water
  data:
    duration: 3600
{% endexample %}

### Options in YAML

{% options_yaml %}
duration:
  description: How long the boost runs, in seconds. For example, 3600 for one hour.
  required: true
  type: integer
emergency_boost:
  description: Heat the water as quickly as possible for the duration of the boost.
  required: false
  type: boolean
  default: false
temporary_setpoint:
  description: The target temperature to use during the boost, in degrees Celsius. Must be between 30 and 65.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

{% include actions/more_examples.md %}

### Automation: boost hot water before the morning shower

Heat extra water shortly before your household gets up, so there is plenty of hot water ready.

- **Trigger**: Every day at 06:00
- **Action**: Boost a Matter water heater

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Boost hot water in the morning"
  triggers:
    - trigger: time
      at: "06:00:00"
  actions:
    - action: matter.water_heater_boost
      target:
        entity_id: water_heater.hot_water
      data:
        duration: 3600
{% endexample %}

{% enddetails %}

## Good to know

- Boost mode runs for the duration you set and then stops on its own. You do not need to turn it off manually.

{% include actions/stuck.md %}

{% include actions/related.md %}
