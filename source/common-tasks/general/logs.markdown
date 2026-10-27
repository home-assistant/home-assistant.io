---
title: "Viewing and downloading logs"
description: "How to view and download the logs of Home Assistant, remove sensitive information from them, and find where logs are stored on each installation type."
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
  - docs: /integrations/logger/
    title: Logger integration
  - docs: /common-tasks/os/logs/
    title: Logs on Home Assistant OS
---

Home Assistant writes down what it does in logs. When something doesn't work as expected, the logs often show why. For example, a log can show that an integration can't reach a device, or that a line in your configuration isn't valid.

To find out more about a problem with one integration, you can also turn on debug logging for that integration. For the steps, refer to [Debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

On {% term "Home Assistant Operating System" %}, you can also view the logs of the Supervisor, the host, and your apps, and the logs of earlier startups. For the steps, refer to [Logs on Home Assistant OS](/common-tasks/os/logs/).

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

## Downloading the logs

You can download a log to keep a copy of it, or to look at it in another program, such as a text editor.

### Prerequisites

- Administrator rights.

### To download the logs

1. Go to {% my logs title="**Settings** > **System** > **Logs**" %}.
2. Select the log that you want to download.
   - On {% term "Home Assistant Operating System" %}, you can also select another part of the system or an earlier startup. For the steps, refer to [Logs on Home Assistant OS](/common-tasks/os/logs/).
3. Select **Download logs** {% icon "mdi:download" %}.
   - In the errors and warnings view of **Home Assistant Core**, the entire log is downloaded right away.
   - In the raw logs, a dialog opens. Under **Lines**, select how many lines to download, and then select **Download**. The newest lines are downloaded.
   - Result: Your browser saves the log as a file, for example, `home-assistant_<date and time>.log`, or `supervisor_<date and time>.log` for the Supervisor log.

## Where the logs are stored

Where Home Assistant stores its logs depends on your installation type.

- {% term "Home Assistant Operating System" %}:
  - All logs are stored in the system journal of the operating system. They are kept across startups, until the space for logs is full.
  - Home Assistant doesn't write a `home-assistant.log` file in your configuration folder, unless you [turn that on](/common-tasks/os/logs/#writing-the-home-assistant-log-to-a-file).
  - For details, refer to [Logs on Home Assistant OS](/common-tasks/os/logs/#where-the-logs-are-stored).
- {% term "Home Assistant Container" %}:
  - The log is stored in `home-assistant.log` in your [configuration folder](/docs/configuration/).
  - When Home Assistant starts, the log of the previous run is moved to `home-assistant.log.1`.
  - The container runtime also keeps the log. For example, with Docker, use `docker logs homeassistant`, if your container is named `homeassistant`, as in the installation steps.
  - If the `HA_DISABLE_LOG_FILE` environment variable is set, Home Assistant doesn't write `home-assistant.log`. Then you can't show the raw logs or download the log on the **Logs** page. For details, refer to the [Logger integration](/integrations/logger/).

On both installation types, if Home Assistant crashes, details of the crash are written to `home-assistant.log.fault` in your configuration folder.
