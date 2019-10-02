---
title: "Dispatcher IP Camera"
description: "Instructions on how to integrate internal dispatcher cameras within Home Assistant."
ha_category:
  - Camera
logo: camcorder.png
ha_release: "0.40"
ha_iot_class: Configurable
---

<div class='note'>
This platform is meant for developers only.
</div>

The `dispatcher` camera platform allows developers to create virtual camera's.

## Configuration

You would normally not add this camera to your configuration directly but have it be discovered by one of the integrations that uses it.

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

{% configuration %}
signal:
  description: The signal name of dispatcher signal they send image data to this camera.
  required: true
  type: string
name:
  description: This parameter allows you to override the name of your camera.
  required: false
  type: string
{% endconfiguration %}
