---
title: ROMY
description: Integrate your ROMY vacuum robot with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2023.5
ha_config_flow: true
ha_codeowners:
  - '@xeniter'
ha_domain: romy
ha_platforms:
  - binary_sensor
  - sensor
  - vacuum
  - button
ha_integration_type: integration
---

The `romy` integration allows you to control your [ROMY](https://romyrobot.eu/) vacuum robot.

This integration supports currently following models:

- ROMY C5
- ROMY L6 Performance
- ROMY L6 Animal

{% include integrations/config_flow.md %}

## YAML Configuration

YAML configuration is around for people that prefer YAML.
To use this integration, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
myROMY:
  - host: IP_ADDRESS
  - port: 8080
  - host: Agon
  - host: 12345678
```

{% configuration %}
host:
  description: "The hostname or IP of your ROMY, e.g., `192.168.0.10`."
  required: true
  type: string
port:
  description: "The port where your robot interface is reachable (default: 8080)."
  required: true
  default: 8080
  type: string
name:
  description: "The name you would like to give to your ROMY vacuum cleaner robot."
  required: true
  type: string
password:
  description: "The password required to unlock the local http interface (Is labled inside your robot under the dustbin)."
  required: false
  type: string
{% endconfiguration %}

## Services

Currently supported services are:

- `start`
- `pause`
- `continue`
- `stop`
- `return_to_base`

## Sensors

Currently supported sensors are:

- battery level
- wifi rssi level
- dustbin level
- docked
- dustbin present
- watertank present
- watertank empty


## Troubleshooting

### local http interface password

You have to enable the local interface first with a password, this is printend as QR Code on a label directly under the dustbin inside the robot.

### ROMY robot interface protocol

Is available as download under [romy-robot-interface-protocol](https://romyrobot.eu/pages/romy-robot-interface-protocol)
