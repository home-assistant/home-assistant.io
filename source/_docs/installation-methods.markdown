---
layout: page
title: "Installation methods for Home Assistant"
description: "Which version to choose and why"
date: 2017-02-15 08:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation/
---


## {% linkable_title Characteristics of different install methods for Home Assistant %}

You always get the full Home Assistant experience despite the installation method you choose to use.
How you would like to run Home Assistant is a choice of taste, the setup you already have, knowledge and what you want to accomplish with Home Assistant.

<p class='note'>
Add-ons provide an easy way to add more functionality to your setup through the GUI.
Add-ons in Hass.io are essentially just docker containers containing some software.
They are configured to for Home Assistant for easy setup.
You always can add the functionality provided by an add-on by yourself if you are **not** running Hass.io.
You just have to configure it by yourself accordingly to your setup.
</p>

| Installation method                           | Access to OS | Hass.io Add-ons |
|:----------------------------------------------|:------------:|:---------------:|
| Hass.io on HassOS                             |      no      |       yes       |
| Hass.io on generic Linux server               |     yes      |       yes       |
| Hassbian                                      |     yes      |       no        |
| Home Assistant with Docker                    |     yes      |       no        |
| Home Assistant on Vagrant                     |     yes      |       no        |
| Home Assistant on different operating Systems |     yes      |       no        |


### Hass.io on HassOS
<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/hassio_on_hassos.svg' />
    </div>
</div>

This is a full appliance for running Home Assistant on your hardware using docker images running on HassOS.
Home Assistant is running as a docker container as well as add-ons.
You can add additional functionality through add-ons which are just preconfigured docker images to run with Home Assistant.
You do not need to know docker when you only want to use the add-ons by the core team and the community.

You will get:
- Access to the add-ons from the core team.
- Access to the add-ons from the community.
- The possibility to build your own add-ons.
- [HassOS](https://github.com/home-assistant/hassos) will run on the underlying hardware.
- Automatic updates of the operating system (OTA).
  
### Hass.io on generic Linux server

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/hassio_on_generic_linux_server.svg' />
    </div>
</div>

It is almost the same like Hass.io on HassOS but you do run Hass.io on your own operating system of choice instead of HassOS.
You need to learn or know about docker.

You will get:
- Access to the add-ons from the core team.
- Access to the add-ons from the community.
- The possibility to build your own add-ons.
- Full control and responsibilty of the operating system without automatic updates.

### Hassbian

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/home_assistant_with_hassbian.svg' />
    </div>
</div>

Easy setup through an image which contains the operating system and automatic Home Assistant installation.
Hassbian is based on Rasbian.
You do not need to know docker.

It is like any other linux distribution where you can install software via packages.

You will get:
- No access to the add-ons from the core team.
- No access to the add-ons from the community.
- Adding functionlaty will need installation and configuration on the operation system.
- Full control and responsibilty of the operating system without automatic updates.

### Home Assistant with Docker

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/home_assistant_with_docker.svg' />
    </div>
</div>

You are installaing the Home Assistant docker container on a existing linux server.
You need to learn or know about docker.

You will get:
- No access to the add-ons from the core team.
- No access to the add-ons from the community.
- Adding functionalty will need installation and configuration on the operation system.
- Full control and responsibilty of the operating system without automatic updates.

### Home Assistant on different operating Systems

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/homeassistant_on_generic_linux_server.svg' />
    </div>
</div>

You install Home Assistant as any software on your operating system of your choice.
If you want to have extra functionality you add more software and configure it by yourself.
You do not need to know docker.

What you will get:
- No access to the add-ons from the core team.
- No access to the add-ons from the community.
- Adding functionalty will need installation and configuration on the operation system.
- Full control and responsibilty of the operating system without automatic updates.
