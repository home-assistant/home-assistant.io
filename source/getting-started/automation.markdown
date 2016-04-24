---
layout: page
title: "Automating Home Assistant"
description: "Steps to help you get automation setup in Home Assistant."
date: 2015-09-19 09:40
sidebar: true
comments: false
sharing: true
footer: true
---

When all your devices are set up it's time to put the cherry on the pie: automation. Home Assistant offers [a few built-in automations](/components/#automation) but mainly you'll be using the automation component to set up your own rules.

### {% linkable_title The basics of automation %}

Every automation rule consists of triggers, an action to be performed and optional conditions.

Triggers can be anything observed in Home Assistant. For example, it can be a certain point in time or a person coming home, which can be observed by the state changing from `not_home` to `home`.

Actions will call services within Home Assistant. For example, turn a light on, set the temperature on your thermostat or activate a scene.

Conditions are used to prevent actions from firing unless certain conditions are met. For example, it is possible to only turn on the light if someone comes home and it is after a certain point in time.

The difference between a condition and a trigger can be confusing. The difference is that the trigger looks at the event that is happening, e.g., a car engine turning on. Conditions looks at the current state of the system, e.g., is the car engine on.

### {% linkable_title Exploring the internal state %}

Automation rules are based on the internal state of Home Assistant. This is available for exploring in the app using the developer tools. The first icon will show you the available services and the second icon will show you the current devices.

Each device is represented in Home Assistant as an entity consisting of the following parts:

| Name | Description | Example |
| ---- | ----- | ---- |
| Entity ID | Unique identifier for the entity. | `light.kitchen`
| State | The current state of the device. | `home`
| Attributes | Extra data related to the device and/or current state. | `brightness`

A service can be called to have Home Assistant perform an action. Turn on a light, run a script or enable a scene. Each service has a domain and a name. For example the service `light.turn_on` is capable of turning on any light device in your system. Services can be passed parameters to for example tell which device to turn on or what color to use.



### {% linkable_title Further reading %}

We went over the basics of creating a home automation rule. Now, go automate!

 - Learn about the available [automation triggers](/getting-started/automation-trigger/)
 - Learn about the available [automation conditions](/getting-started/automation-condition/)
 - Learn about [scripts](/components/script/) to help you trigger multiple actions and delays
 - Learn about [scenes](/components/scene/) to help you set many entities at once to your liking
 - Setup a [notification platform](/components/#notifications) to sent yourself messages
 - For more advanced automation using Python, write your own [custom component](/developers/creating_components/).
 - Check out the [slides](http://events.linuxfoundation.org/sites/events/files/slides/OpenIoT%202016%20-%20Automating%20your%20Home%20with%20Home%20Assistant.pdf) from [OpenIoT 2016 summit](http://events.linuxfoundation.org/events/openiot-summit)

<p class='note warning'>
  Whenever you write the value <code>on</code> or <code>off</code>, surround it with quotes to avoid
  the YAML parser interpreting the values as booleans.
</p>
