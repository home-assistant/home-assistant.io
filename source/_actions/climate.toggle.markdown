---
title: "Toggle thermostat"
action: climate.toggle
domain: climate
description: "Toggles a climate device on or off."
related_actions:
  - climate.turn_on
  - climate.turn_off
  - climate.set_hvac_mode
---

Use this action to toggle a climate device, turning it on if it is off and off if it is on.

{% include actions/ui_header.md %}

To toggle a climate device from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to toggle.
6. From the actions shown for that target, select **Toggle thermostat**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.toggle`. A basic example looks like this:

{% example %}
action: |
  action: climate.toggle
  target:
    entity_id: climate.living_room
{% endexample %}

This toggles `climate.living_room` between on and off.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with climate devices that support being turned on and off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle the thermostat with a button

Toggle a climate device each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Toggle thermostat
  - **Target**: Living room thermostat

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the living room thermostat with a button"
    triggers:
      - trigger: state
        entity_id: input_button.toggle_thermostat
    actions:
      - action: climate.toggle
        target:
          entity_id: climate.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
