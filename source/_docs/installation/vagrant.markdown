---
layout: page
title: "Installation on Vagrant"
description: "Instructions to run Home Assistant on a Vagrant VM."
date: 2016-05-28 10:00
sidebar: true
comments: false
sharing: true
footer: true
---

A `Vagrantfile` is available into `virtualization/vagrant` folder for quickly spinning up a Linux virtual machine running Home Assistant. This can be beneficial for those who want to experiment with Home Assistant and/or developers willing to easily test local changes and run test suite against them.

<p class='note'>
Vagrant is intended for testing/development only. It is NOT recommended for permanent installations.
</p>

## {% linkable_title Install Vagrant %}

You must have [Vagrant](https://www.vagrantup.com/downloads.html) and [Virtualbox](https://www.virtualbox.org/wiki/Downloads) installed on your workstation.

## {% linkable_title Get Home Assistant source code %}

Download the Home Assistant source code by either downloading the .zip file from [GitHub releases page](https://github.com/home-assistant/home-assistant/releases) or by using [Git](https://git-scm.com/)

```bash
$ git clone https://github.com/home-assistant/home-assistant.git
$ cd home-assistant/virtualization/vagrant
```

<p class='note'>
The following instructions will assume you changed your working directory to be `home-assistant/virtualization/vagrant`. This is mandatory because Vagrant will look for informations about the running VM inside that folder and won't work otherwise
</p>

<p class='note'>
When using Vagrant on Windows, change git's `auto.crlf` to input before cloning the Home Assistant repository. With input setting git won't automatically change line endings from Unix LF to Windows CRLF. Shell scripts executed during provision won't work with Windows line endings.
</p>

```bash
$ git config --global core.autocrlf input
```

## {% linkable_title Create the Vagrant VM and start Home Assistant %}

```bash
$ vagrant up
```

This will download and start a virtual machine using Virtualbox, which will internally setup the development environment necessary to start Home Assistant process and run test suite as well. After the VM has started successfully, the Home Assistant frontend will be accessible locally from your browser at [http://localhost:8123](http://localhost:8123)

## {% linkable_title Stopping Vagrant %}

To shutdown the Vagrant host:

```bash
$ vagrant halt
```

To start it again, just run `vagrant up`

## {% linkable_title Restarting Home Assistant process to test changes %}

The root `home-assistant` directory on your workstation will be mirrored with `/home-assistant` inside the VM. In `virtualization/vagrant` there's also a `config` folder that you can use to drop configuration files (Check the [Getting started section](https://home-assistant.io/getting-started/configuration/) for more information about how to configure Home Assistant).

Any changes made to the local directory on your workstation will be available from the Vagrant host, so to apply your changes to the Home Assistant process, just restart it:

```bash
$ touch restart ; vagrant provision
```

## {% linkable_title Run test suite (Tox) %}

To run tests against your changes:

```bash
$ touch run_tests ; vagrant provision
```

## {% linkable_title Cleanup %}

To completely remove the VM:

```bash
$ rm setup_done ; vagrant destroy -f
```

You can now recreate a completely new Vagrant host with `vagrant up`


### {% linkable_title Troubleshooting %}

If you run into any issues, please see [the troubleshooting page](/getting-started/troubleshooting/). It contains solutions to many of the more commonly encountered issues.

In addition to this site, check out these sources for additional help:

 - [Forum](https://community.home-assistant.io) for Home Assistant discussions and questions.
 - [Gitter Chat Room](https://gitter.im/home-assistant/home-assistant) for real-time chat about Home Assistant.
 - [GitHub Page](https://github.com/home-assistant/home-assistant/issues) for issue reporting.

### [Next step: Configuring Home Assistant &raquo;](/getting-started/configuration/)
