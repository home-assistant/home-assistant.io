---
layout: page
title: "Eight Sleep"
description: "Interface an Eight Sleep smart cover or mattress to Home Assistant"
date: 2017-04-24 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: eight_sleep.png
ha_category: Hub
ha_release: "0.44"
ha_iot_class: "Cloud Polling"
---

The `eight_sleep` component allows Home Assistant to fetch data from your [Eight Sleep](https://eightsleep.com/) smart cover or mattress.

## {% linkable_title Configuration %}

It's setup utilizing 'Sensor' components to convey the current state of your bed and results of your sleep sessions and a 'Binary Sensor' component to indicate your presence in the bed.  A service is also provided to set the heating level and duration of the bed.

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
password:
  description: Defines if you'd like to fetch data for both sides of the bed.
  required: false
  type: string
  default: false
{% endconfiguration %}

### {% linkable_title Supported features %}

Sensors:

- eight_left/right_bed_state
- eight_left/right_sleep_session
- eight_left/right_previous_sleep_session
- eight_left/right_bed_temperature
- eight_left/right_sleep_stage
- eight_room_temperature

Binary Sensors:

- eight_left/right_bed_presence

### {% linkable_title Service `heat_set` %}

You can use the service eight_sleep/heat_set to adjust the target heating level and heating duration of your bed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | Entity ID of bed state to adjust.
| `target` | no | Target heating level from 0-100.
| `duration` | no | Duration to heat at the target level in seconds.

Script Example:

```yaml
script:
  bed_set_heat:
    sequence:
      - service: eight_sleep.heat_set
        data:
          entity_id: "sensor.eight_left_bed_state"
          target: 35
          duration: 3600
```
