---
layout: page
title: "Honeywell Thermostat"
description: "Instructions how to integrate Honeywell thermostats within Home Assistant."
date: 2016-02-07 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Climate
ha_release: pre 0.7
ha_iot_class: "Cloud Polling" 
---


The `honeywell` climate platform let you control [Honeywell Connected](http://getconnected.honeywell.com/en/) thermostats from Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: honeywell
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    scan_interval: 600
```
<p class='note'>
Scan interval is expressed in seconds. Omitting scan_interval may result in too-frequent polling and cause you to rate-limited by Honeywell.
</p>

Configuration variables:

- **username** (*Required*): The username of an user with access.
- **password** (*Required*): The password for your given admin account.
- **region** (*Optional*): Region identifier (either 'eu' or 'us'). Defaults to 'eu' if not provided.
- **scan_interval**(*Optional*): Scan interval is expressed in seconds. Recommended value of 600 seconds. Default value is 120 seconds. Omitting scan_interval may result in too-frequent polling and cause you to rate-limited by Honeywell.
- **away_temperature** (*Optional*) (*only for eu region*): Heating setpoint when away mode is on. If omitted it defaults to 16.0 deg C.
- **away_cool_temperature** (*Optional*) (*only for us region*): Cooling setpoint when away mode is on. If omitted it defaults to 30.0 deg C.
- **away_heat_temperature** (*Optional*) (*only for us region*): Heating setpoint when away mode is on. If omitted it defaults to 16.0 deg C.
