---
title: "Reporting issues"
description: "Reporting issues about Home Assistant"
related:
  - docs: /docs/configuration/
    title: Configuration.yaml file
  - docs: /docs/configuration/troubleshooting/
    title: Enable debug logging
  - docs: /more-info/system-information/
    title: System information
  - url: https://community.home-assistant.io/
    title: Forum
  - docs: /help/
    title: Bug trackers
---

If you have an installation, a setup or a configuration issue, please use our [Forum](https://community.home-assistant.io/) to get help. We have a big community which will help you if they can.

If you found a bug, please report it in one of our [trackers](/help/#bugs-feature-requests-and-alike). To help you and our developers identify the issue quickly, please fill out the provided template.

## Finding system information

Many issue reports require details about your Home Assistant installation. To find this information:

1. Go to {% my system_health title="**Settings** > **System** > **Repairs**" %}.
2. From the three dots {% icon "mdi:dots-vertical" %} menu, select **System information**.
   - This [system information dialog](/more-info/system-health/) shows your Home Assistant version, installation type, operating system, and other system details.
3. To copy the system information, at the bottom of the dialog, select the **Copy** button. 
   

## Description of the problem

Provide a summary of your issue and tell us what's wrong. Tell us what you were trying to do and what happened.

There are integrations which require additional steps (installing third-party tools, compilers, etc.) to get your setup working. Please describe the steps you took and the ones to reproduce the issue if needed.

## First Home Assistant version with the issue

Please provide the version that contains the issue. See [Finding system information](#finding-system-information) for instructions on finding the version.

## Last working Home Assistant release (if known)

If possible, provide the latest release that you know was working. Home Assistant is evolving very fast and issues may already be addressed or be introduced by a recent change. See [Finding system information](#finding-system-information) for instructions on finding the version.

## Operating environment

There are many different ways to run Home Assistant. In this section, please mention which you are using: {% term "Home Assistant Operating System" %} or {% term "Home Assistant Container" %} in Docker. It would be helpful to mention which operating system you are using because not all are supported on the same level. See [Finding system information](#finding-system-information) for instructions on how to find this information.

## Integration

Please add the link to the documentation of the integration in question. For example:

- Issue with the `random` sensor: [/integrations/random#sensor](/integrations/random#sensor).
- Issue with the `hue` integration: [/integrations/hue/](/integrations/hue/).

### Diagnostics information

Consider uploading [the diagnostics file](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) along with your issue report to allow faster triaging and pinpointing the issue.
The information contained in the generated diagnostics file is redacted to avoid any sensitive information while still remaining useful for developers to fix the issue.

### Problem-relevant `configuration.yaml` entries

To exclude configuration issues and allow the developers to quickly test, and perhaps reproduce, your issue, add the relevant part of your {% term "`configuration.yaml`" %} file. This file is located in your [configuration folder](/docs/configuration/).

```yaml
sensor:
  - platform: random
```

Make sure that you don't post your username, password, API key, access token or other [secrets](/docs/configuration/secrets/).

### Traceback and log information (if applicable)

If things go wrong, there will be a so-called traceback or an error message in your logs under {% my logs title="**Settings** > **System** > **Logs**" %}. Please include this. It starts with **Traceback** and can contain information about where the error was triggered in the code.

```bash
Traceback (most recent call last):
...
```

In some cases, it is also necessary to [enable debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) to get detailed logs to triage an issue.
Enabling this will instruct Home Assistant to log a lot of fine-grained information about the integration. This is helpful for debugging and fixing the issue.
In contrast to the diagnostics information, debug logs are not automatically redacted. Make sure to include only the parts you think are relevant to the issue.

[Download the logs](/integrations/logger/#viewing-logs) and see if there are any errors related to your integration.

### Additional information

This section can contain additional details or other observation. Often the little things can help as well.
