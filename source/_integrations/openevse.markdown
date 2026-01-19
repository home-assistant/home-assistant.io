---
title: OpenEVSE
description: Instructions on how to integrate OpenEVSE charging stations with Home Assistant.
ha_category:
  - Car
  - Energy
  - Sensor
ha_release: 0.38
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@c00w'
  - '@firstof9'
ha_domain: openevse
ha_zeroconf: true
ha_platforms:
  - sensor
ha_integration_type: device
---

The OpenEVSE integration allows you to monitor your [OpenEVSE](https://openevse.com/) electric vehicle charging station equipped with ESP8266/ESP32-based Wi-Fi connectivity.

{% include integrations/config_flow.md %}

## Configuration

### Automatic discovery

If your OpenEVSE charger is on the same network as Home Assistant, it will be automatically discovered via Zeroconf/mDNS. You will receive a notification to set up the discovered device.

### Manual configuration

1. Go to **Settings** > **Devices & Services**.
2. Click **+ Add Integration** in the bottom right corner.
3. Search for and select **OpenEVSE**.
4. Enter the IP address or hostname of your OpenEVSE charger.
5. If your charger requires authentication, you will be prompted to enter your username and password.

## Sensors

The integration provides the following sensor entities:

| Sensor | Description | Unit |
|--------|-------------|------|
| Charging status | Current operational state of the charger (e.g., "Connected", "Charging", "Not Connected") | — |
| Charge time elapsed | Duration of the current charging session | seconds |
| Usage this session | Energy consumed during the current charging session | Wh |
| Total energy usage | Cumulative energy consumption of the device | Wh |
| Ambient temperature | Environmental temperature reading from the charger | °C |
| IR temperature | Infrared sensor temperature reading (disabled by default) | °C |
| RTC temperature | Real-time clock sensor temperature reading (disabled by default) | °C |

{% note %}
The IR and RTC temperature sensors are disabled by default. To enable them, go to the device page, click on the entity, and toggle the "Enabled" switch.
{% endnote %}

## Authentication

If you have configured HTTP authentication on your OpenEVSE charger (recommended for security), the integration will prompt you to enter your credentials during setup. These credentials are stored securely in Home Assistant's configuration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Migrating from YAML configuration

{% warning %}
YAML configuration for OpenEVSE is deprecated and will be removed in a future release.
{% endwarning %}

If you previously configured OpenEVSE using YAML in your `configuration.yaml` file, your configuration has been automatically imported into the UI. To complete the migration:

1. Remove the `openevse` or `sensor` platform configuration for OpenEVSE from your `configuration.yaml` file.
2. Restart Home Assistant.

The integration will continue to work using the imported UI configuration.

## Troubleshooting

### Cannot connect to host

- Verify that the IP address or hostname is correct.
- Ensure the OpenEVSE charger is powered on and connected to your network.
- Check that Home Assistant can reach the charger (they should be on the same network or have proper routing configured).

### Authentication failed

- Double-check your username and password.
- Verify that HTTP authentication is enabled on your OpenEVSE charger if you're being prompted for credentials.
- Try accessing the OpenEVSE web interface directly in a browser to confirm your credentials work.
