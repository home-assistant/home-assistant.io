---
layout: page
title: "Transmission Switch"
description: "Instructions on how to integrate Transmission within Home Assistant."
date: 2015-06-02 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: transmission.png
ha_category: Downloading
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `transmission` switch platform allows you to control your [Transmission](http://www.transmissionbt.com/) client from within Home Assistant. The platform enables you switch to your 'Alternative Speed Limits' (aka 'Turtle mode') setting.

To add Transmission to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: transmission
  host: IP_ADDRESS
```

{% configuration %}
host:
  required: true
  type: string
  description: This is the IP address of your Transmission daemon, e.g., 192.168.1.32.
port:
  required: false
  type: integer
  default: 9091
  description: The port your Transmission daemon uses.
name:
  required: false
  type: string
  default: Transmission Turtle Mode
  description: The name to use when displaying this Transmission instance.
username:
  required: false
  type: string
  description: Your Transmission username, if you use authentication.
password:
  required: false
  type: string
  description: Your Transmission password, if you use authentication.
{% endconfiguration %}
