---
layout: page
title: "Juicenet"
description: "Instructions on how to setup WiFi-equipped Juicenet charging stations with Home Assistant."
date: 2017-05-20 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: juicenet.png
ha_category: Hub
ha_release: 0.47
---


The `juicenet` sensor platform pulls data from a [JuiceNet](https://emotorwerks.com/products/juicenet/) charging station equipped with a wifi connection. It will access and make available all of the devices attached to your account.

To enable the platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
juicenet:
    access_token: ACCESS_TOKEN
```

Configuration variables:

- **access_token** (*Required*): Your eMotorWerks API Token can be found in the [dashboard](https://dashboard.emotorwerks.com/Manage).
