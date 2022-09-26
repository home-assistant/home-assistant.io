---
title: Fibaro
description: Instructions on how to setup Fibaro Z-Wave hubs (HCL and HC2) and configure devices within Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Cover
  - Hub
  - Light
  - Lock
  - Scene
  - Sensor
  - Switch
ha_release: 0.83
ha_iot_class: Local Push
ha_domain: fibaro
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - lock
  - scene
  - sensor
  - switch
ha_codeowners:
  - '@rappenze'
ha_config_flow: true
ha_integration_type: integration
---

The [Fibaro](https://fibaro.com/) hub is a controller mainly connecting to Z-Wave devices.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Cover
- Climate
- Light
- Lock
- Sensor
- Scene
- Switch

They will be automatically added when the `fibaro` hub is connected to Home Assistant.

{% include integrations/config_flow.md %}

<div class='note'>

  It is recommended to assign a static IP address to your Fibaro controller. This ensures that it won't change its IP address, so you won't have to change the `url` if the controller reboots and comes up with a different IP address. See your router's manual for details on how to set this up. If you need the MAC address of your Fibaro, check the label on the bottom.

</div>

### Using Z-Wave devices in automation

If you want to use a Z-Wave device from the Fibaro controller in Home Assistant automation, you'll need the entity id. In the Home Assistant UI you'll find all entities listed under **Developer Tools** -> **States**. Look for entities that contain 'fibaro_id' in their attributes, and you'll find the entity id on the left.
