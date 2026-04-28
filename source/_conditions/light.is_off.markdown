---
title: "Light is off"
condition: light.is_off
domain: light
description: "Tests if one or more lights are off."
related_conditions:
  - light.is_on
  - light.is_brightness
---

The **Light is off** condition passes when a light {% term entity %} is currently off. Use it to gate an automation so it only runs when a specific light (or every targeted light) is already dark.

When you target more than one light, the condition's **behavior** option controls how the check combines results. You can require any targeted light to be off, or demand that all of them are.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use this condition in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. From the search box, search for and select **Light: Light is off**.
5. Under **Targets**, select the light entity, an area, a floor, or a label.
6. Under **Condition passes if**, pick **Any** or **All**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple lights are targeted, controls how results combine. Pick **Any** to pass if at least one targeted light is off, or **All** to pass only when every targeted light is off.
  required: true
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, refer to this condition as `light.is_off`. A basic example looks like this:

{% example %}
condition: |
  condition: light.is_off
  target:
    entity_id: light.bedroom
{% endexample %}

This passes when the bedroom light is currently off.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple lights are targeted, controls how results combine. Accepts `all` or `any`.
  required: true
  type: string
  default: any
{% endoptions_yaml %}

{% include conditions/targets.md %}

## Good to know

- Lights that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as off. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted light is unavailable.
- To gate an automation on a light being on instead, use [Light is on](/conditions/light.is_on/).
- Pair with the [Light turned off](/triggers/light.turned_off/) trigger to react only when a transition to off happens.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only run the morning wake-up if the bedroom is still dark

At 07:00 on weekdays, start the morning wake-up routine, but only if the bedroom light is still off. Skip the routine on days you're already awake.

- **Trigger**: Time: 07:00
- **Condition**: Day of the week is Monday to Friday
- **Condition**: Light is off
- **Target**: Bedroom light
- **Condition passes if**: All
- **Action**: Script: Morning wake-up

{% details "YAML example for a gated morning wake-up" %}

{% example %}
automation: |
  alias: "Morning wake-up only if bedroom dark"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
    - condition: light.is_off
      target:
        entity_id: light.bedroom
      options:
        behavior: all
  actions:
    - action: script.morning_wake_up
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
