---
title: Synology SRM
description: Instructions on how to integrate Synology SRM routers into Home Assistant.
ha_category:
  - Presence Detection
ha_release: 0.87
ha_codeowners:
  - '@aerialls'
ha_domain: synology_srm
---

This platform allows you to detect presence by looking at connected devices to a [Synology SRM](https://www.synology.com/en-us/srm) router.

## Configuration

The integration can be configured through the user interface at *Configuration* -> *Integrations*. Click on the floating button at the bottom right to add a new integration. Search for "Synology SRM", fill in the configuration form with your username, your password and also the device hostname (it can be an IP address or a FDQN) and then click **Submit**.

<div class='note'>
It's not possible to create another account in SRM with admin permissions. You'll need to use your admin account (or the one you renamed at creation) for this connection.
</div>

List of models known to be supported:

- RT1900ac
- RT2600ac
- MR2200ac
