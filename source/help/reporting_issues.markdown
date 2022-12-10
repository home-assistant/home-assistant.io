---
title: "Reporting issues"
description: "Reporting issues about Home Assistant"
sidebar: false
---

If you have an installation, a setup or a configuration issue please use our [Forum](https://community.home-assistant.io/) to get help. We have a big community which will help you if they can.

If you found a bug then please report it in one of our [trackers](/help/#bugs-feature-requests-and-alike). To help you and our developers to identify the issue quickly, please fill out the provided template. The "weird" content you will see is there to render your entry in a nice format after submitting. It's just [markdown](https://guides.github.com/features/mastering-markdown/).

Please refer to the **Settings** -> **About** page, which is accessible inside the Home Assistant frontend.

## First Home Assistant release with the issue

Please provide the release which contains the issue.

## Last working Home Assistant release (if known)

If possible, provide the latest release of which you know that the integration or platform was working. Home Assistant is evolving very fast and issues may already be addressed or be introduced by a recent change.

## Operating environment

There are many different ways to run Home Assistant. In this section please mention which you are using, e.g., Home Assistant (using the Home Assistant Operating System), Home Assistant Supervised, Home Assistant Core in Docker or a manual installation of the Home Assistant Core. It can help if you mention which operating system you are using because not all are supported on the same level.

## Integration

Please add the link to the documentation of the integration in question. E.g.,

- issue with the `random` sensor: [/integrations/random#sensor](/integrations/random#sensor)
- issue with the `hue` integration: [/integrations/hue/](/integrations/hue/)

### Description of problem

Provide a summary of your issue and tell us what's wrong.

There are integrations and platform which require additional steps (installing third-party tools, compilers, etc.) to get your setup working. Please describe the steps you took and the ones to reproduce the issue if needed.

### Problem-relevant `configuration.yaml` entries

To exclude configuration issues and allow the developers to quickly test, and perhaps reproduce, your issue, add the relevant part of your `configuration.yaml` file. This file is located in your [configuration folder](/docs/configuration/).

```yaml
sensor:
  - platform: random
```

Make sure that you don't post your username, password, API key, access token or other [secrets](/docs/configuration/secrets/).

### Traceback (if applicable)

If things go wrong there will be a so-called traceback or an error message in other words in your log. Please include this. It starts with **Traceback** and can contain information where the error was triggered in the code.

```bash
Traceback (most recent call last):
...
```

### Additional information

This section can contain additional details or other observation. Often the little things can help as well.
