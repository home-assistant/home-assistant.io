---
layout: page
title: "Installation on FreeNAS 9.10"
description: "Installation of Home Assistant on your FreeNAS."
date: 2017-06-20 11:00
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

Create an `/etc/rc.local` file to enable Home Assistant to start when the jail starts. The command in `/etc/rc.local` can also be run in a terminal session but Home Assistant will exit when that session is closed.  


```bash
# cd / && mkdir -p /home/.homeassistant
```

```bash
# /usr/local/bin/hass --open-ui --config /home/.homeassistant/ &
```

Make `/etc/rc.local` executable so it runs on startup

```bash
# chmod 755 /etc/rc.local
```

Finally restart the jail from the Freenas GUI.

<p class='note'>
USB Z-wave sticks may give `dmesg` warnings similar to "data interface 1, has no CM over data, has no break".  This doesn't impact the function of the Z-wave stick in Hass. Just make sure the proper `/dev/cu*` is used in the Home Assistant `configuration.yaml` file.  
</p>
