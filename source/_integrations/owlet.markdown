---
title: Owlet
description: Instructions on how to integrate Owlet baby monitor into Home Assistant.
logo: owlet.svg
ha_category:
  - Health
  - Binary Sensor
  - Sensor
ha_release: 0.89
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@oblogic7'
---

[Owlet Care](https://owletcare.com/) baby monitors check your baby's oxygen level and heart rate while sleeping.

Configuring this integration will enable tracking of heart rate, oxygen level, motion and base station connection status. Battery status is available as an attribute on oxygen and heart rate sensors.

This integration enables the following platforms automatically:

#### Binary Sensors

- Base Station Status
- Motion

#### Sensors

- Heart rate
- Oxygen level

### Configuration

```yaml
# Example configuration.yaml entry
owlet:
  username: OWLET_USER
  password: OWLET_PASSWORD
```

{% configuration %}
username:
  description: Your Owlet account user ID.
  required: true
  type: string
password:
  description: Your Owlet account password.
  required: true
  type: string
name:
  description: Custom name for your Owlet device.
  required: false
  type: string
{% endconfiguration %}

<p class='warning'>
The intended purpose of this integration is to enable data logging and automations such as battery status updates and charging reminders. This integration should not replace the Owlet app nor should it be used for life-critical notifications.
</p>
