---
title: Matter
description: Instructions on how to integrate Matter with Home Assistant.
ha_category:
  - Binary Sensor
  - Light
  - Sensor
  - Switch
ha_release: '2022.12'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@marcelveldt'
  - '@MartinHjelmare'
ha_domain: matter
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
---

This integration allows you to communicate with and control Matter devices on your local WiFi or Thread network.

<p class='note'>
Both Matter and the implementation within Home Assistant are in early (v1) state and features may be missing or could be improved.
</p>

{% include integrations/config_flow.md %}

If you run Home Assistant Container, Home Assistant Core, or you don’t want to use the built-in Matter Server add-on, please see the [advanced installation instructions](#advanced-installation-instructions).


## Advanced installation instructions

If you are using Home Assistant Container, Home Assistant Core, or you don't want to use the built-in Matter Server add-on, you will need to run the Matter Server yourself, to which the Matter integration will connect.

### Running [Matter Server](https://github.com/home-assistant-libs/python-matter-server)

This application provides the connection between your Matter network (called Fabric in technical terms) and Home Assistant. The Home Assistant Matter integration connects to this server via a websocket connection. You need to run the Matter Server before you can use the integration.

There are multiple ways to run the server:

**Option 1: The official MatterServer add-on, as described above**

_This option is only available for Home Assistant OS (the recommended installation type) and Home Assistant Supervised installations._

**Option 2: Run the Matter server yourself**

This option is considered a very advanced setup and only for experienced users. You can find instructions on how to run the Matter Server in the [project repository](https://github.com/home-assistant-libs/python-matter-server).

