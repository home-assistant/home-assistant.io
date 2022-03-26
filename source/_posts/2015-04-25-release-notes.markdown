---
title: "Release notes for April 25, 2015"
description: "Introducing support for line charts, a logbook, ISY994 hub, Transmission and modbus."
date: 2015-04-25 6:57 -0700
date_formatted: "April 25, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

It's been a month since the latest update and a lot has happened again. Here a quick overview of the new things.

__Line Charts__
[James](https://github.com/jamespcole) has upgraded the history in the frontend to support line graphs. Line graphs will be shown for any entity that has a unit of measurement. The line graphs will also be shown in the more info card of an entity. [See the demo for a live example.](/demo/)

<p class='img'>
<img src='/images/screenshots/history-line-graphs.png'>
</p>

__ISY994 hub support__
<img src='/images/supported_brands/universal_devices.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Ryan](https://github.com/rmkraus) has contributed support to integrate the ISY994 hub by Universal Devices. This allows you to integrate your X10/Insteon sensors, switches and lights.

He has created an extensive getting started guide which can be found on [the ISY994 component page](/integrations/isy994/).

```yaml
# Example configuration.yaml entry
isy994:
```

__Logbook__
<img src='/images/screenshots/logbook.png' style='margin-left:10px; float: right;' height="100" /> I (Paulus) have added a logbook component. The logbook component provides a different perspective on the history of your house by showing all the changes that happened to your house in chronological order. [See the demo for a live example.](/demo/)
<span class='clearfix'></span>

```yaml
# Example configuration.yaml entry
logbook:
```

<!--more-->

__Transmission support__
<img src='/images/supported_brands/transmission.png' style='border:none; box-shadow: none; float: right;' height='50' /> James has also contributed support for integrating Transmission into Home Assistant.

```yaml
# Example configuration.yaml entry
sensor:
  platform: transmission
  name: Transmission
  host: 192.168.1.26
  port: 9091
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  monitored_variables:
    - type: 'current_status'
    - type: 'download_speed'
    - type: 'upload_speed'
```

__Modbus support__
[Kixam](https://github.com/kixam) has contributed support for modbus, a serial communication protocol to control PLCs. It currently supports sensors and switches which can be controlled over serial, TCP and UDP connections.

```yaml
# Example configuration.yaml entry
modbus:
  type: serial
  method: rtu
  port: /dev/ttyUSB0
  baudrate: 9600
  stopbits: 1
  bytesize: 8
  parity: N

sensor:
  platform: modbus
  slave: 1
  registers:
    16:
      name: My integer sensor
        unit: C
    24:
      bits:
        0:
          name: My boolean sensor
        2:
          name: My other boolean sensor

switch:
  platform: modbus
  slave: 1
  registers:
    24:
      bits:
        0:
          name: My switch
        2:
          name: My other switch
```
