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

<p class='note'>
Not all existing platforms follow the requirements in this checklist. This cannot be used as a reason to not follow them!
</p>

### {% linkable_title 1. Requirements %}

 1. Requirement version should be pinned: `REQUIREMENTS = ['phue==0.8.1']`
 2. We no longer want requirements hosted on GitHub. Please upload to PyPi.
 3. Requirements should only be imported inside functions. This is necessary because requirements are installed on the fly.

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
 4. The state and/or attributes should not contain relative time since something happened. Instead it should store UTC timestamps.

### {% linkable_title 6. Communication with devices/services %}

 1. All API specific code has to be part of a third party library hosted on PyPi. Home Assistant should only interact with objects and not make direct calls to the API.
 
```python
# bad
status = requests.get(url('/status'))

# good
from phue import Bridge
bridge = Bridge(…)
status = bridge.status()
```
