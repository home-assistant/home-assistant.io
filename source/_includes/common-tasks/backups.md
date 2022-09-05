## Backups

Backup of your Home Assistant and add-on data and configuration. They are stored in a compressed archive file (.tar). Backups are made from the Supervisor Backups panel. There is also a service available that allows you to trigger the creation of a backup from an automation. Backups are stored in the `/backup` directory.

A full backup includes the following directories:

* `config`
* `share`
* `addons` (only manually installed or created add-ons, not those installed from the store)
* `ssl`
* `media`

A partial backup consists of any number of the above default directories and installed add-ons.

### Making a Backup from the UI

1. Go to {% my supervisor_backups title="Settings > System > Backups" %} in the UI.
2. Click the **Create backup** button in the lower right.
3. Provide a name for the backup.
4. Choose full or partial.
5. Choose to password protect or not. Password-protected backups cannot easily be browsed outside of Home Assistant OS.
6. Click "Create" to begin the backup.

### Restoring a Backup on a new install

You can make use of backup which you have copied off of a previous install to restore to a new installation during the onboarding process. Follow the link at the bottom of the account creation page to upload your backup from the previous installation.

For restoring a backup at any other time, visit the Supervisor backup panel in your UI and use the following steps:

1. Select "Upload Backup" from the icon in the upper right of the page.
2. Click on the folder icon to navigate to your backup .tar file and select it.

When the upload is completed, you will be presented with the backup restore dialog for restoring it, and can then choose to restore in full or in part by manually selecting individual items.

If the backup you are uploading is more than 1GB in size, it can be faster and more efficient to make use of the Samba add-on in order to transfer files to the `/backup` directory.

The length of time it takes to create or restore backup will depend on how much you have to compress or decompress.

If you're looking to slim down your backup, check if your configuration directory contains a large database file (`home-assistant_v2.db`). See the [`recorder`](/integrations/recorder/) integration page for options to keep your database data down to a size that won't cause issues. Note the keep days, purge interval, and include/exclude options.

When the restore is complete, Home Assistant will restart to apply the new settings. You will lose the connection to the UI and it will return once the restart is completed.

### Creating backup using the Home Assistant Command Line Interface

1. `ha backups list` - lists backups and their slugnames
2. `ha backups restore slugname` - restores a specific backup
3. `ha backups new --name nameofbackup` - create a backup

Use `ha help` to get more information about the command line usage.


### Copying your backups to another location

You often need a backup in case your system has crashed. If you only store them on the crashed device, you won't be able to access them easily. We recommend that you manually copy them from `/backup` to another machine on occasion. Or even better, create an automation to handle that, or make use of one of the following add-ons:

- [Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup)
- [Dropbox Sync](https://github.com/danielwelch/hassio-dropbox-sync)
- [Nextcloud Backup](https://github.com/Sebclem/hassio-nextcloud-backup)
- [Samba backup](https://github.com/thomasmauerer/hassio-addons/tree/master/samba-backup)
- [Remote Backup (scp/rsync/rclone)](https://github.com/ikifar2012/remote-backup-addon)
- [Syncthing](https://github.com/Poeschl/Hassio-Addons/tree/main/syncthing)
