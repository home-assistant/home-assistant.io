---
title: "Configuring Home Assistant"
description: "Configuring Home Assistant."
---

While you can configure most of Home Assistant directly from the user interface under {% my configuration %}, some parts needs you to access the configuration folder.

The location of the folder differs for different installation methods. For our operating system, supervised and container installations this is `/config`, if you are running core you can see where the configuration folder is by looking at {% my info title="Configuration -> Info" %}.

Inside your configuration folder is the file `configuration.yaml`. This is the main file that contains integrations to be loaded along with their configurations. Throughout the documentation you will find snippets that you can add to your configuration file to enable specific functionality.

If you run into trouble while configuring Home Assistant, refer the [configuration troubleshooting page](/getting-started/troubleshooting-configuration/) and at the [`configuration.yaml` examples](/examples/#example-configurationyaml).

<div class='note warning'>

  Test any changes to your configuration files from the command line check out the common tasks for [operating system](/common-tasks/os/#configuration-check), [supervised](/common-tasks/supervised/#configuration-check), [container](/common-tasks/container/#configuration-check), [core](/common-tasks/core/#configuration-check) for how to do that. Configuration changes can also be tested using the UI by navigating to {% my server_controls title="Configuration -> Server Control" %} and clicking "Check Configuration".

</div>

## Editing `configuration.yaml`

There are many ways you can edit `configuration.yaml`. Here are three options to get you started:

The simplest way is to use the {% my supervisor_addon title="File Editor" addon="core_configurator" %} add-on. This will allow you to edit your configuration from within Home Assistant itself.

The most robust option is to load the {% my supervisor_addon title="Visual Studio Code" addon="a0d7b954_vscode" %} add-on. VS Code offers live syntax checking and auto-fill of various Home Assistant entities.

You can use Samba file share (you need to install the {% my supervisor_addon title="Samba" addon="core_samba" %} add-on) and your favorite file editor.

<div class='note tip'>

  Add-ons are only available on our operating system and supervised installations.

</div>

## Reloading changes

You will have to restart Home Assistant for most changes to `configuration.yaml` to take effect.
You can load changes to the following components without restarting, by using the UI. Navigate to {% my server_controls title="Configuration -> Server Control" %} and scrolling down to the YAML configuration reloading: [automations](/docs/automation/), [core (customize)](/docs/configuration/customizing-devices/), [groups](/integrations/group/), [history stats](/integrations/history_stats/), [HomeKit](/integrations/homekit/), [input_booleans](/integrations/input_boolean/), [input_datetimes](/integrations/input_datetime/), [input_numbers](/integrations/input_number/), [input_selects](/integrations/input_select/), [input_texts](/integrations/input_text/), [MQTT](/integrations/mqtt/), [persons](/integrations/person/), [scenes](/integrations/scene/), [scripts](/integrations/script/), [statistics](/integrations/statistics/), [template sensors](/integrations/template/), [timers](/integrations/timer/), [zones](/integrations/zone/), and more without restarting.

## Migrating to a new system

If you want to migrate your configuration to a new system then you can copy the contents of your configuration folder from the current system to the new system. Be aware that some of the files you need start with `.`, which is hidden by default from both `ls` (in SSH), in Windows Explorer, and macOS Finder. You'll need to ensure that you're viewing all files before you copy them.
