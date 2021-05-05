---
title: "Template Climate"
description: "Instructions how to setup the Template climate entities within Home Assistant."
ha_category:
  - Fan
ha_release: FUTURE
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform creates climate entities that combine integrations and provides the
ability to run scripts or invoke services for the `set_hvac_mode`, `set_fan_mode`, `set_temperature`,
and indirectly the `turn_on` and `turn_off` commands of a climate entity..

To enable Template Climate entities in your installation, add the following to your
`configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
climate:
  - platform: template
    climates:
      bedroom_ac:
        friendly_name: "Bedroom AC"
        value_template: "{{ states('input_select.hvac_mode') }}"
        fan_mode_template: "{{ states('input_select.fan_mode') }}"
        temperature_template: "{{ states('input_number.temperature') }}"
        current_temperature_template: "{{ states('input_number.current_temperature') }}"
        temperature_step: 1
        min_temp: 18
        max_temp: 35
        set_hvac_mode:
          service: script.climate_set_hvac_mode
          data:
            hvac_mode: "{{ hvac_mode }}"
        set_fan_mode:
          service: script.climate_set_fan_mode
          data:
            fan_mode: "{{ fan_mode }}"
        set_temperature:
          service: script.climate_set_temperature
          data:
            temperature: "{{ temperature }}"
        hvac_modes:
          - heat
          - cool
          - 'off'
        fan_modes:
          - 'low'
          - 'medium'
          - 'high'
```

{% endraw %}

{% configuration %}
  climates:
    description: List of your climate entities.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      unique_id:
        description: An ID that uniquely identifies this climate entity. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      value_template:
        description: "Defines a template to get the hvac mode of the climate entity. Valid values set by `hvac_modes`."
        required: true
        type: template
      fan_mode_template:
        description: "Defines a template to get the fan mode of the climate entity. Valid values set by `fan_modes`."
        required: false
        type: template
      temperature_template:
        description: Defines a template to get the target temperature of the climate entity.
        required: false
        type: template
      current_temperature_template:
        description: Defines a template to get the current temperature of the climate entity.
        required: false
        type: template
      hvac_action_template:
        description: "Defines a template to get the hvac action of the climate entity. Valid values: `off`, `heating`, `cooling`, `drying`, `idle`, `fan`."
        required: false
        type: template
      availability_template:
        description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
        required: false
        type: template
        default: true
      set_hvac_mode:
        description: Defines an action to run when the climate is given a hvac mode command.
        required: true
        type: action
      set_fan_mode:
        description: Defines an action to run when the climate is given a fan mode command.
        required: false
        type: action
      set_temperature:
        description: Defines an action to run when the climate is given a target temperature command.
        required: false
        type: action
      temperature_step:
        description: The minimum step between valid target temperatures.
        required: false
        type: float
      min_temp:
        description: The minimum valid target temperature.
        required: false
        type: float
      max_temp:
        description: The maximum valid target temperature.
        required: false
        type: float
      precision:
        description: The precision of the current temperature.
        required: false
        type: float
      hvac_modes:
        description: List of hvac modes the climate entity is capable of. This list must contain only a subset of: `off`, `heat`, `cool`, `heat_cool`, `auto`, `dry`, `fan_only`."
        required: false
        type: [string, list]
        default: [`off`, `heat`, `cool`, `heat_cool`, `auto`, `dry`, `fan_only`]
      fan_modes:
        description: List of arbitrary string fan modes the climate entity is capable of.
        required: false
        type: [string, list]
        default: [`on`, `off`, `auto`, `low`, `medium`, `high`, `middle`, `focus`, `diffuse`]
{% endconfiguration %}
