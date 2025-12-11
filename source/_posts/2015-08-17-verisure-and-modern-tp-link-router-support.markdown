---
title: "Verisure devices and modern TP-Link routers now supported"
description: "New support for Verisure switches, sensors and hygrometers and modern TP-Link routers"
date: 2015-08-17 20:00 0000
date_formatted: "August 17, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

A minor bug fix release to fix some issues that have come up since the last release. Please upgrade as soon as possible by running `git pull` from the Home Assistant directory.

This release is a major milestone in our test coverage as we've crossed into the 80s! It has to be noted that this covers mainly the core and automation components. Platforms that communicate with IoT devices have been excluded.

As we didn't want to just push out bug fixes, this release includes a few additions:

 - Support for modern TP-Link routers like the ArcherC9 line has been contributed by [@chrisvis](https://github.com/chrisvis).
 - Improved support for MQTT topic subscriptions has been contributed by [@qrtn](https://github.com/qrtn)

__Verisure Support__
<img src='/images/supported_brands/verisure.png' style='border:none; box-shadow: none; float: right;' height='50' /> Home Assistant support to integrate your [Verisure](https://www.verisure.com/) alarms, hygrometers, sensors and thermometers has been contributed by [@persandstrom](https://github.com/persandstrom).

```yaml
# Example configuration.yaml entry
verisure:
  username: user@example.com
  password: password
  alarm: 1
  hygrometers: 0
  smartplugs: 1
  thermometers: 0
```
