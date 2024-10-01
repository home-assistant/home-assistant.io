---
title: "Reporting issues"
description: "Reporting issues about Home Assistant"
related:
  - docs: /docs/configuration/
    title: Configuration.yaml file
  - docs: /docs/configuration/troubleshooting/
    title: Enable debug logging
  - url: https://community.home-assistant.io/
    title: Forum
  - docs: /help/
    title: Bug trackers
---

If you have an installation, a setup or a configuration issue, please use our [Forum](https://community.home-assistant.io/) to get help. We have a big community which will help you if they can.

If you found a bug, then please report it in one of our [trackers](/help/#bugs-feature-requests-and-alike). To help you and our developers to identify the issue quickly, please fill out the provided template. The "weird" content you will see, is there to render your entry in a nice format after submitting. It's just [markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

To see the version information, refer to the {% my info title="**Settings** > **About**" %} page.

## Description of the problem

Provide a summary of your issue and tell us what's wrong. Tell us what you were trying to do and what happened.

There are integrations which require additional steps (installing third-party tools, compilers, etc.) to get your setup working. Please describe the steps you took and the ones to reproduce the issue if needed.

## First Home Assistant version with the issue

Please provide the version which contains the issue. You can find the version information under {% my system_health title="**Settings** > **System** > **Repairs** > Three dots in the upper right > **System information**" %}.

## Last working Home Assistant release (if known)

If possible, provide the latest release of which you know that the integration or platform was working. Home Assistant is evolving very fast and issues may already be addressed or be introduced by a recent change. You can find the detailed information about your system under {% my system_health title="**Settings** > **System** > **Repairs** > Three dots in the upper right > **System information**" %}

## Operating environment

There are many different ways to run Home Assistant. In this section, please mention which you are using: Home Assistant Operating System, Home Assistant Supervised, Home Assistant Core in Docker, or a manual installation of the Home Assistant Core. It would be helpful to mention which operating system you are using because not all are supported on the same level. You can find this information under {% my system_health title="**Settings** > **System** > **Repairs** > Three dots in the upper right > **System information**" %}.

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

Look at the `home-assistant.log` file in the [configuration folder](/docs/configuration/) and see if there are any errors related to your integration.

### Additional information

This section can contain additional details or other observation. Often the little things can help as well.
