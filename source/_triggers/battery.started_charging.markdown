---
title: "Battery started charging"
trigger: battery.started_charging
domain: battery
description: "Triggers when one or more batteries start charging."
related_triggers:
  - battery.stopped_charging
  - battery.level_changed
  - battery.level_crossed
---

The **Battery started charging** trigger fires when a battery-powered device transitions from not charging to actively charging. A device starts charging when it is connected to a power source, such as a charger, dock, or USB cable. Use this trigger to confirm when a device is plugged in, kick off automations that should run while a device charges, or log charging sessions over time.

{% include triggers/ui_header.md %}

To use **Battery started charging** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your device is in (like your bedroom or office). You can also select a device, a specific entity, or a label.
5. From the triggers shown for that target, select **Battery started charging**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple devices are targeted.
7. Under **For at least**, set how long the device must be actively charging before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple devices are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted device starts charging.
    - **First**: fires only on the first device that starts charging.
    - **All**: fires only after every targeted device starts charging.
For at least:
  description: How long the device must be actively charging before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Battery started charging** is referred to as `battery.started_charging`. A basic example looks like this:

{% example %}
trigger: |
  trigger: battery.started_charging
  target:
    entity_id: binary_sensor.phone_battery_charging
{% endexample %}

This fires every time `binary_sensor.phone_battery_charging` starts charging.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple devices are targeted, controls when the trigger fires:

    - `each` (default): fires every time any targeted device starts charging.
    - `first`: fires only on the first device that starts charging.
    - `all`: fires only after every targeted device starts charging.
  required: false
  type: string
  default: each
for:
  description: |
    How long the device must be actively charging before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:01:00` fires only after the device has been charging for 1 minute.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- Use a binary sensor with the battery charging device class.
- **Battery started charging** fires only when a device transitions from not charging to actively charging. If a device is already charging when Home Assistant starts, the trigger does not fire.
- To react when a device stops charging, use [Battery stopped charging](/triggers/battery.stopped_charging/).
- To fire when the battery level crosses a specific percentage, use [Battery level crossed threshold](/triggers/battery.level_crossed/) instead.
- The trigger works with sensors that report a charging state, such as devices that expose a battery charging attribute.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when a phone starts charging

When you plug in your phone at night, this automation confirms it is connected before you fall asleep.

- **Trigger**: Battery started charging
  - **Target**: Phone battery entity
  - **Trigger when**: Each
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a charging confirmation notification" %}

{% example %}
automation: |
  alias: "Notify when phone starts charging"
  triggers:
    - trigger: battery.started_charging
      target:
        entity_id: binary_sensor.phone_battery_charging
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your phone is now charging."
{% endexample %}

{% enddetails %}
