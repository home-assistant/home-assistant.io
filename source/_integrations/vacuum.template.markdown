---
title: "Template Vacuum"
description: "Instructions how to setup Template vacuums within Home Assistant."
ha_category: Vacuum
ha_release: 0.96
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform creates vacuums that combine integrations and provides the
ability to run scripts or invoke services for each of the start, pause, stop,
return_to_base, clean_spot, locate and set_fan_speed commands of a vacuum.

To enable Template Vacuums in your installation, add the following to your
`configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        start:
          service: script.vacuum_start
```

{% endraw %}

{% configuration %}
  vacuums:
    description: List of your vacuums.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      unique_id:
        description: An ID that uniquely identifies this vacuum. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      value_template:
        description: "Defines a template to get the state of the vacuum. Valid value: `docked`/`cleaning`/`idle`/`paused`/`returning`/`error`"
        required: false
        type: template
      battery_level_template:
        description: "Defines a template to get the battery level of the vacuum. Legal values are numbers between `0` and `100`."
        required: false
        type: template
      fan_speed_template:
        description: Defines a template to get the fan speed of the vacuum.
        required: false
        type: template
      attribute_templates:
        description: Defines templates for attributes of the sensor.
        required: false
        type: map
        keys:
          "attribute: template":
            description: The attribute and corresponding template.
            required: true
            type: template          
      availability_template:
        description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
        required: false
        type: template
        default: true
      start:
        description: Defines an action to run when the vacuum is started.
        required: true
        type: action
      pause:
        description: Defines an action to run when the vacuum is paused.
        required: false
        type: action
      stop:
        description: Defines an action to run when the vacuum is stopped.
        required: false
        type: action
      return_to_base:
        description: Defines an action to run when the vacuum is given a return to base command.
        required: false
        type: action
      clean_spot:
        description: Defines an action to run when the vacuum is given a clean spot command.
        required: false
        type: action
      locate:
        description: Defines an action to run when the vacuum is given a locate command.
        required: false
        type: action
      set_fan_speed:
        description: Defines an action to run when the vacuum is given a command to set the fan speed.
        required: false
        type: action
      fan_speeds:
        description: List of fan speeds supported by the vacuum.
        required: false
        type: [string, list]
{% endconfiguration %}

## Examples

### Control vacuum with Harmony Hub

This example shows how you can use a Template Vacuum to control an IR vacuum cleaner using the [Harmony Hub Remote component](/integrations/harmony).

```yaml
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        start:
          - service: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: Clean
              device: 52840686
        return_to_base:
          - service: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: Home
              device: 52840686
        clean_spot:
          - service: remote.send_command
            target:
              entity_id: remote.harmony_hub
            data:
              command: SpotCleaning
              device: 52840686
```

### Vacuum with state

This example shows how to use templates to specify the state of the vacuum.

{% raw %}

```yaml
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        value_template: "{{ states('sensor.vacuum_state') }}"
        battery_level_template: "{{ states('sensor.vacuum_battery_level')|int }}"
        fan_speed_template: "{{ states('sensor.vacuum_fan_speed') }}"
        start:
            service: script.vacuum_start
        pause:
            service: script.vacuum_pause
        stop:
            service: script.vacuum_stop
        return_to_base:
            service: script.vacuum_return_to_base
        clean_spot:
            service: script.vacuum_clean_spot
        locate:
            service: script.vacuum_locate_vacuum
        set_fan_speed:
            service: script.vacuum_set_fan_speed
            data:
              speed: "{{ fan_speed }}"
        fan_speeds:
            - Low
            - Medium
            - High
```

{% endraw %}

### Add Custom Attributes

This example shows how to add custom attributes.

{% raw %}

```yaml
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        value_template: "{{ states('sensor.vacuum_state') }}"
        battery_level_template: "{{ states('sensor.vacuum_battery_level')|int }}"
        fan_speed_template: "{{ states('sensor.vacuum_fan_speed') }}"
        attribute_templates:
          status: >-
            {% if (states('sensor.robot_vacuum_robot_cleaner_movement') == "after" and states('sensor.robot_vacuum_robot_cleaner_cleaning_mode') == "stop")  %}
              Charging to Resume
            {% elif states('sensor.robot_vacuum_robot_cleaner_cleaning_mode') == "auto" %}
              Cleaning
            {% else %}
              Charging
            {% endif %}
```

{% endraw %}
