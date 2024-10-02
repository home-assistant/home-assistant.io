---
title: Qbus
description: Control your Qbus installation with Home Assistant.
ha_category:
  - Switch
ha_iot_class: Local Push
ha_codeowners:
  - '@Qbus-iot'
  - '@thomasddn'
ha_release: 2.5
ha_domain: qbus
ha_platforms:
  - switch
ha_integration_type: hub
---

The `Qbus` **term integration** allows you to integrate your [Qbus Control](https://www.qbus.be) into Home Assistant. Qbus is a Belgian manufacturer of Home Automation systems.

There is currently support for the following device types within Home Assistant:

- Switch (in Qbus: Bistabiel and Timers)

### Extra configuration of the integration

This integration communicates with a Qbus controller over an MQTT server.

The controllers cannot communicate directly with MQTT. Therefore, we developed a gateway which you must install before enabling this Integration. Our gateway is a softwaretool that runs on all Linux platforms. It can simply be installed by running a script our a docker container. For detailed instructions, please refer to the [Qbus MQTT Gateway documentation](https://github.com/Qbus-iot/qbus-mqttgw).

We also host a site which contains a [Manual](https://iot.qbus.be/) where you can find lots of information to set up Home Assistant with a Qbus controller (for the moment only in Dutch but translations will be made available).

When you have your controller connected to the MQTT Server, you have to set up a Client in Home Assistant [MQTT](https://www.home-assistant.io/integrations/mqtt/), that connects to the same MQTT Server.

For detailed instructions on setting up the MQTT integration in Home Assistant, please refer to the [MQTT integration documentation](https://www.home-assistant.io/integrations/mqtt/#configuration).

The config flow provides a user-friendly interface in the Home Assistant UI to guide you through the setup process for the Qbus integration. To start the config flow:
1. Go to Configuration > Integrations in your Home Assistant instance.
2. Click the "+ ADD INTEGRATION" button.
3. Search for "Qbus" and select it.
4. Follow the on-screen instructions to complete the setup.

{% include integrations/config_flow.md %}
