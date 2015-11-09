---
layout: component
title: "Honeywell thermostat"
description: "Instructions how to integrate Honeywell thermostats within Home Assistant."
date: 2015-11-09 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: radiotherm.png
ha_category: Thermostat
---


The honeywell thermostat platform let you control [Honeywell Round Connected](http://getconnected.honeywell.com/en/) thermostat from Home Assistant.

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

