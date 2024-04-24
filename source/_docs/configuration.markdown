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
  - docs: /integrations/backup
    title: Creating backups for Home Assistant Container and Core
---

While you can configure most of Home Assistant directly from the user interface under {% my config %}, some parts need you to edit `configuration.yaml`. This file contains {% term integrations %} to be loaded along with their configurations. Throughout the documentation you will find snippets that you can add to your configuration file to enable specific functionality.

If you run into trouble while configuring Home Assistant, refer to the [configuration troubleshooting page](/docs/configuration/troubleshooting/) and the [`configuration.yaml` examples](/examples/#example-configurationyaml).

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

After changing configuration or automation files, check if the configuration is valid.

The method for running a configuration check depends on your [installation type](/installation/#advanced-installation-methods). Check the common tasks for your installation type:

- [Configuration check on Operating System](/common-tasks/os/#configuration-check)
- [Configuration check on Supervised](/common-tasks/supervised/#configuration-check)
- [Configuration check on Container](/common-tasks/container/#configuration-check)
- [Configuration check on Core](/common-tasks/core/#configuration-check)

## Reloading the configuration to apply changes

For configuration changes to become effective, the configuration must be reloaded. Most integrations in Home Assistant (that do not interact with {% term devices %} or {% term services %}) can reload changes made to their configuration in `configuration.yaml` without needing to restart Home Assistant.

1. There are two main ways to reload configuration changes.
   - Under **Settings**, select the three dots menu (top right), select **Restart Home Assistant** > **Quick reload**.
2. Another way to reload the configuration is by using the **Developer Tools**.
   - Go to {% my server_controls title="**Developer Tools** > **YAML**" %} and scroll down to the YAML configuration reloading section (alternatively, hit "c" anywhere in the UI and search for "reload").
   - You are presented with a list of integrations, such as **Automations** or **Conversation**.

    ![Reload configuration changes](/images/docs/configuration/reloading_config.png)

3. If the integration is listed, select it to reload the settings.
   - For example, if you've changed the [General settings](/docs/configuration/basic/), you can select **Location & customizations** to apply those changes.
4. If the integration is not listed, you need to restart Home Assistant for changes to take effect:
   - [Validate the configuration](#validating-the-configuration). Then, select the **Restart** button.
