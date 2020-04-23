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
        unit_of_measurement: 'degrees'
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
      entity_id:
        description: A list of entity IDs so the sensor only reacts to state changes of these entities. This can be used if the automatic analysis fails to find all relevant entities.
        required: false
        type: [string, list]
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

### Entity IDs

The template engine will attempt to work out what entities should trigger an update of the sensor. This can fail, for example, if your template loops over the contents of a group. In this case, you can use `entity_id` to provide a list of entity IDs that will cause the sensor to update or you can run the service `homeassistant.update_entity` to update the sensor at will.

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
        unit_of_measurement: '°'
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
        unit_of_measurement: 'kB/s'
        value_template: "{{ states('sensor.transmission_down_speed')|float * 1024 }}"

      transmission_up_speed_kbps:
        friendly_name: "Transmission Up Speed"
        unit_of_measurement: 'kB/s'
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
        unit_of_measurement: 'kW'
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

This template contains no entities that will trigger an update (as `now()` is a function), so we add an `entity_id:` line with an entity that will force an update - here we're using a [date sensor](/integrations/time_date) to get a daily update:

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      nonsmoker:
        value_template: "{{ (( as_timestamp(now()) - as_timestamp(strptime('06.07.2018', '%d.%m.%Y')) ) / 86400 ) | round(2) }}"
        entity_id: sensor.date
        friendly_name: 'Not smoking'
        unit_of_measurement: "Days"
```

{% endraw %}

In this case it is also possible to convert the entity-less template above into one that will be updated automatically:

{% raw %}

````yaml
sensor:
  - platform: template
    sensors:
      nonsmoker:
        value_template: "{{ (( as_timestamp(strptime(states('sensor.date'), '%Y-%m-%d')) - as_timestamp(strptime('06.07.2018', '%d.%m.%Y')) ) / 86400 ) | round(2) }}"
        friendly_name: 'Not smoking'
        unit_of_measurement: "Days"
````

{% endraw %}

Useful entities to choose might be `sensor.date` which update once per day or `sensor.time`, which updates once per minute.  
Please note that the resulting template will be evaluated by Home Assistant state engine on every state change of these sensors, which in case of `sensor.time` happens every minute and might have a negative impact on performance.
 
An alternative to this is to create an interval-based automation that calls the service `homeassistant.update_entity` for the entities requiring updates. This modified example updates every 5 minutes:

{% raw %}

```yaml
sensor:
  - platform: template
    sensors:
      nonsmoker:
        value_template: "{{ (( as_timestamp(now()) - as_timestamp(strptime('06.07.2018', '%d.%m.%Y')) ) / 86400 ) | round(2) }}"
        entity_id: []
        friendly_name: 'Not smoking'
        unit_of_measurement: "Days"

automation:
  - alias: 'nonsmoker_update'
    trigger:
      - platform: time_pattern
        minutes: '/5'
    action:
      - service: homeassistant.update_entity
        entity_id: sensor.nonsmoker
```

{% endraw %}
