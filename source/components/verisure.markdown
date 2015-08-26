---
layout: page
title: "Verisure"
description: "Instructions how to setup Verisure devices within Home Assistant."
date: 2015-08-17 20:28
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/verisure.png' class='brand pull-right' />

Home Assistant has support to integrate your [Verisure](https://www.verisure.com/) devices.

We support:

  * Smartplugs
  * Reading from thermometers and hygrometers integrated in various devices
  * Reading alarm status

Username and password are required. Other variables are optional and allow you to disable certain devices.

```yaml
# Example configuration.yaml entry
verisure:
  username: user@example.com
  password: password
  alarm: 1
  hygrometers: 0
  smartplugs: 1
  thermometers: 0
```
