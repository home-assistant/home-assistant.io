---
layout: page
title: "Hass"
description: "Description of tools which helps when using Home Assistant."
release_date: 2016-11-13 15:00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The command-line part of Home Assistant is 


```bash
$ hass -h
usage: hass [-h] [--version] [-c path_to_config_dir] [--demo-mode] [--debug]
            [--open-ui] [--skip-pip] [-v] [--pid-file path_to_pid_file]
            [--log-rotate-days LOG_ROTATE_DAYS] [--runner] [--script ...]
            [--daemon]

Home Assistant: Observe, Control, Automate.

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
  -c path_to_config_dir, --config path_to_config_dir
                        Directory that contains the Home Assistant
                        configuration
  --demo-mode           Start Home Assistant in demo mode
  --debug               Start Home Assistant in debug mode
  --open-ui             Open the webinterface in a browser
  --skip-pip            Skips pip install of required packages on startup
  -v, --verbose         Enable verbose logging to file.
  --pid-file path_to_pid_file
                        Path to PID file useful for running as daemon
  --log-rotate-days LOG_ROTATE_DAYS
                        Enables daily log rotation and keeps up to the
                        specified days
  --runner              On restart exit with code 100
  --script ...          Run one of the embedded scripts
  --daemon              Run Home Assistant as daemon
```
