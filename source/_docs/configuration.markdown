---
title: "Configuring Home Assistant"
description: "Configuring Home Assistant."
---

When launched for the first time, Home Assistant will create a default configuration file enabling the web interface and device discovery. It can take up to a minute after startup for your devices to be discovered and appear in the user interface.

The web interface can be found at `http://ip.ad.dre.ss:8123/` - for example if your Home Assistant system has the IP address `192.168.0.40` then you'll find the web interface as `http://192.168.0.40:8123/`.

The location of the folder differs for different operating systems:

| OS             | Path                       |
| -------------- | -------------------------- |
| Home Assistant | `/config`                  |
| Docker         | `/config`                  |
| macOS          | `~/.homeassistant`         |
| Linux          | `~/.homeassistant`         |

If you want to use a different folder for configuration, use the configuration command line parameter: `hass --config path/to/config`.

Inside your configuration folder is the file `configuration.yaml`. This is the main file that contains integrations to be loaded along with their configurations. Throughout the documentation you will find snippets that you can add to your configuration file to enable specific functionality.

If you run into trouble while configuring Home Assistant, refer the [configuration troubleshooting page](/getting-started/troubleshooting-configuration/) and at the [`configuration.yaml` examples](/cookbook/#example-configurationyaml).

<div class='note tip'>

  Test any changes to your configuration files from the command line with `hass --script check_config`. This script allows you to test changes without the need to restart Home Assistant. Remember to run this script as the user you logged in to Home Assistant as. Configuration changes can also be tested using the UI by navigating to Configuration, Server Controls and clicking "Check Configuration".

</div>

## Editing `configuration.yaml`

There are many ways you can edit `configuration.yaml`. Here are three options to get you started:

The simplest way is to use the "File Editor" add-on. This will allow you to edit your configuration from within Home Assistant itself.

The most robust option is to load the Visual Studio Code add-on. VS Code offers live syntax checking and auto-fill of various Home Assistant entities. 

You can use Samba file share (you need to install the "Samba" add-on) and your favorite file editor.

The most basic is to use SSH to connect to the system (you may need to install the SSH add-on) and then use `nano` (or `vim`) to edit the file.

## Reloading changes

You will have to restart Home Assistant for most changes to `configuration.yaml` to take effect.
You can load changes to the following components without restarting, by using the UI. Navigate to Configuration, Server Controls and scrolling down to the YAML configuration reloading: [automations](/docs/automation/), [core (customize)](/docs/configuration/customizing-devices/), [groups](/integrations/group/), [history stats](/integrations/history_stats/), [HomeKit](/integrations/homekit/), [input_booleans](/integrations/input_boolean/), [input_datetimes](/integrations/input_datetime/), [input_numbers](/integrations/input_number/), [input_selects](/integrations/input_select/), [input_texts](/integrations/input_text/), [MQTT](/integrations/mqtt/), [persons](/integrations/person/), [scenes](/integrations/scene/), [scripts](/integrations/script/), [statistics](/integrations/statistics/), [template sensors](/integrations/template/), [timers](/integrations/timer/), [zones](/integrations/zone/), and more without restarting.

<div class='note warning'>

If you have made any changes, remember to [check your configuration](/docs/configuration/troubleshooting/#problems-with-the-configuration) before trying to reload or restart.

</div>

## Migrating to a new system

If you want to migrate your configuration to a new system then you can copy the contents of your configuration folder from the current system to the new system. Be aware that some of the files you need start with `.`, which is hidden by default from both `ls` (in SSH), in Windows Explorer, and macOS Finder. You'll need to ensure that you're viewing all files before you copy them.
