---
layout: page
title: "Egardia Binary Sensor"
description: "Instructions how to integrate Egardia / Woonveilig binary sensors into Home Assistant."
date: 2018-03-02 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: egardia.png
ha_release: 0.47
ha_category: Binary Sensor
ha_iot_class: "Local Push"
---

The `egardia` platform allows you to get data from your [Egardia](http://www.egardia.com)/[Woonveilig](http://www.woonveilig.nl) binary sensors from within Home Assistant. 
Currently only door contacts are supported. IR sensors are not supported and will probably never be since their status cannot be read outside of the alarm control panel. Smoke sensors and others might be added but currently are not supported.

You will need to set up your [Egardia hub](/components/egardia/).