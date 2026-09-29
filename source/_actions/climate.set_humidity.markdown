---
title: "Set thermostat target humidity"
action: climate.set_humidity
domain: climate
description: "Sets the target humidity of a climate device."
related_actions:
  - climate.set_temperature
  - climate.set_hvac_mode
---

Use this action to set the target humidity of a climate device, for example to keep a room at a comfortable humidity level.

{% include actions/ui_header.md %}

To set the target humidity from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to control.
6. From the actions shown for that target, select **Set thermostat target humidity**.
7. Set the **Humidity** you want to apply.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Humidity:
  description: The target humidity as a percentage.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.set_humidity`. A basic example looks like this:

{% example %}
action: |
  action: climate.set_humidity
  target:
    entity_id: climate.living_room
  data:
    humidity: 50
{% endexample %}

This sets the target humidity of `climate.living_room` to 50 percent.

### Options in YAML

{% options_yaml %}
humidity:
  description: The target humidity as a percentage.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action only works with climate devices that support setting a target humidity.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: raise humidity when the air gets dry

Set a climate device to a higher target humidity when the measured humidity drops too low.

- **Trigger**: Indoor humidity drops below 35 %
- **Action**: Set thermostat target humidity
  - **Target**: Living room thermostat
  - **Humidity**: 50

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Raise the living room humidity when the air gets dry"
    triggers:
      - trigger: numeric_state
        entity_id: sensor.living_room_humidity
        below: 35
    actions:
      - action: climate.set_humidity
        target:
          entity_id: climate.living_room
        data:
          humidity: 50
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
