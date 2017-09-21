---
layout: page
title: "Amcrest IP Camera"
description: "Instructions how to integrate Amcrest IP cameras within Home Assistant."
date: 2016-11-24 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: amcrest.png
ha_category: Camera
ha_iot_class: "Local Polling"
ha_release: 0.34
---

To get your [Amcrest](https://amcrest.com/) cameras working within Home Assistant, please follow the instructions for the general [Amcrest component](/components/amcrest).

Once you have enabled the [Amcrest component](/components/amcrest), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  - platform: amcrest
```

To check if your Amcrest camera is supported/tested, visit the [supportability matrix](https://github.com/tchellomello/python-amcrest#supportability-matrix) link from the `python-amcrest` project.
