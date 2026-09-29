---
title: "Toggle humidifier"
action: humidifier.toggle
domain: humidifier
description: "Toggles a humidifier on or off."
related_actions:
  - humidifier.turn_on
  - humidifier.turn_off
  - humidifier.set_mode
  - humidifier.set_humidity
---

Use this action to toggle a humidifier, dehumidifier, or hygrostat, switching it on if it is off and off if it is on.

{% include actions/ui_header.md %}

To toggle a humidifier from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the humidifier you want to toggle.
6. From the actions shown for that target, select **Toggle humidifier**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `humidifier.toggle`. A basic example looks like this:

{% example %}
action: |
  action: humidifier.toggle
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This toggles `humidifier.bedroom` between on and off.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with humidifier entities.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle a humidifier with a button

Toggle a humidifier each time you press a button.

- **Trigger**: Button is pressed
- **Action**: Toggle humidifier
  - **Target**: Bedroom humidifier

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the bedroom humidifier with a button"
    triggers:
      - trigger: state
        entity_id: input_button.humidifier_toggle
    actions:
      - action: humidifier.toggle
        target:
          entity_id: humidifier.bedroom
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
