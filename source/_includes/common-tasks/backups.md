## Backups

It is important to regularly back up your Home Assistant setup. You may have spent many hours configuring your system and creating automations. Keep your configurations safe so that you can [restore](#restoring-a-backup) a system or migrate your Home Assistant to new hardware.

Backups are encrypted by default and stored in a compressed archive file (.tar). Home Assistant stores them locally by default. On Home Assistant OS, they are in the `/backup` folder. On Home Assistant Container, they are in the `backups` folder of your configuration directory.

On Home Assistant OS, a full backup includes the following folders:

- `config`
- `share`
- `addons` (only manually installed or created apps, not those installed from the store)
- `ssl`
- `media`

A partial backup consists of any number of the above default directories and installed apps.

On Home Assistant Container, a backup contains the Home Assistant settings and, if you choose, the history. Apps, the media and share folders, and network storage are only available on Home Assistant OS.

### Preparing for a backup

Before creating a backup, check if you can reduce the size of the backup. This is especially important if you want to use the backup to migrate the system to new hardware, for example from a Raspberry Pi Compute Module&nbsp;4 to a Raspberry Pi Compute Module&nbsp;5.

1. Check if your configuration directory contains a large database file:
   - Go to {% my system_health title="**Settings** > **System** > **Repairs**" %}.
   - From the three dots {% icon "mdi:dots-vertical" %} menu, select **System information** and under the **Recorder** section, look for the **Estimated database size (MiB)**.
   - By default, the data is kept for 10 days. If you have modified that to a longer period, check the [`recorder`](/integrations/recorder/) integration page for options to keep your database data down to a size that won't cause issues.
   - Note the `purge_keep_days` option, and the include and exclude options.
2. On Home Assistant OS, to check how much space you've used in total, go to {% my system_health title="**Settings** > **System** > **Repairs**" %}.
   - From the three dots {% icon "mdi:dots-vertical" %} menu, select **System information**, and check under **Home Assistant Supervisor** > **Disk used**.
   - If you have apps installed that you no longer use, uninstall those apps. Some apps require quite a bit of space.
3. If you want to store the backup on your network storage instead of just locally on your system, follow the steps on [adding a new network storage](/common-tasks/os/#add-a-new-network-storage) and select the **Backup** option.

### Setting up an automatic backup process

The automatic backup process creates a backup on a schedule and also deletes old automatic backups.

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}.
2. On the **Set up backups** card, select **Set up backups**.
   - Result: The **Encryption key** step opens.
3. Under **Download emergency kit**, select **Download**, and store the file somewhere safe.
   - You need the encryption key in the emergency kit to restore your backups.
   - To learn more about backup encryption, refer to the documentation on the [backup emergency kit](/more-info/backup-emergency-kit/).
4. Select **Next**.
5. Choose how to set up your automatic backups:
   - To use the recommended settings, select **Recommended**. Home Assistant backs up everything daily, except media, the share folder, and the local apps folder, and keeps the last 3 backups. It stores the backups on this system, and on Home Assistant Cloud if you are logged in.
     - Result: Home Assistant saves the settings and creates the first backup. You're done.
   - To choose your own settings, select **Custom**, and continue with the next step.
6. On the **Automatic backups** step, define the schedule:
   - Under **Schedule**, select **Daily**, or select **Custom days** to back up on specific days.
   - Under **Time**, select **System optimal** to let Home Assistant pick a time after it cleans up its database. To pick the time yourself, select **Custom**.
     - Make sure you pick a time when all your backup locations are available. Otherwise, the backup fails for the locations that aren't available.
   - Under **Retention**, define how many backups to keep, or for how many days.
     - Older automatic backups are deleted. For example: if you back up daily and keep 7 backups, the backups that are older than 7 days are deleted.
     - These retention settings do not delete manual backups. However, Home Assistant Cloud replaces its previous backup whenever a new backup is uploaded, even if the previous backup was created manually.
     - On Home Assistant OS, app update backups have their own limit. By default, Home Assistant keeps one backup per app. To change this, select the **App update backup** card on the backups page.
   - Select **Next**.
7. On the **Backup data** step, define the data you want to back up, and select **Next**.
   - It is recommended to leave out media and the share folder to reduce the size of the backup.
   - A large backup also takes longer to restore.
   - Some apps may also be quite large.
8. On the **Locations** step, turn on the locations where you want to store your backups.
   - To learn more about the locations, refer to the section on [defining backup locations](#defining-backup-locations).
9. Select **Save and create backup**.
   - Result: Home Assistant saves the settings and creates the first backup.

To change these settings later, go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, and on the **Automatic backup** card, select **Configure backup settings**. On Home Assistant OS, this page also has **Backup preference when updating**. It defines whether Home Assistant creates a backup before an update. You can change this each time you update.

To download the emergency kit again, or to show or change your encryption key, use the **Encryption key** card on the backups page.

### Defining backup locations

You might need a backup in case your system has crashed. If you only store backups on the device itself, you won't be able to access them easily. It is recommended to keep a copy on another system (outside of Home Assistant) and ideally also one off-site.

{% note %}
You will find an overview of integrations which provide a backup location [here](/integrations/#backup).
{% endnote %}

#### About the backup storage on Home Assistant Cloud

If you have Home Assistant Cloud, you can store a backup of maximum 5&nbsp;GB on Home Assistant Cloud. This cloud storage space is available for all existing and new Home Assistant Cloud subscribers without additional cost. It stores one backup file: the backup that was last saved to Home Assistant Cloud. These backups are always encrypted. To restore encrypted backups, you need the encryption key stored in the [backup emergency kit](/more-info/backup-emergency-kit/).

#### To define the backup location for automatic backups

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, and on the **Automatic backup** card, select **Configure backup settings**.
2. Under **Locations**, turn on all the backup locations you want to use.
   - If you don't see Home Assistant Cloud in the list, you are not [logged in](https://www.nabucasa.com/config/).
   - If you want to back up to your NAS (such as [Synology](/integrations/synology_dsm/#backup-location)) or a cloud provider (such as [Google Drive](/integrations/google_drive/) or [Microsoft OneDrive](/integrations/onedrive/)), check their integration documentation for specific instructions on setting up a Home Assistant backup.
   - If you don't see a network storage, you haven't added one. Follow the steps on [adding a new network storage](/common-tasks/os/#add-a-new-network-storage) and select the **Backup** option.
   ![Define the backup locations](/images/screenshots/network-storage/backup_locations_encryption.png)
3. To change the encryption or the retention of a location, select the cog {% icon "mdi:cog" %} next to it.
   - Under **Encryption**, select **Turn off** or **Turn on**. Backups on Home Assistant Cloud are always encrypted.
   - Under **Retention for this system**, or the retention for another location, select **Use global settings**, or set a retention for this location only. Home Assistant Cloud always keeps only one backup.

### Creating a backup automation using the backup action

If the backup automation settings provided in the UI do not match your use case, you can manually configure your own backup automation using the [`backup.create_automatic`](/actions/backup.create_automatic/) action.

Using the {% my tools_perform_action service="backup.create_automatic" %} action in your own automation allows you to create automated backups on any schedule you like, or even add conditions and actions around it. For example, you could make an automation that triggers on a calendar, turns on your NAS, waits until it is online, and then triggers a backup.

### Creating a manual backup

This creates a backup instantly. You can create a manual backup at any time, irrespective of any automatic backups you may have defined.

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}.
2. In the lower-right corner, select **Backup now**.
   - If you haven't set up backups yet, the setup opens instead. Follow the steps on [setting up an automatic backup process](#setting-up-an-automatic-backup-process).
3. Select **Manual backup**.
4. On the **Backup data** step, define the data you want to back up, and select **Next**.
   - It is recommended to leave out media and the share folder to reduce the size of the backup.
   - A large backup also takes longer to restore.
   - Some apps may also be quite large.
5. On the **Synchronization** step, enter a **Backup name**, and choose the **Locations**.
   - To learn more about the locations, refer to the section on [defining backup locations](#defining-backup-locations).
   - To store the backup on Home Assistant Cloud, include the Home Assistant settings in the backup data.
6. To start the backup process, select **Create backup**.

### Downloading your local backups

When you download a backup from the Home Assistant backup page, it is decrypted on the fly, so that you can view the data using your favorite archive tool. This works for all backup locations, including Home Assistant Cloud, if the backup uses your current encryption key. If the backup uses a different key, Home Assistant asks for that key. You can also download the backup encrypted.

There are multiple ways to download your local backup from your Home Assistant instance and store it on another device:

**Option 1**: Download from the backup page:

1. Under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, select **Show all backups**.
2. In the list, on the row of the backup you want to download, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Download**.
   - Result: The backup is stored in the **Downloads** folder of your computer.
3. If a backup is stored on multiple locations, you can select where you download it from:
   - Select the backup, and under **Locations**, select the three dots {% icon "mdi:dots-vertical" %} and select **Download from this location**.

**Option 2**: On Home Assistant OS, copy backups from the backup folder:

1. If you haven't already done so, [configure access to files on Home Assistant](/common-tasks/os/#configuring-access-to-files), using one of the methods listed there.
   - For example, [use the samba app](/common-tasks/os/#installing-and-using-the-samba-app).
2. In your file explorer, access Home Assistant, open the `backup` folder and copy the file to your computer.

### Downloading a backup from Home Assistant Cloud

If you were logged in to Home Assistant Cloud and had Cloud backup enabled when creating a backup, your last backup is stored on Home Assistant Cloud.

There are two ways to download the backup from Home Assistant Cloud:

- **Option 1**: From the backups page
  1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %} and select **Show all backups**.
  2. Select the backup from the list.
  3. Under **Locations**, select the three dots {% icon "mdi:dots-vertical" %} and select **Download from this location**.

- **Option 2**: From your Home Assistant Cloud account
  1. Log in to your [Home Assistant Cloud account](https://account.nabucasa.com/).
  2. Under **Stored files**, you can see the latest available backup file. Select the **Download** button.

### Deleting obsolete backups

If you defined a retention for automatic backups, old automatic backups are deleted automatically. The retention doesn't delete manual backups, so you might still have some old backups around that you want to delete. Home Assistant Cloud is an exception: it only keeps the last backup that was uploaded to it, also if that's a manual backup.

To delete old backups, follow these steps:

1. In Home Assistant, under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, select **Show all backups**.
2. To **delete one backup**: from the list, select the backup of interest.
   - Select the three dots {% icon "mdi:dots-vertical" %} menu and select **Delete**.
3. To **delete multiple backups**: select the {% icon "mdi:format-list-checks" %} **Enter selection mode** button.
   - From the list of backups, select all the ones you want to delete and select **Delete selected**.
   - {% icon "mdi:information-outline" %} Consider keeping at least one recent backup for recovery purposes.
4. To **delete a backup that is stored on Home Assistant Cloud**, you have 2 options:
   - **Option 1**: Trigger backup deletion from within Home Assistant
     - Follow steps 1 and 2 from above.
     - When you select **Delete** in Home Assistant, the backup is deleted from all its locations, including Home Assistant Cloud.
   - **Option 2**: Delete the backup from the Nabu Casa account page.
     - Log in to your [Nabu Casa account](https://account.nabucasa.com/).
     - Under **Backups**, delete the backup.

### Restoring a backup

There are two ways to use a backup:

- On your current system to recover your settings.
- During onboarding, to migrate your setup to a new device or to a device on which you performed a factory reset.

#### Estimated duration

The time it takes to restore a backup depends on your installation. Home Assistant Core and all apps are being reinstalled. For a larger installation, this process can take about 45 minutes.

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

1. If you are migrating to a new device and you had controllers or radios connected (such as a Z-Wave stick or a Connect&nbsp;ZBT-2):
   - make sure to plug them into the new device.
2. You can either restore a backup from your local machine or a backup stored on Home Assistant Cloud:
   - **Option 1**: restoring from a local backup.
     - On the welcome screen, select **Upload backup**.
     - Select **Select backup file**.
       - The file explorer opens on the device on which you are viewing the Home Assistant User interface.
       - You can access any connected network drive from there.
     - Select the backup file.
   - **Option 2**: restoring from a Home Assistant Cloud backup.
     - On the welcome screen, select **Home Assistant Cloud**.
     - Sign in to Home Assistant Cloud.
3. In the dialog, select all the parts you want to restore.
      - Your current system will be overwritten with the parts that you choose to restore.
      - If you want to restore the complete configuration with all directories and apps, select everything.
4. Enter the encryption key stored in the [backup emergency kit](/more-info/backup-emergency-kit/).
5. To start the process, select **Restore backup**.
   - The restore may take a while, depending on the amount of data.
   - Don't refresh the page. Just wait.
     - If you refresh the page, you will see a "Not found" message. This is because the system is shutdown, wiped, and reinstalled from the backup. During that time, it won't be reachable.
   - If your previous installation had certificates enabled directly for the [`http` integration](/integrations/http), when the restore is complete, it will no longer respond to `http://` requests. In this case, use `https://` (added `s`) instead.
6. On the login screen, enter the credentials of the system from which you took the backup.
   - The login password and username must match the ones you used at the time the backup was taken.
   - Your dashboard should show all the elements as they were when you created the backup.
   - If some devices are shown as unavailable, you may need to wake the battery-powered devices.
7. If you had [network storage](/common-tasks/os/#network-storage) connected on the previous system, you may need to reconnect those.
8. If you had Zigbee devices, and you migrated to a new device with its own Zigbee radio built-in:
   - Because this is now a different Zigbee radio, you need to [migrate Zigbee](/integrations/zha/#migrating-to-a-new-zigbee-adapter-inside-zha).

#### To restore a backup on your current system

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, and select **Show all backups**.
   - To restore a backup file from your computer, first upload it: select the three dots {% icon "mdi:dots-vertical" %} menu, select **Upload backup**, and then **Select backup file**. Select the file, and then select **Upload backup**.
2. From the list of backups, select the backup from which you want to restore.
3. Under **Select what to restore**, select the parts you want to restore:
   - Your current system will be overwritten with the parts that you choose to restore.
   - If you want to restore the complete configuration with all directories and apps, select everything.
   - If you only want to restore specific elements, only select the folders and apps you want to restore.
4. Select **Restore**.
   - Result: The **Restore backup** dialog opens.
   - If the backup uses a different encryption key than the one on this system, enter that key.
   - To start the restore, select **Restore**.
   - This may take a while, depending on how much there is to compress or decompress.
5. Once the restore is complete, Home Assistant restarts to apply the new settings.
   - You will lose the connection to the UI and it will return once the restart is completed.
6. On the login screen, enter the password and username as they were at the time the backup was taken.
