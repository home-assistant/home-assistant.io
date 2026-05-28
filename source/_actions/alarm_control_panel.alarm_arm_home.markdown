---
title: "Arm alarm home"
action: alarm_control_panel.alarm_arm_home
domain: alarm_control_panel
description: "Arm an alarm control panel in home mode. Optionally provide a code if your alarm panel requires one."
related_actions:
  - alarm_control_panel.alarm_disarm
  - alarm_control_panel.alarm_arm_away
---

The **Arm alarm home** action arms your alarm control panel in home mode. This is perfect for when you're relaxing inside but still want the perimeter secured. Doors and windows stay monitored while interior motion sensors stay quiet, so you can move around freely.

This action works with any alarm control panel {% term entity %} in Home Assistant that supports home mode. If the alarm is already armed in home mode, calling the action does nothing.

{% include actions/ui_header.md %}

To arm an alarm in home mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Arm alarm home**.
7. _Optional_: enter the **Code** if your alarm panel requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to arm the alarm. Not every alarm panel requires a code for arming.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarm_control_panel.alarm_arm_home`. A basic example looks like this:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_home
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This arms `alarm_control_panel.home_alarm` in home mode without a code.

If your alarm panel requires a code, include it in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_home
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

- The **Arm alarm home** action works on any alarm control panel {% term entity %} in Home Assistant that supports home mode.
- Home mode typically monitors perimeter sensors (doors and windows) while keeping interior motion sensors inactive. This lets you move around inside without triggering the alarm.
- Whether a code is required depends on your alarm panel and its configuration.
- To arm all zones when leaving the house, use [Arm alarm away](/actions/alarm_control_panel.alarm_arm_away/). To disarm the alarm entirely, use [Disarm alarm](/actions/alarm_control_panel.alarm_disarm/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: arm in home mode from a dashboard

Set up a quick action on your dashboard so you can arm the perimeter with a single tap while you're lounging on the couch.

- **Action**: Alarm control panel: Arm alarm home
- **Target**: Home alarm
- **Code**: 1234

{% details "YAML example for arming home with a code" %}

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_home
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm the perimeter when you arrive home at night

When you get home after dark, automatically arm the alarm in home mode. Your doors and windows stay protected while you settle in for the evening.

- **Trigger**: Person: Paulus changes to home
- **Condition**: Sun is below horizon
- **Action**: Alarm control panel: Arm alarm home
- **Target**: Home alarm

{% details "YAML example for arming home on nighttime arrival" %}

{% example %}
automation: |
  alias: "Arm home mode on nighttime arrival"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: home
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: alarm_control_panel.alarm_arm_home
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm the perimeter every evening

Each evening at 10 o'clock, arm the alarm in home mode so the perimeter is secured while you sleep. Pair this with a night mode automation for even tighter protection later on.

- **Trigger**: Time: 22:00
- **Action**: Alarm control panel: Arm alarm home
- **Target**: Home alarm

{% details "YAML example for an evening perimeter arm" %}

{% example %}
automation: |
  alias: "Arm perimeter every evening"
  triggers:
    - trigger: time
      at: "22:00:00"
  actions:
    - action: alarm_control_panel.alarm_arm_home
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
