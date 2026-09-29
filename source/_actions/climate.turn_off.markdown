---
title: "Turn off thermostat"
action: climate.turn_off
domain: climate
description: "Turns off a climate device."
related_actions:
  - climate.turn_on
  - climate.toggle
  - climate.set_hvac_mode
---

Use this action to turn off a climate device, such as a thermostat or air conditioner.

{% include actions/ui_header.md %}

To turn off a climate device from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the climate device you want to turn off.
6. From the actions shown for that target, select **Turn off thermostat**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `climate.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: climate.turn_off
  target:
    entity_id: climate.living_room
{% endexample %}

This turns off `climate.living_room`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with climate devices that support being turned off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off the thermostat when you leave

Turn off a climate device when nobody is home, for example to save energy.

- **Trigger**: Person leaves home
- **Action**: Turn off thermostat
  - **Target**: Living room thermostat

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn off the living room thermostat when you leave"
    triggers:
      - trigger: state
        entity_id: person.home_owner
        to: not_home
    actions:
      - action: climate.turn_off
        target:
          entity_id: climate.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
