---
layout: page
title: "Discoverable"
description: "Instructions on how to setup the discoverable component with Home Assistant."
date: 2016-03-01 07:00
sidebar: true
comments: false
sharing: true
footer: true
---

The Home Assistant discovery protocol is a lightweight feature that introduces support for Home Assistant servers to be discoverable. This will allow [Home Assistant instances](https://github.com/balloob/micropython-home-assistant) running with [MicroPython](https://micropython.org/) to get started without any required configuration (Example from the [MicroPython Home Assistant](https://github.com/balloob/micropython-home-assistant) documentation):

```python
from homeassistant.discovery import get_instance()

hass = get_instance()

for state in hass.states():
    print(state)
```

To enable `discovery` in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
discoverable:
  expose_password: yes
```


Configuration variables:

- **expose_password** (*Optional*): It is up to the user to expose the password in the discovery response (Default: off). If password not exposed, uHA instances will have to provide it (`get_instance('my password')`).

