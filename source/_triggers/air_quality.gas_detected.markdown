---
title: "Gas detected"
trigger: air_quality.gas_detected
domain: air_quality
description: "Triggers when one or more gas sensors start detecting gas."
related_triggers:
  - air_quality.gas_cleared
---

The **Gas detected** trigger fires the moment a gas sensor {% term entity %} starts detecting gas in your home, whether it is a natural gas leak near the stove or a combustible gas buildup in the basement. A gas leak is one of those situations where every second of early warning matters. With this trigger, Home Assistant alerts you instantly so you and your family have time to react, even in the middle of the night or while you are away from home.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your gas sensor is in (like your kitchen or garage). You can also select a floor, a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Gas detected**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, set how long the sensor must stay in the detected state before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: When multiple sensors are targeted, controls when the trigger fires. Pick **Each** to fire every time any targeted sensor detects gas, **First** to fire only when the first sensor in a group detects gas, or **All** to fire only after every targeted sensor detects gas.
For at least:
  description: How long the sensor must stay in the detected state before the trigger fires. Set to zero to fire immediately.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `air_quality.gas_detected`. A basic example looks like this:

{% example %}
trigger: |
  trigger: air_quality.gas_detected
  target:
    entity_id: binary_sensor.kitchen_gas
{% endexample %}

This fires every time `binary_sensor.kitchen_gas` transitions to the detected state.

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
- Use the **For at least** option to avoid false alarms from brief sensor spikes. Setting a short delay (like one or two minutes) helps confirm the reading is genuine.
- To react to the opposite transition, use [Gas cleared](/triggers/air_quality.gas_cleared/).

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get an urgent phone alert the moment gas is detected in the kitchen

Imagine you are upstairs or out running errands and a burner valve is leaking in the kitchen. This automation sends an urgent notification straight to your phone the instant your kitchen gas sensor picks something up, giving you the earliest possible warning to take action.

- **Trigger**: Gas detected
  - **Target**: Kitchen gas sensor
  - **Trigger when**: Each
  - **For at least**: 00:00:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a gas detection notification" %}

{% example %}
automation: |
  alias: "Notify on kitchen gas detection"
  triggers:
    - trigger: air_quality.gas_detected
      target:
        entity_id: binary_sensor.kitchen_gas
      options:
        behavior: each
        for: "00:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Gas detected in the kitchen!"
        title: "Gas alert"
{% endexample %}

{% enddetails %}

### Automation: automatically shut off the gas valve to protect your home

When a gas leak happens while everyone is asleep or nobody is home, you want the house to protect itself. This automation watches every gas sensor in the house and, after a confirmed 30-second reading, shuts off the main gas valve automatically. That extra layer of safety means you never have to rely on being awake and nearby to prevent a dangerous situation.

- **Trigger**: Gas detected
- **Target**: All gas sensors (by label)
- **Trigger when**: Each
- **For at least**: 00:00:30
- **Action**: Valve: Close

{% details "YAML example for automatic gas shutoff" %}

{% example %}
automation: |
  alias: "Shut gas valve on detection"
  triggers:
    - trigger: air_quality.gas_detected
      target:
        label_id: gas_sensors
      options:
        behavior: each
        for: "00:00:30"
  actions:
    - action: valve.close_valve
      target:
        entity_id: valve.gas_main
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
