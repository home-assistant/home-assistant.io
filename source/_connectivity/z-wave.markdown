---
title: "Z-Wave"
connectivity: zwave
description: "Connect Z-Wave devices, like locks, light switches, and sensors, to Home Assistant with a Z-Wave adapter."
related:
  - docs: /integrations/zwave_js/
    title: Z-Wave integration
  - docs: /docs/z-wave/controllers/
    title: Z-Wave adapters
  - docs: /connect/zwa-2/
    title: Home Assistant Connect ZWA-2
---

Z-Wave is a wireless technology that many smart home devices use, such as locks, light switches, and sensors. Z-Wave devices form a mesh network with a [Z-Wave adapter](#z-wave-adapters) that is connected to Home Assistant.

The recommended way to use Z-Wave is the [Z-Wave](/integrations/zwave_js/) {% term integration %}, which is built into Home Assistant. It controls your Z-Wave network through the [Z-Wave JS](https://zwave-js.github.io/node-zwave-js/#/) driver. To set it up and add devices, refer to the [Z-Wave](/integrations/zwave_js/) integration.

This page explains which Z-Wave adapter to use, where to place it, and how Z-Wave security works.

## Z-Wave adapters

Z-Wave supports all known 500, 700, and 800 series Z-Wave adapters. If you are just starting out, we recommend that you purchase a 800-series adapter (with firmware updated to >=7.23.2), such as the [Home Assistant Connect ZWA-2](/connect/zwa-2/).

For all the supported adapters, refer to [Z-Wave adapters](/docs/z-wave/controllers/).

### Placing your adapter elsewhere in your home

Your Z-Wave adapter doesn't have to be plugged into your Home Assistant server. It can also connect to an ESP32-based device running [ESPHome](/integrations/esphome/). The ESPHome device then passes the Z-Wave traffic to Home Assistant over your network. This lets you place the adapter anywhere you have a Wi-Fi or Ethernet connection.

For example, you can use the experimental [Portable Z-Wave](/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/) firmware with a [Home Assistant Connect ZWA-2](/connect/zwa-2). Portable Z-Wave is ESPHome firmware for connecting a Z-Wave adapter to Home Assistant over your network. You can use it in two ways:

- Install it on the Home Assistant Connect ZWA-2 itself. The adapter then connects over its built-in Wi-Fi.
- Install it on an ESP32 board with Power over Ethernet (PoE). Then plug the Home Assistant Connect ZWA-2 into that board by USB. The adapter keeps its standard firmware.

To install the firmware, use the [Open Home Foundation toolbox](https://toolbox.openhomefoundation.org/home-assistant-connect-zwa-2/).

Over the network, Z-Wave devices respond a little slower than over USB. On most home networks, you won't notice the difference. On a busy network or with a weak Wi-Fi signal, the delay can become noticeable.

You can also plug a Home Assistant Connect ZWA-2 into a [Home Assistant Connect AUX-2](/connect/aux-2/). The Connect AUX-2 then connects the adapter to Home Assistant over your network.

To set up a Z-Wave adapter that is connected to an ESPHome device, refer to [Using a Z-Wave adapter connected to an ESPHome device](/integrations/zwave_js/#using-a-z-wave-adapter-connected-to-an-esphome-device).

## Z-Wave security

There are two generations of Z-Wave encryption, Security S0, and Security S2. Both provide encryption and allow detecting packet corruption.

Security S0 imposes significant additional traffic on your mesh and is recommended only for older devices that do not support Security S2 but require encryption to work, such as door locks.

Security S2 does not impose additional network traffic and provides additional benefits. For example, end devices using S2 require the hub to report whether it has received and understood their reports.

By default, Z-Wave prefers Security S2, if supported. Security S0 is used only when absolutely necessary.

## Z-Wave terminology

This section explains some Z-Wave terms and concepts you might find in Z-Wave product documentation.

### Association group

An _association_ in Z-Wave terminology is when two or more Z-Wave products communicate directly. This enables devices to communicate with each other without the need to communicate via a hub, or to send unsolicited reports to the central hub.

An _association group_ in Z-Wave terminology is a group of devices that another one will send commands to in certain situations. Association groups and their functionality are specific to the device that sends the commands. Refer to the device manual for details.

### Classic inclusion versus SmartStart

Home Assistant supports both _classic inclusion_ and _SmartStart_. _Classic inclusion_ means you set both the hub and the device to be included into the corresponding mode. The alternative is _SmartStart_, where the hub is constantly listening for inclusion requests from devices that want to join the network.

### SmartStart

SmartStart enabled products can be added into a Z-Wave network by scanning the Z-Wave QR Code present on the product with an adapter supporting SmartStart inclusion.
No further action is required and the SmartStart product will be added automatically within 10 minutes of being switched on in the network vicinity. Not all devices support SmartStart. Some devices require *classic inclusion*. For documentation on adding a device to Home Assistant, refer to [adding a new device to the Z-Wave network](/integrations/zwave_js/#adding-a-new-device-to-the-z-wave-network).

### Terminology mapping table

Throughout this documentation, Home Assistant terminology is used. For some of the concepts, the terminology does not correspond to the terminology used in Z-Wave documentation. The table below provides equivalents for some of those terms.

| Z-Wave functionality | Home Assistant | Definition |
| -------------------- | -------------- | ---------- |
| barrier operator | cover | |
| controller | adapter, when referring to the hardware device that provides the Z-Wave functionality. The term controller is still used when referring to the network role (such as primary, secondary controller)  | |
| exclusion | remove | The process of removing a node from the Z-Wave network |
| [inclusion](#classic-inclusion-versus-smartstart) | add | The process of adding a node to the Z-Wave network |
| multilevel switch | represented by different entity types, such as light or fan. | |
| replication | copy (not supported in Home Assistant) | The process of copying network information from one adapter to another. Not supported in Home Assistant. |
| window covering | cover | |

## Troubleshooting

### How do I address interference issues?

Many users have reported issues with interference when the adapter was directly connected to the machine (proximity). If you are having issues, try to use a short USB&nbsp;2.0&nbsp;A (male to female) extension cord.
