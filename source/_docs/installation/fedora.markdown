---
layout: page
title: "Installation on Fedora"
description: "Installation of Home Assistant on your Fedora computer."
date: 2017-03-01 07:00
sidebar: true
comments: false
sharing: true
footer: true
---

[Fedora](https://fedoraproject.org) is an operating system based on the Linux kernel, developed by the community-supported Fedora Project. There are releases for x86 and x86_64 including ARM and other architectures. 

Install the development package of Python.

```bash
$ sudo dnf -y install python3-devel redhat-rpm-config
```

and Home Assistant itself.

```bash
$ pip3 install homeassistant
```

To isolate the Home Assistant installation a [venv](https://docs.python.org/3/library/venv.html) is handy. First create a new directory to store the installation and adjust the permissions.

```bash
$ sudo mkdir -p /opt/homeassistant
$ sudo chown -R user:group /opt/homeassistant
```
Now switch to the new directory, setup the venv, and activate it.

```bash
$ cd /opt/homeassistant
$ python3.6 -m venv .
$ source bin/activate
```

Install Home Assistant itself.

```bash
$ pip3 install homeassistant colorlog
```

Check the [autostart](/docs/autostart/systemd/) section in the documentation for further details and the [Firewall section](/docs/installation/troubleshooting/#no-access-to-the-frontend) if you want to access your Home Assistant installation.
