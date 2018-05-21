---
layout: page
title: "Xiaomi Aqara Lock"
description: "Instructions on how to setup the Xiaomi Aqara Lock within Home Assistant."
date: 2018-05-17 20:24
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Lock
ha_release: "0.70"
ha_iot_class: "Local Push"
---


The `xiaomi aqara` lock platform allows you to get data (`changed_by` property, `verified_wrong_times` attribute) from your [Xiaomi](http://www.mi.com/en/) Aqara locks.
A Aqara lock cannot be controlled by Home Assistant. The property `changed_by` provides the user/key ID of the last successful unlock.

If someone tried to unlock the device but failed more than 3 times the `verified_wrong_times` attribute will be incremented. The counter resets on a successful unlock.

The requirement is that you have setup [Xiaomi aqara](/components/xiaomi_aqara/).

