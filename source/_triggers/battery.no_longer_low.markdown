---
title: "Battery not low"
trigger: battery.no_longer_low
domain: battery
description: "Triggers after one or more battery sensors stop reporting a low battery."
related_triggers:
  - battery.became_low
---

The **Battery not low** trigger fires when a battery sensor stops reporting that the battery is low. This happens when batteries are replaced or, for rechargeable devices, when the battery charges back above the low threshold.

Use **Battery not low** to confirm that a device is ready to use again after maintenance, resume automations that were paused during a low-battery state, or log when devices return to a healthy battery level.

For an overview of the status of all your battery {% term entities %}, open {% my maintenance title="**Maintenance** dashboard" %}. This dashboard allows you to quickly see which batteries need replacing.

{% include triggers/ui_header.md %}

To use **Battery not low** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your battery-powered device is in (like your hallway or garden). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Battery not low**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, enter how long the sensor must remain reporting a normal battery level before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple battery sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor stops reporting a low battery.
    - **First**: fires only when the first targeted sensor stops reporting a low battery.
    - **All**: fires only after every targeted sensor stops reporting a low battery.
  required: false
For at least:
  description: How long the sensor or sensors must remain reporting a normal battery level before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Battery not low** is referred to as `battery.no_longer_low`. A basic example looks like this:

{% example %}
trigger: |
  trigger: battery.no_longer_low
  target:
    entity_id: binary_sensor.front_door_lock_battery
{% endexample %}

This fires the moment `binary_sensor.front_door_lock_battery` stops reporting a low battery.

To watch all battery sensors in a room and fire when any of them returns to a normal level:

{% example %}
trigger: |
  trigger: battery.no_longer_low
  target:
    area_id: living_room
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple battery sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor stops reporting a low battery.
    - `first`: fires only when the first targeted sensor stops reporting a low battery.
    - `all`: fires only after every targeted sensor stops reporting a low battery.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must remain reporting a normal battery level before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a binary sensor entity with the battery device class.
- What counts as "low" depends on the device and its integration. The battery binary sensor is controlled by the device or its integration, not by Home Assistant.
- For battery percentage sensors, use [Battery level crossed threshold](/triggers/battery.level_crossed/) instead.
- Use this trigger together with [Battery low](/triggers/battery.became_low/) to build a complete low-battery workflow: alert when a device goes low, and confirm or log when it is healthy again.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: log when a device battery is healthy again

After you replace batteries or recharge a device, it can be useful to know that the sensor is back to normal. This automation sends a notification when a front door lock battery stops reporting low, confirming the replacement worked.

- **Trigger**: Battery not low
  - **Target**: Front door lock battery entity
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a battery recovery notification" %}

{% example %}
automation: |
  alias: "Notify when front door lock battery is no longer low"
  triggers:
    - trigger: battery.no_longer_low
      target:
        entity_id: binary_sensor.front_door_lock_battery
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Front door lock battery is no longer low. Good to go."
{% endexample %}

{% enddetails %}
