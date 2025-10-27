---
title: OpenEnergyMonitor WiFi Thermostat
description: Instructions on how to integrate an OpenEnergyMonitor thermostat with Home Assistant.
ha_category:
  - Climate
ha_release: 0.39
ha_iot_class: Local Polling
ha_domain: oem
ha_platforms:
  - climate
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

This {% term integration %} supports the ESP8266 based "WiFi MQTT Relay / Thermostat" sold by [OpenEnergyMonitor](https://web.archive.org/web/20220426080315/https://shop.openenergymonitor.com/wifi-mqtt-relay-thermostat/) (archived page, no longer for sale). The underlying [library](https://oemthermostat.readthedocs.io/) only supports this single relay variant of the [original device](https://harizanov.com/2014/12/wifi-iot-3-channel-relay-board-with-mqtt-and-http-api-using-esp8266/).

This platform controls the setpoint of the thermostat in its "manual" mode.

To set it up, add the following information to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
climate oem:
  - platform: oem
    host: 192.168.0.100
```

{% configuration %}
host:
  description: The IP address or hostname of the thermostat.
  required: true
  type: string
port:
  description: The port for the web interface.
  required: false
  default: 80
  type: integer
name:
  description: The name to use for the frontend.
  required: false
  default: Thermostat
  type: string
username:
  description: Username for the web interface if set.
  required: inclusive
  type: string
password:
  description: Password for the web interface if set.
  required: inclusive
  type: string
{% endconfiguration %}
