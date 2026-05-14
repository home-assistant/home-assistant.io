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
ha_domain: guntamatic_sensor
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

The **Guntamatic** {% term integration %} allows you to monitor your [Guntamatic](https://www.guntamatic.com) wood or pellet heater from Home Assistant.

## Supported devices

This integration has been tested with the Guntamatic BMK 20 kW running firmware 32a. It should work with other Guntamatic heaters that support the same web interface: `http://<ip>/daqdata.cgi`

## Prerequisites

Your Guntamatic heater must be connected to your local network and accessible via its IP address or hostname.
To find your heater's network settings, go to **Customer Level** > **Detailed Display**, then scroll down to **Network**.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The IP address or hostname of your Guntamatic heater.
{% endconfiguration_basic %}

## Data updates

The integration {% term polling polls %} the Guntamatic heater every 30 seconds. The heater does not support push updates.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Sensors

The integration creates a sensor for each data point provided by the heater. The available sensors depend on the heater model and firmware version. Example sensors include boiler temperature, outside temperature, buffer load, and heating circuit programs.


The following sensors are available for a Guntamatic BMK 20 heater:

| Sensor | Value | Unit |
|--------|-------|------|
| Running | Service Ign. | |
| Boiler temperature | 14.09 | °C |
| Outside Temp. | 16.15 | °C |
| Buffer load. | 22 | % |
| Buffer Top | 44.56 | °C |
| Buffer Mid | 43.48 | °C |
| Buffer Btm | 34.01 | °C |
| Boil.shunt pump | 0 | % |
| Suction fun | 0.00 | % |
| Primary air | 0.00 | % |
| Seconday air | 0.00 | % |
| CO2 Content | 18.05 | % |
| DHW 0 | 44.50 | °C |
| DHW Pump 0 | 0 | % |
| DHW 1 | -20.00 | °C |
| DHW Pump 1 | 0 | % |
| DHW 2 | -20.00 | °C |
| DHW Pump 2 | 0 | % |
| Heating circulation pump 0 | OFF | |
| Room Temp:HC 0 | 60.00 | °C |
| Room Temp:HC 1 | 24.68 | °C |
| Flow is 1 | 18.61 | °C |
| Heating circulation pump 1 | OFF | |
| Room Temp:HC 2 | 21.77 | °C |
| Flow is 2 | 17.72 | °C |
| Heating circulation pump 2 | OFF | |
| Heating circulation pump 3 | OFF | |
| Room Temp:HC 3 | -9.00 | °C |
| Room Temp:HC 4 | -9.00 | °C |
| Flow is 4 | -20.00 | °C |
| Heating circulation pump 4 | OFF | |
| Room Temp:HC 5 | -9.00 | °C |
| Flow is 5 | 44.00 | °C |
| Heating circulation pump 5 | OFF | |
| Heating circulation pump 6 | OFF | |
| Room Temp:HC 6 | -9.00 | °C |
| Room Temp:HC 7 | -9.00 | °C |
| Flow is 7 | -20.00 | °C |
| Heating circulation pump 7 | OFF | |
| Room Temp:HC 8 | -9.00 | °C |
| Flow is 8 | 44.00 | °C |
| Heating circulation pump 8 | OFF | |
| Program | HEAT | |
| Program HC0 | OFF | |
| Program HC1 | OFF | |
| Program HC2 | HEAT | |
| Program HC3 | OFF | |
| Program HC4 | OFF | |
| Program HC5 | OFF | |
| Program HC6 | OFF | |
| Program HC7 | OFF | |
| Program HC8 | OFF | |
| Interuption 1 | | |
| Interuption 2 | | |
| Serial | 950000 | |
| Version | 32a | |
| Operat. time | 1122 | h |
| Service Hrs | 1876 | d |
| extra-WW. 1 | -20.00 | °C |
| extra-WW. 2 | -20.00 | °C |
| B extra-WW. 0 | OFF | |
| B extra-WW. 1 | OFF | |
| B extra-WW. 2 | OFF | |
| Flow is 0 | 44.00 | °C |
| Flow is 3 | 44.00 | °C |
| Flow is 6 | 44.00 | °C |
| Buffer Top 0 | -20.00 | °C |
| Buffer Btm 0 | -20.00 | °C |
| Buffer Top 1 | -20.00 | °C |
| Buffer Btm 1 | -20.00 | °C |
| Buffer Top 2 | -20.00 | °C |
| Buffer Btm 2 | -20.00 | °C |
| Auxiliary pump 0 | OFF | |
| Auxiliary pump 1 | OFF | |
| Auxiliary pump 2 | OFF | |

> Note: Sensors with a value of `-20.00 °C` or `-9.00 °C` are typically not connected.
