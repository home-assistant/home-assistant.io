---
layout: page
title: "AquaLogic"
description: "Instructions on how to integrate the aqualogic within Home Assistant."
date: 2018-09-17 9:16
sidebar: true
comments: false
sharing: true
footer: true
logo: hayward.png
ha_category: Hub
ha_release: 0.79
ha_iot_class: "Local Push"
---

The `aqualogic` component provides connectivity to a Hayward/Goldline AquaLogic/ProLogic pool controller. Note that an RS-485 to Ethernet adapter connected to the pool controller is required.

## {% linkable_title Configuration %}

To add aqualogic to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
aqualogic:
  host: IP_ADDRESS
  port: PORT
```

Configuration variables:

- **host** (*Required*): The IP address of the RS-485 to Ethernet adapter connected to the pool controller, eg. 192.168.1.1.
- **port** (*Required*): The port provided by the RS-485 to Ethernet adapter.
