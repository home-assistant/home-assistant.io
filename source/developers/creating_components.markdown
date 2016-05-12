---
layout: page
title: "Creating components"
description: "Guidelines to get you create your first component for Home Assistant."
date: 2014-12-21 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

Alright, you're ready to make your first component. AWESOME. Don't worry, we've tried hard to keep it as easy as possible.

### {% linkable_title Example component %}

Add `hello_state:` to your `configuration.yaml` file and create a file `<config_dir>/custom_components/hello_state.py` with the below code to test it locally.

```python
DOMAIN = 'hello_state'

def setup(hass, config):
    hass.states.set('hello.world', 'Paulus')

    return True
```

For more examples, see the [Custom Python Component Examples](/cookbook/#custom-python-component-examples) on our examples page.
