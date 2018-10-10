---
layout: page
title: "Z-Wave"
description: "Using Z-Wave with Home Assistant."
date: 2017-09-21 10:59
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/z-wave/
---

[Z-Wave](http://www.z-wave.com/) integration for Home Assistant allows you to observe and control connected Z-Wave devices. Z-Wave support requires a [supported Z-Wave USB stick or module](/docs/z-wave/controllers/) to be plugged into the host.

There is currently support for climate, covers, lights, locks, sensors, switches, and thermostats. All will be picked up automatically after configuring this platform.

Before configuring the Z-Wave setup, please take a moment and read [this article](https://drzwave.blog/2017/01/20/seven-habits-of-highly-effective-z-wave-networks-for-consumers/) to understand the most common pitfalls of Z-Wave networks.

## {% linkable_title What is Z-Wave %}

Z-Wave is a wireless communication protocol designed for home automation. It uses a low power, and low bandwidth, mesh network that allows devices that aren't within direct range of each other to communicate indirectly, via other nodes. Any device that's permanently powered (not battery powered) will help build the mesh, if you don't have enough powered devices, or you locate these poorly, your mesh will be unreliable. You can [view the state](https://community.home-assistant.io/t/graph-your-z-wave-mesh-python-auto-update/40549) of your mesh [by graphing it](https://community.home-assistant.io/t/z-wave-graph-without-the-python/64275).

There is a limit of 232 devices in a single Z-Wave network. If you need more devices then you could set up a second Home Assistant system with its own Z-Wave network and connect these with the [MQTT Eventstream](/components/mqtt_eventstream/) or [MQTT Statestream](/components/mqtt_statestream) components. There is also a limit of 4 hops for Z-Wave, so placing the controller as centrally as you can is important.

The Z-Wave standard was improved with Z-Wave Plus, and if you only use Z-Wave plus devices then you will gain the full benefits.

## {% linkable_title What do you need to use Z-Wave %}

There are 2 basic things you'll need to use Z-Wave, a Z-Wave [controller](/docs/z-wave/controllers/) and one or more [devices](/docs/z-wave/devices/). 

### {% linkable_title Regional differences %}

There are 12 different regions for Z-Wave devices, which relates to the frequency the devices use. There is overlap between the regions, but you should ensure that you buy devices for your region. Wikipedia has a list of the [frequencies used](https://en.wikipedia.org/wiki/Z-Wave#Radio_frequencies).

## {% linkable_title Getting started %}

You'll now need to connect your [controller](/docs/z-wave/controllers/), [configure](/docs/z-wave/installation) the Z-Wave component, then [add some devices](/docs/z-wave/adding) using the [control panel](/docs/z-wave/control-panel). [This explains](/docs/z-wave/devices/) about devices, and how [entities are named](/docs/z-wave/entities).

You can get more information on the [available services](/docs/z-wave/services/) and [events](/docs/z-wave/events/), what the [query stages](/docs/z-wave/query-stage) of battery powered devices are, as well as details on configuring [specific devices](/docs/z-wave/device-specific/).

## {% linkable_title Instant status updates %}

When you toggle a switch or control a light locally you may find that it takes some time for that to be reflected in Home Assistant. That's because Lutron had patents on the status updates using the *Hail* command class, the traditional way of allowing devices to tell the controller that something happened locally. The same result can be achieved through the *Association* command class, or *Central Scene* command class (though, *Central Scene* isn't [fully supported](https://github.com/OpenZWave/open-zwave/pull/1125) in OpenZWave). 

If you search [the Z-Wave products database](http://products.z-wavealliance.org/) for your product and it lists one of those in the **Controlled** command classes (not the **Supported** command classes), then your device will be able to report state changes when they happen. If it doesn't then updates may either happen eventually, or you may need to (carefully) [enable polling](https://www.home-assistant.io/docs/z-wave/control-panel/#entities-of-this-node).
