---
title: "Arm alarm with custom bypass"
action: alarm_control_panel.alarm_arm_custom_bypass
domain: alarm_control_panel
description: "Arm an alarm control panel while bypassing specific zones. Optionally provide a code if your alarm panel requires one."
related_actions:
  - alarm_control_panel.alarm_disarm
  - alarm_control_panel.alarm_arm_away
---

The **Arm alarm with custom bypass** action arms your alarm control panel while allowing you to bypass specific zones. Think of it as arming the house but leaving the dog door zone active so your pet can come and go, or skipping a sensor on a window you want to keep open for fresh air.

This action works with any alarm control panel {% term entity %} in Home Assistant that supports custom bypass. If the alarm is already armed with custom bypass, calling the action does nothing.

{% include actions/ui_header.md %}

To arm an alarm with custom bypass from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Arm alarm with custom bypass**.
7. _Optional_: enter the **Code** if your alarm panel requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to arm the alarm. Not every alarm panel requires a code for arming.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarm_control_panel.alarm_arm_custom_bypass`. A basic example looks like this:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_custom_bypass
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This arms `alarm_control_panel.home_alarm` with custom bypass without a code.

If your alarm panel requires a code, include it in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_custom_bypass
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

### Options in YAML

{% options_yaml %}
code:
  description: >
    The code to arm the alarm. Not every alarm panel requires a code for arming.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The **Arm alarm with custom bypass** action works on any alarm control panel {% term entity %} in Home Assistant that supports custom bypass.
- Which zones are bypassed depends on your alarm panel's configuration. The bypass rules are typically set up in the alarm panel itself, not in Home Assistant.
- Whether a code is required depends on your alarm panel and its configuration.
- For full protection without any bypasses, use [Arm alarm away](/actions/alarm_control_panel.alarm_arm_away/) or [Arm alarm home](/actions/alarm_control_panel.alarm_arm_home/). To disarm the alarm, use [Disarm alarm](/actions/alarm_control_panel.alarm_disarm/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: arm with bypass from a dashboard

Set up a quick action on your dashboard to arm the alarm while keeping certain zones open. Useful when you know a window is cracked or the dog door is in use.

- **Action**: Alarm control panel: Arm alarm with custom bypass
- **Target**: Home alarm
- **Code**: 1234

{% details "YAML example for arming with custom bypass" %}

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_custom_bypass
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm with bypass when a window is left open

If you leave the house and a window is still open, arm the alarm with custom bypass instead of leaving the alarm off entirely. This way, the rest of the house stays protected.

- **Trigger**: Person: Paulus changes to not_home
- **Condition**: Window sensor is open
- **Action**: Alarm control panel: Arm alarm with custom bypass
- **Target**: Home alarm

{% details "YAML example for arming with bypass on open window" %}

{% example %}
automation: |
  alias: "Arm with bypass when window open"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: not_home
  conditions:
    - condition: state
      entity_id: binary_sensor.living_room_window
      state: "on"
  actions:
    - action: alarm_control_panel.alarm_arm_custom_bypass
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
