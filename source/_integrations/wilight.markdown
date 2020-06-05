---
title: WiLight
description: Instructions on how to integrate WiLight devices into Home Assistant.
ha_category:
  - Light
ha_release: 0.111
ha_config_flow: true
ha_codeowners:
  - '@leofig-rj'
ha_domain: wilight
---

The `wilight` integration is to integrate [WiLight](http://www.wilight.com.br) devices with Home Assistant.

There is currently support for the following device types within Home Assistant:

- Light (WiLight model I-100 and I-102)

## Setup

Supported devices will be discovered automatically by the SSDP protocol. The local network will be scanned for WiLight devices.
There is currently no manual integration for `wilight`.
