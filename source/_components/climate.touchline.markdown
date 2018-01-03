---
layout: page
title: "Roth Touchline"
description: "Instructions how to integrate Roth Touchline within Home Assistant."
date: 2018-01-03 12:35
sidebar: true
comments: false
sharing: true
footer: true
logo: roth.png
ha_category: Climate
ha_release: "0.61"
ha_iot_class: "Local Polling"
---


The `Roth Touchline` climate platform let you control [ROTH Touchline](http://www.roth-nordic.dk/dk/roth-touchline-tradloes-gulvvarmeregulering-1475.htm) floor heating thermostats from Roth. 


To set it up, add the following information to your `configuration.yaml` file:

```yaml
climate:
  - platform: touchline
    host: YOUR_IPADDRESS
```


Configuration variables:

- **host** (*Required*): The ip address of your controller (http://192.168.1.1)

