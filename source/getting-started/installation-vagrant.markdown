---
layout: page
title: "Installation on Vagrant"
description: "Instructions to install Home Assistant on a Vagrant VM."
date: 2016-04-19 21:28
sidebar: true
comments: false
sharing: true
footer: true
---

A Vagrantfile is provided for quickly spinning up an ubuntu vm running home-assistant.
This can be beneficial for those who want to experiment with home-assistant and/or developers.


 ## Starting vagrant

 You must have [vagrant](https://www.vagrantup.com/downloads.html) and [virtualbox](https://www.virtualbox.org/wiki/Downloads) installed.

<p class='note'>
Vagrant is intended for testing/development only. It is NOT recommended for permanent installations.
</p>

Download the home-assistant source code by either downloading the .zip file from [github releases page](https://github.com/home-assistant/home-assistant/releases), or by using [git](https://git-scm.com/)

    git clone https://github.com/home-assistant/home-assistant.git
    vagrant up

This will launch an Ubuntu 14.04 VM using Virtualbox. Home-Assistant will then be available at localhost:8123

http://localhost:8123

## Stopping vagrant

To shutdown and remove the VM, run:

    vagrant destroy

## Restarting home-assistant

The home-assistant directory on your workstation will be mirrored with `/vagrant` in the vm. Any changes made to the local directory on your workstation, will instantly appear inside the ubuntu vm

Developers will likely want to stop and restart home-assistant to register your changes.

<p class='note'>
Windows users will additionally need [putty](http://www.putty.org/) installed. For more information, see [this documentation](https://github.com/Varying-Vagrant-Vagrants/VVV/wiki/Connect-to-Your-Vagrant-Virtual-Machine-with-PuTTY)
</p>

    vagrant ssh

Once you have established a remote session to the vm, run the following:

    cd /vagrant
    sudo pkill python3
    python3 -m homeassistant -c /vagrant/config --daemon

To see additional logs printed to stdout, start without the `--daemon` option

    python3 -m homeassistant -c /vagrant/config



### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
