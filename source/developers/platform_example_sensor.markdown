---
layout: page
title: "Example sensor platform"
description: "Minimum implementation of a Home Assistant platform."
date: 2016-04-16 14:24 -07:00
sidebar: true
comments: false
sharing: true
footer: true
---

This is a minimum implementation of a platform for the sensor component.

### {% linkable_title Installation %}

Copy the code below and create it as a file in `<config_dir>/sensor/example.py`.

Add the following to your configuration.yaml:

```yaml
# Example configuration.yaml entry
sensor:
  platform: example
```

### {% linkable_title Code %}

```python
from homeassistant.const import TEMP_CELCIUS
from homeassistant.helpers.entity import Entity


def setup_platform(hass, config, add_devices, discovery_info=None):
    add_devices([ExampleSensor()])


class ExampleSensor(Entity):
    @property
    def name(self):
        return 'Temperature'

    @property
    def state(self):
        return 23

    @property
    def unit_of_measurement(self):
        return TEMP_CELCIUS
```
