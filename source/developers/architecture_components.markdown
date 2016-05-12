---
layout: page
title: "Components Architecture"
description: "Overview of components within the Home Assistant architecture."
date: 2016-04-16 14:24 -07:00
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant can be extended by **components**. Each component is responsible for a specific domain within Home Assistant. Components can listen for or trigger events, offer services and maintain states. Components are written in Python and can do all the goodness that Python has to offer. Out of the box, Home Assistant offers a bunch of [built-in components]({{site_root}}/components/).

<p class='img'>
<img src='/images/architecture/component_interaction.png' alt='Diagram showing interaction between components and the Home Assistant core.'>
Diagram showing interaction between components and the Home Assistant core.
</p>

We can differentiate between two different types of components within Home Assistant.

#### {% linkable_title Components that interact with an Internet of Things domain %}

These components will track devices within a specific domain and consist of a core part and platform-specific logic. These components make their information available via the State Machine and the Event Bus. The component will also register services in the Service Registry to expose control of the devices.

For example, one of the built-in components is the `switch` component. This component is responsible for interaction with different types of switches.

A platform provides support for a particular kind/brand of device. For example, a switch could use a WeMo or Orvibo platform, and a light component might interact with the Hue or LiFX platform.

If you are planning to add support for a new platform, please check out the [add new platform section](/developers/add_new_platform/).

#### {% linkable_title Components that respond to events that happen within Home Assistant %}

These components provide small pieces of home automation logic or services that do common tasks within your house.

For example the [`device_sun_light_trigger` component](/components/device_sun_light_trigger/) tracks the state of devices and the sun to make sure that the lights are turned on when it gets dark and there are people home. The component uses logic along the following lines:

```plain
    In the event that device 'Paulus Nexus 5' changes to the 'Home' state:
      If the sun has set and the lights are not on:
        Turn on the lights
```

```plain
    In the event that the combined state of all tracked devices changes to 'Not Home':
      If the lights are on:
        Turn off the lights
```

```plain
    In the event of the sun setting:
      If the lights are off and the combined state of all tracked device equals 'Home':
        Turn on the lights
```

An extended example of a home automation component can be found [here](https://github.com/home-assistant/home-assistant/blob/master/config/custom_components/example.py).

### {% linkable_title The full picture %}

When we put all the different pieces of Home Assistant together we see that we match pretty close to the initial sketched home automation overview. The smart home AI is not implemented yet and therefore omitted from the following picture.

<p class='img'>
  <a href='/images/architecture/ha_full_architecture.png'>
    <img src='/images/architecture/ha_full_architecture.png' />
  </a>
  Overview of the full Home Assistant architecture with a couple of loaded components and platforms.
</p>

The platform logic for components uses 3rd party Python libraries to communicate with the devices. This is done so that we can leverage great device libraries that are out there in the Python community.
