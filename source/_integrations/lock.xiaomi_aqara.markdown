---
title: "Xiaomi Aqara Lock"
description: "Instructions on how to setup the Xiaomi Aqara Lock within Home Assistant."
ha_category:
  - Lock
ha_release: 0.71
ha_iot_class: Local Push
ha_domain: xiaomi_aqara
---


The `xiaomi aqara` lock platform allows you to get data (`changed_by` property, `verified_wrong_times` attribute) from your [Xiaomi](https://www.mi.com/en/) Aqara locks.

An Aqara lock cannot be controlled by Home Assistant.

The property `changed_by` provides the user/key ID of the last successful unlock.

If someone tries to unlock the device but fails more than 3 times the `verified_wrong_times` attribute will be incremented. The counter resets on a successful unlock.

Use of this platform requires that you have set up the [Xiaomi Aqara](/integrations/xiaomi_aqara/) component.


