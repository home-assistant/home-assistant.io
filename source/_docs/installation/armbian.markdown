---
layout: page
title: "Installation on a Armbian system"
description: "Instructions to install Home Assistant on an Armbian-powered systems."
date: 2017-02-23 11:00
sidebar: true
comments: false
sharing: true
footer: true
---

[armbian](https://www.armbian.com) runs on a wide-variety of [ARM development boards](https://www.armbian.com/download/). Currently there are around 50 boards supported inclusive the OrangePi family, Cubieboard, Pine64, and Odroid.

Setup Python and `pip`

```bash
$ sudo apt-get update
$ sudo apt-get install python3-dev python3-pip
```

Install Home Assistant.

```bash
$ pip3 install homeassistant
```
