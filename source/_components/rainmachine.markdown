---
layout: page
title: "RainMachine"
description: "Instructions on how to integrate RainMachine units within Home Assistant."
date: 2018-04-25 20:32
sidebar: true
comments: false
sharing: true
footer: true
logo: rainmachine.png
ha_category: Hub
ha_release: 0.68
ha_iot_class: "Cloud Polling"
---

The `rainmachine` component is the main component to integrate all platforms
related to [RainMachine smart Wi-Fi sprinkler controllers](http://www.rainmachine.com/).

## {% linkable_title Configuration %}

The platform allows for either local (i.e., directly across the LAN) or remote
(i.e., through RainMachine's cloud API) access; the route you choose will
dictate what your configuration should look like.

For local access, specify the IP address/hostname of your RainMachine unit,
your RainMachine password, and optionally, the device's HTTP port:

```yaml
rainmachine:
  platform: rainmachine
  ip_address: 192.168.1.100
  password: YOUR_PASSWORD
```

For remote access, specify your RainMachine username/email and password:

```yaml
rainmachine:
  platform: rainmachine
  email: user@host.com
  password: YOUR_PASSWORD
```

{% configuration %}
password:
  description: your RainMachine password.
  required: true
  type: string
email:
  description: your RainMachine username/email; cannot be used with the `ip_address` parameter
  required: false
  type: string
ip_address:
  description: the IP address or hostname of your RainMachine unit; cannot be used with the `email` parameter
  required: optional
  type: string
port:
  description: the TCP port used by your unit for the REST API
  required: false
  type: int
  default: 8080
ssl:
  description: whether communication with the local device should occur over HTTPS
  required: false
  type: boolean
  default: true
{% endconfiguration %}

## {% linkable_title Weblink %}

If you would like to see and control more detailed information, create an
[iFrame](/components/panel_iframe/) that renders the RainMachine web app:

```yaml
panel_iframe:
  rainmachine:
    title: RainMachine
    url: "https://my.rainmachine.com/s/<YOUR_DEVICE_ID>/ui/"
    icon: mdi:water
```

You can find `<YOUR_DEVICE_ID>` by logging into
[your RainMachine dashboard](https://my.rainmachine.com) and noting it in the URL.
