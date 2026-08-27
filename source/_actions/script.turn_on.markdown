---
title: "Turn on script"
action: script.turn_on
domain: script
description: "Runs the sequence of actions defined in a script."
related_actions:
  - script.turn_off
  - script.toggle
  - script.reload
---

Use this action to start a script. The script runs the sequence of actions you defined for it.

Whatever starts the script does not wait for it to finish. The script is started in the background, and the automation or script that started it continues right away. If you want to wait for the script to finish, call the script directly as `script.your_script_name` instead. For a full comparison, see [waiting for a script to complete](/integrations/script/#waiting-for-a-script-to-complete).

{% include actions/ui_header.md %}

To run a script from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the script you want to run.
6. From the actions shown for that target, select **Turn on script**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `script.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: script.turn_on
  target:
    entity_id: script.notify_pushover
{% endexample %}

This starts the `script.notify_pushover` script.

If the script expects variables, pass them in the `variables` option:

{% example %}
action: |
  action: script.turn_on
  target:
    entity_id: script.notify_pushover
  data:
    variables:
      title: "State change"
      message: "The light is on!"
{% endexample %}

### Options in YAML

{% options_yaml %}
variables:
  description: The variables to pass to the script. Each key becomes a variable that the script can use in its templates.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- If the script is already running, what happens next depends on its [script mode](/integrations/script/#script-modes). For example, a script in single mode logs a warning and does not start a second run.
- Errors in the script do not stop the automation or script that started it, because the two run separately.
- If you target several scripts at once, they are all started, in the order you list them.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a notification through a script when a light turns on

Reuse a notification script and pass the message to it, without holding up the rest of the automation.

- **Trigger**: State: Bedroom light changes to on
- **Action**: Turn on script
  - **Target**: Notify Pushover

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Notify when the bedroom light turns on"
    triggers:
      - trigger: state
        entity_id: light.bedroom
        from: "off"
        to: "on"
    actions:
      - action: script.turn_on
        target:
          entity_id: script.notify_pushover
        data:
          variables:
            title: "State change"
            message: "The light is on!"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
