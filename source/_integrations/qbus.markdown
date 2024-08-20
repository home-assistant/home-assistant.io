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

The `Qbus` {% term integration %} allows you to integrate your [Qbus Control](https://www.qbus.be) into Home Assistant.

There is currently support for the following device types within Home Assistant:

- Switch (in Qbus: Bistabiel and Timers)

### Extra configuration of the integration

This integration communicates with a Qbus controller over an MQTT server.

The controllers cannot communicate directly with MQTT. Therefore we developed a gateway which you must install before enabeling this Integration. More information can be found here [Qbus MQTT Gateway](https://github.com/Qbus-iot/qbus-mqttgw).

We also host a site which contains a [Manual](https://iot.qbus.be/) where you can find lots of information to set up Home Assistant with a Qbus controller (for the moment only in Dutch).

When you have your controller connected to the MQTT Server, you have to set up a Client in Home Assistant [MQTT](https://www.home-assistant.io/integrations/mqtt/), that connects to the same MQTT Server.

{% include integrations/config_flow.md %}
