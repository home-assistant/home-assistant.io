---
layout: page
title: "ZoneMinder Binary Sensor"
description: "Provides the connectivity from Home Assistant to ZoneMinder."
date: 2019-01-18 02:30
sidebar: true
comments: false
sharing: true
footer: true
logo: zoneminder.png
ha_category: Binary Sensor
ha_release: 0.87
ha_iot_class: "Local Polling"
---

The `zoneminder` binary sensor platform lets you monitor the availability of your [ZoneMinder](https://www.zoneminder.com) install.

<p class='note'>
This platform is automatically loaded by the [ZoneMinder component](/components/zoneminder/) during it's setup.
</p>

Each binary_sensor created will be named after the hostname used when configuring the [ZoneMinder component](/components/zoneminder/).
