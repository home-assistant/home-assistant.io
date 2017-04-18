---
layout: page
title: "Requirements & Dependencies"
description: "Instructions how to define requirements and dependencies."
date: 2016-04-16 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant allows components and platforms to specify their dependencies and requirements using the variables `DEPENDENCIES` and `REQUIREMENTS`. Both are lists that contain strings.

Dependencies are other Home Assistant components that should be setup before the platform is loaded. An example is the MQTT sensor component, which requires an active connection to an MQTT broker. If Home Assistant is unable to load and setup the MQTT component, it will not setup the MQTT sensor component.

```python
DEPENDENCIES = ['mqtt']
```

Requirements are Python libraries that you would normally install using `pip`. If Home Assistant is unable to install the requirements or verify it is installed, the component will fail to load.

Requirements is a list of strings. Each entry is a pip compatible string. For example, the media player Cast platform depends on the Python package PyChromecast v0.6.12:

```python
REQUIREMENTS = ['pychromecast==0.6.12']
```
