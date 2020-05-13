---
title: "hass"
description: "Description of hass."
---

The command-line part of Home Assistant is `hass`.


```bash
$ hass -h
usage: hass [-h] [--version] [-c path_to_config_dir] [--safe-mode] [--debug]
            [--open-ui] [--skip-pip] [-v] [--pid-file path_to_pid_file]
            [--log-rotate-days LOG_ROTATE_DAYS] [--log-file LOG_FILE]
            [--log-no-color] [--runner] [--script ...] [--daemon]

Home Assistant: Observe, Control, Automate.

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
  -c path_to_config_dir, --config path_to_config_dir
                        Directory that contains the Home Assistant
                        configuration
  --safe-mode           Start Home Assistant in safe mode
  --debug               Start Home Assistant in debug mode
  --open-ui             Open the webinterface in a browser
  --skip-pip            Skips pip install of required packages on startup
  -v, --verbose         Enable verbose logging to file.
  --pid-file path_to_pid_file
                        Path to PID file useful for running as daemon
  --log-rotate-days LOG_ROTATE_DAYS
                        Enables daily log rotation and keeps up to the
                        specified days
  --log-file LOG_FILE   Log file to write to. If not set, CONFIG/home-
                        assistant.log is used
  --log-no-color        Disable color logs
  --runner              On restart exit with code 100
  --script ...          Run one of the embedded scripts
  --daemon              Run Home Assistant as daemon
```
