---
layout: page
title: "Installation of Home Assistant"
description: "Instructions on how to install Home Assistant to launch on start."
date: 2017-02-15 08:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/installation/
---

<p class='note'>
Beginners should check our [Getting started guide](/getting-started/) first. This is for users that require advanced installations.
</p>

Home Assistant provides multiple ways to be installed. A requirement is that you have [Python 3.5.3 or later](https://www.python.org/downloads/) installed.

<p class='note warning'>
  Please remember to [secure your installation](/docs/configuration/securing/) once you've finished with the installation process.
</p>

## {% linkable_title Recommended options %}

<div class="text-center hass-option-cards" markdown="0">
  <a class='option-card' href='/getting-started/'>
    <div class='img-container'>
      <img src='/images/supported_brands/home-assistant.png' />
    </div>
    <div class='title'>Hass.io<br>(Beginner friendly)</div>
  </a>
  <a class='option-card' href='/docs/hassbian/installation/'>
    <div class='img-container'>
      <img src='/images/supported_brands/home-assistant.png' />
    </div>
    <div class='title'>Hassbian (for the Raspberry Pi)</div>
  </a>
  <a class='option-card' href='/docs/installation/docker/'>
    <div class='img-container'>
      <img src='/images/supported_brands/docker.png' />
    </div>
    <div class='title'>Docker</div>
  </a>
</div>

## {% linkable_title Alternative installs %}

The following installs are only recommended for experienced users of those platforms.

<div class="text-center hass-option-cards" markdown="0">
  <a class='option-card' href='/docs/installation/raspberry-pi/'>
    <div class='img-container'>
      <img src='/images/supported_brands/raspberry-pi.png' />
    </div>
    <div class='title'>Raspbian (but applies to any Debian based Linux)</div>
  </a>
  <a class='option-card' href='/docs/installation/virtualenv/'>
    <div class='img-container'>
      <img src='/images/supported_brands/python.svg' />
    </div>
    <div class='title'>On top of an existing Python 3.5.3+ installation</div>
  </a>
  <a class='option-card' href='/docs/installation/armbian/'>
    <div class='img-container'>
      <img src='/images/supported_brands/armbian.png' />
    </div>
    <div class='title'>armbian</div>
  </a>
  <a class='option-card' href='/docs/installation/archlinux/'>
    <div class='img-container'>
      <img src='/images/supported_brands/archlinux.png' />
    </div>
    <div class='title'>ArchLinux</div>
  </a>
  <a class='option-card' href='/docs/installation/fedora/'>
    <div class='img-container'>
      <img src='/images/supported_brands/fedora.png' />
    </div>
    <div class='title'>Fedora</div>
  </a>
  <a class='option-card' href='/docs/installation/centos/'>
    <div class='img-container'>
      <img src='/images/supported_brands/centos.png' />
    </div>
    <div class='title'>CentOS/RHEL</div>
  </a>
  <a class='option-card' href='/docs/installation/windows/'>
    <div class='img-container'>
      <img src='/images/supported_brands/windows.png' />
    </div>
    <div class='title'>Windows</div>
  </a>
  <a class='option-card' href='/docs/installation/macos/'>
    <div class='img-container'>
      <img src='/images/supported_brands/apple.png' />
    </div>
    <div class='title'>macOS</div>
  </a>
  <a class='option-card' href='/docs/installation/synology/'>
    <div class='img-container'>
      <img src='/images/supported_brands/synology.png' />
    </div>
    <div class='title'>Synology</div>
  </a>
  <a class='option-card' href='/docs/installation/vagrant/'>
    <div class='img-container'>
      <img src='/images/supported_brands/vagrant.png' />
    </div>
    <div class='title'>Vagrant</div>
  </a>
  <a class='option-card' href='/docs/installation/freenas/'>
    <div class='img-container'>
      <img src='/images/supported_brands/freenas.png' />
    </div>
    <div class='title'>FreeNAS</div>
  </a>
</div>

## {% linkable_title After installation %}

Once Home Assistant is installed, execute the following code in a console/terminal to check if the setup was successful:

```bash
$ hass
```

The first start may take up to 20 minutes because the needed packages will be downloaded and installed. The web interface will be served on [http://localhost:8123](http://localhost:8123).

For more details about `hass`, please refer to the [tools section](/docs/tools/hass/).

If you're running a Linux-based platform, we suggest you follow the [VirtualEnv instructions](/docs/installation/virtualenv/) to avoid using `root`.

You may need to install additional libraries depending on the platforms/components you want to use.

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



| Installation method                           | Access to OS | Hass.io Add-Ons |
|:----------------------------------------------|:------------:|:--------------------------:|
| Hass.io on HassOS                             |      no      |            yes             |
| Hass.io on generic Linux server               |     yes      |            yes             |
| Hassbian                                      |     yes      |            no             |
| Home Assistant with Docker                    |     yes      |             no             |
| Home Assistant on Vagrant                     |     yes      |             no             |
| Home Assistant on different operating Systems |     yes      |             no             |


### Hass.io on HassOS

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/hassio_on_hassos.svg' />
    </div>
</div>

This is a full appliance for running Home Assistant on your hardware using docker images running on HassOS.
Home Assistant is running as a docker container as well as add-ons.
You can add additional functionality through add-ons which are just preconfigured docker images to run with Home Assistant.

You will get:
- Access to the add-ons from the core team.
- Access to the add-ons from the community.
- You can use any other Add-Ons
- To possibility to build your own add-ons.
- HassOS will run on the underlying hardware.
- Automatic updates of the operating system (OTA).
  
### Hass.io on generic Linux server

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/hassio_on_generic_linux_server.svg' />
    </div>
</div>

It is almost the same like Hass.io on HassOS but you do run Hass.io on your own operating system of choice instead of HassOS.

You will get:
- full Home Assistant
- Hass.io Add-Ons (some may not work properly)
- Add-Ons from the core team
- Add-Ons from the community
- Third party Add-Ons
- Availabilty to build your own Add-Ons (docker knowledge needed)
- Hass.io Gui
- full control and responsibilty for your operating system

### Hassbian

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/home_assistant_with_hassbian.svg' />
    </div>
</div>

Easy setup through an image which contains the operating system and automatic Home Assistant installation.
Hassbian is based on Rasbian.

It is like any other linux distribution where you can install software via packages.

You will get:
- full Home Assistant
- full control and responsibilty for your operating system
- adding functionlaty will need installation and configuration (no docker knowledge needed)
- no Hass.io Add-Ons
- no Hass.io GUI

### Home Assistant with Docker

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/home_assistant_with_docker.svg' />
    </div>
</div>

You are installaing the Home Assistant docker container on a existing linux server.

You will get:
- full Home Assistant
- full control and responsibilty for your operating system
- adding functionalty will need installation and configuration (with or without docker)
- no Hass.io Add-Ons
- no Hass.io GUI

### Home Assistant on different operating Systems

<div class="text-center" markdown="0">
    <div class='img-container'>
      <img src='/images/docs/architecture/homeassistant_on_generic_linux_server.svg' />
    </div>
</div>

You install Home Assistant as any software on your operating system of your choice.
If you want to have extra functionality you add more software and configure it by yourself.

What you will get:
- full control and responsibilty for your operating system
- adding functionlaty will need installation and configuration (no docker knowledge needed)
- no Hass.io Add-Ons
- no Hass.io GUI
- setup everything by yourself
