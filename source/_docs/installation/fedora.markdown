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
$ sudo dnf -y install python3-devel
```

and Home Assistant itself.

```bash
$ pip3 install homeassistant
```

