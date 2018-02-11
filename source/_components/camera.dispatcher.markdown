---
layout: page
title: "Dispatcher IP Camera"
description: "Instructions how to integrate internal dispatcher cameras within Home Assistant."
date: 2017-03-08 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Camera
logo: camcorder.png
ha_release: "0.40"
ha_iot_class: "depends"
---

<p class='note'>
This platform is meant for developers only.
</p>

The `dispatcher` camera platform allows developers to create virtual camera's.

You would normally not add this camera to your configuration directly but have it be discovered by one of the components that uses it.

```yaml
# Example configuration.yaml entry
camera:
  - platform: dispatcher
    signal: name_of_dispatcher_signal
```

To update the image from another piece of code, run this from an async context:

```python
from homeassistant.helpers.dispatcher import async_dispatcher_send

async_dispatcher_send(hass, 'name_of_dispatcher_signal', image_data)
```

Configuration variables:
- **signal** (*Required*): The signal name of dispatcher signal they send image data to this camera.
- **name** (*Optional*): This parameter allows you to override the name of your camera.
