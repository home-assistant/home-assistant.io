---
layout: page
title: "Hass object"
description: "Introduction to developing with the hass object."
date: 2016-04-16 13:32
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /developers/component_initialization/
---

While developing Home Assistant you will see a variable that is everywhere: `hass`. This is the Home Assistant instance that will give you access to all the various parts of the system.

### {% linkable_title The `hass` object %}

The Home Assistant instance contains four objects to help you interact with the system.

| Object | Description |
| ------ | ----------- |
| `hass` | This is the instance of Home Assistant. Allows starting, stopping and enqueing new jobs. [See available methods.](https://dev-docs.home-assistant.io/en/master/api/core.html#homeassistant.core.HomeAssistant)
| `hass.config` | This is the core configuration of Home Assistant exposing location, temperature preferences and config directory path. [See available methods.](https://dev-docs.home-assistant.io/en/master/api/core.html#homeassistant.core.Config)
| `hass.states` | This is the StateMachine. It allows you to set states and track when they are changed. [See available methods.](https://dev-docs.home-assistant.io/en/master/api/core.html#homeassistant.core.StateMachine). |
| `hass.bus` | This is the EventBus. It allows you to trigger and listen for events. [See available methods.](https://dev-docs.home-assistant.io/en/master/api/core.html#homeassistant.core.EventBus). |
| `hass.services` | This is the ServiceRegistry. It allows you to register services. [See available methods.](https://dev-docs.home-assistant.io/en/master/api/core.html#homeassistant.core.ServiceRegistry). |

### {% linkable_title Where to find `hass` %}

Depending on what you're writing, there are different ways the `hass` object is made available.

**Component**<br>
Passed into `setup(hass, config)` or `async_setup(hass, config)`.

**Platform**<br>
Passed into `setup_platform(hass, config, add_devices, discovery_info=None)` or `async_setup_platform(hass, config, async_add_devices, discovery_info=None)`.

**Entity**<br>
Available as `self.hass` once the entity has been added via the `add_devices` callback inside a platform.
