## Backups

It is important to regularly back up your Home Assistant setup. You may have spent many hours configuring your system and creating automations. Keep your configurations safe so that you can [restore](#restoring-a-backup) a system or migrate your Home Assistant to new hardware.

Backups are encrypted and stored in a compressed archive file (.tar) and by default, stored locally in the `/backup` directory.

A full backup includes the following directories:

- `config`
- `share`
- `addons` (only manually installed or created add-ons, not those installed from the store)
- `ssl`
- `media`

A partial backup consists of any number of the above default directories and installed add-ons.

### Preparing for a backup

Before creating a backup, check if you can reduce the size of the backup. This is especially important if you want to use the backup to migrate the system to new hardware, for example from a Raspberry Pi Compute Module&nbsp;4 to a Raspberry Pi Compute Module&nbsp;5.

1. Check if your configuration directory contains a large database file:
   - Go to {% my system_health title="**Settings** > **System** > **Repairs**" %}.
   - From the three dots {% icon "mdi:dots-vertical" %} menu, select **System information** and under the **Recorder** section, look for the **Estimated Database Size (MiB)**.
   - By default, the data is kept for 10 days. If you have modified that to a longer period, check the [`recorder`](/integrations/recorder/) integration page for options to keep your database data down to a size that won't cause issues.
   - Note the keep days, purge interval, and include/exclude options.
2. To check how much space you've used in total, go to {% my system_health title="**Settings** > **System** > **Repairs**" %}.
   - From the three dots {% icon "mdi:dots-vertical" %} menu, select **System information**, and check under **Home Assistant Supervisor** > **Disk used**.
   - If you have add-ons installed that you no longer use, uninstall those add-ons. Some add-ons require quite a bit of space.
3. If you want to store the backup on your network storage instead of just locally on your system, follow the steps on [adding a new network storage](/common-tasks/os/#add-a-new-network-storage) and select the **Backup** option.

### Setting up an automatic backup process

The automatic backup process creates a backup on a predefined schedule and also deletes old, redundant backups.

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}.
2. Under **Set up backups**, select **Set up backups**.
3. Download the emergency kit and store it somewhere safe.
   - You need it to restore encrypted backups.
   - To learn more about backup encryption, refer to the documentation on the [backup emergency kit](/more-info/backup-emergency-kit/).
4. Define the backup schedule.
   - It is recommended to back up **Daily**, but you can also choose to back up on specific days.
   - Define the time:
     - **System optimal** sets a time in a predefined time window as shown in the UI.
     - **Custom** lets you pick the time when you want the backup to start.
     - Make sure you pick a time when all your backup locations are up and running and available. Otherwise, the backup will fail for locations which are not available.
5. Define how many backups you want to keep.
   - Older backups will be automatically deleted.
   - For example: if you back up daily, and select 7 backups, then the backup from 8 days ago and older will be deleted.
6. Define the data you want to back up.
   - It is recommended to disable media and the shared folder to reduce the size of the backup.
   - A large backup also takes longer to restore.
   - Some add-ons may also be quite large.
7. [Define the location for backups](#defining-backup-locations).

### Defining backup locations

You might need a backup in case your system has crashed. If you only store backups on the device itself, you won't be able to access them easily. It is recommended to keep a copy on another system (outside of Home Assistant) and ideally also one off-site.

{% note %}
You will find an overview of integrations which provide a backup location [here](/integrations/#backup).
{% endnote %}

#### About the backup storage on Home Assistant Cloud

If you have Home Assistant Cloud, you can store a backup of maximum 5&nbsp;GB on Home Assistant Cloud. This cloud storage space is available for all existing and new Home Assistant Cloud subscribers without additional cost. It stores one backup file: the backup that was last saved to Home Assistant Cloud. These backups are always encrypted. To restore encrypted backups, you need the encryption key stored in the [backup emergency kit](/more-info/backup-emergency-kit/).

#### To define the backup location for automatic backups

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %} and under **Automatic backups**, select **Configure automatic backups**.
2. Under **Locations**, use the toggle to enable all the backup locations you want to use.
   - If you don't see Home Assistant Cloud in the list, you are not [logged in](https://www.nabucasa.com/config/).
   - If you want to back up to your NAS (such as [Synology](/integrations/synology_dsm/#backup-location)) or a cloud provider (such as [Google Drive](/integrations/google_drive/) or [Microsoft OneDrive](/integrations/onedrive/)), check their integration documentation for specific instructions on setting up a Home Assistant backup.
   - If you don't see a network storage, you haven't added one. Follow the steps on [adding a new network storage](/common-tasks/os/#add-a-new-network-storage) and select the **Backup** option.
   ![Define the backup locations](/images/screenshots/network-storage/backup_locations_encryption.png)
3. For each enabled location, select the cog {% icon "mdi:cog-outline" %} to enable/disable encryption.
   - **Info**: The backup stored on Home Assistant Cloud is always encrypted.

### Creating a backup automation using the backup action

If the backup automation settings provided in the UI do not match your use case, you can manually configure your own backup automation using the [backup.create_automatic](/integrations/backup/#action-backupcreate_automatic) action.

Using the {% my developer_call_service service="backup.create_automatic" %} action in your own automation allows you to create automated backups on any schedule you like, or even add conditions and actions around it. For example, you could make an automation that triggers on a calendar, turns on your NAS, waits until it is online, and then triggers a backup.

### Creating a manual backup

This creates a backup instantly. You can create a manual backup at any time, irrespective of any automatic backups you may have defined.

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}.
2. In the lower-right corner, select **Backup now** and select **Manual backup**.
3. Define the data you want to back up.
   - It is recommended to disable media and the share folder to reduce the size of the backup.
   - A large backup also takes longer to restore.
   - Some add-ons may also be quite large.
4. Provide a name for the backup.
5. Choose the backup locations.
   - To learn more about the locations, refer to the section on [defining the backup location](#defining-backup-locations).
6. Download the [backup emergency kit](/more-info/backup-emergency-kit/) and store it somewhere safe. Make sure you take note of the backup name it belongs to.
7. To start the backup process, select **Create backup**.

### Downloading your local backups

When downloading the backup from the Home Assistant backup page, it is decrypted on the fly so that you can view the data using your favorite archive tool. This is done for all backup locations and also when you download from Home Assistant Cloud.

There are multiple ways to download your local backup from your Home Assistant instance and store it on another device:

**Option 1**: Download from the backup page:

1. Under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, select **Show all backups**.
2. To select multiple backups, select the {% icon "mdi:order-checkbox-ascending" %} button.
3. Select the three dots {% icon "mdi:dots-vertical" %} menu and select **Download backup**.
   - **Result**: The selected backup is stored in the **Downloads** folder of your computer.
4. If a backup is stored on multiple locations, you can select where you download it from:
   - Select the backup, and under **Locations**, select the three dots {% icon "mdi:dots-vertical" %} and select **Download from this location**.

**Option 2**: Copy backups from the backups folder:

1. If you haven't already done so, [configure access to files on Home Assistant](/common-tasks/{{page.installation}}/#configuring-access-to-files), using one of the methods listed there.
   - For example, [use the samba add-on](/common-tasks/{{page.installation}}/#installing-and-using-the-samba-add-on).
2. In your file explorer, access Home Assistant, open the `backup` folder and copy the file to your computer.

### Downloading a backup from Home Assistant Cloud

If you were logged in to Home Assistant Cloud and had Cloud backup enabled when creating a backup, your last backup is stored on Home Assistant Cloud.

There are two ways to download the backup from Home Assistant Cloud:

- **Option 1**: From the backups page
  1. Got to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %} and select **Show all backups**.
  2. Under **Stored files**, you can see the latest available backup file. Select the download button.

- **Option 2**: From your Home Assistant Cloud account
  1. Log in to your [Home Assistant Cloud account](https://account.nabucasa.com/).
  2. Select the backup from the list.
  3. Under **Locations**, select the three dots {% icon "mdi:dots-vertical" %} and select **Download from this location**.

### Deleting obsolete backups

If you defined an automatic backup and backup purge schedule, old backups are deleted automatically. However, you might still have some old backups around that you want to delete.

To delete old backups, follow these steps:

1. Under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, select **Show all backups**.
2. To delete one backup, on the list, select the backup of interest.
   - Select the three dots {% icon "mdi:dots-vertical" %} menu and select **Delete**.
3. To delete multiple backups, select the {% icon "mdi:order-checkbox-ascending" %} button.
   - From the list of backups, select all the ones you want to delete and select **Delete selected**.
   - {% icon "mdi:information-outline" %} Consider keeping at least one recent backup for recovery purposes.

### Restoring a backup

There are two ways to use a backup:

- On your current system to recover your settings.
- During onboarding, to migrate your setup to a new device or to device on which you performed a factory reset.

#### Estimated duration

The time it takes to restore a backup depends on your installation. Home Assistant Core and all add-ons are being reinstalled. For a larger installation, this process can take about 45 minutes.

#### Restoring a backup during onboarding

You can use a backup during the onboarding process to restore your configuration.

**Migration**: This procedure also works if you want to migrate from one device to another. In that case, use the backup of the old device on the new device. The target device can be a different device type. For example, you can migrate from a Raspberry&nbsp;Pi to another device.

##### Prerequisites

- This procedure assumes you have already completed the [installation](/installation/) procedure on your target device and are now viewing the welcome screen as part of the [onboarding](/getting-started/onboarding/).
- The login credentials of the device from which you made the backup.
- The [backup emergency kit](/more-info/backup-emergency-kit/) that contains the key needed to decrypt the backup.
- **Required storage capacity**: If you migrate the installation to a new device, make sure the new device has more storage capacity than the existing device.
  - Before migrating, on the old system, check how much storage you used.
  - Go to **{% my system_health title="Settings > System > Repairs > ... > System Information" %}**, and under **Home Assistant Supervisor**, look at the **Disk used** value.
    - The target device must have more free space than the source device.
    - If your target device is a Home Assistant Yellow, note that it is the size of the eMMC that is relevant.
    - The restore process mainly uses the eMMC, not the NVMe.
    - The size of the backup file is no indication of the size of your installation. To know the size of your installation, you need to check the **Disk used** value mentioned above.
- If you are migrating to a new device:
  - You do not need to transfer the backup to a USB or SD card to bring it to your device.
  - You will be able to upload the backup file from the device you are accessing the onboarding from.

##### To restore a backup during onboarding

1. If you are migrating to a new device and you had controllers or radios connected (such as a Z-Wave stick or Connect&nbsp;ZBT-1):
   - make sure to plug them into the new device.
2. After Home Assistant has been installed, on the welcome screen, select **Restore from backup**.
   - Then, select **Upload backup**.
   - The file explorer opens on the device on which you are viewing the Home Assistant User interface.
   - You can access any connected network drive from there.
3. Select the backup file, then, in the dialog, select all parts you want to restore.
   - Your current system will be overwritten with the parts that you choose to restore.
   - If you want to restore the complete configuration with all directories and add-ons, select everything.
4. Under **Backup password**, enter the encryption key stored in the [backup emergency kit](/more-info/backup-emergency-kit/).
5. To start the process, select **Restore**.
   - The restore may take a while, depending on the amount of data.
   - To see if the restore is complete, reload the page from time to time.
   - If your previous installation had certificates enabled directly for the [`http` integration](/integrations/http), when the restore is complete, it will no longer respond to `http://` requests. In this case, use `https://` (added `s`) instead.
6. On the login screen, enter the credentials of the system from which you took the backup.
   - The login password and username must match the ones you used at the time the backup was taken.
   - Your dashboard should show all the elements as they were when you created the backup.
   - If some devices are shown as unavailable, you may need to wake the battery-powered devices.
7. If you had [network storage](/common-tasks/os/#network-storage) connected on the previous system, you may need to reconnect those.
8. If you had Zigbee devices, and you migrated to a new device with its own Zigbee radio built-in:
   - Because this is now a different Zigbee radio, you need to [migrate Zigbee](/integrations/zha/#migrating-to-a-new-zigbee-coordinator-adapter-inside-zha).

#### To restore a backup on your current system

1. Go to **{% my backup title="Settings > System > Backups" %}**.
2. From the list of backups, select the backup from which you want to restore.
3. Select what to restore:
   - Your current system will be overwritten with the parts that you choose to restore.
   - If you want to restore the complete configuration with all directories and add-ons, select everything.
   - If you only want to restore specific elements, only select the folders and add-ons you want to restore.
4. Select **Restore**.
   - This may take a while, depending on how much there is to compress or decompress.
5. Once the restore is complete, Home Assistant restarts to apply the new settings.
   - You will lose the connection to the UI and it will return once the restart is completed.
6. On the login screen, enter the password and username as they were at the time the backup was taken.
