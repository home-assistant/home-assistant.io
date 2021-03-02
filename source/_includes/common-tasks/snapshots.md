## Snapshots

Snapshots are a backup of your Home Assistant and add-on data and configuration. They are stored in a compressed archive file (.tar). Snapshots are made from the Supervisor Snapshot panel. There is also a service available which allows you to trigger the creation of a snapshot from an automation. Backups are stored in the /backup directory.

A full snapshot includes the following directories:

* `config`
* `share`
* `addons` (only manually installed or created add-ons, not those installed from the store)
* `ssl`
* `media`

A partial snapshot consists of any number of the above default directories and installed add-ons.

### Making a Snapshot from the UI

1. Go to {% my supervisor_snapshots title="Supervisor > Snapshots" %} in the UI
2. Provide a name for the snapshot.
3. Choose full or partial.
4. Choose to password protect or not. Password protected snapshots cannot easily be browsed outside of Home Assistant OS
5. Click "Create" to begin the snapshot.

### Restoring a Snapshot on a new install

You can make use of snapshots which you have copied off of a previous install to restore to a new installation during the onboarding process. Follow the link at the bottom of the account creation page to upload your snapshot from the previous installation.

For restoring a snapshot at any other time, vist the Supervisor Snapshot panel in your UI and use the following steps:

1. Select "Upload Snapshot" from the icon in the upper right of the page.
2. Click on the folder icon to navigate to your snapshot .tar file and select it.

When the upload is completed, you will be presented with the snapshot restore dialog for restoring it, and can then choose to restore in full or in part by manually selecting individual items.

If the snapshot you are uploading is more than 1GB in size, it can be faster and more efficient to make use of the Samba add-on in order to transfer files to the `/backup` directory.

The length of time it takes to create or restore snapshots will depend on how much you have to compress or decompress.

If you're looking to slim down your snapshots, check if your configuration directory contains a large database file (`home-assistant_v2.db`). See the [`recorder`](https://www.home-assistant.io/components/recorder/) integration page for options to keep your database data down to a size that won't cause issues. Note the keep days, purge interval, and include/exclude options.

When the restore is complete, Home Assistant will restart to apply the new settings. You will lose the connection to the UI and it will return once the restart is completed.

### Creating snapshots using the Home Assistant Command Line Interface

1. `ha snapshot list` - lists snapshots and their slugnames
2. `ha snapshot restore slugname` - restores a specific snapshot
3. `ha snapshot new --name nameofsnapshot` - create a snapshot

Use `ha help` to see more info.


### Copying your snapshots to another location

You often need a snapshot in case your system has crashed. If you only store them on the crashed device, you won't be able to access it easily. We recommend that you manually copy them from `/backup` to another machine on occasion. Or even better, create an automation to handle that, or make use of one of the following add-ons:

- [Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup)
- [Dropbox Sync](https://github.com/danielwelch/hassio-dropbox-sync)
- [Nextcloud Backup](https://github.com/Sebclem/hassio-nextcloud-backup)
- [Samba backup](https://github.com/thomasmauerer/hassio-addons/tree/master/samba-backup)
- [Remote Backup (uses scp)](https://github.com/overkill32/hassio-remote-backup)
