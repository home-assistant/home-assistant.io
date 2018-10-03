---
layout: page
title: "Lupusec Alarm Control Panel"
description: "Instructions on how to setup the Lupusec Alarm control panel within Home Assistant."
date: 2018-10-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lupusec.jpg
ha_category: Alarm
ha_release: 0.79
ha_iot_class: "Cloud Push"
---

The `lupus electronics` security control panel platform allows you to control your [Lupusec](https://www.lupus-electronics.de) devices.

The requirement is that you have setup your [Lupusec component](/components/lupusec/).

To use Lupusec devices in your installation, add the following `lupusec` section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lupusec:
      username: user 
      password: 'greatpassword'
      ip_address: 192.168.178.35
      scan_interval: 2
```

Configuration variables:

- **username** (*Required*): Username for your Lupusec online interface.
- **password** (*Required*): Password for your Lupusec online interface.
- **ip_address** (*Required*): The ip adress of your Lupusec alarm panel.
- **scan_interval** (*Optional*): Defines the polling interval in seconds. Default is 2 seconds.