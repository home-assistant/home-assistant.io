---
title: WebDAV
description: Instructions on how to set up WebDAV for backups and storage monitoring.
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

This {% term integration %} allows you to use a [WebDAV](https://en.wikipedia.org/wiki/WebDAV) compatible location for [Home Assistant Backups](/common-tasks/general/#backups).

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

- [Nextcloud](https://nextcloud.com/): `https://<your-nextcloud-domain>/remote.php/webdav/` alternatively this can be found in the interface of your Nextcloud instance. 
  To do this, open the file overview and click on ‘Settings’ in the left-hand column.
- [Owncloud](https://owncloud.com/): `https://<your-owncloud-domain>/remote.php/webdav/`
- [Hetzner Storage Box](https://www.hetzner.com/storage/storage-box): `https://<username>.your-storagebox.de`
- [Strato HiDrive](https://www.strato.de/): `https://webdav.hidrive.strato.com`
- [Seafile](https://manual.seafile.com/13.0/extension/webdav/): `https://<your-seafile-domain>/seafdav` if you are running your Seafile behind a reverse proxy, make sure to add the relevant port, by default WebDAV serves at port 8080.
- [Beeline Cloud](https://cloudbeeline.ru/): `https://webdav.cloudbeeline.ru` – free 10GB (forever), to enable WebDAV – navigate to Profile → Security and toggle the setting (screenshots and [detailed explanation here](https://t.me/another_mvp/49)).
- [Mail.ru Cloud](https://cloud.mail.ru/): `https://webdav.cloud.mail.ru/` – free 8GB (forever).

## Supported functionality

### Backup

The integration allows you to use a WebDAV-compatible location for [Home Assistant backups](/common-tasks/general/#backups).

### Sensors

The integration provides sensors that show the storage quota of your WebDAV server. These sensors are only available if your WebDAV server supports quota reporting (RFC 4331).

- **Free space**: The amount of free storage space available on the server
- **Used space**: The amount of storage space currently in use on the server

{% note %}
Not all WebDAV providers support quota reporting. If your server does not support this feature, no sensor entities will be created.
{% endnote %}

## Data updates

Storage quota information is fetched from the server once every 15 minutes. If the server does not support quota reporting, polling is automatically disabled.

## Known limitations

Due to the nature of WebDAV, your server needs to have a fairly high file upload limit. If you experience issues with the backup, check the server configuration or contact your WebDAV service provider.

The following WebDAV services are known to have issues with Home Assistant backups:

- Yandex Disk is not supported, as the speed is artificially slowed down when using WebDAV.
- pCloud WebDAV implementation proved to be unstable and is not recommended for backups.

## Removing the integration

This integration follows standard integration removal in Home Assistant. No extra steps are required in Home Assistant.

{% include integrations/remove_device_service.md %}

- If you want to free up space on your WebDAV server after removing the integration, you can manually delete the Home Assistant backup folder on the server. It is not removed automatically.
