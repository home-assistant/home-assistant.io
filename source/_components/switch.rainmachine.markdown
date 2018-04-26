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
configured to use this switch.
</p>

## {% linkable_title Configuring the Platform %}

To enable the platform, add the following lines to your `configuration.yaml`
file:

```yaml
switch:
  - platform: rainmachine
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

## {% linkable_title For Awareness %}

The remote RainMachine API currently has two broken operations (i.e., they
return error codes): starting a program and stopping a program. Please note
that starting/stopping programs with the remote API is disabled until
RainMachine can fix the issue.
