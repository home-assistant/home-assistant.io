---
title: Vera
description: Instructions on how to setup Vera Z-Wave hubs and configure devices within Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Cover
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
  - Climate
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: vera
ha_codeowners:
  - '@vangorra'
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - lock
  - sensor
  - switch
---

The [Vera](https://getvera.com/) hub is a controller mainly for connecting to Z-Wave devices.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Cover
- Light
- Lock
- Scene
- Sensor
- Switch
- Climate

and will be automatically added when HA connects to your Vera controller.

{% include integrations/config_flow.md %}

<div class='note'>

  It is recommended to assign a static IP address to your Vera Controller. This ensures that it won't change IP addresses, so you won't have to change the `vera_controller_url` if it reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your Vera, check the label on the bottom.

</div>

## Options
Once the Vera integration is configured, you can set additional options in the integration, click the gear icon.

- Vera switch device - By default your switches will be added to Home Assistant as switches, however, if some of them are light switches, you can tell Home Assistant this by providing a list of light ids.
- Vera device ids to exclude - Vera imports detailed Z-Wave devices into Home Assistant. This can include system devices and other devices that you don't use; you can tell Home Assistant not to load these devices by providing a list of device ids.

You can find the Vera device id either via the advanced properties of the device in the Vera UI or by checking the `Vera Device Id` attribute on each device imported into Home Assistant (under the developer tools).

### Using Z-Wave devices in automation

If you want to use a Z-Wave device from the Vera controller in Home Assistant automation, you'll need the entity id. In the Home Assistant UI you'll find all entities listed under **Developer Tools** -> **States**. Look for entities that contain 'Vera Device Id' in their attributes, and you'll find the entity id on the left.

### Sensor

The `vera` platform allows you to get data from your [Vera](https://getvera.com/) sensors from within Home Assistant.

Please note that some Vera sensors (such as _motion_ and _flood_  sensors) are _armable_ which means that Vera will send alerts (email messages to txts) when they are _armed_ and change state.

Home Assistant will display the state of these sensors regardless of the _armed_ state.

To allow you to change the _armed state_ - Home Assistant will create a switch as well as a sensor for each _Armable_ sensor.
