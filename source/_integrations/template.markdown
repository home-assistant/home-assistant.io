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

The `template` integration allows creating entities which derive their values from other data. This is done by specifying [templates](/docs/configuration/templating/) for properties of an entity, like the name or the state.

Sensors and binary (on/off) sensors are covered on this page. For other types, please see the specific pages:

- [Alarm_control_panel](/integrations/alarm_control_panel.template/)
- [Cover](/integrations/cover.template/)
- [Fan](/integrations/fan.template/)
- [Light](/integrations/light.template/)
- [Lock](/integrations/lock.template/)
- [Switch](/integrations/switch.template/)
- [Vacuum](/integrations/vacuum.template/)
- [Weather](/integrations/weather.template/)

Sensor and binary sensor template entities are defined in YAML directly under the `template:` key. You can define multiple configuration blocks as a list. Each block defines sensors and/or binary sensor entities and can contain an optional update trigger.

_For old sensor/binary sensor configuration format, [see below](#legacy-binary-sensor-configuration-format)._

## State-based template sensors

Template entities will by default update as soon as any of the referenced data in the template updates.

For example, you can have a template that takes the averages of two sensors. Home Assistant will update your template sensor as soon as either source sensor updates.

{% raw %}

```yaml
template:
  - sensor:
      - name: Average temperature
        unit_of_measurement: °C
        state: >
          {% set bedroom = states.sensor.bedroom_temperature.state | float %}
          {% set kitchen = states.sensor.kitchen_temperature.state | float %}

          {{ ((bedroom + kitchen) / 2) | round(1) }}
```

{% endraw %}

## Trigger-based template sensors

If you want more control over when an entity updates, you can define a trigger. Triggers follow the same format and work exactly the same as [triggers in automations][trigger-doc]. This feature is a great way to create entities based on webhook data, or update entities based on a schedule.

Whenever the trigger fires, all related entities will re-render and it will have access to [the trigger data](/docs/automation/templating/) in the templates.

Trigger-based entities do not automatically update when states referenced in the templates change. This functionality can be added back by defining a [state trigger](/docs/automation/trigger/#state-trigger) for each entity that you want to trigger updates.

{% raw %}

```yaml
# Example configuration entry
template:
  - trigger:
      - platform: time_pattern
        # This will update every night
        hours: 0
        minutes: 0
    sensor:
      # Keep track how many days have past since a date
      - name: Not smoking
        state: '{{ ( ( as_timestamp(now()) - as_timestamp(strptime("06.07.2018", "%d.%m.%Y")) ) / 86400 ) | round }}'
        unit_of_measurement: "Days"
```

{% endraw %}

{% configuration %}
trigger:
  description: Define an automation trigger to update the entities. Optional. If omitted will update based on referenced entities. [See trigger documentation](/docs/automation/trigger).
  required: false
  type: list
unique_id:
  description: The unique ID for this config block. This will be prefixed to all unique IDs of all entities in this block.
  required: false
  type: string
sensor:
  description: List of sensors
  required: true
  type: map
  keys:
    state:
      description: Defines a template to get the state of the sensor.
      required: true
      type: template
    unit_of_measurement:
      description: "Defines the units of measurement of the sensor, if any. This will also influence the graphical presentation in the history visualization as a continuous value. Sensors with missing `unit_of_measurement` are showing as discrete values."
      required: false
      type: string
      default: None
binary_sensor:
  description: List of binary sensors
  required: true
  type: map
  keys:
    state:
      description: The sensor is `on` if the template evaluates as `True`, `yes`, `on`, `enable` or a positive number. Any other value will render it as `off`. The actual appearance in the frontend (`Open`/`Closed`, `Detected`/`Clear` etc) depends on the sensor’s device_class value
      required: true
      type: template
    delay_on:
      description: The amount of time (ie `0:00:05`) the template state must be ***met*** before this sensor will switch to `on`. This can also be a template.
      required: false
      type: time
    delay_off:
      description: The amount of time the template state must be ***not met*** before this sensor will switch to `off`. This can also be a template.
      required: false
      type: time
    auto_off:
      description: **Requires a trigger.** After how much time the entity should turn off after it rendered 'on'.
      required: false
      type: time
"[both sensor and binary_sensor entities]":
  description: Fields that can be used above for both sensors and binary sensors.
  required: false
  type: map
  keys:
    name:
      description: Defines a template to get the name of the sensor.
      required: false
      type: template
    unique_id:
      description: An ID that uniquely identifies this sensor. Will be combined with the unique ID of the configuration block if available. This allows changing the `name`, `icon` and `entity_id` from the web interface.
      required: false
      type: string
    icon:
      description: Defines a template for the icon of the sensor.
      required: false
      type: template
    picture:
      description: Defines a template for the entity picture of the sensor.
      required: false
      type: template
    attributes:
      description: Defines templates for attributes of the sensor.
      required: false
      type: map
      keys:
        "attribute: template":
          description: The attribute and corresponding template.
          required: true
          type: template
    availability:
      description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If not configured, the component will always be `available`.
      required: false
      type: template
      default: true
    device_class:
      description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
      required: false
      type: device_class
      default: None

{% endconfiguration %}

The above configuration variables describe a configuration section. The template integration allows defining multiple sections.

```yaml
# Example configuration.yaml entry with two sections
template:
  # Define state-based template entities
  - sensor:
      ...
    binary_sensor:
      ...

  # Define trigger-based template entities
  - trigger:
      ...
    sensor:
      ...
    binary_sensor:
      ...
```

[trigger-doc]: /docs/automation/trigger

## Rate limiting updates

When there are entities present in the template and no triggers are defined, the template will be re-rendered when one of the entities changes states. To avoid this taking up too many resources in Home Assistant, automatic rate limiting will be automatically applied if too many states are observed.

<p class='note'>
<a href='#trigger-based-template-sensors'>Define a trigger</a> to avoid a rate limit and get more control over entity updates.
</p>

When `states` is used in a template by itself to iterate all states on the system, the template is re-rendered each
time any state changed event happens if any part of the state is accessed. When merely counting states, the template
is only re-rendered when a state is added or removed from the system. On busy systems with many entities or hundreds of
thousands state changed events per day, templates may re-render more than desirable.

In the below example, re-renders are limited to once per minute:

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: Has Unavailable States
        state: "{{ states | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

{% endraw %}

In the below example, re-renders are limited to once per second:

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: Has Unavailable States
        state: "{{ states.sensor | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

{% endraw %}

If the template accesses every state on the system, a rate limit of one update per minute is applied. If the template accesses all states under a specific domain, a rate limit of one update per second is applied. If the template only accesses specific states, receives update events for specifically referenced entities, or the `homeassistant.update_entity` service is used, no rate limit is applied.

## Considerations

### Startup

If you are using the state of a platform that might not be available during startup, the Template Sensor may get an `unknown` state. To avoid this, use `is_state()` function in your template. For example, you would replace {% raw %}`{{ states.cover.source.state == 'open' }}`{% endraw %} with this equivalent that returns `true`/`false` and never gives an `unknown` result:

{% raw %}

```yaml
{{ is_state('switch.source', 'on') }}
```

{% endraw %}

## Examples

In this section, you find some real-life examples of how to use this sensor.

### Storing webhook information

Template entities can be triggered using any automation trigger, including webhook triggers. Use a trigger-based template entity to store this information in template entities.

{% raw %}

```yaml
template:
  - trigger:
      - platform: webhook
        webhook_id: my-super-secret-webhook-id
    sensor:
      - name: "Webhook Temperature"
        state: "{{ trigger.json.temperature }}"
        unit_of_measurement: °C

      - name: "Webhook Humidity"
        state: "{{ trigger.json.humidity }}"
        unit_of_measurement: %

    binary_sensor:
      - name: "Motion"
        state: "{{ trigger.json.motion }}"
        device_class: motion
```

{% endraw %}

You can test this trigger entity with the following CURL command:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"temperature": 5, "humidity": 34, "motion": true}' \
  http://homeassistant.local:8123/api/webhook/my-super-secret-webhook-id
```

### Sun Angle

This example shows the sun angle in the frontend.

{% raw %}

```yaml
template:
  - sensor:
      - name: Sun Angle
        unit_of_measurement: "°"
        state: "{{ '%+.1f'|format(state_attr('sun.sun', 'elevation')) }}"
```

{% endraw %}

### Renaming Sensor Output

If you don't like the wording of a sensor output, then the Template Sensor can help too. Let's rename the output of the [Sun component](/integrations/sun/) as a simple example:

{% raw %}

```yaml
template:
  - sensor:
      - name: "Sun State"
        state: >
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
template:
  - sensor:
      - name: "Kettle"
        state: >
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
template:
  - sensor:
      - name: "Transmission Down Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_down_speed')|float * 1024 }}"

      - name: "Transmission Up Speed"
        unit_of_measurement: "kB/s"
        state: "{{ states('sensor.transmission_up_speed')|float * 1024 }}"
```

{% endraw %}

### Washing Machine Running

This example creates a washing machine "load running" sensor by monitoring an
energy meter connected to the washer. During the washer's operation, the energy meter will fluctuate wildly, hitting zero frequently even before the load is finished. By utilizing `delay_off`, we can have this sensor only turn off if there has been no washer activity for 5 minutes.

{% raw %}

```yaml
# Determine when the washing machine has a load running.
template:
  - binary_sensor:
      - name: "Washing Machine"
        delay_off:
          minutes: 5
        state: >
          {{ states('sensor.washing_machine_power')|float > 0 }}
```

{% endraw %}

### Is Anyone Home

This example is determining if anyone is home based on the combination of device tracking and motion sensors. It's extremely useful if you have kids/baby sitter/grand parents who might still be in your house that aren't represented by a trackable device in Home Assistant. This is providing a composite of Wi-Fi based device tracking and Z-Wave multisensor presence sensors.

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: People home
        state: >
          {{ is_state('device_tracker.sean', 'home')
             or is_state('device_tracker.susan', 'home')
             or is_state('binary_sensor.office_124', 'on')
             or is_state('binary_sensor.hallway_134', 'on')
             or is_state('binary_sensor.living_room_139', 'on')
             or is_state('binary_sensor.porch_ms6_1_129', 'on')
             or is_state('binary_sensor.family_room_144', 'on') }}
```

{% endraw %}

### Device Tracker sensor with Latitude and Longitude Attributes

This example shows how to combine a non-GPS (e.g., NMAP) and GPS device tracker while still including latitude and longitude attributes

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: My Device
        state: >
          {{ is_state('device_tracker.my_device_nmap','home') or is_state('device_tracker.my_device_gps','home') }}
        device_class: "presence"
        attributes:
          latitude: >
            {% if is_state('device_tracker.my_device_nmap','home') %}
              {{ state_attr('zone.home','latitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps','latitude') }}
            {% endif %}
          longitude: >
            {% if is_state('device_tracker.my_device_nmap','home') %}
              {{ state_attr('zone.home','longitude') }}
            {% else %}
              {{ state_attr('device_tracker.my_device_gps','longitude') }}
            {% endif %}
```

{% endraw %}

### Change the icon when a state changes

This example demonstrates how to use template to change the icon as it's state changes. This icon is referencing it's own state.

{% raw %}

```yaml
template:
  - binary_sensor:
      - name: Sun Up
        state: >
          {{ is_state("sun.sun", "above_horizon") }}
        icon: >
          {% if is_state("binary_sensor.sun_up", "on") %}
            mdi:weather-sunset-up
          {% else %}
            mdi:weather-sunset-down
          {% endif %}
```

{% endraw %}

## Legacy binary sensor configuration format

_This format still works but is no longer recommended. [Use modern configuration](#configuration-variables)._

This format is configured as a platform for the `binary_sensor` integration and not directly under the `template` integration.

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: template
    sensors:
      sun_up:
        friendly_name: "Sun is up"
        value_template: >
          {{ state_attr('sun.sun', 'elevation')|float > 0 }}
```

{% endraw %}

{% configuration %}
sensors:
  description: List of your sensors.
  required: true
  type: map
  keys:
    sensor_name:
      description: The slug of the sensor.
      required: true
      type: map
      keys:
        friendly_name:
          description: Name to use in the frontend.
          required: false
          type: string
        unique_id:
          description: An ID that uniquely identifies this binary sensor. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        device_class:
          description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
          required: false
          type: device_class
          default: None
        value_template:
          description: The sensor is `on` if the template evaluates as `True` and `off` otherwise. The actual appearance in the frontend (`Open`/`Closed`, `Detected`/`Clear` etc) depends on the sensor’s device_class value
          required: true
          type: template
        availability_template:
          description: Defines a template to get the `available` state of the component. If the template returns `true`, the device is `available`. If the template returns any other value, the device will be `unavailable`. If `availability_template` is not configured, the component will always be `available`.
          required: false
          type: template
          default: true
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
        delay_on:
          description: The amount of time the template state must be ***met*** before this sensor will switch to `on`. This can also be a template.
          required: false
          type: time
        delay_off:
          description: The amount of time the template state must be ***not met*** before this sensor will switch to `off`. This can also be a template.
          required: false
          type: time
{% endconfiguration %}

## Legacy Sensor configuration format

_This format still works but is no longer recommended. [Use modern configuration](#configuration-variables)._

This format is configured as a platform for the `sensor` integration and not directly under the `template` integration.

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
    description: Map of your sensors.
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
