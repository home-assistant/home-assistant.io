---
title: "Template Alarm control panel"
description: "Instructions on how to integrate template alarm control panels into Home Assistant."
ha_category: 
  - Alarm
  - Helper
ha_release: 0.105
ha_iot_class: "Local Push"
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: template
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
ha_integration_type: helper
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `template` {% term integration %} creates alarm control panels that combine integrations or adds preprocessing logic to actions.

There are several powerful ways to use this {% term integration %}, including grouping existing integrations into a simpler integrations, or adding logic that Home Assistant will execute when accessed.

For example, if you want to expose a true alarm panel to Google Home, Alexa, or HomeKit - but limit its ability to disarm when there's no one home, you can do that using a template.

Another use case could be grouping a series of sensors and services together to represent various "armed" and "disarmed" states and actions.

This can simplify the GUI and make it easier to write automations.

In optimistic mode, the alarm control panel will immediately change state after every command. Otherwise, the alarm control panel will wait for state confirmation from the template. Try to enable it, if experiencing incorrect operation.

{% include integrations/config_flow.md %}

## YAML Configuration

To enable a template alarm control panel in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

{% raw %}

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: template
    panels:
      safe_alarm_panel:
        value_template: "{{ states('alarm_control_panel.real_alarm') }}"
        arm_away:
          action: alarm_control_panel.alarm_arm_away
          target:
            entity_id: alarm_control_panel.real_alarm
          data:
            code: !secret alarm_code
        arm_home:
          action: alarm_control_panel.alarm_arm_home
          target:
            entity_id: alarm_control_panel.real_alarm
          data:
            code: !secret alarm_code
        disarm:
          - condition: state
            entity_id: device_tracker.paulus
            state: "home"
          - action: alarm_control_panel.alarm_disarm
            target:
              entity_id: alarm_control_panel.real_alarm
            data:
              code: !secret alarm_code
```

{% endraw %}

{% configuration %}
panels:
  description: List of your panels.
  required: true
  type: map
  keys:
    alarm_control_panel_name:
      description: The slug of the panel.
      required: true
      type: map
      keys:
        name:
          description: Name to use in the frontend.
          required: false
          type: string
          default: Template Alarm Control Panel
        unique_id:
          description: An ID that uniquely identifies this alarm control panel. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        value_template:
          description: "Defines a template to set the state of the alarm panel. Only the states `armed_away`, `armed_home`, `armed_night`, `armed_vacation`, `arming`, `disarmed`, `pending`, `triggered` and `unavailable` are used."
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
        arm_vacation:
          description: Defines an action to run when the alarm is armed to vacation mode.
          required: false
          type: action
        arm_custom_bypass:
          description: Defines an action to run when the alarm is armed to custom bypass mode.
          required: false
          type: action
        trigger:
          description: Defines an action to run when the alarm is triggered.
          required: false
          type: action
        code_arm_required:
          description: If true, the code is required to arm the alarm.
          required: false
          type: boolean
          default: true
        code_format:
          description: One of `number`, `text` or `no_code`. Format for the code used to arm/disarm the alarm.
          required: false
          type: string
          default: number
{% endconfiguration %}

### Template and action variables

State-based template entities have the special template variable `this` available in their templates and actions. The `this` variable aids [self-referencing](/integrations/template#self-referencing) of an entity's state and attribute in templates and actions.

## Considerations

If you are using the state of an integration that takes extra time to load, the template alarm control panel may get an `unknown` state during startup. This results in error messages in your log file until that integration has completed loading. If you use `is_state()` function in your template, you can avoid this situation.

For example, you would replace {% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an unknown result: {% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}
