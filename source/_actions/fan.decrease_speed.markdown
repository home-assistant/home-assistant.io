---
title: "Decrease fan speed"
action: fan.decrease_speed
domain: fan
description: "Decrease the speed of a fan."
related_actions:
  - fan.increase_speed
  - fan.set_percentage
---

The **Decrease fan speed** action is useful when you want a gentler airflow without picking an exact final value. Use it to lower the fan by one step or by a percentage you choose.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Decrease fan speed**.
7. Optional: under **Decrement**, set how much the speed should decrease.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Decrement:
  description: How much the speed should decrease, in percent.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.decrease_speed`. A basic example looks like this:

{% example %}
action: |
  action: fan.decrease_speed
  target:
    entity_id: fan.bedroom
  data:
    percentage_step: 15
{% endexample %}

This decreases `fan.bedroom` by 15 percent.

### Options in YAML

{% options_yaml %}
percentage_step:
  description: How much the speed should decrease, in percent.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support speed control.
- If you leave **Decrement** empty, the integration decides the step size.
- To set an exact speed instead, use [Set fan speed](/actions/fan.set_percentage/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: slow the bedroom fan before you fall asleep

Reduce the airflow a little once the evening has settled down.

- **Trigger**: Time: 23:00
- **Action**: Decrease fan speed
- **Target**: Bedroom fan
- **Decrement**: 10

{% details "YAML example for a quieter bedtime fan" %}

{% example %}
automation: |
  alias: "Decrease bedroom fan speed at night"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: fan.decrease_speed
      target:
        entity_id: fan.bedroom
      data:
        percentage_step: 10
{% endexample %}

{% enddetails %}

### Automation: lower the living room fan after sunset

Once the day cools down, you may only need a softer airflow.

- **Trigger**: Sun: Below horizon
- **Action**: Decrease fan speed
- **Target**: Living room fan
- **Decrement**: 20

{% details "YAML example for a sunset fan slowdown" %}

{% example %}
automation: |
  alias: "Decrease living room fan after sunset"
  triggers:
    - trigger: sun
      event: sunset
  actions:
    - action: fan.decrease_speed
      target:
        entity_id: fan.living_room
      data:
        percentage_step: 20
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
