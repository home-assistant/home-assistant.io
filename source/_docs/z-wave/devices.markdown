---
title: "Z-Wave Devices"
description: "What you need to know about Z-Wave devices."
---

<div class='note'>

This Z-Wave integration is deprecated and replaced with a [new implementation based on Z-Wave JS](/integrations/zwave_js); it's currently in beta, and you can [try it now](/integrations/zwave_js/).

</div>

## Devices, Nodes, Entities

The *device* is the hardware, and also used when referring to the node and all its entities. There are 3 main types of devices:

* [Controllers](/docs/z-wave/controllers) - all Z-Wave networks need to have one of these, though some may have two (a primary and a secondary)
* Sensors - devices that tell you about the environment, these could be flood sensors, motion sensors, temperature sensors and so on
* Actors or actuators - devices that change their environment, for example light switches, dimmers, thermostats (many of these will also have a sensor function)

Many sensors and actors can directly control other devices through a capability called *association*, without the use of an automation, these are known as *routing slaves*. This will be a very simple control, such as turning a light on when a motion sensor is activated, and off when it stops detecting motion.

The *node* is the presence of the device on the Z-Wave mesh. Once you've added a device to Home Assistant, the node is represented by an `entity_id` that starts with `zwave`.

The *entity* is an individual integration of the node. It may be a sensor that you read from, or a control that you operate. For any node, there will be at least one entity (for the node itself) and if it exposes any controls or sensors there will be at least one entity per control or sensor. The [entities](/docs/z-wave/entities) that are created depend on the Command Class the device supports.

## Z-Wave, Plus, Security 2

There have been 2 extensions to the Z-Wave protocol. Using these requires that your controller supports these extensions, but devices are backward compatible.

### Z-Wave Plus

The key improvements are:

* Improved battery life (50% increase)
* Improved range (50% increase) if all your devices are Z-Wave Plus
* Higher bandwidth and improved noise immunity if all your devices are Z-Wave Plus
* Improved self-healing and fault tolerance

### Z-Wave Security 2

From 2 April 2017 all newly approved Z-Wave devices will have to support the Security 2 (S2) framework. At the time of writing this (October 2019) OpenZWave does not support the S2 framework.

## Device Power

Your Z-Wave mesh network is built with the devices that are mains powered (whether directly, or via a USB adapter), these relay traffic for other nodes, building the network. These devices are always awake and you can query them, or send configuration changes, at any time.

Battery powered devices spend most of their time asleep, unable to relay traffic, to be queried, or receive changes. Changes sent while a device is asleep will be queued and sent the next time the device wakes. Details of the default wake interval, and how to manually wake the device (if supported) will be detailed in the device's manual. Some battery powered devices (primarily locks and thermostats) support beaming (the *Beam* command class) that allows them to be remotely woken. This does require that all devices in the network responsible for relaying the commands between the controller and the device also support beaming.

<div class='note'>

The Z-Wave capability *routing* doesn't mean the device routes traffic, it actually means that it's able to control other devices. You'll see this capability on most remotes and switches.

</div>

## Instant Status

Older designs of Z-Wave devices may not support *Instant Status* (the *Hail* command class), because of a patent that was held by Lutron Electronics. Some manufacturers paid to use it, others didn't and so those devices may not report on changes. That patent expired in 2016, so new designs should support this.

As long as your device lists Hail or Association in its Controlled Command Classes, then you'll get instant status updates. Devices that list Central Scene in their Controlled Command Classes in theory will also work this way, once OpenZWave supports the Central Scene class. You can check your device on the [Z-Wave alliance](https://products.z-wavealliance.org/) site, looking at the **Command Classes** link, then at the **Controlled Command Classes** section.

## Polling

Where a device doesn't send updates on status changes to the controller, you can work around this by using a thing called Polling. That causes the controller to ask the device to provide an update on all its sensors and states. This will cause a lot of traffic on the network, and if you poll too many devices too quickly, you can effectively break your Z-Wave network. Polling should only be used where there is no other choice, and you should use as large a polling interval as possible. Ideally you should replace the device.

For example, with `polling_interval=60000` (which is the default) if you have 10 devices that are being polled at every interval, and each polling takes one second (request/response round trip), then it will take 10 seconds to complete the polling list. This only leaves 50 seconds left for normal traffic. The more devices you poll, and the shorter the interval, the less bandwidth that's available for normal traffic.

Polling needs to be enabled per device, you can control this through the *polling intensity* (interval) of the device. See the [Node Management](/docs/z-wave/control-panel#z-wave-node-management) documentation for details.

## Central Scene support

The Central Scene command class isn't yet supported in OpenZWave (there is [work in progress](https://github.com/OpenZWave/open-zwave/pull/1125) to provide it it), though Home Assistant has introduced some support with [change 9178](https://github.com/home-assistant/home-assistant/pull/9178) which was part of 0.53 and [documented here](/docs/z-wave/device-specific/#homeseer-switches).

## Supported Devices

You can check to see if OpenZWave supports your particular device by looking at the [OpenZWave 1.4 GitHub](https://github.com/OpenZWave/open-zwave/tree/1.4/config). Be aware that being listed here doesn't mean that it will be supported in Home Assistant, since the version of OpenZWave used by Home Assistant will often lag the GitHub by a few months.

Even if your device isn't listed there, it's likely that it will still work as expected as long as the device complies with the Z-Wave standards. The OpenZWave wiki describes how [you can add support](https://github.com/OpenZWave/open-zwave/wiki/Adding-Devices) for your device if it isn't listed.
