---
title: Eve
description: Connect and control your Eve Matter devices using the Matter integration
ha_release: '2025.4'
ha_iot_class: Local Push
ha_category:
  - Energy
ha_domain: eve
ha_integration_type: brand
ha_platforms:
  - binary_sensor
  - cover
  - sensor
ha_iot_standard: matter
ha_brand: true
works_with:
  - matter
---

{% include integrations/wwha.md url="https://www.evehome.com/" %}

## Supported devices

{% include integrations/device_list.html brand="eve" %}

## Known limitations

Some Eve devices were originally sold as Bluetooth or HomeKit-only models and need a firmware upgrade to Matter before you can use them with Home Assistant. Eve's upgrade process requires an iPhone or iPad, together with an Apple Thread border router such as a HomePod or Apple TV. Without an Apple device, these models cannot be upgraded to Matter.

Before buying, check [Eve's upgrade to Matter guide](https://www.evehome.com/en/upgrade-to-matter) to confirm whether a device already supports Matter out of the box or needs to be upgraded first.
