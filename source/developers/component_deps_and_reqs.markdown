---
layout: page
title: "Requirements & Dependencies"
description: "Instructions on how to define requirements and dependencies."
date: 2016-04-16 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant allows components and platforms to specify their dependencies and requirements using the variables `DEPENDENCIES` and `REQUIREMENTS`. Both are lists that contain strings.

## {% linkable_title Dependencies %}

Dependencies are other Home Assistant components that should be setup before the platform is loaded. An example is the MQTT sensor component, which requires an active connection to an MQTT broker. If Home Assistant is unable to load and setup the MQTT component, it will not setup the MQTT sensor component.

```python
DEPENDENCIES = ['mqtt']
```

## {% linkable_title Requirements %}

Requirements are Python libraries or modules that you would normally install using `pip` for your component. Home Assistant will try to install the requirements into the `deps` subdirectory of the Home Assistant [configuration directory](/docs/configuration/) if you are not using a `venv` or in something like `path/to/venv/lib/python3.6/site-packages` if you running in a virtual environment. This will make sure that all requirements are present at startup. If steps fails like missing packages for the compilation of a module or other install errors, the component will fail to load.

Requirements is a list of strings. Each entry is a `pip` compatible string. For example, the media player Cast platform depends on the Python package PyChromecast v0.6.12:

```python
REQUIREMENTS = ['pychromecast==0.6.12']
```

During development of a component, it can be useful to test against different versions of a requirement. This can be done in two steps, using pychromecast as an example:

* `pip install pychromecast==0.6.13 --target ~/.homeassistant/deps`
* `hass --skip-pip`

This will use the specified version, and prevent Home Assistant from trying to override it with what is currently in `REQUIREMENTS`.

If you need to make changes to a requirement to support your component, it's also possible to `pip install` from a checkout of the requirement.

* `git clone https://github.com/balloob/pychromecast.git`
* `pip install ./pychromecast`
* `hass --skip-pip`

You can also to point to a hosted package in the form of a zip-file as a requirement. GitHub provides zip-files for a specific branch, release or even a specific commit. To do that the string in `REQUIREMENTS` needs to be composed of two parts:
* an URL pointing to the zip-file (e.g. https://github.com/my/repo/archive/branch-x.zip) a
* a hashtag and pip-string (as described above) to declare what package and version that zipfile contains.

For example, the Neato robot vacuum components specifies the v.0.0.5 release on GitHub as a requirement that gets installed as pybotvac version 0.0.5 (`pybotvac==0.0.5`)
```python
REQUIREMENTS = ['https://github.com/jabesq/pybotvac/archive/v0.0.5.zip'#pybotvac==0.0.5']
```
