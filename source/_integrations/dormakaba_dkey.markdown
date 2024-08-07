---
title: Dormakaba dKey
description: Instructions on how to integrate Dormakaba dKey locks into Home Assistant.
ha_category:
  - Lock
ha_bluetooth: true
ha_release: 2023.3
ha_iot_class: Local Polling
ha_codeowners:
  - '@emontnemery'
ha_domain: dormakaba_dkey
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - sensor
ha_integration_type: device
---

Integrates Dormakaba dKey Bluetooth Low Energy connected locks into Home Assistant.

The integration only supports connecting to the lock directly via Bluetooth. Connecting via the Dormakaba dKey gateway is not supported.

{% include integrations/config_flow.md %}

In addition to a lock entity, each added dKey lock will also have:
- A battery sensor
- A binary_sensor which shows if the door is open or not
- A binary_sensor which shows the position of the lock's dead bolt

{% important %}
The Dormakaba dKey lock is currently not working with USB dongles or built-in Bluetooth radios, only [ESPHome Bluetooth proxies](/integrations/bluetooth/#remote-adapters-bluetooth-proxies) configured to allow active connections work reliably.
{% endimportant %}
