---
title: "Template Binary Sensor"
description: "Instructions on how to integrate Template Binary Sensors into Home Assistant."
ha_category:
  - Binary Sensor
ha_release: 0.12
ha_iot_class: Local Push
ha_quality_scale: internal
ha_domain: template
---

The `template` platform supports binary sensors which get their values from
other entities. The state of a Template Binary Sensor can only be `on` or
`off`.

## Configuration

Here is an example of adding a Template Binary Sensor to the `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: template
    sensors:
      sun_up:
        friendly_name: "Sun is up"
        value_template: >-
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

## Considerations

### Startup

If you are using the state of a platform that takes extra time to load, the
Template Binary Sensor may get an `unknown` state during startup. This results
in error messages in your log file until that platform has completed loading.
If you use `is_state()` function in your template, you can avoid this situation.
For example, you would replace
{% raw %}`{{ states.switch.source.state == 'on' }}`{% endraw %}
with this equivalent that returns `true`/`false` and never gives an unknown
result:
{% raw %}`{{ is_state('switch.source', 'on') }}`{% endraw %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### Sensor Threshold

This example indicates true if a sensor is above a given threshold. Assuming a
sensor of `furnace` that provides a current reading for the fan motor, we can
determine if the furnace is running by checking that it is over some threshold:

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      furnace_on:
        friendly_name: "Furnace Running"
        device_class: heat
        value_template: "{{ states('sensor.furnace')|float > 2.5 }}"
```

{% endraw %}

### Switch as Sensor

Some movement sensors and door/window sensors will appear as a switch. By using
a Template Binary Sensor, the switch can be displayed as a binary sensors.

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      movement:
        device_class: motion
        value_template: "{{ is_state('switch.movement', 'on') }}"
      door:
        device_class: opening
        value_template: "{{ is_state('switch.door', 'on') }}"
```

{% endraw %}

### Combining Multiple Sensors

This example combines multiple CO sensors into a single overall
status. When using templates with binary sensors, you need to return
`true` or `false` explicitly.

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      co:
        friendly_name: "CO"
        device_class: gas
        value_template: >-
          {{ is_state('sensor.bedroom_co_status', 'Ok')
             and is_state('sensor.kitchen_co_status', 'Ok')
             and is_state('sensor.wardrobe_co_status', 'Ok') }}
```

{% endraw %}

### Washing Machine Running

This example creates a washing machine "load running" sensor by monitoring an
energy meter connected to the washer. During the washer's operation, the energy
meter will fluctuate wildly, hitting zero frequently even before the load is
finished. By utilizing `delay_off`, we can have this sensor only turn off if
there has been no washer activity for 5 minutes.

{% raw %}

```yaml
# Determine when the washing machine has a load running.
binary_sensor:
  - platform: template
    sensors:
      washing_machine:
        friendly_name: "Washing Machine"
        delay_off:
          minutes: 5
        value_template: >-
          {{ states('sensor.washing_machine_power')|float > 0 }}
```

{% endraw %}

### Is Anyone Home

This example is determining if anyone is home based on the combination of device
tracking and motion sensors. It's extremely useful if you have kids/baby sitter/
grand parents who might still be in your house that aren't represented by a
trackable device in Home Assistant. This is providing a composite of Wi-Fi based
device tracking and Z-Wave multisensor presence sensors.

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      people_home:
        value_template: >-
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
binary_sensor:
  - platform: template
    sensors:
      my_device:
        value_template: >-
          {{ is_state('device_tracker.my_device_nmap','home') or is_state('device_tracker.my_device_gps','home') }}
        device_class: "presence"
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

### Change the icon when state changes

This example demonstrates how to use `icon_template` to change the entity's
icon as its state changes, it evaluates the state of its own sensor and uses a
conditional statement to output the appropriate icon.

{% raw %}

```yaml
sun:
binary_sensor:
  - platform: template
    sensors:
      sun_up:
        value_template: >-
          {{ is_state("sun.sun", "above_horizon") }}
        icon_template: >-
          {% if is_state("binary_sensor.sun_up", "on") %}
            mdi:weather-sunset-up
          {% else %}
            mdi:weather-sunset-down
          {% endif %}
```

{% endraw %}

### Rate limiting updates

When there are entities present in the template, the template will be re-rendered when one of the entities changes states.

When `states` is used in a template by itself to iterate all states on the system, the template is re-rendered each
time any state changed event happens if any part of the state is accessed. When merely counting states, the template
is only re-rendered when a state is added or removed from the system. On busy systems with many entities or hundreds of
thousands state changed events per day, templates may re-render more than desirable.

In the below example, re-renders are limited to once per minute:

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      has_unavailable_states:
        value_template: "{{ states | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

{% endraw %}

In the below example, re-renders are limited to once per second:

{% raw %}

```yaml
binary_sensor:
  - platform: template
    sensors:
      has_sensor_unavailable_states:
        value_template: "{{ states.sensor | selectattr('state', 'in', ['unavailable', 'unknown', 'none']) | list | count }}"
```

{% endraw %}

If the template accesses every state on the system, a rate limit of one update per minute is applied. If the template accesses all states under a specific domain, a rate limit of one update per second is applied. If the template only accesses specific states, receives update events for specifically referenced entities, or the `homeassistant.update_entity` service is used, no rate limit is applied.
