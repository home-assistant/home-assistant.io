---
title: "Turn on automation"
action: automation.turn_on
domain: automation
description: "Enables an automation."
related_actions:
  - automation.turn_off
  - automation.toggle
  - automation.trigger
---

Use this action to enable an automation. Once it's on, the automation listens for its {% term triggers %} again and runs when they fire.

This is handy when you want one automation to switch another one on, for example to enable your away routines when you leave for a trip.

{% include actions/ui_header.md %}

To enable an automation from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the automation you want to enable.
6. From the actions shown for that target, select **Turn on automation**.
7. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `automation.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: automation.turn_on
  target:
    entity_id: automation.away_lighting
{% endexample %}

This enables the `automation.away_lighting` automation.

{% include actions/targets.md %}

## Good to know

- Enabling an automation does not run it. It only makes the automation listen for its triggers again. To run it right away, use [Trigger automation](/actions/automation.trigger/).
- An automation that is off keeps its own state. Anything it was tracking before, such as the last time it ran, is preserved.
- You can also enable and disable an automation from the automation list in {% my automations title="**Settings** > **Automations & scenes**" %}.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: enable the away lighting routine when you leave

Switch on a second automation that fakes presence while nobody is home.

- **Trigger**: Zone left
  - **Target**: Paulus
  - **Zone**: Home
- **Action**: Turn on automation
  - **Target**: Away lighting

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Enable the away lighting routine"
    triggers:
      - trigger: zone.left
        target:
          entity_id: person.paulus
        options:
          zone: zone.home
    actions:
      - action: automation.turn_on
        target:
          entity_id: automation.away_lighting
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
