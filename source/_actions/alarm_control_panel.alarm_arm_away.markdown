---
title: "Arm alarm away"
action: alarm_control_panel.alarm_arm_away
domain: alarm_control_panel
description: "Arm an alarm control panel in away mode. Optionally provide a code if your alarm panel requires one."
related_actions:
  - alarm_control_panel.alarm_disarm
  - alarm_control_panel.alarm_arm_home
---

The **Arm alarm away** action arms your alarm control panel in away mode. Heading out to work? Your alarm locks everything down automatically as you leave, protecting all zones while nobody is home.

This action works with any alarm control panel {% term entity %} in Home Assistant that supports away mode. If the alarm is already armed in away mode, calling the action does nothing.

{% include actions/ui_header.md %}

To arm an alarm in away mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Arm alarm away**.
7. _Optional_: enter the **Code** if your alarm panel requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to arm the alarm. Not every alarm panel requires a code for arming.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarm_control_panel.alarm_arm_away`. A basic example looks like this:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_away
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This arms `alarm_control_panel.home_alarm` in away mode without a code.

If your alarm panel requires a code, include it in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_away
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

- The **Arm alarm away** action works on any alarm control panel {% term entity %} in Home Assistant that supports away mode.
- Away mode typically activates all sensors and zones, including interior motion sensors. Use this when nobody is home.
- Whether a code is required depends on your alarm panel and its configuration.
- To disarm the alarm when you return, use [Disarm alarm](/actions/alarm_control_panel.alarm_disarm/). To arm while staying inside, use [Arm alarm home](/actions/alarm_control_panel.alarm_arm_home/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: arm the alarm in away mode with a code

Arm the home alarm in away mode using a PIN code. Useful as a quick action on a dashboard tile before you head out.

- **Action**: Alarm control panel: Arm alarm away
- **Target**: Home alarm
- **Code**: 1234

{% details "YAML example for arming away with a code" %}

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_away
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm the alarm when everyone leaves

When the last person walks out the door, arm the alarm in away mode. A simple way to make sure you never forget to set the alarm.

- **Trigger**: Zone: Everyone leaves home
- **Action**: Alarm control panel: Arm alarm away
- **Target**: Home alarm

{% details "YAML example for arming when everyone leaves" %}

{% example %}
automation: |
  alias: "Arm alarm when everyone leaves"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: not_home
  conditions:
    - condition: state
      entity_id: group.family
      state: not_home
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm away at a set time each workday

If you leave for work at the same time every day, arm the alarm automatically at 8:30 in the morning on weekdays.

- **Trigger**: Time: 08:30
- **Condition**: Day of the week is Monday to Friday
- **Condition**: Nobody is home
- **Action**: Alarm control panel: Arm alarm away
- **Target**: Home alarm

{% details "YAML example for a scheduled workday arm" %}

{% example %}
automation: |
  alias: "Arm alarm on workday mornings"
  triggers:
    - trigger: time
      at: "08:30:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
    - condition: state
      entity_id: group.family
      state: not_home
  actions:
    - action: alarm_control_panel.alarm_arm_away
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
