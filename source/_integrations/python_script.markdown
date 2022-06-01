---
title: Python Scripts
description: Instructions on how to setup Python scripts within Home Assistant.
ha_category:
  - Automation
ha_release: 0.47
ha_quality_scale: internal
ha_domain: python_script
ha_integration_type: integration
---

This integration allows you to write Python scripts that are exposed as services in Home Assistant. Each Python file created in the `<config>/python_scripts/` folder will be exposed as a service. The content is not cached so you can easily develop: edit file, save changes, call service. The scripts are run in a sandboxed environment. The following variables are available in the sandbox:

| Name | Description |
| ---- | ----------- |
| `hass` | The Home Assistant object. Access is only allowed to call services, set/remove states and fire events. [API reference][hass-api]
| `data` | The data passed to the Python Script service call.
| `logger` | A logger to allow you to log messages: `logger.info()`, `logger.warning()`, `logger.error()`. [API reference][logger-api]

[hass-api]: /developers/development_hass_object/
[logger-api]: https://docs.python.org/3.7/library/logging.html#logger-objects

<div class='note'>

It is not possible to use Python imports with this integration. If you want to do more advanced scripts, you can take a look at [AppDaemon](https://appdaemon.readthedocs.io/en/latest/) or [pyscript](https://github.com/custom-components/pyscript)

</div>

## Writing your first script

- Add to `configuration.yaml`: `python_script:`
- Create folder `<config>/python_scripts`
- Create a file `hello_world.py` in the folder and give it this content:

```python
name = data.get("name", "world")
logger.info("Hello %s", name)
hass.bus.fire(name, {"wow": "from a Python script!"})
```

- Start Home Assistant
- Call your new {% my developer_call_service service="python_script.hello_world" %} service (with parameters) from the {% my developer_services %}. 

```yaml
name: you
```

<div class='note'>

Running this script show absolutely no output on the screen, but it logs with level `info`. You must have the [Logger](/integrations/logger/) enabled at least for level `info`.

</div>

## Calling Services

The following example shows how to call a service from `python_script`. This script takes two parameters: `entity_id` (required), `rgb_color` (optional) and calls `light.turn_on` service by setting the brightness value to `255`.

```python
# turn_on_light.py
entity_id = data.get("entity_id")
rgb_color = data.get("rgb_color", [255, 255, 255])
if entity_id is not None:
    service_data = {"entity_id": entity_id, "rgb_color": rgb_color, "brightness": 255}
    hass.services.call("light", "turn_on", service_data, False)
```

The above `python_script` can be called using the following YAML as an input.

```yaml
- service: python_script.turn_on_light
  target:
    entity_id: light.bedroom
  data:
    rgb_color: [255, 0, 0]
```

## Documenting your Python scripts

You can add names and descriptions for your Python scripts that will be shown in the frontend. To do so, simply create a `services.yaml` file in your `<config>/python_scripts` folder. Using the above Python script as an example, the `services.yaml` file would look like:

```yaml
# services.yaml
turn_on_light:
  name: Turn on light
  description: Turn on a specific light and set its color.
  fields:
    entity_id:
      description: The light that will be turned on.
      example: light.bedroom
    rgb_color:
      description: The color to which the light will be set.
      example: [255, 0, 0]
```

For more examples, visit the [Scripts section](https://community.home-assistant.io/c/projects/scripts) in our forum.

## Services

Available services: `reload`.

### Service `python_script.reload`

Reload all available python_scripts from the `<config>/python_scripts` folder. Use this when creating a new Python script and you're not restarting Home Assistant.

This service takes no service data attributes.
