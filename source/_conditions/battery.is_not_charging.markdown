---
title: "Battery is not charging"
condition: battery.is_not_charging
domain: battery
description: "Tests if one or more battery-powered devices are not charging."
related_conditions:
  - battery.is_charging
  - battery.is_level
  - battery.is_low
---

The **Battery is not charging** condition passes when a battery-powered device is not actively charging. A device is not charging when it is unplugged, off its dock, or fully charged with the charger no longer drawing power. Use **Battery is not charging** to run an automation only when a device is on battery power, for example to skip a heavy task while a phone is unplugged, or to confirm a robot vacuum is off its dock before sending it to clean.

{% include integrations/labs_entity_triggers_note.md %}

{% include conditions/ui_header.md %}

To use **Battery is not charging** in an automation:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation, or select **Create automation** > **Create new automation**.
3. In the **And if** section, select **Add condition**.
4. Select what you want to check. Under **By target** (see [Targets](#targets)), pick the area your device is in (like your bedroom or office). You can also select a device, a specific entity, or a label.
5. From the conditions shown for that target, select **Battery is not charging**.
6. Under **Condition passes if** (see [Behavior](#behavior-with-multiple-targets)), pick **Any** or **All** to control how the check behaves when multiple devices are targeted.
7. Under **For at least**, set how long the device must have been continuously not charging before the condition passes. Leave it at zero to pass immediately.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Condition passes if:
  description: When multiple devices are targeted, controls how results combine. Pick **Any** to pass if at least one targeted device is not charging, or **All** to pass only when every targeted device is not charging. Default is **Any**.
For at least:
  description: How long the device must have been continuously not charging before the condition passes. Default is `0` (passes immediately).
{% endoptions_ui %}

{% include conditions/yaml_header.md %}

In YAML, **Battery is not charging** is referred to as `battery.is_not_charging`. A basic example looks like this:

{% example %}
condition: |
  condition: battery.is_not_charging
  target:
    entity_id: sensor.phone_battery
{% endexample %}

This passes when `sensor.phone_battery` is not charging.

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
    How long the device must have been continuously not charging before the condition passes. Accepts a duration string in `HH:MM:SS` format.
  required: false
  type: string
  default: "00:00:00"
{% endoptions_yaml %}

{% include conditions/targets.md %}

{% include conditions/behavior.md %}

## Good to know

- The condition works with sensors and devices that report a charging state, such as devices that expose a battery charging attribute.
- Devices that are unavailable (`unavailable`) or have an unknown state (`unknown`) do not count as not charging. With **Any** behavior, they are skipped. With **All** behavior, the condition fails if every targeted device is unavailable.
- A fully charged device with the charger still connected may report as not charging, because the charger has stopped drawing power. If you want to be sure the device is unplugged, combine this condition with [Battery level](/conditions/battery.is_level/).
- To check the opposite state, use [Battery is charging](/conditions/battery.is_charging/).

{% include conditions/try_it.md %}

{% include conditions/more_examples.md %}

### Automation: remind you to plug in your phone at bedtime

If your phone is not charging when you head to bed, send a gentle reminder so it's ready for the next day.

- **Trigger**: Time: Every day at 23:00
- **Condition**: Battery is not charging
  - **Target**: Phone battery
- **Action**: Send a notification message
  - **Target**: My device (`notify.my_device`)

{% details "YAML example for a bedtime charging reminder" %}

{% example %}
automation: |
  alias: "Remind to charge phone at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  conditions:
    - condition: battery.is_not_charging
      target:
        entity_id: sensor.phone_battery
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Your phone isn't charging. Don't forget to plug it in."
{% endexample %}

{% enddetails %}

{% include conditions/stuck.md %}

{% include conditions/related.md %}
