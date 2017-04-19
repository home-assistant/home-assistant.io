---
layout: page
title: "Philips Hue"
description: "Instructions how to setup Philips Hue within Home Assistant."
date: 2015-03-23 20:09
sidebar: true
comments: false
sharing: true
footer: true
logo: philips_hue.png
ha_category: Light
ha_iot_class: "Local Polling"
featured: true
---

Philips Hue support is integrated into Home Assistant as a light platform. The preferred way to setup the Philips Hue platform is by enabling the [the discovery component](/components/discovery/).

If you want to enable the light component directly, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
light:
  platform: hue
  host: DEVICE_IP_ADDRESS
  allow_unreachable: true
  filename: my_hue_hub_token.conf
```

Configuration variables:

- **host** (*Required*): IP address of the device, eg. 192.168.1.10.
- **allow_unreachable** (*Optional*):  This will allow unreachable bulbs to report their state correctly. By default *name* from the device is used.
- **filename** (*Optional*): Make this unique if specifying multiple Hue hubs.

