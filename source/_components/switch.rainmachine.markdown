---
layout: page
title: "RainMachine Switch"
description: "Instructions on how to use RainMachine units with Home Assistant."
date: 2017-08-14 13:30
sidebar: true
comments: false
sharing: true
footer: true
logo: rainmachine.png
ha_category: Switch
ha_iot_class: "Cloud Polling"
ha_release: 0.51
---

The `rainmachine` switch platform allows you to control programs and zones within a [RainMachine smart Wi-Fi sprinkler controller](http://www.rainmachine.com/).

## {% linkable_title Configuring the Platform %}

The platform allows for either local (i.e., directly across the LAN) or remote (i.e., through RainMachine's cloud API) access; the route you choose will dictate what your configuration should look like.

For local access, specify the IP address/hostname of your RainMachine unit, your RainMachine password, and optionally, the device's HTTP port:

```yaml
switch:
  platform: rainmachine
  ip_address: 192.168.1.100
  password: YOUR_PASSWORD
```

For remote access, specify your RainMachine username/email and password:

```yaml
switch:
  platform: rainmachine
  email: user@host.com
  password: YOUR_PASSWORD
```

{% configuration %}
password:
  description: Your RainMachine password.
  required: true
  type: string
email:
  description: "Your RainMachine username/email. Cannot be used with the `ip_address` parameter."
  required: false
  type: string
ip_address:
  description: "The IP address of your RainMachine unit; cannot be used with the `email` parameter."
  required: optional
  type: string
port:
  description: The TCP port used by your unit for the REST API.
  required: false
  type: int
  default: 8080
ssl:
  description: Whether communication with the local device should occur over HTTPS.
  required: false
  type: boolean
  default: true
zone_run_time:
  description: The number of seconds that a zone should run when turned on.
  required: false
  type: int
  default: 600
{% endconfiguration %}


## {% linkable_title Controlling Your Device %}

After Home Assistant loads, you will see new switches for every enabled program and zone. These work as expected:

- Program On/Off: starts/stops a program
- Zone On/Off: starts/stops a zone (using the `zone_run_time` parameter to determine how long to run for)

Programs and zones are linked. If a program is running its final zone, you will see both the program and zone switches turned on; turning either one off will turn the other one off (just like in the web app).

## {% linkable_title Weblink %}

If you would like to see and control more detailed information, create an [iFrame](/components/panel_iframe/) that renders the RainMachine web app:

```yaml
panel_iframe:
  rainmachine:
    title: RainMachine
    url: "https://my.rainmachine.com/s/<YOUR_DEVICE_ID>/ui/"
    icon: mdi:water-pump
```

You can find `<YOUR_DEVICE_ID>` by logging into [https://my.rainmachine.com](https://my.rainmachine.com ) and taking note of the URL.

## {% linkable_title For Awareness %}

The remote RainMachine API currently has two broken operations (i.e., they return error codes): starting a program and stopping a program. Please note that starting/stopping programs with the remote API is disabled until RainMachine can fix the issue.
