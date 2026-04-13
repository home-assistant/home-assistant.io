---
title: Diagnostics
description: The diagnostics integration lets you download integration and device diagnostic information for debugging.
ha_category:
  - Other
ha_release: 2022.2
ha_quality_scale: internal
ha_domain: diagnostics
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **Diagnostics** {% term integration %} lets you download a diagnostics file for a specific {% term integration %} or {% term device %}. Sharing this file when reporting an issue helps developers diagnose and fix the problem faster, because it contains the relevant state, configuration, and context without requiring you to describe every detail by hand.

This integration is always enabled and requires no setup. However, not every integration provides diagnostic data. When no data is available, the download option is not shown.

## Downloading diagnostics

You can download diagnostics from two places in Home Assistant.

### From the integration page

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the integration you want diagnostics for.
3. Open the three-dot {% icon "mdi:dots-vertical" %} menu and select **Download diagnostics**.

The downloaded file contains information about the integration as a whole and all of its devices.

### From a device page

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the integration, then select the device you want diagnostics for.
3. Open the three-dot {% icon "mdi:dots-vertical" %} menu and select **Download diagnostics**.

The downloaded file contains information specific to that device only, which is useful when reporting a device-specific issue.

<p class='img'>
<img class="no-shadow" src='/images/blog/2022-02/diagnostics.png' alt='Screenshot showing the Download Diagnostics button on a Sonos device page'>
Screenshot of the Download diagnostics button on a device page.
</p>

## About the diagnostics file

The diagnostics file is a plain text JSON file. Before sharing it publicly, for example, in a GitHub issue, you can open it in any text editor to review its contents.

Integrations are required to redact sensitive information, such as API keys, tokens, and passwords, before exposing diagnostic data. Redacted values appear in the file as `**REDACTED**`.

## Related

For more general guidance on gathering troubleshooting information when reporting a problem, see [Debug logs and diagnostics](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).
