---
title: "Turn off script"
action: script.turn_off
domain: script
description: "Stops a running script."
related_actions:
  - script.turn_on
  - script.toggle
---

Use this action to stop a script that is currently running. The script stops where it is, and the remaining actions in its sequence are skipped.

If the script isn't running, nothing happens.

{% include actions/ui_header.md %}

To stop a script from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the script you want to stop.
6. From the actions shown for that target, select **Turn off script**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `script.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: script.turn_off
  target:
    entity_id: script.wake_up_lights
{% endexample %}

This stops the `script.wake_up_lights` script.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- Stopping a script does not undo what it already did. Lights it turned on stay on.
- A script that is waiting, for example on a delay or on a **Wait for a trigger** step, stops as well.
- If the script runs in a mode that allows several runs at the same time, all of its runs are stopped.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: stop the wake-up script when you get up early

Cancel a gradual wake-up light script as soon as motion is detected in the bedroom.

- **Trigger**: State: Bedroom motion changes to detected
- **Action**: Turn off script
  - **Target**: Wake up lights

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Stop the wake-up script when you get up"
    triggers:
      - trigger: state
        entity_id: binary_sensor.bedroom_motion
        to: "on"
    actions:
      - action: script.turn_off
        target:
          entity_id: script.wake_up_lights
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
