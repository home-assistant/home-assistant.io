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

Home Assistant:

```bash
$ hassio homeassistant logs
$ hassio homeassistant restart
$ hassio homeassistant stop
$ hassio homeassistant start
$ hassio homeassistant update
$ hassio homeassistant check
```

Host:

```bash
$ hassio host hardware
$ hassio host reboot
$ hassio host shutdown
$ hassio host update
```

Supervisor

```bash
$ hassio supervisor logs
$ hassio supervisor info
$ hassio supervisor reload
$ hassio supervisor update
```

You can get a better description of the CLI capabilities by typing `hassio help`:

```bash
NAME:
   hassio - Commandline tool to allow interaction with hass.io

USAGE:
   hassio [global options] command [command options] [arguments...]

VERSION:
   1.2.1

AUTHOR:
   Home-Assistant <hello@home-assistant.io>

COMMANDS:
     homeassistant, ha  info, logs, check, restart, start, stop, update
     supervisor, su     info, logs, reload, update
     host, ho           hardware, reboot, shutdown, update
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
