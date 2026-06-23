---
title: "Valve opened"
trigger: valve.opened
domain: valve
description: "Triggers after one or more valves open."
related_triggers:
  - valve.closed
---

The **Valve opened** trigger fires after a valve {% term entity %} transitions to the open state. Valve entities represent water, gas, or air valves in your home.

Use it to react the moment a valve is opened, whether it was opened manually, by a schedule, through an {% term automation %}, or by a voice command. Use this trigger in an automation to log irrigation activity, send a notification when the main water valve opens unexpectedly, or start a timer to auto-close a valve after a set duration.

{% include triggers/ui_header.md %}

To use this trigger in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target**, pick the area your valve is in, such as your garden or utility room. You can also select a device, a specific entity, or a label, as described in [Targets](#targets).
5. From the triggers shown for that target, select **Valve opened**.
6. Under **Trigger when**, pick **Each**, **First**, or **All** to control how the trigger behaves when multiple valves are targeted, as described in [Behavior](#behavior-with-multiple-targets).
7. Under **For at least**, set how long the valve must stay open before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple valves are targeted, controls when the trigger fires:

    - **Each** (default) fires every time any targeted valve opens.
    - **First** fires only when the first of a group opens.
    - **All** fires only after every targeted valve is open.
For at least:
  description: How long the valve must stay open before the trigger fires. Default is 0 (fires immediately). Useful to ignore brief, accidental openings.
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, refer to this trigger as `valve.opened`. A basic example looks like this:

{% example %}
trigger: |
  trigger: valve.opened
  target:
    entity_id: valve.garden_irrigation
{% endexample %}

This fires every time `valve.garden_irrigation` transitions to the **Open** state.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple valves are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted valve opens.
    - `first`: fires only when the first valve in the group opens.
    - `all`: fires only after every targeted valve is open.
  required: false
  type: string
  default: each
for:
  description: >
    How long the valve must stay open before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:00:30` fires only after the valve has stayed open for 30 seconds, which helps ignore brief or accidental openings.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- The trigger fires when the valve reaches the **Open** state. It does not fire during the transitional **Opening** state while the valve is still moving. You can check the available states in [The state of a valve entity](/integrations/valve/#the-state-of-a-valve-entity).
- Valves that report position (0 to 100%) are considered open as soon as their position is above 0.
- Use the **For at least** option to avoid false alarms from brief or accidental openings, such as a momentary network glitch that causes a valve to re-report its state.
- This trigger works with any valve entity in Home Assistant, including water, gas, and air valves from integrations such as MQTT, Z-Wave, Zigbee, and ESPHome.
- You can conserve water by pairing this trigger with a timer. Create an automation that, when an irrigation or garden valve opens, starts a countdown and automatically closes it after the intended duration. This prevents over-watering caused by a valve left open, which is one of the most common sources of household water waste.
- Combine this trigger with a water leak sensor condition to detect unexpected openings that may indicate a burst pipe or a faulty valve. Catching these events immediately can prevent significant water loss and structural damage.
- Pair this trigger with a weather integration in an automation to water plants smarter, not harder. If rain is forecast or soil moisture sensors report sufficient levels, a condition can block the opening entirely, so your garden only gets watered when it actually needs it.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: Send a notification when the main water valve opens unexpectedly

A safety automation that alerts you whenever your main water shutoff valve opens outside of a scheduled irrigation window. This is a useful early warning for unexpected water flow.

- **Trigger**: Valve opened
  - **Target**: `valve.main_water_shutoff`
- **Condition**: Not
  - **Condition**: Time (after 06:00 AM and before 08:00 AM)
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for an unexpected valve open alert" %}

{% example %}
automation: |
  alias: "Alert when main water valve opens unexpectedly"
  triggers:
    - trigger: valve.opened
      target:
        entity_id: valve.main_water_shutoff
  conditions:
    - condition: not
      conditions:
        - condition: time
          after: "06:00:00"
          before: "08:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "⚠️ Water valve opened"
        message: "The main water shutoff valve opened outside the scheduled irrigation window."
{% endexample %}

{% enddetails %}

### Automation: Close irrigation valve automatically after a water-saving time limit

A water-conservation automation that starts a countdown the moment an irrigation valve opens and closes it automatically once the allowed watering time has elapsed. This prevents over-watering and avoids the water waste caused by a valve left open accidentally or by a schedule that does not account for recent rainfall.

- **Trigger**: Valve opened
  - **Target**: `valve.garden_irrigation`
- **Condition**: Numeric state (below 5 mm)
  - **Target**: `sensor.rain_last_24h_mm` (weather or rain sensor entity)
- **Action**: Wait for time to pass (delay: 15 minutes)
- **Action**: Close valve
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a water-saving auto-close after irrigation opens" %}

{% example %}
automation: |
  alias: "Auto-close irrigation after water-saving limit"
  triggers:
    - trigger: valve.opened
      target:
        entity_id: valve.garden_irrigation
  conditions:
    - condition: numeric_state
      entity_id: sensor.rain_last_24h_mm
      below: 5
  actions:
    - delay: "00:15:00"
    - action: valve.close_valve
      target:
        entity_id: valve.garden_irrigation
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "💧 Irrigation closed"
        message: "Garden valve closed after 15 minutes. Water used wisely!"
{% endexample %}

{% enddetails %}

{% include triggers/stuck.md %}

{% include triggers/related.md %}
