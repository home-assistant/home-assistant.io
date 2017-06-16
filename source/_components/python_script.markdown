---
layout: page
title: "Python Scripts"
description: "Instructions how to setup Python scripts within Home Assistant."
date: 2017-06-15 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.47
---

This component allows you to write Python scripts that are exposed as services in Home Assistant. Each Python file created in the `<config>/python_scripts/` folder will be exposed as a service. The content is not cached so you can easily develop: edit file, save changes, call service. The scripts are run in a sandboxed environment with access to the `hass` object, the service call data as `data` and a logger as `logger`.

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
