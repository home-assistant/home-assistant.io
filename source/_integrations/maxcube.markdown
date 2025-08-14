---
title: eQ-3 MAX!
description: Instructions on how to integrate eQ-3 MAX! components with Home Assistant via eQ-3 MAX! Cube.
ha_category:
  - Binary sensor
  - Climate
ha_release: '0.40'
ha_iot_class: Local Polling
ha_domain: maxcube
ha_platforms:
  - binary_sensor
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

[eQ-3 MAX!](https://www.eq-3.com/products/homematic/detail/max-cube-lan-gateway.html) integration for Home Assistant allows you to connect eQ-3 MAX! components via the eQ-3 MAX! Cube. The components connects to the eQ-3 MAX! Cube via TCP and automatically makes all supported integrations available in Home Assistant. The name for each device is created by concatenating the MAX! room and device names.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Climate

Limitations:

- Configuring weekly schedules is not possible.
- Implementation is based on the reverse engineered [MAX! protocol](https://github.com/Bouni/max-cube-protocol).

Supported Devices:

- MAX! Radiator Thermostat (tested)
- MAX! Radiator Thermostat+
- MAX! Window Sensor (tested)
- MAX! Wall Thermostat (tested)

### One gateway

A `maxcube` section must be present in the {% term "`configuration.yaml`" %} file and contain the following options as required:
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
maxcube:
  gateways:
    - host: 192.168.0.20
```

### Multiple gateways

```yaml
# Example configuration.yaml entry
maxcube:
  gateways:
    - host: 192.168.0.20
      port: 62910
    - host: 192.168.0.21
      port: 62910
```

{% configuration %}
  host:
    description: The IP address of the eQ-3 MAX! Cube to use.
    required: true
    type: string
  port:
    description: The UDP port number.
    required: false
    type: integer
    default: 62910
  scan_interval:
    description: The update interval in seconds
    required: false
    type: integer
    default: 300
{% endconfiguration %}

### Problems connecting or setting up 

Due to the connection limits of the eQ-3 MAX! Cube, Home Assistant will not be able to connect to the gateway if another application is still connected. It may result in timeout errors like _Error: timed out You will need to restart Home Assistant after fixing._ and  _The following integrations and platforms could not be set up: maxcube Please check your configuration._

To prevent these issues, ensure all other applications connecting to the gateway are closed, e.g., the mobile app or the MAX! desktop app (On Windows machines, close from the status bar, it keeps running when you close the browser window).
