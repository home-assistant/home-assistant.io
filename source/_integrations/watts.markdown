---
title: Watts Vision +
description: Instructions on how to set up Watts Vision + smart heating system in Home Assistant.
ha_category:
  - Climate
ha_release: '2026.1'
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@theobld-ww'
  - '@devender-verma-ww'
  - '@ssi-spyro'
ha_domain: watts
ha_config_flow: true
ha_platforms:
  - climate
ha_integration_type: integration
ha_quality_scale: bronze
---

The **Watts Vision +** {% term integration %} enables seamless control of your heating zones directly from Home Assistant.

[Watts Vision +](https://www.watts.eu/en/products/eu/smart-home-and-controls/vision-wireless) is a smart heating management system that allows remote control of individual home heating zones. It offers precise room temperature regulation, programmable schedules, and energy consumption monitoring through connected thermostats and actuators.

This integration uses the official Watts Vision + API to provide control over your heating zones. You can adjust temperatures, switch between heating modes, and monitor the current status of each thermostat in your home.

## Prerequisites

Before setting up the integration, make sure you have:

1. A Watts Vision + account created via the Vision + mobile app.
2. At least one Watts Vision + gateway connected to the internet and linked to your account.
3. At least one sub-device paired with your gateway.

{% note %}
The integration uses OAuth2 authentication. You will be redirected to the Watts Vision + login page to authenticate with your account credentials. Make sure you have set up a Watts Vision + account through their mobile app before configuring this integration.
{% endnote %}

{% include integrations/config_flow.md %}

## Supported devices

The integration supports the following Watts Vision + devices:

### Gateway

- BT-CT03-RF
- BT-ST03-RF

### Sub-devices

- BT-DP02-RF
- BT-D03-RF
- BT-A02-RF
- BT-A03-RF
- BT-TH02-RF
- PR03-RF
- BT-WR03

## Supported functionality

The integration provides the following Home Assistant entities:

### Climate entities

The integration creates a climate entity for each thermostat device in your Watts Vision + system. Each climate entity provides:

- **Current temperature**: Current ambient room temperature
- **Target temperature**: Set the desired temperature for the room
- **HVAC modes**:
  - **Heat**: Manual comfort or eco mode
  - **Off**: Turn off heating for the zone
  - **Auto**: Follow programmed schedule
- **Temperature range**: The min/max temperature limits configured for the device

#### Climate entity attributes

Each climate entity exposes additional attributes:

- **Thermostat mode**: Current operating mode of the thermostat
- **Device type**: Type of thermostat device
- **Room name**: Name of the room as configured in the Watts Vision + app
- **Temperature unit**: Temperature unit (°C or °F)
- **Available thermostat modes**: List of supported modes for the device

### Shared functionality

All Watts Vision + devices share common functionality:

- **Device information**: Manufacturer (Watts), model information, and device identification
- **Availability**: Entities show as unavailable when devices are offline or communication fails

## Data updates

The Watts Vision + integration {% term polling polls %} data from the cloud API every 30 seconds. After sending commands (temperature changes, mode changes, or switch operations), the integration waits 7 seconds before refreshing to allow the device to process the change.

## Known limitations

Support for switch devices is not yet available and may be added in a future release.

## Use cases

Watts Vision+ supports a wide range of heating systems, including underfloor heating and cooling. By integrating with Home Assistant, the Watts Vision ecosystem becomes fully interoperable with other IoT devices from any brand in your connected home, unlocking powerful automation possibilities.

This integration enables you to:

- **Create weather-responsive heating schedules**: Build advanced automations that adjust heating based on outdoor temperature, weather forecasts, cloud coverage, and other meteorological data for optimal comfort and energy efficiency.
- **Integrate with your entire smart home ecosystem**: Coordinate your Watts heating system with lighting, blinds, air quality sensors, and other smart devices
- **Optimize energy consumption intelligently**: Automatically adjust heating based on real-time electricity rates, solar panel production, or time-of-use tariffs to minimize costs while maintaining comfort.
- **Implement presence-based heating control**: Combine with occupancy sensors, door/window contacts, or presence detection to heat only occupied rooms and automatically reduce temperatures when rooms are empty or windows are open.
- **Design sophisticated heating programs**: Go beyond basic schedules by creating personalized heating programs that adapt to your lifestyle, seasonal changes, and specific room requirements.
- **Monitor and analyze heating patterns**: Track energy consumption, temperature trends, and system performance over time to identify optimization opportunities.

## Example automations

{% details "Lower temperature when nobody is home" %}

{% raw %}

```yaml
alias: "Eco mode when away"
description: "Set all thermostats to eco mode when house is empty"
triggers:
  - platform: state
    entity_id: group.family
    from: "home"
    to: "not_home"
    for:
      minutes: 10
actions:
  - action: climate.set_hvac_mode
    target:
      entity_id: 
        - climate.living_room
        - climate.bedroom
        - climate.office
    data:
      hvac_mode: "heat"
  - action: climate.set_temperature
    target:
      entity_id: 
        - climate.living_room
        - climate.bedroom
        - climate.office
    data:
      temperature: 18
```

{% endraw %}

{% enddetails %}

## Troubleshooting

### Devices appear as unavailable

#### Symptom: Climate entities show as "Unavailable"

When viewing your Watts Vision + climate entities, they show as "Unavailable" in Home Assistant.

##### Description

This indicates that Home Assistant cannot communicate with your devices through the Watts Vision + cloud API. This is typically caused by connectivity issues between your gateway and the Watts cloud service.

##### Resolution

To resolve this issue, try the following steps:

1. Check the gateway status in the Watts Vision + app:
   - Open the Watts Vision + mobile app.
   - Verify that the gateway does not appear as offline.
   - If the gateway shows as offline, this confirms the connectivity issue.
2. Check the WiFi connection and pairing status of your Watts Vision + gateway:
   - In the Watts Vision + app, go to the gateway settings.
   - Navigate to the WiFi settings.
   - Verify that the status shows **2/2** and is displayed in **green**.
   - If the status is not 2/2 or not green, the gateway is not properly connected and paired to the cloud.
3. Restart the gateway:
   - Unplug the gateway from power.
   - Wait 10 seconds.
   - Plug it back in and wait for it to reconnect.
4. Reload the integration in Home Assistant:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Find the Watts Vision + integration.
   - Select the three-dot menu and choose **Reload**.

### Newly added or removed devices not reflecting in Home Assistant

#### Symptom: Added or removed devices don't appear immediately

After adding a new device through the Watts Vision + app or removing an existing device, the change is not immediately visible in Home Assistant.

##### Description

The Home Assistant integration pools new devices every 15 minutes, so it can takes up to 15 minutes to see the new devices.

##### Resolution

Device additions or removals can take up to **15 minutes** to be reflected in Home Assistant. To ensure the change is processed:

1. Wait for up to 15 minutes after making the change in the Watts Vision + app.
2. If the device still doesn't appear or disappear after 15 minutes, try reloading the integration:
   - Go to {% my integrations title="**Settings** > **Devices & services**" %}.
   - Find the Watts Vision + integration.
   - Select the three-dot menu and choose **Reload**.

## Removing the integration

This integration follows standard integration removal.
{% include integrations/remove_device_service.md %}
