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

<div class='note'>
The Synology SRM integration can only be configured through the user interface since Home Assistant 0.110. The legacy YAML configuration is not supported anymore.
</div>

The integration can be configured through the user interface at *Configuration* -> *Integrations*. Search for "Synology SRM", fill in the configuration form with your username and password, and then click **Submit**.

It's not possible to create another account in SRM with admin permissions. You'll need to use your admin account (or the one you renamed at creation) for this connection.

List of models known to be supported:

- RT1900ac
- RT2600ac
