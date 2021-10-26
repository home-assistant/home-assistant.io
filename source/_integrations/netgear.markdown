---
title: NETGEAR
description: Instructions on how to integrate NETGEAR routers into Home Assistant.
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_release: pre 0.7
ha_domain: netgear
ha_platforms:
  - device_tracker
  - sensor
ha_config_flow: true
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
  - '@starkillerOG'
ha_ssdp: true
---

This platform allows you to detect presence by looking at connected devices to a [NETGEAR](https://www.netgear.com/) device.

{% include integrations/config_flow.md %}

Most NETGEAR routers use port 5000 to communicate, however the following list of models are known to use port 80:
- Nighthawk X4S - AC2600 (R7800)
- Orbi
- XR500
When setup through ssdp discovery the port schould be automatically detected.

The options flow of the NETGEAR integration (in the sidebar of your Home Assistant instance click on "Configuration" -> "Integrations" -> find the NETGEAR integration and click "Configure") allows you to specify the 'consider_home' time. This is the amount of seconds to wait till marking someone as not home after not being seen. This parameter is most useful for households with Apple iOS devices that go into sleep mode while still at home to conserve battery life. iPhones will occasionally drop off the network and then re-appear. consider_home helps prevent false alarms in presence detection.
