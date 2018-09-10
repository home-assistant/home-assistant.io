---
layout: page
title: "Spider Thermostat"
description: "Instructions on how to integrate Spider thermostats within Home Assistant."
date: 2018-07-17 22:01
sidebar: true
comments: false
sharing: true
footer: true
logo: spider.png
ha_category: Climate
ha_iot_class: "Cloud Polling"
ha_release: 0.75
---

The `spider` climate platform allows you to control your temperature settings as well as if you want to cool or heat.

<p class='note'>
Full configuration details can be found on the main [Spider component](/components/spider/) page.
</p>

<p class='note'>
Although this component lets you change the operation mode to heating or cooling, it doesn't necessarily mean your boiler can. Spider is not aware of your current situation.
</p>

<p class='note warning'>
This component is not affiliated with Itho Daalderop Spider and retrieves data from the endpoints of the mobile application. Use at your own risk.
</p>