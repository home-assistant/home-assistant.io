---
layout: page
title: "Onkyo"
description: "Instructions on how to integrate Onkyo and some Pioneer receivers into Home Assistant."
date: 2016-03-30 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: onkyo.png
ha_category: Media Player
ha_release: 0.17
ha_iot_class: "Local Polling"
---


The `onkyo` platform allows you to control a [Onkyo](http://www.onkyo.com/) and some recent [Pioneer](http://www.pioneerelectronics.com) receivers from Home Assistant. Please be aware that you need to enable "Network Standby" for this component to work in your Hardware.

To add an Onkyo or Pioneer receiver to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: onkyo
    host: 192.168.1.2
    name: receiver
    sources:
      pc: 'HTPC'
```

{% configuration %}
host:
  description: IP address of the device. Example:`192.168.1.2`. If not specified, the platform will load any discovered receivers.
  required: false
  type: string
name:
  description: Name of the device. (*Required if host is specified*)
  required: false
  type: string
sources:
  description: A list of mappings from source to source name. Valid sources can be found below. A default list will be used if no source mapping is specified.
  required: false
  type: list
zone2:
  description: Enables control for the receiver's second zone.
  required: false
  type: bool
{% endconfiguration %}

List of source names:

- video1
- video2
- video3
- video4
- video5
- video6
- video7
- dvd
- bd-dvd
- tape1
- tv-tape
- tape2
- phono
- cd
- tv-cd
- fm
- am
- tuner
- dlna
- internet-radio
- usb
- network
- universal-port
- multi-ch
- xm
- sirius
