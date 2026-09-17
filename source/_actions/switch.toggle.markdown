---
title: "Toggle switch"
action: switch.toggle
domain: switch
description: "Toggles a switch on or off."
related_actions:
  - switch.turn_on
  - switch.turn_off
---

Use this action to flip a switch between on and off. It's handy when you want a single action that handles both directions, for example a button that controls a fan heater no matter what state it's in.

{% include actions/ui_header.md %}

To toggle a switch from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the switch you want to toggle. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Toggle switch**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switch.toggle`. A basic example looks like this:

{% example %}
action: |
  action: switch.toggle
  target:
    entity_id: switch.desk_lamp_plug
{% endexample %}

This flips `switch.desk_lamp_plug` from off to on, or from on to off.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- Because this action flips the current state, use it when you don't need to know in advance whether the switch is on or off.
- If you target several switches at once, each one is flipped individually. Switches that were on turn off, and switches that were off turn on.
- If you need a specific result, use [Turn on switch](/actions/switch.turn_on/) or [Turn off switch](/actions/switch.turn_off/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: use a wall button to toggle a smart plug

Let a physical button control a smart plug, whatever state the plug is in.

- **Trigger**: Event received
  - **Target**: Office button
  - **Event type**: Single press
- **Action**: Toggle switch
  - **Target**: Desk lamp plug

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the desk lamp plug with the wall button"
    triggers:
      - trigger: event.received
        target:
          entity_id: event.office_button
        options:
          event_type:
            - single_press
    actions:
      - action: switch.toggle
        target:
          entity_id: switch.desk_lamp_plug
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
