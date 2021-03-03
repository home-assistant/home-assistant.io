---
title: Template
description: Instructions on how to integrate Template Sensors into Home Assistant.
ha_category:
  - Sensor
ha_release: 0.12
ha_iot_class: Local Push
ha_quality_scale: internal
ha_codeowners:
  - '@PhracturedBlue'
  - '@tetienne'
ha_domain: template
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
  - vacuum
  - weather
---

The `template` platform supports sensors which get their values from other entities.

## Configuration

The configuration of Template Sensors depends on what you want them to be. Adding the following to your `configuration.yaml` file will create two sensors, one for the current sun angle and one for the time of the next sunrise:

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      solar_angle:
        friendly_name: "Sun angle"
        unit_of_measurement: "degrees"
        value_template: "{{ state_attr('sun.sun', 'elevation') }}"

      sunrise:
        value_template: "{{ state_attr('sun.sun', 'next_rising') }}"
```

{% endraw %}

{% configuration %}
  sensors:
    description: List of your sensors.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      friendly_name_template:
        description: Defines a template for the name to be used in the frontend (this overrides friendly_name).
        required: false
        type: template
      unique_id:
        description: An ID that uniquely identifies this sensor. Set this to a unique value to allow customization through the UI.
        required: false
        type: string
      unit_of_measurement:
        description: "Defines the units of measurement of the sensor, if any. This will also influence the graphical presentation in the history visualization as a continuous value. Sensors with missing `unit_of_measurement` are showing as discrete values."
        required: false
        type: string
        default: None
      value_template:
        description: Defines a template to get the state of the sensor.
        required: true
        type: template
      icon_template:
        description: Defines a template for the icon of the sensor.
        required: false
        type: template
      entity_picture_template:
        description: Defines a template for the entity picture of the sensor.
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
      device_class:
        description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
        required: false
        type: device_class
        default: None
{% endconfiguration %}

## Considerations

### Startup

If you are using the state of a platform that takes extra time to load, the Template Sensor may get an `unknown` state during startup. To avoid this (and the resulting error messages in your log file), you can use `is_state()` function in your template. For example, you would replace {% raw %}`{{ states.cover.source.state == 'open' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an `unknown` result:

{% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

### Sensor state updates

The template engine works out what entities are used to trigger an update of the sensor and recalculates the result when one of those entities change.

If you use a template that depends on the current time or some other non-deterministic result not sourced from entities, create an interval-based
automation that calls the service `homeassistant.update_entity` for the sensor requiring updates. See the [example below](#working-without-entities).

### Unique ID

The optional `unique_id` can be set so the entity will be registered in the [entity registry](https://developers.home-assistant.io/docs/entity_registry_index). This allows changing the `name`, `icon` and `entity_id` from the web interface instead of having to use the [customize](/docs/configuration/customizing-devices/) key in your `configuration.yaml` file.

## Examples

In this section, you find some real-life examples of how to use this sensor.

### Sun Angle

This example shows the sun angle in the frontend.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      solar_angle:
        friendly_name: "Sun Angle"
        unit_of_measurement: "°"
        value_template: "{{ '%+.1f'|format(state_attr('sun.sun', 'elevation')) }}"
```

{% endraw %}

### Renaming Sensor Output

If you don't like the wording of a sensor output, then the Template Sensor can help too. Let's rename the output of the [Sun component](/integrations/sun/) as
a simple example:

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      sun_state:
        friendly_name: "Sun State"
        value_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            up
          {% else %}
            down
          {% endif %}
```

{% endraw %}

### Multiline Example With an `if` Test

This example shows a multiple line template with an `if` test. It looks at a sensing switch and shows `on`/`off` in the frontend.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      kettle:
        friendly_name: "Kettle"
        value_template: >-
          {% if is_state('switch.kettle', 'off') %}
            off
          {% elif state_attr('switch.kettle', 'kwh')|float < 1000 %}
            standby
          {% elif is_state('switch.kettle', 'on') %}
            on
          {% else %}
            failed
          {% endif %}
```

{% endraw %}

### Change The Unit of Measurement

With a Template Sensor, it's easy to convert given values into others if the unit of measurement doesn't fit your needs.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      transmission_down_speed_kbps:
        friendly_name: "Transmission Down Speed"
        unit_of_measurement: "kB/s"
        value_template: "{{ states('sensor.transmission_down_speed')|float * 1024 }}"

      transmission_up_speed_kbps:
        friendly_name: "Transmission Up Speed"
        unit_of_measurement: "kB/s"
        value_template: "{{ states('sensor.transmission_up_speed')|float * 1024 }}"
```

{% endraw %}

### Change The Icon

This example shows how to change the icon based on the day/night cycle.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      day_night:
        friendly_name: "Day/Night"
        value_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            Day
          {% else %}
            Night
          {% endif %}
        icon_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            mdi:weather-sunny
          {% else %}
            mdi:weather-night
          {% endif %}
```

{% endraw %}

### Change The Entity Picture

This example shows how to change the entity picture based on the day/night cycle.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      day_night:
        friendly_name: "Day/Night"
        value_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            Day
          {% else %}
            Night
          {% endif %}
        entity_picture_template: >-
          {% if is_state('sun.sun', 'above_horizon') %}
            /local/daytime.png
          {% else %}
            /local/nighttime.png
          {% endif %}
```

{% endraw %}

### Change the Friendly Name Used in the Frontend

This example shows how to change the `friendly_name` based on a state.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      net_power:
        friendly_name_template: >-
          {% if states('sensor.power_consumption')|float < 0 %}
            Power Consumption
          {% else %}
            Power Production
          {% endif %}
        value_template: "{{ states('sensor.power_consumption') }}"
        unit_of_measurement: "kW"
```

{% endraw %}

### Add Custom Attributes

This example shows how to add custom attributes.

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      my_device:
        value_template: >-
          {% if is_state('device_tracker.my_device_nmap','home') %}
            Home
          {% else %}
            {{ states('device_tracker.my_device_gps') }}
          {% endif %}
        attribute_templates:
          latitude: >-
            {% if is_state('device_tracker.my_device_nmap','home') %}
              {{ state_attr('zone.home','latitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps','latitude') }}
            {% endif %}
          longitude: >-
            {% if is_state('device_tracker.my_device_nmap','home') %}
              {{ state_attr('zone.home','longitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps','longitude') }}
            {% endif %}
```

{% endraw %}

### Working without entities

The `template` sensors are not limited to use attributes from other entities but can also work with [Home Assistant's template extensions](/docs/configuration/templating/#home-assistant-template-extensions).

This template contains no entities that will trigger an update but the `now()` will cause it to update every minute:

{% raw %}

```yaml
sensor:
  - platform: time_date
    display_options:
      - 'date'
  - platform: template
    sensors:
      nonsmoker:
        value_template: '{{ ( ( as_timestamp(now()) - as_timestamp(strptime("06.07.2018", "%d.%m.%Y")) ) / 86400 ) | round(2) }}'
        friendly_name: "Not smoking"
        unit_of_measurement: "Days"
```

{% endraw %}

### Updating templates using `random`

If you use the `random` filter, you may want the template to select a different random element every now and then. If the template does not update automatically due to entity changes it can be updated periodically by using the `homeassistant.update_entity` service with a time pattern automation. For example, this will render a new random number every five minutes:

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      random_number:
        friendly_name: "Random number"
        value_template: "{{ range(0,100)|random }}"

automation:
  - alias: "Update random number template"
    trigger:
      - platform: time_pattern
        minutes: "/5"
    action:
      - service: homeassistant.update_entity
        target:
          entity_id: sensor.random_number
```

{% endraw %}
