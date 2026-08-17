---
title: ZhongHong
description: Instructions on how to integrate the air conditioners behind a ZhongHong HVAC gateway into Home Assistant.
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

The gateway sits on the bus of a central or <abbr title="variable refrigerant flow">VRF</abbr> air conditioning system and puts the indoor units on your local network. Home Assistant talks to it directly over TCP, so no cloud account or internet connection is involved, and the gateway reports changes as they happen, including those made from a wall panel or a remote control.

## Prerequisites

- A ZhongHong HVAC gateway reachable on your network. Note down the IP address it is set to.
- The gateway address. Each gateway answers to an address of its own, which is `1` from the factory and only differs if it was changed when the system was installed.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the gateway on your network.
Port:
  description: The port the gateway accepts connections on. This is `9999` unless it was changed on the gateway.
Gateway address:
  description: The address the gateway itself answers to, which is `1` from the factory. Change this only if the gateway was set to another address.
{% endconfiguration_basic %}

## Supported functionality

Setting the gateway up finds every indoor unit behind it and creates a climate entity for each one, named after the address it answers on. Rename them to something you recognize, such as the room each unit is in.

Each entity reports the temperature its indoor unit measures, and lets you:

- Switch the unit on and off.
- Set a target temperature between 16 and 30 °C, in steps of 1 °C.
- Choose between the **Cool**, **Heat**, **Dry**, and **Fan only** modes.
- Set the fan speed to **low**, **medium low**, **middle**, **medium high**, or **high**.

## Data updates

The gateway pushes state changes to Home Assistant as they happen, so switching an air conditioner on at its wall panel is reflected within seconds without Home Assistant asking.

Home Assistant asks the gateway for the state of every unit once, when the integration is set up. After that it only listens.

## Known limitations

- Only one program can talk to the gateway at a time. While Home Assistant is connected, the gateway refuses everything else, so Home Assistant and a phone app cannot both be connected to it.
- The indoor units are found once, when the integration is set up. An indoor unit added to the system afterwards does not appear on its own; reload the integration from {% my integrations title="**Settings** > **Devices & services**" %} to pick it up.
- All five fan speeds are offered on every entity. Many air conditioners only have three, and there is no way to ask one which it has, so a unit ignores a speed it does not have and stays on the one it was running at.

## Troubleshooting

### The gateway cannot be reached during setup

Check that the address and port are right and that Home Assistant can reach the gateway, then make sure nothing else is talking to it. Because only one program can be connected at a time, a phone app or another Home Assistant left connected to the gateway stops the setup from succeeding.

### No air conditioners were found

The gateway answered but reported no indoor units. Either the gateway address does not match the one the gateway is set to, or the gateway is not ready yet, which is what it reports before it has finished finding the indoor units on the system.

### An entity stopped following its air conditioner

The connection to the gateway has most likely dropped, leaving the entity showing the last state it was told about. Reload the integration from {% my integrations title="**Settings** > **Devices & services**" %} to reconnect. If that does not help, turn the gateway off and on again, and check that nothing else has taken the connection.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
