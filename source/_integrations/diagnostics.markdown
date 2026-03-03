---
title: Diagnostics
description: The diagnostics integration can provide integration and device information for debugging purposes.
ha_category:
  - Other
ha_release: 2022.2
ha_quality_scale: internal
ha_domain: diagnostics
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: system
---

The **Diagnostics** {% term integration %} provides a way to download diagnostic data from a {% term device %} or {% term integration %} for sharing in issue reports. Sharing diagnostics data when reporting an issue allows developers to diagnose and fix your reported problem quicker.

<p class='img'>
<img class="no-shadow" src='/images/blog/2022-02/diagnostics.png' alt='Screenshot showing the Download Diagnostics button on a Sonos device page'>
Screenshot of the download diagnostics button on the device page
</p>

Diagnostics data is provided by an integration, and can be downloaded
as a text file on the device page, and from the integrations dashboard.

Integrations are required to redact sensitive information from the diagnostics
data, you can always open the text file and check it, before you send
it in a public issue.

The diagnostics integration is by default enabled, no action is required to
enable it. However, not all integrations provide the possibility to download
diagnostic data.
