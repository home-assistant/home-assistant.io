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

This integration allows you to write Python scripts that are exposed as actions in Home Assistant. Each Python file created in the `<config>/python_scripts/` folder will be exposed as an action. The content is not cached so you can easily develop: edit file, save changes, perform action. The scripts are run in a sandboxed environment. The following variables are available in the sandbox:

| Name       | Description                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `hass`     | The Home Assistant object. Access is only allowed to perform actions, set/remove states and fire events. [API reference][hass-api]         |
| `data`     | The data passed to the Python Script action.                                                                                               |
| `logger`   | A logger to allow you to log messages: `logger.info()`, `logger.warning()`, `logger.error()`. [API reference][logger-api]                   |
| `time`     | The stdlib `time` available as limited access.                                                                                             |
| `datetime` | The stdlib `datetime` available as limited access.                                                                                         |
| `dt_util`  | The ` homeassistant.util.dt` module.                                                                                                       |
| `output`   | An empty dictionary. Add items to return data as [`response_variable`](/docs/scripts/perform-actions#use-templates-to-handle-response-data). |

Other imports like `min`, `max` are available as builtins. See the [python_script](https://github.com/home-assistant/core/blob/dev/homeassistant/components/python_script/__init__.py) source code for up-to-date information on the available objects inside the script.
  

[hass-api]: https://developers.home-assistant.io/docs/dev_101_hass/
[logger-api]: https://docs.python.org/3.7/library/logging.html#logger-objects

{% note %}
It is not possible to use Python imports with this integration. If you want to do more advanced scripts, you can take a look at [AppDaemon](https://appdaemon.readthedocs.io/en/latest/) or [pyscript](https://github.com/custom-components/pyscript)
{% endnote %}

## Writing your first script, reading input and logging the activity

This is a simplified example that does no real work.
It is created as a first step, to help with:

- Demonstrating how to setup the script
- How to process the input data
- How to log the script activity
- How to troubleshoot / manually call the script.

Start by enabling the Python Scripts integration and create the first script.

- Add to {% term "`configuration.yaml`" %}: `python_script:`
- Create the folder `<config>/python_scripts`
- Create a file `<config>/python_scripts/hello_world.py` in the folder and give it this content:

```python
# `data` is available as builtin and is a dictionary with the input data.
name = data.get("name", "world")
# `logger` and `time` are available as builtin without the need of explicit import.
logger.info("Hello {} at {}".format(name, time.time()))
```

- Start Home Assistant to reload the script configuration.
- Call your new {% my developer_call_service service="python_script.hello_world" %} action (with parameters) from the {% my developer_services %}, using the YAML mode. 

```yaml
action: python_script.hello_world
data:
  name: "Input-Text"
```

{% tip %}

Running this script show absolutely no output on the screen, but it logs with level `info`. You must have the [Logger](/integrations/logger/) enabled at least for level `info`.

 Your {% term "`configuration.yaml`" %} should include something like this.
 
```yaml
logger:
  default: info
```
  
{% endtip %}

## Triggering events

The following example shows how to trigger a custom event over the `hass.bus`.

This example uses the `hello_world.py` from the previous example.
Edit the file adding the code listed below to the end of the file.
There is no need to reload the configuration or restart Home Assistant.

```python
hass.bus.fire("hello_world_event", {"wow": "from a Python script!"})
```

This script doesn't output anything. However, you can view the events being fired in the Developer tools.

From a separate browser window or tab, go to `Developer Tools -> Events` and at `Listen to events` type `hello_world_event` and then press `Start listening`. You should see something like this:

```yaml
event_type: hello_world_event
data:
  wow: from a Python script!
origin: LOCAL
time_fired: "2022-09-19T16:15:39.613378+00:00"
context:
  id: 01GDB8H9JXJ1N23Q62SHX6PTBK
  parent_id: null
  user_id: null
```

## Calling services

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
- action: python_script.turn_on_light
  target:
    entity_id: light.bedroom
  data:
    rgb_color: [255, 0, 0]
```

Services can also respond with data. Retrieve this data in your Python script by setting the `blocking` and `return_response` arguments of the `hass.services.call` function to `True`. The example below retrieves the weather forecast and assigns it to the `current_forecast` variable:

```python
# get_forecast.py
service_data = {"type": "daily", "entity_id": ["weather.YOUR_HOME", "weather.YOUR_SCHOOL"]}
current_forecast = hass.services.call("weather", "get_forecasts", service_data, blocking=True, return_response=True)
```

## Returning data

Python script itself can respond with data. Just add items to the `output` variable in your `python_script` and the whole dictionary will be returned. These can be used in automations to act upon the command results using [`response_variable`](/docs/scripts/perform-actions#use-templates-to-handle-response-data).

```python
# hello_world.py
output["hello"] = f"hello {data.get('name', 'world')}"
```

The above `python_script` can be called using the following YAML and return a result to later steps.

{% raw %}

```yaml
- action: python_script.hello_world
  response_variable: python_script_output
- action: notify.mobile_app_iphone
  data:
    message: "{{ python_script_output['hello'] }}"
```

{% endraw %}

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

## Actions

Available actions: `reload`.

### Action `python_script.reload`

Reload all available python_scripts from the `<config>/python_scripts` folder, as a quicker alternative to restarting Home Assistant.

Use this when creating a new Python script, or after updating the `<config>/python_scripts/services.yaml` file. 

You don't have to call this service when you change an existing Python script.

This service takes no data attributes.
