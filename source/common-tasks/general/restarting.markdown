---
title: "Reloading, restarting, rebooting, and shutting down"
description: "How to reload the YAML configuration, restart Home Assistant, restart in safe mode, reboot, or shut down the system, and when to use each option."
related:
  - docs: /docs/troubleshooting_general/#restarting-home-assistant-in-safe-mode
    title: Restarting Home Assistant in safe mode
  - docs: /common-tasks/os/#configuration-check
    title: Configuration check
---

You can reload, restart, reboot, or shut down Home Assistant from the UI, from an automation or a script, or from the command line.

## Which option to use

The options differ in what they affect, and in how long Home Assistant is unavailable:

- [Quick reload](#reloading-the-yaml-configuration): Loads changes in your YAML files without a restart. Home Assistant stays available.
- [Restart](#restarting-home-assistant): Stops Home Assistant and starts it again. Use it when a change needs a restart.
- [Restart in safe mode](#restarting-home-assistant-in-safe-mode): Restarts without custom integrations and community frontend modules. Use it to find the cause of a problem.
- [Reboot](#rebooting-the-system): Restarts the entire system, including all apps. Only on {% term "Home Assistant Operating System" %}.
- [Shut down](#shutting-down-the-system): Turns off the entire system, including all apps. Only on {% term "Home Assistant Operating System" %}.

## Reloading the YAML configuration

A quick reload loads the changes in your YAML files without a restart. It reloads all integrations that support reloading, the core configuration, your themes, and your custom templates. Home Assistant stays available. If you're not sure which option you need, refer to [Which option to use](#which-option-to-use).

Use a quick reload after you edit a YAML file. Some changes need a [restart](#restarting-home-assistant) instead. For example, when you add an integration in YAML for the first time.

Before it reloads, Home Assistant checks your configuration. If the configuration isn't valid, Home Assistant doesn't reload, and shows an error.

### Prerequisites

- Administrator rights.
- A valid configuration. To check it, refer to [Configuration check](/common-tasks/os/#configuration-check).

### To reload the YAML configuration from the UI

1. Go to {% my system_dashboard title="**Settings** > **System**" %}, and in the top-right corner, select the power {% icon "mdi:power" %} icon.
2. Select **Quick reload**.
   - Result: Home Assistant reloads right away. There's no confirmation step.

### Other ways to reload the YAML configuration

- In an automation or a script, use the [**Reload all Home Assistant configuration**](/actions/homeassistant.reload_all/) action.
  - The action only works for administrators. If a person without administrator rights starts it, for example from a dashboard, it fails. An automation that a trigger starts can use it.
- To reload only some parts, such as automations or scripts, go to {% my tools_yaml title="**Settings** > **Tools** > **YAML**" %}.

## Restarting Home Assistant

A restart stops Home Assistant and starts it again. All integrations are loaded again. Running automations and scripts are interrupted, and Home Assistant is unavailable until it has started again. If you're not sure which option you need, refer to [Which option to use](#which-option-to-use).

Use a restart when a change needs one, or when Home Assistant asks you to restart.

Before it restarts, Home Assistant checks your configuration. If the configuration isn't valid, Home Assistant doesn't restart, and shows a notification that links to the logs.

### Prerequisites

- Administrator rights.
- A valid configuration. To check it, refer to [Configuration check](/common-tasks/os/#configuration-check).
- No database upgrade in progress. During an upgrade, Home Assistant shows the notification **Database upgrade in progress** under **Notifications** in the sidebar. The notification goes away when the upgrade is done.

### To restart Home Assistant from the UI

1. Go to {% my system_dashboard title="**Settings** > **System**" %}, and in the top-right corner, select the power {% icon "mdi:power" %} icon.
2. Select **Restart Home Assistant**.
   - The dialog lists the automations and scripts that are running and will be interrupted.
3. Select **Restart**.
   - If a backup is being created, uploaded, or restored, the button is called **Wait and restart**. Home Assistant then waits until the backup is done.

### Other ways to restart Home Assistant

- In an automation or a script, use the [**Restart Home Assistant**](/actions/homeassistant.restart/) action.
  - The action only works for administrators. If a person without administrator rights starts it, for example from a dashboard, it fails. An automation that a trigger starts can use it.
- On {% term "Home Assistant Operating System" %}, on the [command line](/common-tasks/os/#home-assistant-via-the-command-line), enter `ha core restart`.
- On {% term "Home Assistant Container" %}, restart the container, for example, with `docker restart homeassistant`.

## Restarting Home Assistant in safe mode

Safe mode restarts Home Assistant without your custom integrations and community frontend modules. If a problem goes away in safe mode, one of those is the likely cause. Safe mode lasts until the next restart. If you're not sure which option you need, refer to [Which option to use](#which-option-to-use).

For more ways to start safe mode, and how to use it to find a problem, refer to [Restarting Home Assistant in safe mode](/docs/troubleshooting_general/#restarting-home-assistant-in-safe-mode) in the troubleshooting documentation.

### Prerequisites

- Administrator rights.
- A valid configuration. To check it, refer to [Configuration check](/common-tasks/os/#configuration-check).
- No database upgrade in progress. During an upgrade, Home Assistant shows the notification **Database upgrade in progress** under **Notifications** in the sidebar. The notification goes away when the upgrade is done.

### To restart Home Assistant in safe mode from the UI

1. Go to {% my system_dashboard title="**Settings** > **System**" %}, and in the top-right corner, select the power {% icon "mdi:power" %} icon.
2. Select **More options**, and then select **Restart Home Assistant in safe mode**.
3. Select **Restart**.
4. To leave safe mode, [restart Home Assistant](#restarting-home-assistant) again.

### Other ways to restart Home Assistant in safe mode

- In an automation or a script, use the [**Restart Home Assistant**](/actions/homeassistant.restart/) action, and turn on **Safe mode**.
  - The action only works for administrators. If a person without administrator rights starts it, for example from a dashboard, it fails. An automation that a trigger starts can use it.
- On {% term "Home Assistant Operating System" %}, on the [command line](/common-tasks/os/#home-assistant-via-the-command-line), enter `ha core restart --safe-mode`.

## Rebooting the system

A reboot restarts the entire system that runs Home Assistant, including all apps. Rebooting is only available on {% term "Home Assistant Operating System" %}. If you're not sure which option you need, refer to [Which option to use](#which-option-to-use).

Use a reboot when Home Assistant asks you to reboot the system, for example, in a repair issue.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.

### To reboot the system from the UI

1. Go to {% my system_dashboard title="**Settings** > **System**" %}, and in the top-right corner, select the power {% icon "mdi:power" %} icon.
2. Select **More options**, and then select **Reboot system**.
3. Select **Reboot**.
   - If a backup is in progress, the button is called **Wait and reboot**.

### Other ways to reboot the system

- In an automation or a script, use the [**Reboot the host system**](/actions/hassio.host_reboot/) action.
  - The action only works for administrators. If a person without administrator rights starts it, for example from a dashboard, it fails. An automation that a trigger starts can use it.
- On the [command line](/common-tasks/os/#home-assistant-via-the-command-line), enter `ha host reboot`.

## Shutting down the system

Shutting down turns off the entire system that runs Home Assistant, including all apps. Shutting down is only available on {% term "Home Assistant Operating System" %}. If you're not sure which option you need, refer to [Which option to use](#which-option-to-use).

Use it before you disconnect the power or move the device. To start the system again, you need to turn it on yourself. For example, disconnect the power and connect it again.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- Access to the device, so that you can turn it on again.

### To shut down the system from the UI

1. Go to {% my system_dashboard title="**Settings** > **System**" %}, and in the top-right corner, select the power {% icon "mdi:power" %} icon.
2. Select **More options**, and then select **Shut down system**.
3. Select **Shut down**.
   - If a backup is in progress, the button is called **Wait and shut down**.

### Other ways to shut down the system

- In an automation or a script, use the [**Power off the host system**](/actions/hassio.host_shutdown/) action.
  - The action only works for administrators. If a person without administrator rights starts it, for example from a dashboard, it fails. An automation that a trigger starts can use it.
- On the [command line](/common-tasks/os/#home-assistant-via-the-command-line), enter `ha host shutdown`.
- To stop only Home Assistant, and not the system, use the [**Stop Home Assistant**](/actions/homeassistant.stop/) action. Home Assistant doesn't start again by itself.
