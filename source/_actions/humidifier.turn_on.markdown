---
title: "Turn on humidifier"
action: humidifier.turn_on
domain: humidifier
description: "Turns on a humidifier."
related_actions:
  - humidifier.turn_off
  - humidifier.toggle
  - humidifier.set_mode
  - humidifier.set_humidity
---

Use this action to turn on a humidifier, dehumidifier, or hygrostat, for example to start adding humidity to a room.

{% include actions/ui_header.md %}

To turn on a humidifier from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the humidifier you want to turn on.
6. From the actions shown for that target, select **Turn on humidifier**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `humidifier.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: humidifier.turn_on
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This turns on `humidifier.bedroom`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with humidifier entities.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on a humidifier in the morning

Turn on a humidifier at a set time, for example to start adding humidity before you wake up.

- **Trigger**: Time: 07:00
- **Action**: Turn on humidifier
  - **Target**: Bedroom humidifier

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn on the bedroom humidifier in the morning"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: humidifier.turn_on
        target:
          entity_id: humidifier.bedroom
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
