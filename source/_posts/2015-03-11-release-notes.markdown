---
title: "Release notes for March 11, 2015"
description: "The release notes for March 11, 2015"
date: 2015-03-11 18:36 0000
date_formatted: "March 11, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

It has only been a little over a week since Theodor introduced YAML support for Home Assistant but so much has already happened that it is time for a summary of recent changes. Before mentioning the highlights I want to thank [andythigpen](https://github.com/andythigpen), [jamespcole](https://github.com/jamespcole) and [theolind](https://github.com/theolind) for numerous bug fixes, enhancements and new contributions. Thanks!

__Monitor local resources.__<br>
Theodor has contributed a new sensor platform to allow you to monitor disk usage, memory usage, CPU usage and running processes. This platform has superseded the process component which is now considered deprecated.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: systemmonitor
    resources:
      - type: disk_use_percent
        arg: /home
      - type: memory_free
      - type: process
        arg: kodi
```

__Experimental Z-Wave support__<br>
There is now experimental support for connecting Z-Wave networks using a Z-Wave USB stick. Right now it only integrates Z-Wave sensors into Home Assistant. Our goal is to get this tested by more people before adding support for other Z-Wave devices.

The new component is built on top of [python-openzwave](https://code.google.com/p/python-openzwave/). This package is currently not distributed on PyPi so we've added a script `scripts/build_python_openzwave` to install it on your machine. Alternatively you can use the Docker image which is ready to go.

The development was done using an AEON Z-Wave USB stick and an AEON Z-Wave MultiSensor.

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyUSB0
```

__Voice control__<br>
An initial version of voice control for Home Assistant has landed. The current implementation consists of two parts.

The first part is a component called `conversation` that exposes the service `conversation/process`. This service is capable of processing text and translating them into commands for devices. For now it will only support commands in the format of `Turn <Friendly Name> <on/off>`.

The second part is an upgrade to the frontend to use the speech-to-text in Chrome to allow users to speak commands. If you're using Chrome, you can test this out in [the demo](/demo/).

```yaml
# Example configuration.yaml entry
conversation:
```
