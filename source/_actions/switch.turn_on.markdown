---
title: "Turn on switch"
action: switch.turn_on
domain: switch
description: "Turns a switch on."
related_actions:
  - switch.turn_off
  - switch.toggle
---

Use this action to turn a switch on. A switch {% term entity %} represents something with a simple on and off state, such as a smart plug, a wall outlet, a relay, or a feature of a device that you can enable and disable.

If the switch is already on, running this action does not change anything.

{% include actions/ui_header.md %}

To turn on a switch from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the switch you want to turn on. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Turn on switch**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switch.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: switch.turn_on
  target:
    entity_id: switch.coffee_machine
{% endexample %}

This turns on the `switch.coffee_machine` entity.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- Switches only have an on and an off state. If you want to control brightness or color, use a light entity and the [Turn on light](/actions/light.turn_on/) action instead.
- Some devices expose their settings as switches. Turning such a switch on enables that setting on the device.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start the coffee machine in the morning

Turn on the smart plug that powers the coffee machine so it's ready when you get up.

- **Trigger**: Time: 06:45
- **Action**: Turn on switch
  - **Target**: Coffee machine

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Start the coffee machine in the morning"
    triggers:
      - trigger: time
        at: "06:45:00"
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.coffee_machine
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
