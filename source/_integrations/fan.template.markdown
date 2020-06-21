---
title: "Template Fan"
description: "Instructions how to setup the Template fans within Home Assistant."
ha_category:
  - Fan
ha_release: 0.69
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform creates fans that combine integrations and provides the
ability to run scripts or invoke services for each of the turn_on, turn_off, set_speed,
set_oscillating, and set_direction commands of a fan.

To enable Template Fans in your installation, add the following to your
`configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
fan:
  - platform: template
    fans:
      bedroom_fan:
        friendly_name: "Bedroom fan"
        value_template: "{{ states('input_boolean.state') }}"
        speed_template: "{{ states('input_select.speed') }}"
        oscillating_template: "{{ states('input_select.osc') }}"
        direction_template: "{{ states('input_select.direction') }}"
        turn_on:
          service: script.fan_on
        turn_off:
          service: script.fan_off
        set_speed:
          service: script.fan_speed
          data_template:
            speed: "{{ speed }}"
        set_oscillating:
          service: script.fan_oscillating
          data_template:
            oscillating: "{{ oscillating }}"
        set_direction:
          service: script.fan_direction
          data_template:
            direction: "{{ direction }}"
        speeds:
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
        description: "Defines a template to get the state of the fan. Valid value: 'on'/'off'"
        required: true
        type: template
      speed_template:
        description: Defines a template to get the speed of the fan.
        required: false
        type: template
      oscillating_template:
        description: "Defines a template to get the osc state of the fan. Valid value: true/false"
        required: false
        type: template
      direction_template:
        description: "Defines a template to get the direction of the fan. Valid value: 'forward'/'reverse'"
        required: false
        type: template
      availability_template:
        description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
        required: false
        type: template
        default: true
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
        description: Defines an action to run when the fan is given an osc state command.
        required: false
        type: action
      set_direction:
        description: Defines an action to run when the fan is given a direction command.
        required: false
        type: action
      speeds:
        description: List of speeds the fan is capable of running at.
        required: false
        type: [string, list]
        default: ['low', 'medium', 'high']
{% endconfiguration %}
