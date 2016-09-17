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

## Dependencies

Dependencies are other Home Assistant components that should be setup before the platform is loaded. An example is the MQTT sensor component, which requires an active connection to an MQTT broker. If Home Assistant is unable to load and setup the MQTT component, it will not setup the MQTT sensor component.

```python
DEPENDENCIES = ['mqtt']
```

## Requirements

Requirements are Python libraries that you would normally install using `pip` for your component. Home Assistant will try to install the requirements into the `deps` subdirectory of the Home Assistant configuration directory (`.home-assistant` by default) or verify it is already installed at startup. If that fails, the component will fail to load.

Requirements is a list of strings. Each entry is a pip compatible string. For example, the media player Cast platform depends on the Python package PyChromecast v0.6.12:

```python
REQUIREMENTS = ['pychromecast==0.6.12']
```

During development of a component, it can be useful to test against different versions of a requirement. This can be done in two steps, using pychromecast as an example:

* `pip install pychromecast==0.6.13 --target ~/.homeassistant/deps`
* `hass --skip-pip`

This will use the specified version, and prevent Home Assistant from trying to override it with what is currently in `REQUIREMENTS`.

If you need to make changes to a requirement to support your component, it's also possible to pip install from a checkout of the requirement.

* `git clone https://github.com/balloob/pychromecast.git`
* `pip install ./pychromecast`
* `hass --skip-pip`
