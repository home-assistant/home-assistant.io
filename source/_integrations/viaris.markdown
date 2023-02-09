---
title: Viaris EV charger
description: Instructions on how to integrate Viaris EV charger sensors to Home Assistant
ha_category:
  - Car
ha_release: 2023.2
ha_iot_class: local push
ha_domain: viaris
ha_platforms:
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@HGC72'
ha_integration_type: integration
---

The viaris integration allows to be informed about the charging process in Viaris UNI/COMBIPLUS EV charger.

{% include integrations/config_flow.md %}

## Sensors

The integration adds the following sensors:

- Active and reactive Energy per connector
- Active and reactive Power per connector
- Home Power
- EV Power
- Total power
- Total current
- Solar and battery power
- State of Charge
- Available analyzers
- Configuration options
- Power limits

## Configuration

To add viaris EV charger integration go to **Settings** -> **Devices & Services** and find the integration in the list.

{% configuration_basic %}
Serial number:
  description: "charger serial number"
{% endconfiguration_basic %}

The viaris EV charger uses MQTT integration where it is necessary to include the broker customer credentials, otherwise the integration does not work properly.
After that you must restart Home Assistant for the changes to take effect.
