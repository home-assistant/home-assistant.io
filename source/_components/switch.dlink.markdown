---
layout: page
title: "D-Link Switch"
description: "Instructions on how to integrate D-Link switches into Home Assistant."
date: 2016-02-21 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dlink.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: 0.14
---


The `dlink` switch platform allows you to control the state of your [D-Link Wi-Fi Smart Plugs](http://us.dlink.com/product-category/home-solutions/connected-home/smart-plugs/).

Supported devices (tested):

- DSP-W215
- DSP-W110

To use your D-Link smart plugs in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: dlink
  host: IP_ADRRESS
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **host** (*Required*): The IP address of your D-Link plug, eg. http://192.168.1.32
- **name** (*Optional*): The name to use when displaying this switch.
- **username** (*Required*): The username for your plug. Defaults to `admin`.
- **password** (*Required*): The password for your plug. Default password is the `PIN` included on the configuration card.
- **use_legacy_protocol** (*Optional*): Enable limited support for legacy firmware protocols (Tested with v1.24).

