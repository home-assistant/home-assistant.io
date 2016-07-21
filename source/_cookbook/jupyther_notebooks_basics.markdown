---
layout: page
title: "Jupyter Notebooks Basics"
description: "Basic example how to work with Home Assistant in a Jupyter notebook."
date: 2016-07-20 09:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Jupyter Notebooks
---

This example below is using the [Home Assistant Python API](/developers/python_api/) in an interactive way.

### Using the Home Assistant Python API


```python
import homeassistant.remote as remote
```


```python
api = remote.API('127.0.0.1', 'mypass')
```


```python
print(remote.validate_api(api))
```

    ok



```python
office_temperature = remote.get_state(api, 'sensor.kitchen_temperature')
```


```python
print('{} is {} {}.'.format(office_temperature.attributes['friendly_name'],
                            office_temperature.state,
                            office_temperature.attributes['unit_of_measurement']
                            )
      )
```

    Kitchen Temperature is 25 °C.

