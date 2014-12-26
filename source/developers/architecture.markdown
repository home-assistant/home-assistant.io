---
layout: page
title: "Architecture"
date: 2014-12-18 21:49
sidebar: false
comments: false
sharing: true
footer: true
---

Before we dive into the Home Assistant architecture, it is important to get a clear overview of the home automation landscape as a whole. This will allow us to show how the different parts of Home Assistant fit in the picture. For a more lengthy discussion about what each part in this overview is responsible for, <a href='{{ root_url }}/blog/2014/12/25/home-control-home-automation-and-the-smart-home/'>check out our blog</a>. A tl;dr version of the blog:

 * Home Control is responsible for collecting information on- and controlling devices.
 * Home Automation triggers commands based on user configurations.
 * Smart Home triggers commands based on previous behavior.

<p class='img'>
  <a href='{{site_root}}/images/architecture/home_automation_landscape.png'>
    <img alt='Home Automation landscape'
         src='{{site_root}}/images/architecture/home_automation_landscape.png' />
  </a>
  Overview of the home automation landscape.
</p>

The core of Home Assistant is responsible for the Home Control part and is made up: 

 * The **Event Bus** facilitates the firing and listening of events. This is the beating heart of Home Assistant.
 * The **State Machine** keeps track of the states of things. Fires a `state_changed` event when a state has been changed.
 * The **Service Registry** listens on the event bus for `call_service` events and allows other code to register services.
 * The **Timer** will send every 10 seconds a `time_changed` event on the event bus.

<p class='img'>
  <a href='{{ root_url }}/images/architecture/ha_architecture.png'>
    <img src='{{ root_url }}/images/architecture/ha_architecture.png' />
  </a>
  Overview of the Home Assistant architecture
</p>

Home Assistant can be extended by **components**. Each component is responsible for a specific domain within Home Assistant. Components can listen for- or trigger events, offer services and maintain states. Components are written in Python and can do all the goodness that Python has to offer. Out of the box, Home Assistant offers a bunch of [built-in components]({{site_root}}/components/).

We can differentiate between two different types of
components within Home Assistant.

#### Components that interact with an Internet of Things domain
These components will track devices within a specific domain and make this information available via the State Machine and the Event Bus. The component will also register services in the Service Registry to expose control of the devices. Each of these components exist of a core part and small pieces of platform specific logic.

For example, one of the built-in components is the `switch` component. This component is responsible for interaction with different types of switches.

If you are planning to add support for a new platform, please check out the [add new platform section]({{root_url}}/developers/add_new_platform.html).

#### Components that respond to events that happen within Home Assistant
These components provide small pieces of home automation logic or services that do common tasks within your house.

For example the `device_sun_light_trigger` component tracks the state of devices and the sun to make sure that the lights are turned on when it gets dark and there are people home. The component uses logic along the following lines:

    In the event that device 'Paulus Nexus 5' changes to the 'Home' state:
      If the sun has set and the lights are not on:
        Turn on the lights

<!-- comment to seperate markdown blockquotes -->

    In the event that the combined state of all tracked devices changes to 'Not Home':
      If the lights are on:
        Turn off the lights

<!-- comment to seperate markdown blockquotes -->

    In the event of the sun setting:
      If the lights are off and the combined state of all tracked device equals 'Home':
        Turn on the lights

Another example of a home automation component can be found in [`/config/custom_components/example.py`](https://github.com/balloob/home-assistant/blob/master/config/custom_components/example.py).

## Multiple connected instances

Home Assistant supports running multiple synchronzied instances using a master-slave model. Slaves forward all local fired events and set states to the master instance which will then replicate it to each slave.

<p class='img'>
  <a href='{{ root_url }}/images/architecture/architecture-remote.png'>
    <img src='{{ root_url }}/images/architecture/architecture-remote.png' />
  </a>
  Overview of the Home Assistant architecture for multiple devices.
</p>

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

<p class='note'>
Because each slave maintains its own ServiceRegistry it is possible to have multiple slaves respond to one service call.
</p>