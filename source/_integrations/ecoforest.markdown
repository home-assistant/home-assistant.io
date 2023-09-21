---
title: Ecoforest
description: Instructions on how to integrate Ecoforest fireplaces with Home Assistant.
ha_category:
  - Climate
ha_release: 2023.10
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@pjanuario'
ha_domain: ecoforest
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Ecoforest integration allows monitoring and control of local [Ecoforest](https://ecoforest.com) fireplaces in Home Assistant. These fireplaces are manufactured in Spain.

There is currently support for the following device platforms within Home Assistant:

- [Sensor](#sensor)

{% include integrations/config_flow.md %}

<div class='note'>
Devices must first be connected to Wi-Fi or LAN using the app or website provided by the device manufacturer. It is not possible to connect devices to Wi-Fi using this integration.
</div>

### Credentials

To configure the Ecoforest integration you will need to enter your Ecoforest credentials which are the same ones you would use with the manufacturer app. The image below shows how to obtain the credentials:

- Username: use the serial number of the device as identified by 1.
- Password: use the first 8 characters of the wifi password as identified by 4.

![Ecoforest Credentials](/images/integrations/ecoforest/credentials.png)


## Supported models

Any Ecoforest device working with [Ecoforest Home](https://ecoforesthome.com/) should be supported, this integration is confirmed to support:

- Ecoforest Cordoba Glass (using firmware version `30Abr19_v2z`)

## Sensor

The Ecoforest integration exposes multiple sensors to monitor various features:

- temperature a sensor for the current ambient temperature
- cpu_temperature a sensor for the current cpu temperature
- gas_temperature a sensor for the current gas temperature
- ntc_temperature a sensor for the current ntc probe temperature
- status a sensor for the current status of the device
- alarm a sensor for the current alarm of the device
