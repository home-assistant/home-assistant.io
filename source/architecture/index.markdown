---
layout: page
title: "architecture"
date: 2014-12-18 21:49
sidebar: false
comments: true
sharing: true
footer: true
---

<a href='{{ root_url }}/images/ha_architecture.png'>
  <img src='{{ root_url }}/images/ha_architecture.png' style='border: 0; box-shadow: none;'/>
</a>

The core of Home Assistant exists of the following parts.

The **Event Bus** facilitates the firing and listening of events. This is the beating heart of Home Assistant.

The **State Machine** keeps track of the states of things. Fires a state_changed event when a state has been changed.

The **Service Registry** listens on the event bus for call_service events and allows other code to register services.

The **Timer** will send every 10 seconds a time_changed event on the event bus.

Take for example the device_tracker component. This component is responsible for keeping track which devices are home. It checks which devices are home every time a time_changed event is fired on the event bus. It will then update the state machine with the information for each device.

This setup allows us to create simple yet powerful logic for controlling your home:

    In the event that device 'Paulus Nexus 5' changes to the 'Home' state:
      If the sun has set and the lights are not on:
        Turn on the lights

    In the event that the combined state of all tracked devices changes to 'Not Home':
      If the lights are on:
        Turn off the lights

    In the event of the sun setting:
      If the lights are off and the combined state of all tracked device equals 'Home':
        Turn on the lights

By using the Bus as a central communication hub between components it is easy to replace components or add functionality. If you would want to change the way devices are detected you only have to write a component that updates the device states in the State Machine.

## Multiple connected instances

Home Assistant supports running multiple synchronzied instances using a master-slave model. Slaves forward all local events fired and states set to the master instance which will then replicate it to each slave.

Because each slave maintains its own ServiceRegistry it is possible to have multiple slaves respond to one service call.

<a href='{{ root_url }}/images/architecture-remote.png'>
  <img src='{{ root_url }}/images/architecture-remote.png' style='border: 0; box-shadow: none;' />
</a>

A slave instance can be started with the following code and has the same support for components as a master-instance.

```python
import homeassistant.remote as remote
import homeassistant.components.http as http

remote_api = remote.API("remote_host_or_ip", "remote_api_password")

hass = remote.HomeAssistant(remote_api)

http.setup(hass, "my_local_api_password")

hass.start()
hass.block_till_stopped()
```
