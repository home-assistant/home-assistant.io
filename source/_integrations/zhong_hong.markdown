---
title: ZhongHong
description: Instructions on how to integrate ZhongHong Support thermostats within Home Assistant.
ha_category:
  - Climate
ha_release: 0.72
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@crhan'
ha_domain: zhong_hong
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: legacy
---

The **ZhongHong** {% term integration %} lets you control the air conditioners behind a ZhongHong HVAC gateway from Home Assistant.

The gateway sits on the bus of a central or <abbr title="variable refrigerant flow">VRF</abbr> air conditioning system and exposes the indoor units over your local network. Home Assistant talks to it directly over TCP, so no cloud account or internet connection is involved, and the gateway reports changes as they happen, including those made from the wall panel or the remote control.

## Prerequisites

- A ZhongHong HVAC gateway controller reachable on your network. Note down the IP address it is configured with.
- The gateway address the controller is set to, found in its own settings. It is `1` out of the box.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the gateway on your network.
Port:
  description: The TCP port the gateway listens on. Leave the default unless you changed it on the gateway.
Gateway address:
  description: The address the gateway is set to answer on, found in the controller's own settings. Enter the address your controller is set to; the default matches a controller that has not been changed.
{% endconfiguration_basic %}

## Supported functionality

Setting up the gateway discovers every indoor unit behind it and creates a climate entity for each one, named after the address it answers on. Rename them to something you recognize, such as the room each unit is in.

Each entity reports the temperature the unit measures and lets you:

- Switch the unit on and off.
- Set the target temperature.
- Choose between the **Cool**, **Heat**, **Dry**, and **Fan only** modes.
- Set the fan speed.

## Known limitations

- The gateway refuses additional TCP connections while one is open. Only one program can talk to it at a time, so Home Assistant and, for example, a phone app cannot both be connected.
- The protocol addresses five fan speeds, but it offers no way to ask an indoor unit which of them it implements. All five are offered on every entity; a unit that only has three ignores the other two and keeps running at the speed it was on.

## Troubleshooting

### The gateway cannot be reached during setup

Check that the address is right and that Home Assistant can reach it, then make sure nothing else is talking to the gateway. Because it only accepts one connection at a time, a phone app or another Home Assistant instance left connected to it will keep the setup from succeeding.

### No air conditioners were found

The gateway answered but reported no indoor units. This usually means the gateway address is not the one the controller is set to, or the gateway has not yet been commissioned against the units on the bus.

### An entity is unavailable

The entities go unavailable when the connection to the gateway drops. Home Assistant reconnects on its own, so this clears once the gateway is reachable again. If it persists, power-cycle the gateway and check that nothing else has taken the connection.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
