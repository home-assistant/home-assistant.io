---
title: "Toggle script"
action: script.toggle
domain: script
description: "Starts a script if it isn't running, and stops it otherwise."
related_actions:
  - script.turn_on
  - script.turn_off
---

Use this action to flip a script between running and stopped. If the script isn't running, it starts. If it is running, it stops.

Like [Turn on script](/actions/script.turn_on/), this action does not wait for the script to finish.

It fits best with scripts that keep going until something stops them, such as a script that loops through the colors of the rainbow. A script like that never ends on its own, so one toggle both starts the effect and ends it.

{% include actions/ui_header.md %}

To toggle a script from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the script you want to toggle.
6. From the actions shown for that target, select **Toggle script**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `script.toggle`. A basic example looks like this:

{% example %}
action: |
  action: script.toggle
  target:
    entity_id: script.rainbow_lights
{% endexample %}

This starts `script.rainbow_lights` if it isn't running, and stops it if it is. Because the script keeps cycling through colors until something stops it, the same action turns the effect on and off.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action is a good fit for scripts that repeat until you stop them, where a single control starts and ends the effect.
- A short script finishes on its own before you can toggle it off, so toggling it behaves the same as [Turn on script](/actions/script.turn_on/).
- If you need a specific result, use [Turn on script](/actions/script.turn_on/) or [Turn off script](/actions/script.turn_off/) instead.
- Unlike [Turn on script](/actions/script.turn_on/), this action cannot pass variables to the script.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: use one button to start and stop the rainbow lights

Let a single button start the rainbow effect and end it on the next press. The script keeps cycling through colors on its own, so nothing else has to switch it off.

- **Trigger**: Event received
  - **Target**: Living room button
  - **Event type**: Single press
- **Action**: Toggle script
  - **Target**: Rainbow lights

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the rainbow lights with the living room button"
    triggers:
      - trigger: event.received
        target:
          entity_id: event.living_room_button
        options:
          event_type:
            - single_press
    actions:
      - action: script.toggle
        target:
          entity_id: script.rainbow_lights
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
