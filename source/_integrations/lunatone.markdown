---
title: Lunatone
description: Instructions on how to integrate Lunatone REST API devices with Home Assistant.
ha_category:
  - Hub
  - Light
  - Sensor
ha_release: 2025.11
ha_iot_class: Local Polling
ha_codeowners:
  - '@MoonDevLT'
ha_domain: lunatone
ha_config_flow: true
ha_platforms:
  - diagnostics
  - light
  - sensor
ha_integration_type: hub
ha_zeroconf: true
ha_quality_scale: silver
---

The **Lunatone** {% term integration %} is used to integrate with the devices of [Lunatone](https://www.lunatone.com) that offer a REST API. This allows you to use lights and sensors in Home Assistant that are connected to the DALI bus via your device.

## Supported devices

Right now the following devices are supported:

- [DALI-2 IoT Gateway](https://www.lunatone.com/produkt/dali-2-iot-gateway/)
- [DALI-2 IoT4 Gateway](https://www.lunatone.com/produkt/dali-2-iot4-gateway/)
- [DALI-2 Display 4''](https://www.lunatone.com/produkt/dali-2-display-4/)
- [DALI-2 Display 7''](https://www.lunatone.com/produkt/dali-2-display-7/)

{% important %}
Home Assistant automatic discovery requires device firmware version 1.17.1 or later. Manual setup is available with device firmware version 1.14.1 or later.
{% endimportant %}

## Prerequisites

Before setting up the Lunatone integration, ensure you have:

1. Your gateway device powered and connected to your network.
2. The IP address or hostname of your device.

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
    description: "The URL to your gateway device. For example: `http://10.0.0.131`"
{% endconfiguration_basic %}

## Supported functionality

### Entities

The Lunatone integration provides the following entities.

#### Binary sensors

- **DALI scan**
  - **Description**: Shows if a DALI scan is running or not
  - **Available for devices**: All

#### Lights

- **Brightness**
  - **Description**: Control the brightness of the light
  - **Available for devices**: All

- **Color Temperature**
  - **Description**: Control the color temperature of the light
  - **Available for devices**: Devices with firmware version 1.17.0 or later

- **RGB Color**
  - **Description**: Control the RGB color of the light
  - **Available for devices**: Devices with firmware version 1.17.0 or later

- **RGBW Color**
  - **Description**: Control the RGBW color of the light
  - **Available for devices**: Devices with firmware version 1.17.0 or later

#### Sensors

The following sensor entities are available from your Lunatone gateway and connected DALI devices..

- **Air quality index**
  - **Description**: Shows the overall air quality index reported by the connected sensor device.
  - **Available for devices**: All

- **Carbon dioxide**
  - **Description**: Shows the measured carbon dioxide concentration.
  - **Available for devices**: All

- **Humidity**
  - **Description**: Shows the measured relative humidity.
  - **Available for devices**: All

- **Illuminance**
  - **Description**: Shows the measured ambient light level.
  - **Available for devices**: All

- **Pressure**
  - **Description**: Shows the measured air pressure.
  - **Available for devices**: All

- **Temperature**
  - **Description**: Shows the measured temperature.
  - **Available for devices**: All

- **Volatile organic compounds**
  - **Description**: Shows the measured level of volatile organic compounds.
  - **Available for devices**: All

## Removing the integration

This integration follows standard integration removal. No extra steps are
required.

{% include integrations/remove_device_service.md %}
