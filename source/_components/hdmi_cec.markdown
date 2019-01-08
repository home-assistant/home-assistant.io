---
layout: page
title: "HDMI CEC"
description: "Instructions on how to interact with HDMI CEC via Home Assistant."
date: 2016-06-24 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation
logo: hdmi.png
ha_release: 0.23
ha_iot_class: "Local Push"
redirect_from:
 - /components/media_player.hdmi_cec/
 - /components/switch.hdmi_cec/
---

The `hdmi_cec` component provides services that allow selecting the active device, powering on all devices, setting all devices to standby and creates switch entities for HDMI devices. Devices are defined in the configuration file by associating HDMI port number and a device name. Connected devices that provide further HDMI ports, such as sound-bars and AVRs are also supported. Devices are listed from the perspective of the CEC-enabled Home Assistant device. Any connected device can be listed, regardless of whether it supports CEC. Ideally the HDMI port number on your device will map correctly the CEC physical address. If it does not, use `cec-client` (part of the `libcec` package) to listen to traffic on the CEC bus and discover the correct numbers.

## {% linkable_title CEC Setup %}

### {% linkable_title Adapter %}

The computer running Home Assistant must support CEC, and of course be connected via HDMI to a device also supporting CEC. You can purchase a [USB CEC adapter](https://www.pulse-eight.com/p/104/usb-hdmi-cec-adapter) to add support if necessary. Note that all Raspberry Pi models support CEC natively.

### {% linkable_title libcec %}

[libcec](https://github.com/Pulse-Eight/libcec) must be installed for this component to work. Follow the installation instructions for your environment, provided at the link. `libcec` installs Python 3 bindings by default as a system Python module. If you are running Home Assistant in a [Python virtual environment](/docs/installation/virtualenv/), make sure it can access the system module, by either symlinking it or using the `--system-site-packages` flag.

<p class='note'>
If you are using [Hass.io](/hassio/) then just move forward to the configuration as all requirements are already fulfilled.
</p>

#### {% linkable_title Symlinking into virtual environment %}

Create a symlink to the `cec` installation including the _cec.so file. Keep in mind different installation methods will result in different locations of cec.

```bash
$ ln -s /path/to/your/installation/of/cec /path/to/your/venv/lib/python*/site-packages
$ ln -s /path/to/your/installation/of/_cec.so /path/to/your/venv/lib/python*/site-packages

```

##### {% linkable_title Symlinking examples: %}

For the default virtual environment of a [HASSbian Image for Raspberry Pi](/docs/installation/raspberry-pi/) the command would be as follows.

```bash
$ ln -s /usr/local/lib/python*/dist-packages/cec /srv/homeassistant/lib/python*/site-packages
$ ln -s /usr/local/lib/python*/dist-packages/_cec.so /srv/homeassistant/lib/python*/site-packages

```

<p class='note'>If after symlinking and adding `hdmi_cec:` to your configuration you are getting the following error in your logs,
`* failed to open vchiq instance` you will also need to add the user account Home Assistant runs under, to the `video` group. To add the Home Assistant user account to the `video` group, run the following command. `$ usermod -a -G video <hass_user_account>`
</p>

## {% linkable_title Testing your installation %}

*  Login to Raspberry Pi

```bash
ssh pi@your_raspberry_pi_ip
```

*  at the command line type:

```bash
echo scan | cec-client -s -d 1
```
Note: to use this command you have to install cec-utils package. In Debian based should be: ```sudo apt install cec-utils```

*  This will give you the list of devices that are on the bus

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

<p class='note'>`address:` entry above this will be used to configure Home Assistant, this address is represented below as 3: BlueRay player.
</p>

## {% linkable_title Configuration Example %}

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

Another option you can use in config is `platform` which specifying of default platform of HDMI devices. "switch" and "media_player" are supported. Switch is default.

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

And the last option is `host`. PyCEC supports bridging CEC commands over TCP. When you start pyCEC on machine with HDMI port (`python -m pycec`), you can then run homeassistant on another machine and connect to CEC over TCP. Specify TCP address of pyCEC server:

```yaml
hdmi_cec:
  host: 192.168.1.3
```


## {% linkable_title Services %}

### {% linkable_title Select Device %}

Call the `hdmi_cec.select_device` service with the name of the device from config or entity_id or physical address"to select it, for example:

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
action:
  service: hdmi_cec.select_device
    data:
      device: Chromecast
```

### {% linkable_title Power On %}

Call the `hdmi_cec.power_on` service (no arguments) to power on any devices that support this function.

An Automation action using the example above would look something like this.

```yaml
action:
  service: hdmi_cec.power_on
```

### {% linkable_title Standby %}

Call the `hdmi_cec.standby` service (no arguments) to place in standby any devices that support this function.

An Automation action using the example above would look something like this.

```yaml
action:
  service: hdmi_cec.standby
```

### {% linkable_title Change volume level %}

Call the `hdmi_cec.volume` service with one of following commands:

#### {% linkable_title Volume up %}
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

#### {% linkable_title Volume down %}
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

#### {% linkable_title Volume mute %}
Toggle mute:

```json
{"mute": ""}
```

value is ignored.


## {% linkable_title Useful References %}

* [CEC overview](http://wiki.kwikwai.com/index.php?title=The_HDMI-CEC_bus)
* [CEC-o-matic](http://www.cec-o-matic.com/)
