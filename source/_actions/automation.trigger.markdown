---
title: "Trigger automation"
action: automation.trigger
domain: automation
description: "Runs the actions of an automation."
related_actions:
  - automation.turn_on
  - automation.turn_off
  - automation.reload
---

Use this action to run the actions of an automation right away, without waiting for its {% term triggers %}. This is useful for testing an automation, or for reusing one automation from another.

By default the conditions of the automation are skipped, so its actions always run. Turn off **Skip conditions** if you want the conditions to be checked first.

{% include actions/ui_header.md %}

To run an automation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the automation you want to run.
6. From the actions shown for that target, select **Trigger automation**.
7. _Optional_: turn off **Skip conditions** if you want the conditions of the automation to be checked.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Skip conditions:
  description: Whether the conditions of the automation are skipped. On by default, so the actions run even when the conditions are not met.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `automation.trigger`. A basic example looks like this:

{% example %}
action: |
  action: automation.trigger
  target:
    entity_id: automation.evening_routine
{% endexample %}

This runs the actions of `automation.evening_routine`, whatever its conditions say.

To check the conditions first, set `skip_condition` to `false`:

{% example %}
action: |
  action: automation.trigger
  target:
    entity_id: automation.evening_routine
  data:
    skip_condition: false
{% endexample %}

### Options in YAML

{% options_yaml %}
skip_condition:
  description: Whether the conditions of the automation are skipped.
  required: false
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The automation runs even when it's turned off.
- Templates in the automation that use trigger data have nothing to read, because there is no trigger. Keep that in mind if the actions rely on the trigger variable.
- To run the same steps from several places, a script is often a better fit than triggering an automation. See [Turn on script](/actions/script.turn_on/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: run the evening routine from a button

Reuse an existing evening routine automation when someone presses a button.

- **Trigger**: A wall button is pressed
- **Action**: Trigger automation
  - **Target**: Evening routine

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Run the evening routine from the hallway button"
    triggers:
      - trigger: state
        entity_id: event.hallway_button
    actions:
      - action: automation.trigger
        target:
          entity_id: automation.evening_routine
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
