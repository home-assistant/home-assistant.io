---
layout: page
title: "Luftdaten Sensor"
description: "Instructions on how to setup Luftdaten sensor in Home Assistant."
date: 2017-11-01 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: luftdaten.png
ha_category: Health
ha_release: 0.57
ha_iot_class: "Cloud Polling"
ha_qa_scale: gold
---

The `luftdaten` sensor platform will query the open data API of [luftdaten.info](http://luftdaten.info) to monitor air quality and other weather data from a specific (self build) sensor station.

You must have the [`luftdaten` component](/components/luftdaten/) configured to use this platform. After configuring that component, sensors will automatically appear.
