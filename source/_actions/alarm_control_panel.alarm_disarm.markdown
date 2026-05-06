---
title: "Disarm alarm"
action: alarm_control_panel.alarm_disarm
domain: alarm_control_panel
description: "Disarm an alarm control panel. Optionally provide a code if your alarm panel requires one."
related_actions:
  - alarm_control_panel.alarm_arm_away
  - alarm_control_panel.alarm_arm_home
---

The **Disarm alarm** action disarms your alarm control panel. Picture this: you walk through the front door after a long day, and your alarm automatically disarms for you. No rushing to the keypad, no frantic code entry.

This action works with any alarm control panel {% term entity %} in Home Assistant. If the alarm is already disarmed, calling the action does nothing.

{% include actions/ui_header.md %}

To disarm an alarm from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Disarm alarm**.
7. _Optional_: enter the **Code** if your alarm panel requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to disarm the alarm. Not every alarm panel requires a code.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarm_control_panel.alarm_disarm`. A basic example looks like this:

{% example %}
action: |
  action: alarm_control_panel.alarm_disarm
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This disarms `alarm_control_panel.home_alarm` without a code.

If your alarm panel requires a code, include it in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_disarm
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

### Options in YAML

{% options_yaml %}
code:
  description: >
    The code to disarm the alarm. Not every alarm panel requires a code.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The **Disarm alarm** action works on any alarm control panel {% term entity %} in Home Assistant.
- If the alarm is already disarmed, calling this action does nothing.
- Whether a code is required depends on your alarm panel and its configuration. Some panels always require a code, others never do.
- To arm the alarm again after disarming, use [Arm alarm away](/actions/alarm_control_panel.alarm_arm_away/) or [Arm alarm home](/actions/alarm_control_panel.alarm_arm_home/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: disarm the alarm with a code

Disarm the home alarm using a PIN code. Useful as a quick action on a dashboard or from a script.

- **Action**: Alarm control panel: Disarm alarm
- **Target**: Home alarm
- **Code**: 1234

{% details "YAML example for disarming with a code" %}

{% example %}
action: |
  action: alarm_control_panel.alarm_disarm
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

{% enddetails %}

### Automation: disarm when you arrive home

When you pull into the driveway and your phone reports you're home, disarm the alarm automatically. No more rushing to the keypad before the siren goes off.

- **Trigger**: Person: Paulus changes to home
- **Action**: Alarm control panel: Disarm alarm
- **Target**: Home alarm

{% details "YAML example for disarming on arrival" %}

{% example %}
automation: |
  alias: "Disarm alarm on arrival"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: home
  actions:
    - action: alarm_control_panel.alarm_disarm
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

### Automation: disarm every morning on weekdays

Start the day without the alarm blaring when you open the bedroom door. Disarm it automatically at 7 in the morning on weekdays.

- **Trigger**: Time: 07:00
- **Condition**: Day of the week is Monday to Friday
- **Action**: Alarm control panel: Disarm alarm
- **Target**: Home alarm

{% details "YAML example for a weekday morning disarm" %}

{% example %}
automation: |
  alias: "Disarm alarm on weekday mornings"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: alarm_control_panel.alarm_disarm
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
