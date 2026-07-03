---
title: "Arm alarm vacation"
action: alarm_control_panel.alarm_arm_vacation
domain: alarm_control_panel
description: "Arm an alarm control panel in vacation mode. Optionally provide a code if your alarm panel requires one."
related_actions:
  - alarm_control_panel.alarm_disarm
  - alarm_control_panel.alarm_arm_away
---

The **Arm alarm vacation** action arms your alarm control panel in vacation mode. Heading out for an extended trip? Vacation mode gives your home the highest level of protection while you're away for days or weeks. Some alarm panels use this mode to enable additional monitoring or longer alert windows.

This action works with any alarm control panel {% term entity %} in Home Assistant that supports vacation mode. If the alarm is already armed in vacation mode, calling the action does nothing.

{% include actions/ui_header.md %}

To arm an alarm in vacation mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Arm alarm vacation**.
7. _Optional_: enter the **Code** if your alarm panel requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to arm the alarm. Not every alarm panel requires a code for arming.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarm_control_panel.alarm_arm_vacation`. A basic example looks like this:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_vacation
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This arms `alarm_control_panel.home_alarm` in vacation mode without a code.

If your alarm panel requires a code, include it in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_vacation
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

- The **Arm alarm vacation** action works on any alarm control panel {% term entity %} in Home Assistant that supports vacation mode.
- Vacation mode is designed for extended absences. Depending on your alarm panel, it activates all sensors and zones with heightened sensitivity or longer siren durations.
- Whether a code is required depends on your alarm panel and its configuration.
- For shorter trips, [Arm alarm away](/actions/alarm_control_panel.alarm_arm_away/) is typically sufficient. To disarm when you return, use [Disarm alarm](/actions/alarm_control_panel.alarm_disarm/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: switch to vacation mode from a script

Create a "leaving for vacation" script that arms the alarm in vacation mode. You can add other departure tasks to the same script separately.

- **Action**: Alarm control panel: Arm alarm vacation
- **Target**: Home alarm
- **Code**: 1234

{% details "YAML example for arming vacation with a code" %}

{% example %}
action: |
  action: alarm_control_panel.alarm_arm_vacation
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

{% enddetails %}

### Automation: arm vacation mode when away for 24 hours

If everyone has been away from home for a full day, upgrade the alarm from away mode to vacation mode automatically. This gives you extended protection without having to remember to switch modes before a trip.

- **Trigger**: Zone occupancy cleared
  - **Zone**: Home (`zone.home`)
  - **For at least**: 24:00:00
- **Action**: Alarm control panel: Arm alarm vacation
- **Target**: Home alarm

{% details "YAML example for upgrading to vacation mode after 24 hours" %}

{% example %}
automation: |
  alias: "Arm vacation after 24 hours away"
  triggers:
    - trigger: zone.occupancy_cleared
      options:
        zone: zone.home
        for: "24:00:00"
  actions:
    - action: alarm_control_panel.alarm_arm_vacation
      target:
        entity_id: alarm_control_panel.home_alarm
      data:
        code: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
