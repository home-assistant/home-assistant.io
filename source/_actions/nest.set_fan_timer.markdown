---
title: "Set fan timer"
action: nest.set_fan_timer
domain: nest
description: "Sets the Nest thermostat fan to run for a specific duration."
related_actions:
  - climate.set_fan_mode
---

The **Set fan timer** action sets the fan to run for a specific duration. The SDM API supports a maximum duration of 12 hours.

{% include actions/ui_header.md %}

To set the fan timer from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Nest: Set fan timer**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in. You can also select a device or a specific entity.
7. Set the duration for the fan to run.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: "The duration the fan should run for. The maximum supported duration is 12 hours."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nest.set_fan_timer`. A basic example looks like this:

{% example %}
action: |
  action: nest.set_fan_timer
  target:
    entity_id: climate.upstairs
  data:
    duration:
      minutes: 15
{% endexample %}

This sets the upstairs thermostat fan to run for 15 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long the fan should run. Accepts a Home Assistant duration object with `hours`, `minutes`, and `seconds` keys, or an ISO 8601 duration string such as `"00:15:00"`. Maximum value is 12 hours (the SDM API limit).
  required: true
  type: time
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The SDM API supports a maximum duration of 12 hours.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: ventilate when CO2 levels are high

When a CO2 sensor crosses a threshold, run the fan to bring in fresh air until levels drop back to normal.

- **Trigger**: Numeric state: CO2 sensor above 1000 ppm
- **Action**: Nest: Set fan timer
   - **Target**: Living room thermostat
   - **Duration**: 30 minutes

{% details "YAML example for CO2-triggered ventilation" %}

{% example %}
automation: |
  alias: "Run fan when CO2 is high"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.living_room_co2
      above: 1000
  actions:
    - action: nest.set_fan_timer
      target:
        entity_id: climate.living_room
      data:
        duration:
          minutes: 30
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
