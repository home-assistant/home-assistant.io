---
title: "Humidifier turned on"
trigger: humidifier.turned_on
domain: humidifier
description: "Triggers when one or more humidifiers turn on."
related_triggers:
  - humidifier.turned_off
  - humidifier.started_humidifying
  - humidifier.started_drying
---

The **Humidifier turned on** trigger fires after a humidifier {% term entity %} turns on. Use it to start an automation the moment the device powers up, whether you turned it on manually, through the app, or via another automation.

When you target more than one humidifier, the **Trigger when** option controls when it fires. You can have it fire the first time any targeted humidifier turns on, only after all targeted humidifiers have turned on, or every single time any of them turn on.

{% include triggers/ui_header.md %}

To use **Humidifier turned on** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Humidifier turned on**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple humidifiers are targeted.
7. Under **For at least**, set how long the humidifier must stay on before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted humidifier turns on.
    - **First**: fires only when the first of a group turns on.
    - **All**: fires only after every targeted humidifier is on.
For at least:
  description: How long the humidifier must stay on before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Humidifier turned on** is referred to as `humidifier.turned_on`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidifier.turned_on
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This fires every time `humidifier.bedroom` transitions from off to on.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted humidifier turns on.
    - `first`: fires only when the first of a group turns on.
    - `all`: fires only after every targeted humidifier is on.
  required: false
  type: string
  default: each
for:
  description: |
    How long the humidifier must stay on before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the humidifier has stayed on for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a humidifier transitions from a known, valid state. If a humidifier comes back from the **Unavailable** or **Unknown** state, the trigger does not fire for that recovery.
- Turning on a humidifier does not necessarily mean it starts actively humidifying immediately. To react when humidification actually begins, use [Humidifier started humidifying](/triggers/humidifier.started_humidifying/) instead.
- To react to the opposite transition, use [Humidifier turned off](/triggers/humidifier.turned_off/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: turn on a fan when the bedroom humidifier powers on

When the bedroom humidifier turns on, start a low-speed fan to help distribute the moisture more evenly throughout the room.

- **Trigger**: Humidifier turned on
  - **Target**: Bedroom humidifier
- **Action**: Turn on fan
  - **Target**: Bedroom fan
  - **Percentage**: `30`%

{% details "YAML example for running a fan when the humidifier turns on" %}

{% example %}
automation: |
  alias: "Start fan when bedroom humidifier turns on"
  triggers:
    - trigger: humidifier.turned_on
      target:
        entity_id: humidifier.bedroom
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom
      data:
        percentage: 30
{% endexample %}

{% enddetails %}

### Automation: notify when the nursery humidifier turns on overnight

If the nursery humidifier turns on during the night, send a quiet notification to your phone so you know air quality is being maintained without having to check the app.

- **Trigger**: Humidifier turned on
  - **Target**: Nursery humidifier
  - **Trigger when**: Each
- **Condition**: Time is between 22:00 and 07:00
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a nighttime nursery humidifier notification" %}

{% example %}
automation: |
  alias: "Notify on nursery humidifier at night"
  triggers:
    - trigger: humidifier.turned_on
      target:
        entity_id: humidifier.nursery
      options:
        behavior: each
        for: "00:00:00"
  conditions:
    - condition: time
      after: "22:00:00"
      before: "07:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Nursery humidifier turned on."
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
