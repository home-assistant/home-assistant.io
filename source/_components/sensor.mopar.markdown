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
ha_category: Sensor
featured: false
ha_release: 0.53
ha_iot_class: "Cloud Polling"
---

The `mopar` sensor provides the following for owners of FCA vehicles with a uConnect subscription:

- Sensor per vehicle with vehicle health report and other meta-data
- Service for remote commands: Lock/unlock, Engine on/off, Horn & lights

Be sure you have a [mopar.com](http://mopar.com) account with your vehicle(s) registered by VIN. You must also have a current uConnect subscription.

To enable this sensor, add the following lines to your `configuration.yaml`.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mopar
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
  description: v
  required: true
  type: string
{% endconfiguration %}

## {% linkable_title Service %}

Call the `sensor.mopar_remote_command` service to perform a remote command on your vehicle.

- **vehicle_index** (*Required*): `vehicle_index` attribute found on sensor.
- **command** (*Required*): One of `lock/unlock/engineon/engineoff/horn`.

Example data:

```json
{
  "vehicle_index": 0,
  "command": "unlock"
}
```
