---
title: Tado
description: Instructions on how to integrate Tado devices with Home Assistant.
ha_category:
  - Binary sensor
  - Climate
  - Hub
  - Presence detection
  - Sensor
  - Switch
  - Water heater
  - Weather
ha_release: 0.41
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@erwindouna'
ha_domain: tado
ha_config_flow: true
ha_homekit: true
ha_platforms:
  - binary_sensor
  - climate
  - diagnostics
  - sensor
  - switch
  - water_heater
ha_dhcp: true
ha_integration_type: hub
---

The **Tado** {% term integration %} platform is used as an interface to the [my.tado.com](https://my.tado.com/) website.

There is currently support for the following device types within Home Assistant:

- Binary sensor - for some additional information of the zones.
- Climate - for every Tado zone.
- Water heater - for water heater zones.
- [Presence detection](#presence-detection)
- Sensor - for some additional information of the zones.
- Weather - for information about the current weather at the location of your Tado home.
- Switch - for controlling child lock on supported devices.

The Tado thermostats are internet connected thermostats. There exists an unofficial API at [my.tado.com](https://my.tado.com/), which is used by their website and now by this component.

It currently supports presenting the current temperature, the setting temperature, and the current operation mode. The operation mode can be set to manual, auto, and off. If no user is at home anymore, all Tado zones show the away-state (Only with Tado assist mode). Manually switching between `home-mode` and `away-mode` is also supported. Manually switching to `auto-mode` is only supported with Tado assist mode. Any Tado climate card can be switched between these presence modes. This changes the setting for the entire home.

{% include integrations/config_flow.md %}

## Connect with Tado

As of **March 21st 2025**, Tado has changed the authentication method. This means a few extra steps need to be followed to log in:

1. When you set up this integration, the integration will set up a "Device Code" and provide a URL to Tado's authentication server.
2. Follow the URL and confirm the "Device Code" (normally it should be copied automatically).
3. Follow the steps to log in and authenticate your account.
4. Once the authentication is completed, go back to Home Assistant. Wait a few seconds for the loading screen to finish. You are now connected with Tado!

{% important %}
As of **January 1st 2026**, Tado is heavily rate limiting the API. The rate limit is based on a daily quota and is different per subscription type. If affected, the Tado integration will fail to authenticate and/or receive new data. This will result in the integration not working. The reset time is 12:00 CET.

Consider using a [custom polling interval](#defining-a-custom-polling-interval) suiting your needs.
{% endimportant %}

### Migrate to new authentication method

By default, the integration detects when re-authentication is needed for the new login method and prompts with a re-authenticate action. Follow the steps described under  [Connect with Tado](#connect-with-tado).

## Unsupported device types

New Tado X devices are not supported by this integration, they have to be used through the [Matter integration](/integrations/matter).

## Presence detection

The Tado device tracker is using the [Tado Smart Thermostat](https://www.tado.com/) and its support for person presence detection based on smartphone location by geofencing.

This tracker uses the Tado API to determine if a mobile device is at home.

By default the Tado device tracker will track all devices known to Tado associated with your home. The Tado app needs to have the `Geolocation` permission enabled for the device to be tracked.

Your device has to be at home at least once before showing up as *home* or *away*.
Polling Tado API for presence information will happen at most once every 30 seconds.

Beware that the Tado (v2) API does not provide GPS location of devices, only a bearing, therefore Home Assistant only uses `home`/`not-home` status.

## Data updates

The integration normally updates every five minutes. For more detailed steps on how to define a custom polling interval, follow the procedure below.

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}

{% include integrations/actions.md %}
