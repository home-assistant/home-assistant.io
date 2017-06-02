---
layout: page
title: "Flexit A/C controller"
description: "Instructions how to integrate Flexit A/C unit into Home Assistant."
date: 2017-06-02 16:30 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: flexit.png
ha_category: Climate
ha_release: 0.46
ha_iot_class: "Local Polling"
---

Integrates [Flexit](https://www.flexit.no/en/) Air Conditioning unit into Home Assistant.

Requires an CI66 Modbus Adapter [CI66](https://www.flexit.no/en/products/air_handling_unit/accessories_ahu/modul/modbusadapter_ci66/modbus_adapter_ci66_k2-c2-uni/)

To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: flexit
    slave: 21
```

Configuration variables:

- **slave** (*Required*): The slave ID of the modbus adapter, set using DIP-switches.
- **name** (*Optional*): Displayed name of the A/C unit