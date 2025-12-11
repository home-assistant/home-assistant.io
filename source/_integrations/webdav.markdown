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

- [Nextcloud](https://nextcloud.com/): `https://<your-nextcloud-domain>/remote.php/webdav/` alternatively this can be found in the interface of your Nextcloud instance. 
  To do this, open the file overview and click on ‘Settings’ in the left-hand column.
- [Owncloud](https://owncloud.com/): `https://<your-owncloud-domain>/remote.php/webdav/`
- [Hetzner Storage Box](https://www.hetzner.com/storage/storage-box): `https://<username>.your-storagebox.de`
- [Strato HiDrive](https://www.strato.de/): `https://webdav.hidrive.strato.com`
- [Seafile](https://manual.seafile.com/13.0/extension/webdav/): `https://<your-seafile-domain>/seafdav` if you are running your Seafile behind a reverse proxy, make sure to add the relevant port, by default WebDAV serves at port 8080.
- [Beeline Cloud](https://cloudbeeline.ru/): `https://webdav.cloudbeeline.ru` – free 10GB (forever), to enable WebDAV – navigate to Profile → Security and toggle the setting (screenshots and [detailed explanation here](https://t.me/another_mvp/49)).
- [Mail.ru Cloud](https://cloud.mail.ru/): `https://webdav.cloud.mail.ru/` – free 8GB (forever).


## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

- If you remove the integration, the backup folder is not automatically deleted. You have to manually delete it.

## Known issues / limitations

Due to the nature of WebDAV, it is required to have a fairly high file upload limit on the server.
If you experience issues with the backup, please check the server configuration or with your WebDAV service provider.

Following WebDAV services are known to have issues with Home Assistant backups:

- Yandex Disk is not supported, as the speed is artificially slowed down when using WebDAV.
- pCloud WebDAV implementation proved to be unstable and is not recommended for backups.
