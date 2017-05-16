---
layout: page
title: "Installation on FreeNAS 9.10"
description: "Installation of Home Assistant on your FreeNAS."
date: 2017-04-06 17:00
sidebar: true
comments: false
sharing: true
footer: true
---

[Freenas](http://www.freenas.org) is a free and open-source network-attached storage (NAS) software based on FreeBSD and the OpenZFS file system. It is licensed under the terms of the BSD License and runs on commodity x86-64 hardware. 

This has been tested on the FreeNAS 9.10. These instructions assume you already have a running and accessible jail. For more information on creating a jail follow the official FreeNAS 9.10.x documentation [HERE](https://doc.freenas.org/9.10/jails.html#adding-jails). Once you have the jail follow the steps below.

Install the necessary Python Packages.

```bash
# pkg update
# pkg upgrade
# pkg install python35
# pkg install py35-sqlite3
# python3.5 -m ensurepip
```

Install Home Assistant itself.

```bash
# pip3 install homeassistant
```

Finally start Home Assistant.

```bash
# hass --open-ui
```

Some suggestions on using a tmux to keep it running can be found in the FreeNAS forums [HERE](https://forums.freenas.org/index.php?threads/how-to-home-assistant-in-a-jail-tested-on-9-10.50371/)
