---
title: "Curtain is closed"
condition: cover.curtain_is_closed
domain: cover
description: "Tests if one or more curtains are closed."
related_conditions:
  - cover.curtain_is_open
---

The **Curtain is closed** condition passes when one or more targeted curtains are currently closed. Use it when an automation should continue only if a curtain is still closed at the moment the automation runs.

This condition is useful for reminders, lighting checks, and routines that depend on whether a curtain is closed.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Curtain is closed**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your curtain is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the curtain must have stayed closed before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple curtains are targeted, controls how results combine. Pick **Any** to pass if at least one targeted curtain is closed, or **All** to pass only when every targeted curtain is closed. The default is **Any**.
  required: false
For at least:
  description: How long the curtain must have stayed closed before the condition passes. The default is `0` (passes immediately).
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `cover.curtain_is_closed`. A basic example looks like this:

{% example %}
condition: |
  condition: cover.curtain_is_closed
  target:
    entity_id: cover.living_room_curtain
{% endexample %}

This passes when `cover.living_room_curtain` is currently closed.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple curtains are targeted, controls how results combine. Accepts
    `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the curtain must have stayed closed before the condition
    passes. Accepts a duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- This condition works only with `cover` entities that use the `curtain` device class.
- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted curtain is closed.
- With **All**, the condition passes only if every available targeted curtain is closed. If every targeted curtain is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: open the curtain at sunrise if it is still closed

At sunrise, this automation checks whether the curtain is still closed. If it is, Home Assistant opens it to let in daylight.

- **Trigger**: Sun: Sunrise
- **Condition**: Curtain is closed
  - **Target**: Living room curtain
- **Action**: Open cover

{% details "YAML example for opening the curtain at sunrise" %}

{% example %}
automation: |
  alias: "Open the curtain at sunrise"
  triggers:
    - trigger: sun
      event: sunrise
  conditions:
    - condition: cover.curtain_is_closed
      target:
        entity_id: cover.living_room_curtain
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.living_room_curtain
{% endexample %}

{% enddetails %}

### Automation: turn on the nearby light if the curtain is still closed when motion is detected

If the curtain is still closed when motion is detected, this automation turns on a nearby light so the area is easier to see.

- **Trigger**: Motion detected
- **Condition**: Curtain is closed
  - **Target**: Living room curtain
- **Action**: Turn on light
  - **Target**: Living room lamp

{% details "YAML example for turning on a nearby light when the curtain stays closed" %}

{% example %}
automation: |
  alias: "Turn on a nearby light when the curtain is closed"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  conditions:
    - condition: cover.curtain_is_closed
      target:
        entity_id: cover.living_room_curtain
  actions:
    - action: light.turn_on
      target:
        entity_id: light.living_room_lamp
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
