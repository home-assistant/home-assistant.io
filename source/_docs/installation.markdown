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

<div class="text-center hass-option-cards" markdown="0">
  <a class='option-card' href='/getting-started/'>
    <div class='img-container'>
      <img src='/images/supported_brands/home-assistant.png' />
    </div>
    <div class='title'>Hass.io<br>(Beginner friendly)</div>
  </a>
  <a class='option-card' href='/docs/installation/virtualenv/'>
    <div class='img-container'>
      <img src='/images/supported_brands/python.svg' />
    </div>
    <div class='title'>On top of an existing Python 3.5+ installation</div>
  </a>
  <a class='option-card' href='/docs/hassbian/installation/'>
    <div class='img-container'>
      <img src='/images/supported_brands/home-assistant.png' />
    </div>
    <div class='title'>Hassbian</div>
  </a>
  <a class='option-card' href='/docs/installation/raspberry-pi/'>
    <div class='img-container'>
      <img src='/images/supported_brands/raspberry-pi.png' />
    </div>
    <div class='title'>Raspbian</div>
  </a>
  <a class='option-card' href='/docs/installation/archlinux/'>
    <div class='img-container'>
      <img src='/images/supported_brands/archlinux.png' />
    </div>
    <div class='title'>ArchLinux</div>
  </a>
  <a class='option-card' href='/docs/installation/armbian/'>
    <div class='img-container'>
      <img src='/images/supported_brands/armbian.png' />
    </div>
    <div class='title'>armbian</div>
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
  <a class='option-card' href='/docs/installation/docker/'>
    <div class='img-container'>
      <img src='/images/supported_brands/docker.png' />
    </div>
    <div class='title'>Docker</div>
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

Once Home Assistant is installed, execute the following code in a console/terminal to check if the setup was successful:

```bash
$ hass
```

The first start may take a minute or two because the needed packages will be downloaded and installed. The web interface will be served on [http://localhost:8123](http://localhost:8123).

For more details about `hass`, please refer to the [tools section](/docs/tools/hass/).

If you're running a Linux-based platform, we suggest you follow the [VirtualEnv instructions](/docs/installation/virtualenv/) to avoid using `root`.

You may need to install additional libraries depending on the platforms/components you want to use.

