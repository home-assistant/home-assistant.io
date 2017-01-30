---
layout: page
title: "Checklist for creating a platform"
description: "A list of things to pay attention to when code reviewing a platform."
date: 2017-01-15 14:09 -0800
sidebar: true
comments: false
sharing: true
footer: true
---

A checklist of things to do when you're adding a new platform.

### {% linkable_title 1. Requirements %}

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

### {% linkable_title 2. Dependencies %}

 1. If you depend on a component for the connection, add it to your dependencies: `DEPENDENCIES = ['nest']`

### {% linkable_title 3. Configuration %}

 1. Volutpuous schema present for config validation
 2. Voluptuous schema extends schema from component<br>(e.g. `light.hue.PLATFORM_SCHEMA` extends `light.PLATFORM_SCHEMA`)
 3. Default parameters specified in voluptuous schema, not in `setup_platform(…)`
 4. Schema using as many generic config keys as possible from `homeassistant.const`

```python
import voluptuous as vol

from homeassistant.const import CONF_FILENAME, CONF_HOST
from homeassistant.components.light import PLATFORM_SCHEMA
import homeassistant.helpers.config_validation as cv

CONF_ALLOW_UNREACHABLE = 'allow_unreachable'
DEFAULT_UNREACHABLE = False

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Required(CONF_HOST): cv.string,
    vol.Optional(CONF_ALLOW_UNREACHABLE,
                 default=DEFAULT_UNREACHABLE): cv.boolean,
    vol.Optional(CONF_FILENAME): cv.string,
})
```

### {% linkable_title 4. Setup Platform %}

 1. Test if passed in info (user/pass/host etc.) works.
 2. Group your calls to `add_devices` if possible.
 3. If platform adds extra services, format should be `<component>.<platform>_<service name>`.

### {% linkable_title 5. Entity %}

 1. Extend entity from component, e.g. `class HueLight(Light)`
 2. Do not call `update()` in constructor, use `add_devices(devices, True)` instead.
 3. Do not do any I/O inside properties. Cache values inside `update()` instead.
