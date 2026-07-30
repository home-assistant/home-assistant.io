---
title: "Shutter is closed"
condition: cover.shutter_is_closed
domain: cover
description: "Tests if one or more shutters are closed."
related_conditions:
  - cover.shutter_is_open
---

The **Shutter is closed** condition passes when one or more targeted shutters are currently closed. Use it when an automation should continue only if a shutter is still closed at the moment the automation runs.

This condition is useful for reminders, lighting checks, and routines that depend on whether a shutter is closed.

## Prerequisites

- The target must be a `cover` entity with the `shutter` device class.

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Shutter is closed**.
5. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your shutter is in, like your living room or bedroom. You can also select a floor, a device, a specific entity, or a label.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All**.
7. Under **For at least**, enter how long the shutter must have stayed closed before the condition passes.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple shutters are targeted, controls how results combine. Pick **Any** to pass if at least one targeted shutter is closed, or **All** to pass only when every targeted shutter is closed. The default is **Any**.
  required: false
For at least:
  description: How long the shutter must have stayed closed before the condition passes. The default is `0` (passes immediately).
  required: false
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `cover.shutter_is_closed`. A basic example looks like this:

{% example %}
condition: |
  condition: cover.shutter_is_closed
  target:
    entity_id: cover.kitchen_shutter
{% endexample %}

This passes when `cover.kitchen_shutter` is currently closed.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple shutters are targeted, controls how results combine. Accepts
    `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the shutter must have stayed closed before the condition
    passes. Accepts a duration like `00:05:00` for five minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- Entities in the `unavailable` or `unknown` state are ignored when Home Assistant evaluates the condition.
- With **Any**, the condition passes if at least one available targeted shutter is closed.
- With **All**, the condition passes only if every available targeted shutter is closed. If every targeted shutter is `unavailable` or `unknown`, **All** passes and **Any** fails.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: open the shutter at sunrise if it is still closed

At sunrise, this automation checks whether the shutter is still closed. If it is, Home Assistant opens it to let in daylight.

- **Trigger**: Sunrise
- **Condition**: Shutter is closed
  - **Target**: Kitchen shutter
- **Action**: Open cover

{% details "YAML example for opening the shutter at sunrise" %}

{% example %}
automation: |
  alias: "Open the shutter at sunrise"
  triggers:
    - trigger: sun.sunrise
  conditions:
    - condition: cover.shutter_is_closed
      target:
        entity_id: cover.kitchen_shutter
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.kitchen_shutter
{% endexample %}

{% enddetails %}

### Automation: turn on the nearby light if the shutter is still closed when motion is detected

If the shutter is still closed when motion is detected, this automation turns on a nearby light so the area is easier to see.

- **Trigger**: Motion detected
- **Condition**: Shutter is closed
  - **Target**: Kitchen shutter
- **Action**: Turn on light
  - **Target**: Kitchen ceiling light

{% details "YAML example for turning on a nearby light when the shutter stays closed" %}

{% example %}
automation: |
  alias: "Turn on a nearby light when the shutter is closed"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hallway_motion
      to: "on"
  conditions:
    - condition: cover.shutter_is_closed
      target:
        entity_id: cover.kitchen_shutter
  actions:
    - action: light.turn_on
      target:
        entity_id: light.kitchen_ceiling
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
