---
title: GoDice
description: Integrate GoDice
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@anton-ptashnik'
ha_domain: godice
ha_platforms:
  - sensor
ha_integration_type: integration
ha_release: 0.001
ha_quality_scale: platinum
---

Integrate [GoDice](https://particula-tech.com/godice) into Home Assistant.

The GoDice {% term integration %} allows you to receive notifications from a GoDice. Turn your GoDice into a smart home control to make home interaction even more fun. Just flip a dice to turn on lights, play music or switch some device on/off.

{% include integrations/config_flow.md %}

## Device connection limitations

GoDice is a low-powered device and it puts some constrains on link quality between HA and the device itself. The following limitations take place:

- connection range

Connection is handled over Bluetooth (BLE) and distance between GoDice and HA hub is limited to 3-4m approx. Keep GoDice within this range to avoid connection drops or consider using [Bluetooth proxy](https://esphome.io/components/bluetooth_proxy.html) to position GoDice further from the hub.

- battery capacity

GoDice works 4hrs approx on a single full charge. When discharged the connection is lost, to restore the connection do charge the device, place it within connection range and wait for HA reconnect it. The device will blink 2 times when connected. If it takes too long to reconnect a charged device, one can initiate reconnection manually by reloading the integration from Devices menu.
