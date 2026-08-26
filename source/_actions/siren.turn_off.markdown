---
title: "Turn off siren"
action: siren.turn_off
domain: siren
description: "Turns off a siren."
related_actions:
  - siren.turn_on
  - siren.toggle
---

Use this action to turn off a siren or chime, for example to silence an alarm after a set time.

{% include actions/ui_header.md %}

To turn off a siren from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the siren you want to turn off.
6. From the actions shown for that target, select **Turn off siren**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `siren.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: siren.turn_off
  target:
    entity_id: siren.entry
{% endexample %}

This turns off `siren.entry`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with sirens that support being turned off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off a siren after 5 minutes

Turn off a siren once it has been on for a set time.

- **Trigger**: State: Siren has been on for 5 minutes
- **Action**: Turn off siren
  - **Target**: Patio siren

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Turn off the patio siren after 5 minutes"
    triggers:
      - trigger: state
        entity_id: siren.patio
        to: "on"
        for: "00:05:00"
    actions:
      - action: siren.turn_off
        target:
          entity_id: siren.patio
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
