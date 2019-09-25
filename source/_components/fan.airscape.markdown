---
title: "Airscape Whole House Fan"
description: "Instructions on how to integrate Airscape Whole House fans into Home Assistant."
logo: airscape.png
ha_category:
  - Fan
ha_release: "0.100"
ha_iot_class: Local Polling
---

The `airscape` fan platform lets you control your network connected Airscape Whole House fan.

## Configuration

```yaml
# Example configuration.yaml entry
fan:
  - platform: airscape
    name: "Whole House Fan"
    host: IP_ADDRESS
```

{% configuration %}
name:
  description: The name of the fan.
  required: true
  type: string
host:
  description: Address of the fan.
  required: true
  type: string
timeout:
  description: Timeout value for communication with the fan.
  required: false
  type: integer
  default: 5
minimum:
  description: The minimum speed of the fan.  When the fan starts it will set to this speed.  The slow_down service will not go below this speed.
  required: false
  type: integer
  default: 1
{% endconfiguration %}

## Fan Services

### Service `fan.airscape_speed_up`

Speed up the fan by 1.

| Service data attribute | Optional | Description                                          |
|------------------------|----------|------------------------------------------------------|
| `entity_id`            |       no | entity_id of the fan                                 |

### Service `fan.airscape_slow_down`

Slow down the fan speed by 1.

| Service data attribute | Optional | Description                                          |
|------------------------|----------|------------------------------------------------------|
| `entity_id`            |       no | entity_id of the fan                                 |

## Examples

In this section you find some real-life examples of how to use this fan.

### Full configuration

The example below shows a full configuration for a Airscape fan.

```yaml
# Example configuration.yaml entry
fan:
  - platform: mqtt
    name: "Whole House Fan"
    host: "192.168.10.100"
    timeout: 10
    minimum: 3

```

## Automation

It is possible to automate this fan to make it even more efficient.  Utilize it's high speed range to run at max speed when deltaT is at its greatest.

### Autostart the fan

Have the whole house fan autostart when the outside temperature is less than the inside temperature.
<div class='note warning'>
Don't start the whole house fan without the proper number of windows/doors open.  Bad things happen when the house is sealed up and the fan starts.
</div>

{% raw %}

```yaml
# automation.yaml
- alias: WHF Auto Start
  trigger:
    # Trigger anytime inside or outside temperature changes.
    platform: state
    entity_id:
      - sensor.inside_temperature
      - sensor.outside_temperature
  condition:
      # Inside temperature is warmer than outside.
    - condition: template
      value_template: >
        {{
           (states('sensor.inside_temperature')|float) >
           (states('sensor.outside_temperature')|float)
        }}
      # Check to make sure windows are open.
    - condition: state
      entity_id: binary_sensor.whf_airflow
      state: 'on'
  action:
    - service: fan.turn_on
      data:
        entity_id: fan.whole_house_fan
```

{% endraw %}

### Speed Control

Check every 30 minutes and slow down or speed up the fan based on the deltaT of inside and outside temperature.

{% raw %}

```yaml
- alias: WHF Auto Speed Control
  trigger:
    platform: time_pattern
    minutes: "/30"
  condition:
    - condition: state
      entity_id: fan.whole_house_fan
      state: 'on'
  action:
    - service_template: >-
        {% if (
                (states('sensor.inside_temperature')|float) -
                (states('sensor.outside_temperature')|float)
              ) > 5 -%}
          fan.airscape_speed_up
        {% else -%}
          fan.airscape_slow_down
        {%- endif %}
      data:
        entity_id: fan.whole_house_fan
```

{% endraw %}
