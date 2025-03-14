---
title: VersaSense
description: Integrate your VersaSense MicroPnP devices.
date: 2019-11-19 14:00
ha_release: 0.103
ha_category:
  - Hub
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_codeowners:
  - '@imstevenxyz'
ha_domain: versasense
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **VersaSense** {% term integration %} supports the VersaSense Edge Gateway. The gateway is able to control hubs and their peripherals (sensors and actuators) in the mesh network.

## Configuration

To enable VersaSense in your installation, add it to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
versasense:
  host: GATEWAY_URI
```

{% configuration %}
host:
  description: "The IP address or hostname of the VersaSense gateway. Including *protocol* and *port*, e.g., `https://gateway.versasense.com:8889`"
  required: true
  type: string
{% endconfiguration %}

## Supported hardware

All VersaSense gateways with software version >= 1.0.2.10

The {% term integration %} is tested with following peripherals and devices:

- S03 S04: Temperature and Humidity sensor
- S06: Barometric Pressure sensor
- S10: Light sensor
- S17: Object detection sensor
- S19: Buzzer actuator
- Pxx: SmartMesh IP Hub
- M01: SmartMesh Edge Gateway
