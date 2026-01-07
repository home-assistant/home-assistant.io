---
title: YoLink Local
description: Instructions on how to integrate YoLink Devices into Home Assistant (Local).
ha_category:
  - Binary sensor
ha_release: 2026.1
ha_category: Hub
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@matrixd2'
ha_domain: yolink_local
ha_platforms:
  - binary_sensor
ha_integration_type: hub
---

Integrates [YoLink](https://www.yosmart.com/) Devices into Home Assistant locally.

## Requirements

This integration requires a YoSmart Local Hub (YS1606).

## Setup

This integration requires the YoLink APP and a YoLink account.

Install YoLink APP for [Android](https://play.google.com/store/apps/details?id=com.yosmart.yolink)  
Install YoLink APP for [IOS](https://apps.apple.com/us/app/yolink/id1457639983)

1. Add the Local Hub via the YoLink app.
2. Click the **Local Network** button on the Local Hub's main page.
3. Click the **Create Subnet** button to create the local network.
4. The **Net Id** from the **General** tab of the Local Network page is required when adding the integration.
5. On the Local Network page, navigate to the **Integrations** tab and enable the Local API, making sure that both the HTTP and MQTT protocols are enabled.
6. The **Client Id** and **Client Secret** from the **Local API** are required when adding the integration.

## Supported device list

The integration is tested and verified for the following devices from YoLink:

- YS7804-UC (Motion Sensor)
- YS7805-UC (Outdoor Motion Sensor)
- YS7903-UC (Water Leak Sensor)
- YS7904-UC (Water Leak Sensor 2)
- YS7906-UC (Water Leak Sensor 4)
- YS7916-UC (Water Leak Sensor 4 MoveAlert)
- YS7914-UC (Leak Sensor)
