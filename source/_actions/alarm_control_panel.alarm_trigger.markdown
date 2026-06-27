---
title: "Trigger alarm"
action: alarm_control_panel.alarm_trigger
domain: alarm_control_panel
description: "Manually trigger an alarm control panel. Optionally provide a code if your alarm panel requires one. If supported, you can also override the pending delay."
related_actions:
  - alarm_control_panel.alarm_disarm
---

The **Trigger alarm** action manually triggers your alarm control panel. This is useful for testing your alarm setup to make sure the siren, notifications, and automations all respond correctly. You might also use it in an emergency scenario where you want to sound the alarm on demand.

This action works with any alarm control panel {% term entity %} in Home Assistant that supports triggering.

{% include actions/ui_header.md %}

To trigger an alarm from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the area your alarm panel is in (like your hallway or entryway). You can also select a floor, a device, a specific entity, or a label.
6. From the actions shown for that target, select **Trigger alarm**.
7. _Optional_: enter the **Code** if your alarm panel requires one.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Code:
  description: The code to trigger the alarm. Not every alarm panel requires a code for triggering.
  required: false
Delay time:
  description: Time in seconds to keep the alarm in the `pending` state before it triggers. Set to 0 to trigger immediately.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `alarm_control_panel.alarm_trigger`. A basic example looks like this:

{% example %}
action: |
  action: alarm_control_panel.alarm_trigger
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

This triggers `alarm_control_panel.home_alarm` without a code.

If your alarm panel requires a code, include it in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_trigger
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    code: "1234"
{% endexample %}

To override the pending delay configured on the alarm control panel, set `delay_time` in the `data` section:

{% example %}
action: |
  action: alarm_control_panel.alarm_trigger
  target:
    entity_id: alarm_control_panel.home_alarm
  data:
    delay_time: 0
{% endexample %}

### Options in YAML

{% options_yaml %}
code:
  description: >
    The code to trigger the alarm. Not every alarm panel requires a code for triggering.
  required: false
  type: string
delay_time:
  description: >
    Time in seconds that the alarm stays in the `pending` state before it triggers. Overrides the delay configured on the alarm control panel. Set to 0 to trigger immediately. Not every alarm panel supports overriding the delay.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The **Trigger alarm** action works on any alarm control panel {% term entity %} in Home Assistant that supports triggering.
- Triggering the alarm sets it to the triggered state, which typically sounds the siren and sends notifications. Use with care in a production setup.
- Whether a code is required depends on your alarm panel and its configuration.
- To silence the alarm after triggering, use [Disarm alarm](/actions/alarm_control_panel.alarm_disarm/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Action: trigger the alarm for testing

Manually trigger the alarm to verify your siren and notification automations are working. Remember to disarm it again once you've confirmed everything works.

- **Action**: Alarm control panel: Trigger alarm
- **Target**: Home alarm

{% details "YAML example for manually triggering the alarm" %}

{% example %}
action: |
  action: alarm_control_panel.alarm_trigger
  target:
    entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

### Automation: trigger the alarm on a panic button press

Wire a physical button to trigger the alarm instantly. Keep the button in a discreet location so you have a quick way to sound the alarm in an emergency.

- **Trigger**: Device: Panic button pressed
- **Action**: Alarm control panel: Trigger alarm
- **Target**: Home alarm

{% details "YAML example for a panic button alarm trigger" %}

{% example %}
automation: |
  alias: "Panic button triggers alarm"
  triggers:
    - trigger: state
      entity_id: binary_sensor.panic_button
      to: "on"
  actions:
    - action: alarm_control_panel.alarm_trigger
      target:
        entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

### Automation: trigger the alarm on smoke detection

If a smoke sensor goes off while the alarm is not disarmed, trigger the alarm to sound the siren and alert you immediately.

- **Trigger**: Smoke sensor detects smoke
- **Condition**: Alarm is not disarmed
- **Action**: Alarm control panel: Trigger alarm
- **Target**: Home alarm

{% details "YAML example for triggering the alarm on smoke detection" %}

{% example %}
automation: |
  alias: "Trigger alarm on smoke detection"
  triggers:
    - trigger: state
      entity_id: binary_sensor.smoke_detector
      to: "on"
  conditions:
    - condition: not
      conditions:
        - condition: state
          entity_id: alarm_control_panel.home_alarm
          state: disarmed
  actions:
    - action: alarm_control_panel.alarm_trigger
      target:
        entity_id: alarm_control_panel.home_alarm
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
