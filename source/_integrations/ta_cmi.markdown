---
title: Technische Alternative C.M.I.
description: Instructions on how to set up Technische Alternative C.M.I. sensors in Home Assistant.
ha_category:
  - Sensor
ha_release:  2021.10.0
ha_iot_class: Local Polling
ha_config_flow: false
ha_codeowners:
  - '@DeerMaximum'
ha_domain: ta_cmi
ha_platforms:
  - sensor
---

The `ta_cmi` sensor platform monitors the inputs and outputs of the devices connected to a C.M.I. from [Technische Alternative](https://www.ta.co.at/). It creates a separate sensor for each input and output which displays the current values.

Currently supported devices:

- UVR1611
- UVR16x2 (Tested)
- RSM610
- CAN-I/O45
- CAN-EZ2
- CAN-MTx2
- CAN-BC2
- UVR65
- CAN-EZ3
- UVR610
- UVR67

## Prerequisites

To use the integration in your installation, you need to specify the credentials of a user with `expert` rights.

{% include integrations/config_flow.md %}

## Information

Setting up the integration can take longer depending on the number of devices, because you have to wait one minute between each request to the C.M.I. to avoid activating the rate limit.

[taWebsite]: https://www.ta.co.at/
[DeviceClassList]: https://developers.home-assistant.io/docs/core/entity/sensor#available-device-classes