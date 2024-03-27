---
title: GoDice
description: Instructions on how to integrate GoDice into Home Assistant.
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
ha_release: 2024.04
---

Integrate [GoDice](https://particula-tech.com/godice) into Home Assistant.

The GoDice {% term integration %} allows you to receive notifications from a GoDice. Turn your GoDice into a smart home control to make home interaction even more fun. Just flip a dice to turn on lights, play music or switch some device on/off.

{% include integrations/config_flow.md %}

## Device connection limitations

GoDice is a low-powered device and it puts some constrains on link quality between HA and the device itself. The following limitations take place:
GoDice is a low-power device which puts some constraints on the connection quality and battery capacity. The following limitations should be considered:

### Connection range

Connection is handled over Bluetooth (BLE) and distance between GoDice and your Home Assistant hub is limited to approximately 3 to 4 meters. Keep GoDice within this range to avoid connection issues or consider using a [Bluetooth proxy](https://esphome.io/components/bluetooth_proxy.html) to be able to position GoDice further away from your hub.

### Battery capacity

GoDice works approximately 4 hours on a single full charge. To restore the connection charge your GoDice, place it within connection range and wait for Home Assistant to reconnect to it. The device will blink 2 times when connected. If it takes too long to reconnect a charged device, one can initiate reconnection manually by reloading the integration from the devices menu.
