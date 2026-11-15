---
description: Instructions on how to set up a WebDAV location for backups and file uploads.
ha_release: 2025.3
ha_domain: webdav
related:
  - docs: /common-tasks/general/backups/
    title: Backups
---

This {% term integration %} lets you use a [WebDAV](https://en.wikipedia.org/wiki/WebDAV)-compatible server as a storage location for [Home Assistant backups](/common-tasks/general/backups/). You can also upload files from Home Assistant to your WebDAV server, such as camera snapshots, with the [Upload files](/actions/webdav.upload/) action.

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
  description: "Path to the folder where the backups should be stored. The path is relative to the root of the WebDAV server. This path is only used for backups. Files you upload with the **Upload files** action go to the destination folder you choose in the action."
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

{% include integrations/actions.md %}

## WebDAV automation examples

Besides storing backups, you can use WebDAV to keep copies of files from Home Assistant on your own server, such as camera snapshots. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: upload a snapshot when motion is detected

When motion is detected at the front door, take a snapshot and upload it to your WebDAV server, so you have a copy even if Home Assistant is offline. The snapshot uses the same filename each time, so each upload replaces the previous one on the server.

- **Trigger**: State changed
  - **Entity**: Front door motion sensor
  - **To**: Detected
- **Action**: Take camera snapshot
  - **Target**: Front door camera
  - **Filename**: `/config/www/snapshots/front_door.jpg`
- **Action**: Upload files
  - **Config entry**: Your WebDAV server
  - **Filenames**: `/config/www/snapshots/front_door.jpg`
  - **Destination folder**: `Snapshots`

{% details "YAML example for uploading a snapshot on motion" %}

{% example %}
automation: |
  alias: "Upload a snapshot when motion is detected"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_motion
      to: "on"
  actions:
    - action: camera.snapshot
      target:
        entity_id: camera.front_door
      data:
        filename: /config/www/snapshots/front_door.jpg
    - action: webdav.upload
      data:
        config_entry_id: a1bee602deade2b09bc522749bbce48e
        filename: /config/www/snapshots/front_door.jpg
        destination_folder: Snapshots
{% endexample %}

{% enddetails %}

### Automation: upload all snapshots every night

Every night, upload all snapshots from the `snapshots` folder to your WebDAV server. The wildcard picks up every JPG file in the folder, so you don't need to list each file.

- **Trigger**: Time
  - **At time**: `23:00`
- **Action**: Upload files
  - **Config entry**: Your WebDAV server
  - **Filenames**: `/config/www/snapshots/*.jpg`
  - **Destination folder**: `Snapshots/Archive`

{% details "YAML example for uploading all snapshots every night" %}

{% example %}
automation: |
  alias: "Upload all snapshots every night"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: webdav.upload
      data:
        config_entry_id: a1bee602deade2b09bc522749bbce48e
        filename: /config/www/snapshots/*.jpg
        destination_folder: Snapshots/Archive
{% endexample %}

{% enddetails %}

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
