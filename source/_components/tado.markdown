---
layout: page
title: "Tado"
description: "Instructions on how to integrate Tado devices with Home Assistant."
date: 2017-03-20 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tado.png
ha_category: Hub
ha_release: 0.41
ha_iot_class: "Cloud Polling"
---


The `tado` component platform is used as an interface to the [my.tado.com](https://my.tado.com/webapp/#/account/sign-in) website. It adds climate devices for every tado zone and sensors for some additional information of the zones.

To use your tado thermostats in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tado:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **username** (*Required*): Username for my.tado.com.
- **password** (*Required*): Password for my.tado.com.

The tado thermostats are internet connected thermostats. There exists an unofficial API at [my.tado.com](https://my.tado.com/webapp/#/account/sign-in), which is used by their website and now by this component.

It currently supports presenting the current temperature, the setting temperature and the current operation mode. Switching the mode is also supported. If no user is at home anymore, the devices are showing the away-state. Switching to away-mode is not supported.
