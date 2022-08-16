---
title: "Configuration.yaml"
description: "Configuring Home Assistant via text files."
---

While you can configure most of Home Assistant directly from the user interface under {% my config %}, some parts need you to edit `configuration.yaml`. This file contains integrations to be loaded along with their configurations. Throughout the documentation you will find snippets that you can add to your configuration file to enable specific functionality.

If you run into trouble while configuring Home Assistant, refer to the [configuration troubleshooting page](/docs/configuration/troubleshooting/) and the [`configuration.yaml` examples](/examples/#example-configurationyaml).

## Editing `configuration.yaml`

The easiest option to edit `configuration.yaml` is to use the {% my supervisor_addon title="Studio Code Server add-on" addon="a0d7b954_vscode" %}. This add-on runs VS Code, which  offers live syntax checking and auto-fill of various Home Assistant entities (if unavailable on your system, use {% my supervisor_addon title="File Editor add-on" addon="core_configurator" %} instead).

If you prefer to use a file editor on your computer, use the {% my supervisor_addon title="Samba add-on" addon="core_samba" %} to access the files as a network share.

The path to your configuration directory can be found in the Home Assistant frontend by going to {% my system_health title="Settings > System > Repairs > System information from the top right menu" %}

![Show system menu option](/images/screenshots/System_information_menu.png)

Right under the version you are running, you will find what path Home Assistant has loaded the configuration from.
![Screenshot showing the top of the system information panel](/images/screenshots/System_information.png)

_If you use Home Assistant Container, you can find `configuration.yaml` in the config folder that you mounted in your container._

_If you use Home Assistant Operating System, you can find `configuration.yaml` in the `/config` folder of the installation._

_If you use Home Assistant Core, you can find `configuration.yaml` in the config folder passed to the `hass` command (default is `~/.homeassistant`)._

## Reloading changes

Most integrations in Home Assistant that do not interact with devices or services can reload changes made to their configuration in `configuration.yaml`. To do this, go to {% my server_controls title="Developer Tools > YAML" %} and scroll down to the YAML configuration reloading section (alternatively, hit "c" anywhere in the UI and search for it).

If you can't see your integration listed there, you will need to restart Home Assistant for changes to take effect.

<div class='note'>

  To test any changes to your configuration files from the command line, check out the common tasks for [operating system](/common-tasks/os/#configuration-check), [supervised](/common-tasks/supervised/#configuration-check), [container](/common-tasks/container/#configuration-check), [core](/common-tasks/core/#configuration-check) for how to do that. Configuration changes can also be tested using the UI by navigating to {% my server_controls title="Developer Tools > YAML" %} and clicking "Check Configuration". For the button to be visible, you must enable "Advanced Mode" on your {% my profile title="User Profile" %}.

</div>

## Migrating to a new system

The preferred way of migrating to a new system is by {% my supervisor_backups title="making a backup" %}.

If you run the container or core installation methods, you will need to manually make a backup of your configuration folder. Be aware that some of the files you need start with `.`, which is hidden by default from both `ls` (in SSH), in Windows Explorer, and macOS Finder. You'll need to ensure that you're viewing all files before you copy them.
