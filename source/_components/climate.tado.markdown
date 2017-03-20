---
layout: page
title: "Tado"
description: "Instructions on how to integrate Tado thermostats with Home Assistant."
date: 2017-03-20 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tado.png
ha_category: Climate
ha_release: 0.41
---


The `tado` climate platform is used as an interface to the my.tado.com website.

To use your tado thermostats in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: tado
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

- **username** (*Required*): Username for my.tado.com.
- **password** (*Required*): Password for my.tado.com.

The tado thermostats are internet connected thermostats. There exists an unofficial api at my.tado.com, which is used by theire website and now by this component.

It currently supports presenting the current temperature, the setting temperature and the current operation mode. Switching the mode is also supported. If no user is at home anymore, the devices are showing the away-state. Switching to away-mode is not supported.