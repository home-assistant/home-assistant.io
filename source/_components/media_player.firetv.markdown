---
layout: page
title: "FireTV"
description: "Instructions on how to integrate Fire-TV into Home Assistant."
date: 2015-10-23 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: firetv.png
ha_category: Media Player
ha_release: 0.7.6
ha_iot_class: "Local Polling"
---


The `firetv` platform allows you to control a [Amazon Fire TV/stick](http://www.amazon.com/Amazon-DV83YW-Fire-TV/dp/B00U3FPN4U).

The python-firetv Python 2.x module with its helper script that exposes a HTTP server to fetch state and perform actions is used.

Steps to configure your Amazon Fire TV stick with Home Assistant:

- Turn on ADB Debugging on your Amazon Fire TV:
  - From the main (Launcher) screen, select Settings.
  - Select System > Developer Options.
  - Select ADB Debugging.
- Find Amazon Fire TV device IP:
  - From the main (Launcher) screen, select Settings.
  - Select System > About > Network.
- The following commands must be run in a Python 2.x environment. They will allow the component to function in an Ubuntu 16.04/Hassbian environment.
  - `apt-get install swig libssl-dev python-dev libusb-1.0-0 python-yaml`
  - `pip install flask`
  - `pip install https://pypi.python.org/packages/source/M/M2Crypto/M2Crypto-0.24.0.tar.gz`
  - `pip install firetv[firetv-server]`
- `firetv-server -d <fire tv device IP>:5555`, background the process
- Navigate to http://localhost:5556/devices/list
  - You will get an output similar to below:
```json
{
  "devices": {
    "default": {
      "host": "192.168.1.153:5555", 
      "state": "play"
    }
  }
}
```
- The `"default"` above is the device name you will need to use for your `configuration.yaml` 
- Configure Home Assistant as follows:

To add FireTV to your installation, Note your device name, and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: firetv
```

Configuration variables:

- **host** (*Optional*): The host where `firetv-server` is running. Default is localhost.
- **port** (*Optional*): The port where `firetv-server` is running. Default is 5556.
- **device** (*Optional*): The device ID. Defaults to `default`.
- **name** (*Optional*): The friendly name of the device, default is 'Amazon Fire TV'.


<p class='note warning'>
Note that python-firetv has support for multiple Amazon Fire TV devices. If you have more than one configured, be sure to specify the device ID in `device`. Run `firetv-server -h` and/or view the source for complete capabilities.
</p>

