---
title: AirTouch 4
description: Instructions on how to integrate the AirTouch 4 A/C controller into Home Assistant.
ha_category: Climate
ha_release: 0.119
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@LonePurpleWolf'
ha_domain: airtouch4
---

The AirTouch 4 integration allows you to control Ducted Air Conditioning Systems that are using the [AirTouch 4](https://www.airtouch.net.au/airtouch/airtouch-4/) Controller. Currently, this integration only supports AirTouch 4 controllers with the Individual Temperature Control (ITC) modules.

## Configuration

It is recommended that the wall-mounted AirTouch 4 Android tablet use a static IP, which you will then use to configure the AirTouch 4 in Home Assistant.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **AirTouch 4**.
Enter the IP address.
After completing the configuration flow, the AirTouch 4 integration will dynamically add relevant entities for each controlled zones.

## Entities

### Climate

The integration will create a climate entity for each zone that is temperature-controlled.
