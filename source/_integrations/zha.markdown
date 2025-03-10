---
title: Zigbee Home Automation
description: Instructions on how to integrate your Zigbee Home Automation (ZHA) devices within Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
  - Button
  - Climate
  - Cover
  - Fan
  - Hub
  - Light
  - Lock
  - Number
  - Select
  - Sensor
  - Siren
  - Switch
  - Update
ha_release: 0.44
ha_iot_class: Local Polling
featured: true
ha_config_flow: true
ha_codeowners:
  - '@dmulcahey'
  - '@adminiuga'
  - '@puddly'
  - '@TheJulianJES'
ha_domain: zha
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
  - climate
  - cover
  - device_tracker
  - diagnostics
  - fan
  - light
  - lock
  - number
  - select
  - sensor
  - siren
  - switch
  - update
ha_zeroconf: true
ha_integration_type: integration
---

The ZHA (Zigbee Home Automation) {% term integration %} allows you to wirelessly connect many off-the-shelf [Zigbee-based devices](https://csa-iot.org/csa-iot_products/) directly to Home Assistant, using one of the many available Zigbee coordinators.

ZHA uses an open-source Python library implementing a hardware-independent Zigbee stack called [zigpy](https://github.com/zigpy/zigpy). All coordinators compatible with zigpy can be used with ZHA.

This {% term integration %} currently supports the following device types within Home Assistant:

- [Alarm control panel](/integrations/alarm_control_panel/)
- [Binary sensor](/integrations/binary_sensor/)
- [Button](/integrations/button/)
- [Climate](/integrations/climate/) (beta)
- [Cover](/integrations/cover/)
- [Fan](/integrations/fan/)
- [Light](/integrations/light/)
- [Lock](/integrations/lock/)
- [Number](/integrations/number/) (i.e. analog output)
- [Select](/integrations/select/)
- [Sensor](/integrations/sensor/)
- [Siren](/integrations/siren/)
- [Switch](/integrations/switch/)
- [Update](/integrations/update/)

In addition, it has support for "Zigbee groups" that enable native on-device grouping of multiple Zigbee lights, switches, and fans that enable controlling all entities for those devices in those groups with one command. At least two entities must be added to a Zigbee group inside the ZHA {% term integration %} before a group entity is created. There is also support for native on-device binding. Refer to the [Zigbee groups and binding devices](#zigbee-groups-and-binding-devices) section for more information.

## Introduction

This ZHA integration is a hardware-independent Zigbee gateway implementation that can replace most proprietary Zigbee gateways/bridges/hubs/controllers. Zigbee is a low-bandwidth communication protocol that relies on using small low-power digital radios to connect compatible devices to local Zigbee wireless private area networks. ZHA will create a single Zigbee network to which you can then pair/join most Zigbee-based devices that are made for home automation and lighting.

Before installing the ZHA integration in Home Assistant, you need to connect a Zigbee Coordinator radio adapter that will connect to your Zigbee network. Those normally come in the form of a USB dongle that plugs directly into the same computer that is running your Home Assistant installation. The ZHA integration is compatible with many different "Zigbee Coordinator" adapters from various manufacturers. Be sure to [note the recommendations in the respective sections below before buying a Zigbee Coordinator](#compatible-hardware). A Zigbee network always needs to have one Zigbee Coordinator (it can never have more than one), and Zigbee devices can never be connected to more than a single Zigbee network, however, a Zigbee network can have multiple "Zigbee Router" devices and "Zigbee End Device" products.

Once ZHA has been set up with a Zigbee Coordinator it will automatically create a Zigbee network and you will be able to join/pair any Zigbee Router devices and Zigbee End Devices. With only a few [limitations](#limitations), most devices will join/pair directly regardless of brand and manufacturer. Technically almost all devices that are compliant with the official Zigbee specifications should offer interoperability, though a newer Zigbee Coordinator with support for later firmware often offers better compatibility with both new and older devices. Still, be aware that [all functionality might not always be supported or exposed for every device out-of-the-box](#knowing-which-devices-are-supported) as some devices that use manufacturer-specific extensions to add non-standard functions and features could sometimes need [device-specific code to fully work with ZHA](#how-to-add-support-for-new-and-unsupported-devices).

Note that because Zigbee relies on "mesh networking" technology it depends heavily on having [Zigbee Router devices](#using-router-devices-to-add-more-devices) to expand the network coverage and extend its size. These are always mains-powered devices that route messages to other devices that are located close to them within the Zigbee network mesh to improve the range and increase the total amount of devices you can add.  You should therefore make sure that you add many Zigbee Router devices and not just Zigbee End Devices or else its network mesh connection routes will be limited due to the short range and poor wall penetration of Zigbee radio signals. It is highly recommended that you read and follow all the general tips below about [Zigbee interference avoidance and network range/coverage optimization](#zigbee-interference-avoidance-and-network-rangecoverage-optimization).

## Compatible hardware

The hardware-independent design of this integration provides support for many Zigbee coordinators available from different manufacturers, as long as the coordinator is compatible with the [zigpy](https://github.com/zigpy/zigpy) library.

### Zigbee 3.0 support

Some coordinators may not support firmware capable of Zigbee 3.0, but they can still be fully functional and feature-complete for your needs. Support for Zigbee 3.0 depends primarily on your coordinator hardware and firmware.

{% note %}
Newer coordinators generally support Zigbee 3.0 firmware, but it is up to the manufacturer to make such firmware available to them. If your coordinator was shipped with an older firmware version, you may want to manually upgrade the firmware.
{% endnote %}

### Recommended Zigbee radio adapters and modules

- Silicon Labs EmberZNet based radios using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)
  - [Home Assistant Connect ZBT-1](/connectzbt1/) (EFR32MG21-based USB dongle)
  - [Home Assistant Yellow](/yellow/) with integrated MGM210P radio, which is based on the EFR32MG21
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus Model "ZBDongle-E" (EFR32MG21 variant)](https://itead.cc/product/zigbee-3-0-usb-dongle/)
  - [SMLIGHT SLZB-07](https://smlight.tech/product/slzb-07/) (EFR32MG21-based USB dongle)
- Texas Instruments based radios (via the [zigpy-znp](https://github.com/zigpy/zigpy-znp) library for zigpy)
  - [CC2652P/CC2652R/CC2652RB USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
  - [CC1352P/CC1352R USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
- dresden elektronik deCONZ based Zigbee radios (via the [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) library for zigpy)
  - [ConBee III (a.k.a. ConBee 3) USB adapter from dresden elektronik](https://phoscon.de/conbee3)

### Other supported but not recommended Zigbee radio adapters or modules

The following hardware is supported, but _not recommended_. Specific models and details are noted where available in each section.

{% details "List of hardware that is not recommended" %}

{% caution %}

- It is **not recommended** to run a coordinator via **Serial-Proxy-Server** _(also called Serial-to-IP bridge or Ser2Net remote adapter)_ over:
  
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
  - Note: [WiFi-based bridges are not recommended for ZHA with EZSP radios](https://github.com/home-assistant/home-assistant.io/issues/17170).
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

If you find an opportunity to improve this information, refer to the section on how to [add support for new and unsupported devices](#how-to-add-support-for-new-and-unsupported-devices).

## Configuration requirements

Be sure to connect a compatible radio module and restart Home Assistant before proceeding with configuration.

{% include integrations/config_flow.md %}

In the popup:

- Serial Device Path - List of detected serial ports on the system. You need to pick one to which your
radio is connected
- Submit

Press `Submit` and the {% term integration %} will try to detect radio type automatically. If unsuccessful, you will get
a new pop-up asking for a radio type. In the pop-up:

- Radio Type

| Radio Type | Zigbee Radio Hardware                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `ezsp`     | Silicon Labs EmberZNet protocol (e.g., Home Assistant SkyConnect, Elelabs, HUSBZB-1, Telegesis) |
| `deconz`   | dresden elektronik deCONZ protocol (e.g., ConBee I/II, RaspBee I/II)                            |
| `znp`      | Texas Instruments (e.g., CC253x, CC26x2, CC13x2)                                                |
| `zigate`   | ZiGate Serial protocol (e.g., ZiGate USB-TTL, PiZiGate, ZiGate WiFi)                            |
| `xbee`     | Digi XBee ZB Coordinator Firmware protocol (e.g., Digi XBee Series 2, 2C, 3)                    |

- Submit

Press `Submit` to save radio type and you will get a new form asking for port settings specific for this
radio type. In the pop-up:

- Serial device path
- port speed (not applicable for all radios)
- data flow control (not applicable for all radios)

Most devices need at the very least the serial device path, like `/dev/ttyUSB0`, but it is recommended to use
device path from `/dev/serial/by-id` folder,
e.g., `/dev/serial/by-id/usb-Silicon_Labs_HubZ_Smart_Home_Controller_C0F003D3-if01-port0`
A list of available device paths can be found in {% my hardware title="Settings > System > Hardware" %} > **dot menu** > **All Hardware**.

Press `Submit`. The success dialog will appear or an error will be displayed in the popup. An error is likely if Home Assistant can't access the USB device or your device is not up to date. Refer to [Troubleshooting](#troubleshooting) below for more information.

### ZiGate or Sonoff ZBBridge devices

If you are use ZiGate or Sonoff ZBBridge you have to use some special usb_path configuration:

- ZiGate USB TTL or DIN: `/dev/ttyUSB0` or `auto` to auto discover the zigate
- PiZigate : `pizigate:/dev/ttyS0`
- Wifi Zigate : `socket://[IP]:[PORT]` for example `socket://192.168.1.10:9999`
- Sonoff ZBBridge : `socket://[IP]:[PORT]` for example `socket://192.168.1.11:8888`

### Discovery via USB or Zeroconf

Some devices can be auto-discovered, which can simplify the ZHA setup process. The following devices have been tested with discovery and offer a quick setup experience.

{% details "USB discovery devices" %}

- **Bitron**
  - [Bitron Video/SMaBiT BV AV2010/10](https://manuals.smabit.eu/len/av2010_10.html)
    - Identifier: `10C4:8B34`
- **ConBee**
  - [ConBee II](https://phoscon.de/conbee2)
    - Identifier: `1CF1:0030`
  - [ConBee III](https://phoscon.de/conbee3)
    - Identifier: `0403:6015`
- **ITead**
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus V2 Model "ZBDongle-E" (EFR32MG21 variant)](https://itead.cc/product/zigbee-3-0-usb-dongle/)
    - Identifier: `1A86:55D4`
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus Model "ZBDongle-P" (CC2652P variant)](https://itead.cc/product/sonoff-zigbee-3-0-usb-dongle-plus)
    - Identifier: `10C4:EA60`
- **Nortek**
  - [Nortek HUSBZB-1](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)
    - Identifier: `10C4:8A2A`
- **slae.sh**
  - [slae.sh CC2652RB development stick](https://slae.sh/projects/cc2652/)
    - Identifier: `10C4:EA60`
- **SMLIGHT**
  - [SMLIGHT SLZB-07](https://smlight.tech/product/slzb-07/)
    - Identifier: `10C4:EA60`
- **Tube**
  - [Tube’s EFR32 Pro Ethernet/Serial Coordinator](https://www.tubeszb.com/)
    - Identifier: `10C4:EA60`
- **ZigStar**
  - [ZigStar Stick (CC2652 + CH340B variant)](https://zig-star.com/projects/zigbee-stick-v4/)
    - Identifier: `1A86:7523`
  - [ZigStar Coordinators](https://zig-star.com/)
    - Identifier: `1A86:7523`

{% enddetails %}

{% details "Zeroconf discovery devices" %}

- **cod.m**
  - [cod.m Zigbee Coordinator](https://docs.codm.de/zigbee/coordinator/)
    - Identifier: `czc._tcp.local.`
- **SMLIGHT**
  - [SMLIGHT SLZB-06 POE Zigbee LAN WiFi USB Adapter](https://smlight.tech/product/slzb-06/)
    - Identifier: `slzb-06.local.`
- **Tube**
  - [Tube's CC2652P2 USB-powered Zigbee to Ethernet Serial Coordinator](https://www.tubeszb.com/)
    - Identifier: `tube_zb_gw_cc2652p2.local.`
  - [Tube's CC2652P2 PoE-powered Zigbee to Ethernet Serial Coordinator](https://www.tubeszb.com/)
    - Identifier: `tube_zb_gw_cc2652p2_poe.local.`
  - [Tube's EFR32 Based Zigbee to Ethernet Serial Coordinator](https://www.tubeszb.com/)
    - Identifier: `tube_zb_gw_efr32.local.`
- **XZG**
  - [XZG - Universal Firmware for Zigbee Gateway](https://xzg.xyzroe.cc/)
    - Identifier: `xzg.local.`
- **ZigStar**
  - [ZigStar UZG Universal Zigbee Gateway (UZG-01)](https://uzg.zig-star.com)
    - Identifier: `uzg-01._tcp.local.`
  - [ZigStar LAN/POE Coordinators](https://zig-star.com/projects/zigbee-gw-lan/)
    - Identifier: `zigstargw.local.`

{% enddetails %}

Additional devices in the [Compatible hardware](#compatible-hardware) section may be discoverable, however, only devices that have been confirmed discoverable are listed above.

### OTA updates of Zigbee device firmware

The ZHA integration has the ability to perform OTA (over-the-air) firmware updates of Zigbee devices. This feature is enabled by default. As it uses standard [Update](/integrations/update/) entities in Home Assistant, users will get a UI notification if and when an OTA firmware update is available for a specific device, with an option to initiate the update or ignore that specific update for the device.

To see OTA updates for a device, it must support OTA updates and firmware images for the device must be publicly provided by the manufacturer. ZHA currently only includes OTA providers for a few manufacturers that provide these updates publicly.

**Included manufacturers:**

- IKEA
- Inovelli
- Ledvacnce/OSRAM
- SALUS/Computime
- Sonoff/iTead
- Third Reality

{% warning %}
Before updating a device, you should search for any disadvantages or if you even need to install an available update. Some firmware updates can break features you might use (e.g. group binding for IKEA devices). Some updates might also require changes to ZHA. In rare cases, you can even brick devices by installing a firmware update.
{% endwarning %}

### Global Options

There are a few global options available once ZHA has been configured. Press **Configure** to access these settings.

The options are as follows:

{% configuration_basic %}
Enable enhanced light color/temperature transition from an off-state:
  description: "For older non Zigbee 3.0 lights, this still allows a proper transition from an off-state to a new color (without seeing the old color). _(default: off)_"
Enable enhanced brightness slider during light transition:
  description: "This avoids seeing intermediary brightness state when turning on lights with a transition. _(default: on)_"
Group members assume state of group:
  description: "When using ZHA groups, turning on a ZHA group light makes the ZHA group members optimistically change their state to \"on\", instead of waiting and polling the lights when off. _(default: on)_"
{% endconfiguration_basic %}

### Configuration - YAML

For more advanced configuration, you can modify {% term "`configuration.yaml`" %} and restart Home Assistant

{% configuration %}
database_path:
  description: _Full_ path to the database which will keep persistent network data.
  required: false
  type: string
enable_quirks:
  description: Enable quirks mode for devices where manufacturers didn't follow specs.
  required: false
  type: boolean
  default: true
custom_quirks_path:
  description: Full path to a directory containing custom quirk modules that will take precedence over any built-in quirks matching a device.
  required: false
  type: string
{% endconfiguration %}

#### Advanced OTA configuration

OTA for a few manufacturers is enabled by default, currently Ledvance, Sonoff, Inovelli, and ThirdReality. Other manufacturers are supported but disabled by default because their updates may change or remove device functionality, may require you to reconfigure devices, or are contributed by the community and may be minimally tested.

Refer to the [zigpy documentation for OTA configuration](https://github.com/zigpy/zigpy/wiki/OTA-Configuration) for more information on additional OTA providers.

#### Defining Zigbee channel to use

Tip! Before considering to change to an other Zigbee channel on an existing Zigbee network, it is highly recommended that you read through the two segments under the [troubleshooting](#troubleshooting) section below about _Best practices to avoid pairing/connection difficulties_ and _Zigbee interference avoidance and network range/coverage optimization_. These sections provide prerequisite information and advice on how to achieve the best possible Zigbee network in your environment.

ZHA prefers to use Zigbee channel 15 by default. You can change this using YAML configuration, but this only works
if there's no existing network. To change the channel for an existing network, radio has to be factory reset and a new network to be formed. This requires re-pairing of all the devices.

```yaml
zha:
  zigpy_config:
    network:
      channel: 15             # What channel the radio should try to use.
      channels: [15, 20, 25]  # Channel mask
```

{% note %}
The best practice is to not change the Zigbee channel from the ZHA default.
{% endnote %}

The related troubleshooting segments mentioned above will, among other things, inform that if you have issues with overlapping frequencies between Wi-Fi and Zigbee, then it is usually better to first only try changing and setting a static Wi-Fi channel on your Wi-Fi router or all your Wi-Fi access points (instead of just changing to another Zigbee channel).

MetaGeek Support has a good reference article about channel selection for [Zigbee and WiFi coexistence](https://support.metageek.com/hc/en-us/articles/203845040-ZigBee-and-WiFi-Coexistence).

The Zigbee specification standards divide the 2.4&nbsp;GHz ISM radio band into 16 Zigbee channels (i.e. distinct radio frequencies for Zigbee). For all Zigbee devices to be able to communicate, they must support the same Zigbee channel (i.e. Zigbee radio frequency) that is set on the Zigbee Coordinator as the channel to use for its Zigbee network. Not all Zigbee devices support all Zigbee channels. Channel support usually depends on the age of the hardware and firmware, as well as on the device's power ratings.

The general recommendation is to only use channels 15, 20, or 25 in order to avoid interoperability problems with Zigbee devices. Not only because there is less chance of Wi-Fi networks interfering too much with the Zigbee network on other channels, but also because not all Zigbee devices support all channels. Some devices, for example, are limited to only being compatible with ZLL (Zigbee Light Link) channels. It is therefore especially not recommended to use Zigbee channels 11, 24, 25, or 26 on your Zigbee coordinator. These Zigbee channels are commonly only supported by relatively modern Zigbee hardware devices with newer Zigbee firmware. If using those channels, your coordinator may not be usable with older Zigbee devices.

#### Modifying the device type

As not all device manufacturers follow the Zigbee standard, at times a device can be incorrectly classified. For example, a switch could be classified as a light.

To correct the device type, also called domain, add the following to your {% term "`configuration.yaml`" %} and restart Home Assistant:

```yaml
zha:
  device_config:
    84:71:27:ff:fe:93:17:24-1:    # format: {ieee}-{endpoint_id}
      type: "switch"              # corrected device type
```

`{ieee}` is the device hardware address which can be read from the Home Assistant UI when looking at _Device info_. From device info, you can find the `{endpoint_id}` by viewing the _Zigbee device signature_.

## Actions

### Action `zha.permit`

To add new devices to the network, call the `permit` action on the `zha` domain. Do this by clicking the **Actions** tab in **Developer tools** and typing `zha.permit` in the **Action** dropdown box. Next, follow the device instructions for adding, scanning or factory reset.

This action opens network for joining new devices.

| Data       | Optional | Description                                                                    |
| ---------- | -------- | ------------------------------------------------------------------------------ |
| `duration` | yes      | For how long to allow new devices to join, default 60s                         |
| `ieee`     | yes      | The IEEE address of an existing device via which the new device is to be added |

To join a new device using an install code (ZB3 devices) use the following data attributes (must use parameters only
from the same group:

| Data           | Parameter Group | Description                                                         |
| -------------- | --------------- | ------------------------------------------------------------------- |
| `src_ieee`     | install_code    | The IEEE address of the joining ZB3 device. Use with `install_code` |
| `install_code` | install_code    | Install Code of the joining device. Use with `src_ieee`             |
| `qr_code`      | qr_code         | QR code containing IEEE and Install Code of the joining ZB3 device  |

{% note %}
  Currently `qr_code` supports QR Install Codes from:
    - Aqara
    - Bosch
    - Consciot
    - Embrighten
{% endnote %}

### Action `zha.remove`

This action removes an existing device from the network. You can find the IEEE address of the device on the device card of Zigbee devices. An example of an IEEE address data parameter format is `00:0d::6f:00:05:7d:2d:34`.

| Data   | Optional | Description                          |
| ------ | -------- | ------------------------------------ |
| `ieee` | no       | IEEE address of the device to remove |

### Action `zha.set_lock_user_code`

This action sets a lock code on a Zigbee lock.

| Data        | Optional | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `code_slot` | no       | Which lock code slot to store the code. Ex. 1-32 will work for Kwikset 954 |
| `user_code` | no       | Code to set on the lock. Ex. Kwikset accepts numbers 4-8 digits in length  |

### Action `zha.clear_lock_user_code`

This action clears a lock code from a Zigbee lock.

| Data        | Optional | Description                   |
| ----------- | -------- | ----------------------------- |
| `code_slot` | no       | Which lock code slot to clear |

### Action `zha.enable_lock_user_code`

This action enables a lock code on a Zigbee lock.

| Data        | Optional | Description                    |
| ----------- | -------- | ------------------------------ |
| `code_slot` | no       | Which lock code slot to enable |

### Action `zha.disable_lock_user_code`

This action disables a lock code on a Zigbee lock.

| Data        | Optional | Description                     |
| ----------- | -------- | ------------------------------- |
| `code_slot` | no       | Which lock code slot to disable |

## Adding devices

Tip! It is highly recommended that you read through the two segments under the troubleshooting section below about _Best practices to avoid pairing/connection difficulties_ and _Zigbee interference avoidance and network range/coverage optimization_ for general prerequisite knowledge and advice on how to achieve the best possible Zigbee network in your environment.

**To add a new Zigbee device:**

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **Zigbee Home Automation** {% term integration %}. Then, select **Configure**.
3. To start a scan for new devices, on the bottom right corner of the screen, select **Add device**.
4. Reset your Zigbee devices to factory default settings according to the device instructions provided by the manufacturer (e.g., turn on/off lights up to 10 times; switches usually have a reset button/pin). It might take a few seconds for the devices to appear. You can click on **Show logs** for more verbose output.
5. Once the device is found, it will appear on that page and will be automatically added to your devices. You can optionally change its name and add it to an area (you can change this later). You can search again to add another device, or you can go back to the list of added devices.

### Using router devices to add more devices

Most mains-powered devices, e.g., many always-powered wall plugs or light bulbs in your Zigbee network will automatically act as a Zigbee router device (sometimes also referred to as a Zigbee "signal repeater" or "range extender").

Because Zigbee should use a [wireless mesh network](https://en.wikipedia.org/wiki/Wireless_mesh_network) to be effective, you will need to add Zigbee router devices to increase the number of Zigbee devices that can be used in your Zigbee network, both in the total number of devices that can be added as well as the total range and coverage of the network. Some Zigbee router devices do a much better job at routing and repeating Zigbee signals and messages than some other devices. You should not have a setup where Zigbee router devices (e.g. light bulbs) are often powered-off.  Zigbee router devices are meant to be always available.

All Zigbee coordinator firmware will only allow you to directly connect a certain amount of devices. That limit is set for two reasons; firstly, to not overload the Zigbee coordinator, and secondly, to encourage your Zigbee network to quickly begin to utilize a "[mesh networking](https://en.wikipedia.org/wiki/Mesh_networking)" topology instead of only a "[star network](https://en.wikipedia.org/wiki/Star_network)" topology.

The total number of Zigbee devices that you can have on a Zigbee network depends on a few things. The Zigbee coordinator hardware and its firmware only play a larger role in Zigbee networks with a lot of devices. More important is the number of directly connected devices ("direct children") versus the number of routers that are connected to your Zigbee coordinator. The Zigpy library, which the ZHA {% term integration %} depends on, has an upper limit that is 32 direct children, but you can still have hundreds of Zigbee devices in total connected indirectly through routes via Zigbee router devices.

In this theoretical example, a CC2652-based Zigbee coordinator has three CC2530 Zigbee router devices for a total limit of 77 devices:

- Coordinator: 32 Zigbee End devices - 3 routers = 29
- Router one: + 16 devices
- Router two: + 16 devices
- Router three: + 16 devices
- Total device limit = **77 devices**

In practice, you will likely need to add a lot more Zigbee router devices than in this example in order to extend the coverage of the network to reach that many devices.

## Zigbee groups and binding devices

ZHA supports the creation of Zigbee groups (different from Home Assistant's [Group](/integrations/group/) integration), as well as binding devices to each other. Groups and device binding can be set up independently of each other, but they can be also used in combination (such as binding a device to another group of devices).

### Groups

A Zigbee group is a collection of two or more Zigbee lights, switches, or fans. A Zigbee group can then be controlled using only one command/entity.

{% note %}
While using a native Zigbee group instead of Home Assistant's [Group](/integrations/group/) integration can improve the visual responsiveness, the broadcast commands issued can flood the Zigbee network if issued repeatedly.
{% endnote %}

#### To create a Zigbee group

1. Select the **Configure** button on the ZHA integration page,
2. Choose **Groups** and select **Create Group**,
3. Enter a name for the group,
4. Select which devices to include in the group:
    - At least two devices must be added to a Zigbee Group before a group entity is created.
    - The group should consist of products of the same device type (all lights, all switches, or all fans).

### Binding

Binding a Zigbee device attaches an endpoint from one device to an endpoint of another device (or group).

Commands sent between bound devices bypass ZHA (even when ZHA is not active) and directly control the targeted device. Binding devices can allow for faster response times and smoother control.

Before binding devices, note the following:

- ZHA binds remotes to the Zigbee coordinator by default in order to forward click events to Home Assistant.
- Some remotes can only be bound to a single target; you might need to unbind the remote from the coordinator before binding it to another target.
- Not all devices support binding. Refer to the device manufacturer's documentation to confirm features.

#### To manage bindings of a Zigbee device

{% note %}
**This section only outlines how to manage bindings in general. It will not cover all use cases.**

Prerequisites and steps can vary depending on the device type, manufacturer, and your desired end result.
{% endnote %}

1. Navigate to the Zigbee device's configuration page,
2. In the options menu (the "three-dots" icon), select **Manage Zigbee device**,
3. Select the **Bindings** tab in the pop-up dialog,
4. Choose the device from the dropdown list of _Bindable devices_ (or _Bindable groups_),
5. Confirm the Bind or Unbind action:
   - To bind devices: select **Bind** (or **Bind group**), or
   - To unbind devices, select **Unbind** (or **Unbind group**).

## Backups and migration

The ZHA {% term integration %} performs automatic backups of your Zigbee network allowing you to restore/recover the network from a backup or migrate to a different Zigbee Coordinator (radio adapter).

After restoring a Home Assistant backup, you can reconfigure ZHA or migrate to a new Zigbee Coordinator without any loss of your settings or devices that were connected. This can be helpful if your current radio fails or a new radio adapter type/model comes out that you want to migrate to.

Manual backups can also be created from the configuration page under **Network Settings**.

### Migrating to a new Zigbee Coordinator adapter inside ZHA

ZHA supports migrating the Zigbee network between different Zigbee Coordinators based on chips from Silicon Labs, Texas Instruments, or ConBee/RaspBee if the backup was made from inside ZHA.

#### Prerequisites

To migrate your Zigbee network from one Zigbee Coordinator to another, confirm you meet the following requirements before proceeding with the migration process:

- The previous Zigbee Coordinator is used in the ZHA {% term integration %} and _not_ in deCONZ or MQTT.
- The radio type is one of the following:
  - ezsp (Silicon Labs EmberZnet)
  - znp (Texas Instruments Z-Stack ZNP)
  - deCONZ (ConBee/RaspBee from dresden elektronik)
    - For deCONZ (ConBee/RaspBee) radio adapters, make sure it is running [firmware 0x26700700 (from 2021-08-18)](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Firmware-Changelog) or later.

#### To migrate to a new Zigbee coordinator radio inside ZHA

1. Go to **{% my integrations title="Settings > Devices & services" %}** and select the ZHA {% term integration %}. Then select **Configure**.
2. Under **Network settings**, select **Migrate radio**.
3. Reconfiguration of ZHA will start. Select **Submit**.
4. Under **Migrate or re-configure**, select **Migrate to a new radio**.
5. Select **Submit** to begin.
    - An automatic backup will be performed, the Zigbee Coordinator radio will be reset, and the backup will be automatically restored.
    - For combined Z-Wave and Zigbee radios, like the HUSBZB-1 adapter, only the Zigbee radio portion is reset.
    - You may now unplug the old adapter, or you may leave the old radio adapter plugged in (for example, if the adapter is a combined Z-Wave adapter).
6. Plug in the new Zigbee Coordinator radio adapter.
    - Select **Submit** after confirming the new Zigbee Coordinator radio adapter is properly connected.
    - To minimize interference:
      - Use a USB extension cable,
      - Use a USB 2.0 port or a powered USB 2.0 hub,
      - Keep the Zigbee stick away from USB 3.0 devices.
7. Start the backup restore process:
    - Select the new Zigbee radio from the list of serial ports and select **Next**.
    - A migration can be resumed if a reboot is required, such as when troubleshooting or if new hardware is plugged in.
      - To resume, go to **Network Settings**, select **Re-configure the current radio**, choose the new radio and proceed.
8. Under **Network Formation**, select **Restore an automatic backup**.
9. Under **Restore Automation Backup**, choose the latest automatic backup and select **Submit**.
10. If the new radio requires overwriting the IEEE address (the unique MAC address), you will see the prompt for **Overwrite Radio IEEE Address**.
    - Check the **Permanently replace the radio IEEE address** box and click **Submit**.
      - Selecting this option is required for the migration process to complete successfully.
      - Overwriting the IEEE address may take a while.
    - Both the old and new Zigbee Coordinators will now have the same Zigbee IEEE address.
    - You should not operate the old adapter in the same area unless you change its Zigbee IEEE address.
    - If you do not migrate the Zigbee IEEE address from the old Zigbee Coordinator radio, you will have to reconnect many of your devices to keep them working.
11. Finally, a **Success!** message should pop up with information that all options were successfully saved.
    - Select **Finish** to confirm.

{% important %}
You will not be able to control your existing Zigbee devices until the new coordinator fully joins the network after the migration. **This can take a few minutes.**

If some existing devices do not resume normal functions after some time, try power-cycling them to attempt rejoining to the network.
{% endimportant %}

## Troubleshooting

Please note the current limitations and follow the instructions in this troubleshooting section.

{% note %}
To help resolve any kinks or compatibility problems, report bugs as issues with debug logs.
{% endnote %}

### Limitations

ZHA only supports connecting a single dedicated Zigbee Coordinator radio adapter or module with a single Zigbee network. The Zigbee Coordinator cannot already be connected or used by any other application. Devices currently or previously connected to another Zigbee implementation will need to be reset to their factory default settings before they can be paired/joined to ZHA. Refer to each device manufacturer's documentation for reset steps.

Any Zigbee device can only be connected to a single Zigbee Coordinator (only one Zigbee gateway). This is a limitation in the Zigbee protocol specifications, governed by the [CSA (Connectivity Standards Alliance)](https://csa-iot.org/all-solutions/zigbee/), applying to all Zigbee implementations and not just the ZHA implementation.

Support for commissioning Zigbee 3.0 devices via "Install Code" or "QR Code" via the `zha.permit` action has so far only been implemented for 'ezsp' (Silicon Labs EmberZNet) or 'znp' (Texas Instruments) radio type in ZHA. Other radio types are missing support in their respective [radio libraries for zigpy](https://github.com/zigpy/) or manufacturer's firmware commands/APIs.

ZHA currently does not support devices that can only use the ZGP ("Zigbee Green Power") profile which is used in a few batteryless self-powered or energy harvesting devices, (such as for example; Philips Hue Click, Philips Hue Tap, and some "Friends of Hue" partnership switches).

ZHA does not currently support devices that can only use the ZSE ("Zigbee Smart Energy") profile, that is however due to the "Zigbee SE" specification not being part of the standard Zigbee 3.0 specification and thus not implemented in most of the Zigbee protocol stacks that are commonly available Zigbee Coordinator radio adapters and modules.

### Knowing which devices are supported

Home Assistant's ZHA {% term integration %} supports all standard Zigbee device types. It should be compatible with most Zigbee devices as long as they fully conform to the official ZCL (Zigbee Cluster Library) specifications defined by the [CSA (Connectivity Standards Alliance, formerly the Zigbee Alliance)](https://csa-iot.org/all-solutions/zigbee/). There is therefore no official compatibility list of devices that will work out-of-the-box with the ZHA {% term integration %}
Not all hardware manufacturers always fully comply with the standard specifications. Sometimes, they may also implement unique features. For this reason, some Zigbee devices pair/join fine with ZHA but then only show none or only a few entities in the {% term integration %}. Developers can work around most such interoperability issues by adding conversion/translation code in custom device handlers. For more information, refer to the section below on [How to add support for new and unsupported devices](#how-to-add-support-for-new-and-unsupported-devices).

For clarification, normally only devices that do not fully conform to CSA's ZCL specifications that will not present all standard attributes as entities for configuration in the ZHA {% term integration %}. Zigbee devices that only use the standard clusters and attributes that are Zigbee specifications set by the Connectivity Standards Alliance should not need custom device handlers.

Before continuing with this section: If a device does not join/pair at all, read the troubleshooting sections about how to avoid pairing/connection difficulties, interference avoidance, and network range/coverage optimization.

Tip to new Zigbee users: Checkout [blakadder's unofficial Zigbee Device Compatibility Repository](https://zigbee.blakadder.com). Anyone can help maintain the site by submitting device compatibility information to it. The repository contains independent community member's reports or device-specific pairing tips for several home automation gateway/bridge/hub software, including open-source Zigbee implementations, such as ZHA, Zigbee2MQTT, and Tasmota (Zigbee2Tasmota).

### How to add support for new and unsupported devices

If your Zigbee device pairs/joins successfully with the ZHA {% term integration %} but does not show all of the expected entities:

1. Try to re-pair/re-join the device several times.
2. Checkout the troubleshooting section.
3. Still not working? You may need a custom device handler. This handler will have exception handling code to work around device-specific issues.

For devices that do not follow the standard defined in the CSA's ZCL (Zigbee Cluster Library), the ZHA {% term integration %} relies on a project called "[ZHA Device Handlers (also known as "zha-quirk")](https://github.com/zigpy/zha-device-handlers)". It contains device-specific Python scripts called "quirks". These scripts can resolve compliance and interoperability issues by implementing on-the-fly conversion of custom Zigbee configurations or by implementing manufacturer-specific features for specific devices.

People familiar with other Zigbee gateway solutions for home automation may know similar concepts of using custom Zigbee device handlers/converters for non-standard devices. For example, [Zigbee2MQTT (and IoBroker) uses zigbee-herdsman converters](https://www.zigbee2mqtt.io/advanced/support-new-devices/01_support_new_devices.html) and [SmartThings Classics (Legacy) platform has Hub Connected Device Handlers](https://developer.smartthings.com/docs/devices/hub-connected/legacy).

If you do not want to develop such a "quirk" Python script yourself, you can submit a "device support request" as a new issue to the [ZHA Device Handlers project repository on GitHub](https://github.com/zigpy/zha-device-handlers/issues):

1. Sign in to GitHub.
2. Select **New issue** and follow the instructions.
    - New device support requests require the device signature + diagnostic information.
    - You may also need to actively help in further testing or provide additional information to the volunteering developers.

Note that submitting a new "device support request" does not guarantee that someone else will develop a custom "quirk" for ZHA. The project relies on volunteering developers. However, without "device support requests", the developers may not be aware that your specific Zigbee device is not working correctly in ZHA.

### Best practices to avoid pairing/connection difficulties

If you experience problems pairing a device, verify that you follow best practices to avoid pairing/connection issues:

- Check that your setup and environment are optimized to avoid interference.
  - As interference avoidance is an extremely important topic on its own, please read and follow the tips in the separate section below about Zigbee interference avoidance and network range/coverage optimization.
- Check that you have enough Zigbee router devices (also known as Zigbee signal repeaters or range extenders) and if you do not have any, invest and add some mains-powered devices that will work as Zigbee routers.
  - Aim to start out with mains-powered devices before adding battery-operated devices as a "weak" Zigbee network mesh (e.g., the device is too far from the Zigbee coordinator or a Zigbee router) may prevent some devices from being paired. Zigbee router devices are also needed to increase the maximum of devices that can be connected to your Zigbee mesh network.
  - Note that some Zigbee devices are not fully compatible with all brands of Zigbee router devices. Xiaomi/Aqara devices are for example known not to work with Zigbee router devices from Centralite, General Electrics, Iris, Ledvance/OSRAM, LIGHTIFY/Sylvania, Orvibo, PEQ, Securifi, and SmartThings/Samsung. Better results can usually be achieved by using mains-powered devices IKEA and Nue/3A Home or dedicated DIY routing devices based on Texas Instruments CC253x/CC26x2 and XBee Series 2/3 Zigbee radios.
- If possible try to pair your Zigbee devices in their intended final location, (and not pair it next to the Zigbee coordinator and then need to move it after).
  - Pairing a Zigbee device next to the Zigbee coordinator and then moving it later can result in dropped/lost connections or other issues.
    - If the device you want to add is not brand new and as such never paired before then you always have to make sure to first manually reset the device to its factory default settings before you will be able to add/pair it.
- Some battery-operated Zigbee devices are known to have problems with pairing if they have Low battery voltage.
  - Some people have reported replacing the battery on their newly received Xiaomi/Aqara devices solved pairing issues.
- Be patient as the pairing of some Zigbee devices may require multiple attempts and you may sometimes need to try again and again.
  - Some devices, like example those from Xiaomi/Aqara, are known to not be 100% compliant with the standard Zigbee specifications and may therefore require many paring attempts over 10-20 minutes or longer.

### Zigbee interference avoidance and network range/coverage optimization

Sources of interference for radios can lead to transmission/reception loss or connection problems and show symptoms such as errors/failures when sending and receiving Zigbee messages/signals that can cause significant degradation in performance or even prevent devices from communicating at all. Below are some basic but essential tips for getting a good setup starting point to achieve better signal quality, improved coverage, and extended range.

Following all these optimization tips below should significantly improve the reception of your Zigbee radio adapter. The below insights describe working around the well-known limitations of low-power/low-bandwidth 2.4 GHz digital radios. It can that way resolve or avoid many known issues caused by interference or poor placement of your Zigbee radio adapter or devices.

All electric devices/appliances, especially computers and computer peripherals, generate [EMI/EMF/RMI (electromagnetic fields that cause electromagnetic interference (often called radio-frequency interference, also commonly called signal noise in layman's terms)](https://en.wikipedia.org/wiki/Electromagnetic_interference), which can interfere with signals transmissions on the 2.4 GHz radio band frequency, and in practice partially degrade or even fully jam the wireless communication messages between your Zigbee adapter/devices.

For example, interference from USB 3.x ports, unshielded USB 3.x devices, and non-shielded USB 3.x peripheral cables are especially infamously known to affect 2.4 GHz radio reception for low-power/low-bandwidth devices. Therefore you should always place your Zigbee adapter far away as possible from any potential sources of EMI/EMI/RMI, preferably by using an adequately long shielded USB extension cable connected to a USB 2.0 port.

Zigbee also uses [mesh networking topology](https://en.wikipedia.org/wiki/Mesh_networking), which means that most mains-powered devices are a "Zigbee Router" that can act as a signal repeater and range extended by transmitting data over long distances by passing data messages through the Zigbee network mesh of intermediate devices to reach more distant Zigbee devices. Thus to have a healthy Zigbee network, you need many Zigbee Router devices relatively close to each other in order to achieve good coverage and range.

#### Actions to optimize Zigbee Coordinator radio hardware

Common root causes of unreliable performance are often seen with outdated Zigbee Coordinator radio adapter hardware, limited by obsolete chips, bad antenna designs, or old/buggy firmware. You can improve most Zigbee setups by using a good Zigbee Coordinator radio adapter and maintaining it.

- Buy and use a supported Zigbee Coordinator USB adapter based on newer/modern chip hardware.
  - Consider a Zigbee Coordinator USB adapter with an external antenna for more flexibility.

- Update to a later version of Zigbee Coordinator firmware on the existing radio adapter.
  - Most manufacturers usually provide straightforward guides for updating the firmware.

- Try different physical placement and orientations of the Zigbee Coordinator and its antenna.
  - Optimal placement of the Zigbee adapter is close to the middle of the house as possible.
  - Try placing Zigbee Coordinator at some distance away from walls, ceilings, and floors.
  - Try different orientations of the Zigbee Coordinator adapter or its antenna.

While using an older Zigbee Coordinator radio adapter hardware might work, using obsolete hardware and/or old firmware can prevent reliable operation. It is also generally a good idea to upgrade Zigbee Coordinator firmware before troubleshooting any further if and when run into problems with devices.

#### Actions to avoid or workaround EMI/EMF/RMI interference

Since all Zigbee Coordinator radio adapters are very sensitive/susceptible to all types of EMI/EMF/RMI you should always try to optimize the placement of the Zigbee Coordinator and avoid known sources of interference.

- Use a long USB extension cable and place Zigbee Coordinator away from interference and obstacles.
  - Ensure the USB extension cable is adequately shielded (thicker cables usually have better shielding).
  - Place Zigbee Coordinator away from electrical wires/cables, power supplies, and household appliances.
  - Extension cables also makes it easier to try different orientations of the adapter/antenna.

- Avoid USB 3.0 ports/computers/peripherals as they are known culprits of RFI/EMI/EMF disruption. (See Ref. [1](https://www.usb.org/sites/default/files/327216.pdf) and [2](https://www.unit3compliance.co.uk/2-4ghz-intra-system-or-self-platform-interference-demonstration/)).
  - Make sure to only connect the Zigbee USB adapter to a USB 2.0 port (and not to a USB 3.x port).
  - If a computer only has USB 3.x ports then buy and connect Zigbee Coordinator via a powered USB 2.0 hub.

- Shield any unshielded computers/peripherals/devices by adding all-metal enclosures/chassis/casings.
  - Use shielded USB cables for all external peripherals/devices, especially USB 3.x peripherals.
  - Be aware that metal casings can decrease the performance of an internal/built-in Zigbee Coordinator.

- Avoid Wi-Fi Routers and Wi-Fi Access Points, alternatively change the Wi-Fi channel or Zigbee channel.
  - Place your Zigbee Coordinator away from any Wi-Fi access points and all other sources of WiFi.
  - Wi-Fi frequency ranges can overlap with Zigbee, see the section above on defining Zigbee channel use.

### Zigbee network visualization in ZHA UI

The ZHA configuration UI has a tab to visualize device links in your Zigbee network topology.

The network visualization can help to identify devices with poor connection (that is, low values on the link). You will need to look at the ZHA logs to find more detailed information required for troubleshooting.

The visualization shows multi-hop connections between your paired devices and their reported cumulative values of Received Signal Strength Indicator (RSSI) and Link Quality Indication (LQI).

The exact method in which these values are reported depends on the Zigbee network stack used on each device. LQI values can be modified at each step as the message propagates through the mesh networking matrix.

#### Why some links are missing in Zigbee network topology maps

Missing links between Zigbee end devices (often battery-powered devices) in the Zigbee network visualization map are common. They are generally not a sign of a faulty device if the device is still reporting state changes. This happens with sleepy Zigbee end devices and does not mean that the device is no longer connected.

Some end devices (for example, Xiaomi door sensors) sleep for an extended period, causing the parent Zigbee Router to remove them from its child table via a feature called router child aging. Since using child aging and removing them from the child table is a Zigbee 3.0 feature, this does not always occur because not all Zigbee router devices use child aging.

This is what causes devices to show a missing link. Even though the device is no longer in the child table, the end device can still communicate via the parent Zigbee router.

#### How to interpret RSSI and LQI values

Interpreting RSSI and LQI values can be complex, as metrics of network health and communication quality are provided by the devices themselves, and each device could get to its results in different ways. Unless you are a Zigbee specialist yourself or are guided by one, please ignore those values. They can be misleading. If you delve into this, it is important to understand not to judge RSSI or LQI values on their own. When troubleshooting Zigbee messages that are being dropped, you must interpret the combination of both RSSI and LQI.

RSSI (Received Signal Strength Indicator) values are an indicator value of the raw signal strength between two devices. RSSI values are negative numbers in -dBm format (0 to -100 power ratio in decibels of the measured power referenced to one milliwatt). Lower negative values indicate less interference and a good signal. RSSI information is only between the endpoint device and the first hop from that device. As such, it may not necessarily show signal strength to the Zigbee Coordinator but instead could be showing signal strength to the nearest Zigbee Router device.

- Generally, anything -60 and above (meaning -50, -40, etc.) in RSSI should be considered a strong signal (not losing messages).
- Usually, anything at -80 and below (meaning -85, -90, etc.) in RSSI should be considered a noisy environment and you risk losing messages.

LQI (Link Quality Index) values are shown as positive numbers on a scale but can be very hard to interpret for Zigbee and not as useful for troubleshooting. This is because the Zigbee specifications and the (IEEE 802.15.4 specification) do not standardize how to perform LQI measurements. The LQI value provided by the Zigbee devices is not measured using unified standards from all device manufacturers and Zigbee stacks, and often, LQI is only a measure of the last-hop link quality anyway, which is most of the time not useful information as such the values can not always be trusted.

For example, Zigbee devices based on Silicon Labs EmberZNet stack use positive display numbers for LQI, where higher is better and lower is worse. The Texas Instruments Z-Stack computes LQI for each received packet from the raw “received signal strength index” (RSSI) by linearly scaling it between the minimum and maximum defined RF power levels for the radio that more or less just provides an LQI value that, based on the strength of the received signal. This can be misleading in case you have a noisy environment with interference within the same frequency range (as the RSSI value may be shown as increased even though the true link quality decreases). Other manufacturers and Zigbee stacks measure and calculate LQI values in another way.

In theory, a positive high LQI value is better, and a lower LQI value is worse, but depending on your devices, that might not always be the reality.

- Best practice is to ignore LQI value.

### Reporting issues

For more details on where and how to report issues, please refer to the [Reporting issues page](/help/reporting_issues/).

When reporting potential bugs related to the ZHA integration on the issues trackers, please always provide the following ZHA/Zigbee-specific information in addition to the information requested by the standard issue template:

1. Debug logs for the issue, see [debug logging](#debug-logging).
2. Exact model and firmware of the Zigbee radio (Zigbee Coordinator adapter) being used.
3. If the issue is related to a specific Zigbee device, provide both the **Zigbee Device Signature** and the **Diagnostics** information.
     - Both the **Zigbee Device Signature** and the **Diagnostics** information can be found under {% my integrations title="**Settings** > **Devices & services**" %}. Select the **Zigbee Home Automation** integration. Then, select **Configure** > **Devices** (pick your device). Select **Zigbee Device Signature** and **Download Diagnostics**, respectively.

Note: Please also make sure you give it your best effort to follow the recommended best practices for avoiding both [pairing/connection difficulties](#best-practices-to-avoid-pairingconnection-difficulties) and [Zigbee interference](#zigbee-interference-avoidance-and-network-rangecoverage-optimization), (which helps free up time for developers).

### Debug logging

To enable debug logging for the ZHA {% term integration %} and radio libraries, add the following [logger](/integrations/logger/) configuration to {% term "`configuration.yaml`" %}:

```yaml
logger:
  default: info
  logs:
    homeassistant.core: debug
    homeassistant.components.zha: debug
    bellows.zigbee.application: debug
    bellows.ezsp: debug
    zigpy: debug
    zigpy_deconz.zigbee.application: debug
    zigpy_deconz.api: debug
    zigpy_xbee.zigbee.application: debug
    zigpy_xbee.api: debug
    zigpy_zigate: debug
    zigpy_znp: debug
    zhaquirks: debug
```

### Add Philips Hue bulbs that have previously been added to another bridge

Philips Hue bulbs that have previously been paired to another bridge/gateway will not show up during search in ZHA to add a Zigbee device. **Bulbs must be restored back to their factory default settings**.

{% important %}
**You must factory-reset the device.**

- Simply "removing" them from your old bridge/gateway is not sufficient.
- Be sure there are no other Hue bulbs nearby that have just been powered-on when using this method or you will risk resetting them in this process.

{% endimportant %}

The following reset methods can be used (depending on the bulb version):

- **Zigbee remote:**
  - Steps are outlined below for either the _Philips Hue Dimmer Switch_ or _Lutron Connected Bulb Remote_.
  - The remote does not have to be paired with your previous bridge.
- **Bluetooth via Android app:**
  - Newer Philips Hue bulbs can reset via Bluetooth using the official Android app.
  - This is an option even if the bulb is already paired to a bridge.
- **Hue Thief command-line tool**:
  - Advanced users can use a third-party tool called [Hue Thief](https://github.com/vanviegen/hue-thief/).
  - This requires an EZSP-based Zigbee USB stick.

#### Factory-reset using a Zigbee remote

Icons or button names may vary between generations of remotes. The remote used for resetting does not have to be paired with your previous bridge.

{% details "To reset using a remote:" %}

1. Identify which buttons will be used later to perform the reset (based on the brand of remote):
   - **Philips Hue Dimmer Switch**:
     - Use the **(I)/(ON)** and **(O)/(OFF)** buttons.
     - Button labels or icons may vary based on the generation of Hue remote.
   - **Lutron Connected Bulb Remote:**
     - Use the **2nd (up arrow)** and **4th (light off)** buttons.
2. Turn on the Hue bulb you want to reset.
   - **It is important that the bulb has _just_ been powered on.**
3. Hold the remote near your bulb, closer than 10cm (about 4 inches).
4. Press-and-hold both buttons identified in the first step and continue holding them once the bulb begins to blink.
   - Expect to hold the buttons for about another 10 seconds while the bulb blinks.
   - **Lutron Connected Bulb Remote:** The green LED on the remote should also begin to blink slowly.
5. Release both buttons once the bulb turns off.
   - **Lutron Connected Bulb Remote:** You can release the buttons after the green LED stops flashing on the remote.
6. The bulb will turn back on immediately after to indicate the factory-reset is complete.
   - The bulb is now ready for pairing to ZHA following normal steps for [adding devices](#adding-devices).

{% tip %}
A green light on the top left of the Philips Hue Dimmer Switch remote indicates that your bulb has been successfully reset to factory default settings.
{% endtip %}

{% enddetails %}

If you are unable to reset the bulb using a method above, remove it from the Hue Bridge (if it was re-discovered by the Hue Bridge) and try the procedure again.

### ZHA Start up issue with Home Assistant or Home Assistant Container

On Linux hosts ZHA can fail to start during HA startup or restarts because the Zigbee USB device is being claimed by the host's modemmanager service. To fix this disable the modemmanager on the host system.

To remove modemmanager from a Debian/Ubuntu host run this command:

```bash
sudo apt-get purge modemmanager
```

### Can't connect to USB device and using Docker

If you are using Docker and can't connect, you most likely need to forward your device from the host machine to the Docker instance. This can be achieved by adding the device mapping to the end of the startup string or ideally using Docker compose.

#### Docker Compose

Install Docker-Compose for your platform (Linux - `sudo apt-get install docker-compose`).

Create a `docker-compose.yml` with the following data:

```yaml
version: '2'
services:
  homeassistant:
    # customizable name
    container_name: home-assistant

    # must be image for your platform, this is the rpi3 variant
    image: homeassistant/raspberrypi3-homeassistant
    volumes:
      - <DIRECTORY HOLDING HOME ASSISTANT CONFIG FILES>:/config
      - /etc/localtime:/etc/localtime:ro
    devices:
      # your usb device forwarding to the docker image
      - /dev/ttyUSB0:/dev/ttyUSB0
    restart: always
    network_mode: host
```

### EZSP error and other log messages

#### NCP entered failed state

When you see `NCP entered failed state. Requesting APP controller restart` in logs during normal operation, it indicates a drop in communication between ZHA and the serial interface of the Silabs EmberZNet Zigbee Coordinator.

The EZSP (EmberZNet Serial Protocol) interface used by Silicon Labs EmberZNet Zigbee Coordinator adapters requires a stable connection to the serial port; therefore, it is not recommended to use a connection over Wi-Fi, WAN, VPN, etc.
