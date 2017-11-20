---
layout: page
title: "Toon Thermostat"
description: "Instructions how to integrate Toon thermostats within Home Assistant."
date: 2017-10-22 12:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Climate
ha_release: 0.56
logo: toon.png
ha_iot_class: "Cloud Polling"
---

The `toon` climate platform allows you to interact with your Toon thermostat. For compatibility reasons, the states in Home Assistant are different from the states displayed on your Toon device and are mapped as follows:


| Home Assistant | Toon    |
|:---------------|:--------|
| Performance    | Comfort |
| Heat           | Thuis   |
| Eco            | Weg     |
| Cool           | Slapen  |


Please refer to the [hub component](/components/toon/) for setup instructions.
