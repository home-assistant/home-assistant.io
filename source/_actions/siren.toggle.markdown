---
title: "Toggle siren"
action: siren.toggle
domain: siren
description: "Toggles a siren on or off."
related_actions:
  - siren.turn_on
  - siren.turn_off
---

Use this action to toggle a siren. If the siren is on, it turns off. If it is off, it turns on.

{% include actions/ui_header.md %}

To toggle a siren from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the siren you want to toggle.
6. From the actions shown for that target, select **Toggle siren**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `siren.toggle`. A basic example looks like this:

{% example %}
action: |
  action: siren.toggle
  target:
    entity_id: siren.entry
{% endexample %}

This toggles `siren.entry` between on and off.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with sirens that support both turning on and turning off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle a siren with a button

Toggle a siren whenever you press a physical or dashboard button.

- **Trigger**: Button is pressed
- **Action**: Toggle siren
  - **Target**: Entry siren

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the entry siren with a button"
    triggers:
      - trigger: state
        entity_id: input_button.entry_siren
    actions:
      - action: siren.toggle
        target:
          entity_id: siren.entry
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
