---
title: "Logs on Home Assistant OS"
description: "How to view the logs of the Supervisor, the host, and your apps, look at the logs of an earlier startup, and write the Home Assistant log to a file on Home Assistant OS."
---

On {% term "Home Assistant Operating System" %}, other parts of the system have their own logs, for example, the Supervisor and each of your apps. The logs of earlier startups of the system are kept as well. You view all of them on the **Logs** page.

For the logs that every installation has, such as viewing and downloading the Home Assistant log, refer to [Viewing and downloading logs](/common-tasks/general/logs/).

## Viewing the logs of other parts of the system

Besides the Home Assistant log, the **Logs** page shows the logs of the other parts of the system.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.

### To view the logs of other parts of the system

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
2. In the top-right corner, select the button with the name of the log that is shown, for example, **Home Assistant Core**.
3. Select the log that you want to see.
   - Result: The log is shown. New messages are added at the bottom while the page is open.
   - To download this log, refer to [Downloading the logs](/common-tasks/general/logs/#downloading-the-logs).

The following logs are available:

- **Home Assistant Core**: Home Assistant itself, including your integrations, automations, and scripts.
- **Supervisor**: The part of the system that manages updates, backups, and apps.
- **Host**: The operating system.
- **DNS**, **Audio**, and **Multicast**: The services for name resolution, sound, and device discovery on your network.
- Your apps, by name.

## Viewing the logs of an earlier startup

The logs of earlier startups of the system are kept until the space for logs is full. Then the oldest logs are removed. For example, if the system rebooted because of a problem, the log of the previous startup can show what happened before the reboot.

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

To download the log of an earlier startup, first show it as described above. Then follow the steps in [Downloading the logs](/common-tasks/general/logs/#downloading-the-logs).

## Writing the Home Assistant log to a file

On {% term "Home Assistant Operating System" %}, Home Assistant writes its log to the system journal, not to a file. If you need the log as a file, for example, for a tool that reads it, you can also write it to `home-assistant.log` in your configuration folder. This setting is called the duplicate log file.

### Prerequisites

- Administrator rights.
- {% term "Home Assistant Operating System" %}.
- Access to the command line. For details, refer to [Home Assistant via the command line](/common-tasks/os/#home-assistant-via-the-command-line).

### To write the Home Assistant log to a file

1. On the command line, enter the following commands:

   ```bash
   ha core options --duplicate-log-file=true
   ha core rebuild
   ```

   - Result: Home Assistant restarts and writes its log to `home-assistant.log` in your configuration folder as well.

To stop writing the log to a file, enter the same commands with `false`:

```bash
ha core options --duplicate-log-file=false
ha core rebuild
```

## Where the logs are stored

All logs are stored in the system journal of the operating system. They are kept across startups, until the space for logs is full. You view them on the **Logs** page, or with the [`ha` command](/common-tasks/os/#home-assistant-via-the-command-line), for example, `ha core logs` or `ha supervisor logs`.

If a `home-assistant.log` file is left in your configuration folder, Home Assistant renames it to `home-assistant.log.old` when it starts. This doesn't happen when you [write the log to a file](#writing-the-home-assistant-log-to-a-file).
