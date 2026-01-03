---
title: "General troubleshooting"
description: "General troubleshooting information"
related:
  - docs: /docs/configuration/#editing-configurationyaml
    title: Editing your configuration
  - docs: /integrations/recovery_mode/
    title: Recovery mode integration
  - docs: /docs/locked_out/
    title: Resetting your password
  - docs: /common-tasks/os/#home-assistant-via-the-command-line
    title: Home Assistant via command line
---

This page provides some information about more generic troubleshooting topics.

## Home Assistant went into recovery mode

### Symptom: Home Assistant is in recovery mode

On top of the page you see a red banner. On the **Overview** page, you see a **Recovery mode** notification.

![image](/images/docs/troubleshooting/recovery_mode_active.png)

### Description

When Home Assistant is in recovery mode, there was an issue with the configuration.

Recovery mode loads a minimum set of integrations to allow troubleshooting the configuration. Recovery mode will use the parts of the configuration that was used the last time Home Assistant started successfully. You can still see the user interface, the settings, and add-ons.

### Resolution

You need to identify the issue in the configuration files and fix it there. The issue could be caused by something as simple as an invalid {% term YAML %} file.

- If you are running {% term "Home Assistant Operating System" %}, you can install an add-on such as Studio Code Server to edit the configuration file if needed.
- If you are still logged in, you can [edit your configuration](/docs/configuration/#editing-configurationyaml).
  - In the Home Assistant user interface, open the add-on you usually use and edit the configuration file.
- Restart Home Assistant.
- If you are locked out because you forgot your password, you cannot edit the configuration file from the user interface. Follow the steps to [reset your password](/docs/locked_out/).

## Restarting Home Assistant in safe mode

If your Home Assistant is acting up and you cannot identify a root cause, you can use **Safe mode** to narrow down the number of possible causes.
**Safe mode** loads Home Assistant Core, but no custom integrations, no custom cards, and no custom themes. If the issue does not persist in **Safe mode**, the issue is not with Home Assistant Core. Before reporting an issue, check if the issue persists in **Safe mode**.

- To enable Safe mode from the UI, go to **Settings** > **System** > **Restart Home Assistant** (top right) > **Restart Home Assistant in safe mode**.
- If you cannot reach the UI, you can enable **Safe mode** from the [command line](/common-tasks/os/#home-assistant-via-the-command-line):
  - ```ha core restart --safe-mode```

## I don't see any updates

Typically, updates are shown at the top of the **Settings** page. If you don't see them there, the **Visibility** option might be disabled.

### Resolution

1. On the **System** page, in the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Check for updates**.
2. Go to {% my updates title="**System** > **Updates**" %}.
    - Select the update notification.
    - Select the cogwheel {% icon "mdi:cog-outline" %}, then set **Visible** to active.
