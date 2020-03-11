---
title: Mill
description: Instructions on how to integrate Mill heater into Home Assistant.
ha_category:
  - Climate
ha_release: 0.81
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@danielhiversen'
ha_domain: mill
---

Integrates Mill heater into Home Assistant.

## Configuration

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
climate:
  - platform: mill
    username: YOUR_EMAIL_ADDRESS
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your registered Mill email.
  required: true
  type: string
password:
  description: Your Mill password.
  required: true
  type: string
{% endconfiguration %}

## Component services

This platform supports a service to set the temperature for the room connected to heater in the Mill app:

`mill.set_room_temperature`


| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `room_name` | no | String with room name.
| `away_temp` | yes | Integer with temperature
| `comfort_temp` | yes | Integer with temperature
| `sleep_temp` | yes | Integer with temperature
