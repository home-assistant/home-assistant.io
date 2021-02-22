---
title: Eight Sleep
description: Interface an Eight Sleep smart cover or mattress to Home Assistant
ha_category:
  - Health
  - Binary Sensor
  - Sensor
ha_release: 0.44
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@mezz64'
ha_domain: eight_sleep
ha_platforms:
  - binary_sensor
  - sensor
---

The `eight_sleep` integration allows Home Assistant to fetch data from your [Eight Sleep](https://eightsleep.com/) smart cover or mattress.

There is currently support for the following device types within Home Assistant:

- Binary Sensor - lets observe the presence state of a [Eight Sleep](https://eightsleep.com/) cover/mattress through Home Assistant.
- Sensor - This includes bed state, sleep fitness scores, and results of the current and previous sleep sessions.

## Configuration

It's setup utilizing 'Sensor' platform to convey the current state of your bed and results of your sleep sessions and a 'Binary Sensor' platform to indicate your presence in the bed. A service is also provided to set the cooling/heating level and duration of the bed (cooling is only available for the POD mattress).

You must have at least two sleep sessions recorded in the Eight Sleep app prior to setting up the Home Assistant component.

To get started add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
eight_sleep:
  username: YOUR_E_MAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address associated with your Eight Sleep account.
  required: true
  type: string
password:
  description: The password associated with your Eight Sleep account.
  required: true
  type: string
partner:
  description: Defines if you'd like to fetch data for both sides of the bed.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

### Supported features

Sensors:

- eight_left/right_bed_state
- eight left/right_sleep_fitness
- eight_left/right_sleep_session
- eight_left/right_previous_sleep_session
- eight_left/right_bed_temperature
- eight_left/right_sleep_stage
- eight_room_temperature

Binary Sensors:

- eight_left/right_bed_presence

### Service `heat_set`

You can use the service eight_sleep/heat_set to adjust the target cooling/heating level and heating duration of your bed (cooling is only available for the POD mattress).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Entity ID of bed state to adjust.
| `target` | no | Target cooling/heating level from -100 to 100.
| `duration` | no | Duration to cool/heat at the target level in seconds.

Script Example:

```yaml
script:
  bed_set_heat:
    sequence:
      - service: eight_sleep.heat_set
        target:
          entity_id: "sensor.eight_left_bed_state"
        data:
          target: 35
          duration: 3600
```
