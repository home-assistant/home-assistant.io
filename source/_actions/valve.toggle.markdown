---
title: "Toggle valve"
action: valve.toggle
domain: valve
description: "Toggles a valve open or closed."
related_actions:
  - valve.close_valve
  - valve.open_valve
  - valve.set_valve_position
  - valve.stop_valve
---

Use this action to toggle a valve. If the valve is open, it closes. If it is closed, it opens.

{% include actions/ui_header.md %}

To toggle a valve from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the valve you want to toggle.
6. From the actions shown for that target, select **Toggle valve**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `valve.toggle`. A basic example looks like this:

{% example %}
action: |
  action: valve.toggle
  target:
    entity_id: valve.garden_water
{% endexample %}

This toggles `valve.garden_water` between open and closed.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action only works with valves that support both opening and closing.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: toggle a valve with a button

Toggle a valve whenever you press a physical or dashboard button.

- **Trigger**: Button is pressed
- **Action**: Toggle valve
  - **Target**: Garden water valve

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Toggle the garden water valve with a button"
    triggers:
      - trigger: state
        entity_id: input_button.garden_water
    actions:
      - action: valve.toggle
        target:
          entity_id: valve.garden_water
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
