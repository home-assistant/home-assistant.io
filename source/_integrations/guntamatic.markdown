---
title: Guntamatic
description: Guntamatic wood/pellet heater integration.
ha_category:
  - Sensor
ha_iot_class: Local Polling
ha_release: 2026.6
ha_codeowners:
  - '@JensTimmerman'
ha_config_flow: true
ha_domain: guntamatic
ha_platforms:
  - sensor
ha_dhcp: true
ha_integration_type: device
ha_quality_scale: bronze
---

The Guntamatic integration allows you to monitor your [Guntamatic](https://www.guntamatic.com) wood or pellet heater from Home Assistant.

## Supported devices

This integration has been tested with the Guntamatic BMK 20 kW running firmware 32a. It should work with other Guntamatic heaters that support the same web interface. (http://`<ip>`/daqdata.cgi)

## Prerequisites

Your Guntamatic heater must be connected to your local network and accessible via its IP address or hostname.
Check the screen on the Guntamatic: Customer Level, Detailed Display, scroll down to network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or resolvable hostname of your Guntamatic heater. For example, `192.168.1.42` or `kessel001.internal`
{% endconfiguration_basic %}

## Data updates

The integration polls the Guntamatic heater every 30 seconds. The heater does not support push updates.

## Sensors

The integration creates a sensor for each data point provided by the heater. The available sensors depend on the heater model and firmware version. Example sensors include boiler temperature, outside temperature, buffer load, and heating circuit programs. Note that sensors with a value of `-20.00 °C` or `-9.00 °C` are not returned.


The following sensors are available for a Guntamatic BMK 20 heater:

- **Boiler temperature**:
  - **Description**: Current temperature of the hot water in the boiler itself
  - **Example value**: 14.09
  - **Unit**: °C

- **Buffer load**:
  - **Description**: Current load percentage of the thermal buffer tank
  - **Example value**: 22

- **Buffer bottom temperature**:
  - **Description**: Temperature measured at the bottom of the buffer tank
  - **Example value**: 34.01
  - **Unit**: °C

- **Buffer center temperature**:
  - **Description**: Temperature measured in the middle of the buffer tank
  - **Example value**: 43.48
  - **Unit**: °C
- **Buffer top temperature**:
  - **Description**: Temperature measured at the top of the buffer tank
  - **Example value**: 44.56
  - **Unit**: °C

- **Domestic hot water circuit 0 temperature**:
  - **Description**: Temperature of domestic hot water circuit 0
  - **Example value**: 44.50
  - **Unit**: °C

- **Outdoor temperature**:
  - **Description**: Outside ambient temperature measured by the external sensor
  - **Example value**: 16.15
  - **Unit**: °C

- **Program**:
  - **Description**: Current global operating program mode
  - **Possible values**:
    - Away mode
    - Domestic hot water
    - Domestic hot water boost
    - Heat
    - Off
    - Setback mode
    - Timer
  - **Unit**: None

- **Room 0 temperature**:
  - **Description**: Room temperature sensor reading for heating circuit 0
  - **Example value**: 60.00
  - **Unit**: °C

- **Room 1 temperature**:
  - **Description**: Room temperature sensor reading for heating circuit 1
  - **Example value**: 24.68
  - **Unit**: °C

- **Room 2 temperature**:
  - **Description**: Room temperature sensor reading for heating circuit 2
  - **Example value**: 21.77
  - **Unit**: °C

- **Status**:
  - **Description**: Current operating state of the system
  - **Example value**: Service Ign.
  - **Unit**: None


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

