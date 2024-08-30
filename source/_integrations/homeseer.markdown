---
title: HomeSeer
description: Connect and control your HomeSeer Z-Wave devices using the Z-Wave integration
ha_release: '2023.4'
ha_iot_class: Local Push
ha_category:
  - Binary sensor
  - Light
  - Sensor
  - Switch
ha_domain: homeseer
ha_integration_type: brand
works_with:
  - zwave
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_iot_standard: zwave
ha_brand: true
---

[HomeSeer](https://homeseer.com/) is a member of the Works with Home Assistant partner program for their Z-Wave products. Despite offering their own Home Automation software HomeSeer is committed to making sure their products are up-to-date and ready to use in Home Assistant.

HomeSeer products are all Z-Wave Plus certified. Their wall switches and dimmers offer convenient additional status LEDs that can signal events happening in your home and double-tap actions for triggering automations and scenes. Their water valves will stop the water flow when leaks are detected and notify you.

HomeSeer Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

### Firmware updates

HomeSeer periodically releases new firmware with additional features and functionality which can be sent to devices via an encrypted OTA (Over-The-Air) update process. In Home Assistant, you can navigate to your device page and use the Update Device Firmware option to upload the firmware from HomeSeer for your device.

{% my add_zwave_device badge domain=page.ha_domain %}

[Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)