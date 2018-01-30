---
layout: page
title: "Template Fan"
description: "Instructions how to setup the Template fans within Home Assistant."
date: 2018-01-30 09:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Fan
ha_release: 0.63
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `template` platform creates fans that combine components and provides the
ability to run scripts or invoke services for each of the turn_on, turn_off, set_speed, and
set_oscillating commands of a fan.

To enable Template Fans in your installation, add the following to your
`configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
fan:
  - platform: template
    fans:
      bedroom_fan:
        friendly_name: "Bedroom fan" # Optional
        value_template: "{{ states('input_boolean.state') }}" # Required
        speed_template: "{{ states('input_select.speed') }}" # Optional
        oscillating_template: "{{ states('input_select.osc') }}" # Optional
        turn_on: # Required
          service: script.fan_on
        turn_off: # Required
          service: script.fan_off
        set_speed: # Optional
          service: script.fan_speed
          data_template:
            speed: "{{ speed }}"
        set_oscillating: # Optional
          service: script.fan_oscillating
          data_template:
            oscillating: "{{ oscillating }}"
        speeds: # Optional
          - '1'
          - '2'
          - '3'
```
{% endraw %}

{% configuration %}
  fans:
    description: List of your fans.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      value_template:
        description: Defines a template to get the state of the fan. Valid value: 'on', 'off', 'true', 'false'
        required: true
        type: template
      speed_template:
        description: Defines a template to get the speed of the fan.
        required: false
        type: template
      oscillating_template:
        description: Defines a template to get the osc state of the fan.
        required: false
        type: template
      turn_on:
        description: Defines an action to run when the fan is turned on.
        required: true
        type: action
      turn_off:
        description: Defines an action to run when the fan is turned off.
        required: true
        type: action
      set_speed:
        description: Defines an action to run when the fan is given a speed command.
        required: false
        type: action
      set_oscillating:
        description: Defines an action to run when the fan is given a osc state command.
        required: false
        type: action
      speeds:
        description: List of speeds the fan is capable of running at.
        required: false
        type: string list
        default: ['low', 'medium', 'high']
{% endconfiguration %}
