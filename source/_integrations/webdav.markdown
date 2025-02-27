---
title: WebDAV
description: Instructions on how to setup a WebDAV location to be used with backups.
ha_release: 2025.3
ha_category:
  - Backup
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: webdav
ha_codeowners:
  - '@jpbede'
ha_integration_type: service
related:
  - docs: /common-tasks/general/#backups
    title: Backups
ha_quality_scale: bronze
---

This integration allows you to use a [WebDAV](https://en.wikipedia.org/wiki/WebDAV) compatible location for [Home Assistant Backups](/common-tasks/general/#backups).

## Installation

{% include integrations/config_flow.md %}
{% configuration_basic %}
URL:
  description: "URL of the WebDAV server. Common examples are provided below."
Username:
  description: "Username for the WebDAV server."
Password:
  description: "Password for the WebDAV server."
Backup path:
  description: "Path to the folder where the backups should be stored. The path is relative to the root of the WebDAV server."
Verify SSL:
  description: "Verify the SSL certificate of the WebDAV server."
{% endconfiguration_basic %}

### Common WebDAV URLs

- [Nextcloud](https://nextcloud.com/): `https://<your-nextcloud-domain>/remote.php/webdav/`
- [Owncloud](https://owncloud.com/): `https://<your-owncloud-domain>/remote.php/webdav/`
- [Hetzner Storage Box](https://www.hetzner.com/storage/storage-box): `https://<username>.your-storagebox.de`
- [Strato HiDrive](https://www.strato.de/): `https://webdav.hidrive.strato.com`

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

- If you remove the integration, the backup folder is not automatically deleted. You have to manually delete it.
