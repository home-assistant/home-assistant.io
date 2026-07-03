---
title: "Turn off fan"
action: fan.turn_off
domain: fan
description: "Turn off a fan."
related_actions:
  - fan.turn_on
  - fan.toggle
---

The **Turn off fan** action is useful when you want to stop airflow at a specific time or after another event happens. Use it to save energy, reduce noise, or end a cooling routine.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Turn off fan**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.turn_off`. A basic example looks like this:

{% example %}
action: |
  action: fan.turn_off
  target:
    entity_id: fan.kitchen
{% endexample %}

This turns off `fan.kitchen`.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support turning off.
- If the fan is already off, the action does nothing.
- To switch between on and off with one action, use [Toggle fan](/actions/fan.toggle/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn off the bedroom fan in the morning

If you use a fan overnight, this automation turns it off when the day starts.

- **Trigger**: Time: 07:00
- **Action**: Turn off fan
- **Target**: Bedroom fan

{% details "YAML example for a morning fan stop" %}

{% example %}
automation: |
  alias: "Turn off bedroom fan in the morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.bedroom
{% endexample %}

{% enddetails %}

### Automation: turn off the living room fan when everyone leaves

This avoids running the fan when no one is home.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home
- **Action**: Turn off fan
- **Target**: Living room fan

{% details "YAML example for turning the fan off when the home is empty" %}

{% example %}
automation: |
  alias: "Turn off living room fan when home is empty"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.living_room
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
