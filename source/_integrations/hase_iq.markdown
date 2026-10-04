---
title: Hase iQ
description: Instructions on how to read the state of a Hase iQ wood stove in Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 2026.11
ha_codeowners:
  - '@bbayszczak'
ha_config_flow: true
ha_domain: hase_iq
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Hase iQ** {% term integration %} lets you follow a HASE wood stove with the iQ combustion monitoring from Home Assistant: the combustion phase, the firebox temperature, the heat-up progress, and the combustion performance.

Everything stays in your home: Home Assistant reads the stove directly over your local network, without the vendor app, an account, or any cloud service. You can use these readings in your dashboards, or in automations, for example to get a notification when it's time to add wood.

The integration is read-only. It can't light, adjust, or turn off the stove.

This is an independent integration. It isn't affiliated with, endorsed by, or supported by HASE.

## Supported devices

The integration supports the Hase iQ stoves that you follow with the **flamemonitor** app.

It has been tested with a stove whose web interface reports version 1.4.

The newer Hase iQ stoves, which you follow with the **HASE iQ** app, haven't been tested and might not work. Their protocol is unknown.

## Prerequisites

1. Make sure the stove is connected to your local network, and that the **flamemonitor** app can see it.
2. Find the IP address of the stove, for example in your router.
3. Give the stove a fixed IP address in your router. The integration doesn't discover the stove, so if its IP address changes, Home Assistant can no longer reach it.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The IP address or hostname of your stove. For example, `192.168.1.100`. The stove is checked before the setup completes."
{% endconfiguration_basic %}

## Supported functionality

The integration adds a device for the stove, with the following sensors.

### Sensors

- **Phase**
  - **Description**: The combustion phase of the stove.
  - **Values**: Idle (no fire), Heating up, Nominal (the stove has reached its nominal temperature), Needs wood, and Burning out (the fire is dying down, don't add wood).
- **Temperature**
  - **Description**: The temperature in the firebox, in °C.
  - **Remarks**: Only reported while the stove is heating up. Unknown in the other phases.
- **Heat-up**
  - **Description**: How far the stove is through its heat-up, in percent.
  - **Remarks**: Only reported while the stove is heating up. Unknown in the other phases.
- **Performance**
  - **Description**: The combustion performance index reported by the stove, in percent.
  - **Remarks**: Only reported once the stove has reached its nominal temperature. Unknown in the other phases.

## Data updates

The integration {% term polling polls %} the stove every 30 seconds.

## Known limitations

- The readings are for information only. They aren't a safety device, and don't replace a smoke detector, a carbon monoxide detector, or the regular sweeping of your chimney.
- The stove's network interface has no authentication. Don't expose it to the internet.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
