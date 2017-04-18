---
layout: component
title: "Nest thermostat"
description: "Instructions how to integrate Nest thermostats within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: nest_thermostat.png
ha_category: Thermostat
featured: true
---


The nest thermostat platform let you control a thermostat from [Nest](https://nest.com).

To set it up, add the following information to your `configuration.yaml` file:

```yaml
thermostat:
  platform: nest
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **username** (*Required*): Your Nest username.
- **password** (*Required*): Your Nest password.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/nest-thermostat-card.png' />
</p>
