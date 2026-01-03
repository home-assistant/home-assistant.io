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

[HELTUN](https://www.heltun.com/) is a member of the Works with Home Assistant partner program for their Z-Wave products. HELTUN is committed to making sure their products are up-to-date and ready to use in Home Assistant.

HELTUN thermostats make it easy to automate your heating system, their touch panel switches control your lighting and motorized appliances and their high load switches control any high load appliances like groups of lights, heaters, or individual sockets.

HELTUN Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

### Firmware updates

HELTUN periodically releases new firmware with additional features and functionality which can be sent to devices via an encrypted OTA (Over-The-Air) update process. In Home Assistant, you can navigate to your device page and use the Update Device Firmware option to upload the firmware from HELTUN for your device.

{% my add_zwave_device badge domain=page.ha_domain %}

[Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)