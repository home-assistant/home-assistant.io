---
title: NRGkick
description: Integrate the NRGkick Gen2 mobile EV charger using the local REST JSON API.
ha_category:
  - Energy
ha_iot_class: Local Polling
ha_quality_scale: bronze
ha_release: 2026.1
ha_codeowners:
  - "@andijakl"
ha_domain: nrgkick
ha_integration_type: device
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - sensor
related:
  - url: https://www.nrgkick.com/
    title: NRGkick Website
---

The **NRGkick** {% term integration %} allows you to monitor the NRGkick mobile EV charger (Wallbox) by DiniTech with Home Assistant. The wallbox is smart home friendly and allows detailed monitoring with 80+ data points.

The integration connects directly to the device on your local network using the local REST JSON API. No cloud connection is required.

## Supported devices

- NRGkick Gen2 (Smart Cable / Flexible Wallbox)

{% note %}
The NRGkick is available in different variants, including the 16A and 32A models, as well as models with cellular (SIM) and GPS capabilities. All are compatible with this integration.

The NRGkick 16A light model needs the "NRGkick App incl. Bluetooth/Wi-Fi connectivity" as one-time upgrade to use the local API.
{% endnote %}

## Unsupported devices

- NRGkick Gen1 (Bluetooth-only)

## Prerequisites

- Home Assistant and the NRGkick device need to be on the same local network.
- Your NRGkick device needs to have SmartModule firmware 4.0.0.0 or newer.
- The REST JSON API needs to be enabled in the NRGkick app.

To enable the API:

1. Open the NRGkick app from the manufacturer on your smartphone.
2. Go to **Extended** > **Local API**.
3. Enable **JSON API**.
4. Optional: Enable authentication and set a username and password.

{% include integrations/config_flow.md %}

### Discovery and setup

Home Assistant can discover NRGkick devices automatically on your local network.

- If a device is discovered, select the notification, or go to **Settings** > **Devices & services**, and add the discovered **NRGkick** integration.
- If the device is not discovered, add it manually and enter the device host.

If you enabled authentication in the NRGkick app, enter the username and password during setup.

{% configuration_basic %}
Host:
  description: |
    The hostname or IP address of your NRGkick device, for example, `nrgkick.local` or `192.0.2.10`.
Username:
  description: Username for HTTP Basic Authentication (optional).
Password:
  description: Password for HTTP Basic Authentication (optional).
{% endconfiguration_basic %}

## Supported functionality

The integration provides entities to monitor charging. Charging control will be added in a later release.

### Monitoring

The integration creates sensors for common measurements, including:

- Power, energy, voltage, current, and frequency (total and per-phase).
- Charging status, charge rate, relay state, and session metrics.
- Warnings and error codes.
- Temperatures (availability depends on the connected attachment).
- Network details, such as IP address and Wi-Fi signal strength.

Some sensors are only available on NRGkick SIM models (cellular and GPS). These entities are disabled by default and can be enabled in the entity settings.

### Controls

Support for charging control will be added in a later release.

### Key entities

Entity IDs depend on your device name in Home Assistant. The examples below assume the default device name of `NRGkick`.

- `sensor.nrgkick_charging_current`: Charging current.
- `sensor.nrgkick_charged_energy`: Charged energy.
- `sensor.nrgkick_status`: Charging status.

## Data updates

The integration polls the device for updates.

- Polling interval: 30 seconds.
- The polling interval is not user-configurable.

## Known limitations

- Charging control is not yet supported and will be added in a later release.
- Per-phase values for L2 and L3 are only available when the power source and session are using multiple phases.
- Some temperature sensors depend on the connected attachment and may not be available.
- Cellular and GPS sensors are only available on SIM models.

## Troubleshooting

### Can't connect to the device

If setup fails with a connection error:

- Verify the device is reachable on your network.
- Verify the REST JSON API is enabled in the NRGkick app.
- If you use authentication, verify the username and password.

### Entities show unavailable

- Verify the device is powered on and connected.
- Under **Settings** > **Devices & services**, select **NRGkick**, then reload the integration.
- If your network is unstable, verify Wi-Fi coverage.

### Some phase sensors are missing or show as unknown

This is expected when charging with a single-phase power source. Those sensors usually provide values only when a three-phase source is available and active.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
