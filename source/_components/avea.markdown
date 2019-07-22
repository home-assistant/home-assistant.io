---
layout: page
title: "Elgato Avea"
description: "Instructions on how to integrate Elgato Avea with Home Assistant."
date: 2019-06-03 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avea.png
ha_category:
  - Light
ha_release: 0.97
ha_iot_class: Local Polling
---

[Elgato Avea](http://web.archive.org/web/20170930210431/https://www.elgato.com/avea) is a Bluetooth light bulb that is no longer supported by the manufacturer. The `avea` integration allows you to control all your avea bulbs with Home Assistant.

### {% linkable_title Configuration Details %}

To enable Avea, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: avea
```
