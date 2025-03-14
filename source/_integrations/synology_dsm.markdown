---
title: Synology DSM
description: Instructions on how to integrate the Synology DSM sensor within Home Assistant.
ha_category:
  - Backup
  - Camera
  - Media source
  - System monitor
  - Update
ha_release: 0.32
ha_iot_class: Local Polling
ha_domain: synology_dsm
ha_codeowners:
  - '@hacf-fr'
  - '@Quentame'
  - '@mib1185'
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - backup
  - binary_sensor
  - button
  - camera
  - diagnostics
  - sensor
  - switch
  - update
ha_integration_type: integration
ha_zeroconf: true
---

The Synology DSM integration provides access to various statistics from your [Synology NAS](https://www.synology.com) (_DSM 5.x and higher_), as well as cameras from the [Surveillance Station](https://www.synology.com/surveillance) and will allow to use the [File Station](https://www.synology.com/en-us/dsm/feature/file_sharing) as a {% term backup %} location.

{% include integrations/config_flow.md %}

{% warning %}
This sensor will wake up your Synology NAS if it's in hibernation mode.

The default polling interval is 15 minutes. You can also [define a custom polling interval](/common-tasks/general/#defining-a-custom-polling-interval) if needed.

Having cameras or the Home mode toggle from [Surveillance Station](https://www.synology.com/en-us/surveillance) will fetch every 30 seconds. Disable those entities if you don't want your NAS to be fetched as frequently.
{% endwarning %}

{% important %}
When SSDP is activated on a NAS with two or more NICs with different IP addresses on the same subnet an adoption loop will occur. The NAS will be detected several times with different IP addresses and the integration will adopt the "newly" detected IP causing a reload. To resolve this either <a href="https://kb.synology.com/en-id/DSM/help/DSM/AdminCenter/file_service_advanced_introduction?version=7" target="_blank">deactivate SSDP on the NAS</a> or use NIC bonding so that only one IP address is present.
{% endimportant %}

## Separate User Configuration

You must grant the user admin rights in order to access utilization information since it's stored in the core module.

When creating the user, it is possible to deny access to all locations and applications. By doing this, the user will not be able to login to the web interface or view any of the files on the Synology NAS. It is still able to read the utilization and storage information using the API.

If you want to add cameras from [Surveillance Station](https://www.synology.com/surveillance), the user needs application permission for [Surveillance Station](https://www.synology.com/surveillance).

If you want to use a shared folder from the [File Station](https://www.synology.com/en-us/dsm/feature/file_sharing) as {% term backup %} location, the user needs application permission for [File Station](https://www.synology.com/en-us/dsm/feature/file_sharing) and read/write permissions on the specific [shared folder](https://kb.synology.com/en-us/DSM/help/DSM/AdminCenter/file_share_desc).

### If you utilize 2-Step Verification or Two Factor Authentication (2FA) with your Synology NAS

If you have the "Enforce 2-step verification for the following users" option checked under **Control Panel > Security > Account > 2-Factor Authentication**, you'll need to configure the 2-step verification/one-time password (OTP) for the user you just created before the credentials for this user will work with Home Assistant.

Make sure to log out of your "normal" user's account and then login with the separate user you created specifically for Home Assistant. DSM will walk you through the process of setting up the one-time password for this user which you'll then be able to use in Home Assistant's frontend configuration screen.

{% note %}
If you denied access to all locations and applications it is normal to receive a message indicating you do not have access to DSM when trying to login with this separate user. As noted above, you do not need access to the DSM and Home Assistant will still be able to read statistics from your NAS.
{% endnote %}

## Backup location

The NAS can also be used as a {% term backup %} location, without the need to add the NAS as a network drive to Home Assistant (_this requires DSM 6.0 and higher_). For this you need to setup the correct permissions for the user (_see [Separate User Configuration](#separate-user-configuration) above_), afterwards, you will be able to select the shared folder and define a relative path to be used as a backup location in the integration options ({% my integrations title="**Settings** > **Devices & services**" %} > **Synology DSM** > _select the instance_ > **Configure**)

{% important %}

Don't manually delete or rename the files in the backup path on the NAS. This could result in the backups no longer being able to be read or restored.

{% endimportant %}

### Example

Assume there is a shared folder called `HA Backup`, with two directories in it `productive_instance` and `test_instance`.

<img src="/images/integrations/synology_dsm/synology_file_station.png" />

#### Use an existing path

1. Select `HA Backup` as shared folder.
2. Define `productive_instance` as backup path (_without trailing slash_).
    - **Result**: The existing `productive_instance` will be used as backup location.

#### Use a non-existing path

1. Select `HA Backup` as a shared folder.
2. Define `cottage_instance` as backup path (_without trailing slash_).
    - **Result**: A new directory `cottage_instance` will be created on the shared folder `HA Backup` during the first backup.

{% important %}

Sub-directories in the backup path need to be separated by the regular slash `/`. For example: `home-assistant/prod_instance`.

{% endimportant %}

## Sensors

### CPU utilization sensors

Entities reporting the current and combined CPU utilization of the NAS. There are sensors that report the current CPU load separated by User, System, and others. By default only the User sensor is enabled.

There are also combined CPU load sensors. These report the total CPU load for the entire NAS. Available as current, 1min, 5min and 15min load sensors. By default the 1min load sensor is disabled.

### Memory utilization sensors

Entities reporting the current and combined memory and swap utilization of the NAS. These sensors include the total installed amount, the currently free amount, and the % of memory used.

### Network sensors

Entities reporting the current network transfer rates of the NAS. Both upload and download sensors are available.

### General sensors

Entities reporting the internal temperature and the uptime of the NAS. The uptime sensor is disabled by default.

### Disk sensors

Entities reporting the internal temperature, status (as shown in Synology DSM) and SMART status for each drive inside the NAS. The SMART status sensor is disabled by default.

### Volume sensors

Entities reporting status, total size (TB), used size (TB), % of volume used, average disk temperature and maximum disk temperature for each volume inside the NAS. By default the total size and maximum disk temperature sensors are disabled.

## Binary sensors

### General sensors

Entity reporting the security status of the NAS.

{% note %}
The security status corresponds with the analysis of the DSM Security Advisor, e.g., an `outOfDate` state for the `Update` attribute not only reflects the update status of the installed DSM version but also the status of the installed DSM packages.
{% endnote %}

### Disk sensors

Similar to the [normal disk sensors](#disk-sensors), there are binary sensors reporting each drive's status. These sensors report if a drive has exceeded the maximum threshold for detected bad sectors and if a drive has dropped below the threshold for its remaining life.

## Switch

A switch is available to enable/disable the [Surveillance Station](https://www.synology.com/surveillance) Home mode.

## Cameras

For each camera added in [Surveillance Station](https://www.synology.com/surveillance) a camera will be created in Home Assistant.

## Buttons

### Button `reboot`

Reboot the NAS.

### Button `shutdown`

Shutdown the NAS.

## Media source

A media source is provided for your [Synology Photos](https://www.synology.com/en-global/dsm/feature/photos).

The media source URIs will look like `media-source://synology_dsm/<unique_id>/<album_id>/<image>`.

This media browser supports multiple Synology Photos instances. `<unique_id>` is the Home Assistant ID for the NAS (_usually the serial number of the NAS_). You can find this id when using the media browser by hovering over the NAS name. It will show the simple name followed by the unique id ex: `192.168.0.100:5001 - 18C0PEN253705`.

To find the `<album_id>` you need to go to the album in your photos instance, and the id will be in the URL ex: `https://192.168.0.100:5001/#/album/19`, where 19 is the album id. An `<album_id>` of 0 will contain all images.

For performance reasons, a maximum of 1000 images will be shown in the Media Browser.
