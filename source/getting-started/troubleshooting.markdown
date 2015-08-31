---
layout: page
title: "Troubleshooting installation problems"
description: "Common installation problems and their solutions."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

It can happen that you run into trouble while installing Home Assistant. This page is here to help
you figure out the most common problems.

**pip3: command not found**<br>
This utility should have been installed as part of the Python 3.4 installation. Check if Python 3.4
is installed by running `python3 --version`. If it is not installed,
[download it here](https://www.python.org/getit/).

If you are to succesfully run `python3 --version` but not `pip3`, run the following command instead
to install Home Assistant: `python3 -m pip install homeassistant`.

**No module named pip**<br>
[Pip](https://pip.pypa.io/en/stable/) should come bundled with the latest Python 3 but is ommitted
by some distributions. If you are unable to run `python3 -m pip --version` you can install `pip` by
[downloading the installer](https://bootstrap.pypa.io/get-pip.py) and run it with Python 3:
`python3 get-pip.py`.

**No access to the frontend**<br>
In newer Linux distributions (at least Fedora 22/CentOS 7) the access to a host are very limited.
This means that you can't access the Home Assistant Frontend that is running on a host in your
network. Check the Post-installation section on the [Getting started](/getting-started/) page and
follow the instruction that match your distribution to allow access to port 8123.

