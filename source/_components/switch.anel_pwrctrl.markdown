---
layout: page
title: "ANEL PwrCtrl Switch"
description: "Instructions on how to integrate ANEL PwrCtrl switches within Home Assistant."
date: 2016-10-02 19:04
sidebar: true
comments: false
sharing: true
footer: true
logo: anel.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: "0.30"
---

The `anel_pwrctrl` switch platform allows you to control [ANEL PwrCtrl](http://anel-elektronik.de/SITE/produkte/produkte.htm) devices.

Supported devices (tested):

- PwrCtrl HUT

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: anel_pwrctrl
  host: IP_ADDRESS
  port_recv: PORT
  port_send: PORT
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **host** (*Optional*): The IP address or hostname of your PwrCtrl device.
- **port_recv** (*Required*): The port to receive data from the device.
- **port_send** (*Required*): The port to send data to the device.
- **username** (*Required*): The username for your device.
- **password** (*Required*): The password for your device.

<p class="note">If no **host** is given the platform will try to auto-discover all devices on the network, that are listening on the given **port_recv**.</p>
