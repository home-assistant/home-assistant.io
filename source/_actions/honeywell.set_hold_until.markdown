---
title: "Set hold until"
action: honeywell.set_hold_until
domain: honeywell
description: "Sets a temporary hold on a Honeywell thermostat that ends at a given time."
related_actions:
  - climate.set_temperature
  - climate.set_preset_mode
---

The **Honeywell Total Connect Comfort (US): Set hold until** action sets a temporary hold on a Honeywell thermostat. The hold ends at the time of day you choose, and the thermostat then returns to its schedule without another command from Home Assistant.

{% include actions/ui_header.md %}

To set a temporary hold from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Honeywell Total Connect Comfort (US): Set hold until**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your thermostat is in. You can also select a device or a specific entity.
7. Set the time at which the hold ends under **Until**, and optionally a **Temperature**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Until:
  description: "The time of day at which the hold ends, on the thermostat's clock. Must be on a quarter hour."
  required: true
Temperature:
  description: "The target temperature during the hold, in the temperature unit Home Assistant is set to. If left empty, the thermostat keeps its current target temperature. Cannot be used while the thermostat is in auto mode."
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `honeywell.set_hold_until`. A basic example looks like this:

{% example %}
action: |
  action: honeywell.set_hold_until
  target:
    entity_id: climate.living_room
  data:
    until: "22:30:00"
    temperature: 70
{% endexample %}

This holds the living room thermostat at 70 °F until 22:30. After that, the thermostat follows its schedule again. The example assumes Home Assistant is set to Fahrenheit. The temperature is always given in the unit Home Assistant is set to, even if the thermostat displays a different one.

### Options in YAML

{% options_yaml %}
until:
  description: >
    The time of day at which the hold ends, on the thermostat's clock, in
    `HH:MM` or `HH:MM:SS` format. Must be on a quarter hour.
  required: true
  type: time
temperature:
  description: >
    The target temperature during the hold, in the temperature unit Home
    Assistant is set to. If omitted, the thermostat keeps its current target
    temperature. Cannot be used while the thermostat is in auto mode.
  required: false
  type: float
{% endoptions_yaml %}

{% include actions/targets.md entity_type="Honeywell thermostat" example="climate.living_room" %}

## Good to know

- The end time is a time of day on the thermostat's clock, not a duration, and must be on a quarter hour, such as `22:15` or `22:30`. Other times are rejected.
- The action fails when the thermostat is turned off.
- To end the hold before the chosen time, set the preset of the thermostat to `none` with the `climate.set_preset_mode` action.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: keep the house warmer for the evening

Raise the temperature in the early evening and let the thermostat go back to its schedule at bedtime, without a second automation to undo it. The temperature in this example is in Fahrenheit.

- **Trigger**: Time, 18:00
- **Action**: Honeywell Total Connect Comfort (US): Set hold until
  - **Target**: Living room thermostat
  - **Until**: `22:00`
  - **Temperature**: `70`

{% details "YAML example for an evening hold" %}

{% example %}
automation: |
  alias: "Hold a warmer temperature for the evening"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: honeywell.set_hold_until
      target:
        entity_id: climate.living_room
      data:
        until: "22:00:00"
        temperature: 70
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
