---
title: "Battery is not low"
condition: battery.is_not_low
domain: battery
description: "Tests if one or more batteries are not reporting a low charge."
related_conditions:
  - battery.is_low
  - battery.is_level
  - battery.is_charging
---

The **Battery is not low** condition passes when a battery-powered device is not reporting a low battery. Many devices, like door sensors, smoke detectors, and remote controls, expose a dedicated low-battery indicator that flips on once the charge drops past the manufacturer's threshold. Use **Battery is not low** to confirm a device still has enough power before running an automation, for example to only start a scheduled test when every sensor is in good shape.

For a visual overview of all battery statuses, open the {% my maintenance title="**Maintenance** dashboard" %}.

{% include conditions/ui_header.md %}

To use **Battery is not low** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your battery-powered device is in (like your hallway or garden). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Battery is not low**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple devices are targeted.
7. Under **For at least**, set how long the device must have been reporting a normal battery before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple devices are targeted, controls how results combine. Pick **Any** to pass if at least one targeted device is not reporting a low battery, or **All** to pass only when every targeted device is not reporting a low battery. Default is **Any**.
For at least:
  description: How long the device must have been continuously reporting a normal battery before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Battery is not low** is referred to as `battery.is_not_low`. A basic example looks like this:

{% example %}
condition: |
  condition: battery.is_not_low
  target:
    entity_id: binary_sensor.front_door_sensor_battery_low
{% endexample %}

This passes when the front door sensor is not reporting a low battery.

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
    How long the device must have been continuously reporting a normal battery before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with binary sensors that have the `battery` device class. These are typically separate entities from the battery percentage sensor and only report `on` (low) or `off` (normal).
- Not every battery-powered device exposes a low-battery indicator. If yours doesn't, use [Battery level](/conditions/battery.is_level/) with a percentage threshold instead.
- Devices that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- To check the opposite state, use [Battery is low](/conditions/battery.is_low/).
- For an overview of the status of your battery {% term entities %}, open the [**Maintenance** dashboard](/dashboards/dashboards/#dashboards-only-shown-in-the-dashboard-list-by-default). This dashboard allows you to quickly see which batteries need replacing.

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only run a smoke detector test when every battery is healthy

This automation runs a monthly smoke detector test, but only when all detectors report a normal battery. If any is low, the test is skipped so you can replace the battery first.

- **Trigger**: Time: First day of the month at 10:00
- **Condition**: Battery is not low
  - **Target**: Smoke detector batteries
  - **Condition passes if**: All
- **Action**: Run smoke detector test script

{% details "YAML example for a battery-aware monthly test" %}

{% example %}
automation: |
  alias: "Monthly smoke detector test when batteries are healthy"
  triggers:
    - trigger: time
      at: "10:00:00"
  conditions:
    - condition: template
      value_template: "{{ now().day == 1 }}"
    - condition: battery.is_not_low
      target:
        label_id: smoke_detectors
      options:
        behavior: all
  actions:
    - action: script.test_smoke_detectors
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
