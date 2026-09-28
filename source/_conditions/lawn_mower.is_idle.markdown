---
title: "Lawn mower is idle"
condition: lawn_mower.is_idle
domain: lawn_mower
description: "Tests if one or more lawn mowers are idle."
---

The **Lawn mower is idle** condition passes when one or more targeted mowers are stopped in the yard, neither docked nor paused.
Use it when an automation should only continue while the mower has no task, like starting a fresh run, sending it back to the dock, or reminding you that it was left outside.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Lawn mower is idle**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, set how long the mower must stay idle before the condition passes. Leave it at zero to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple lawn mowers are targeted, controls how results combine. Pick **Any** to pass if at least one targeted mower is idle, or **All** to pass only when every targeted mower is idle.
For at least:
  description: How long the mower must stay idle before the condition passes. Leave it at zero to check the current state only.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lawn_mower.is_idle`. A basic example looks like this:

{% example %}
condition: |
  condition: lawn_mower.is_idle
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This passes when `lawn_mower.backyard` is currently idle.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls how results combine.
    Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the mower must stay idle before the condition passes. Accepts a
    duration like `00:10:00` for 10 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Mowers in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- A paused mower does not pass this condition: it still has a task to resume. Use [Lawn mower is paused](/conditions/lawn_mower.is_paused/) for that case.
- Not every mower reports an idle state. Check the states your integration supports.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: Start the evening run only if the mower is idle

If the mower was stopped earlier and left in the yard, start a fresh run in the evening instead of leaving it there overnight.

- **Trigger**: Time: 19:00
- **Condition**: Lawn mower is idle
  - **Target**: Backyard mower
- **Action**: Start lawn mower
  - **Target**: Backyard mower

{% details "YAML example for starting an idle mower" %}

{% example %}
automation: |
  alias: "Evening run if the mower is idle"
  triggers:
    - trigger: time
      at: "19:00:00"
  conditions:
    - condition: lawn_mower.is_idle
      target:
        entity_id: lawn_mower.backyard
  actions:
    - action: lawn_mower.start_mowing
      target:
        entity_id: lawn_mower.backyard
{% endexample %}

{% enddetails %}

### Automation: Remind yourself that the mower was left outside

Check every hour and send a reminder while the mower stays idle in the yard.

- **Trigger**: Time pattern: Every hour
- **Condition**: Lawn mower is idle
  - **Target**: Backyard mower
  - **For at least**: 00:30:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an idle-mower reminder" %}

{% example %}
automation: |
  alias: "Remind me that the mower is outside"
  triggers:
    - trigger: time_pattern
      hours: "/1"
  conditions:
    - condition: lawn_mower.is_idle
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:30:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The backyard mower is still standing in the yard."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
