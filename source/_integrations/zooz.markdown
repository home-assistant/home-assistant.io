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

## Supported devices

The following devices are certified for Works with Home Assistant:

### Leak Protection

[ZAC36 Titan Water Valve Actuator](https://www.getzooz.com/zooz-zac36-titan-water-valve-actuator/)

### Plugs

[ZEN04 Smart Plug](https://www.getzooz.com/zooz-zen04-smart-plug/)
[ZEN05 Outdoor Plug](https://www.getzooz.com/zooz-zen05-outdoor-smart-plug/%20)

### Relays

[ZEN16 Multi Relay](https://www.getzooz.com/zooz-zen16-multirelay/)
[ZEN51 Dry Contact Relay](https://www.getzooz.com/zooz-zen51-dry-contact-relay/)
[ZEN52 Double Relay](https://www.getzooz.com/zooz-zen52-double-relay/)
[ZEN52 DC Motor Controller](https://www.getzooz.com/zooz-zen53-dc-motor-controller/)

### Lighting Switches

[ZEN30 Double Switch](https://www.getzooz.com/zooz-zen30-double-switch/)
[ZEN32 Scene Controller](https://www.getzooz.com/zooz-zen32-scene-controller/)
[ZEN71 On Off Switch](https://www.getzooz.com/zooz-zen71-on-off-switch/)
[ZEN72 Dimmer](https://www.getzooz.com/zooz-zen72-dimmer/)
[ZEN74 Toggle Dimmer](https://www.getzooz.com/zooz-zen74-s2-toggle-dimmer/)
[ZEN76 S2 On Off Switch](https://www.getzooz.com/zooz-zen76-s2-700-series-switch/)
[ZEN77 S2 Dimmer](https://www.getzooz.com/zooz-zen77-s2-dimmer/)

### Sensors

[ZSE11 Q Sensor (4in1)](https://www.getzooz.com/zooz-zse11-q-sensor/)
[ZSE18 Motion Sensor](https://www.getzooz.com/zooz-zse18-s2-motion-sensor/)
[ZSE41 Open / Close XS Sensor](https://www.getzooz.com/zooz-zse41-open-close-xs-sensor/)
[ZSE42 Water Leak XS Sensor](https://www.getzooz.com/zooz-zse42-water-leak-xs-sensor/)
[ZSE43 Tilt Shock XS Sensor](https://www.getzooz.com/zooz-zse43-tilt-shock-xs-sensor/)
[ZSE44 Temperature Humidity XS Sensor](https://www.getzooz.com/zooz-zse44-temperature-humidity-xs-sensor/)
[ZSE70 Outdoor Motion Sensor](https://www.getzooz.com/zse70-outdoor-motion-sensor/)
