---
title: MyQ
description: Instructions on how to integrate MyQ-Enabled garage door covers into Home Assistant.
ha_category:
  - Cover
  - Binary Sensor
ha_release: 0.39
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_domain: myq
ha_homekit: true
ha_platforms:
  - binary_sensor
  - cover
---

The `myq` cover platform lets you control MyQ-Enabled garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your MyQ Device mobile app.

{% include integrations/config_flow.md %}

### Binary Sensor

Your MyQ gateway will appear as a binary sensor that shows if the device is connected.

### Cover

Garage doors and gates linked to your `MyQ` account will appear as covers.

## Using HomeKit controller for local control - ***No Apple device required***

If you have a [`819LMB`](https://www.liftmaster.com/myq-home-bridge/p/G819LMB) or [`MYQ-G0303-SP`](https://www.chamberlain.com/myq-g0303-sp/p/MYQ-G0303-SP), Home Assistant can speak Home Kit Accessory Protocol and control the device over the local network without the need to access to the cloud service. As a bonus, updates are push and near-instantaneous.

To use HomeKit Controller:

### If bridge is currently paired (otherwise skip these steps)
 - Open the Apple Home App to the Home that the MyQ device is paired with
 - Touch the Home Icon
 - Choose `Home Settings`
 - Scroll down to `Hubs and Bridges`
 - Touch the `MyQ-...` bridge
 - Touch `Remove Bridge from Home`

### Pairing with Home Assistant
 - Go to `Configuration` >> `Integrations` in the Home Assistant UI
 - Click the button with + sign, and from the list of integrations, select  ***HomeKit Controller***.
 - Select the `MyQ-...` bridge
 - Enter the pairing code that is physically printed on a sticker on the bridge.
 - Complete the remaining steps.

If you want the devices to be accessible via HomeKit, create a HomeKit Bridge using the following steps:
 - Go to `Configuration` >> `Integrations` in the Home Assistant UI
 - Click the button with + sign, and from the list of integrations, select  ***HomeKit***.
 - Create a bridge for the `cover` domain
 - Follow the instructions to pair with the bridge.

