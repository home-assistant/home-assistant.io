---
title: "Hass.io via the Command line"
description: "Command line utility to control Hass.io."
---

<p class='img'>
<img src='/images/hassio/screenshots/ssh-upgrade.png'>
Hass.io upgrade process from the SSH command line
</p>

On the SSH command line, you can use the `hassio` command to retrieve logs, check the details of connected hardware, and more.

## Home Assistant

```bash
hassio homeassistant check
hassio homeassistant info
hassio homeassistant logs
hassio homeassistant options
hassio homeassistant rebuild
hassio homeassistant restart
hassio homeassistant start
hassio homeassistant stats
hassio homeassistant stop
hassio homeassistant update
```

## Supervisor

```bash
hassio supervisor info
hassio supervisor logs
hassio supervisor reload
hassio supervisor update
```

## Host

```bash
hassio host reboot
hassio host shutdown
hassio host update
```

## Hardware

```bash
hassio hardware info
hassio hardware audio
```

## Usage examples

To update Home Assistant to a specific version, use the command:
```bash
hassio homeassistant update --version=x.y.z
```
Replace x.y.z with the desired version like `--version=0.74.2`

You can get a better description of the CLI capabilities by typing `hassio help`:

```bash
Usage:
  hassio [command]

Available Commands:
  addons        Install, update, remove and configure Hass.io add-ons
  dns           Get information, update or configure the Hass.io DNS server
  hardware      Provides hardware information about your system
  hassos        HassOS specific for updating, info and configuration imports
  help          Help about any command
  homeassistant Provides control of Home Assistant running on Hass.io
  host          Control the host/system that Hass.io is running on
  info          Provides a general Hass.io information overview
  snapshots     Create, restore and remove snapshot backups
  supervisor    Monitor, control and configure the Hass.io Supervisor

Flags:
      --api-token string   Hass.io API token
      --config string      Optional config file (default is $HOME/.homeassistant.yaml)
      --endpoint string    Endpoint for Hass.io Supervisor ( default is 'hassio' )
  -h, --help               help for hassio
      --log-level string   Log level (defaults to Warn)
      --no-progress        Disable the progress spinner
      --raw-json           Output raw JSON from the API

Use "hassio [command] --help" for more information about a command.

```

## Console access

You can also access HassOS via a directly connected keyboard and monitor, the console. To log in to the physical console the username is `root`, with no password.
