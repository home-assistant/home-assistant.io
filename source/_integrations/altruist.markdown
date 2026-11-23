---
description: Instructions on how to set up Altruist Sensors in Home Assistant.
ha_release: 2025.7
ha_domain: altruist
---

The **Altruist** {% term integration %} connects Home Assistant to [Air Quality Sensor “Altruist“](https://robonomics.network/devices/altruist/) — a device designed for decentralized environmental monitoring. It captures noise, dust, and temperature data from the sensor over HTTP, making it available as locally usable entities within Home Assistant.

{% include integrations/config_flow.md %}

{% configuration_basic %}
IP Address:
  description: "The local IP address for your Altruist device."
{% endconfiguration_basic %}

## Available sensors

The integration will fetch data from each device. The following sensors are supported:

- Humidity
- Temperature
- Atmospheric pressure
- PM2.5 density
- PM10 density
- Ambient noise level
- Carbon dioxide (CO2) level
- Total volatile organic compounds (TVOC)
- Ambient radiation level
- Wi-Fi signal strength

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
