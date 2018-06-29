---
layout: page
title: "Z-Wave"
description: "Instructions on how-to enable Z-Wave with Hass.io."
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

### RAZBERRY BOARD

If you need GPIO on Raspberry Pi 3 for your Z-Wave module, add the following line into `config.txt` (you have to access that on the SD card directly; simply plug it into your PC and edit it there):

```
dtoverlay=pi3-miniuart-bt
```

After that, you need to change `usb_path` to `/dev/ttyAMA0` in your `configuration.yaml`.

```yaml
zwave:
  usb_path: /dev/ttyAMA0
```

### HUSBZB-1

```yaml
zwave:
  usb_path: /dev/ttyUSB0

zha:
  usb_path: /dev/ttyUSB1
  database_path: /config/zigbee.db
```

## {% linkable_title Further reading %}

For more information on using Z-Wave, see the [main documentation](/docs/z-wave/).
