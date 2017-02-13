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

When all your devices are set up, it's time to put the cherry on the pie: automation. Home Assistant offers [a few built-in automations](/components/#automation) – but you'll be using the automation component to set up your own rules, for the most part.

Home Assistant offers a wide range of automation configurations. In the next few pages, we'll try to guide you through all the different possibilities and options. Besides this documentation, there are also a couple of people who have made their automations [publicly available][cookbook-config].

[cookbook-config]: /cookbook/#example-configurationyaml

### {% linkable_title Automation basics %}

Before you can go ahead and create your own automations, it's important to learn the basics. To explore these, let's have a look at the following example home automation rule:

```text
(trigger)    When Paulus arrives home
(condition)  and it is after sunset:
(action)     Turn the lights in the living room on
```

The example consists of three different parts: a trigger, a condition and an action.

The first line is the **trigger** of the automation rule. Triggers describe events that should trigger the automation rule. In this case, it is a person arriving home, which can be observed in Home Assistant by observing the state of Paulus changing from 'not_home' to 'home'.

The second line is the **condition**. Conditions are optional tests that can limit an automation rule to only work in your specific use cases. A condition will test against the current state of the system. This includes the current time, devices, people and other things like the sun. In this case, we only want to act when the sun has set.

The third part is the **action**, which will be performed when a rule is triggered and all conditions are met. For example, it can turn a light on, set the temperature on your thermostat or activate a scene.

<p class='note'>
The difference between a condition and a trigger can be confusing as they are very similar. Triggers look at the actions, while conditions look at the results: turning a light on versus a light being on.
</p>

### {% linkable_title Exploring the internal state %}

Automation rules interact directly with the internal state of Home Assistant, so you'll need to familiarize yourself with it. Home Assistant exposes its current state via the developer tools. These are available at the bottom of the sidebar in the frontend. The <img src='/images/screenshots/developer-tool-states-icon.png' class='no-shadow' height='38' /> icon will show all currently available states. An entity can be anything. A light, a switch, a person and even the sun. A state consists of the following parts:

| Name | Description | Example |
| ---- | ----- | ---- |
| Entity ID | Unique identifier for the entity. | `light.kitchen`
| State | The current state of the device. | `home`
| Attributes | Extra data related to the device and/or current state. | `brightness`

State changes can be used as the source of triggers and the current state can be used in conditions.

Actions are all about calling services. To explore the available services open the <img src='/images/screenshots/developer-tool-services-icon.png' class='no-shadow' height='38' /> Services developer tool. Services allow to change anything. For example turn on a light, run a script or enable a scene. Each service has a domain and a name. For example the service `light.turn_on` is capable of turning on any light in your system. Services can be passed parameters to for example tell which device to turn on or what color to use.

### [Next step: Your First Automation &raquo;](/getting-started/automation-create-first/)
