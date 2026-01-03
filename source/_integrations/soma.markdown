---
title: Soma Connect
description: Instructions on how to set up the Soma Connect within Home Assistant.
ha_category:
  - Cover
  - Sensor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: '0.100'
ha_codeowners:
  - '@ratsept'
  - '@sebfortier2288'
ha_domain: soma
ha_platforms:
  - cover
  - sensor
ha_integration_type: integration
---

The Soma integration will allow users to integrate their Soma Smarthome devices into Home Assistant using the Soma Connect hub.

You can build a Soma Connect yourself if you have a spare Raspberry Pi. You just need to follow the [ official instructions](https://support.somasmarthome.com/hc/en-us/articles/360035521234-Install-SOMA-Connect-software). After you have the SD card plug in the Pi and use an ethernet cable or [set up Wi-Fi](https://support.somasmarthome.com/hc/en-us/articles/360026210333). Then find the IP address by checking your routers DHCP table (we will work on this step).

{% include integrations/config_flow.md %}
