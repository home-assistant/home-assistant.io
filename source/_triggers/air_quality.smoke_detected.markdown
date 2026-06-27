---
title: "Smoke detected"
trigger: air_quality.smoke_detected
domain: air_quality
description: "Triggers when one or more smoke sensors start detecting smoke."
related_triggers:
  - air_quality.smoke_cleared
---

The **Smoke detected** trigger fires the moment a smoke sensor {% term entity %} starts detecting smoke, giving you the earliest possible warning of a potential fire. Whether you are deep asleep at 3 AM, away on vacation, or simply in another part of the house, this trigger makes sure Home Assistant reacts on your behalf. Flash the lights to wake sleeping children, unlock doors to speed up evacuation, or send an urgent alert to your phone so you always know what is happening at home.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your smoke sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Smoke detected**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, set how long the sensor must stay in the detected state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor detects smoke, **First** to fire only when the first sensor in a group detects smoke, or **All** to fire only after every targeted sensor detects smoke.
For at least:
  description: How long the sensor must stay in the detected state before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.smoke_detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.smoke_detected
  target:
    entity_id: binary_sensor.living_room_smoke
{% endexample %}

This fires every time `binary_sensor.living_room_smoke` transitions to the detected state.

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
- For fire safety, keep the **For at least** delay short or at zero. Every second counts when smoke is involved.
- To react to the opposite transition, use [Smoke cleared](/triggers/air_quality.smoke_cleared/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: flash the lights and alert everyone in the household

Picture this: it is the middle of the night and a smoke sensor activates in the hallway. A standard alarm beeps, but someone wearing earplugs or a heavy sleeper might not notice. This automation flashes every light in the living room and sends an urgent notification to your phone at the same time, making sure the alert reaches everyone through both sight and sound.

- **Trigger**: Smoke detected
  - **Target**: All smoke sensors (by label)
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Light: Turn on light (flash)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a smoke detection alert" %}

{% example %}
automation: |
  alias: "Smoke alert with lights and notification"
  triggers:
    - trigger: air_quality.smoke_detected
      target:
        label_id: smoke_sensors
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: light.turn_on
      target:
        area_id: living_room
      data:
        flash: long
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Smoke detected in the house!"
        title: "Smoke alert"
{% endexample %}

{% enddetails %}

### Automation: unlock the front door so your family gets out faster

In a fire, fumbling with a lock in the dark costs precious seconds. This automation unlocks the front door after smoke has been confirmed for 30 seconds, removing one obstacle from the evacuation path. Your family gets a clear exit, and you get the peace of mind that your home is actively looking out for their safety.

- **Trigger**: Smoke detected
- **Target**: All smoke sensors (by label)
- **Trigger when**: Each
- **For at least**: 00:00:30
- **Action**: Lock: Unlock

{% details "YAML example for unlocking the door on smoke detection" %}

{% example %}
automation: |
  alias: "Unlock front door on smoke detection"
  triggers:
    - trigger: air_quality.smoke_detected
      target:
        label_id: smoke_sensors
      options:
        behavior: each
        for: "00:00:30"
  actions:
    - action: lock.unlock
      target:
        entity_id: lock.front_door
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
