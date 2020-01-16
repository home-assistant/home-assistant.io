---
title: Tesla
description: Instructions on how to integrate Tesla car into Home Assistant.
logo: tesla.png
ha_category:
  - Car
  - Binary Sensor
  - Climate
  - Presence Detection
  - Lock
  - Sensor
  - Switch
ha_release: 0.53
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@zabuldon'
  - '@alandtse'
---

The `Tesla` integration offers integration with the [Tesla](https://auth.tesla.com/login) cloud service and provides presence detection as well as sensors such as charger state and temperature.

This integration provides the following platforms:

- Binary sensors - such as parking and charger connection.
- Sensors - such as Battery level, Inside/Outside temperature, odometer, estimated range, and charging rate.
- Device tracker - to track location of your car
- Lock - Door lock. Enables you to control Tesla's door lock
- Climate - HVAC control. Allow you to control (turn on/off, set target temperature) your Tesla's HVAC system.
- Switch - Charger and max range switch to allow you to start/stop charging and set max range charging. Update switch to allow you to disable polling of vehicles to conserve battery

## Configuration

Home Assistant offers the Tesla integration through **Configuration** -> **Integrations** -> **Tesla**.

Enter username and password and then continue.

Alternatively, Home Assistant will also load Tesla via the  `configuration.yaml`. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tesla:
  username: YOUR_EMAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address associated with your Tesla account.
  required: true
  type: string
password:
  description: The password associated with your Tesla account.
  required: true
  type: string
scan_interval:
  description: API polling interval in seconds. Minimum value can't be less than 300 (5 minutes). Very frequent polling can use battery.
  required: false
  type: integer
  default: 300
{% endconfiguration %}
