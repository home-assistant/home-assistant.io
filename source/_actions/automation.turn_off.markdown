---
title: "Turn off automation"
action: automation.turn_off
domain: automation
description: "Disables an automation."
related_actions:
  - automation.turn_on
  - automation.toggle
---

Use this action to disable an automation. While it's off, the automation no longer listens for its {% term triggers %} and doesn't run.

By default, any actions the automation is running right now are stopped as well. You can keep them running by turning off **Stop actions**.

{% include actions/ui_header.md %}

To disable an automation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the automation you want to disable.
6. From the actions shown for that target, select **Turn off automation**.
7. _Optional_: turn off **Stop actions** if you want actions that are already running to finish.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Stop actions:
  description: Whether actions that are running right now are stopped. On by default.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `automation.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: automation.turn_off
  target:
    entity_id: automation.away_lighting
{% endexample %}

This disables the `automation.away_lighting` automation and stops anything it is running.

To let the running actions finish, set `stop_actions` to `false`:

{% example %}
action: |
  action: automation.turn_off
  target:
    entity_id: automation.away_lighting
  data:
    stop_actions: false
{% endexample %}

### Options in YAML

{% options_yaml %}
stop_actions:
  description: Whether actions that are running right now are stopped.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- A disabled automation still shows up in your automation list, and its settings are kept. It just doesn't run.
- Stopping the running actions does not undo what the automation already did.
- To disable an automation only for a while, pair this action with [Turn on automation](/actions/automation.turn_on/) in a second automation.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause the motion lights while you watch a movie

Disable the motion lighting automation so the lights stay as they are during the movie.

- **Trigger**: Media player started playing
  - **Target**: Living room
- **Action**: Turn off automation
  - **Target**: Motion lights

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Pause the motion lights during a movie"
    triggers:
      - trigger: media_player.started_playing
        target:
          entity_id: media_player.living_room
    actions:
      - action: automation.turn_off
        target:
          entity_id: automation.motion_lights
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
