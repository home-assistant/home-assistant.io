---
title: "Zigbee"
connectivity: zigbee
description: "Zigbee is a wireless technology for devices such as lights, plugs, and sensors. Devices form a mesh network managed by a coordinator."
related:
  - docs: /integrations/zha/
    title: Zigbee Home Automation integration
  - docs: /connect/zbt-2/
    title: Home Assistant Connect ZBT-2
---

Zigbee is a wireless technology that many smart home devices use, such as lights, plugs, switches, and sensors. Zigbee devices form a mesh network with a [Zigbee adapter](#zigbee-adapters), also called a coordinator, that is connected to the system that runs Home Assistant.

The recommended way to use Zigbee is the [Zigbee Home Automation](/integrations/zha/) (ZHA) {% term integration %}, which is built into Home Assistant. ZHA is a hardware-independent Zigbee gateway that can replace most proprietary Zigbee gateways (or bridges, hubs, or controllers). It creates a single Zigbee network to which you can add most Zigbee-based devices. To set it up and add devices, refer to the [Zigbee Home Automation](/integrations/zha/) integration.

[Zigbee2MQTT](https://www.zigbee2mqtt.io/) is a popular alternative. It runs as a separate application and connects to Home Assistant through MQTT, so it is not as tightly integrated into Home Assistant as ZHA.

This page explains which Zigbee adapter to use, how a Zigbee network works, and how to avoid problems when you add devices.

## Zigbee adapters

A Zigbee adapter, also called a Zigbee coordinator, connects your Zigbee network to Home Assistant. ZHA supports many Zigbee coordinators available from different manufacturers, as long as the coordinator is compatible with the [zigpy](https://github.com/zigpy/zigpy) library.

### Recommended: official Home Assistant hardware

Official Home Assistant hardware is the recommended choice for ZHA. It is designed and built by Nabu Casa, a commercial partner of the [Open Home Foundation](https://www.openhomefoundation.org), together with the team at Home Assistant responsible for Zigbee. The Zigbee firmware is maintained by that same team, with optimizations for ZHA and support for large Zigbee networks. You can keep it up to date from within Home Assistant.

- [Home Assistant Connect ZBT-2](/connect/zbt-2/): USB adapter. If you are setting up a new Zigbee network, this is the one to get.
- Home Assistant Connect ZBT-1: USB adapter. Discontinued and replaced by the Connect ZBT-2, but fully supported if you already have one.
- Home Assistant Yellow: hub with a built-in Zigbee radio. Currently out of stock, but fully supported if you already have one.

{% tip %}
Home Assistant Green does not have a built-in Zigbee radio. To use ZHA with Green, or with any other computer running Home Assistant, add a Zigbee adapter such as the [Home Assistant Connect ZBT-2](/connect/zbt-2/).
{% endtip %}

To place your Connect ZBT-2 somewhere else in your home, away from the system that runs Home Assistant, you can plug it into a [Home Assistant Connect AUX-2](/connect/aux-2/). The Connect AUX-2 then connects the Connect ZBT-2 to Home Assistant over your network. Use a wired Ethernet connection for the Connect AUX-2.

### Other tested and compatible Zigbee adapters

The following adapters are made by other manufacturers. They are not official Home Assistant hardware, but they are known to work well with ZHA. Home Assistant does not update the firmware on these adapters. To keep them up to date, use the tools their manufacturer provides.

- Silicon Labs EmberZNet based radios using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus Model "ZBDongle-E" (EFR32MG21 variant)](https://itead.cc/product/zigbee-3-0-usb-dongle/)
  - [SMLIGHT SLZB-07](https://smlight.tech/product/slzb-07/) (EFR32MG21-based USB dongle)
- Texas Instruments based radios (via the [zigpy-znp](https://github.com/zigpy/zigpy-znp) library for zigpy)
  - [CC2652P/CC2652R/CC2652RB-based USB adapters flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
  - [CC1352P/CC1352R-based USB adapters flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
- dresden elektronik deCONZ based Zigbee radios (via the [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) library for zigpy)
  - [ConBee III (a.k.a. ConBee 3) USB adapter from dresden elektronik](https://phoscon.de/conbee3)

### Supported but not recommended Zigbee adapters

The following hardware is supported, but _not recommended_. Specific models and details are noted where available in each section.

{% details "List of hardware that is not recommended" %}

{% caution %}

- It is _not recommended_ to run a coordinator via **Serial-Proxy-Server** _(also called Serial-to-IP bridge or Ser2Net remote adapter)_ over:
  
  - **Wi-Fi**,
  - **WAN**, or
  - **VPN**

- The coordinator requires a stable, local connection to its serial port interface without drops in communication with the Zigbee gateway application running on the host computer.
- Serial protocols used by the coordinator do not have enough robustness, resilience, or fault tolerance to handle packet loss and latency delays that can occur over unstable connections.
{% endcaution %}

**Silicon Labs EmberZNet based radios using legacy hardware using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)**

- [Elelabs Zigbee USB Adapter](https://elelabs.com/products/elelabs-usb-adapter.html)/POPP ZB-Stick
  - It is suggested to [upgrade the EmberZNet NCP application firmware](https://github.com/Elelabs/elelabs-zigbee-ezsp-utility)
- [Elelabs Zigbee Raspberry Pi Shield](https://elelabs.com/products/elelabs-zigbee-shield.html)
  - It is suggested to [upgrade the EmberZNet NCP application firmware](https://github.com/Elelabs/elelabs-zigbee-ezsp-utility)
- [ITead Sonoff ZBBridge](https://itead.cc/product/sonoff-zbbridge/)
  - Note: [Wi-Fi-based bridges are not recommended for ZHA with EZSP radios](https://github.com/home-assistant/home-assistant.io/issues/17170).
  - These first need to be flashed with [Tasmota firmware and Silabs EmberZNet NCP EZSP UART Host firmware to use as Serial-to-IP adapter](https://www.digiblur.com/2020/07/how-to-use-sonoff-zigbee-bridge-with.html)
- [Nortek GoControl QuickStick Combo Model HUSBZB-1 (Z-Wave & Zigbee Ember 3581 USB Adapter)](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)
  - It is suggested to [upgrade the EmberZNet NCP application firmware](https://github.com/walthowd/husbzb-firmware)
- [Bitron Video/Smabit BV AV2010/10 USB-Stick](https://manuals.smabit.eu/len/av2010_10.html) with Silicon Labs Ember 3587
- Telegesis ETRX357USB/ETRX357USB-LR/ETRX357USB-LRS+8M
  - These first need to be [flashed with other EmberZNet firmware](https://github.com/walthowd/husbzb-firmware)

**Texas Instruments based radios using legacy hardware (via the [zigpy-znp](https://github.com/zigpy/zigpy-znp) library for zigpy)**

- [CC2538 USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/information/supported_adapters)
  - This is no longer recommended as it can only run deprecated (old/end-of-life) firmware.
- [CC2530/CC2531 USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/information/supported_adapters)
  - This is no longer recommended as it uses deprecated hardware and very old, end-of-life firmware.
  - This will not work properly if the Zigbee network has more than 15-20 devices.

**dresden elektronik deCONZ based Zigbee radios using legacy hardware (via the [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) library for zigpy)**

- [ConBee II (a.k.a. ConBee 2) USB adapter from dresden elektronik](https://phoscon.de/conbee2)
- [RaspBee II (a.k.a. RaspBee 2) Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee2)
- [ConBee USB adapter from dresden elektronik](https://phoscon.de/conbee)
- [RaspBee Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee)

**Digi XBee Zigbee based radios (via the [zigpy-xbee](https://github.com/zigpy/zigpy-xbee) library for zigpy)**

- [Digi XBee Series 3 (xbee3-24)](https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/2-4-ghz-rf-modules/xbee3-zigbee-3) and [Digi XBee Series S2C](https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/2-4-ghz-rf-modules/xbee-zigbee) modules
  - It is suggested to [upgrade XBee Series 3 and S2C to newest firmware using XCTU](https://www.digi.com/resources/documentation/Digidocs/90002002/Default.htm#Tasks/t_load_zb_firmware.htm)
- [Digi XBee Series 2 (S2)](https://www.digi.com/support/productdetail?pid=3430) modules
  - These first need to be [flashed with Zigbee Coordinator API firmware](https://www.digi.com/support/productdetail?pid=3430)

**ZiGate based radios (via the [zigpy-zigate](https://github.com/zigpy/zigpy-zigate) library for zigpy and require firmware 3.1d or later)**

- [ZiGate USB](https://zigate.fr/produit/zigate-usb/)
- [ZiGate USB-DIN](https://zigate.fr/produit/zigatev2-usb-din/)
- [PiZiGate (ZiGate Raspberry Pi module)](https://zigate.fr/produit/pizigatev2/)
- [ZiGate-Ethernet (Ethernet gateway board for PiZiGate)](https://zigate.fr/produit/zigate-ethernet/)
- [ZiGate + WiFi Pack](https://zigate.fr/produit/zigatev2-pack-wifi/)

{% enddetails %}

## How a Zigbee network works

- A Zigbee network can have only one Zigbee coordinator.
- The Zigbee coordinator can have multiple **Zigbee router devices** or **Zigbee end devices** connected.
- Each Zigbee router device can have multiple **Zigbee end devices** connected to it.
- A Zigbee device can only be connected to a single Zigbee network.
- Zigbee networks depend heavily on having multiple [Zigbee Router devices](#using-router-devices-to-add-more-devices) to expand coverage and increase device capacity.
- Router devices help pass messages to other nearby devices in the Zigbee network and therefore can improve range and increase the number of devices you can add.

### Using router devices to add more devices

Most mains-powered devices, such as many always-powered wall plugs or light bulbs in your Zigbee network, will automatically act as a Zigbee router device (sometimes also referred to as a Zigbee "signal repeater" or "range extender").

Because Zigbee should use a [wireless mesh network](https://en.wikipedia.org/wiki/Wireless_mesh_network) to be effective, you will need to add Zigbee router devices to increase the number of Zigbee devices that can be used in your Zigbee network, both in the total number of devices that can be added as well as the total range and coverage of the network. Some Zigbee router devices do a much better job at routing and repeating Zigbee signals and messages than some other devices. You should not have a setup where Zigbee router devices (for example, light bulbs) are often powered off. Zigbee router devices are meant to be always available.

All Zigbee coordinator firmware will only allow you to directly connect a certain number of devices. That limit is set for two reasons; firstly, to not overload the Zigbee coordinator, and secondly, to encourage your Zigbee network to quickly begin to use a "[mesh networking](https://en.wikipedia.org/wiki/Mesh_networking)" topology instead of only a "[star network](https://en.wikipedia.org/wiki/Star_network)" topology.

The total number of Zigbee devices that you can have on a Zigbee network depends on a few things. The Zigbee coordinator hardware and its firmware only play a larger role in Zigbee networks with a lot of devices. More important is the number of directly connected devices ("direct children") versus the number of routers that are connected to your Zigbee coordinator. The Zigpy library, which the ZHA {% term integration %} depends on, has an upper limit that is 32 direct children, but you can still have hundreds of Zigbee devices in total connected indirectly through routes via Zigbee router devices.

In this theoretical example, a CC2652-based Zigbee coordinator has three CC2530 Zigbee router devices for a total limit of 77 devices:

- Coordinator: 32 Zigbee End devices - 3 routers = 29
- Router one: + 16 devices
- Router two: + 16 devices
- Router three: + 16 devices
- Total device limit = **77 devices**

In practice, you will likely need to add a lot more Zigbee router devices than in this example to extend the coverage of the network to reach that many devices.

### About Zigbee channels

The Zigbee specification standards divide the 2.4&nbsp;GHz ISM radio band into 16 Zigbee channels (that is, distinct radio frequencies for Zigbee). For all Zigbee devices to be able to communicate, they must support the same Zigbee channel (that is, the Zigbee radio frequency) that is set on the Zigbee Coordinator as the channel to use for its Zigbee network. Not all Zigbee devices support all Zigbee channels. Channel support usually depends on the age of the hardware and firmware, as well as on the device's power ratings.

The general recommendation is to only use channels 15, 20, or 25 to avoid interoperability problems with Zigbee devices. Not only because there is less chance of Wi-Fi networks interfering too much with the Zigbee network on other channels, but also because not all Zigbee devices support all channels.

To change the channel of your Zigbee network, refer to [Defining the Zigbee channel to use](/integrations/zha/#defining-the-zigbee-channel-to-use).

## Zigbee terminology

- **Zigbee network**: A mesh-network of devices with low-power digital radios using a low-bandwidth communication protocol.
- **Zigbee coordinator**: A hardware radio adapter (typically a USB dongle) that plugs directly into the same computer running your Home Assistant installation.
- **Zigbee router device**: A hardware device that is always mains-powered (AC) such as outlets or fans.
- **Zigbee end device**: A hardware device that is typically battery-powered (DC) such as remotes or motion sensors.
- **Zigbee Green Power device**: A hardware device without a battery that powers itself from the energy of a button press or its surroundings, such as some light switches.
- **Zigbee group**: A collection of two or more Zigbee devices of the same type, different from Home Assistant's [Groups](/integrations/group/).

## Troubleshooting

For how to avoid interference and improve the range of your Zigbee network, refer to [Zigbee interference avoidance and network range/coverage optimization](/integrations/zha/#zigbee-interference-avoidance-and-network-rangecoverage-optimization).

### Best practices to avoid pairing/connection difficulties

If you experience problems pairing a device, verify that you follow best practices to avoid pairing/connection issues:

1. Reduce network interference:
    - Check that your setup and environment are optimized to avoid interference.
    - Interference avoidance is an extremely important topic on its own. Review the tips in [Zigbee interference avoidance and network range/coverage optimization](/integrations/zha/#zigbee-interference-avoidance-and-network-rangecoverage-optimization).
2. Strengthen your network:
    - Check that you have enough Zigbee router devices (Zigbee signal repeaters or range extenders).
    - If you do not have any, you should add additional mains-powered devices to serve as Zigbee routers.
    - Aim to start with mains-powered devices before adding battery-operated devices. 
      - A "weak" Zigbee network mesh may prevent some devices from being paired (such as a device being too far from a Zigbee router or coordinator). 
    - Zigbee router devices are also needed to increase the maximum of devices that can be connected to your Zigbee mesh network.
    - Some Zigbee devices are not fully compatible with all brands of Zigbee router devices. 
      - Xiaomi/Aqara devices known not to work with Zigbee router devices from Centralite, General Electrics, Iris, Ledvance/OSRAM, LIGHTIFY/Sylvania, Orvibo, PEQ, Securifi, and SmartThings/Samsung. 
    - Better results can usually be achieved by using mains-powered devices IKEA and Nue/3A Home or dedicated DIY routing devices based on Texas Instruments CC253x/CC26x2 and XBee Series 2/3 Zigbee radios.
3. Plan your pairing:
    - Try to pair Zigbee devices where you intend to use them:
      - Avoid pairing next to the Zigbee coordinator if you intend to move its location afterward.
      - Pairing a device next to the coordinator and moving it later can result in degraded connections.
    - If the device you want to add has been previously paired to another network, you will likely need to manually factory-reset the device to add/pair it.
    - Some battery-operated Zigbee devices are known to have problems with pairing if they have low battery voltage.
      - Some people have reported replacing the battery on their newly received Xiaomi/Aqara devices solved pairing issues.
4. Be patient:
    - The pairing of some Zigbee devices may require multiple or repeated attempts.
    - Some devices, such as those from Xiaomi/Aqara, may not be fully compliant with Zigbee standards and may therefore require many paring attempts over 10-20 minutes or longer.
