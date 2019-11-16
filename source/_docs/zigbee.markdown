---
title: "Zigbee"
description: "Using Zigbee with Home Assistant."
---

The [Zigbee](https://zigbee.org/) integrations for Home Assistant allows you to observe and control connected Zigbee devices.

## What is Zigbee

Zigbee is a wireless communication protocol designed for personal area networks and well suited to home automation. It uses a low power, and low bandwidth, mesh network that allows devices that aren't within direct range of each other to communicate indirectly, via other nodes. Many device that are permanently powered (not battery powered) will help build the mesh (known as routers), though not all will do this (light bulbs particularly are unlikely to be a router). If you don't have enough routers, or you locate these poorly, your mesh will be unreliable.

There is a hard limit of some 65 thousand devices in a single Zigbee network, however it's likely that you'll run into other limitations long before you reach this limit.

The Zibgee standard was improved with Zibgee 3.0 (which is based upon Zigbee Pro), and many Zigbee 3.0 devices will work with a Zigbee 1.2 coordinator. Where possible you should use a Zigbee 3.0 coordinator for the greatest interoperability.

## What do you need to use Zigbee

There are 3 basic things you'll need to use Zigbee, a Zigbee integration, a coordinator supported by that integration, and one or more devices.

| Integration | Coordinators | How |
| ---- | ---- | ---- |
| [deCONZ](/integrations/deconz) | ConBee/RaspBee | Can run locally or remotely | 
| [zha](/integrations/zha) | [Various](/integrations/zha#known-working-zigbee-radio-modules) | Part of Home Assistant | 
| [Zigbee2MQTT](https://www.zigbee2mqtt.io/) | [TI](https://www.zigbee2mqtt.io/information/supported_adapters.html) | Can run locally or remotely |

Which to use

* [deCONZ](/integrations/deconz) can run in an [add-on](https://hub.docker.com/r/marthoc/deconz/) for Hass.io, in a [Docker container](https://github.com/marthoc/docker-deconz), and [natively](https://www.dresden-elektronik.de/funk/software/deconz.html). It has its own UI, and is relatively stable and mature. Known working devices [are documented](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Supported-Devices), and how to request support for a new device is [documented too](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Request-Device-Support).
* [zha](/integrations/zha) is part of Home Assistant, using the [zigpy stack](https://github.com/zigpy/zigpy). It is updated with Home Assistant, uses Home Assistant for the user interface, and is actively developed. There is no list of supported devices, as any standards compliant device should work. Devices that require extra support are [listed here](https://github.com/dmulcahey/zha-device-handlers), and adding unsupported devices is [documented](https://github.com/dmulcahey/zha-device-handlers/blob/dev/CONTRIBUTING.md).
* [Zigbee2MQTT](https://www.zigbee2mqtt.io/) can run in an [add-on](https://github.com/danielwelch/hassio-zigbee2mqtt) for Hass.io, in a [Docker container](https://www.zigbee2mqtt.io/information/docker.html), and [natively](https://www.zigbee2mqtt.io/information/virtual_environment.html). It doesn't have a native UI, using MQTT for control and configuration, but there are [third party options](https://github.com/yllibed/Zigbee2MqttAssistant). This integration is very actively developed. The known working devices [are well documented](https://www.zigbee2mqtt.io/information/supported_devices.html), and adding unsupported devices is [also documented](https://www.zigbee2mqtt.io/how_tos/how_to_support_new_devices.html).

The primary advantage of *zha* is that it is built in to Home Assistant, and so the simplest to get running. The other integrations allow you to easily place your Zigbee coordinator centrally when your Home Assistant system is located elsewhere, or use that Zigbee mesh from multiple Home Assistant installs at the same time (for instance from your production and test installs).

### Frequencies

Zigbee 1.2 uses the same 2.4 GHz band as WiFi, and Zigbee 3.0 adds support for the [sub-GHz ISM bands](https://en.wikipedia.org/wiki/Zigbee#Radio_hardware) (which are also used by Z-Wave). This means that you need to consider [WiFi interference](https://www.metageek.com/training/resources/zigbee-wifi-coexistence.html), and if you're using Z-Wave there's potential interference if you're using a device that supports the ISM bands.

The ISM bands are regional, and if you're buying a device that doesn't support the 2.4 GHz band you'll need to ensure that it supports your region.

## The Zigbee Mesh

As mentioned above, Zigbee is a mesh network. There are things you can do to help the strength and stability of that mesh, and things you can do that will cause you problems.

### Channel

Where your integration gives you a choice, ensure that you set up your Zigbee mesh on a channel clear of WiFi. You can install apps on your mobile to allow you to find what channels are in use, and [this article](https://www.metageek.com/training/resources/zigbee-wifi-coexistence.html) to avoid overlap.

### The Coordinator

Place the coordinator as centrally as possible, avoiding basements, garages, and trying to avoid internal concrete walls, large metal objects, and away from any WiFi access point.

### Routers

Add your routers first, starting near the coordinator and working outwards. Most mains powered devices, other than lightbulbs, will act as routers. How many routers you need, and how far they can be from the coordinator, will depend on the total number of devices you're installing and the construction of your building. Generally you can expect that you'll get about 6 to 12 meters (20 to 40 feet) between devices, but your results may vary.

### End Devices

This is the name for all the battery powered devices you'll add. These spend much of their time in low power mode, which is why they can't route messages. Always add these where you want to use them, otherwise they'll lose communication with the mesh. Most devices will find a new connection automatically, though it can take up to 24 hours. Xiaomi devices are known to not reconnect automatically, and also don't work with all router devices.

## Troubleshooting

If you've got connectivity problems, here are a few things to try:

* Adding a USB extension cable will move your USB stick away from the computer you've connected it to. This can reduce interference, and improve your range.
* Ensure that any WiFi router/access point, WiFi USB stick, Z-Wave stick, or RF433 stick are as far away as you can get them (at least one meter if you can). This will also reduce interference.
* Check the WiFi channels in use, to see if your router/access point is now talking over your Zigbee mesh. If so change the channel of the WiFi access point and lock it. If you have to change the channel of your Zigbee mesh then you'll have to re-pair your devices.
* Add more routers between the problem devices and the next nearest router.
