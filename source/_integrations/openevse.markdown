---
title: OpenEVSE
description: Instructions on how to integrate OpenEVSE charging stations with Home Assistant.
ha_category:
  - Car
  - Energy
  - Sensor
ha_release: 0.38
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@c00w'
  - '@firstof9'
ha_domain: openevse
ha_zeroconf: true
ha_platforms:
  - number
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **OpenEVSE** {% term integration %} allows you to monitor your [OpenEVSE](https://openevse.com/) electric vehicle charging station equipped with ESP8266/ESP32-based Wi-Fi connectivity.

## Prerequisites

- The OpenEVSE charger is on the same network as Home Assistant.

{% include integrations/config_flow.md %}

## Configuration


## Sensors

The integration provides the following sensor entities:

- **Charging status**: Current operational state of the charger (for example: **Connected**, **Charging**, **Not Connected**)                                                                          
- **Charge time elapsed** (seconds): Duration of the current charging session                                                                                                             
- **Usage this session** (Wh): Energy consumed during the current charging session                                                                                                        
- **Total energy usage** (Wh): Cumulative energy consumption of the device                                                                                                                
- **Ambient temperature** (°C): Environmental temperature reading from the charger                                                                                                        
- **IR temperature** (°C): Infrared sensor temperature reading (disabled by default)                                                                                                      
- **RTC temperature** (°C): Real-time clock sensor temperature reading (disabled by default)  

{% note %}
The IR and RTC temperature sensors are disabled by default. To enable them, go to the device page, click on the entity, and toggle the "Enabled" switch.
{% endnote %}

## Authentication

If you have configured HTTP authentication on your OpenEVSE charger (recommended for security), the integration will prompt you to enter your credentials during setup. These credentials are stored securely in Home Assistant's configuration.


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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
