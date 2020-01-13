---
layout: page
title: "Template Alarm Control Panel"
description: "Instructions on how to integrate Template Alarm Control Panels into Home Assistant."
date: 2019-07-06 14:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Alarm Control Panel
ha_release: 0.95
ha_iot_class: "Local Push"
logo: home-assistant.png
ha_qa_scale: internal
---

The `template` platform creates alarm control panels that combine components or adds pre-processing logic to actions.

There are several powerful ways to use this component, including grouping existing components into a simpler component, or adding logic that Home Assistant will execute when accessed.

For example, if you want to expose a true alarm panel to Google Home, Alexa, or Homekit - but limit its ability to disarm when there's noone home, you can do that using a template.

Another use case could be grouping a series of internal and external locks together to represent "Home" and "Away" lock states.

This can simplify the GUI and make it easier to write automations. You can mark the components you have combined as `hidden` so they don't appear themselves.

In optimistic mode, the alarm control panel will immediately change state after every command. Otherwise, the lock will wait for state confirmation from the template. Try to enable it, if experiencing incorrect lock operation.

## {% linkable_title Configuration %}

To enable Template Alarm Control Panels in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: template
    name: Safe Alarm Panel
    value_template: "{{ states('alarm_control_panel.real_alarm') }}"
    arm_away:
      service: alarm_control_panel.alarm_arm_away
      data:
        entity_id: alarm_control_panel.real_alarm
        code: !secret alarm_code
    arm_home:
      service: alarm_control_panel.alarm_arm_home
      data:
        entity_id: alarm_control_panel.real_alarm
        code: !secret alarm_code
    disarm:
      - condition: state
        entity_id: device_tracker.paulus
        state: 'home'
      - service: alarm_control_panel.alarm_arm_home
        data:
          entity_id: alarm_control_panel.real_alarm
          code: !secret alarm_code
```
{% endraw %}

{% configuration %}
  name:
    description: Name to use in the frontend.
    required: false
    type: string
    default: Template Alarm Control Panel
  value_template:
    description: Defines a template to set the state of the alarm panel.
    required: false
    type: template
  disarm:
    description: Defines an action to run when the alarm is disarmed.
    required: false
    type: action
  arm_away:
    description: Defines an action to run when the alarm is armed to away mode.
    required: false
    type: action
  arm_home:
    description: Defines an action to run when the alarm is armed to home mode.
    required: false
    type: action
  arm_night:
    description: Defines an action to run when the alarm is armed to night mode.
    required: false
    type: action
{% endconfiguration %}

## {% linkable_title Considerations %}

If you are using the state of a platform that takes extra time to load, the Template Alarm Control Panel may get an `unknown` state during startup. This results in error messages in your log file until that platform has completed loading. If you use `is_state()` function in your template, you can avoid this situation. For example, you would replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an unknown result: {% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}
