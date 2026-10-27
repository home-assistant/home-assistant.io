---
title: "Viewing and downloading logs"
description: "How to view the logs of Home Assistant, the Supervisor, the host, and your apps, look at the logs of an earlier startup, download logs, and find where logs are stored."
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
  - docs: /integrations/logger/
    title: Logger integration
  - docs: /common-tasks/os/#enable-duplicate-log-file
    title: Enable duplicate log file
---

Home Assistant writes down what it does in logs. When something doesn't work as expected, the logs often show why. For example, a log can show that an integration can't reach a device, or that a line in your configuration isn't valid.

To find out more about a problem with one integration, you can also turn on debug logging for that integration. For the steps, refer to [Debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

## Viewing the logs

The **Logs** page shows the errors and warnings of Home Assistant. A message that repeats is shown once, with the number of times it occurred. The list starts again each time Home Assistant restarts. The raw logs show all messages, including older ones.

### Prerequisites

- Administrator rights.

### To view the logs

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
   - Result: The page shows the errors and warnings of **Home Assistant Core**.
2. To see the details of a message, select it.
   - The details show, for example, which integration the message comes from, when it first occurred, and how often.
3. To see the entire log, select **Menu** {% icon "mdi:dots-vertical" %} > **Show raw logs**.
   - To go back to the errors and warnings, select **Menu** {% icon "mdi:dots-vertical" %} > **Show condensed logs**.
4. To find a message, enter a word from the message in the **Search logs** field.

## Viewing the logs of other parts of the system

On {% term "Home Assistant Operating System" %}, other parts of the system have their own logs, for example, the Supervisor and each of your apps. You can view these logs on the **Logs** page as well.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.

### To view the logs of other parts of the system

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
2. In the top-right corner, select the button with the name of the log that is shown, for example, **Home Assistant Core**.
3. Select the log that you want to see.
   - Result: The log is shown. New messages are added at the bottom while the page is open.

The following logs are available:

- **Home Assistant Core**: Home Assistant itself, including your integrations, automations, and scripts.
- **Supervisor**: The part of the system that manages updates, backups, and apps.
- **Host**: The operating system.
- **DNS**, **Audio**, and **Multicast**: The services for name resolution, sound, and device discovery on your network.
- Your apps, by name.

## Viewing the logs of an earlier startup

On {% term "Home Assistant Operating System" %}, the logs of earlier startups of the system are kept until the space for logs is full. Then the oldest logs are removed. For example, if the system rebooted because of a problem, the log of the previous startup can show what happened before the reboot.

A startup is a start of the entire system, for example, after a reboot. Restarting Home Assistant doesn't count as a startup. After a long time without a reboot, only the current startup may be left. Then **Show HAOS startups** isn't shown in the menu.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- The logs of an earlier startup are still kept.

### To view the logs of an earlier startup

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
2. Select the log that you want to see.
   - For **Home Assistant Core**, select **Menu** {% icon "mdi:dots-vertical" %} > **Show raw logs** first.
   - For the other logs, refer to [Viewing the logs of other parts of the system](#viewing-the-logs-of-other-parts-of-the-system).
3. Select **Menu** {% icon "mdi:dots-vertical" %} > **Show HAOS startups**.
4. In the list of startups, select the startup.
   - **Current** is the log since the last startup. **Previous** is the startup before that. Earlier startups are shown as, for example, **2 startups ago**.
   - Result: The log of that startup is shown.

## Downloading the logs

You can download a log to keep a copy of it, or to look at it in another program, such as a text editor.

### Prerequisites

- Administrator rights.

### To download the logs

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
2. Select the log that you want to download.
   - On {% term "Home Assistant Operating System" %}, you can also select another part of the system or an earlier startup. For the steps, refer to [Viewing the logs of other parts of the system](#viewing-the-logs-of-other-parts-of-the-system) and [Viewing the logs of an earlier startup](#viewing-the-logs-of-an-earlier-startup).
3. Select **Download logs** {% icon "mdi:download" %}.
   - In the errors and warnings view of **Home Assistant Core**, the entire log is downloaded right away.
   - In the raw logs, a dialog opens. Under **Lines**, select how many lines to download, and then select **Download**. The newest lines are downloaded.
   - Result: Your browser saves the log as a file, for example, `home-assistant_<date and time>.log`, or `supervisor_<date and time>.log` for the Supervisor log.

## Where the logs are stored

Where Home Assistant stores its logs depends on your installation type.

- {% term "Home Assistant Operating System" %}:
  - All logs are stored in the system journal of the operating system. They are kept across startups, until the space for logs is full. For details, refer to [Viewing the logs of an earlier startup](#viewing-the-logs-of-an-earlier-startup). You view them on the **Logs** page or with the [`ha` command](/common-tasks/os/#home-assistant-via-the-command-line), for example, `ha core logs` or `ha supervisor logs`.
  - Home Assistant doesn't write a `home-assistant.log` file in your configuration folder. To also write the log to that file, refer to [Enable duplicate log file](/common-tasks/os/#enable-duplicate-log-file).
  - If a `home-assistant.log` file is left in your configuration folder, Home Assistant renames it to `home-assistant.log.old` when it starts.
- {% term "Home Assistant Container" %}:
  - The log is stored in `home-assistant.log` in your [configuration folder](/docs/configuration/).
  - When Home Assistant starts, the log of the previous run is moved to `home-assistant.log.1`.
  - The container runtime also keeps the log. For example, with Docker, use `docker logs homeassistant`, if your container is named `homeassistant`, as in the installation steps.
  - If the `HA_DISABLE_LOG_FILE` environment variable is set, Home Assistant doesn't write `home-assistant.log`. Then you can't show the raw logs or download the log on the **Logs** page. For details, refer to the [Logger integration](/integrations/logger/).

On both installation types, if Home Assistant crashes, details of the crash are written to `home-assistant.log.fault` in your configuration folder.
