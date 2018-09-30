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

Configuration variables:

- **host** (*Required*): This is the IP address of your Transmission daemon, eg. 192.168.1.32.
- **port** (*Optional*): The port your Transmission daemon uses, defaults to 9091.
- **name** (*Optional*): The name to use when displaying this Transmission instance.
- **username** (*Optional*): Your Transmission username, if you use authentication.
- **password** (*Optional*): Your Transmission password, if you use authentication.

