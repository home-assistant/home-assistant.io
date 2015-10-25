---
layout: component
title: "Adding thermostats"
description: "Instructions how to setup thermostats tracking within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
---

Thermostats offer Home Assistant a peek into the current and target temperature in a house. Some thermostats will also offer an away mode that will lower use of heating/cooling. The only supported thermostat right now is the Nest thermostat.

To set it up, add the following information to your `configuration.yaml` file:

```
thermostat:
  platform: nest
  username: myemail@mydomain.com
  password: mypassword
```

<p class='img'>
  <img src='{{site_root}}/images/screenshots/nest-thermostat-card.png' />
</p>
