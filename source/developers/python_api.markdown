---
layout: page
title: "Python API"
description: "Home Assistant Python API documentation"
date: 2015-05-11 12:00
sidebar: false
comments: false
sharing: true
footer: true
---

In the package [`homeassistant.remote`](https://github.com/balloob/home-assistant/blob/master/homeassistant/remote.py) a Python API on top of the [HTTP API](/developers/api.html) can be found.

The two snippets below shows how to use the `homeassistant.remote` package:

```python
import homeassistant.remote as remote

api = remote.API("host", "password")
living_room = remote.get_state(api, 'group.living_room')
```

```python
import homeassistant.remote as remote

api = remote.API("host", "password")
hass = remote.HomeAssistant(api)
hass.start()
living_room = hass.states.get('group.living_room')
```

