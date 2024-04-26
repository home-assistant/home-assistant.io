---
title: "Configuration.yaml"
description: "Configuring Home Assistant via text files."
related:
  - docs: /docs/configuration/yaml/
    title: YAML syntax
  - docs: /docs/configuration/secrets
    title: Storing credentials in `secrets.yaml` file
  - docs: /common-tasks/os/#backups
    title: Creating and restoring backups
  - docs: /integrations/backup/docs/tools/dev-tools/#reloading-the-yaml-configuration
    title: Creating backups for Home Assistant Container and Core
  - docs: /docs/tools/dev-tools/#reloading-the-yaml-configuration
    title: Reloading the YAML configuration from developer tools
  - docs: docs/configuration/troubleshooting/
    title: Troubleshooting the configuration
---

While you can configure most of Home Assistant from the user interface, for some integrations, you need to edit the `configuration.yaml` file. This file contains {% term integrations %} to be loaded along with their configurations. Throughout the documentation, you will find snippets that you can add to your configuration file to enable specific functionality.

<p class='img'>
<img src='/images/docs/configuration/config-yaml_via-file-editor.png' alt='Screenshot of an example of a configuration.yaml file, accessed using the File editor add-on on a Home Assistant Operating System installation.'>
Example of a configuration.yaml file, accessed using the File editor add-on on a Home Assistant Operating System installation.
</p>

## Editing `configuration.yaml`

The easiest option to edit `configuration.yaml` is to use the {% my supervisor_addon title="Studio Code Server add-on" addon="a0d7b954_vscode" %}. This add-on runs VS Code, which  offers live syntax checking and auto-fill of various Home Assistant entities. See [here](/common-tasks/supervised/#installing-and-using-the-visual-studio-code-vsc-add-on) for details. If unavailable on your system, use {% my supervisor_addon title="File Editor add-on" addon="core_configurator" %} instead. Again, details can be found [here](/common-tasks/supervised/#installing-and-using-the-file-editor-add-on).

If you prefer to use a file editor on your computer, use the {% my supervisor_addon title="Samba add-on" addon="core_samba" %} to access the files as a network share. More details can be found [here](/common-tasks/supervised/#installing-and-using-the-samba-add-on).

The path to your configuration directory can be found in the Home Assistant {% term frontend %} by going to {% my system_health title="Settings > System > Repairs > System information from the top right menu" %}

![Show system menu option](/images/screenshots/System_information_menu.png)

Right under the version you are running, you will find what path Home Assistant has loaded the configuration from.
![Screenshot showing the top of the system information panel](/images/screenshots/System_information.png)

_If you use {% term "Home Assistant Container" %}, you can find `configuration.yaml` in the config folder that you mounted in your container._

_If you use {% term "Home Assistant Operating System" %}, you can find `configuration.yaml` in the `/config` folder of the installation._

_If you use {% term "Home Assistant Core" %} , you can find `configuration.yaml` in the config folder passed to the `hass` command (default is `~/.homeassistant`)._

## Validating the configuration

After changing configuration or automation files, you can check if the configuration is valid. A configuration check is also applied automatically when you reload the configuration or when you restart Home Assistant.

The method for running a configuration check depends on your [installation type](/installation/#advanced-installation-methods). Check the common tasks for your installation type:

- [Configuration check on Operating System](/common-tasks/os/#configuration-check)
- [Configuration check on Supervised](/common-tasks/supervised/#configuration-check)
- [Configuration check on Container](/common-tasks/container/#configuration-check)
- [Configuration check on Core](/common-tasks/core/#configuration-check)

## Reloading the configuration to apply changes

For configuration changes to become effective, the configuration must be reloaded. Most integrations in Home Assistant (that do not interact with {% term devices %} or {% term services %}) can reload changes made to their configuration in `configuration.yaml` without needing to restart Home Assistant.

1. Under **Settings**, select the three dots menu (top right), select **Restart Home Assistant** > **Quick reload**.

   ![Settings, three dot menu, restart Home Assistant](/images/docs/configuration/settings_restart_ha.png)

2. If you find that your changes were not applied, you need to restart.
   - Select **Restart Home Assistant**.
   - Note: This interrupts automations and scripts.

   ![Reload and restart buttons](/images/docs/configuration/reload_restart.png)

## Troubleshooting the configuration

If you run into trouble while configuring Home Assistant, refer to the [configuration troubleshooting page](/docs/configuration/troubleshooting/) and the [`configuration.yaml` examples](/examples/#example-configurationyaml).