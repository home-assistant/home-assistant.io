---
layout: component
title: "Honeywell Thermostat"
description: "Instructions how to integrate Honeywell thermostats within Home Assistant."
date: 2015-11-09 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Thermostat
---


The `honeywell` thermostat platform let you control [Honeywell Connected](http://getconnected.honeywell.com/en/) thermostats from Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
thermostat:
  platform: honeywell
  username: YOUR_USERNAME
  password:  YOUR_PASSWORD
```

Configuration variables:

- **username** (*Required*: The username of an user with access.
- **password** (*Required*): The password for your given admin account.
- **away_temperature** (*optional*): Heating setpoint when away mode is on. If omitted it defaults to 16.0 deg C.
