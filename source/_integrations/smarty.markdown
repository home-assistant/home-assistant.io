---
title: Salda Smarty
description: Instructions on how to integrate Salda Smarty 2X/3X/4X P/V ventilation systems into Home Assistant.
ha_category:
  - Fan
  - Hub
  - Sensor
ha_iot_class: Local Polling
ha_release: 0.95
ha_codeowners:
  - '@z0mbieprocess'
ha_domain: smarty
ha_platforms:
  - binary_sensor
  - fan
  - sensor
ha_integration_type: integration
---

The `smarty` integration lets you control Salda [Smarty](http://www.salda.lt/en/products/category/compact-counter-flow-units) ventilation units from Home Assistant. You need a [MB-GATEWAY](http://www.salda.lt/en/products/item/5637227077) or something similar to connect to your local network.

There is currently support for the following device types within Home Assistant:

- Fan
- Sensor

The integration has a fan platform to view and control the ventilation speed, and a sensors platform to read:

- Outdoor air temperature
- Extract air temperature
- Supply air temperature
- Extract fan speed rpm
- Supply fan speed rpm
- Alarm
- Warning
- Filter Change Timer

## Configuration

To set it up, add the following information to your `configuration.yaml` file:

```yaml
smarty:
  host: 192.168.0.10
```

{% configuration %}
host:
  description: The IP Address of the unit.
  required: true
  type: string
name:
  description: The name of this device as you want to see it in Home Assistant.
  required: false
  default: Smarty
  type: string
{% endconfiguration %}
