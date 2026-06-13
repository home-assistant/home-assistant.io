---
title: "Set fan direction"
action: fan.set_direction
domain: fan
description: "Set a fan's rotation direction."
related_actions:
  - fan.turn_on
  - fan.toggle
---

The **Set fan direction** action is useful for fans that can reverse their rotation. Use it when you want one direction for cooling and the opposite direction for a gentler airflow pattern.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Set fan direction**.
7. Under **Direction**, choose **Forward** or **Reverse**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Direction:
  description: The direction of the fan rotation.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.set_direction`. A basic example looks like this:

{% example %}
action: |
  action: fan.set_direction
  target:
    entity_id: fan.ceiling_fan
  data:
    direction: forward
{% endexample %}

This sets `fan.ceiling_fan` to the `forward` direction.

### Options in YAML

{% options_yaml %}
direction:
  description: The direction of the fan rotation. Accepts `forward` or `reverse`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support changing direction.
- The valid YAML values are `forward` and `reverse`.
- Changing direction does not turn the fan on by itself.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set the ceiling fan to forward in the afternoon

If you prefer a stronger downward breeze during the hottest part of the day, switch the fan to forward automatically.

- **Trigger**: Time: 13:00
- **Action**: Set fan direction
- **Target**: Ceiling fan
- **Direction**: Forward

{% details "YAML example for afternoon forward airflow" %}

{% example %}
automation: |
  alias: "Ceiling fan forward in the afternoon"
  triggers:
    - trigger: time
      at: "13:00:00"
  actions:
    - action: fan.set_direction
      target:
        entity_id: fan.ceiling_fan
      data:
        direction: forward
{% endexample %}

{% enddetails %}

### Automation: set the bedroom fan to reverse at night

If your fan supports it, reverse rotation can give you a gentler feel while you sleep.

- **Trigger**: Time: 22:00
- **Action**: Set fan direction
- **Target**: Bedroom fan
- **Direction**: Reverse

{% details "YAML example for nighttime reverse airflow" %}

{% example %}
automation: |
  alias: "Bedroom fan reverse at night"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: fan.set_direction
      target:
        entity_id: fan.bedroom
      data:
        direction: reverse
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
