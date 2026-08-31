---
title: "Toggle automation"
action: automation.toggle
domain: automation
description: "Enables or disables an automation."
related_actions:
  - automation.turn_on
  - automation.turn_off
---

Use this action to flip an automation between enabled and disabled. If the automation is off, it turns on. If it's on, it turns off and anything it is running right now is stopped.

{% include actions/ui_header.md %}

To toggle an automation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the automation you want to toggle.
6. From the actions shown for that target, select **Toggle automation**.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `automation.toggle`. A basic example looks like this:

{% example %}
action: |
  action: automation.toggle
  target:
    entity_id: automation.motion_lights
{% endexample %}

This enables `automation.motion_lights` if it was off, and disables it if it was on.

{% include actions/targets.md %}

## Good to know

- Use this action when you want a single control, such as a button or a toggle helper, to switch an automation on and off.
- Unlike [Turn off automation](/actions/automation.turn_off/), this action always stops the actions that are running. It has no option to let them finish.
- If you need a specific result, use [Turn on automation](/actions/automation.turn_on/) or [Turn off automation](/actions/automation.turn_off/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: use one button to enable and disable the motion lights

Let a single wall button switch a motion lighting automation on and off.

- **Trigger**: Event received
  - **Target**: Living room button
  - **Event type**: Single press
- **Action**: Toggle automation
  - **Target**: Motion lights

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the motion lights automation with the living room button"
    triggers:
      - trigger: event.received
        target:
          entity_id: event.living_room_button
        options:
          event_type:
            - single_press
    actions:
      - action: automation.toggle
        target:
          entity_id: automation.motion_lights
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
