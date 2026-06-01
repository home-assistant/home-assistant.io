---
title: "Battery is charging"
condition: battery.is_charging
domain: battery
description: "Tests if one or more battery-powered devices are charging."
related_conditions:
  - battery.is_not_charging
  - battery.is_level
  - battery.is_low
---

The **Battery is charging** condition passes when a battery-powered device is actively charging. A device is charging when it is connected to a power source, such as a charger, dock, or USB cable. Use **Battery is charging** to run an automation only while a device is plugged in, for example to delay noisy actions until a phone is on its charger, or to confirm a vacuum is docked and topping up before starting another routine.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Battery is charging** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your device is in (like your bedroom or office). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Battery is charging**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple devices are targeted.
7. Under **For at least**, set how long the device must have been continuously charging before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple devices are targeted, controls how results combine. Pick **Any** to pass if at least one targeted device is charging, or **All** to pass only when every targeted device is charging. Default is **Any**.
For at least:
  description: How long the device must have been continuously charging before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Battery is charging** is referred to as `battery.is_charging`. A basic example looks like this:

{% example %}
condition: |
  condition: battery.is_charging
  target:
    entity_id: sensor.phone_battery
{% endexample %}

This passes when `sensor.phone_battery` is charging.

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
    How long the device must have been continuously charging before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with sensors and devices that report a charging state, such as devices that expose a battery charging attribute.
- Devices that are unavailable (`unavailable`) or have an unknown state (`unknown`) are skipped for **Any** and fail for **All**.
- To check the opposite state, use [Battery is not charging](/conditions/battery.is_not_charging/).
- To check the battery percentage instead, use [Battery level](/conditions/battery.is_level/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: only run a backup when the laptop is plugged in

This automation kicks off a nightly backup, but only when the laptop is confirmed to be charging. That way the backup never drains the battery while you're away from a power source.

- **Trigger**: Time: Every day at 02:00
- **Condition**: Battery is charging
  - **Target**: Laptop battery
- **Action**: Start backup script

{% details "YAML example for a charge-aware nightly backup" %}

{% example %}
automation: |
  alias: "Nightly backup when laptop is charging"
  triggers:
    - trigger: time
      at: "02:00:00"
  conditions:
    - condition: battery.is_charging
      target:
        entity_id: sensor.laptop_battery
  actions:
    - action: script.run_nightly_backup
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
