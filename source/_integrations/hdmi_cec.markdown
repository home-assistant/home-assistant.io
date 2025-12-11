---
title: HDMI-CEC
description: Instructions on how to interact with HDMI-CEC via Home Assistant.
ha_category:
  - Automation
ha_release: 0.23
ha_iot_class: Local Push
ha_domain: hdmi_cec
ha_platforms:
  - media_player
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@inytar'
ha_quality_scale: legacy
---

The `hdmi_cec` integration provides actions that allow selecting the active device, powering on all devices, setting all devices to standby and creates switch entities for HDMI devices. Devices are defined in the configuration file by associating HDMI port number and a device name. Connected devices that provide further HDMI ports, such as sound-bars and AVRs are also supported. Devices are listed from the perspective of the CEC-enabled Home Assistant device. Any connected device can be listed, regardless of whether it supports CEC. Ideally the HDMI port number on your device will map correctly the CEC physical address. If it does not, use `cec-client` (part of the `libcec` package) to listen to traffic on the CEC bus and discover the correct numbers.

## CEC Setup

### Home Assistant OS

To test if HDMI-CEC will work on your Home Assistant OS installation, you can use the official **CEC Scanner** add-on. Run this add-on to see if your hardware has HDMI-CEC capabilities and which devices are connected. Do not have this add-on **Start on boot** as it will interfere with the integration. 

Once you've run the add-on, you can use the resulting scan information to configure the integration.

### Adapter

The computer running Home Assistant must support CEC, and of course be connected via HDMI to a device also supporting CEC. You can purchase a [USB CEC adapter](https://www.pulse-eight.com/p/104/usb-hdmi-cec-adapter) to add support if necessary. Note that all Raspberry Pi models support CEC natively.

### libcec

This section only applies to users of Home Assistant Core in a Python virtual environment.

[libcec](https://github.com/Pulse-Eight/libcec) must be installed for this integration to work. Follow the installation instructions for your environment, provided at the link. `libcec` installs Python 3 bindings by default as a system Python module. If you are running Home Assistant in a [Python virtual environment](/docs/installation/virtualenv/), make sure it can access the system module, by either symlinking it or using the `--system-site-packages` flag.

#### Symlinking into virtual environment

Create a symlink to the `cec` installation including the _cec.so file. Keep in mind different installation methods will result in different locations of cec.

```bash
ln -s /path/to/your/installation/of/cec.py /path/to/your/venv/lib/python*/site-packages
ln -s /path/to/your/installation/of/_cec.so /path/to/your/venv/lib/python*/site-packages

```

##### Symlinking examples

For the default virtual environment of a [Manual install for Raspberry Pi](/installation/raspberrypi) the command would be as follows.

```bash
ln -s /usr/local/lib/python*/dist-packages/cec.py /srv/homeassistant/lib/python*/site-packages
ln -s /usr/local/lib/python*/dist-packages/_cec.so /srv/homeassistant/lib/python*/site-packages
```

{% note %}
If after symlinking and adding `hdmi_cec:` to your configuration you are getting the following error in your logs,
`* failed to open vchiq instance` you will also need to add the user account Home Assistant runs under, to the `video` group. To add the Home Assistant user account to the `video` group, run the following command. `$ usermod -a -G video <hass_user_account>`
{% endnote %}

## Testing your installation

- Login to Raspberry Pi

```bash
ssh pi@your_raspberry_pi_ip
```

- at the command line type:

```bash
echo scan | cec-client -s -d 1
```

Note: to use this command you have to install cec-utils package. In Debian based should be: ```sudo apt install cec-utils```

- This will give you the list of devices that are on the bus

```bash
opening a connection to the CEC adapter...
requesting CEC bus information ...
CEC bus information
===================
device #4: Playback 1
address:       3.0.0.0
active source: no
vendor:        Sony
osd string:    BD
CEC version:   1.4
power status:  on
language:      ???
```

{% note %}
`address:` entry above this will be used to configure Home Assistant, this address is represented below as 3: BlueRay player.
{% endnote %}

## Configuration Example

In the following example, a Pi Zero running Home Assistant is on a TV's HDMI port 1. HDMI port 2 is attached to a AV receiver. Three devices are attached to the AV receiver on HDMI ports 1 through 3.

You can use either direct mapping name to physical address of device

```yaml
hdmi_cec:
  devices:
    TV: 0.0.0.0
    Pi Zero: 1.0.0.0
    Fire TV Stick: 2.1.0.0
    Chromecast: 2.2.0.0
    Another Device: 2.3.0.0
    BlueRay player: 3.0.0.0
```

or port mapping tree:

```yaml
hdmi_cec:
  devices:
    1: Pi Zero
    2:
      1: Fire TV Stick
      2: Chromecast
      3: Another Device
    3: BlueRay player
```

Choose just one schema. Mixing both approaches is not possible.

Another option you can use in configuration is `platform` which specifying of default platform of HDMI devices. "switch" and "media_player" are supported. Switch is default.

```yaml
hdmi_cec:
  platform: media_player
```

Then you set individual platform for devices in customizations:

```yaml
hdmi_cec:
  types:
    hdmi_cec.hdmi_5: media_player
```

And the last option is `host`. PyCEC supports bridging CEC commands over TCP. When you start pyCEC on machine with HDMI port (`python -m pycec`), you can then run Home Assistant on another machine and connect to CEC over TCP. Specify TCP address of pyCEC server:

```yaml
hdmi_cec:
  host: 192.168.1.3
```

## Actions

### Select Device

Use the `hdmi_cec.select_device` action with the name of the device from configuration or entity_id or physical address"to select it, for example:

```json
{"device": "Chromecast"}
```

```json
{"device": "switch.hdmi_3"}
```

```json
{"device": "1.1.0.0"}
```

So an Automation action using the example above would look something like this.

```yaml
actions:
  - action: hdmi_cec.select_device
    data:
      device: Chromecast
```

### Power On

Use the `hdmi_cec.power_on` action (no arguments) to power on any devices that support this function.

An Automation action using the example above would look something like this.

```yaml
actions:
  - action: hdmi_cec.power_on
```

### Standby

Use the `hdmi_cec.standby` action (no arguments) to place in standby any devices that support this function.

An Automation action using the example above would look something like this.

```yaml
actions:
  - action: hdmi_cec.standby
```

### Change volume level

Use the `hdmi_cec.volume` action with one of following commands:

#### Volume up

Increase volume three times:

```json
{"up": 3}
```

Keep increasing volume until release is called:

```json
{"up": "press"}
```

Stop increasing volume:

```json
{"up": "release"}
```

#### Volume down

Decrease volume three times:

```json
{"down": 3}
```

Keep decreasing volume until release is called:

```json
{"down": "press"}
```

Stop decreasing volume:

```json
{"down": "release"}
```

#### Volume mute

Toggle mute:

```json
{"mute": ""}
```

value is ignored.

## Useful References

- [CEC overview](https://kwikwai.com/knowledge-base/the-hdmi-cec-bus/)
- [CEC-o-matic](https://www.cec-o-matic.com/)
