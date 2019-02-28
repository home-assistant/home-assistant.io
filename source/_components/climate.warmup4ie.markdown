---
layout: page
title: "Warmup 4IE Thermostat"
description: "Instructions on how to integrate Warmup 4IE thermostats within Home Assistant."
date: 2019-02-27 12:01
sidebar: true
comments: false
sharing: true
footer: true
logo: warmup.png
ha_category: Climate
ha_release: 0.89
ha_iot_class: "Cloud Polling" 
ha_qa_scale: no score
---


The `warmup4ie` climate platform let you control Warmup 4IE thermostats from Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: warmup4ie
    username: YOUR_E_MAIL_ADDRESS
    password: YOUR_PASSWORD
    location: YOUR_LOCATION_NAME
    room: YOUR_ROOM_NAME
```
<p class='note'>
To use this component, you have to setup an account at the warmup web site first and register your thermostat appropriately. See <https://my.warmup.com/login>.
</p>

{% configuration %}
username:
  description: The username for accessing your Warmup account.
  required: true
  type: string
password:
  description: The password for accessing your Warmup account.
  required: true
  type: string
location:
  description: The name of the location from your Warmup account.
  required: true
  type: string
room:
  description: The name of the room from your Warmup account.
  required: true
  type: string
{% endconfiguration %}
