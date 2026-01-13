---
title: YoLink Local
description: Instructions on how to integrate YoLink Devices into Home Assistant (Local).
ha_category:
  - Binary sensor
ha_release: 2026.2
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

The **YoLink** {% term integration %} integrates [YoLink](https://www.yosmart.com/) devices into Home Assistant locally.

## Prerequisites

- YoSmart Local Hub (YS1606)
- The YoLink app installed
- YoLink account
- Client ID and client secret of the YoLink local API

### Setting up the hub and finding the client credentials

1. Install the YoLink app:
   - [Android](https://play.google.com/store/apps/details?id=com.yosmart.yolink)
   - [IOS](https://apps.apple.com/us/app/yolink/id1457639983)
2. Add the Local Hub via the YoLink app.
3. On the Local Hub's main page, select the **Local Network** button.
4. To create the local network, select the **Create Subnet** button.
5. The **Net ID** from the **General** tab of the Local Network page is required when adding the integration.
6. On the Local Network page, navigate to the **Integrations** tab and enable the Local API, making sure that both the HTTP and MQTT protocols are enabled.
7. The **Client ID** and **Client Secret** from the **Local API** are required when adding the integration.

{% include integrations/config_flow.md %}

## Supported device list

The integration is tested and verified for the following devices from YoLink:

- YS7804-UC (Motion Sensor)
- YS7805-UC (Outdoor Motion Sensor)
- YS7903-UC (Water Leak Sensor)
- YS7904-UC (Water Leak Sensor 2)
- YS7906-UC (Water Leak Sensor 4)
- YS7916-UC (Water Leak Sensor 4 MoveAlert)
- YS7914-UC (Leak Sensor)

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
