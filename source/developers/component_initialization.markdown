---
layout: page
title: "Initializing your components"
description: "Instructions how to handle initialization of your component."
date: 2016-04-16 13:32
sidebar: true
comments: false
sharing: true
footer: true
---

After loading, the bootstrapper will call `setup(hass, config)` method on the component to initialize it.

### {% linkable_title hass: the Home Assistant instance %}

The Home Assistant instance contains four objects to help you interact with the system.

| Object | Description |
| ------ | ----------- |
| `hass.config` | This is the core configuration of Home Assistant exposing location, temperature preferences and config directory path. [Details](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L687)
| `hass.states` | This is the StateMachine. It allows you to set states and track when they are changed. [See available methods](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L434). |
| `hass.bus` | This is the EventBus. It allows you to trigger and listen for events.<br>[See available methods](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L229). |
| `hass.services` | This is the ServiceRegistry. It allows you to register services.<br>[See available methods](https://github.com/home-assistant/home-assistant/blob/dev/homeassistant/core.py#L568). |

### {% linkable_title config: User given configuration. %}

The `config` parameter is a dictionary containing the user supplied configuration. The keys of the dictionary are the component names and the value is another dictionary with the component configuration.

If your configuration file contains the following lines:

```yaml
example:
  host: paulusschoutsen.nl
```

Then in the setup method of your component you will be able to refer to `config['example']['host']` to get the value `paulusschoutsen.nl`.
