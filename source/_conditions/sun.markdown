---
title: "Sun"
condition: sun
domain: sun
description: "Older condition that tests if the current time is before or after sunrise or sunset."
related_conditions:
  - sun.is_up
  - sun.is_set
  - sun.elevation
---

The **Sun** condition checks whether the current time is before or after sunrise or sunset. You can move these times earlier or later with an offset. For example, the condition can pass from one hour before sunset.

This is an older condition. When you select **Add condition**, it isn't in the list anymore, but automations that use it keep working. For new automations, use the conditions in the **Sun** group, such as [Sun is up](/conditions/sun.is_up/) or [Sun elevation](/conditions/sun.elevation/). This page helps you read and change automations that already use the **Sun** condition.

## Choosing a sun condition for new automations

For new automations, use these conditions instead:

- During the day, from sunrise until sunset: [Sun is up](/conditions/sun.is_up/)
- During the night, from sunset until sunrise: [Sun is set](/conditions/sun.is_set/)
- Around sunrise or sunset, instead of an offset: [Sun elevation](/conditions/sun.elevation/)
  - An angle follows the light outside through the seasons better than a fixed offset in time.
- From sunset until midnight: [Sun is set](/conditions/sun.is_set/), together with a [Time](/docs/scripts/conditions/#time-condition) condition with **After** set to 12:00
- From midnight until sunrise: [Sun is set](/conditions/sun.is_set/), together with a [Time](/docs/scripts/conditions/#time-condition) condition with **Before** set to 12:00

## Editing this condition in the UI

When you open an automation that uses the **Sun** condition, the editor shows its options:

{% options_ui %}
Condition type:
  description: Whether the condition checks the time before an event, after an event, or between two events.
  required: true
After:
  description: For **After** and **Between**. The condition passes from this event on. Select **Sunrise** or **Sunset**.
  required: false
After offset:
  description: Moves the **After** time earlier or later.
  required: false
Before:
  description: For **Before** and **Between**. The condition passes until this event. Select **Sunrise** or **Sunset**.
  required: false
Before offset:
  description: Moves the **Before** time earlier or later.
  required: false
{% endoptions_ui %}

To switch to a newer condition, delete the **Sun** condition, then add one from the **Sun** group.

{% include conditions/yaml_header.md %}

In YAML, the condition uses `condition: sun`. A basic example looks like this:

{% example %}
condition: |
  condition: sun
  after: sunset
  after_offset: "-01:00:00"
{% endexample %}

This passes from one hour before sunset until midnight.

### Options in YAML

The options in YAML are the same as in the UI. Instead of **Condition type**, you set `before`, `after`, or both.

{% options_yaml %}
condition:
  description: The condition type. For this condition, use `sun`.
  required: true
  type: string
after:
  description: The event from which the condition passes. Use `sunrise` or `sunset`. You must set `after`, `before`, or both.
  required: false
  type: string
after_offset:
  description: Moves the `after` time. Use `HH:MM:SS`, a number of seconds, or a duration with `hours`, `minutes`, and `seconds`. A negative value makes the time earlier, for example, `"-01:00:00"`.
  required: false
  type: [string, integer, map]
before:
  description: The event until which the condition passes. Use `sunrise` or `sunset`. You must set `after`, `before`, or both.
  required: false
  type: string
before_offset:
  description: Moves the `before` time. Use the same formats as for `after_offset`.
  required: false
  type: [string, integer, map]
{% endoptions_yaml %}

## Good to know

- The condition uses the sunrise and sunset of the current day. The day starts and ends at midnight.
  - If only **Before** is set, the condition passes from midnight until that time.
  - If only **After** is set, the condition passes from that time until midnight.
- With **After** set to sunrise and **Before** set to sunset, the condition passes during the day.
- With **After** set to sunset and **Before** set to sunrise, the condition passes during the night. In this combination, it passes from sunset until midnight, and from midnight until sunrise.
- The following chart shows when each combination passes. In this example, sunrise is at 06:00, and sunset is at 18:00. The green areas show when the condition passes.
  ![Chart that shows when the sun conditions pass, with sunrise at 06:00 and sunset at 18:00](/images/docs/scripts/sun-conditions.svg)
- Near the poles, there are days without a sunrise or a sunset. On those days, a condition that uses the missing event doesn't pass. [Sun is up](/conditions/sun.is_up/) and [Sun elevation](/conditions/sun.elevation/) work on those days too.

## Examples

These examples show automations that use the **Sun** condition, and what to use instead in a new automation.

### Automation: turn on the porch light at night when there is motion

When the porch motion sensor detects motion, this automation turns on the porch light, but only between sunset and sunrise.

- **Trigger**: State changed
  - **Entity**: Porch motion (`binary_sensor.porch_motion`)
  - **To**: Detected
- **Condition**: Sun
  - **Condition type**: Between
  - **After**: Sunset
  - **Before**: Sunrise
- **Action**: Turn on light
  - **Target**: Porch light (`light.porch`)

In a new automation, use [Sun is set](/conditions/sun.is_set/) instead. It passes at the same times.

{% details "YAML example for a porch light at night" %}

{% example %}
automation: |
  alias: "Porch light on motion at night"
  triggers:
    - trigger: state
      entity_id: binary_sensor.porch_motion
      to: "on"
  conditions:
    - condition: sun
      after: sunset
      before: sunrise
  actions:
    - action: light.turn_on
      target:
        entity_id: light.porch
{% endexample %}

{% enddetails %}

### Automation: open the blinds at 07:00, but only after sunrise

At 07:00, this automation opens the bedroom blinds, but only if the sun rose at least 30 minutes ago. In winter, when the sun rises later, the automation doesn't open the blinds.

- **Trigger**: Time
  - **At time**: 07:00:00
- **Condition**: Sun
  - **Condition type**: After
  - **After**: Sunrise
  - **After offset**: 00:30:00
- **Action**: Open cover
  - **Target**: Bedroom blinds (`cover.bedroom_blinds`)

In a new automation, use [Sun elevation](/conditions/sun.elevation/) instead. Pick an angle that matches the light you want, for example, above 5°.

{% details "YAML example for opening the blinds after sunrise" %}

{% example %}
automation: |
  alias: "Open the blinds after sunrise"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: sun
      after: sunrise
      after_offset: "00:30:00"
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.bedroom_blinds
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
