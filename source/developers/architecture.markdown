---
layout: page
title: "Architecture"
description: "Overview of the Home Assistant architecture."
date: 2014-12-18 21:49
sidebar: true
comments: false
sharing: true
footer: true
og_image: /images/architecture/ha_architecture.svg
---

Before we dive into the Home Assistant architecture, let's get a clear overview of the home automation landscape as a whole. This way, we can show how the different parts of Home Assistant fit into the picture.

For more information about each part in this overview, <a href='/blog/2014/12/26/home-control-home-automation-and-the-smart-home/'>check out our blog</a>. Here's the tl;dr version of the blog:

 * Home Control is responsible for collecting information and controlling devices.
 * Home Automation triggers commands based on user configurations.
 * Smart Home triggers commands based on previous behavior.

<p class='img'>
  <a href='{{site_root}}/images/architecture/home_automation_landscape.svg' name='landscape'>
    <img alt='Home Automation landscape'
         src='{{site_root}}/images/architecture/home_automation_landscape.svg' />
  </a>
  Overview of the home automation landscape
</p>

The Home Assistant core is responsible for Home Control. Home Assistant contains four parts which make this possible:

 * **Event Bus**: facilitates the firing and listening of events -- the beating heart of Home Assistant.
 * **State Machine**: keeps track of the states of things and fires a `state_changed` event when a state has been changed.
 * **Service Registry**: listens on the event bus for `call_service` events and allows other code to register services.
 * **Timer**: sends a `time_changed` event every 1 second on the event bus.

<p class='img'>
  <a href='/images/architecture/ha_architecture.svg' name='architecture'>
    <img src='/images/architecture/ha_architecture.svg' />
  </a>
  Overview of the Home Assistant core architecture
</p>
