---
title: "Zigbee"
description: "Using Zigbee with Home Assistant."
redirect_from: /getting-started/zigbee/
---

[Zigbee Home Automation](/integrations/zha/) native integration for Home Assistant allows you to observe and control connected Zigbee devices without the need of a third-party bridge, hub or gateway. This Zigbee Home Automation integration just requires a [supported Zigbee USB stick or radio module](/integrations/zha/), also refer to as a controller or adapter, to be plugged into the Linux-based host which runs Home Assistant (such as for example a Raspberry Pi single-board-computer with [Hass.io](/hassio/) installed).

There is currently support for Zigbee based lights, locks, sensors, switches, and fans. 

Before buying a Zigbee based home automation device to use with Home Assistant, please be aware that Zigbee is developed as an open global standard, and while the [Zigbee Alliance](https://zigbee.org/) who governance the specifications have a cerification program for compatiblity it a requirement to certify released products and therefor some devices may require the development of custom ZHA Device Handlers before all their functions to work properly with the [Zigbee Home Automation](/integrations/zha/) integration in Home Assistant.

## What is Zigbee

Zigbee is a wireless communication protocol designed for home automation and other close proximity (i.e., personal area) devices or projects which need need a wireless connection. Similar to the competing Z-Wave specification, Zigbee uses a low power and low bandwidth, mesh-network that allows devices that are not within direct range of each other to communicate indirectly, via other nodes. Any device that's permanently powered (not battery powered) will help build the mesh, if you don't have enough powered devices, or you locate these poorly, your mesh will be unreliable. Most Zigbee devices can normally transmit anywhere in range from 10 to 100 meters over 2.4GHz depending on physical obstacles, radio capability and interference.

Zigbee is interoperable with different brands, products, manufacturers and versions that used follow Zigbee specifications, which is great for home automation enthusiasts. There is a wide range of compatible devices to choose from and most of them are significantly cheaper than similar Z-Wave based devices, which is due to Zigbee being an open standard and fees for Zigbee Alliance members are much lower than those for Z-Wave who pay a royalty-fee per device per device. 

## What do you need to use Zigbee

There are two basic things you will need to use the Zigbee Home Automation integration in Home Assistant, a [compatible Zigbee USB stick or module](/integrations/zha/) and one or more [Zigbee based devices](https://www.the-ambient.com/guides/zigbee-devices-complete-guide-277). 

### Regional differences

Zigbee operates in the industrial, scientific and medical (ISM) radio bands: for home use this means 2.4GHz bands in most regions worldwide, and the Zigbee radios currently compatible with Home Assistant all only operate with those 2.4GHz bands.

Zigbee devices less common for home use, such as example devices meant for industrial control or commercial property control also use 784 MHz in China, 868 MHz in Europe and 915 MHz in the USA and Australia, however even all of those regions and countries still use 2.4 GHz for most Zigbee devices meant for home use. Data rates vary from 20 kb/s (868 MHz band) to 250 kb/s (2.4 GHz band).

## Getting started

You will now need to connect your [compatible Zigbee USB stick or module](/integrations/zha/) and configure the [Zigbee Home Automation](/integrations/zha/) integration, then add/pair some devices using the control panel.

Note that when you toggle a switch or control a light locally you may find that it takes some time for status updates to be reflected in Home Assistant. 

## Alternative ways of controlling Zigbee devices

Other than using the above described native [Zigbee Home Automation](/integrations/zha/) integration in Home Assistant, there are also other integrations for Home Assistant connect a third-party bridge, hub or gateway (that can be hardware or software) which in turn can also communicate with Zigbee devices, through those other integrations mostley or fully absract the fact that the devices are using the Zigbee specification (as such that the devices could just as well be using any other specification). Such integrations with third-party bridges, hubs and gateways that can also communicate with Zigbee devices include but are not exclusive to; deCONZ, Zigbee2mqtt, Philips Hue Hub, Ikea Tradfri Gateway, Osram Lightify, and Samsung SmartThings Hub.
