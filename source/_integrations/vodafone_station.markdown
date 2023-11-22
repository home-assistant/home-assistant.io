---
title: Vodafone Station
description: Instructions on how to integrate Vodafone Station routers into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 2023.9
ha_domain: vodafone_station
ha_config_flow: true
ha_codeowners:
  - '@paoloantinori'
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - button
  - device_tracker
  - sensor
ha_integration_type: integration
---

The Vodafone Station integration allows you to control your [Vodafone Station](https://www.vodafone.it/privati/area-supporto/assistenza-dispositivi/vodafone-station.html) based router.

<div class="note">
The integration supports only Sercomm models so far.
</div>

There is support for the following platform types within Home Assistant:

- **Device tracker** - presence detection by looking at connected devices.
- **Sensor** - external IP address, uptime, firmware, resources and network monitors.
- **Button** - restart router, dsl/fiber/internet key connections.
{% include integrations/config_flow.md %}

## Integration options

It is possible to change some behaviors through the integration options.
To change the settings, go to {% my integrations title="**Settings** > **Devices & Services**" %}. On the **Vodafone Station** integration, select the cogwheel. Then select **Configure**.

- **Consider home**: Number of seconds that must elapse before considering a disconnected device "not at home".

## Additional info

### Device Tracker

**Note**: If you don't want to automatically track newly detected devices, disable the integration system option `Enable new added entities`.

### Tested models

This integration was tested against the following models from Sercomm:

- Vodafone Power Station (SHG3000)
- Vodafone WiFi 6 Station (RHG3006)
