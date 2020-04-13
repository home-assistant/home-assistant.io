---
title: Zigbee Home Automation
description: Instructions on how to integrate your Zigbee Home Automation (ZHA) devices within Home Assistant.
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
ha_domain: zha
---

[Zigbee Home Automation](https://zigbeealliance.org)
integration for Home Assistant allows you to connect many off-the-shelf Zigbee based devices to Home Assistant, using one of the available Zigbee radio modules that is compatible with [zigpy](https://github.com/zigpy/zigpy) (an open source Python library implementing a Zigbee stack, which in turn relies on separate libraries which can each interface a with Zigbee radio module a different manufacturer).

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Cover
- Fan
- Light
- Lock
- Sensor
- Switch

There is also support for grouping of lights, switches, and fans (i.e. support for commanding device groups as entities).

## ZHA exception and deviation handling

Zigbee devices that deviate from or do not fully conform to the standard specifications set by the [Zigbee Alliance](https://zigbeealliance.org) may require the development of custom [ZHA Device Handlers](https://github.com/dmulcahey/zha-device-handlers) (ZHA custom quirks handler implementation) to for all their functions to work properly with the ZHA integration in Home Assistant. These ZHA Device Handlers for Home Assistant can thus be used to parse custom messages to and from Zigbee devices.

The custom quirks implementations for zigpy implemented as ZHA Device Handlers for Home Assistant are a similar concept to that of [Hub-connected Device Handlers for the SmartThings Classics platform](https://docs.smartthings.com/en/latest/device-type-developers-guide/) as well as that of [Zigbee-Shepherd Converters as used by Zigbee2mqtt](https://www.zigbee2mqtt.io/how_tos/how_to_support_new_devices.html), meaning they are each virtual representations of a physical device that expose additional functionality that is not provided out-of-the-box by the existing integration between these platforms.

## Known working Zigbee radio modules

- dresden elektronik deCONZ based Zigbee radios (via the [zigpy-deconz](https://github.com/zigpy/zigpy-deconz) library for zigpy)
  - [ConBee II (a.k.a. ConBee 2) USB adapter from dresden elektronik](https://phoscon.de/conbee2)
  - [ConBee USB adapter from dresden elektronik](https://phoscon.de/conbee)
  - [RaspBee Raspberry Pi Shield from dresden elektronik](https://phoscon.de/raspbee)
- EmberZNet based radios using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)
  - [Nortek GoControl QuickStick Combo Model HUSBZB-1 (Z-Wave & Zigbee USB Adapter)](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)
  - [Elelabs Zigbee USB Adapter](https://elelabs.com/products/elelabs_usb_adapter.html)
  - [Elelabs Zigbee Raspberry Pi Shield](https://elelabs.com/products/elelabs_zigbee_shield.html)
  - Telegesis ETRX357USB (Note! This first have to be flashed with other EmberZNet firmware)
  - Telegesis ETRX357USB-LRS (Note! This first have to be flashed with other EmberZNet firmware)
  - Telegesis ETRX357USB-LRS+8M (Note! This first have to be flashed with other EmberZNet firmware)
- Texas Instruments CC253x, CC26x2R, and CC13x2 based radios (via the [zigpy-cc](https://github.com/sanyatuning/zigpy-cc) library for zigpy)
  - [CC2531 USB stick hardware flashed with custom Z-Stack coordinator firmware from the Zigbee2mqtt project](https://www.zigbee2mqtt.io/getting_started/what_do_i_need.html)
  - [CC2530 + CC2591 USB stick hardware flashed with custom Z-Stack coordinator firmware from the Zigbee2mqtt project](https://www.zigbee2mqtt.io/getting_started/what_do_i_need.html)
  - [CC2530 + CC2592 dev board hardware flashed with custom Z-Stack coordinator firmware from the Zigbee2mqtt project](https://www.zigbee2mqtt.io/getting_started/what_do_i_need.html)
  - [CC2652R dev board hardware flashed with custom Z-Stack coordinator firmware from the Zigbee2mqtt project](https://www.zigbee2mqtt.io/getting_started/what_do_i_need.html)
  - [CC1352P-2 dev board hardware flashed with custom Z-Stack coordinator firmware from the Zigbee2mqtt project](https://www.zigbee2mqtt.io/getting_started/what_do_i_need.html)
  - [CC2538 + CC2592 dev board hardware flashed with custom Z-Stack coordinator firmware from the Zigbee2mqtt project](https://www.zigbee2mqtt.io/getting_started/what_do_i_need.html)
- XBee Zigbee based radios (via the [zigpy-xbee](https://github.com/zigpy/zigpy-xbee) library for zigpy)
  - Digi XBee Series 3 (xbee3-24) modules
  - Digi XBee Series 2C (S2C) modules
  - Digi XBee Series 2 (S2) modules (Note! This first have to be flashed with Zigbee Coordinator API firmware)
- ZiGate based radios (via the [zigpy-zigate](https://github.com/doudz/zigpy-zigate) library for zigpy and require firmware 3.1a or later)
  - [ZiGate USB-TTL](https://zigate.fr/produit/zigate-ttl/)
  - [ZiGate USB-DIN](https://zigate.fr/produit/zigate-usb-din/)
  - [PiZiGate](https://zigate.fr/produit/pizigate-v1-0/)
  - [Wifi ZiGate](https://zigate.fr/produit/zigate-pack-wifi-v1-3/)

## Configuration - GUI

From the Home Assistant front page go to **Configuration** and then select **Integrations** from the list.

Use the plus button in the bottom right to add a new integration called **ZHA**.

In the popup:

- USB Device Path - on a Linux system will be something like `/dev/ttyUSB0` or `/dev/ttyACM0`
- Radio type - select device type `ezsp`, `deconz`, `ti_cc`, `xbee` or `zigate`
- Submit

| Radio Type | Zigbee Radio Hardware |
| ------------- | ------------- |
| `ezsp`  | EmberZNet based radios, Telegesis ETRX357USB*** (using EmberZNet firmware)  |
| `deconz` | ConBee, ConBee II |
| `xbee` | Digi XBee Series 2, 2C, 3  |

- Press `Submit` to save changes.

The success dialog will appear or an error will be displayed in the popup. An error is likely if Home Assistant can't access the USB device or your device is not up to date. Refer to [Troubleshooting](#troubleshooting) below for more information.

## Configuration - Manual

To configure the component, select ZHA on the Integrations page and provide the path to your Zigbee USB stick.

Or, you can manually configure `zha` section in `configuration.yaml`. The path to the database which will persist your network data is required.

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
  description: One of `deconz`, `ezsp`, `ti_cc`, `xbee` or `zigate`.
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

### ZHA Start up issue with Home Assistant Supervised or Home Assistant Core on Docker

On Linux hosts ZHA can fail to start during HA startup or restarts because the Zigbee USB device is being claimed by the host's modemmanager service. To fix this disable the modemmanger on the host system.

To remove modemmanager from an Debian/Ubuntu host run this command:

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
