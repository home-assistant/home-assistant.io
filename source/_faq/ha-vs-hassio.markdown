---
title: "What is the difference between Home Assistant Operating System and Home Assistant Container?"
description: "Home Assistant Operating System is the recommended, all-in-one installation method. Home Assistant Container is for people who already run Docker on their own Linux system and want to manage it themselves."
ha_category: Installation
---

Home Assistant offers two installation methods: {% term "Home Assistant Operating System" %} and {% term "Home Assistant Container" %}. Both run the same Home Assistant software, so the choice is mostly about how much of the underlying system you want to manage yourself.

[Home Assistant Operating System](/installation/#about-installation-types) is the recommended installation method for almost everyone. It is an all-in-one solution that includes the operating system, Home Assistant itself, and a management user interface. It supports {% term apps %}, takes care of upgrading everything for you, and powers official hardware like [Home Assistant Green](/green/) and [Home Assistant Yellow](/yellow/).

[Home Assistant Container](/installation/alternative/) runs Home Assistant as a Docker container on a Linux system you provide and maintain yourself. It is intended for people who already run Docker and want to integrate Home Assistant with their existing setup. Home Assistant Container does not support apps, and you are responsible for updates and the host operating system.

You may still see references to "Home Assistant Core" or "Home Assistant Supervised" in older articles. These were earlier installation methods that are no longer offered or supported. Today's recommended path is Home Assistant Operating System.

Learn more:

- [About installation types](/installation/#about-installation-types)
- [Home Assistant Green](/green/)
- [Home Assistant Yellow](/yellow/)
