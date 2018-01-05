---
layout: page
title: "Melissa Climate"
description: "Instructions how to integrate Melissa Climate into Home Assistant."
date: 2017-01-05 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: mclimate.png
ha_category: Hub
featured: false
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---

The `melissa climate` component is the main component to connect to a [Melissa Climate](http://seemelissa.com/) A/C control.

To set the Melissa component up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
melissa:
  username: <email adress>
  password: ********
```

Configuration variables:

- **username** (*Required*): Your melissa username (email).
- **password** (*Required*): Your melissa password.