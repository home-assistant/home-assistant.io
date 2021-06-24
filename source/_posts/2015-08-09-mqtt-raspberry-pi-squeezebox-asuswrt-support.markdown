---
title: "MQTT, Rasperry Pi, Logitech Squeezebox and ASUSWRT routers now supported"
description: "New support for MQTT, Rasperry Pi GPIO, Logitech Squeezebox and ASUSWRT routers"
date: 2015-08-09 18:01 0000
date_formatted: "August 9, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

It's time for the August release and there is some serious good stuff this time. The core of Home Assistant has gone some serious clean up and a bump in test coverage thanks to [@balloob](https://github.com/balloob). If you're a developer, make sure you read up on [the deprecation notices](https://github.com/home-assistant/home-assistant/pull/251). [@fabaff](https://github.com/fabaff) did another great round of documenting all the various components.

__MQTT Support__
<img src='/images/supported_brands/mqtt.png' style='border:none; box-shadow: none; float: right;' height='50' /> The big new addition in this release is the support for the MQTT protocol by [@fabaff](https://github.com/fabaff) with some help from [@balloob](https://github.com/balloob). It will now be possible to integrate any IoT device that talks via MQTT. For the initial release we support connecting Home Assistant to a broker (no TLS yet). Components can now subscribe and publish to MQTT topics and also support for the automation component [has been added][mqtt-automation]. For more information, see [the MQTT component page][mqtt-component].


[mqtt-automation]: /getting-started/automation-trigger/#mqtt-trigger
[mqtt-component]: /integrations/mqtt/

```yaml
# Example configuration.yaml entry
mqtt:
  broker: IP_ADDRESS_BROKER
  # All the other options are optional:
  port: 1883
  keepalive: 60
  qos: 0
  username: your_username
  password: your_secret_password
```

<!--more-->

__Raspberry Pi GPIO Support__
<img src='/images/supported_brands/raspberry-pi.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@gbarba](https://github.com/gbarba) has contributed support to use the general purpose input and output pins on a Raspberry Pi as switches inside Home Assistant.

```yaml
# Example configuration.yaml entry
switch:
  platform: rpi_gpio
  ports:
    11: Fan Office
    12: Light Desk
```

__ASUSWRT based routers__
<img src='/images/supported_brands/asus.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@persandstrom](https://github.com/persandstrom) has contributed support to do prescence detection using ASUSWRT based routers.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: asuswrt
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

__Logitech Squeezebox media player support__
<img src='/images/supported_brands/logitech.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@persandstrom](https://github.com/persandstrom) also contributed support for the Logitech Squeezebox media player. This allows you to control your Logitech Squeezebox from Home Assistant.

```yaml
# Example configuration.yaml entry
media_player:
  platform: squeezebox
  host: 192.168.1.21
  port: 9090
  username: user
  password: password
```

__Slack notification support__
<img src='/images/supported_brands/slack.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@jamespcole](https://github.com/jamespcole) has contributed a Slack platform for the notification platform. This allows you to deliver messages to any channel.

```yaml
# Example configuration.yaml entry
notify:
  platform: slack
  api_key: ABCDEFGHJKLMNOPQRSTUVXYZ
  default_channel: "#general"
```

__Edimax Smart Switches support__
<img src='/images/supported_brands/edimax.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@rkabadi](https://github.com/rkabadi) has contributed support for integrating Edimax Smart Switches into Home Assistant.

```yaml
# Example configuration.yaml entry
switch:
  platform: edimax
  host: 192.168.1.32
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  name: Edimax Smart Plug
```

__RFXtrx sensor support__
[@danielhiversen](https://github.com/danielhiversen) has contributed support for RFXtrx sensors. It supports sensors that communicate in the frequency range of 433.92 MHz.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rfxtrx
    device: PATH_TO_DEVICE
```

The path to your device, e.g., `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0`

__TEMPer temperature sensor support__
Support for Temper temperature sensors has been contributed by [@rkabadi](https://github.com/rkabadi).

```yaml
# Example configuration.yaml entry
sensor:
  platform: temper
```
