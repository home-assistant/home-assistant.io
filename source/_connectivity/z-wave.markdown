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

Z-Wave is a wireless technology that many smart home devices use, such as locks, light switches, and sensors. Z-Wave devices connect to Home Assistant through a [Z-Wave adapter](#z-wave-adapters). There are two types of Z-Wave:

- **Z-Wave Classic**: devices form a mesh network. Devices that are always powered pass messages on for other devices, which extends the range of your network.
- **Z-Wave Long Range**: each device connects directly to the Z-Wave adapter, over a longer distance. Z-Wave Long Range is not a mesh network.

When you add a device that supports both, you can choose which type to use. For the steps, refer to [Adding a new device to the Z-Wave network](/integrations/zwave_js/#adding-a-new-device-to-the-z-wave-network).

The recommended way to use Z-Wave is the [Z-Wave](/integrations/zwave_js/) {% term integration %}, which is built into Home Assistant. It controls your Z-Wave network through the [Z-Wave JS](https://zwave-js.github.io/node-zwave-js/#/) driver. To set it up and add devices, refer to the [Z-Wave](/integrations/zwave_js/) integration.

This page explains where to place your Z-Wave adapter, and how Z-Wave security works.

## Z-Wave adapters

To find out which Z-Wave adapter to use, refer to [Z-Wave adapters](/docs/z-wave/controllers/).

### Placing your adapter elsewhere in your home

Your Z-Wave adapter doesn't have to be plugged into your Home Assistant server. You can place it anywhere in your home, and connect it to Home Assistant over your network.

The recommended way is to plug your [Home Assistant Connect ZWA-2](/connect/zwa-2) into a [Home Assistant Connect AUX-2](/connect/aux-2/), and power the Connect AUX-2 with Power over Ethernet (PoE). A single Ethernet cable then provides both power and the network connection.

You can also install the [Portable Z-Wave](/blog/2025/10/13/portable-z-wave-with-wifi-and-poe/) firmware on the Connect ZWA-2 itself. The adapter then connects to Home Assistant over its built-in Wi-Fi. To install the firmware, use the [Open Home Foundation toolbox](https://toolbox.openhomefoundation.org/home-assistant-connect-zwa-2/).

Over the network, Z-Wave devices respond a little slower than over USB. On most home networks, you won't notice the difference. On a busy network or with a weak Wi-Fi signal, the delay can become noticeable.

To set up an adapter that connects over your network, refer to [the setup steps in the Z-Wave integration](/integrations/zwave_js/#using-a-z-wave-adapter-connected-to-an-esphome-device).

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
