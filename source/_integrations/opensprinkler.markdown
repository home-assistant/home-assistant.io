---
title: Opensprinkler Integration
description: Instructions on how to integrate Opensprinkler controllers into Home Assistant.
ha_category:
  - Binary Sensor
  - Scene
  - Sensor
  - Switch
ha_release: 0.109
ha_iot_class: Local Polling
ha_config_flow: false
ha_codeowners:
  - '@vinteo'
ha_domain: opensprinkler
---

The `opensprinkler` integration allows you to integrate your [Opensprinkler](https://opensprinkler.com/) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Scene](#scene)
- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

You will need the host name of your Opensprinkler controller and a **MD5'ed** version of your password.

Add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
opensprinkler:
  devices:
    - host: YOUR_DEVICE_HOST_NAME
      password: YOUR_MD5_PASSWORD
```

{% configuration %}
devices:
  description: List of Opensprinkler devices to integrate.
  required: true
  type: list
  keys:
    host:
      description: The host name of your Opensprinkler device.
      required: true
      type: string
    password:
      description: The **MD5'ed** version of your password.
      required: true
      type: string
    port:
      description: The port to the Opensprinkler device API.
      required: false
      type: integer
      default: 8080
    name:
      description: The name of your Opensprinkler.
      required: false
      type: string
      default: Opensprinkler
    run_seconds:
      description: The number of seconds to run the station when switch is triggered.
      required: false
      type: integer
      default: 60

{% endconfiguration %}

### Binary Sensor

The binary sensor platform allows you to monitor the following states.

- Operation enabled for each device
- Rain sensors for each device
- Rain delay activated for each device
- Program enabled for each program
- Is running for each station

### Scene

A scene is created for each program and can be activated to run the program

### Sensor

The sensor platform allows you to monitor the following states.

- Water level for each device (%)
- Last run time for each device
- Rain delay stop time for each device
- Status of each station
  - _idle_ - idle and not running
  - _manual_ - running from manual trigger
  - _program_ - running from program trigger
  - _waiting_ - waiting to run as part of program
  - _once\_program_ - running from once off program trigger

### Switch

The switch platform provides switches the following functions.

- Enable and disable operation of each device
- Enable and disable each program
- Run and stop each station
