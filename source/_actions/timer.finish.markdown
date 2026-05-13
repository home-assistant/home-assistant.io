---
title: "Finish timer"
action: timer.finish
domain: timer
description: "Finishes a running or paused timer earlier than scheduled."
related_actions:
  - timer.cancel
  - timer.start
---

The **Finish timer** action ends a running or paused timer right away. Use it when you want the timer's finished behavior to happen immediately.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the timer you want to finish. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Finish timer**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
No options:
  description: This action has no additional options in the UI.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `timer.finish`. A basic example looks like this:

{% example %}
action: |
  action: timer.finish
  target:
    entity_id: timer.patio_door
{% endexample %}

This finishes `timer.patio_door` right away.

### Options in YAML

{% options_yaml %}
No options:
  description: This action has no additional YAML options.
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action ends the timer early and makes it behave as if the countdown reached zero.
- If you want to stop a timer without finishing it, use [Cancel timer](/actions/timer.cancel/) instead.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: finish the patio door timer when everyone arrives home

If the whole household is home sooner than expected, you can finish the timer right away so the follow-up automation runs immediately.

- **Trigger**: Person enters home zone
- **Action**: Finish timer
- **Target**: Patio door timer

{% details "YAML example for finishing a patio door timer" %}

{% example %}
automation: |
  alias: "Finish the patio door timer when everyone arrives home"
  triggers:
    - trigger: zone
      entity_id: person.alex
      zone: zone.home
      event: enter
  actions:
    - action: timer.finish
      target:
        entity_id: timer.patio_door
{% endexample %}

{% enddetails %}

### Automation: finish the kitchen timer when the oven turns off

If cooking ends early, you can finish the timer right away instead of waiting for the remaining time.

- **Trigger**: State changes to off
- **Action**: Finish timer
- **Target**: Kitchen timer

{% details "YAML example for finishing a kitchen timer" %}

{% example %}
automation: |
  alias: "Finish the kitchen timer when the oven turns off"
  triggers:
    - trigger: state
      entity_id: switch.oven
      to: "off"
  actions:
    - action: timer.finish
      target:
        entity_id: timer.kitchen
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
