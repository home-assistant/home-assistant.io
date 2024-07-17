---
title: Weheat
description: Instructions on setting up Weheat within Home Assistant.
ha_category:
  - Energy
  - Climate
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '2024.7.3'
ha_dhcp: true
ha_config_flow: true
ha_quality_scale: platinum
ha_codeowners:
  - '@kjell-van-straaten'
  - '@jesperraemaekers'
ha_domain: weheat
ha_platforms:
  - energy
  - climate
  - sensor
ha_integration_type: integration
---

The **Weheat** {% term integration %} allows you to display your [Weheat](https://www.weheat.nl/) devices through Home Assistant.

## Configuration

To add the Weheat Integration, follow these steps:

1. Go to your instance of Home Assistant.
2. Navigate to **Settings**.
3. Go to **Devices & Services**.
4. Click the **+ Add Integration** button.
5. Search for **Weheat**.
6. You will be prompted to input the **Client ID** and **secret**. These are provided by Weheat.
7. Fill in your **username** and **password**.
8. Your device will automatically be added. In case you have more than 1 device, select a device from the dropdown menu.
9. You are all set and ready to go!
