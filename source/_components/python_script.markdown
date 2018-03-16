---
layout: page
title: "Python Scripts"
description: "Instructions on how to setup Python scripts within Home Assistant."
date: 2017-06-15 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.47
---

This component allows you to write Python scripts that are exposed as services in Home Assistant. Each Python file created in the `<config>/python_scripts/` folder will be exposed as a service. The content is not cached so you can easily develop: edit file, save changes, call service. The scripts are run in a sandboxed environment. The following variables are available in the sandbox:

| Name | Description |
| ---- | ----------- |
| `hass` | The Home Assistant object. Access is only allowed to call services, set/remove states and fire events. [API reference][hass-api]
| `data` | The data passed to the Python Script service call.
| `logger` | A logger to allow you to log messages: `logger.info()`, `logger.warning()`, `logger.error()`. [API reference][logger-api]

[hass-api]: https://home-assistant.io/developers/development_hass_object/
[logger-api]: https://docs.python.org/3.4/library/logging.html#logger-objects

## {% linkable_title Writing your first script %}

 - Add to `configuration.yaml`: `python_script:`
 - Create folder `<config>/python_scripts`
 - Create a file `hello_world.py` in the folder and give it this content:

```python
name = data.get('name', 'world')
logger.info("Hello {}".format(name))
hass.bus.fire(name, { "wow": "from a Python script!" })
```

 - Start Home Assistant
 - Call service `python_script/hello_world` with parameters

```json
{
  "name": "you"
}
```

## {% linkable_title Calling Services %}

The following example shows how to call a service from `python_script`. This script takes two parameters: `entity_id` (required), `rgb_color` (optional) and calls `light.turn_on` service by setting the brightness value to `255`.

```python
entity_id = data.get('entity_id')
rgb_color = data.get('rgb_color', [255, 255, 255])
if entity_id is not None:
    service_data = {'entity_id': entity_id, 'rgb_color': rgb_color, 'brightness': 255 }
    hass.services.call('light', 'turn_on', service_data, False)
```
The above `python_script` can be called using the following JSON as an input.

```json
{"entity_id": "light.bedroom", "rgb_color": [255, 0, 0] }
```

For more examples, visit the [Scripts section](https://community.home-assistant.io/c/projects/scripts) in our forum.
