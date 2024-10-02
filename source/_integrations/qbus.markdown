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

- Switch (in Qbus: Bistabiel (toggle switches) and Timers)

### Extra configuration of the integration

This integration communicates with a Qbus controller over an MQTT server.

The controllers cannot communicate directly with MQTT. Therefore, we developed a gateway which you must install before enabling this Integration. Our gateway is a softwaretool that runs on all Linux platforms. It can simply be installed by running a script our a Docker container. For detailed instructions, please refer to the [Qbus MQTT Gateway documentation](https://github.com/Qbus-iot/qbus-mqttgw).

We also host a site which contains a [Manual](https://iot.qbus.be/) where you can find lots of information to set up Home Assistant with a Qbus controller (currently only available in Dutch, with translations planned for the future).

When you have your controller connected to the MQTT Server, you need to set up an MQTT client in Home Assistant to enable communication between Home Assistant and your Qbus system. This client should connect to the same MQTT Server as your Qbus controller. For detailed instructions, refer to the [MQTT integration documentation](https://www.home-assistant.io/integrations/mqtt/).

{% include integrations/config_flow.md %}
