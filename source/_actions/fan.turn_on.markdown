---
title: "Turn on fan"
action: fan.turn_on
domain: fan
description: "Turn on a fan. Optionally set the speed or preset mode at the same time."
related_actions:
  - fan.turn_off
  - fan.toggle
---

The **Turn on fan** action is useful when you want to start airflow right away. You can simply turn the fan on, or turn it on with a specific speed or preset mode in the same step.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Turn on fan**.
7. Optional: under **Percentage**, set the speed you want.
8. Optional: under **Preset mode**, select the mode you want.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Percentage:
  description: The speed to set when the fan turns on.
  required: false
Preset mode:
  description: The preset mode to apply when the fan turns on.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.turn_on`. A basic example looks like this:

{% example %}
action: |
  action: fan.turn_on
  target:
    entity_id: fan.bedroom
{% endexample %}

This turns on `fan.bedroom`.

### Options in YAML

{% options_yaml %}
percentage:
  description: The speed to set when the fan turns on.
  required: false
  type: integer
preset_mode:
  description: The preset mode to apply when the fan turns on.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support turning on.
- The `percentage` field is available only for fans that support speed control.
- The `preset_mode` field is available only for fans that support preset modes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn on the bedroom fan at bedtime

Start the fan automatically when you usually go to bed.

- **Trigger**: Time: 22:00
- **Action**: Turn on fan
- **Target**: Bedroom fan

{% details "YAML example for a bedtime fan" %}

{% example %}
automation: |
  alias: "Turn on bedroom fan at bedtime"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom
{% endexample %}

{% enddetails %}

### Automation: turn on the office fan at 60 percent in the afternoon

If your office warms up later in the day, you can start the fan at a moderate speed automatically.

- **Trigger**: Time: 14:00
- **Action**: Turn on fan
- **Target**: Office fan
- **Percentage**: 60

{% details "YAML example for an afternoon office fan" %}

{% example %}
automation: |
  alias: "Turn on office fan in the afternoon"
  triggers:
    - trigger: time
      at: "14:00:00"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.office
      data:
        percentage: 60
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
