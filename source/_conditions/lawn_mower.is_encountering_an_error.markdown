---
title: "Lawn mower is encountering an error"
condition: lawn_mower.is_encountering_an_error
domain: lawn_mower
description: "Tests if one or more lawn mowers are encountering an error."
---

The **Lawn mower is encountering an error** condition passes when one or more targeted mowers are currently in an error state.
Use it when you want an automation to continue only while the problem is still active, like when you send repeated reminders or keep a warning light on.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Lawn mower is encountering an error**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area where your mower is used. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Each** or **All**.
7. Under **For at least**, set how long the mower must stay in the error state before the condition passes. Leave it at zero to check the current state only.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple lawn mowers are targeted, controls how results combine. Pick **Each** to pass if at least one targeted mower is in an error state, or **All** to pass only when every targeted mower is in an error state.
For at least:
  description: How long the mower must stay in the error state before the condition passes. Leave it at zero to check the current state only.
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `lawn_mower.is_encountering_an_error`. A basic example looks like this:

{% example %}
condition: |
  condition: lawn_mower.is_encountering_an_error
  target:
    entity_id: lawn_mower.backyard
{% endexample %}

This passes when `lawn_mower.backyard` is currently in the error state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lawn mowers are targeted, controls how results combine.
    Accepts `all` or `each`.
  required: false
  type: string
  default: each
for:
  description: >
    How long the mower must stay in the error state before the condition
    passes. Accepts a duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Mowers in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- Use **For at least** if you want to avoid acting on a short error that clears by itself.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: Send a reminder every 15 minutes while the error remains

If the mower is still stuck after the first alert, send a follow-up reminder so the problem does not get forgotten.

- **Trigger**: Time pattern: Every 15 minutes
- **Condition**: Lawn mower is encountering an error
  - **Target**: Backyard mower
  - **For at least**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for repeated error reminders" %}

{% example %}
automation: |
  alias: "Repeat the mower error reminder"
  triggers:
    - trigger: time_pattern
      minutes: "/15"
  conditions:
    - condition: lawn_mower.is_encountering_an_error
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The backyard mower is still reporting an
          error.
{% endexample %}

{% enddetails %}

### Automation: Keep the porch light on while the error is active

If you are checking the mower after dark, this automation keeps the porch light on while the mower is still reporting a problem.

- **Trigger**: Time pattern: Every 10 minutes
- **Condition**: Lawn mower is encountering an error
  - **Target**: Backyard mower
  - **For at least**: 00:00:30
- **Condition**: Sun: after sunset
- **Action**: Turn on light

{% details "YAML example for keeping the porch light on" %}

{% example %}
automation: |
  alias: "Keep the porch light on during mower errors"
  triggers:
    - trigger: time_pattern
      minutes: "/10"
  conditions:
    - condition: lawn_mower.is_encountering_an_error
      target:
        entity_id: lawn_mower.backyard
      options:
        for: "00:00:30"
    - condition: sun
      after: sunset
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
