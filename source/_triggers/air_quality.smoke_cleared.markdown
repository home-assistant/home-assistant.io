---
title: "Smoke cleared"
trigger: air_quality.smoke_cleared
domain: air_quality
description: "Triggers after one or more smoke sensors stop detecting smoke."
related_triggers:
  - air_quality.smoke_detected
---

The **Smoke cleared** trigger fires after a smoke sensor {% term entity %} stops detecting smoke, letting your home confirm that the danger has passed and it is safe to breathe easy again. After the chaos of a smoke alarm, an automatic all-clear brings real relief. Use this trigger to re-lock doors that were unlocked during evacuation, send a reassuring notification to your family, or restore your home to its normal routine.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your smoke sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Smoke cleared**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Any**, **First**, or **Last** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, set how long the sensor must stay in the cleared state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Any** to fire every time any targeted sensor clears, **First** to fire only when the first sensor in a group clears, or **Last** to fire only after every targeted sensor has cleared.
  required: true
For at least:
  description: How long the sensor must stay in the cleared state before the trigger fires. Set to zero to fire immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.smoke_cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.smoke_cleared
  target:
    entity_id: binary_sensor.living_room_smoke
{% endexample %}

This fires every time `binary_sensor.living_room_smoke` transitions to the cleared state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: >
    When multiple sensors are targeted, controls when the trigger fires. Accepts `any`, `first`, or `last`.
  required: true
  type: string
  default: any
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
- Use the **For at least** option to confirm the smoke has truly cleared. A delay of ten or fifteen minutes helps avoid premature all-clear actions.
- To react to the opposite transition, use [Smoke detected](/triggers/air_quality.smoke_detected/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: secure your home again once the smoke clears

After a smoke event, your front door was unlocked to help everyone evacuate safely. Once every smoke sensor has been clear for fifteen minutes, this automation locks the door again and sends a reassuring notification to your phone. Your home goes back to being secure, and you know the situation is truly resolved without having to check every sensor yourself.

- **Trigger**: Smoke cleared
- **Target**: All smoke sensors (by label)
- **Trigger when**: Last
- **For at least**: 00:15:00
- **Action**: Lock: Lock
- **Action**: Send a mobile notification

{% details "YAML example for re-locking after smoke clears" %}

{% example %}
automation: |
  alias: "Re-lock door after smoke clears"
  triggers:
    - trigger: air_quality.smoke_cleared
      target:
        label_id: smoke_sensors
      options:
        behavior: last
        for: "00:15:00"
  actions:
    - action: lock.lock
      target:
        entity_id: lock.front_door
    - action: notify.mobile_app_phone
      data:
        message: "All smoke sensors are clear."
        title: "Smoke all-clear"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
