---
title: "Thermostat is heating"
condition: climate.is_heating
domain: climate
description: "Tests if one or more thermostats are heating."
related_conditions:
  - climate.is_on
  - climate.is_cooling
  - climate.is_drying
  - climate.is_hvac_mode
---

The **Thermostat is heating** condition passes when a thermostat {% term entity %} is actively heating. A thermostat set to heat mode does not necessarily run continuously. It cycles on and off to maintain the target temperature. Use **Thermostat is heating** to confirm the system is in an active heating cycle, rather than just set to heat mode and idle.

{% include conditions/ui_header.md %}

To use **Thermostat is heating** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in (like your living room or bedroom). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Thermostat is heating**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple thermostats are targeted.
7. Under **For at least**, set how long the thermostat must have been actively heating before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple thermostats are targeted, controls how results combine. Pick **Any** to pass if at least one targeted thermostat is actively heating, or **All** to pass only when every targeted thermostat is actively heating. Default is **Any**.
For at least:
  description: How long the thermostat must have been continuously heating before the condition passes. Default is zero (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Thermostat is heating** is referred to as `climate.is_heating`. A basic example looks like this:

{% example %}
condition: |
  condition: climate.is_heating
  target:
    entity_id: climate.bedroom
{% endexample %}

This passes when the bedroom thermostat is actively running the heater to warm the space.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    When multiple thermostats are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the thermostat must have been continuously heating before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- A thermostat can be set to heat mode but not actively heating if it has already reached its target temperature and is idling. Use [Thermostat is in HVAC mode](/conditions/climate.is_hvac_mode/) if you only care about the mode setting.
- Thermostats that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as actively heating. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted thermostat is unavailable.
- This condition checks the current action of the thermostat, not its mode. To check if a thermostat is simply on (any active mode) or off, use [Thermostat is on](/conditions/climate.is_on/) or [Thermostat is off](/conditions/climate.is_off/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: adjust ceiling fan when heating is active

When the bedroom thermostat is actively heating, slow down the ceiling fan to help push warm air down from the ceiling without creating a chill. This optimizes heat distribution only during active heating cycles.

- **Trigger**: State: Bedroom thermostat started heating
- **Condition**: Thermostat is heating
  - **Target**: Bedroom thermostat
- **Action**: Set fan speed to 30%

{% details "YAML example for adjusting fan during heating" %}

{% example %}
automation: |
  alias: "Adjust fan when heating"
  triggers:
    - trigger: state
      entity_id: climate.bedroom
      attribute: hvac_action
      to: "heating"
  conditions:
    - condition: climate.is_heating
      target:
        entity_id: climate.bedroom
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.bedroom_ceiling
      data:
        percentage: 30
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
