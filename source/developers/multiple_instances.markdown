---
layout: page
title: "Multiple Instances"
description: "Quick primer on how multiple instances work together."
date: 2016-04-16 14:24 -07:00
sidebar: true
comments: false
sharing: true
footer: true
---

# {% linkable_title This has been deprecated and is no longer supported. %}

Home Assistant supports running multiple synchronised instances using a master-slave model. Whenever `events.fire` or `states.set` is called on the slave it will forward it to the master. The master will replicate all events and changed states to its slaves.

<p class='img'>
  <a href='/images/architecture/architecture-remote.png'>
    <img src='/images/architecture/architecture-remote.png' />
  </a>
  Overview of the Home Assistant architecture for multiple devices.
</p>

A slave instance can be started with the following code and has the same support for components as a master instance.

```python
import homeassistant.remote as remote
import homeassistant.bootstrap as bootstrap

# Location of the Master API: host, password, port.
# Password and port are optional.
remote_api = remote.API("127.0.0.1", "password", 8124)

# Initialize slave
hass = remote.HomeAssistant(remote_api)

# To add an interface to the slave on localhost:8123
bootstrap.setup_component(hass, 'frontend')

hass.start()
hass.block_till_stopped()
```

<p class='note'>
Because each slave maintains its own Service Registry it is possible to have multiple slaves respond to one service call.
</p>
