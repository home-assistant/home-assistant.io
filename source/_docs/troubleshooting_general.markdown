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

This page covers a few common situations where Home Assistant doesn't behave as expected, and how to get back on track: recovery mode, safe mode, and missing updates.

## Home Assistant went into recovery mode

### Symptom: Home Assistant is in recovery mode

Your dashboard shows a **Recovery mode activated** card instead of your usual cards.

![Screenshot of the Recovery mode activated card on the dashboard](/images/docs/troubleshooting/recovery_mode_active.png)

### Description

Home Assistant starts in recovery mode when an issue prevents it from starting normally. A common cause is an error in a {% term YAML %} file, such as {% term "configuration.yaml" %}.

In recovery mode, Home Assistant ignores your configuration and loads only a minimal set of integrations. Your devices and automations aren't running, but you can still open the user interface, read the logs, edit files with an app, and restore a backup.

### Resolution

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %} and look for the error that explains what went wrong. It usually names the file and line that caused the problem.
2. Fix the error in the configuration file. If you are running {% term "Home Assistant Operating System" %}, you can use an app such as Studio Code Server to [edit your configuration](/docs/configuration/#editing-configurationyaml).
3. Restart Home Assistant.

If you can't find or fix the error, you can also restore a backup from before the problem started, under {% my backup title="**Settings** > **System** > **Backups**" %}.

If you are locked out because you forgot your password, you can't edit the configuration from the user interface. Follow the steps to [reset your password](/docs/locked_out/).

## Restarting Home Assistant in safe mode

If Home Assistant is acting up and you can't find the cause, restart it in safe mode to narrow things down.

Safe mode starts Home Assistant without any custom integrations, custom cards, or themes. If the problem goes away in safe mode, one of those is the likely cause, not Home Assistant itself. Before you report an issue, check whether it still happens in safe mode.

Safe mode only lasts until the next restart. To leave safe mode, restart Home Assistant again.

You can restart in safe mode in several ways:

- From the UI:
  - Go to **Settings**, select the three dots {% icon "mdi:dots-vertical" %} menu in the top-right corner, and select **Restart Home Assistant**. Expand **More options** and select **Restart Home Assistant in safe mode**.

- From the [command line](/common-tasks/os/#home-assistant-via-the-command-line):
  - Run:
    ```bash
    ha core restart --safe-mode
    ```

- By creating a file in the configuration directory:
  - Create an empty file named `safe-mode` in your Home Assistant configuration directory, then restart Home Assistant. Home Assistant detects the file on startup, starts in safe mode, and removes the file.

## I don't see any updates

Typically, updates are shown at the top of the **Settings** page. If you don't see them there, the **Visibility** option might be disabled.

### Resolution

1. On the **Settings** page, in the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Check for updates**.
2. Go to {% my updates title="**Settings** > **System** > **Updates**" %}.
    - Select the update notification.
    - Select the cogwheel {% icon "mdi:cog-outline" %}, then set **Visible** to active.
