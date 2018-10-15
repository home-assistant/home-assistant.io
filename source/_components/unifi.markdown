---
layout: page
title: "UniFi"
description: "Instructions on how to configure UniFi integration with UniFi Controller by Ubiquiti."
date: 2018-10-15 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ubiuiti.png
ha_category: Hub
ha_release: "0.81"
ha_iot_class: "Local Polling"
---

[UniFi](https://unifi-sdn.ubnt.com/) by [Ubiquiti Networks, inc.](https://www.ubnt.com/) is a software that binds gateways, switches and wireless access points together with one graphical front end.

Currently this implementation only exposes POE control for networked devices. Device tracker implementation is not using the same code base.

## {% linkable_title Configuration %}

Home Assistant offers UniFi integration through **Configuration** -> **Integrations** -> **UniFi Controller**.

Enter `host address`, `user name` and `password` and then continue to select which `site` you want to connect to Home Assistant. The user must have administrator privileges.

## {% linkable_title Debugging component %}

If you have problems with UniFi or the component you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    aiounifi: debug
    homeassistant.components.unifi: debug
    homeassistant.components.switch.unifi: debug
```
