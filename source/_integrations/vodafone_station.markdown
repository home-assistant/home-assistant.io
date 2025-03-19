---
title: Vodafone Station
description: Instructions on how to integrate Vodafone Station routers into Home Assistant.
ha_category:
  - Button
  - Presence detection
  - Sensor
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
  - diagnostics
  - sensor
ha_integration_type: hub
---

The **Vodafone Station** {% term integration %} allows you to control your [Vodafone Station](https://www.vodafone.it/privati/area-supporto/assistenza-dispositivi/vodafone-station.html) based router.

## Supported devices

The integration supports only Sercomm models so far.

### Tested models

This {% term integration %} was tested against the following models from Sercomm:

- Vodafone Power Station (SHG3000)
- Vodafone WiFi 6 Station (RHG3006)
- Vodafone Gigabox (SHG3000) - supplied by [Vodafone Ireland](https://deviceguides.vodafone.ie/vodafone/gigabox-windows-10/)

{% include integrations/config_flow.md %}

{% configuration_basic %}
  host:
    description: The IP address of the Vodafone Station router.
  username:
    description: The username of the Vodafone Station router.
  password:
    description: The password of the Vodafone Station router.
{% endconfiguration_basic %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
  consider home:
    description: Number of seconds that must elapse before considering a disconnected device "not at home".
{% endconfiguration_basic %}

## Supported functionality

There is support for the following platform types within Home Assistant:

- **Device tracker** - presence detection by looking at connected devices.
- **Sensor** - external IP address, uptime, firmware, resources and network monitors.
- **Button** - restart router, dsl/fiber/internet key connections.

## Data updates

This integration {% term polling polls %} data from the device every 30 seconds by default.

## Additional info

### Device tracker

**Note**: If you don't want to automatically track newly detected devices, disable the {% term integration %} system option `Enable new added entities`.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
