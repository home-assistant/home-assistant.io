---
layout: page
title: "FireTV support"
description: "Instructions how to integrate Music Player Daemon into Home Assistant."
date: 2015-10-23 18:00
sidebar: false
comments: false
sharing: true
footer: true
logo: firetv.png
ha_category: Media Player
---

<img src='/images/supported_brands/firetv.png' class='brand pull-right' />
The firetv platform allows you to control a [Amazon Fire TV/stick](http://www.amazon.com/Amazon-DV83YW-Fire-TV/dp/B00U3FPN4U).

The python-firetv Python 2.x module with its helper script that exposes a HTTP server to fetch state and perform actions is used.

Steps to configure your Amazon Fire TV stick with Home Assistant:

- Turn on ADB Debugging on your Amazon Fire TV:
  - From the main (Launcher) screen, select Settings.
  - Select System > Developer Options.
  - Select ADB Debugging.
- Find Amazon Fire TV device IP:
  - From the main (Launcher) screen, select Settings.
  - Select System > About > Network.
- `pip install firetv[firetv-server]` into a Python 2.x environment
- `firetv-server -d <fire tv device IP>:5555`, background the process
- Configure Home Assistant as follows:


To add FireTV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  platform: firetv
  host: localhost:5556
  device: livingroom-firetv
  name: My Amazon Fire TV
```

Configuration variables:

- **host** *Optional*: Where `firetv-server` is running. Default is *localhost:5556*.
- **device** *Optional*: The device ID, default is *default*.
- **name** *Optional*: The friendly name of the device, default is 'Amazon Fire TV'.


<p class='note warning'>
Note that python-firetv has support for multiple Amazon Fire TV devices. If you have more than one configured, be sure to specify the device id used. Run `firetv-server -h` and/or view the source for complete capabilities.
</p>

