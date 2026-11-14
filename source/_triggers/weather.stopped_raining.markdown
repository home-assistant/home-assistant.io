---
title: "Stopped raining"
trigger: weather.stopped_raining
domain: weather
description: "Triggers when one or more weather entities stop reporting rain."
related_triggers:
  - weather.started_raining
  - weather.condition_changed
---

The **Stopped raining** trigger fires after a weather {% term entity %} changes from a rainy condition (**Hail**, **Rainy**, **Pouring**, or **Lightning, rainy**) to any non-rainy condition. Use this trigger to react once rain has cleared, for example to resume outdoor irrigation or open windows again.

{% include triggers/ui_header.md %}

To use **Stopped raining** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your weather entity is in, or select a specific entity or a label.
5. From the triggers shown for that target, select **Stopped raining**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple weather entities are targeted.
7. Under **For at least**, set how long the condition must stay non-rainy before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple weather entities are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted weather entity stops reporting rain.
    - **First**: fires only when the first of a group stops reporting rain.
    - **All**: fires only after every targeted weather entity has stopped reporting rain.
  required: false
For at least:
  description: How long the condition must stay non-rainy before the trigger fires. Useful to ignore a brief break between rain showers. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Stopped raining** is referred to as `weather.stopped_raining`. A basic example looks like this:

{% example %}
trigger: |
  trigger: weather.stopped_raining
  target:
    entity_id: weather.home
{% endexample %}

This fires every time `weather.home` changes from rain to a dry condition.

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple weather entities are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted weather entity stops reporting rain.
    - `first`: fires only when the first weather entity stops reporting rain.
    - `all`: fires only after every targeted weather entity has stopped reporting rain.
  required: false
  type: string
  default: each
for:
  description: |
    How long the condition must stay non-rainy before the trigger fires. For example, `00:15:00` fires only after it has stayed dry for 15 minutes, which helps avoid reacting to a short break between showers. For a list of all accepted formats, refer to [Durations in automations and scripts](/docs/automation/durations/).
  required: false
  type: [string, integer, map]
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger only fires on a transition from a rainy condition (**Hail**, **Rainy**, **Pouring**, or **Lightning, rainy**) to a non-rainy one. It does not fire on startup, even if the weather entity's initial state is already dry.
- This trigger does not fire while the weather entity is **Unavailable** or **Unknown**.
- To react when rain begins instead, use **Started raining**.
- To trigger on a specific condition other than rain, such as **Sunny** or **Cloudy**, use **Weather condition changed**.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: resume irrigation 15 minutes after rain stops

When the garden's weather entity has stayed dry for 15 minutes after rain, resume the irrigation {% term script %}. The delay avoids restarting irrigation during a brief lull between showers.

- **Trigger**: Stopped raining
  - **Target**: `weather.garden`
  - **For at least**: 15 minutes
- **Action**: Run script

{% details "YAML example for resuming irrigation after rain stops" %}

{% example %}
automation: |
  alias: "Resume irrigation after rain stops"
  triggers:
    - trigger: weather.stopped_raining
      target:
        entity_id: weather.garden
      options:
        for: "00:15:00"
  actions:
    - action: script.resume_irrigation
{% endexample %}

{% enddetails %}

### Automation: notify when the rain clears

When the weather entity for your home stops reporting rain, send a notification so you know it's safe to go outside again.

- **Trigger**: Stopped raining
  - **Target**: `weather.home`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for notifying when rain clears" %}

{% example %}
automation: |
  alias: "Notify when rain clears"
  triggers:
    - trigger: weather.stopped_raining
      target:
        entity_id: weather.home
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The rain has stopped."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
