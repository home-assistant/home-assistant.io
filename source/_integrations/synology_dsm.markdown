---
title: Synology DSM
description: Instructions on how to integrate the Synology DSM sensor within Home Assistant.
ha_category:
  - Camera
  - Media Source
  - System Monitor
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

The Synology <abbr title="DiskStation Manager">DSM</abbr> integration can be used to backup your Home Assistant configuration. It also provides access to various statistics from your [Synology NAS](https://www.synology.com) (_DSM 5.x and higher_) as well as cameras from the [Surveillance Station](https://www.synology.com/surveillance).

## Getting started

This section describes how to set up the integration in Home Assistant.

### User configuration

Before you can configure the integration, create a dedicated user for Home Assistant on Synology.

1. On Synology, go to **User & Group** and select **Create**.
   - Define the credentials and select **Next**.
   - To assign administrator rights, under **Join groups**, select **administrators**.
     - Due to the nature of the Synology <abbr title="DiskStation Manager">DSM</abbr> API, it is required to grant the user admin rights. This is related to the fact that utilization information is stored in the core module.
2. **Permissions for monitoring**: If you only want to use the integration for monitoring purposes (read the utilization and storage information using the API), you do not need to give any permissions to locations or applications.
   - The user will not be able to login to the web interface or view any of the files on the Synology NAS, but can still receive the monitoring information.
3. **Permissions for folders**: If you want to use Synology for backup or media, and you already have a dedicated folder set up, give the user permissions to that folder.
   - Under **Permissions**, select the folder and select **Read/Write**.
   - For a description on how to create shared a folder for backup, refer to [this procedure](/integrations/synology_dsm/#preparing-synology-dsm-for-use-as-a-backup-location).
4. If you want to add cameras from [Surveillance Station](https://www.synology.com/surveillance), the user needs application permission for [Surveillance Station](https://www.synology.com/surveillance).
   - Check the settings under **Applications**.

#### If you utilize 2-Step Verification or Two Factor Authentication (2FA) with your Synology NAS

If you have the **Enforce 2-step verification for the following users** option checked under **Control Panel** > **User** > **Advanced** > **2-Step Verification**, you'll need to configure the 2-step verification/one-time password (OTP) for the user you just created before the credentials for this user will work with Home Assistant.

Make sure to log out of your "normal" user's account and then login with the separate user you created specifically for Home Assistant. <abbr title="DiskStation Manager">DSM</abbr> will walk you through the process of setting up the one-time password for this user which you'll then be able to use in Home Assistant's frontend configuration screen.

<div class='note'>
If you denied access to all locations and applications it is normal to receive a message indicating you do not have access to <abbr title="DiskStation Manager">DSM</abbr> when trying to login with this separate user. As noted above, you do not need access to the <abbr title="DiskStation Manager">DSM</abbr> and Home Assistant will still be able to read statistics from your NAS.
</div>

{% include integrations/config_flow.md %}

<div class='note warning'>

This sensor will wake up your Synology NAS if it's in hibernation mode.

You can change the scan interval within the configuration options (default is 15 min).

Having cameras or the Home mode toggle from [Surveillance Station](https://www.synology.com/en-us/surveillance) will fetch every 30 seconds. Disable those entities if you don't want your NAS to be fetch as frequently.

</div>

<div class='note'>

If you have two or more <abbr title="network interface card">NIC</abbr>s with different IP addresses from the same subnet and <abbr title="simple service discovery protocol">SSDP</abbr> is activated, this leads to problems with this integration, as the NAS is detected several times with different IPs and the integration always adopts the new "detected" IP address in its configuration and then reloads it.
In this case, it is recommended to use <abbr title="network interface card">NIC</abbr> bonding instead or to deactivate <abbr title="simple service discovery protocol">SSDP</abbr>.

</div>

## Using Synology <abbr title="DiskStation Manager">DSM</abbr> to backup Home Assistant

Before you can store your Home Assistant backup files on Synology, you need to prepare a few things on Synology first. Then you can add Synology as a network storage on Home Assistant.

### Preparing Synology DSM for use as a backup location

Before you can store your Home Assistant backup files on Synology, you need to create a shared folder and grant Home Assistant access to that folder.

1. On Synology, create a shared folder.
   - Go to **Control Panel** > **Shared Folder** and select **Create**.
   - Enter a name for the shared folder and select a location.
     - The number of available volumes depends on how the NAS was setup.
     - Disable the **Recycle Bin** and select **Next**.
     ![Create a shared folder](/images/integrations/synology/synology_set-up_01.png)
    - **Skip** the encryption settings.
    - Confirm your settings.
2. To grant access to the folder, under **Configure user permissions**, enable **Read/Write** permissions for your Home Assistant user.
3. If you want to use the <abbr title="network file system">NFS</abbr> protocol, enable NFS.
   - Go to **Control Panel** > **File Services** and on the **NFS** tab, select **Enable NFS service**. Select **Apply**.
     ![Enable NFS service](/images/integrations/synology/synology_set-up_02.png)
   - On **Shared folder**, select your new folder.
   - Select **NFS Permissions** and select **Create**.
   - Enter the hostname or IP address of your Home Assistant instance and select **Save**.
     ![Edit NFS rules](/images/integrations/synology/synology_set-up_03.png)
   - From the bottom of the screen, copy the **Mount path**.
     ![Define the mount path](/images/integrations/synology/synology_set-up_04.png)
4. The shared folder is now ready to connect to Home Assistant.

### Add the shared folder as network storage in Home Assistant

1. On Home Assistant, go to {% my storage title="**Settings** > **System** > **Storage**" %}.
2. Select **Add Network Storage**.
3. Define the [network storage settings](/common-tasks/os/#add-a-new-network-storage):
   - Enter a name.
   - Select **Backup**.
   - Enter the NAS server hostname or IP address.
   - Select the protocol.
     - If unsure, try **Samba/Windows (<abbr title="common internet file system">CIFS</abbr>)**.
     ![Define the storage settings](/images/integrations/synology/synology_set-up_05.png)
     - If you previously defined the NFS settings (as described in the procedure above), you can also select **Network File Share (NFS)**.
4. Select **Connect**.
5. If this is the first time you've defined a backup location, this shared folder is now your default backup location.
   - If you've used other backup locations before, and you want to use this shared folder instead, [change the backup default location](/common-tasks/os/#change-default-backup-location).

## Sensors

### CPU Utilisation sensors

Entities reporting the current and combined CPU utilization of the NAS. There are sensors the report the current CPU load, separated by User, System and others. By default, only the User sensor is enabled.

There are also combined CPU load sensors. These report the total CPU load for the entire NAS. Available as current, 1min, 5min and 15min load sensors. By default the 1min load sensor is disabled.

### Memory Utilisation sensors

Entities reporting the current and combined memory and swap utilization of the NAS. These sensors include the total installed amount, the currently free amount and the % of memory used. 

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

<div class='note'>

The security status corresponds with the analysis of the DSM Security Advisor, e.g., an `outOfDate` state for the `Update` attribute not only reflects the update status of the installed DSM version but also the status of the installed DSM packages.

</div>

### Disk sensors

Similar to the [normal disk sensors](#disk-sensors), there are binary sensors reporting each drive's status. These sensors report if a drive has exceeded the maximum threshold for detected bad sectors and if a drive has dropped below the threshold for its remaining life.

## Switch

A switch is available to enable/disable the [Surveillance Station](https://www.synology.com/surveillance) Home mode.

## Cameras

For each camera added in [Surveillance Station](https://www.synology.com/surveillance), a camera will be created in Home Assistant.

## Buttons

### Button `reboot`

Reboot the NAS.

### Button `shutdown`

Shutdown the NAS.

## Media Source

A media source is provided for your [Synology Photos](https://www.synology.com/en-global/dsm/feature/photos).

The media source URIs will look like `media-source://synology_dsm/<unique_id>/<album_id>/<image>`.

This media browser supports multiple Synology Photos instances. `<unique_id>` is the Home Assistant ID for the NAS (_usually the serial number of the NAS_). You can find this id when using the media browser, when you hover over the NAS name, you get shown the simple name followed by the unique id ex: `192.168.0.100:5001 - 18C0PEN253705`. 

To find the `<album_id>` you need to go to the album in your photos instance, and the id will be in the URL ex: `https://192.168.0.100:5001/#/album/19`, where 19 is the album id. An `<album_id>` of 0 will contain all images.

For performance reasons, a maximum of 1000 images will be shown in the Media Browser.
