---
layout: page
title: "Z-Wave"
description: "Instructions on how-to use Z-Wave with Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

To enable Z-Wave, plug your Z-Wave USB stick into your Raspberry Pi 3 and add the following to your `configuration.yaml`:

```yaml
zwave:
  usb_path: /dev/ttyACM0
```

If you need GPIO on raspberry-pi3 for you Z-Wave module add follow line into `config.txt`:
```
dtoverlay=pi3-miniuart-bt
```

For some exceptional devices, the `/dev/ttyAMA0` will not be detected by udev and are therefor not mapped with docker.
So you need explicit set this device for mapping to Home-Assistant. Execute this command on ssh add-on:
```bash
$ curl -d '{"devices": ["ttyAMA0"]}' http://172.17.0.2/homeassistant/options
```
After that, you need change `usb_path` to `/dev/ttyAMA0`.

### HUSBZB-1:
```yaml
zwave:
  usb_path: /dev/ttyUSB0
  
zha:
  usb_path: /dev/ttyUSB1
  database_path: /config/zigbee.db
```
