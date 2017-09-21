---
layout: page
title: USPS Sensor
description: "Instructions on how to set up USPS sensors within Home Assistant."
date: 2017-01-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: usps.png
ha_category: Sensor
ha_release: 0.36
ha_iot_class: "Cloud Polling"
---

The `usps` sensor component allows you to view statistics on incoming mail and packages made available through USPS via the Informed Delivery service.  You must "Opt-In" to [Informed Delivery](https://informeddelivery.usps.com/box/pages/intro/start.action) to see mail images. This works in concert with [USPS camera](/components/camera.usps).

To enable this sensor in your installation, set up the [USPS component](/components/usps) with your username and password.
