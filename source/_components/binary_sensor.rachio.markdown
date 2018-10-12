---
layout: page
title: "Rachio Binary Sensor"
description: "Instructions on how to use Rachio binary sensors with Home Assistant."
date: 2018-06-23 16:15
sidebar: true
comments: false
sharing: true
footer: true
logo: rachio.png
ha_category: Irrigation
ha_iot_class: "Cloud Push"
ha_release: 0.73
---

The `rachio` binary sensor platform allows you to view the status of your [Rachio irrigation system](http://rachio.com/).

Once configured, a binary sensor will be added that shows whether or not each controller in the account provided is online and reachable by Rachio's servers.

They will be automatically added if the [Rachio component](/components/rachio/) component is loaded.
