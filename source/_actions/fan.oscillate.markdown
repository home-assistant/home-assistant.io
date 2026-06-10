---
title: "Oscillate fan"
action: fan.oscillate
domain: fan
description: "Control the oscillation of a fan."
related_actions:
  - fan.turn_on
  - fan.turn_off
---

The **Oscillate fan** action is useful when you want to spread airflow across a wider area. Use it to turn oscillation on when more people are in the room, or turn it off when you want air aimed in one direction.

{% include integrations/labs_entity_triggers_note.md %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're creating an automation, add a trigger in the **When** section.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the fan you want to control. You can also select an area, a floor, a device, or a label.
6. From the actions shown for that target, select **Oscillate fan**.
7. Under **Oscillating**, choose whether oscillation should be on or off.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Oscillating:
  description: Turns oscillation on or off.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fan.oscillate`. A basic example looks like this:

{% example %}
action: |
  action: fan.oscillate
  target:
    entity_id: fan.living_room
  data:
    oscillating: true
{% endexample %}

This turns oscillation on for `fan.living_room`.

### Options in YAML

{% options_yaml %}
oscillating:
  description: Turns oscillation on or off. Accepts `true` or `false`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- This action is available only for fans that support oscillation.
- It changes only the oscillation setting. It does not turn the fan on or off by itself.
- To start the fan and set other options, use [Turn on fan](/actions/fan.turn_on/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: turn oscillation on when dinner starts

If several people are in the dining room, wider airflow can make the room feel more comfortable.

- **Trigger**: Time: 18:30
- **Action**: Oscillate fan
- **Target**: Dining room fan
- **Oscillating**: On

{% details "YAML example for wider airflow at dinner time" %}

{% example %}
automation: |
  alias: "Dining room fan oscillation on"
  triggers:
    - trigger: time
      at: "18:30:00"
  actions:
    - action: fan.oscillate
      target:
        entity_id: fan.dining_room
      data:
        oscillating: true
{% endexample %}

{% enddetails %}

### Automation: turn oscillation off during a video call

If the fan points papers around your desk, you can stop oscillation before a scheduled meeting.

- **Trigger**: Time: 09:00
- **Action**: Oscillate fan
- **Target**: Office fan
- **Oscillating**: Off

{% details "YAML example for steady airflow during a call" %}

{% example %}
automation: |
  alias: "Office fan oscillation off for calls"
  triggers:
    - trigger: time
      at: "09:00:00"
  actions:
    - action: fan.oscillate
      target:
        entity_id: fan.office
      data:
        oscillating: false
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
