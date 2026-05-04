---
title: "Gas cleared"
trigger: air_quality.gas_cleared
domain: air_quality
description: "Triggers after one or more gas sensors stop detecting gas."
related_triggers:
  - air_quality.gas_detected
---

The **Gas cleared** trigger fires after a gas sensor {% term entity %} stops detecting gas, letting you know the danger has passed and the air is safe again. After the stress of a gas alert, there is real comfort in getting a clear, automatic confirmation that everything is back to normal. Use this trigger to send an all-clear notification, re-open a gas valve that was shut off during the alarm, or restore your home to its everyday state.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your gas sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Gas cleared**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, set how long the sensor must stay in the cleared state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor clears, **First** to fire only when the first sensor in a group clears, or **All** to fire only after every targeted sensor has cleared.
  required: true
For at least:
  description: How long the sensor must stay in the cleared state before the trigger fires. Set to zero to fire immediately.
  required: true
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.gas_cleared`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.gas_cleared
  target:
    entity_id: binary_sensor.kitchen_gas
{% endexample %}

This fires every time `binary_sensor.kitchen_gas` transitions to the cleared state.

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
- Use the **For at least** option to make sure the gas has truly cleared. Setting a delay of five or ten minutes confirms the reading stays clear before you take action.
- To react to the opposite transition, use [Gas detected](/triggers/air_quality.gas_detected/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get peace of mind with an all-clear notification

After a gas alarm, the last thing you want is to keep wondering whether the situation is truly resolved. This automation waits until every gas sensor in the house has been clear for at least ten minutes, then sends a reassuring notification to your phone. No more checking the sensors yourself or second-guessing whether it is safe to go back inside.

- **Trigger**: Gas cleared
- **Target**: All gas sensors (by label)
- **Trigger when**: All
- **For at least**: 00:10:00
- **Action**: Send a mobile notification

{% details "YAML example for a gas all-clear notification" %}

{% example %}
automation: |
  alias: "Gas all-clear notification"
  triggers:
    - trigger: air_quality.gas_cleared
      target:
        label_id: gas_sensors
      options:
        behavior: last
        for: "00:10:00"
  actions:
    - action: notify.mobile_app_phone
      data:
        message: "All gas sensors are clear."
        title: "Gas all-clear"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
