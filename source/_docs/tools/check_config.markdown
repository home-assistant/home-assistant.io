---
title: "check_config"
description: "Script to perform a check of the current configuration"
related:
  - docs: /docs/configuration/#validating-the-configuration
    title: Validating the configuration
---

Test any changes to your {% term "`configuration.yaml`" %} file before launching Home Assistant. This script allows you to test changes without the need to restart Home Assistant.

```bash
hass --script check_config
```

The script has further options like checking configuration files which are not located in the default directory or showing your secrets for debugging.

```bash
$ hass --script check_config -h
usage: hass [-h] [--script {check_config}] [-c CONFIG] [-i [INFO]] [-f] [-s]

Check Home Assistant configuration.

optional arguments:
  -h, --help            show this help message and exit
  --script {check_config}
  -c CONFIG, --config CONFIG
                        Directory that contains the Home Assistant
                        configuration
  -i [INFO], --info [INFO]
                        Show a portion of the config
  -f, --files           Show used configuration files
  -s, --secrets         Show secret information
```
