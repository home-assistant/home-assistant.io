---
title: Tesla
description: Instructions on how to integrate Tesla car into Home Assistant.
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
ha_domain: tesla
---

The `Tesla` integration offers integration with the [Tesla](https://auth.tesla.com/login) cloud service and provides presence detection as well as sensors such as charger state and temperature.

This integration provides the following platforms:

- Binary sensors - such as parking and charger connection.
- Sensors - such as Battery level, Inside/Outside temperature, odometer, estimated range, and charging rate.
- Device tracker - to track location of your car
- Lock - Door lock and charger door lock. Enables you to control Tesla's door and charger door lock
- Climate - HVAC control. Allow you to control (turn on/off, set target temperature) your Tesla's HVAC system. Also enables preset modes to enable or disable max defrost mode `defrost` or `normal` operation mode.
- Switch - Charger and max range switch to allow you to start/stop charging and set max range charging. Update switch to allow you to disable polling of vehicles to conserve battery. Sentry mode switch to enable or disable Sentry mode.

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
  description: API polling interval in seconds. Minimum value can't be less than 60 (1 minute). Very frequent polling can use battery.
  required: false
  type: integer
  default: 660
{% endconfiguration %}

## Options

Tesla options are set via **Configuration** -> **Integrations** -> **Tesla** -> **Options**.

* Wake cars on start - Whether to wake sleeping cars on Home Assistant startup. This allows a user to choose whether cars should continue to sleep (and not update information) or to wake up the cars potentially interrupting long term hibernation and increasing vampire drain.
