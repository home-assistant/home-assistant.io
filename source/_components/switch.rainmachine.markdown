---
layout: page
title: "RainMachine Switch"
description: "Instructions on how to use RainMachine switches with Home Assistant."
date: 2017-08-14 13:30
sidebar: true
comments: false
sharing: true
footer: true
logo: rainmachine.png
ha_category: Irrigation
ha_iot_class: "Cloud Polling"
ha_release: 0.51
---

The `rainmachine` switch platform allows you to control programs and zones
within a [RainMachine smart Wi-Fi sprinkler controller](http://www.rainmachine.com/). 

<p class='note'>
You must have the [RainMachine component](https://www.home-assistant.io/components/rainmachine/)
configured to use this platform. After configuring that component, switches will
automatically appear.
</p>

## {% linkable_title Controlling Your Device %}

After Home Assistant loads, new switches will be added for every enabled
program and zone. These work as expected:

- Program On/Off: starts/stops a program
- Zone On/Off: starts/stops a zone (using the `zone_run_time` parameter to
determine how long to run for)

Programs and zones are linked. While a program is running, you will see both
the program and zone switches turned on; turning either one off will turn the
other one off (just like in the web app).
