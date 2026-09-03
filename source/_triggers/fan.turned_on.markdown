---
title: "Fan turned on"
trigger: fan.turned_on
domain: fan
description: "Triggers when one or more fans turn on."
related_triggers:
  - fan.turned_off
---

The **Fan turned on** trigger is useful when you want something else to happen as soon as a fan starts running. Use it to send a reminder, start a related device, or begin a timed routine after a fan has been on for a while.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the fan you want to monitor. You can also select an area, a floor, a device, or a label.
5. From the triggers shown for that target, select **Fan turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All**.
7. Under **For at least**, set how long the fan must stay on before the trigger fires.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple fans are targeted, controls whether the trigger fires for **Each** fan, only the **First** fan, or after **All** targeted fans are on.
  required: false
  default: Each
For at least:
  description: How long the fan must stay on before the trigger fires.
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `fan.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: fan.turned_on
  target:
    entity_id: fan.bedroom
  options:
    behavior: each
    for: "00:05:00"
{% endexample %}

This fires when `fan.bedroom` has been on for 5 minutes.

### Options in YAML

{% options_yaml %}
behavior:
  description: When multiple fans are targeted, controls whether the trigger fires for `each`, `first`, or `all`.
  required: false
  type: string
  default: each
for:
  description: How long the fan must stay on before the trigger fires. Accepts a duration string like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- A fan in the `unknown` or `unavailable` state does not count as turned on.
- If the fan turns off before the **For at least** time finishes, the timer resets.
- To react when a fan stops instead, use [Fan turned off](/triggers/fan.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the bathroom fan has been left on

If the bathroom fan has been running for a while, you may want a reminder to turn it off after the room has cleared.

- **Trigger**: Fan turned on
  - **Target**: Bathroom fan
  - **Trigger when**: Each
  - **For at least**: 00:20:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a bathroom fan reminder" %}

{% example %}
automation: |
  alias: "Bathroom fan reminder"
  triggers:
    - trigger: fan.turned_on
      target:
        entity_id: fan.bathroom
      options:
        behavior: each
        for: "00:20:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The bathroom fan has been on for 20 minutes."
{% endexample %}

{% enddetails %}

### Automation: turn on the bedside lamp when the bedroom fan starts

When you start the bedroom fan in the evening, you can also turn on a dim bedside lamp for a calmer bedtime routine.

- **Trigger**: Fan turned on
- **Target**: Bedroom fan
- **Trigger when**: Each
- **For at least**: 00:00:00
- **Action**: Turn on light

{% details "YAML example for a bedroom bedtime routine" %}

{% example %}
automation: |
  alias: "Bedroom fan bedtime routine"
  triggers:
    - trigger: fan.turned_on
      target:
        entity_id: fan.bedroom
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.bedside
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
