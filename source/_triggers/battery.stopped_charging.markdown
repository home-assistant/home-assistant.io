---
title: "Battery stopped charging"
trigger: battery.stopped_charging
domain: battery
description: "Triggers after one or more battery-powered devices stop charging."
related_triggers:
  - battery.started_charging
  - battery.level_changed
  - battery.level_crossed
---

The **Battery stopped charging** trigger fires when a battery-powered device transitions from actively charging to not charging. A device stops charging when it is unplugged, removed from its dock, or when it reaches full charge and the charger cuts off. Use this trigger to detect when a device is unplugged unexpectedly, confirm when a charge cycle completes, or start automations that should run once a device is ready to use.

{% include integrations/labs_entity_triggers_note.md %}

{% include triggers/ui_header.md %}

To use **Battery stopped charging** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **When** section, select **Add trigger**.
4. Select what you want to monitor. Under **By target** (see [Targets](#targets)), pick the area your device is in (like your bedroom or office). You can also select a device, a specific entity, or a label. When you target multiple entities, the trigger fires whenever any of them stops charging.
5. From the triggers shown for that target, select **Battery stopped charging**.
6. Under **Trigger when** (see [Behavior](#behavior-with-multiple-targets)), pick **Each**, **First**, or **All** to control how the trigger behaves when multiple devices are targeted.
7. Under **For at least**, set how long the device must remain not charging before the trigger fires. Leave it at zero to fire immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Trigger when:
  description: |
    When multiple devices are targeted, controls when the trigger fires:

    - **Each** (default): fires every time any targeted device stops charging.
    - **First**: fires only on the first device that stops charging.
    - **All**: fires only after every targeted device stops charging.
For at least:
  description: How long the device must remain not charging before the trigger fires. Default is `0` (fires immediately).
{% endoptions_ui %}

{% include triggers/yaml_header.md %}

In YAML, **Battery stopped charging** is referred to as `battery.stopped_charging`. A basic example looks like this:

{% example %}
trigger: |
  trigger: battery.stopped_charging
  target:
    entity_id: sensor.phone_battery
{% endexample %}

This fires every time `sensor.phone_battery` stops charging.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
behavior:
  description: |
    When multiple devices are targeted, controls when the trigger fires:

    - `any` (**Each** in the UI, default): fires every time any targeted device stops charging.
    - `first` (**First** in the UI): fires only on the first device that stops charging.
    - `last` (**All** in the UI): fires only after every targeted device stops charging.
  required: false
  type: string
  default: any
for:
  description: |
    How long the device must remain not charging before the trigger fires. Accepts a duration string in `HH:MM:SS` format. For example, `00:01:00` fires only after the device has not been charging for 1 minute. This helps avoid false positives from brief interruptions.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include triggers/targets.md %}

{% include triggers/behavior.md %}

## Good to know

- **Battery stopped charging** fires both when a device is unplugged and when it finishes charging naturally. If you only want to react when the battery is full, combine this trigger with a condition that checks the battery level.
- To react when a device starts charging, use [Battery started charging](/triggers/battery.started_charging/).
- To fire when the battery level crosses a specific percentage, use [Battery level crossed threshold](/triggers/battery.level_crossed/) instead.
- The trigger works with sensors that report a charging state, such as devices that expose a battery charging attribute.

{% include triggers/try_it.md %}

{% include triggers/more_examples.md %}

### Automation: notify when a tablet has finished charging

When your tablet finishes a charge cycle overnight, this automation lets you know it is ready to unplug, which helps avoid leaving it connected longer than necessary.

- **Trigger**: Battery stopped charging
  - **Target**: Tablet battery entity
- **Condition**: Battery level is above 95%
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a charge complete notification" %}

{% example %}
automation: |
  alias: "Notify when tablet has finished charging"
  triggers:
    - trigger: battery.stopped_charging
      target:
        entity_id: sensor.tablet_battery
  conditions:
    - condition: numeric_state
      entity_id: sensor.tablet_battery
      above: 95
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your tablet is fully charged and ready to unplug."
{% endexample %}

{% enddetails %}
