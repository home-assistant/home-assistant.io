---
title: "Arm alarm night"
action: alarm_control_panel.alarm_arm_night
domain: alarm_control_panel
description: "Arm an alarm control panel in night mode. Optionally provide a code if your alarm panel requires one."
related_actions:
  - alarm_control_panel.alarm_disarm
  - alarm_control_panel.alarm_arm_home
---

The **Arm alarm night** action arms your alarm control panel in night mode. Bedtime security without lifting a finger. Night mode typically protects the perimeter and selected interior zones while you sleep, so you stay safe without triggering the alarm on a late-night trip to the kitchen.

This action works with any alarm control panel {% term entity %} in Home Assistant that supports night mode. If the alarm is already armed in night mode, calling the action does nothing.

{% include actions/ui_header.md %}

To arm an alarm in night mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Arm alarm night**.
7. _Optional_: enter the **Code** if your alarm panel requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to arm the alarm. Not every alarm panel requires a code for arming.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarm_control_panel.alarm_arm_night`. A basic example looks like this:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_night
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This arms `alarm_control_panel.home_alarm` in night mode without a code.

If your alarm panel requires a code, include it in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_night
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

- The **Arm alarm night** action works on any alarm control panel {% term entity %} in Home Assistant that supports night mode.
- Night mode is similar to home mode but is designed for sleeping hours. Which zones it activates depends on your alarm panel's configuration.
- Whether a code is required depends on your alarm panel and its configuration.
- For broader protection while still at home, consider [Arm alarm home](/actions/alarm_control_panel.alarm_arm_home/). To disarm the alarm in the morning, use [Disarm alarm](/actions/alarm_control_panel.alarm_disarm/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: switch to night mode from a dashboard

Add a dashboard tile that arms the alarm in night mode with a single tap. A quick way to lock down the house before you head upstairs.

- **Action**: Alarm control panel: Arm alarm night
- **Target**: Home alarm
- **Code**: 1234

{% details "YAML example for arming night with a code" %}

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_night
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm night mode at bedtime

At 11 in the evening, switch the alarm to night mode automatically. You go to sleep knowing the house is protected without having to walk to the keypad.

- **Trigger**: Time: 23:00
- **Action**: Alarm control panel: Arm alarm night
- **Target**: Home alarm

{% details "YAML example for a bedtime night mode automation" %}

{% example %}
automation: |
  alias: "Arm night mode at bedtime"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: alarm_control_panel.alarm_arm_night
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm night mode when the bedroom lights go off

When the last light in the bedroom turns off, arm the alarm in night mode. This ties your security to your actual routine instead of a fixed time.

- **Trigger**: State
  - **Entity**: Bedroom light
  - **To**: Off 
- **Action**: Alarm control panel: Arm alarm night
- **Target**: Home alarm

{% details "YAML example for arming night when bedroom lights go off" %}

{% example %}
automation: |
  alias: "Arm night mode when bedroom lights off"
  triggers:
    - trigger: state
      entity_id: light.bedroom
      to: "off"
  actions:
    - action: alarm_control_panel.alarm_arm_night
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
