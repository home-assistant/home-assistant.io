---
layout: page
title: "AquaLogic"
description: "Instructions on how to integrate an AquaLogic controller within Home Assistant."
date: 2018-09-17 9:16
sidebar: true
comments: false
sharing: true
footer: true
logo: hayward.png
ha_category: Hub
ha_release: "0.80"
ha_iot_class: "Local Push"
---

The AquaLogic component provides connectivity to a Hayward/Goldline AquaLogic/ProLogic pool controller. Note that an RS-485 to Ethernet adapter connected to the pool controller is required.

## {% linkable_title Configuration %}

To add the AquaLogic component to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
aqualogic:
  host: 192.168.1.1
  port: 23
```

{% configuration %}
host:
  description: The domain name or IP address of the RS-485 to Ethernet adapter connected to the pool controller, eg. 192.168.1.1.
  required: true
  type: string
port:
  description: The port provided by the RS-485 to Ethernet adapter.
  required: true
  type: int
{% endconfiguration %}
