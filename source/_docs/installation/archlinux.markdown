---
layout: page
title: "Installation on Arch Linux"
description: "Installation of Home Assistant on your Arch Linux computer."
date: 2017-03-01 07:00
sidebar: true
comments: false
sharing: true
footer: true
---

[Arch Linux](https://www.archlinux.org/) is a lightweight and flexible Linux distribution. There are official packages optimized for the i686 and x86-64 architectures available.

Install the needed Python packages.

```bash
$ sudo pacman -S python
$ sudo pacman -S python-pip
```

and Home Assistant itself.

```bash
$ pip3 install homeassistant
```

Home Assistant is part of the [AUR](https://aur.archlinux.org/packages/home-assistant/). This means that it can be installed  with `pacaur`:

```bash
$ pacaur -S home-assistant
```
