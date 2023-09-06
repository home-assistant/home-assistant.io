## Backups

Backup of your Home Assistant and add-on data and configuration. They are stored in a compressed archive file (.tar). Backups are made from the backups panel under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}. There is also a service available that allows you to trigger the creation of a backup from an automation. By default, backups are stored locally in the `/backup` directory.

A full backup includes the following directories:

- `config`
- `share`
- `addons` (only manually installed or created add-ons, not those installed from the store)
- `ssl`
- `media`

A partial backup consists of any number of the above default directories and installed add-ons.

### Making a backup from the UI

1. Go to {% my supervisor_backups title="**Settings** > **System** > **Backups**" %} in the UI.
2. Select the **Create backup** button in the lower right.
3. Provide a name for the backup.
4. Choose full or partial.
5. Optionally, enable password protection.
6. Select **Create** to begin the backup.

### Alternative: Creating a backup using the Home Assistant Command Line Interface

1. `ha backups list` - lists backups and their slugnames
2. `ha backups restore slugname` - restores a specific backup
3. `ha backups new --name nameofbackup` - create a backup

Use `ha help` to get more information about the command line usage.

### Copying your backups to another location

You might need a backup in case your system has crashed. If you only store them on the device itself, you won't be able to access them easily. We recommend that you copy them from `/backup` to another machine on occasion.

There are multiple ways to store the backup on another device:

- **Option 1**: Under {% my supervisor_backups title="**Settings** > **System** > **Backups**" %}, select the backup from the list.
  - In the dialog, select the three dots menu and select **Download backup**.
  - **Result**: The selected backup is stored in the **Downloads** folder of your computer.
- **Option 2**: If you haven't already done so, [configure access to files on Home Assistant](/common-tasks/os/#configuring-access-to-files), using one of the methods listed there.
  - For example, [use the samba add-on](/common-tasks/os/#installing-and-using-the-samba-add-on).
  - In your file explorer, access Home Assistant, open the `backup` folder and copy the file to your computer.
- **Option 3**: You can also change the default location for backups:
  - [Add a network storage location](/common-tasks/os/#network-storage) for backups.
  - [Change the default location](/common-tasks/os/#change-default-backup-location) for backups.

- **Option 4**: Or even better, create an automation to handle that.
- **Option 5**: Make use of a third-party add-on:
  - [Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup)
  - [Dropbox Sync](https://github.com/danielwelch/hassio-dropbox-sync)
  - [OneDrive Backup](https://github.com/lavinir/hassio-onedrive-backup)
  - [Nextcloud Backup](https://github.com/Sebclem/hassio-nextcloud-backup)
  - [Remote Backup (scp/rsync/rclone)](https://github.com/ikifar2012/remote-backup-addon)
  - [Samba backup](https://github.com/thomasmauerer/hassio-addons/tree/master/samba-backup)
  - [Syncthing](https://github.com/Poeschl/Hassio-Addons/tree/main/syncthing)

### Restoring a backup

You can make use of backup which you have copied off of a previous install to restore to a new installation during the onboarding process. Follow the link at the bottom of the account creation page to upload your backup from the previous installation.

For restoring a backup at any other time, visit the Supervisor backup panel in your UI and use the following steps:

1. Select "Upload Backup" from the icon in the upper right of the page.
2. Click on the folder icon to navigate to your backup .tar file and select it.

When the upload is completed, you will be presented with the backup restore dialog for restoring it, and can then choose to restore in full or in part by manually selecting individual items.

If the backup you are uploading is more than 1GB in size, it can be faster and more efficient to make use of the Samba add-on in order to transfer files to the `/backup` directory.

The length of time it takes to create or restore backup will depend on how much you have to compress or decompress.

If you're looking to slim down your backup, check if your configuration directory contains a large database file (`home-assistant_v2.db`). See the [`recorder`](/integrations/recorder/) integration page for options to keep your database data down to a size that won't cause issues. Note the keep days, purge interval, and include/exclude options.

When the restore is complete, Home Assistant will restart to apply the new settings. You will lose the connection to the UI and it will return once the restart is completed.
