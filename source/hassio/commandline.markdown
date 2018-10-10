---
layout: page
title: "Hass.io via the Command line"
description: "Command line utility to control Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

<p class='img'>
<img src='/images/hassio/screenshots/ssh-upgrade.png'>
Hass.io upgrade process from the SSH command line
</p>

On the SSH command line, you can use the `hassio` command to retrieve logs, check the details of connected hardware, and more.

## {% linkable_title Home Assistant %}

```bash
$ hassio homeassistant info
$ hassio homeassistant logs
$ hassio homeassistant check
$ hassio homeassistant restart
$ hassio homeassistant start
$ hassio homeassistant stop
$ hassio homeassistant update
```

## {% linkable_title Supervisor %}

```bash
$ hassio supervisor info
$ hassio supervisor logs
$ hassio supervisor reload
$ hassio supervisor update
```

## {% linkable_title Host %}

```bash
$ hassio host reboot
$ hassio host shutdown
$ hassio host update
```

## {% linkable_title Hardware %}

```bash
$ hassio hardware info
$ hassio hardware audio
```

## {% linkable_title Usage examples %}

To update Home Assistant to a specific version, use the command:
```bash
hassio homeassistant update --options version=x.y.z
```
Replace x.y.z with the desired version like `version=0.74.2`

You can get a better description of the CLI capabilities by typing `hassio help`:

```bash
NAME:
   hassio - Commandline tool to allow interaction with hass.io

USAGE:
   hassio [global options] command [command options] [arguments...]

VERSION:
   1.3.1

AUTHOR:
   Home-Assistant <hello@home-assistant.io>

COMMANDS:
     homeassistant, ha  info, logs, check, restart, start, stop, update
     supervisor, su     info, logs, reload, update
     host, ho           reboot, shutdown, update
     hardware, hw       info, audio
     network, ne        info, options
     snapshots, sn      list, info, reload, new, restore, remove
     addons, ad         list, info, logo, changelog, logs, stats,
 reload, start, stop, install, uninstall, update
     help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --debug, -d    Prints Debug information
   --help, -h     show help
   --version, -v  print the version
```

## {% linkable_title Console access %}

You can also access HassOS via a directly connected keyboard and monitor, the console. To log in to the physical console the username is `root`, with no password.
