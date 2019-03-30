---
layout: page
title: "Mopar"
description: "Instructions on how to integrate Mopar vehicles into Home Assistant."
date: 2017-08-30 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mopar.png
ha_category:
  - Car
  - Sensor
  - Switch
  - Lock
ha_release: 0.53
ha_iot_class: Cloud Polling
redirect_from:
 - /components/sensor.mopar/
---

The `mopar` component provides the following for owners of FCA vehicles with a uConnect subscription:

- Sensor per vehicle with vehicle health report and other meta-data
- Lock per vehicle allowing to lock/unlock the vehicle
- Switch per vehicle allowing to turn the engine on and off
- A service for running the horn & lights

## {% linkable_title Setup %}

Be sure you have a [mopar.com](http://mopar.com) account with your vehicle(s) registered by VIN. You must also have a current uConnect subscription.

## {% linkable_title Configuration %}

To enable this component, add the following lines to your `configuration.yaml`. All platforms will be automatically loaded.

```yaml
# Example configuration.yaml entry
mopar:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  pin: YOUR_UCONNECT_PIN
```

{% configuration %}
username:
  description: Your mopar.com username.
  required: true
  type: string
password:
  description: Your mopar.com password.
  required: true
  type: string
pin:
  description: The pin for your account.
  required: true
  type: string
{% endconfiguration %}

## {% linkable_title Service %}

Call the `mopar.sound_horn` service to sound the horn and flash the lights on your vehicle.

| Service data attribute | Description |
| `vehicle_index`        | The index of the vehicle to trigger. This is exposed in the sensor's device attributes. |

Example data:

```json
{
  "vehicle_index": 0
}
```
