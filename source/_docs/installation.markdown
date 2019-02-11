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
Beginners should check our [Getting started guide](/getting-started/) first.
</p>

Home Assistant provides multiple ways to be installed. The first start may take up to 20 minutes because the required packages will be downloaded and installed. The web interface will be served on `http://ip.add.re.ss:8123/` - replace `ip.add.re.ss` with the IP of the computer you installed it on.

<p class='note warning'>
  Please remember to [secure your installation](/docs/configuration/securing/) once you've finished with the installation process.
</p>

## {% linkable_title Recommended %}

These install options are fully supported by Home Assistant's documentation. For example, if a component requires that you install something to make it work on one of these methods then the component page will document the steps required.

**Method**|**You have**|**Recommended for**
:-----|:-----|:-----
[Hass.io](https://www.home-assistant.io/hassio/installation/)|Raspberry Pi<br>VM|Anybody
[Docker](https://www.home-assistant.io/docs/installation/docker/)|Docker|Anybody already running Docker
[Hassbian](https://www.home-assistant.io/docs/hassbian/installation/)|Raspberry Pi|Those who want a more traditional Linux experience and either have experience with Linux, or intend to learn

## {% linkable_title Alternative installs %}

If you use these install methods, we assume that you know how to manage and administer the operating system you're using. Due to the range of platforms on which these install methods can be used, component documentation may only tell you what you have to install, not how to install it.

**Method**|**You have**|**Recommended for**
:-----|:-----|:-----
[Virtualenv<BR>(as another user)](https://www.home-assistant.io/docs/installation/raspberry-pi/)|Any Linux, Python 3.5.3 or later|Those familiar with their operating system
[Virtualenv<BR>(as your user)](https://www.home-assistant.io/docs/installation/virtualenv/)|Any Python 3.5.3 or later|Developers

<HR>

## {% linkable_title Community provided guides %}

These guides are provided as-is. Some of these install methods are more limited than the methods above - some components may not work due to limitations of the platform or because required Python packages aren't available for that platform.

<div class="text-center hass-option-cards" markdown="0">
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
