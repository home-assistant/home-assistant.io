---
title: "Fan turned off"
trigger: fan.turned_off
domain: fan
description: "Triggers when one or more fans turn off."
related_triggers:
  - fan.turned_on
---

The **Fan turned off** trigger is useful when you want to react after a fan stops. Use it to end a related routine, restore another device to its normal state, or send a reminder if a fan shuts down when you did not expect it to.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the fan you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Fan turned off**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the fan must stay off before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple fans are targeted, controls whether the trigger fires for **Each** fan, only the **First** fan, or after **All** targeted fans are off.
  required: false
  default: Each
For at least:
  description: How long the fan must stay off before the trigger fires.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `fan.turned_off`. A basic example looks like this:

{% example %}
trigger: |
  trigger: fan.turned_off
  target:
    entity_id: fan.kitchen
  options:
    behavior: each
    for: "00:10:00"
{% endexample %}

This fires when `fan.kitchen` has been off for 10 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple fans are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the fan must stay off before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A fan in the `unknown` or `unavailable` state does not count as turned off.
- If the fan turns on again before the **For at least** time finishes, the timer resets.
- To react when a fan starts instead, use [Fan turned on](/triggers/fan.turned_on/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: switch the hallway light back to normal after the fan stops

You might raise the hallway light while the fan is running to make a late-night bathroom trip easier. When the fan stops, this automation restores the light to its usual setting.

- **Trigger**: Fan turned off
- **Target**: Bathroom fan
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn on light

{% details "YAML example for restoring the hallway light" %}

{% example %}
automation: |
  alias: "Restore hallway light after bathroom fan"
  triggers:
    - trigger: fan.turned_off
      target:
        entity_id: fan.bathroom
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.hallway
      data:
        brightness_pct: 30
{% endexample %}

{% enddetails %}

### Automation: notify if the nursery fan stops overnight

If you rely on airflow for comfort at night, a notification can tell you when the nursery fan has stopped for a few minutes.

- **Trigger**: Fan turned off
  - **Target**: Nursery fan
  - **Trigger when**: Each
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a nursery fan alert" %}

{% example %}
automation: |
  alias: "Nursery fan stopped overnight"
  triggers:
    - trigger: fan.turned_off
      target:
        entity_id: fan.nursery
      options:
        behavior: each
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The nursery fan has been off for 5 minutes."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
