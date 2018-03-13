---
layout: page
title: "Installation on CentOS/RHEL"
description: "Installation of Home Assistant on your CentOS/RHEL computer."
date: 2017-03-01 07:00
sidebar: true
comments: false
sharing: true
footer: true
---

To run Python 3.x on [CentOS](https://www.centos.org/) or RHEL (Red Hat Enterprise Linux), [Software Collections](https://www.softwarecollections.org/en/scls/rhscl/rh-python36/) needs to be activated first.

You must install Python 3.5.3 or later. Software Collections version of Python 3.5 is 3.5.1 so this guide uses Python 3.6.

### {% linkable_title Using Software Collections %}

First of all install the software collection repository as root. For example, on CentOS:

```bash
$ yum install centos-release-scl
```

Then install the Python 3.6 package:

```bash
$ yum install rh-python36
```

Once installed, switch to your `homeassistant` user (if you've set one up), enable the software collection and check that it has set up the new version of Python:

```bash
$ scl enable rh-python36 bash
$ python --version
Python 3.6.3
```

You will be in a command shell set up with Python 3.6 as your default version. The virtualenv and pip commands will be correct for this version, so you can now create a virtual environment and install Home Assistant following the main [instructions](https://home-assistant.io/docs/installation/virtualenv/#step-4-set-up-the-virtualenv).

You will need to enable the software collection each time you log on before you activate your virtual environment.

### {% linkable_title Systemd with Software Collections %}

To autostart Home Assistant using systemd follow the main [instructions](https://home-assistant.io/docs/autostart/systemd/) and adjust the template as follows:

```
[Unit]
Description=Home Assistant
After=network.target

[Service]
Type=simple
User=homeassistant
# Make sure the virtualenv Python binary is used
Environment=VIRTUAL_ENV="/srv/homeassistant"
Environment=PATH="$VIRTUAL_ENV/bin:$PATH"
# ExecStart using software collection:
ExecStart=/usr/bin/scl enable rh-python35 -- /srv/homeassistant/bin/hass -c "/home/homeassistant/.homeassistant"

[Install]
WantedBy=multi-user.target
```
