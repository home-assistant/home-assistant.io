---
layout: page
title: "Edimax switches support"
description: "Instructions how to integrate Edimax switches into Home Assistant."
date: 2015-06-10 22:54
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/edimax.png' class='brand pull-right' />
This edimax switch platform allows you to control the state of your [Edimax](http://www.edimax.com/edimax/merchandise/merchandise_list/data/edimax/global/home_automation_smart_plug/) switches.

To use your Edimax switch in your installation, add the following to your `configuration.yaml` file:

```
# Example configuration.yaml entry
switch:
    platform: edimax
    host: 192.168.1.32
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    name: Edimax Smart Plug
```
