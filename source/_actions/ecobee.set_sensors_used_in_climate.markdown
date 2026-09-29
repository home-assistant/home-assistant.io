---
title: "Set sensors used in climate"
action: ecobee.set_sensors_used_in_climate
domain: ecobee
description: "Sets which sensors participate in a climate program on an ecobee thermostat."
related_actions:
  - ecobee.set_occupancy_modes
  - ecobee.resume_program
---

The **Set sensors used in climate** action sets which sensors participate in a climate program on an ecobee thermostat.

This is handy when you want different rooms to influence the temperature depending on the program, for example using bedroom sensors for the Sleep program and living room sensors for the Home program.

{% include actions/ui_header.md %}

To set the sensors used in a climate program from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the ecobee thermostat you want to change.
6. From the actions shown for that target, select **ecobee: Set sensors used in climate**.
7. Select the **Sensors** to participate. Optionally, set the **Climate program**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sensors:
  description: The sensors to set as participating in the climate program.
  required: true
Climate program:
  description: The name of the climate program to set the sensors active on. Defaults to the currently active program.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ecobee.set_sensors_used_in_climate`. A basic example looks like this:

{% example %}
action: |
  action: ecobee.set_sensors_used_in_climate
  target:
    entity_id: climate.living_room
  data:
    preset_mode: "Home"
    device_ids:
      - 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d
{% endexample %}

This sets the given sensors as participating in the `Home` program on `climate.living_room`.

### Options in YAML

{% options_yaml %}
device_ids:
  description: >
    The device IDs of the sensors to set as participating in the climate
    program.
  required: true
  type: list
preset_mode:
  description: >
    The name of the climate program to set the sensors active on. Defaults to
    the currently active program.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
