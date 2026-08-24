---
title: "Battery low"
trigger: battery.became_low
domain: battery
description: "Triggers after one or more battery sensors report a low battery."
related_triggers:
  - battery.no_longer_low
---

The **Battery low** trigger fires when a battery sensor reports that the battery is low.

Use **Battery low** to send an alert before a device goes offline, pause automations that rely on battery-powered sensors, or keep a log of which devices need attention. Combine it with an area or label target to monitor all battery-powered devices in a room or across your whole home at once.

For a visual overview of all battery statuses, open the {% my maintenance title="**Maintenance** dashboard" %}.

{% include triggers/ui_header.md %}

To use **Battery low** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your battery-powered device is in (like your hallway or garden). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Battery low**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple sensors are targeted.
7. Under **For at least**, enter how long the sensor must remain reporting low battery before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple battery sensors are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted sensor reports a low battery.
    - **First**: fires only when the first targeted sensor reports a low battery.
    - **All**: fires only after every targeted sensor reports a low battery.
  required: false
For at least:
  description: How long the sensor or sensors must remain reporting low battery before the trigger fires. The default is `0` hours, `00` minutes and `00` seconds (fires immediately).
  required: false
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Battery low** is referred to as `battery.became_low`. A basic example looks like this:

{% example %}
trigger: |
  trigger: battery.became_low
  target:
    entity_id: binary_sensor.front_door_lock_battery
{% endexample %}

This fires the moment `binary_sensor.front_door_lock_battery` reports a low battery.

To watch all battery sensors in a room and fire only after every sensor in the area has reported low battery:

{% example %}
trigger: |
  trigger: battery.became_low
  target:
    area_id: living_room
  options:
    behavior: all
{% endexample %}

### Options in YAML

{% options_yaml %}
behavior:
  description: |
    When multiple battery sensors are targeted, controls when the trigger fires:

    - `each`: fires every time any targeted sensor reports a low battery.
    - `first`: fires only when the first targeted sensor reports a low battery.
    - `all`: fires only after every targeted sensor reports a low battery.
  required: false
  type: string
  default: each
for:
  description: |
    How long the sensor or sensors must remain reporting low battery before the trigger fires. Accepts a duration string in `HH:MM:SS` format or a time period mapping in hours, minutes and seconds.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- This trigger works with `binary_sensor` entities that have the `battery` device class. These are separate from battery percentage sensors (`sensor` entities with the `battery` device class). If your device only exposes a percentage sensor, use [Battery level crossed threshold](/triggers/battery.level_crossed/) instead.
- Use a label to group battery-powered devices across different areas, and target that label to monitor them all from a single automation.
- Combine this trigger with a notification action to get a push notification on your phone the moment any sensor runs low.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: get a notification when any sensor in an area runs low

Sensors in out-of-the-way spots like a mailbox or garden shed can run out of battery without you noticing. This automation sends you a notification the moment any battery sensor in your garden reports low battery, so you can replace it before it stops responding.

- **Trigger**: Battery low
  - **Target**: Garden area
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a low battery notification" %}

{% example %}
automation: |
  alias: "Notify when a garden sensor battery is low"
  triggers:
    - trigger: battery.became_low
      target:
        area_id: garden
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >-
          {{ trigger.entity_id }} is reporting a low battery.
          Time to replace it.
{% endexample %}

{% enddetails %}
