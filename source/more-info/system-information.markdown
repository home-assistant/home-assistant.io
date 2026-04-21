---
title: "System information"
description: "View detailed information about your Home Assistant installation."
---

The **System information** dialog provides detailed technical information about your Home Assistant instance, including system architecture, operating system and version, installation type, Python version, frontend version, and more.

## Viewing system information

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %}.
2. From the three dots {% icon "mdi:dots-vertical" %} menu (top right), select **System information**.

<img class="no-shadow" src='/images/more-info/system_information.png' alt="Screenshot showing the System information dialog">

### What information is available

The **System information** dialog provides system details, including:

- Home Assistant Core: Version, installation type, and Python version, architecture, operating system (kernel) version, and timezone
- Home Assistant Supervisor: Version and disk usage (if applicable)
- Home Assistant Operating System: Version and board type (if applicable)
- Home Assistant Cloud: Connection status and certificate information (if configured)
- Recorder: Database engine and estimated database size
- Network: Network configuration details
- Resources: Number of [Dashboards](/dashboards/dashboards/) and [Views](/dashboards/views/)

This information is useful for:

- Troubleshooting issues with your installation
- Checking system resources before [creating backups](/common-tasks/general/#backups)
- Verifying your installation meets [requirements for specific integrations](/integrations/)
- Sharing technical details when [reporting issues on GitHub](#reporting-issues-on-github)

### Reporting issues on GitHub

When reporting issues on GitHub, you're often asked to provide system information.

Follow these steps to copy your system information:

1. In the bottom-right corner of the **System information** dialog, select the copy button.
2. This formats the data and places it on your clipboard.
3. Paste it into your GitHub issue.

<img class="no-shadow" src='/images/more-info/system_information_github.png' alt="Screenshot showing copy button in System information dialog">

## Viewing integration startup time

If Home Assistant is taking a long time to start, you can identify which integrations are causing delays and potentially have connectivity issues.

To view integration startup times, follow these steps:

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %}.
2. From the three dots {% icon "mdi:dots-vertical" %} menu, select **Integration startup time**.