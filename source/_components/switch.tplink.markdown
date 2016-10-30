---
layout: page
title: "TPLink Switch"
description: "Instructions how to integrate TPLink switches into Home Assistant."
date: 2016-07-13 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tp-link.png
ha_category: Switch
ha_iot_class: "Local Polling"
ha_release: "0.24"
---


The `tplink` switch platform allows you to control the state of your [TPLink smart switch](http://www.tp-link.com/en/products/list-5258.html).

Supported units:

- HS100
- HS110
- HS200

To use your TPLink switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: tplink
    host: IP_ADRRESS
```

Configuration variables:

- **host** (*Required*): The IP address of your myStrom switch, eg. `http://192.168.1.32`.
- **name** (*Optional*): The name to use when displaying this switch.


