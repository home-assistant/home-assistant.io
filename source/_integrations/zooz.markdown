---
title: Zooz
description: Connect and control your Zooz Z-Wave series devices using the Z-Wave integration
ha_release: '2025.7'
ha_iot_class: Local Push
ha_category:
  - Plug
  - Light
  - Sensor
  - Switch
  - Water management
ha_domain: zooz
ha_integration_type: brand
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
works_with:
  - zwave
ha_iot_standard: zwave
ha_brand: true
---

[Zooz](https://www.getzooz.com/) Z-Wave devices work locally and integrate seamlessly with the Z-Wave integration in Home Assistant (Z-Wave stick required). As all connectivity is happening locally, status updates and controlling your devices happen instantly in Home Assistant.

{% my add_zwave_device badge domain=page.ha_domain %}

[Learn more about Z-Wave in Home Assistant.](/integrations/zwave_js/)

## Works with Home Assistant certified devices

{% include integrations/device_list.html brand="zooz" %}

## Supported devices

In addition to the certified devices, the following devices are also supported:

- [ZEN53 DC Motor Controller](https://www.getzooz.com/zooz-zen53-dc-motor-controller/)
- [ZSE41 Open / Close XS Sensor](https://www.getzooz.com/zooz-zse41-open-close-xs-sensor/)
