---
layout: page
title: "Configuring Home Assistant"
description: "Configuring Home Assistant."
date: 2015-03-23 12:50
sidebar: true
comments: false
sharing: true
footer: true
---

Home Assistant will create a configuration folder when it is run for the first time. The location of the folder differs between operating systems: on OS X and Linux it's `~/.homeassistant` and on Windows it's `%APPDATA%/.homeassistant`. If you want to use a different folder for configuration, run `hass --config path/to/config`.

Inside your configuration folder is the file `configuration.yaml`. This is the main file that contains which components will be loaded and what their configuration is. This file contains YAML code, which is explained briefly below. [An example configuration file is located here](https://github.com/home-assistant/home-assistant/blob/master/config/configuration.yaml.example).

When launched for the first time, Home Assistant will write a default configuration file enabling the web interface and device discovery. It can take up to a minute for your devices to be discovered and show up in the user interface.

If you run into trouble while configuring Home Assistant, have a look at [the configuration troubleshooting page](/getting-started/troubleshooting-configuration/).

<p class='note tip'>
  Install colorlog (`$ pip install colorlog`) to make the console output easier to read, hence also easier to catch errors and warnings.
</p>

<p class='note'>
  You will have to restart Home Assistant each time you make changes in `configuration.yaml` in order for these to take effect.
</p>

### [Next step: Get familiar with YAML &raquo;](/getting-started/yaml/)
