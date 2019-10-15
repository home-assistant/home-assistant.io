---
title: "Home Assistant vs. Hass.io vs. HassOS"
description: "Home Assistant vs. Hass.io vs. HassOS"
ha_category: Installation
---

Home Assistant is a Python program and is run via various [Installation Methods](https://www.home-assistant.io/docs/installation/).  The home assistant Python program is the core of the Home Assistant project that is used to observe, control and automate the devices in your home.  

[Hass.io](https://www.home-assistant.io/hassio/) is a Docker-based system for managing your Home Assistant installation and related applications. Hass.io is an all-in one-solution and has a management user interface that can be used from the Home Assistant frontend. This interface is not present in a standalone setup of Home Assistant. Hass.io can also utilize [Add-ons](https://www.home-assistant.io/addons/) to extend the functionality around Home Assistant. Hass.io can be [installed on compatiable linux distribution](https://www.home-assistant.io/hassio/installation/#alternative-install-on-a-generic-linux-host) running docker or is part of the HassOS installation method.  

[HassOS](https://github.com/home-assistant/hassos) is a Operating System specifcally deisgned to run Hass.io.  The whole system is optimized for the embedded system, security and allows for seamless updates of the underlying Operating System and Hass.io.  

Be aware that add-ons are only available in Hass.io, due to the way Hass.io is installed.
