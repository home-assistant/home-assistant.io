---
layout: page
title: "Nest Thermostat"
description: "Instructions on how to integrate Nest thermostats within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Climate
ha_iot_class: "Cloud Push"
---


The `nest` climate platform let you control a thermostat from [Nest](https://nest.com).

<p class='note'>
You must have the [Nest component](/components/nest/) configured to use these sensors.  The `nest` climate component will automatically be setup when you do.
</p>

<p class='img'>
  <img src='{{site_root}}/images/screenshots/nest-thermostat-card.png' />
</p>

### {% linkable_title Service `set_temperature_scale` %}

You can use the service nest/set_temperature_scale to set the temperature scale (units) shown on the Nest thermostat display and the Nest website.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `temperature_scale` | no | Must be `c` or `f`, as a string.
| `entity_id` | yes | String or list of strings that points at the `entity_id` of the device(s). Will default to all configured Nest thermostats if not specified.

<p class='note'>
This service does not affect the units shown within Home Assistant, you must use the Home Assistant configuration to specify the units shown in Home Assistant.
</p>

