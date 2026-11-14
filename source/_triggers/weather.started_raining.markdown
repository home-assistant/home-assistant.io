---
title: "Started raining"
trigger: weather.started_raining
domain: weather
description: "Triggers when one or more weather entities start reporting rain."
related_triggers:
  - weather.stopped_raining
  - weather.condition_changed
---

The **Started raining** trigger fires after a weather {% term entity %} starts reporting a rainy condition: **Hail**, **Rainy**, **Pouring**, or **Lightning, rainy**. Use this trigger to react as soon as rain begins, for example to close windows, bring in laundry, or pause outdoor irrigation.

{% include triggers/ui_header.md %}

To use **Started raining** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your weather entity is in, or select a specific entity or a label.
5. From the triggers shown for that target, select **Started raining**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple weather entities are targeted.
7. Under **For at least**, set how long the condition must stay rainy before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple weather entities are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted weather entity starts reporting rain.
    - **First**: fires only when the first of a group starts reporting rain.
    - **All**: fires only after every targeted weather entity is reporting rain.
  required: false
For at least:
  description: How long the condition must stay rainy before the trigger fires. Useful to ignore a single passing shower. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Started raining** is referred to as `weather.started_raining`. A basic example looks like this:

{% example %}
trigger: |
  trigger: weather.started_raining
  target:
    entity_id: weather.home
{% endexample %}

This fires every time `weather.home` starts reporting rain.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple weather entities are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted weather entity starts reporting rain.
    - `first`: fires only when the first weather entity starts reporting rain.
    - `all`: fires only after every targeted weather entity is reporting rain.
  required: false
  type: string
  default: each
for:
  description: |
    How long the condition must stay rainy before the trigger fires. For example, `00:05:00` fires only after it has been raining for 5 minutes, which helps avoid reacting to a single passing shower. For a list of all accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: false
  type: [string, integer, map]
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger fires when the condition changes to **Hail**, **Rainy**, **Pouring**, or **Lightning, rainy**. **Snowy, rainy** is not included, because it is primarily a snow condition.
- This trigger does not fire while the weather entity is **Unavailable** or **Unknown**.
- To react when rain stops instead, use **Stopped raining**.
- To trigger on a specific condition other than rain, such as **Snowy** or **Windy**, use **Weather condition changed**.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: close windows when it starts raining

When the weather entity for your home starts reporting rain, close all windows to keep the rain out.

- **Trigger**: Started raining
  - **Target**: `weather.home`
- **Action**: Close cover

{% details "YAML example for closing windows when rain starts" %}

{% example %}
automation: |
  alias: "Close windows when it starts raining"
  triggers:
    - trigger: weather.started_raining
      target:
        entity_id: weather.home
  actions:
    - action: cover.close_cover
      target:
        entity_id: cover.windows
{% endexample %}

{% enddetails %}

### Automation: pause irrigation after rain has fallen for 10 minutes

When the garden's weather entity reports rain for at least 10 minutes, pause the irrigation {% term script %} so you don't water an already-wet garden. The delay avoids reacting to a brief drizzle.

- **Trigger**: Started raining
  - **Target**: `weather.garden`
  - **For at least**: 10 minutes
- **Action**: Run script

{% details "YAML example for pausing irrigation after rain" %}

{% example %}
automation: |
  alias: "Pause irrigation when it rains"
  triggers:
    - trigger: weather.started_raining
      target:
        entity_id: weather.garden
      options:
        for: "00:10:00"
  actions:
    - action: script.pause_irrigation
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
