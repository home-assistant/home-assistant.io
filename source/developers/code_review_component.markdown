---
layout: page
title: "Checklist for creating a component"
description: "A list of things to pay attention to when code reviewing a component."
date: 2017-01-15 14:09 -0800
sidebar: true
comments: false
sharing: true
footer: true
---

A checklist of things to do when you're adding a new component.

### {% linkable_title Requirements %}

 1. Requirement version pinned: `REQUIREMENTS = ['phue==0.8.1']`
 2. If requirement hosted on GitHub:
     - Point at a zip archive of a release tag or commit SHA.
     - Add version found in zip-archive as hash to url.

```python
REQUIREMENTS = [
    'http://github.com/technicalpickles/python-nest'
    '/archive/e6c9d56a8df455d4d7746389811f2c1387e8cb33.zip'
    '#python-nest==3.0.3']
```

### {% linkable_title Configuration %}

 1. Voluptuous schema present for config validation
 2. Default parameters specified in voluptuous schema, not in `setup_platform(…)`
 3. Schema using as many generic config keys as possible from `homeassistant.const`
 4. If having platforms, have a `PLATFORM_SCHEMA`, otherwise `CONFIG_SCHEMA`.
 5. If `PLATFORM_SCHEMA`, import base from `homeassistant.helpers.config_validation`


### {% linkable_title Component/platform communication %}

 1. If you need to share global data with platforms, use the dictionary `hass.data`.
 2. If the component fetches data that causes related platform entities to update,
