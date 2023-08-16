---
title: Zigbee Home Automation
description: Instructions on how to integrate your Zigbee Home Automation (ZHA) devices within Home Assistant.
ha_category:
  - Alarm
  - Binary Sensor
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
ha_release: 0.44
ha_iot_class: Local Polling
featured: true
ha_config_flow: true
ha_codeowners:
  - '@dmulcahey'
  - '@adminiuga'
  - '@puddly'
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
ha_zeroconf: true
ha_integration_type: integration
---

The ZHA (Zigbee Home Automation) integration allows you to connect many off-the-shelf [Zigbee based devices](https://csa-iot.org/) directly to Home Assistant, using one of the many available Zigbee coordinators.

ZHA uses an open-source Python library implementing a hardware-independent Zigbee stack called [zigpy](https://github.com/zigpy/zigpy). All coordinators compatible with zigpy can be used with ZHA.

There is currently support for the following device types within Home Assistant:

- [Alarm Control Panel](/integrations/alarm_control_panel/)
- [Binary Sensor](/integrations/binary_sensor/)
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

There is also support for Zigbee grouping of lights, switches, and fans (i.e. support for commanding device groups as entities). At least two entities must be added to a Zigbee group in the ZHA integration before the group entity is created. As well as support for [binding and unbinding (i.e. bind a remote to a lightbulb or group)](#binding-and-unbinding).

## Introduction

ZHA integration is a Zigbee gateway implementation that follows the standard Zigbee 3.0 specification (and earlier revisions). In Zigbee, there are three different device types: Zigbee Coordinator (ZC), Zigbee Router (ZR), and Zigbee End Device (ZED). A Zigbee network always has one (and no more) Zigbee Coordinator, however, a Zigbee network can have multiple Zigbee Routers and multiple Zigbee End Devices.

A Zigbee Coordinator is the central device in a Zigbee network that manages and controls the network. It acts as a physical interface for the Zigbee wireless protocol, as well as being responsible for maintaining the Zigbee network topology and ensuring secure and efficient communication between Zigbee devices. Zigbee Router devices are mains-powered and will act as Zigbee signal repeaters within the Zigbee network mesh to extend its range and improve coverage, while Zigbee End Device devices are usually battery-operated sensors that will not act as Zigbee signal repeaters.

In the case of ZHA, the Zigbee Coordinator is a radio adapter or hardware module, that contains a microcontroller that runs the Zigbee protocol stack which the ZHA integration uses to manage and communicate with a Zigbee network and its devices.

Before installing the ZHA integration, you will need to buy and connect a Zigbee Coordinator radio adapter or hardware module, those usually come in the form of a USB dongle that plugs directly into the computer that is running the Home Assistant installation. The ZHA integration can work with many different "Zigbee Coordinator" adapters, however, be sure to read the respective sections below about compatible Zigbee radio adapters and hardware modules.

Once ZHA has been set up and the Zigbee Coordinator radio adapter or module is configured, you will be able to directly join/pair any Zigbee device to the Zigbee network; regardless of the manufacturer and brand of that Zigbee-based product. Note, that while it is generally recommended to buy Zigbee 3.0 compliant devices as those should, in theory, offer greater interoperability, be sure of the sections about which devices are supported and exception handling.

## Compatible hardware

ZHA integration uses a hardware independent Zigbee stack implementation with modular design, which means that it can support any one of the many Zigbee coordinator radio modules/adapters available from different manufacturers, as long as that module/adapter is compatible with [zigpy](https://github.com/zigpy/zigpy).

Note! Zigbee 3.0 support or not in zigpy, depends primarily on your Zigbee coordinator hardware and its firmware. Some Zigbee coordinator hardware supports Zigbee 3.0 but might be shipped with an older firmware which does not. In such a case you may want to upgrade the firmware manually yourself.

Some other Zigbee coordinator hardware may not support a firmware that is capable of Zigbee 3.0 at all but can still be fully functional and feature-complete for your needs. This is very common as many, if not most, Zigbee devices do not yet Zigbee 3.0. As a general rule, newer Zigbee coordinator hardware generally supports Zigbee 3.0 firmware and it is up to its manufacturer to make such firmware available for them.

### Known working Zigbee radio modules

### Recommended Zigbee radio adapters and modules

- Silicon Labs EmberZNet based radios using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)
  - [Home Assistant SkyConnect](/skyconnect/)
  - [ITead SONOFF Zigbee 3.0 USB Dongle Plus Model "ZBDongle-E" (EFR32MG21 variant)](https://itead.cc/product/zigbee-3-0-usb-dongle/)
  - [Elelabs Zigbee USB Adapter](https://elelabs.com/products/elelabs-usb-adapter.html)/POPP ZB-Stick (Note! Not a must but recommend [upgrade the EmberZNet NCP application firmware](https://github.com/Elelabs/elelabs-zigbee-ezsp-utility))
  - [Elelabs Zigbee Raspberry Pi Shield](https://elelabs.com/products/elelabs-zigbee-shield.html) (Note! Not a must but recommend [upgrade the EmberZNet NCP application firmware](https://github.com/Elelabs/elelabs-zigbee-ezsp-utility))
- Texas Instruments based radios (via the [zigpy-znp](https://github.com/zigpy/zigpy-znp) library for zigpy)
  - [CC2652P/CC2652R/CC2652RB USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
  - [CC1352P/CC1352R USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/guide/adapters/)
- dresden elektronik deCONZ based Zigbee radios (via the [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) library for zigpy)
  - [ConBee II (a.k.a. ConBee 2) USB adapter from dresden elektronik](https://phoscon.de/conbee2)
  - [RaspBee II (a.k.a. RaspBee 2) Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee2)

### Other supported but not recommended Zigbee radio adapters or modules

- Silicon Labs EmberZNet based radios using legacy hardware using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)
  - [ITead Sonoff ZBBridge](https://itead.cc/product/sonoff-zbbridge/) (Note! [WiFi-based bridges are not recommended for ZHA with EZSP radios](https://github.com/home-assistant/home-assistant.io/issues/17170). Also, this first has to be flashed with [Tasmota firmware and Silabs EmberZNet NCP EZSP UART Host firmware to use as Serial-to-IP adapter](https://www.digiblur.com/2020/07/how-to-use-sonoff-zigbee-bridge-with.html))
  - [Nortek GoControl QuickStick Combo Model HUSBZB-1 (Z-Wave & Zigbee Ember 3581 USB Adapter)](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/) (Note! Not a must but recommend [upgrade the EmberZNet NCP application firmware](https://github.com/walthowd/husbzb-firmware))
  - [Bitron Video/Smabit BV AV2010/10 USB-Stick](https://bv.smabit.eu/index.php/smart-home-produkte/zb-funkstick/) with Silicon Labs Ember 3587
  - Telegesis ETRX357USB/ETRX357USB-LR/ETRX357USB-LRS+8M (Note! These first have to be [flashed with other EmberZNet firmware](https://github.com/walthowd/husbzb-firmware))
- Texas Instruments based radios using legacy hardware (via the [zigpy-znp](https://github.com/zigpy/zigpy-znp) library for zigpy)
  - [CC2538 USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/information/supported_adapters) (no longer recommended as only got deprecated old end-of-life firmware)
  - [CC2530/CC2531 USB stick, module, or dev board hardware flashed with Z-Stack coordinator firmware](https://www.zigbee2mqtt.io/information/supported_adapters) (no longer recommended as uses deprecated hardware and very old end-of-life firmware, plus will not work properly at all if the whole Zigbee network has more than 15-20 devices)
- dresden elektronik deCONZ based Zigbee radios using legacy hardware (via the [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) library for zigpy)
  - [ConBee USB adapter from dresden elektronik](https://phoscon.de/conbee)
  - [RaspBee Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee)
- Digi XBee Zigbee based radios (via the [zigpy-xbee](https://github.com/zigpy/zigpy-xbee) library for zigpy)
  - [Digi XBee Series 3 (xbee3-24)](https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/2-4-ghz-rf-modules/xbee3-zigbee-3) and [Digi XBee Series S2C](https://www.digi.com/products/embedded-systems/digi-xbee/rf-modules/2-4-ghz-rf-modules/xbee-zigbee) modules
    - Note! While not a must, [it is recommend to upgrade XBee Series 3 and S2C to newest firmware using XCTU](https://www.digi.com/resources/documentation/Digidocs/90002002/Default.htm#Tasks/t_load_zb_firmware.htm)
  - [Digi XBee Series 2 (S2)](https://www.digi.com/support/productdetail?pid=3430) modules (Note! This first have to be [flashed with Zigbee Coordinator API firmware](https://www.digi.com/support/productdetail?pid=3430))
- ZiGate based radios (via the [zigpy-zigate](https://github.com/zigpy/zigpy-zigate) library for zigpy and require firmware 3.1d or later)
  - [ZiGate USB](https://zigate.fr/produit/zigate-usb/)
  - [ZiGate USB-DIN](https://zigate.fr/produit/zigatev2-usb-din/)
  - [PiZiGate (ZiGate Raspberry Pi module)](https://zigate.fr/produit/pizigatev2/)
  - [ZiGate-Ethernet (Ethernet gateway board for PiZiGate)](https://zigate.fr/produit/zigate-ethernet/)
  - [ZiGate + WiFi Pack](https://zigate.fr/produit/zigatev2-pack-wifi/)
#### Warning about Wi-Fi-based Zigbee-to-Serial bridges/gateways

<div class="note warning">

The **EZSP** protocol requires a stable connection to the serial port. With _ITEAD Sonoff ZBBridge_ connecting over the WiFi network
it is expected to see `NCP entered failed state. Requesting APP controller restart` in the logs. This is a normal part of the operation and indicates there was a drop in communication between ZHA and Sonoff bridge.

</div>

## Configuration - GUI

Connect your radio module and restart Home Assistant.

From the Home Assistant front page go to **Configuration** and then select **Integrations** from the list.

Use the plus button in the bottom right to add a new integration called **ZHA**.

In the popup:

- Serial Device Path - List of detected serial ports on the system. You need to pick one to which your
radio is connected
- Submit

Press `Submit` and the integration will try to detect radio type automatically. If unsuccessful, you will get
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

### ZiGate or Sonoff ZBBridge Devices

If you are use ZiGate or Sonoff ZBBridge you have to use some special usb_path configuration:

- ZiGate USB TTL or DIN: `/dev/ttyUSB0` or `auto` to auto discover the zigate
- PiZigate : `pizigate:/dev/ttyS0`
- Wifi Zigate : `socket://[IP]:[PORT]` for example `socket://192.168.1.10:9999`
- Sonoff ZBBridge : `socket://[IP]:[PORT]` for example `socket://192.168.1.11:8888`

### Discovery via USB or Zeroconf

Some devices can be auto-discovered, which can simplify the ZHA setup process. The following devices have been tested with discovery and offer a quick setup experience:

| Device                                                                                                                                      | Discovery Method | Identifier                     |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------ |
| [ITead SONOFF Zigbee 3.0 USB Dongle Plus V2 Model "ZBDongle-E" (EFR32MG21 variant)](https://itead.cc/product/zigbee-3-0-usb-dongle/)        | USB              | 1A86:55D4                      |
| [ITead SONOFF Zigbee 3.0 USB Dongle Plus Model "ZBDongle-P" (CC2652P variant)](https://itead.cc/product/sonoff-zigbee-3-0-usb-dongle-plus/) | USB              | 10C4:EA60                      |
| [Bitron Video/SMaBiT BV AV2010/10](https://bv.smabit.eu/index.php/smart-home-produkte/zb-funkstick/)                                        | USB              | 10C4:8B34                      |
| [ConBee II](https://phoscon.de/conbee2)                                                                                                     | USB              | 1CF1:0030                      |
| [Nortek HUSBZB-1](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)                                         | USB              | 10C4:8A2A                      |
| [slae.sh CC2652RB development stick](https://slae.sh/projects/cc2652/)                                                                      | USB              | 10C4:EA60                      |
| [ZigStar Stick (CC2652 + CH340B variant)](https://zig-star.com/projects/zigbee-stick-v4/)                                                   | USB              | 1A86:7523                      |
| [Tube’s EFR32 Pro Ethernet/Serial Coordinator](https://www.tubeszb.com/)                                                                    | USB              | 10C4:EA60                      |
| [ZigStar Coordinators](https://zig-star.com/)                                                                                               | USB              | 1A86:7523                      |
| [SMLIGHT SLZB-06 POE Zigbee LAN WiFi USB Adapter](https://smlight.tech/product/slzb-06/)                                                    | Zeroconf         | slzb-06.local.                 |
| [ZigStar LAN/POE Coordinators](https://zig-star.com/projects/zigbee-gw-lan/)                                                                | Zeroconf         | zigstargw.local.               |
| [Tube's CC2652P2 USB-powered Zigbee to Ethernet Serial Coordinator)](https://www.tubeszb.com/)                                              | Zeroconf         | tube_zb_gw_cc2652p2.local.     |
| [Tube's CC2652P2 PoE-powered Zigbee to Ethernet Serial Coordinator)](https://www.tubeszb.com/)                                              | Zeroconf         | tube_zb_gw_cc2652p2_poe.local. |
| [Tube's EFR32 Based Zigbee to Ethernet Serial Coordinator)](https://www.tubeszb.com/)                                                       | Zeroconf         | tube_zb_gw_efr32.local.        |

Additional devices in the [Known working Zigbee radio modules](#known-working-zigbee-radio-modules) list may be discoverable, however, only devices that have been confirmed discoverable are listed above.

## Configuration - YAML

For more advanced configuration, you can modify `configuration.yaml` and restart Home Assistant

{% configuration %}
database_path:
  description: _Full_ path to the database which will keep persistent network data.
  required: true
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

### OTA firmware updates

The ZHA integration has the ability to automatically download and perform OTA (Over-The-Air) firmware updates of Zigbee devices if the OTA firmware provider source URL for updates is available. OTA firmware updating is set to disabled (`false`) in the configuration by default.

Online OTA providers for firmware updates are currently only available for IKEA, LEDVANCE/OSRAM, SALUS/Computime, and INOVELLI devices. Support for OTA updates from other manufacturers could be supported in the future if they publish their firmware images publicly.

To enable OTA firmware updates for the ZHA integration you need to add the following configuration to your `configuration.yaml` and restart Home Assistant:

```yaml
zha:
  zigpy_config:
    ota:
      ikea_provider: true                        # Auto update Trådfri devices
      ledvance_provider: true                    # Auto update LEDVANCE/OSRAM devices
      salus_provider: true                       # Auto update SALUS/Computime devices
      inovelli_provider: true                    # Auto update INOVELLI devices
      thirdreality_provider: true                # Auto update 3REALITY devices
      #otau_directory: /path/to/your/ota/folder  # Utilize .ota files to update everything else
```

You can choose if the IKEA, LEDVANCE, SALUS, INOVELLI or THIRDREALITY provider should be set to enabled (`true`) or disabled (`false`) individually. After the OTA firmware upgrades are finished, you can set these to `false` again if you do not want ZHA to automatically download and perform OTA firmware upgrades in the future.

Note that the `otau_directory` setting is optional and can be used for any firmware files you have downloaded yourself, for any device type and manufacturer. For example, Philips Hue firmwares manually downloaded from [here](https://github.com/Koenkk/zigbee-OTA/blob/master/index.json) and/or [here](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/OTA-Image-Types---Firmware-versions) added to the `otau_directory` can be flashed, although a manual `zha.issue_zigbee_cluster_command` command currently (as of 2021.3.3) must be issued against the IEEE of the Philips Hue device under Developer Tools->Services, e.g.:

```yaml
service: zha.issue_zigbee_cluster_command
data:
  ieee: "xx:xx:xx:xx:xx:xx:xx:xx"
  endpoint_id: 1
  cluster_id: 25
  cluster_type: out
  command: 0
  command_type: client
  args:
    - 0
    - 100
```

Note: `cluster_id: 25` may also be `cluster_id: 0x0019`. The two are synonymous.

### Defining Zigbee channel to use

Tip! Before considering to change to an other Zigbee channel on an existing Zigbee network, it is highly recommended that you read through the two segments under the [troubleshooting](#troubleshooting) section below about "*Best practices to avoid pairing/connection difficulties*" and "*Zigbee interference avoidance and network range/coverage optimization*". These sections provide prerequisite information and advice on how to achieve the best possible Zigbee network in your environment.

ZHA prefers to use Zigbee channel 15 by default. You can change this using YAML configuration, but this only works
if there's no existing network. To change the channel for an existing network, radio has to be factory reset and a new network to be formed. This requires re-pairing of all the devices.

```yaml
zha:
  zigpy_config:
    network:
      channel: 15             # What channel the radio should try to use.
      channels: [15, 20, 25]  # Channel mask
```

Note! The best practice is to not change the Zigbee channel from the ZHA default. Also, the related troubleshooting segments mentioned in the tip above will, among other things, inform that if you have issues with overlapping frequencies between Wi-Fi and Zigbee, then it is usually better to first only try changing and setting a static Wi-Fi channel on your Wi-Fi router or all your Wi-Fi access points (instead of just changing to another Zigbee channel).

MetaGeek Support has a good reference article about channel selection for [Zigbee and WiFi coexistance](https://support.metageek.com/hc/en-us/articles/203845040-ZigBee-and-WiFi-Coexistence).

The Zigbee specification standards divide the 2.4&nbsp;GHz ISM radio band into 16 Zigbee channels (i.e. distinct radio frequencies for Zigbee). For all Zigbee devices to be able to communicate, they must support the same Zigbee channel (i.e. Zigbee radio frequency) that is set on the Zigbee Coordinator as the channel to use for its Zigbee network. Not all Zigbee devices support all Zigbee channels. Channel support usually depends on the age of the hardware and firmware, as well as on the device's power ratings.

The general recommendation is to only use channels 15, 20, or 25 in order to avoid interoperability problems with Zigbee devices. Not only because there is less chance of Wi-Fi networks interfering too much with the Zigbee network on other channels, but also because not all Zigbee devices support all channels. Some devices, for example, are limited to only being compatible with ZLL (Zigbee Light Link) channels. It is therefore especially not recommended to use Zigbee channels 11, 24, 25, or 26 on your Zigbee coordinator. These Zigbee channels are commonly only supported by relatively modern Zigbee hardware devices with newer Zigbee firmware. If using those channels, your coordinator may not be usable with older Zigbee devices.

### Modifying the device type

As not all device manufacturers follow the Zigbee standard, at times a device can be incorrectly classified. For example, a switch could be classified as a light.

To correct the device type, also called domain, add the following to your `configuration.yaml` and restart Home Assistant:

```yaml
zha:
  device_config:
    84:71:27:ff:fe:93:17:24-1:    # format: {ieee}-{endpoint_id}
      type: "switch"              # corrected device type
```

`{ieee}` is the device hardware address which can be read from the Home Assistant UI when looking at _Device info_. From device info, you can find the `{endpoint_id}` by viewing the _Zigbee device signature_.

## Services

### Service `zha.permit`

To add new devices to the network, call the `permit` service on the `zha` domain. Do this by clicking the Service icon in Developer tools and typing `zha.permit` in the **Service** dropdown box. Next, follow the device instructions for adding, scanning or factory reset.

This service opens network for joining new devices.

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

<div class='note'>
  Currently `qr_code` supports QR Install Codes from:

  - Aqara
  - Consciot
  - Embrighten

</div>

### Service `zha.remove`

This service removes an existing device from the network. You can find the IEEE address of the device on the device card of Zigbee devices. An example of an IEEE address data parameter format is `00:0d::6f:00:05:7d:2d:34`.

| Data   | Optional | Description                          |
| ------ | -------- | ------------------------------------ |
| `ieee` | no       | IEEE address of the device to remove |

### Service `zha.set_lock_user_code`

This service sets a lock code on a Zigbee lock.

| Data        | Optional | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `code_slot` | no       | Which lock code slot to store the code. Ex. 1-32 will work for Kwikset 954 |
| `user_code` | no       | Code to set on the lock. Ex. Kwikset accepts numbers 4-8 digits in length  |

### Service `zha.clear_lock_user_code`

This service clears a lock code from a Zigbee lock.

| Data        | Optional | Description                   |
| ----------- | -------- | ----------------------------- |
| `code_slot` | no       | Which lock code slot to clear |

### Service `zha.enable_lock_user_code`

This service enables a lock code on a Zigbee lock.

| Data        | Optional | Description                    |
| ----------- | -------- | ------------------------------ |
| `code_slot` | no       | Which lock code slot to enable |

### Service `zha.disable_lock_user_code`

This service disables a lock code on a Zigbee lock.

| Data        | Optional | Description                     |
| ----------- | -------- | ------------------------------- |
| `code_slot` | no       | Which lock code slot to disable |

## Adding devices

Tip! It is highly recommended that you read through the two segments under the troubleshooting section below about "*Best practices to avoid pairing/connection difficulties*" and "*Zigbee interference avoidance and network range/coverage optimization*" for general prerequisite knowledge and advice on how to achieve the best possible Zigbee network in your environment.

**To add a new Zigbee device:**

1. Go to {% my integrations title="**Settings** > **Devices & Services**" %}.
2. Select the **Zigbee Home Automation** integration. Then, select **Configure**.
3. To start a scan for new devices, on the bottom right corner of the screen, select **Add device**.
4. Reset your Zigbee devices to factory default settings according to the device instructions provided by the manufacturer (e.g., turn on/off lights up to 10 times; switches usually have a reset button/pin). It might take a few seconds for the devices to appear. You can click on **Show logs** for more verbose output.
5. Once the device is found, it will appear on that page and will be automatically added to your devices. You can optionally change its name and add it to an area (you can change this later). You can search again to add another device, or you can go back to the list of added devices.

### Using router devices to add more devices

Most mains-powered devices, e.g., many always-powered wall plugs or light bulbs in your Zigbee network will automatically act as a Zigbee router device (sometimes also referred to as a Zigbee "signal repeater" or "range extender"). 

Because Zigbee should use a [wireless mesh network](https://en.wikipedia.org/wiki/Wireless_mesh_network) to be effective, you will need to add Zigbee router devices to increase the number of Zigbee devices that can be used in your Zigbee network, both in the total number of devices that can be added as well as the total range and coverage of the network. Some Zigbee router devices do a much better job at routing and repeating Zigbee signals and messages than some other devices. You should not have a setup where Zigbee router devices (e.g. light bulbs) are often powered-off.  Zigbee router devices are meant to be always available.

All Zigbee coordinator firmware will only allow you to directly connect a certain amount of devices. That limit is set for two reasons; firstly, to not overload the Zigbee coordinator, and secondly, to encourage your Zigbee network to quickly begin to utilize a "[mesh networking](https://en.wikipedia.org/wiki/Mesh_networking)" topology instead of only a "[star network](https://en.wikipedia.org/wiki/Star_network)" topology.

The total number of Zigbee devices that you can have on a Zigbee network depends on a few things. The Zigbee coordinator hardware and its firmware only play a larger role in Zigbee networks with a lot of devices. More important is the number of directly connected devices ("direct children") versus the number of routers that are connected to your Zigbee coordinator. The Zigpy library, which the ZHA integration depends on, has an upper limit that is 32 direct children, but you can still have hundreds of Zigbee devices in total connected indirectly through routes via Zigbee router devices.

In this theoretical example, a CC2652-based Zigbee coordinator has three CC2530 Zigbee router devices for a total limit of 77 devices:

- Coordinator: 32 Zigbee End devices - 3 routers = 29
- Router one: + 16 devices
- Router two: + 16 devices
- Router three: + 16 devices
- Total device limit = **77 devices**

In practice, you will likely need to add a lot more Zigbee router devices than in this example in order to extend the coverage of the network to reach that many devices.

## Binding and unbinding

ZHA support for binding and unbinding. Binding is an action in Zigbee which defines relations between two Zigbee devices, specific endpoints, and cluster id. It provides a mechanism for attaching an endpoint on one Zigbee node to one or more endpoints on another Zigbee node or Zigbee group (a group of Zigbee devices).

Binding is a "target destination" in form of a device address or group ID, endpoint, and cluster. For example, binding a Zigbee device like a remote to a Zigbee lightbulb, switch or group of lightbulbs allows direct control of the "target" device (light, switch, shade) from the "remote" Zigbee device, bypassing ZHA.  This means that the remote can control the lightbulb/group of lightbulbs even when the Zigbee coordinator is not available.
Binding is only supported between the same cluster, for example, "output cluster id 6" (on/off cluster) of a remote, can be only bound to an "input cluster id 6" on the target device -- light, switch.

Note that not all devices support binding as it depends on the Zigbee implementation of the device itself. Also, by default ZHA bind remotes to the coordinator, so the coordinator could receive ZCL commands from the remotes and originate zha_events. However, some remotes, for example, the Philips RWL021 can only be bound to a single destination and it is not possible to make this switch to bind to other destinations like a device or groups unless you first unbind the remote from the coordinator. After you unbind the remote from the ZHA coordinator you can then bind it directly to any other Zigbee device or a group.

Binding a remote directly to a bulb or group has the benefit of faster response time and smoother control. This greatly improves user feedback experience functions like dimming as the remote then directly dims the lightbulb and thus does not have to make the software roundtrip via the ZHA coordinator.

## Zigbee backup and restore in ZHA

Zigbee Home Automation (ZHA) integration now features Zigbee network backup, restore/recovery, and migrating between Zigbee coordinators. Backups are taken automatically however, a single backup to a file for easy download can also be manually created from the configuration page under Network Settings.

After restoring a Home Assistant backup, you can re-configure ZHA and migrate to a new Zigbee Coordinator adapter without any loss of your settings or devices that were connected. This is helpful if your current radio fails or a new radio adapter type and model comes out that you may want to migrate to.

Within ZHA is possible to use this backup and restore feature to migrate between some different radio types, if the respective radio library supports it. Currently, ZHA supports migrating the Zigbee network between different Zigbee Coordinator adapters based on chips from Silicon Labs, Texas Instruments, or ConBee/RaspBee if the backup was made from inside ZHA.

## Migrating to a new Zigbee coordinator adapter inside ZHA

Follow this guide if you have a Zigbee Home Assistant (ZHA) network running and want to migrate from one Zigbee coordinator radio adapter to another Zigbee coordinator radio adapter.

### Prerequisites

- Your old Zigbee Coordinator radio adapter is used in the ZHA integration (not in deCONZ or MQTT).
- It is of radio type ezsp (Silicon Labs EmberZnet), znp (Texas Instruments Z-Stack ZNP), or deCONZ (ConBee/RaspBee from dresden elektronik).
  - If your old Zigbee coordinator is a deCONZ (ConBee/RaspBee) radio adapter, make sure it is running [firmware 0x26700700 (from 2021-08-18)](https://github.com/dresden-elektronik/deconz-rest-plugin/wiki/Firmware-Changelog) or later.

### To migrate to a new Zigbee coordinator radio inside ZHA

1. Go to **{% my integrations title="Settings > Devices & Services" %}** and select the ZHA integration. Then select **Configure**.
2. Under **Network settings**, select **Migrate radio**.
3. Reconfiguration of ZHA will start. Select **Submit**.
4. Under **Migrate or re-configure**, select **Migrate to a new radio**.
5. **Migrate to a new radio** will inform you that an automatic backup will be performed and that your old Zigbee coordinator radio will then be reset before the backup is automatically restored.
    - Select **Submit**.
6. **Unplug your old radio** will inform you that your old Zigbee coordinator radio has been reset and that you can now plug in your new Zigbee coordinator radio adapter.
    - To avoid interference, use a USB extension cable.
    - Use a USB 2.0 port or a powered USB 2.0 hub and keep the Zigbee stick away from USB 3.0 devices. 
    - You may now also choose to either unplug your old Zigbee coordinator radio adapter or keep your old radio plugged in.
    - If that radio was a combined Z-Wave and Zigbee radio, like the HUSBZB-1 adapter, then only the Zigbee radio part of it was reset. Confirm that the Zigbee Coordinator radio adapter is properly connected and select **Submit**.
7. You now need to start the backup restore process.
    - Select your new Zigbee radio from the list of serial ports and select **Next**.
    - If your new radio does not appear or you need to reboot after plugging in new hardware, you can resume the migration after a reboot: under **Network Settings**, select **Re-configure the current radio** and choose your new radio.
8. Under **Network Formation**, select **Restore an automatic backup**.
9. Under **Restore Automation Backup**, choose the latest automatic backup and select **Submit**.
10. If your radio requires overwriting the IEEE address, you will see a screen titled **Overwrite Radio IEEE Address**. Check the **Permanently replace the radio IEEE address** box and click **Submit**. Overwriting the IEEE address may take a while.
    - Your old Zigbee Coordinator radio and your new stick will now have the same Zigbee IEEE address (unique MAC address for the Zigbee device).
    - Selecting this option is required for the migration process to complete successfully.
    - From this point onwards, you should not operate the old stick in the same area unless you change the Zigbee IEEE address on it.
    - If you do not migrate the Zigbee IEEE address from your old Zigbee Coordinator radio, then you will have to re-join/re-pair many of your devices in order to keep them working.
11. Finally, a **Success!** message should pop up with information that all options were successfully saved.
    - Select **Finish** to confirm.

The migration process is complete. However, be aware that you will not be able to control your existing Zigbee devices until the new coordinator fully joins the network. This process can take a few minutes. If some existing devices do not function after some time, try power-cycling them to allow them to re-join the network.

## Troubleshooting

To help resolve any kinks or compatibility problems, report bugs as issues with debug logs. Please note the current limitations and follow the instructions in this troubleshooting section.

### Limitations 

Note that ZHA only supports connecting a single dedicated Zigbee Coordinator radio adapter or module with a single Zigbee network and that the Zigbee Coordinator cannot already be connected or used by any other application. Any devices that are or have previously been connected to another Zigbee implementation will also need to first be reset to their factory default settings before they can be paired/joined to ZHA, please see each device manufacturer's documentation.

Support for commissioning Zigbee 3.0 devices via "Install Code" or "QR Code" via the 'zha.permit' service has so far only been implemented for 'ezsp' (Silicon Labs EmberZNet) or 'znp' (Texas Instruments) radio type in ZHA. Other radio types are missing support in their respective [radio libraries for zigpy](https://github.com/zigpy/) or manufacturer's firmware commands/APIs.

ZHA does currently not support devices that can only use the ZGP ("Zigbee Green Power") profile which is used in a few batteryless self-powered or energy harvesting devices, (such as for example; Philips Hue Click, Philips Hue Tap, and some "Friends of Hue" partnership switches).

ZHA does not currently support devices that can only use the ZSE ("Zigbee Smart Energy") profile, that is however due to the "Zigbee SE" specification not being part of the standard Zigbee 3.0 specification and thus not implemented in most of the Zigbee protocol stacks that are commonly available Zigbee Coordinator radio adapters and modules.

### Knowing which devices are supported

Home Assistant's ZHA integration supports all standard Zigbee device types. It should be compatible with most Zigbee devices as long as they fully conform to the official ZCL (Zigbee Cluster Library) specifications defined by the [CSA (Connectivity Standards Alliance, formerly the Zigbee Alliance)](https://csa-iot.org/all-solutions/zigbee/). There is therefore no official compatibility list of devices that will work out-of-the-box with the ZHA integration.

Not all hardware manufacturers always fully comply with the standard specifications. Sometimes, they may also implement unique features. For this reason, some Zigbee devices pair/join fine with ZHA but then only show none or only a few entities in the integration. Developers can work around most such interoperability issues by adding conversion/translation code in custom device handlers. For more information, refer to the section below on _How to add support for new and unsupported devices_.

For clarification, normally only devices that do not fully conform to CSA's ZCL specifications that will not present all standard attributes as entities for configuration in the ZHA integration. Zigbee devices that only use the standard clusters and attributes that are Zigbee specifications set by the Connectivity Standards Alliance should not need custom device handlers.

Before continuing with this section: If a device does not join/pair at all, read the troubleshooting sections about how to avoid pairing/connection difficulties, interference avoidance, and network range/coverage optimization.

Tip to new Zigbee users: Checkout [blakadder's unofficial Zigbee Device Compatibility Repository](https://zigbee.blakadder.com). Anyone can help maintain the site by submitting device compatibility information to it. The repository contains independent community member's reports or device-specific pairing tips for several home automation gateway/bridge/hub software, including open-source Zigbee implementations, such as ZHA, Zigbee2MQTT, and Tasmota (Zigbee2Tasmota).

### How to add support for new and unsupported devices

If your Zigbee device pairs/joins successfully with the ZHA integration but does not show all of the expected entities: 
1. Try to re-pair/re-join the device several times.
2. Checkout the troubleshooting section.
3. Still not working? You may need a custom device handler. This handler will have exception handling code to work around device-specific issues.

For devices that do not follow the standard defined in the CSA's ZCL (Zigbee Cluster Library), the ZHA integration relies on a project called "[ZHA Device Handlers (also known as "zha-quirk")](https://github.com/zigpy/zha-device-handlers)". It contains device-specific Python scripts called "quirks". These scripts can resolve compliance and interoperability issues by implementing on-the-fly conversion of custom Zigbee configurations or by implementing manufacturer-specific features for specific devices.

People familiar with other Zigbee gateway solutions for home automation may know similar concepts of using custom Zigbee device handlers/converters for non-standard devices. For example, [Zigbee2MQTT (and IoBroker) uses zigbee-herdsman converters](https://www.zigbee2mqtt.io/advanced/support-new-devices/01_support_new_devices.html) and [SmartThings Classics (Legacy) platform has Hub Connected Device Handlers](https://developer.smartthings.com/docs/devices/hub-connected/legacy).

If you do not want to develop such a "quirk" Python script yourself, you can submit a "device support request" as a new issue to the [ZHA Device Handlers project repository on GitHub](https://github.com/zigpy/zha-device-handlers/issues): 
1. Sign in to GitHub.
2. Select **New issue** and follow the instructions. 
  - New device support requests require the device signature + diagnostic information. 
  - You may also need to actively help in further testing or provide additional information to the volunteering developers. 

Note that submitting a new "device support request" does not guarantee that someone else will develop a custom "quirk" for ZHA. The project relies on volunteering developers. However, without "device support requests", the developers may not be aware that your specific Zigbee device is not working correctly in ZHA. 

### Best practices to avoid pairing/connection difficulties

If you are having problems pairing a device to then ZHA integratuon then it is recommomended to verify that you try to follow recommended best practices to avoid pairing and/or connection issues:

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

### Reporting issues

When reporting issues, please provide the following information in addition to information requested by issue template:

1. Debug logs for the issue, see [debug logging](#debug-logging)
2. Model of Zigbee radio being used
3. If the issue is related to a specific Zigbee device, provide both the **Zigbee Device Signature** and the **Diagnostics** information.
  - Both the **Zigbee Device Signature** and the **Diagnostics** information can be found under {% my integrations title="**Settings** > **Devices & Services**" %}. Select the **Zigbee Home Automation** integration. Then, select **Configure** > **Devices** (pick your device). Select **Zigbee Device Signature** and **Download Diagnostics**, respectively.

### Debug logging

To enable debug logging for the ZHA integration and radio libraries, add the following [logger](/integrations/logger/) configuration to `configuration.yaml`:

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

Philips Hue bulbs/lights that have previously been paired/added to another bridge/gateway will not show up during search in ZHA to pair/add a Zigbee device. That is because you have to first manually restore your bulbs/lights back to their factory default settings first, and just removing them from your old bridge/gateway is not enough to do so. Instead to achieve a proper device factory reset you can use one of these methods below.

Using a Philips Hue Dimmer Switch or Lutron Connected Bulb Remote is probably the easiest way to factory-reset your bulbs. For this to work, the remote does not have to be paired with your previous bridge. Also, make sure there are no other Hue bulbs nearby that have just been turned on when using this method as you otherwise risk resetting them too.

#### Philips Hue Dimmer Switch

1. Turn on your Hue bulb/light you want to reset. (It is important that the bulb has just been turned).
2. Hold the Philips Hue Dimmer Switch near your bulb (closer than 10 centimeters / 4 inches).
3. Press and hold the (I)/(ON) and (O)/(OFF) buttons on the Philips Hue Dimmer Switch. The bulb should start blinking in 10-20 seconds. The bulb will blink, then turn off, then turn on. You can now release the dimmer buttons.
4. Your bulb is now factor reset and ready for pairing. A green light on the top left of the dimmer remote indicates that your bulb has been successfully reset to factory default settings.

Note: If you are unable to reset the bulb, remove it from the Hue Bridge and retry the procedure.

#### Lutron Connected Bulb Remote

1. Turn on your Hue bulb/light you want to reset. (It is important that the bulb has just been turned).
2. Hold the Dimmer Switch near your bulb (closer than 10 centimeters / 4 inches)
3. Press and hold the 2nd (up arrow) and 4th (light off) buttons on the Lutron Connected Bulb Remote simultaneously for about 10 seconds continuously until your bulb starts to blink and the green LED on the remote should also start blink slowly.
4. Continue to hold both buttons on the remote until the green LED on it stops blinking. Your bulb should also have stopped blinking and eventually turn on again indicating that your bulb has been successfully reset to factory default settings.

#### hue-thief

Follow the instructions on [https://github.com/vanviegen/hue-thief/](https://github.com/vanviegen/hue-thief/) (EZSP-based Zigbee USB stick required)

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
