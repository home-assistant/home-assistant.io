---
title: "Battery is low"
condition: battery.is_low
domain: battery
description: "Tests if one or more batteries are reporting a low charge."
related_conditions:
  - battery.is_not_low
  - battery.is_level
  - battery.is_charging
---

The **Battery is low** condition passes when a battery-powered device reports that its battery is running low. Many devices, like door sensors, smoke detectors, and remote controls, expose a dedicated low-battery indicator that flips on once the charge drops past the manufacturer's threshold. Use **Battery is low** to run an automation only when at least one of your devices needs attention, for example to skip an arming routine while a critical sensor is low.

For a visual overview of all battery statuses, open {% my maintenance title="**Maintenance** dashboard" %}.

{% include conditions/ui_header.md %}

To use **Battery is low** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your battery-powered device is in (like your hallway or garden). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Battery is low**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple devices are targeted.
7. Under **For at least**, set how long the device must have been reporting low before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple devices are targeted, controls how results combine. Pick **Any** to pass if at least one targeted device is reporting a low battery, or **All** to pass only when every targeted device is reporting a low battery. Default is **Any**.
For at least:
  description: How long the device must have been continuously reporting a low battery before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Battery is low** is referred to as `battery.is_low`. A basic example looks like this:

{% example %}
condition: |
  condition: battery.is_low
  target:
    entity_id: binary_sensor.front_door_sensor_battery_low
{% endexample %}

This passes when the front door sensor is reporting a low battery.

### Options in YAML

{% options_yaml %}
behavior:
  description: >
    When multiple devices are targeted, controls how results combine. Accepts `all` or `any`.
  required: false
  type: string
  default: any
for:
  description: >
    How long the device must have been continuously reporting a low battery before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The target must be a binary sensor with the battery device class.
- The device must expose a low-battery indicator.
- Low-battery binary sensors are typically separate entities from the battery percentage sensor and only report `on` (low) or `off` (normal).
- If your device reports only a battery percentage, use [Battery level](/conditions/battery.is_level/) with a percentage threshold instead.
- Devices that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- To check the opposite state, use [Battery is not low](/conditions/battery.is_not_low/).
- For an overview of the status of your battery {% term entities %}, open the [**Maintenance** dashboard](/dashboards/dashboards/#dashboards-only-shown-in-the-dashboard-list-by-default). This dashboard allows you to quickly see which batteries need replacing.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: warn before arming the alarm with a low-battery sensor

When you tell the alarm to arm, this automation checks whether any of your door and window sensors are reporting a low battery. If one is, it sends a notification so you can decide whether to replace it before arming.

- **Trigger**: State: Alarm panel changes to "arming"
- **Condition**: Battery is low
  - **Target**: Door and window sensor batteries
  - **Condition passes if**: Any
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a low-battery alarm warning" %}

{% example %}
automation: |
  alias: "Warn about low sensor batteries before arming"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home
      to: "arming"
  conditions:
    - condition: battery.is_low
      target:
        label_id: perimeter_sensors
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "One or more perimeter sensors have a low battery."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
