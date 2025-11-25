---
title: HELTUN
description: Connect and control your HELTUN Z-Wave devices using the Z-Wave integration
ha_release: '2023.3'
ha_iot_class: Local Push
ha_category:
  - Button
  - Climate
  - Switch
  - Update
ha_domain: heltun
ha_integration_type: brand
works_with:
  - zwave
ha_platforms:
  - Button
  - Climate
  - Switch
  - Update
ha_iot_standard: zwave
ha_brand: true
---

[HELTUN](https://www.heltun.com/) thermostats make it easy to automate your heating system, their touch panel switches control your lighting and motorized appliances and their high load switches control any high load appliances like groups of lights, heaters, or individual sockets.

{% include integrations/wwha.md %}

### Firmware updates

HELTUN periodically releases new firmware with additional features and functionality which can be sent to devices via an encrypted OTA (Over-The-Air) update process. In Home Assistant, you can navigate to your device page and use the Update Device Firmware option to upload the firmware from HELTUN for your device.
