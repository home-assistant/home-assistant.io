---
title: YoLink
description: Instructions on how to integrate YoLink Devices into Home Assistant.
ha_category:
  - Sensor
ha_release: 2022.6
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@YoSmart-Inc'
ha_domain: yolink
ha_platforms:
  - sensor
ha_integration_type: integration
---

Integrates [YoLink](https://www.yosmart.com/) Devices into Home Assistant.

{% include integrations/config_flow.md %}

Unless configured otherwise, Home Assistant will use account linking provided by
Nabu Casa for authenticating with YoLink, If you want to use separate credentials, please contact <service@yosmart.com> to obtain a `client_id` and `client_secret`. Then you can add your credentials via application credentials. Settings > Devices & Services > click the menu (three dots at the top right of the screen) and then **applicaton Credentials**. Enter your credentials in the pop-up window.

The integration is tested and verified for the following devices from YoLink:

* YS7704
