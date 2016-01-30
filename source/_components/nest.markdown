---
layout: component
title: "Nest"
description: "Instructions how to integrate Nest into Home Assistant."
date: 2016-01-29 21:57
sidebar: true
comments: false
sharing: true
footer: true
logo: nest_thermostat.png
ha_category: Hub
featured: true
---

The Nest component is the main component to integrate all Nest related platforms. Besides this component you will have to setup your thermostat and any connected sensors separately.

```yaml
# Example configurayion.yaml entry
nest:
  username: USERNAME
  password: PASSWORD

thermostat:
  platform: nest
```

Configuration variables:

- **username** (*Required*): Your Nest username.
- **password** (*Required*): Your Nest password.
