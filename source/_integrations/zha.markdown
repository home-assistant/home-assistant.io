---
title: Zigbee Home Automation
description: Instructions on how to integrate your Zigbee Home Automation (ZHA) devices within Home Assistant.
logo: zigbee.png
ha_category:
  - Hub
  - Binary Sensor
  - Fan
  - Light
  - Lock
  - Sensor
  - Switch
  - Cover
ha_release: 0.44
ha_iot_class: Local Polling
featured: true
ha_config_flow: true
ha_codeowners:
  - '@dmulcahey'
  - '@adminiuga'
---

[Zigbee Home Automation (ZHA)](https://www.home-assistant.io/integrations/zha/)
integration nativly adds built-in hub support to Home Assistant for connecting many off-the-shelf [Zigbee](https://zigbeealliance.org) devices made for home automation, allowing Assistant itself to create its own Zigbee mesh-network. All you need is directly plug-in one of the many compatible Zigbee radio adapters/modules into your computer runnning Home Assistant via USB or GPIO/UART.

Being a native integration in Home Assistant means that it uses its official user-interface(s) and front-end(s), and it is therefore also very simple to get started with as only have to handle Home Assistant. As it is a built-in components means that it and its interfaces are automatically updated along with Home Assistant. By working directly with the coordinator hardware there is no need to configure any additional third-party software or hardware to act as Zigbee bridge/gateway which has to be separately maintained. 

There is currently no list of which Zigbee devices is specifically supported, but a such compatibility list should not really be needed as any devices compliant with the [Zigbee Home Automation](https://zigbee.org/zigbee-for-developers/applicationstandards/zigbeehomeautomation/) specification standard should in theory work. Advanced users can add support for not yet working devices or devices only partially working is possible via custom ZHA Device Handlers to improve interoperable compatibility, a process which is also documented.

This integration implemenation for Home Assistant is based on [zigpy](https://github.com/zigpy/zigpy), an open source Python library implementing a Zigbee stack. The zigpy libary in turn depends on several other open source Python libraries which each can interface directly with Zigbee radio hardware from different manufacturers (using serial communication). This modular design that zigpy has makes it possible for seperate developers to add support for additional Zigbee radio adapter/module hardware, no matter who the hardware manufacturer is. 

Currently this integration has support for the following device types within Home Assistant:

- Binary Sensor
- Cover
- Fan
- Light
- Lock
- Sensor
- Switch

## What is Zigbee Home Automation?
Zigbee Home Automation is a wireless two-way communication protocol specification designed for building secure PAN (Personal Area Networks) that is well suited to home automation devices. With the exception that Zigbee Home Automation operates within the unlicensed 2.4 GHz band worldwide, the Zigbee protocol are similar to the Z-Wave protocol in the way that it also uses a two-way communication protocol over low-power and low-bandwidth digital radio to build a mesh-network that allows devices that are not in direct range of each other to communicate indirectly via other nodes that uses the same Zigbee protocol specification.

Your main Zigbee radio module/adapter act as a "coordinator" in your mesh-network and many Zigbee devices that are permanently powereded (using mains AC electricity) and not just battery powered will as such act as "routers" to help extend the mesh-network. Battery powered devices and other devices which do not act as routers are called "end devices", (Zigbee light bulbs are for example likley to act as an "end device" even though they are permanently powered). If you do not have enough routers or you locate your routers poorly then your Zigbee mesh-network can become unreliable.

Before buying any Zigbee hardware you should be aware that each device model as well as the "coordinator" hardware in your mesh-network may also be deliver better or worse radio range than other device models. Also, while the hard limit of a single Zigbee mesh-network is some 65 thousand devices, Zigbee radio modules/adapters hardware from different manufacturers will different recommendations on how many routers that you can actually directly connect to it and how many that you can indirectly connect to their mesh-network as in total.

Zigbee devices generally cost much less than similar Z-Wave devices, which is mainly due to all Z-Wave having to go though a certification process which is meant to make sure that all Z-Wave work togther for a uniformed intercompatible. Historically relying on interoperable compatibility between devices from different manufacurers has not with Zigbee has not been the case, this has however gotten much better in modern Zigbee stacks and integration implementations, like later device firmware and the ZHA in Home Assistant. Neither Zigbee or Z-Wave can be said to be universally better than the other as both technologies have different advantages and disadvantages over each other.

In practice there is today no need to worry to much as most Zigbee mesh-network issues can be solved by relative simple toubleshooting. There are reports of Zigbee mesh-networks containing many several hundreds of devices that perform well, and many times toubleshooting can some times be as simple as making sure you have your "routers" that provide good range / radio strenght directly corrected to your "coordinator" as well as having your "end devices" connected to your best "routers".

## Known working Zigbee radio modules

- EmberZNet based radios using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)
  - [Nortek GoControl QuickStick Combo Model HUSBZB-1 (Z-Wave & Zigbee USB Adapter)](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)
  - [Elelabs Zigbee USB Adapter](https://elelabs.com/products/elelabs_usb_adapter.html)
  - [Elelabs Zigbee Raspberry Pi Shield](https://elelabs.com/products/elelabs_zigbee_shield.html)
  - Telegesis ETRX357USB (Note! This first have to be flashed with other EmberZNet firmware)
  - Telegesis ETRX357USB-LRS (Note! This first have to be flashed with other EmberZNet firmware)
  - Telegesis ETRX357USB-LRS+8M (Note! This first have to be flashed with other EmberZNet firmware)
- XBee Zigbee based radios (via the [zigpy-xbee](https://github.com/zigpy/zigpy-xbee) library for zigpy)
  - Digi XBee Series 3 (xbee3-24) modules
  - Digi XBee Series 2C (S2C) modules
  - Digi XBee Series 2 (S2) modules (Note! This first have to be flashed with Zigbee Coordinator API firmware)
- dresden elektronik deCONZ based Zigbee radios (via the [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) library for zigpy)
  - [ConBee II (a.k.a. ConBee 2) USB adapter from dresden elektronik](https://phoscon.de/conbee2)
  - [ConBee USB adapter from dresden elektronik](https://phoscon.de/conbee)
  - [RaspBee Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee)
- ZiGate based radios (via the [zigpy-zigate](https://github.com/doudz/zigpy-zigate) library for zigpy and require firmware 3.1a or later)
  - [ZiGate USB-TTL](https://zigate.fr/produit/zigate-ttl/)
  - [ZiGate USB-DIN](https://zigate.fr/produit/zigate-usb-din/)
  - [PiZiGate](https://zigate.fr/produit/pizigate-v1-0/)
  - [Wifi ZiGate](https://zigate.fr/produit/zigate-pack-wifi-v1-3/) (work in progress)

## Configuration - GUI

From the Home Assistant front page go to **Configuration** and then select **Integrations** from the list.

Use the plus button in the bottom right to add a new integration called **ZHA**.

In the popup:

  - USB Device Path - on a linux system will be something like `/dev/ttyUSB0`
  - Radio type - select device type **ezsp**, **deconz** or **xbee**
  - Submit

The success dialog will appear or an error will be displayed in the popup. An error is likely if Home Assistant can't access the USB device or your device is not up to date (see troubleshooting).

## Configuration - Manual

To configure the component, select ZHA on the Integrations page and provide the path to your Zigbee USB stick.

Or, you can manually confiure `zha` section in `configuration.yaml`. The path to the database which will persist your network data is required.

```yaml
# Example configuration.yaml entry
zha:
  usb_path: /dev/ttyUSB2
  database_path: /home/homeassistant/.homeassistant/zigbee.db
```

If you are use ZiGate, you have to use some special usb_path configuration:
  - ZiGate USB TTL or DIN: `/dev/ttyUSB0` or `auto` to auto discover the zigate
  - PiZigate : `pizigate:/dev/serial0`
  - Wifi Zigate : `socket://[IP]:[PORT]` for example `socket://192.168.1.10:9999`

{% configuration %}
radio_type:
  description: One of `ezsp`, `xbee`, `deconz` or `zigate`.
  required: false
  type: string
  default: ezsp
usb_path:
  description: Path to the serial device for the radio.
  required: true
  type: string
baudrate:
  description: Baud rate of the serial device.
  required: false
  type: integer
  default: 57600
database_path:
  description: _Full_ path to the database which will keep persistent network data.
  required: true
  type: string
enable_quirks:
  description: Enable quirks mode for devices where manufacturers didn't follow specs.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

To add new devices to the network, call the `permit` service on the `zha` domain. Do this by clicking the Service icon in Developer tools and typing `zha.permit` in the **Service** dropdown box. Next, follow the device instructions for adding, scanning or factory reset.

## Adding devices

Go to the **Configuration** page and select the **ZHA** integration that was added by the configuration steps above.

Click on **ADD DEVICES** to start a scan for new devices.

Reset your Zigbee devices according to the device instructions provided by the manufacturer (e.g.,  turn on/off lights up to 10 times, switches usually have a reset button/pin).

## Troubleshooting

### General tips for improving the range and comminication within a Zigbee mesh-network

Add more routers between the problem devices and the next nearest router. In a Zigbee mesh-network, each router will extend the range of the mesh-network. As a rule of tumb, almost all permantly powered devices will serve as a router (however many Zigbee light bulbs are commonly excepted from that rule).

Adding a USB extension cable will move your USB stick away from the computer you've connected it to. . A USB extension cable of of 1-meter and placing it away from any other radios/antennas can often reduce interference, and thus improve your range.

Add an external antenna to your coordinator, and position the antenna away from the computer. Next level of this is to add a antenna extension cable, but be warned here that you should not use too long antenna extension cables as each meter added decrease the signal strength.

Try different orientation of your Zigbee antenna (or your whole Zigbee adapter if it has an internal antenna). This is because the connection between the Zigbee radio of your "coordinator" and your other devices depends on the way the antenna oriented in space.

Ensure that any WiFi router/access point, WiFi USB stick, Z-Wave stick, or RF433 stick are as far away as you can get them (preferably at least one meter if you can). This will also reduce interference.

Check the WiFi channels in use, to see if your router/access point is now talking over your Zigbee mesh. If so change the channel of the WiFi access point and lock it. If you have to change the channel of your Zigbee mesh then you'll have to re-pair your devices.

Buy more powerful Zigbee radio hardware with better radio range, preferably with an external antenna.

If you're still stuck at that point, head over the #zigbee channel on the [Home Assistant Discord server](https://discord.gg/c5DvZ4e), or the [Zigbee section of the community forum](https://community.home-assistant.io/c/configuration/zigbee).

### ZHA exception and deviation handling

Zigbee devices that deviate from or do not fully conform to the standard specifications set by the [Zigbee Alliance](https://www.zigbee.org) may require the development of custom [ZHA Device Handlers](https://github.com/dmulcahey/zha-device-handlers) (ZHA custom quirks handler implementation) to for all their functions to work properly with the ZHA integration in Home Assistant. These ZHA Device Handlers for Home Assistant can thus be used to parse custom messages to and from Zigbee devices.

The custom quirks implementations for zigpy implemented as ZHA Device Handlers are a similar concept to that of [Hub-connected Device Handlers for the SmartThings Classics platform](https://docs.smartthings.com/en/latest/device-type-developers-guide/) as well that of [Zigbee-Herdsman Converters / Zigbee-Shepherd Converters as used by Zigbee2mqtt](https://www.zigbee2mqtt.io/how_tos/how_to_support_new_devices.html), meaning they are virtual representation of a physical device that expose additional functionality that is not provided out-of-the-box by the existing integration between these platforms. See [Device Specifics](#Device-Specifics) for details.

### Add Philips Hue bulbs that have previously been added to another bridge

Philips Hue bulbs that have previously been added to another bridge won't show up during search. You have to restore your bulbs back to factory settings first. To achieve this, you basically have the following options.

#### Philips Hue Dimmer Switch

Using a Philips Hue Dimmer Switch is probably the easiest way to factory-reset your bulbs. For this to work, the remote doesn't have to be paired with your previous bridge.

1. Turn on your Hue bulb you want to reset
2. Hold the Dimmer Switch near your bulb (< 10 cm)
3. Press and hold the (I)/(ON) and (O)/(OFF) buttons of the Dimmer Switch for about 10 seconds until your bulb starts to blink
4. Your bulb should stop blinking and eventually turning on again. At the same time, a green light on the top left of your remote indicates that your bulb has been successfully reset to factory settings.

#### hue-thief

Follow the instructions on [https://github.com/vanviegen/hue-thief/](https://github.com/vanviegen/hue-thief/) (EZSP-based Zigbee USB stick required)

### ZHA Start up issue with Home-Assistant Docker/Hass.io installs on linux hosts

On Linux hosts ZHA can fail to start during HA startup or restarts because the Zigbee USB device is being claimed by the host's modemmanager service. To fix this disable the modemmanger on the host system.

To remove modemmanager from an Debian/Ubuntu host run this command:

```bash
sudo apt-get purge modemmanager
```

### Can't connect to USB device and using Docker

If you are using Docker and can't connect, you most likely need to forward your device from the host machine to the Docker instance. This can be achieved by adding the device mapping to the end of the startup string or ideally using docker compose.

#### Docker Compose

Install Docker-Compose for your platform (linux - `sudo apt-get install docker-compose`).

Create a `docker-compose.yml` with the following data:

```yaml
version: '2'
services:
  homeassistant:
    # customisable name
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

## Related projects and development

### Zigpy
[Zigpy](https://github.com/zigpy/zigpy)** is **[Zigbee protocol stack](https://en.wikipedia.org/wiki/Zigbee)** integration project to implement the **[Zigbee Home Automation](https://www.zigbee.org/)** standard as a Python 3 library. Zigbee Home Automation integration with zigpy allows you to connect one of many off-the-shelf Zigbee adapters using one of the available Zigbee radio library modules compatible with zigpy to control Zigbee based devices. There is currently support for controlling Zigbee device types such as binary sensors (e.g., motion and door sensors), sensors (e.g., temperature sensors), lightbulbs, switches, and fans. A working implementation of zigbe exist in **[Home Assistant](https://www.home-assistant.io)** (Python based open source home automation software) as part of its **[ZHA component](https://www.home-assistant.io/components/zha/)**

### ZHA Map
Home Assistant can build ZHA network topology map using the [zha-map](https://github.com/zha-ng/zha-map) project.

### zha-network-visualization-card
[zha-network-visualization-card](https://github.com/dmulcahey/zha-network-visualization-card) is a custom Lovelace element for visualizing the ZHA Zigbee network in Home Assistant.

### ZHA Network Card
[zha-network-card](https://github.com/dmulcahey/zha-network-card) is a custom Lovelace card that displays ZHA network and device information in Home Assistant

### zigpy-deconz-parser
[zigpy-deconz-parser](https://github.com/zha-ng/zigpy-deconz-parser) project can parse Home Assistant ZHA integration component debug log using `zigpy-deconz` library (if you have ConBee or RaspBee hardware from Dresden Elektronik).
