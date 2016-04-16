---
layout: page
title: "Architecture"
description: "Overview of the Home Assistant architecture."
date: 2014-12-18 21:49
sidebar: true
comments: false
sharing: true
footer: true
---

Before we dive into the Home Assistant architecture, it is important to get a clear overview of the home automation landscape as a whole. This will allow us to show how the different parts of Home Assistant fit in the picture. For a more lengthy discussion about what each part in this overview is responsible for, <a href='/blog/2014/12/26/home-control-home-automation-and-the-smart-home/'>check out our blog</a>. A tl;dr version of the blog:

 * Home Control is responsible for collecting information on- and controlling devices.
 * Home Automation triggers commands based on user configurations.
 * Smart Home triggers commands based on previous behavior.

<p class='img'>
  <a href='{{site_root}}/images/architecture/home_automation_landscape.png' name='landscape'>
    <img alt='Home Automation landscape'
         src='{{site_root}}/images/architecture/home_automation_landscape.png' />
  </a>
  Overview of the home automation landscape.
</p>

The Home Assistant core is responsible for Home Control. It has four parts to make this possible:

 * The **Event Bus** facilitates the firing and listening of events. This is the beating heart of Home Assistant.
 * The **State Machine** keeps track of the states of things. Fires a `state_changed` event when a state has been changed.
 * The **Service Registry** listens on the event bus for `call_service` events and allows other code to register services.
 * The **Timer** will send a `time_changed` event every 1 second on the event bus.

<p class='img'>
  <a href='/images/architecture/ha_architecture.png' name='architecture'>
    <img src='/images/architecture/ha_architecture.png' />
  </a>
  Overview of the Home Assistant core architecture
</p>
