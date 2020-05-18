---
title: Subaru 
description: Instructions on how to integrate Tesla car into Home Assistant.
ha_category:
  - Car
  - Binary Sensor
  - Climate
  - Presence Detection
  - Lock
  - Sensor
  - Switch
ha_release: 0.111
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@G-Two'
ha_domain: subaru
---

The `Subaru` integration offers integration with the [Subaru](https://www.mysubuaru.com) cloud service and provides presence detection as well as sensors such as charger state and temperature.

This integration provides the following platforms:

- Binary sensors - EV charger connection status.
- Sensors - such as Outside temperature, odometer, estimated range, and EV information (battery level, range, charging rate).
- Device tracker - obtain location of your car.
- Lock - Lock and Unlock Doors.
- Climate - Enables control of HVAC and Remote Engine Start (turn on/off, set target temperature).
- Switch - Remote actuate Horn, Lights, request Location, and start EV charging.

## Configuration

### Home Assistant UI
  * The Subaru integration offers configuration through the Home Assistant UI:
    
    **Configuration** -> **Integrations** -> **Add** -> **Subaru**

### YAML
  * Alternatively, the Subaru integration may be configured through `configuration.yaml`. Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
subaru:
  username: YOUR_EMAIL_ADDRESS
  password: YOUR_PASSWORD
  pin: YOUR_PIN

  # Optional parameters
  scan_interval: 300  # Minimum 60
  hard_poll_interval: 7200  # Minimum 300
```

{% configuration %}
username:
  description: The email address associated with your MySubaru account.
  required: true
  type: string
password:
  description: The password associated with your MySubaru account.
  required: true
  type: string
pin:
  description: The PIN associated with your MySubaru account. If your account includes multiple vehicles, the same PIN will need to be used for all vehicles.
  required: true
  type: string
scan_interval:
  description: API polling interval in seconds. Minimum value can't be less than 60 (1 minute).
  required: false
  type: integer
  default: 300
hard_poll_interval:
  description: Vehicle update (wake-up) polling interval in seconds. Excessively polling the vehicle will drain the battery. Minimum value can't be less than 300 (5 minutes).
  required: false
  type: integer
  default: 7200
{% endconfiguration %}

## Options

Subaru options are set via:

**Configuration** -> **Integrations** -> **Subaru** -> **Options**.
