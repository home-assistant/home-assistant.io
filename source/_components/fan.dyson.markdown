---
layout: page
title: "Dyson Purifier Fan"
description: "Instructions on how to setup the Dyson Purifier fans within Home Assistant."
date: 2017-05-27 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: dyson.png
ha_category: Fan
ha_iot_class: "Cloud Polling"
ha_release: 0.47
---


The `dyson` fan platform allows you to control your Dyson Purifier fans.

You first have to setup the [Dyson component](/components/dyson/)

### {% linkable_title Supported fan devices %}

- Pure Cool link (desk and tower)
- Pure Hot+cool link (see [climate](/components/climate.dyson/) for thermal control)

### {% linkable_title Attributes %}

There are several attributes which can be used for automations and templates.

| Attribute | Description |
| --------- | ----------- |
| `is_night_mode` | A boolean that indicates if the night mode of the fan device is on.
| `is_auto_mode` | A boolean that indicates if the auto mode of the fan device is on.
