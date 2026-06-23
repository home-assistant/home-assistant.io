---
title: "Carbon monoxide cleared"
trigger: air_quality.co_cleared
domain: air_quality
description: "Triggers after one or more carbon monoxide sensors stop detecting carbon monoxide."
related_triggers:
  - air_quality.co_detected
---

The **Carbon monoxide cleared** trigger fires after a carbon monoxide sensor {% term entity %} stops detecting carbon monoxide, confirming that the air in your home is safe again. After the urgency of a CO alarm, knowing exactly when the danger has passed brings real peace of mind. Use this trigger to silence a siren, send an all-clear notification to everyone in the household, or restore your home to its normal state so you and your family feel safe resuming everyday life.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your CO sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Carbon monoxide cleared**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, set how long the sensor must stay in the cleared state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor clears, **First** to fire only when the first sensor in a group clears, or **All** to fire only after every targeted sensor has cleared.
For at least:
  description: How long the sensor must stay in the cleared state before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.co_cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.co_cleared
  target:
    entity_id: binary_sensor.hallway_co
{% endexample %}

This fires every time `binary_sensor.hallway_co` transitions to the cleared state.

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
- Use the **For at least** option to confirm the air has truly cleared before taking action. A delay of ten or fifteen minutes helps avoid premature all-clear alerts.
- To react to the opposite transition, use [Carbon monoxide detected](/triggers/air_quality.co_detected/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: silence the siren and let everyone know it is safe

After a carbon monoxide alarm, a blaring siren and anxious waiting are the last things your family needs once the danger is over. This automation waits until every CO sensor in the house has been clear for fifteen minutes, then silences the siren and sends a reassuring all-clear notification to your phone. No more wondering whether it is truly safe to go back to sleep or return home.

- **Trigger**: Carbon monoxide cleared
  - **Target**: All CO sensors (by label)
  - **Trigger when**: All
  - **For at least**: 00:15:00
- **Action**: Siren: Turn off
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for silencing the siren after CO clears" %}

{% example %}
automation: |
  alias: "Silence siren after CO clears"
  triggers:
    - trigger: air_quality.co_cleared
      target:
        label_id: co_sensors
      options:
        behavior: all
        for: "00:15:00"
  actions:
    - action: siren.turn_off
      target:
        entity_id: siren.home_alarm
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "All CO sensors are clear."
        title: "CO all-clear"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
