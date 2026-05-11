---
title: "Increase fan speed"
action: fan.increase_speed
domain: fan
description: "Increase the speed of a fan."
related_actions:
  - fan.decrease_speed
  - fan.set_percentage
---

The **Increase fan speed** action is useful when you want more airflow without choosing an exact final value. Use it to nudge the fan up by one step or by a percentage you choose.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Increase fan speed**.
7. Optional: under **Increment**, set how much the speed should increase.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Increment:
  description: How much the speed should increase, in percent.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.increase_speed`. A basic example looks like this:

{% example %}
action: |
  action: fan.increase_speed
  target:
    entity_id: fan.office
  data:
    percentage_step: 10
{% endexample %}

This increases `fan.office` by 10 percent.

### Options in YAML

{% options_yaml %}
percentage_step:
  description: How much the speed should increase, in percent.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support speed control.
- If you leave **Increment** empty, the integration decides the step size.
- To set an exact speed instead, use [Set fan speed](/actions/fan.set_percentage/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: increase the office fan speed at midday

If the room gets warmer as the day goes on, you can raise the fan speed a little without switching straight to full power.

- **Trigger**: Time: 12:00
- **Action**: Increase fan speed
- **Target**: Office fan
- **Increment**: 10

{% details "YAML example for a midday speed boost" %}

{% example %}
automation: |
  alias: "Increase office fan at midday"
  triggers:
    - trigger: time
      at: "12:00:00"
  actions:
    - action: fan.increase_speed
      target:
        entity_id: fan.office
      data:
        percentage_step: 10
{% endexample %}

{% enddetails %}

### Automation: give the kitchen fan a bigger boost after cooking starts

When cooking begins, you may want to push the fan up more quickly.

- **Trigger**: State: Stove hood light changes to on
- **Action**: Increase fan speed
- **Target**: Kitchen fan
- **Increment**: 20

{% details "YAML example for a kitchen airflow boost" %}

{% example %}
automation: |
  alias: "Increase kitchen fan when cooking starts"
  triggers:
    - trigger: state
      entity_id: light.stove_hood
      to: "on"
  actions:
    - action: fan.increase_speed
      target:
        entity_id: fan.kitchen
      data:
        percentage_step: 20
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
