---
title: "Turn off switch"
action: switch.turn_off
domain: switch
description: "Turns a switch off."
related_actions:
  - switch.turn_on
  - switch.toggle
---

Use this action to turn a switch off. A switch {% term entity %} represents something with a simple on and off state, such as a smart plug, a wall outlet, a relay, or a feature of a device that you can enable and disable.

If the switch is already off, running this action does not change anything.

{% include actions/ui_header.md %}

To turn off a switch from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the switch you want to turn off. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Turn off switch**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switch.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: switch.turn_off
  target:
    entity_id: switch.coffee_machine
{% endexample %}

This turns off the `switch.coffee_machine` entity.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- Turning off a smart plug cuts power to whatever is plugged into it. Keep that in mind for devices that need a clean shutdown, such as computers.
- Some devices expose their settings as switches. Turning such a switch off disables that setting on the device.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: switch off the heated towel rail when you leave

Turn the towel rail off when you leave the house, so it doesn't stay on all day.

- **Trigger**: State: Person leaves the home zone
- **Action**: Turn off switch
  - **Target**: Heated towel rail

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Switch off the towel rail when you leave"
    triggers:
      - trigger: state
        entity_id: person.paulus
        to: "not_home"
    actions:
      - action: switch.turn_off
        target:
          entity_id: switch.heated_towel_rail
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
