---
layout: page
title: "MyQ Cover"
description: "Instructions how to integrate MyQ-Enabled garage door covers into Home Assistant."
date: 2017-02-14 14:21
sidebar: true
comments: false
sharing: true
footer: true
logo: myq.png
ha_category: Cover
ha_release: 0.39
ha_iot_class: Cloud Polling
---

The `myq` cover platform lets you control MyQ-Enabled garage doors through Home Assistant. Device names in Home Assistant are generated based on the names defined in your MyQ Device mobile app.

To use your MyQ cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
cover:
  - platform: myq
    username: email@email.com
    password: password
    type: chamberlain
```

Configuration variables:

- **username** (*Required*): Your MyQ account username.
- **password** (*Required*): Your MyQ account password.
- **type** (*Required*): Your device type/brand. Supported types are `chamberlain`, `liftmaster`, `craftsman` and `merlin`.
