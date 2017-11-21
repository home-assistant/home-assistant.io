---
layout: page
title: TCP Connected Light
description: "Instructions on how to set up TCP Connected lights within Home Assistant."
date: 2017-11-17 18:50
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_release: 0.59
ha_iot_class: "Local Polling"
---

This component communicates with the TCP Connected (Greenwave Reality) Gateway to allow control of all lights and fixtures registered to the gateway. Bulbs and Fixtures can be created and modified inside the TCP Lighting App for Android and iOS.

The gateway must be running a firmware that begins with 2, such as 2.0.47. If required, you can find information on how to downgrade [here](https://github.com/bren1818/TCPFirmwareRestore).

This component has been tested on firmware revisions:

- 2.0.105

To configure the connection to the gateway, add the following to your `configuration.yaml` file:

```yaml
light:
  - platform: tcpbulbs
    host: XXX.XXX.XXX.XXX
```

{% configuration %}
host:
  description: The IP Address of your Gateway
  required: true
  type: string
{% endconfiguration %}
