---
layout: page
title: "Basic State Setting Example"
description: ""
date: 2016-02-07 12:13
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Custom Python Component Examples
---

This is a simple hello world example to show the basics for setting a state. To use this example, create the file `<config dir>/custom_components/hello_state.py` and copy the below example code.

```python
# The domain of your component. Should be equal to the name of your component.
DOMAIN = 'hello_state'

CONF_NAME = 'name'
DEFAULT_NAME = 'World'


def setup(hass, config):
    """Setup is called when Home Assistant is loading our component."""

    # Get the name from the configuration. Use DEFAULT_NAME if no name provided.
    name = config[DOMAIN].get(CONF_NAME, DEFAULT_NAME)

    # States are in the format DOMAIN.OBJECT_ID
    hass.states.set('hello_state.hello', name)

    # Return boolean to indicate that initialization was successfully.
    return True
```

Load the component by adding the following to your `configuration.yaml`:

```yaml
# configuration.yaml entry
hello_state:
  # optional
  name: Paulus
```
