---
title: "Weather condition changed"
trigger: weather.condition_changed
domain: weather
description: "Triggers when the condition of one or more weather entities changes to one or more specific conditions."
related_triggers:
  - weather.started_raining
  - weather.stopped_raining
---

The **Weather condition changed** trigger fires after a weather {% term entity %} changes to one or more conditions you choose, such as **Snowy**, **Windy**, or **Sunny**. Use this trigger when **Started raining** and **Stopped raining** don't cover what you need, for example to react to snow, fog, or a specific combination of conditions.

You choose one or more conditions, and the trigger fires when the weather entity switches to any of them.

{% include triggers/ui_header.md %}

To use **Weather condition changed** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your weather entity is in, or select a specific entity or a label.
5. From the triggers shown for that target, select **Weather condition changed**.
6. Under **Conditions**, select one or more conditions you want to monitor.
7. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple weather entities are targeted.
8. Under **For at least**, set how long the weather entity must remain in the new condition before the trigger fires. Leave it at zero to fire immediately.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Conditions:
  description: The condition or conditions the weather entity must switch to for the trigger to fire, such as **Snowy**, **Windy**, or **Sunny**.
  required: true
Trigger when:
  description: |
    When multiple weather entities are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted weather entity changes to one of the selected conditions.
    - **First**: fires only on the first matching change.
    - **All**: fires only after every targeted weather entity has changed to one of the selected conditions.
  required: false
For at least:
  description: How long the weather entity must remain in the new condition before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Weather condition changed** is referred to as `weather.condition_changed`. A basic example looks like this:

{% example %}
trigger: |
  trigger: weather.condition_changed
  target:
    entity_id: weather.home
  options:
    condition: "snowy"
{% endexample %}

This reacts when `weather.home` switches to the **Snowy** condition.

### Options in YAML

{% options_yaml %}
condition:
  description: >
    The condition or conditions the weather entity must switch to for the trigger to fire. Accepts a single condition string or a list of conditions, such as `clear-night`, `cloudy`, `exceptional`, `fog`, `hail`, `lightning`, `lightning-rainy`, `partlycloudy`, `pouring`, `rainy`, `snowy`, `snowy-rainy`, `sunny`, `windy`, or `windy-variant`.
  required: true
  type: string
behavior:
  description: |
    When multiple weather entities are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted weather entity changes to one of the selected conditions.
    - `first`: fires only on the first matching change.
    - `all`: fires only after every targeted weather entity has changed to one of the selected conditions.
  required: false
  type: string
  default: each
for:
  description: |
    How long the weather entity must remain in the new condition before the trigger fires. For a list of all accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: false
  type: [string, integer, map]
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires only when the condition changes to one of the selected values. It does not fire on startup if the weather entity's initial state already matches.
- This trigger does not fire while the weather entity is **Unavailable** or **Unknown**.
- To react specifically to rain starting or stopping, use **Started raining** or **Stopped raining** instead, which already cover the rain-related conditions.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on outdoor lights when it gets foggy

When the weather entity for your home changes to the **Fog** condition, turn on the outdoor lights to improve visibility.

- **Trigger**: Weather condition changed
  - **Target**: `weather.home`
  - **Conditions**: Fog
- **Action**: Turn on light

{% details "YAML example for turning on lights in fog" %}

{% example %}
automation: |
  alias: "Turn on outdoor lights in fog"
  triggers:
    - trigger: weather.condition_changed
      target:
        entity_id: weather.home
      options:
        condition: "fog"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.outdoor
{% endexample %}

{% enddetails %}

### Automation: close the garage door when it starts snowing or hailing

When the weather entity for your home changes to **Snowy** or **Hail**, close the garage door to protect anything stored just inside it.

- **Trigger**: Weather condition changed
  - **Target**: `weather.home`
  - **Conditions**: Snowy, Hail
- **Action**: Close cover

{% details "YAML example for closing the garage door in snow or hail" %}

{% example %}
automation: |
  alias: "Close garage door in snow or hail"
  triggers:
    - trigger: weather.condition_changed
      target:
        entity_id: weather.home
      options:
        condition:
          - "snowy"
          - "hail"
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.garage_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
