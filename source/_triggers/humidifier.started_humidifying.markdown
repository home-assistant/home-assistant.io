---
title: "Humidifier started humidifying"
trigger: humidifier.started_humidifying
domain: humidifier
description: "Triggers after one or more humidifiers start actively humidifying."
related_triggers:
  - humidifier.turned_on
  - humidifier.started_drying
---

The **Humidifier started humidifying** trigger fires when a humidifier {% term entity %} begins actively adding moisture to the air. A humidifier that is turned on does not necessarily humidify continuously. It pauses once the target humidity is reached and then resumes when the air dries out again. **Humidifier started humidifying** fires whenever it moved from idle back to active humidification.

Use **Humidifier started humidifying** to track active humidification cycles, send notifications when the air is dry enough that the device kicks back in, or coordinate other devices that should run alongside it.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Humidifier started humidifying** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your humidifier is in (like your bedroom or living room). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Humidifier started humidifying**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple humidifiers are targeted.
7. Under **For at least**, set how long the humidifier must be actively humidifying before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - **Each** (`each` in YAML, default): fire every time any targeted humidifier starts humidifying.
    - **First** (`first` in YAML): fire only on the first humidifier that starts humidifying.
    - **All** (`all` in YAML): fire only after every targeted humidifier starts humidifying.
For at least:
  description: How long the humidifier must be actively humidifying before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Humidifier started humidifying** is referred to as `humidifier.started_humidifying`. A basic example looks like this:

{% example %}
trigger: |
  trigger: humidifier.started_humidifying
  target:
    entity_id: humidifier.bedroom
{% endexample %}

This fires every time `humidifier.bedroom` starts actively adding moisture to the air.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple humidifiers are targeted, controls when the trigger fires:

    - `each` (**Each** in the UI, default): fire every time any targeted humidifier starts humidifying.
    - `first` (**First** in the UI): fire only on the first humidifier that starts humidifying.
    - `all` (**All** in the UI): fire only after every targeted humidifier starts humidifying.
  required: false
  type: string
  default: each
for:
  description: |
    How long the humidifier must be actively humidifying before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:05:00` fires only after the humidifier has been actively humidifying for 5 minutes.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- **Humidifier started humidifying** fires independently of [Humidifier turned on](/triggers/humidifier.turned_on/). A humidifier can be on but idle, and **Humidifier started humidifying** fires only when it moves from idle to active.
- To react to the opposite transition on a dehumidifier, use [Humidifier started drying](/triggers/humidifier.started_drying/).
- If your device is a dehumidifier, it removes moisture rather than adds it. Use [Humidifier started drying](/triggers/humidifier.started_drying/) instead.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when the nursery needs more moisture

When the nursery humidifier starts humidifying again after a pause, it means the air has dried out. Send a gentle notification so you're aware the cycle has restarted overnight.

- **Trigger**: Humidifier started humidifying
  - **Target**: Nursery humidifier
  - **Trigger when**: Each
- **Condition**: Time is between 22:00 and 07:00
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a nursery humidity cycle alert" %}

{% example %}
automation: |
  alias: "Alert when nursery starts humidifying at night"
  triggers:
    - trigger: humidifier.started_humidifying
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
        message: "Nursery humidifier started humidifying."
{% endexample %}

{% enddetails %}

### Automation: turn on a fan to help distribute moisture

When the bedroom humidifier starts humidifying, turn on a low-speed fan to distribute the moisture more evenly throughout the room.

- **Trigger**: Humidifier started humidifying
  - **Target**: Bedroom humidifier
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Fan: Turn on

{% details "YAML example for running a fan when humidifying starts" %}

{% example %}
automation: |
  alias: "Run fan when bedroom humidifies"
  triggers:
    - trigger: humidifier.started_humidifying
      target:
        entity_id: humidifier.bedroom
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.bedroom
      data:
        percentage: 30
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
