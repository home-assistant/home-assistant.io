---
title: "Carbon monoxide detected"
trigger: air_quality.co_detected
domain: air_quality
description: "Triggers after one or more carbon monoxide sensors start detecting carbon monoxide."
related_triggers:
  - air_quality.co_cleared
---

The **Carbon monoxide detected** trigger fires the moment a carbon monoxide sensor {% term entity %} starts detecting carbon monoxide. Carbon monoxide is colorless and odorless, which makes it one of the most dangerous household hazards because you simply cannot sense it on your own. This trigger gives Home Assistant the ability to warn you immediately, whether your family is sleeping, the kids are playing downstairs, or you are away at work. Pair it with a loud siren and an urgent phone notification for the strongest possible safety net.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your CO sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Carbon monoxide detected**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, set how long the sensor must stay in the detected state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor detects carbon monoxide, **First** to fire only when the first sensor in a group detects carbon monoxide, or **All** to fire only after every targeted sensor detects carbon monoxide.
For at least:
  description: How long the sensor must stay in the detected state before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co_detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co_detected
  target:
    entity_id: binary_sensor.hallway_co
{% endexample %}

This fires every time `binary_sensor.hallway_co` transitions to the detected state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sensors are targeted, controls when the trigger fires. Accepts `each`, `first`, or `all`.
  required: true
  type: string
  default: each
for:
  description: >
    Duration the state must hold before firing. Accepts a duration string like `00:05:00` for five minutes.
  required: true
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger only fires when a sensor transitions from a known, valid state. If a sensor comes back from being unavailable (`unavailable`) or having an unknown state (`unknown`), the trigger does not fire for that recovery.
- Carbon monoxide is odorless and colorless, making automated alerts especially important. Pair this trigger with a loud notification or siren action for maximum safety.
- To react to the opposite transition, use [Carbon monoxide cleared](/triggers/air_quality.co_cleared/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: sound the alarm and alert the whole household

Imagine everyone in your home is fast asleep and carbon monoxide starts building up from a faulty furnace. This automation triggers every siren in the house and sends an urgent notification to your phone the instant any sensor picks up carbon monoxide. Those extra seconds of warning protect the people who matter most to you.

- **Trigger**: Carbon monoxide detected
  - **Target**: All CO sensors (by label)
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Siren: Turn on
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a carbon monoxide alarm" %}

{% example %}
automation: |
  alias: "CO alarm and notification"
  triggers:
    - trigger: air_quality.co_detected
      target:
        label_id: co_sensors
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: siren.turn_on
      target:
        entity_id: siren.home_alarm
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Carbon monoxide detected!"
        title: "CO alert"
{% endexample %}

{% enddetails %}

### Automation: ventilate the garage automatically when CO builds up

A car left idling or a gas-powered tool running in the garage produces carbon monoxide that builds up fast in an enclosed space. This automation turns on the exhaust fan after a confirmed one-minute reading, helping clear the air before the situation becomes dangerous. You could also combine this with a notification so you know to check on what caused the buildup.

- **Trigger**: Carbon monoxide detected
- **Target**: Garage CO sensor
- **Trigger when**: Each
- **For at least**: 00:01:00
- **Action**: Fan: Turn on

{% details "YAML example for ventilation on CO detection" %}

{% example %}
automation: |
  alias: "Garage ventilation on CO detection"
  triggers:
    - trigger: air_quality.co_detected
      target:
        entity_id: binary_sensor.garage_co
      options:
        behavior: each
        for: "00:01:00"
  actions:
    - action: fan.turn_on
      target:
        entity_id: fan.garage_exhaust
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
