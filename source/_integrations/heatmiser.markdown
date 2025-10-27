---
title: Heatmiser
description: Instructions on how to integrate Heatmiser thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: '0.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@andylockran'
ha_domain: heatmiser
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: legacy
---

The `heatmiser` climate platform lets you control [Heatmiser DT/DT-E/PRT/PRT-E](https://www.heatmisershop.co.uk/room-thermostats/) thermostats from Heatmiser. The module itself is currently set up to work over a RS232 -> RS485 converter, therefore it connects over IP.

Further work would be required to get this setup to connect over Wi-Fi, but the HeatmiserV3 Python module being used is a full implementation of the V3 protocol.

To set it up, add the following information to your {% term "`configuration.yaml`" %} file:

```yaml
climate:
  - platform: heatmiser
    host: YOUR_IP_ADDRESS
    port: YOUR_PORT
    tstats:
      - id: THERMOSTAT_ID
        name: THERMOSTAT_NAME
```

A single interface can handle up to 32 connected devices.

{% configuration %}
host:
  description: The IP address of your interface.
  required: true
  type: string
port:
  description: The port that the interface is listening on.
  required: true
  type: string
tstats:
  description: A list of thermostats activated on the gateway.
  required: true
  type: list
  keys:
    id:
      description: The ID of the thermostat as configured on the device itself.
      required: true
      type: string
    name:
      description: A friendly name for the thermostat.
      required: true
      type: string
{% endconfiguration %}
