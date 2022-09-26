---
title: "esphomelib - A comprehensive solution for using ESPs with Home Assistant"
description: "Use the esphomelib suite to make using ESPs really simple."
date: 2018-06-05 06:24:55 +0000
date_formatted: "June 5, 2018"
author: Otto Winter
author_twitter: OttoWinter_
categories: How-To ESP8266
og_image: /images/blog/2018-06-esphomelib/social.png
---

The [ESP8266](https://www.espressif.com/products/socs/esp8266) and [ESP32](https://www.espressif.com/products/socs/esp32) are dirt cheap WiFi-enabled microcontrollers that have established themselves as the base for many DIY home automation projects. Even quite a few manufacturers like iTead with their Sonoff devices have chosen these controllers because of their competitive price.

Setting up these microcontrollers for some basic functionality has also gotten really easy over the years with popular projects like ESPEasy or Sonoff-Tasmota: You just download their firmware and flash it onto your chip. But if you’ve ever tried to go a bit beyond the basic set of functions of those frameworks and tried to do some customization, you will have probably noticed that it’s not that easy. Often times you’ll end up having to download some Arduino code project from the internet and customizing it to your needs.

This is where esphomelib comes in: The [esphomelib suite](https://esphome.io/) is a set of tools that are designed with the goal of achieving the best possible user experience.  esphomelib a) allows for lots of customization without touching *a single line* of code and b) has complete Home Assistant integration. Inside the esphomelib ecosystem, you essentially just have to write a simple YAML configuration file. The rest like compiling, flashing, uploading etc. will then be taken care of automatically.

<!--more-->

## Installation

An example probably illustrates this the best. To use esphomeyaml, there are two main ways: From a [HassIO add-on](https://esphome.io/guides/getting_started_hassio.html), or from the [command line](https://esphome.io/guides/getting_started_command_line.html). For the esphomeyaml add-on, you just have to add "[https://github.com/esphome/esphome](https://github.com/esphome/esphome)" as an add-on repository (see [Installing third party add-ons](/hassio/installing_third_party_addons/)). Then select and install “esphomeyaml” and wait for the installation to complete. After that, you will be able to start the add-on and view the web interface.

From the command line you just need to install the **Python 2** package using the pip command seen below. Then visit `localhost:6052` to view the dashboard.

```bash
pip2 install esphomeyaml
esphomeyaml config/ dashboard
# Alternative for docker users:
docker run --rm -p 6052:6052 -p 6123:6123 -v "$PWD":/config ottowinter/esphomeyaml /config dashboard
```

<div class="videoWrapper">
  <iframe width="853" height="480" src="https://www.youtube-nocookie.com/embed/uWZmc_MjSWs?rel=0&amp;showinfo=0loop=1&amp;autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

Once in the dashboard interface, you will be greeted by a small setup wizard that will help you get started with esphomeyaml and create a basic configuration. You should end up with a configuration file like this.

```yaml
esphomeyaml:
  name: livingroom
  platform: ESP8266
  board: nodemcuv2

wifi:
  ssid: "MySSID"
  password: "MyPassword"

mqtt:
  broker: "192.168.178.83"
  username: ""
  password: ""

logger:
ota:
```

At this point, you can already flash the firmware. To do this, first plug in the USB cable of the ESP into a USB port of the device esphomeyaml is running on and wait until you see a “Discovered new serial port” message (in some cases you need to restart the add-on). Select the upload port in the top navigation bar and press the big "UPLOAD" button. If everything succeeds, you should now have a functioning esphomelib node and see the debug logs 🎉

## Adding some basic functionality

Above configuration is, let’s face it, pretty dull. It really only connects to WiFi and MQTT and sits idle. So let’s add a basic [GPIO switch](https://esphome.io/components/switch/gpio.html)! The GPIO switch component in esphomelib allows you to control the ON/OFF state of any of the pins on your ESP. For example, if you add this configuration to the bottom of your YAML file, you’re setting up the pin `GPIO5` to be controlled as a switch with the name "Living Room Dehumidifer".

```yaml
switch:
  - platform: gpio
    name: "Living Room Dehumidifer"
    pin: GPIO5
```
If you now press upload again (this time the ESP doesn't need to be connected via USB, as updates [can be done over WiFi](https://esphome.io/components/ota.html)), you will see a switch show up in Home Assistant automatically through [MQTT discovery](/docs/mqtt/discovery/).

<p class='img'>
  <img
    src='/images/blog/2018-06-esphomelib/switch.png'
    alt='esphomeyamls setup wizard.'>
  How the newly configured switch will show up in Home Assistant if <a href='/docs/mqtt/discovery/'>MQTT
  discovery</a> is enabled and a <a href='/integrations/group/'>default view</a> is used.
</p>

Granted, this functionality would have been pretty simple with other projects too. But once you start adding [lights](https://esphome.io/index.html#light-components), [covers](https://esphome.io/index.html#cover-components) and [other sensors](https://esphome.io/index.html#sensor-components), esphomelib’s modular design really starts to shine.

## See Also

- [View the full getting started guide (including how to migrate from other projects)](https://esphome.io/guides/)
- [Device-specific setup guides](https://esphome.io/#devices)
- [List of supported sensors/actuators](https://esphome.io/)
- Join the [discord server](https://discord.gg/KhAMKrd) if you need help.
