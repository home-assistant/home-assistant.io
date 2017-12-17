---
layout: page
title: "Amcrest IP Camera"
description: "Instructions how to integrate Amcrest IP cameras sensors within Home Assistant."
date: 2017-01-13 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Sensor
ha_release: 0.37
ha_iot_class: "Local Polling"
---

To get your [Amcrest](https://amcrest.com/) cameras working within Home Assistant, please follow the instructions for the general [Amcrest component](/components/amcrest).

Once you have enabled the [Amcrest component](/components/amcrest), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: amcrest
```
To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.
