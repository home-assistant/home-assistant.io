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

The `rainmachine` switch platform allows you to control programs and zones
within a [RainMachine smart Wi-Fi sprinkler controller](http://www.rainmachine.com/). 

<p class='note'>
You must have the [RainMachine component](https://www.home-assistant.io/components/rainmachine/)
configured to use this switch. After configuring that component, switches will
automatically appear.
</p>

## {% linkable_title Configuring the Platform %}

To optionally extend the functionality of these switches, augment your 
`configuration.yaml` as below:

```yaml
rainmachine:
  ip_address: 192.168.1.100
  password: YOUR_PASSWORD
  switches:
    zone_run_time: 240
```

{% configuration %}
zone_run_time:
  description: the default number of seconds that a zone should run when turned on
  required: false
  type: int
  default: 600
{% endconfiguration %}


## {% linkable_title Controlling Your Device %}

After Home Assistant loads, new switches will be added for every enabled
program and zone. These work as expected:

- Program On/Off: starts/stops a program
- Zone On/Off: starts/stops a zone (using the `zone_run_time` parameter to
determine how long to run for)

Programs and zones are linked. If a program is running its final zone,
you will see both the program and zone switches turned on; turning either one
off will turn the other one off (just like in the web app).
