## Backups

Backup of your Home Assistant, add-on data, and configuration. Backups are used to [restore](#restoring-a-backup) a system or parts of it if a rollback is needed or to migrate your Home Assistant to new hardware. It is good practice to create a backup before updating.

Backups are made from the backups panel under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}. There is also an [action](/integrations/hassio/#action-hassiobackup_full) available that allows you to trigger the creation of a backup from an automation. Backups are stored in a compressed archive file (.tar) and by default, stored locally in the `/backup` directory. 

A full backup includes the following directories:

- `config`
- `share`
- `addons` (only manually installed or created add-ons, not those installed from the store)
- `ssl`
- `media`

A partial backup consists of any number of the above default directories and installed add-ons.

### Preparing for a backup

1. Before creating a backup, check if you can reduce the size of the backup.
   - Check if your configuration directory contains a large database file. Go to **{% my system_health title="Settings > System > Repairs" %}**. From the three dot menu, select **System information** and under the **Recorder** section, look for the **Estimated Database Size (MiB)**.
   - By default, the data is kept for 10 days. If you have modified that to a longer period, check the [`recorder`](/integrations/recorder/) integration page for options to keep your database data down to a size that won't cause issues.
   - Note the keep days, purge interval, and include/exclude options.
   - If you have add-ons installed that you no longer use, uninstall those add-ons. Some add-ons require quite a bit of space.
2. Old backups are not included in the backup. However, while you are here, you could delete all old and unneeded backups.

### Making a backup from the UI

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %} in the UI.
2. Select the **Create backup** button in the lower right.
3. Provide a name for the backup.
4. Choose **Full backup** or **Partial backup**.
   - If you choose **Partial backup**, make sure to select Home Assistant and all the folders and add-ons you want to backup or migrate.
   - Note that the number of add-ons increases the size of the backup as well as the time it takes to restore from that backup.
5. Optionally, enable password protection.
6. Select **Create** to begin the backup.

### Alternative: Creating a backup using the Home Assistant Command Line Interface

1. `ha backups list` - lists backups and their slugnames
2. `ha backups restore slugname` - restores a specific backup
3. `ha backups new --name nameofbackup` - create a backup

For additional information about command line usage, use the `ha help` command or refer to the [Home Assistant Command Line documentation](/common-tasks/os/#home-assistant-via-the-command-line).

### Copying your backups to another location

You might need a backup in case your system has crashed. If you only store them on the device itself, you won't be able to access them easily. We recommend that you copy them from `/backup` to another machine on occasion.

There are multiple ways to store the backup on another device:

- **Option 1**: Under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, on the list, single-click or tap the backup of interest.
  - **Result**: The backup dialog opens.
  - In the dialog, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Download backup**.
  - **Result**: The selected backup is stored in the **Downloads** folder of your computer.
- **Option 2**: If you haven't already done so, [configure access to files on Home Assistant](/common-tasks/{{page.installation}}/#configuring-access-to-files), using one of the methods listed there.
  - For example, [use the samba add-on](/common-tasks/{{page.installation}}/#installing-and-using-the-samba-add-on).
  - In your file explorer, access Home Assistant, open the `backup` folder and copy the file to your computer.
- **Option 3**: You can also change the default location for backups:
  - [Add a network storage location](/common-tasks/{{page.installation}}/#network-storage) for backups.
  - [Change the default location](/common-tasks/{{page.installation}}/#change-default-backup-location) for backups.

- **Option 4**: Or even better, create an automation to handle that, using one of the [backup actions](/integrations/hassio/#action-hassiobackup_full).
- **Option 5**: Make use of a third-party add-on:
  - [Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup)
  - [Dropbox Sync](https://github.com/danielwelch/hassio-dropbox-sync)
  - [OneDrive Backup](https://github.com/lavinir/hassio-onedrive-backup)
  - [Nextcloud Backup](https://github.com/Sebclem/hassio-nextcloud-backup)
  - [Remote Backup (scp/rsync/rclone)](https://github.com/ikifar2012/remote-backup-addon)
  - [Samba backup](https://github.com/thomasmauerer/hassio-addons/tree/master/samba-backup)
  - [Syncthing](https://github.com/Poeschl/Hassio-Addons/tree/main/syncthing)

### Restoring a backup

There are two ways to use a backup:

- On your current system to recover your settings.
- During onboarding, to migrate your setup to a new device or a to device on which you performed a factory reset and a new installation.

#### Estimated duration

The time it takes to restore a backup depends on your installation. Home Assistant Core and all add-ons are being reinstalled. For a larger installation, this process can take about 45 minutes.

#### Restoring a backup during onboarding

You can use a backup during the onboarding process to restore your configuration.

**Migration**: This procedure also works if you want to migrate from one device to another. In that case, use the backup of the old device on the new device. The target device can be a different device type. For example, you can migrate from a Raspberry&nbsp;Pi to another device.

##### Prerequisites

- This procedure assumes you have already completed the [installation](/installation/) procedure on your target device and are now viewing the welcome screen as part of the [onboarding](/getting-started/onboarding/).
- The login credentials of the device from which you made the backup.
- **Required storage capacity**: If you migrate the installation to a new device, make sure the new device has more storage capacity than the existing device.
   - Before migrating, on the old system, check how much storage you used.
     - Go to **{% my system_health title="Settings > System > Repairs -> ... -> System Information" %}**, and under **Home Assistant Supervisor**, look at the **Disk used** value.
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
3. Select the backup file, then, in the dialog, select **Full backup** and **Restore**.
   - The restore may take a while, depending on the amount of data.
   - To see if the restore is complete, reload the page from time to time.
   - If your previous installation had certificates enabled directly for the [`http` integration](/integrations/http), when the restore is complete, it will no longer respond to `http://` requests. In this case, use `https://` (added `s`) instead.
4. On the login screen, enter the credentials of the system from which you took the backup.
   - Your dashboard should show all the elements as they were when you created the backup.
   - If some devices are shown as unavailable, you may need to wake the battery powered devices.
5. If you had [network storage](/common-tasks/os/#network-storage) connected on the previous system, you may need to reconnect those.
6. If you had Zigbee devices, and you migrated to a new device with its own Zigbee radio built-in: 
   - Because this is now a different Zigbee radio, you need to [migrate Zigbee](/integrations/zha/#migrating-to-a-new-zigbee-coordinator-adapter-inside-zha).

#### To restore a backup on your current system

1. Go to **{% my backup title="Settings > System > Backups" %}**.
2. From the list of backups, select the backup from which you want to restore.
3. If you want to restore the complete configuration with all directories and add-ons, select **Full backup**.
4. If you only want to restore specific elements, select **Partial backup**.
   - From the list, select the installation, folders, and add-ons you want to restore.
5. Select **Restore**.
   - This may take a while, depending on how much you have to compress or decompress.
6. Once the restore is complete, Home Assistant restarts to apply the new settings.
   - You will lose the connection to the UI and it will return once the restart is completed.
