---
title: Philips Hue BLE
description: Instructions on how to setup Philips Hue Bluetooth lights within Home Assistant.
ha_category:
  - Light
ha_release: 2025.12
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@flip-dots'
ha_domain: hue_ble
ha_platforms:
  - light
ha_bluetooth: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Hue BLE** {% term integration %} allows you to control your Philips Hue Bluetooth lights with Home Assistant.

## Prerequisiteshttps://github.com/home-assistant/core/issues/158030#issuecomment-3638225935
https://github.com/home-assistant/core/issues/158030#issuecomment-3638225935
Before trying to connect your light(s) to Home Assistant, you must put the light(s) into pairing mode, there are two ways to achieve this.

### Alexa/Google pairing mode

The Hue app can put lights in pairing mode using the pair to voice assistant feature. This allows you to keep controlling the lights using the Hue app as well as Home Assistant.

1. In the Philips Hue app ([Android](https://play.google.com/store/apps/details?id=com.philips.lighting.hue2), [iOS](https://apps.apple.com/us/app/philips-hue/id1055281310)), go to **Settings** > **Voice Assistants** > **Amazon Alexa** or **Google Home** > **Make Discoverable**.
2. Once the light is in pairing mode, you can connect to it to Home Assistant. 
3. To view the discovered lights, in Home Assistant, go to {% my integrations title="**Settings** > **Devices & services**" %}. They are shown in the **Discovered** section.

### Factory reset

[Factory resetting](https://www.philips-hue.com/en-us/support/article/how-to-factory-reset-philips-hue-lights/000004) a Hue light light automatically puts it in pairing mode. It can be directly connected to by Home Assistant without using the Hue app.

{% include integrations/config_flow.md %}

## Supported models

This {% term integration %} is tested to work with the following models:

| Model number | Product name                                     |
|--------------|--------------------------------------------------|
| LCA006       | Hue White and Color 1100                         |https://github.com/home-assistant/core/issues/158030#issuecomment-3638225935
| LCA011       | Hue White and Color ambiance 1100                |
| LWA031       | Hue White 1600                                   |
| LTO002       | Hue White ambiance filament globe bulb           |

The **Philips Hue BLE** integration has been designed to work with other models as well. If you have a different model and it is working, please let us know.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}


## Known limitations

If you [factory reset](https://www.philips-hue.com/en-us/support/article/how-to-factory-reset-philips-hue-lights/000004) a Hue light it will be discovered as a new device even if it was previously connected to Home Assistant or ignored. This is because the Bluetooth address of Hue lights is randomly generated and changes if the light is factory reset.

Hue lights connected using Zigbee are still discoverable and controllable by this intergration, even if they are connected to another Zigbee network or bound to a Zigbee switch. This means you can use Zigbee and Bluetooth at the same time. This can be done by pairing the light to the Zigbee hub or switch and then using the Hue app to connect to the light over Bluetooth using the QR code on the side of the light and then using the Alexa/Google pairing steps described above.

This intergration requires an active Bluetooth connection to control lights which not all Bluetooth adapders are able to provide. See the [Bluetooth docs](https://www.home-assistant.io/integrations/bluetooth/) for more information about which adapders can provide an active connection.
