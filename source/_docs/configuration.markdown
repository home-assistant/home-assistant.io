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

When launched for the first time, Home Assistant will write a default configuration file enabling the web interface and device discovery. It can take up to a minute for your devices to be discovered and appear in the user interface.

The web interface can be found at `http://ip.ad.dre.ss:8123/` - for example if your Home Assistant system has the IP address `192.168.0.40` then you'll find the web interface as `http://1921.68.0.40:8123/`.

The location of the folder differs between operating systems:

| OS | Path |
| -- | ---- |
| macOS | `~/.homeassistant` |
| Linux | `~/.homeassistant` |
| Windows | `%APPDATA%/.homeassistant` |

If you want to use a different folder for configuration, use the config command line parameter: `hass --config path/to/config`.

Inside your configuration folder is the file `configuration.yaml`. This is the main file that contains components to be loaded with their configurations. Throughout the documentation you will find snippets that you can add to your configuration file to enable functionality.

<p class='note'>
  You will have to restart Home Assistant for changes to `configuration.yaml` to take effect.
</p>

If you run into trouble while configuring Home Assistant, have a look at the [configuration troubleshooting page](/getting-started/troubleshooting-configuration/) and at the [configuration.yaml examples](/cookbook/#example-configurationyaml).

<p class='note tip'>
  Test any changes to your configuration files from the command line with `hass --script check_config`. This script allows you to test changes without the need to restart Home Assistant.
</p>

