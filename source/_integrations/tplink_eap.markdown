---
title: TP-Link EAP
description: Instructions on how to use a TP-Link EAP access point as a device tracker.
logo: tp-link.jpg
ha_category:
  - Presence Detection
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.117
ha_domain: tplink_eap
---

This platform allows you to detect presence by looking at devices connected to a [TP-Link EAP](https://www.tp-link.com/us/business-networking/ceiling-mount-access-point/).

<div class='note warning'>
This integration uses the web interface to retrieve data from the device. The device webserver does not support concurrent connection.
If you try to login to the interface, your session will be terminated when the integration will poll the device status.
<br>
If you need to edit the device configuration, it is advised to temporarily disable this integration while making your
 changes.
</div>

## Configuration

This integration is to be configured using the frontend:

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **TP-Link EAP**,
and follow the configuration flow. After finishing, the TP-Link EAP integration will be available.

## Tested devices

Devices we know to be working with this integration based on the [documentation of used library](https://github.com/chemicalstorm/pytleap#supported-hardware):

- TP-Link EAP 245 v3

This is not a complete list. The integration can probably connect to other TP-Link EAP devices running similar firmware.
