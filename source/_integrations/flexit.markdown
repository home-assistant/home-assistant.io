---
title: Flexit
description: Instructions on how to integrate Flexit A/C unit into Home Assistant.
ha_category:
  - Climate
ha_release: 0.47
ha_iot_class: Local Polling
ha_domain: flexit
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

Integrates [Flexit](https://www.flexit.no/en/) Air Conditioning unit into Home Assistant.

Requires an CI66 Modbus Adapter [CI66](https://www.flexit.no/en/products/air_handling_units_700-5000_m-h/accessories_ahu/modbusadapter_ci66/modbus_adapter_ci66_k2-c2-uni/)

To enable this integration, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
climate:
  - platform: flexit
    slave: 21
```

{% configuration %}
slave:
  description: The slave ID of the modbus adapter, set using DIP-switches.
  required: true
  type: integer
name:
  description: Displayed name of the A/C unit.
  required: false
  type: string
hub:
  description: The name of the hub where this slave is located.
  required: false
  default: default
  type: string
{% endconfiguration %}

{% important %}
This integration requires the [Modbus](/integrations/modbus/) integration to be set up to work.
{% endimportant %}

Full configuration example including modbus setup shown below:

DIP-switch settings on the CI66:
1=ON, 2=ON, 3=OFF, 4=ON, 5=OFF, 6=ON, 7=ON, 8=ON

```yaml
# Full example configuration.yaml entry
modbus:
  type: serial
  method: rtu
  port: /dev/ttyUSB0
  baudrate: 56000
  stopbits: 1
  bytesize: 8
  parity: E

climate:
  - platform: flexit
    name: Main A/C
    slave: 21
```
