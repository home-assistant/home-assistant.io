---
title: Hue BLE
description: Instructions on how to setup Phillips Hue Bluetooth lights within Home Assistant.
ha_category:
  - Light
ha_release: 2024.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@flip-dots'
ha_domain: hue_ble
ha_platforms:
  - light
ha_bluetooth: true
ha_integration_type: integration
---

The **HueBLE** {% term integration %} allows you to control your Phillips Hue Bluetooth lights with Home Assistant.


### Initial setup

<div class='note'>

Before trying to connect your light(s) to Home Assistant you must put the light(s) into pairing mode in the Hue app ([Android](https://play.google.com/store/apps/details?id=com.philips.lighting.hue2), [iOS](https://apps.apple.com/us/app/philips-hue/id1055281310)).

`Settings -> Voice Assistants -> Amazon Alexa or Google Home -> Make Discoverable`

When the light is in pairing mode you may proceed to connect to it with Home Assistant, either utilizing automatic discovery or by manually specifying the name and MAC address in the form.

</div>

### Supported models

<div class='note warning'>
This {% term integration %} is tested to work with the following models but has been designed to work with other models. If you have a different model and it is working, please let us know.
</div>

| Model number | Product name                                     |
|--------------|--------------------------------------------------|
| LCA006       | Hue White and Color 1100                         |
