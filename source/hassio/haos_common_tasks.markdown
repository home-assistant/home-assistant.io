---
title: "Home Assistant OS Common Tasks"
description: "Guides for common tasks when using Home Assistant OS"
---


## Basic Architecture of Home Assistant OS/Supervised

### diagram and simple description

## Configuring access to files

### Installing and using Samba add-on

### Installing and using VSC add-on

### Installing and using File Editor add-on

### Installing and using SSH add-on

#### HA custom command line

## Home Assistant OS Snapshots

Snapshots are easily made in Home Assistant OS and are also available as services which can be used in automations. They can be created from the UI or the CLI (see below) and are stored in the /backup directory.

A full snapshot includes the following directories:

* config
* share
* add-ons (these are manually installed or created add-ons, and not those installed from the store)
* ssl
* media

They also include a gzip file for each installed add-on containing the add-on's version, config settings, and other data if any.

### Making a Snapshot from the UI

1. Go to Supervisor > Snapshots in the UI
2. Provide a name for the snapshot.
3. Choose full or partial.
4. Choose to password protect or not.

> Warning - Password protected snapshots cannot easily be browsed outside of Home Assistant OS

5. The only progress indicator at the moment is via the logs at the Supervisor > System page in the UI (or `ha su logs` in the CLI).
6. To update the snapshots page in order to see current snapshots, use the reload icon in the upper right of the page.

### Restoring a Snapshot on a new install

Restoring a snapshot on a fresh install of Home Assistant OS requires that you first upload the snapshot to the backup directory on the new instance. There is no way to upload snapshots from the snapshot dashboard at this time so the first thing to do is install and configure an add-on of your preference in order to provide access to the `backup` directory. Samba, File Editor, or VSC are all good choices for this.

After uploading to the `backup` directory, visit the snapshot page in the UI and reload the page using the icon in the upper right of the page to make the uploaded files visible. From there you can select your snapshot, choose a full or partial install, and then choose restore.

> Note: Before restoring third-party add-ons, add their repositories to the add-on store page first! These are any add-ons which are not in the official repo or the community add-on repo. Nothing bad will happen, but those add-ons won't get restored. You can always add the repos and then go back and do a partial restore of the missing add-ons.


### How long do snapshots take? How long do they take to restore?
The length of time it takes will depend on how much you have to compress or decompress. A large database file or a collection of camera media captured by MotionEye will take longer to decompress (the default database is the sqllite home-assistant_v2.db in the config directory).

See the `recorder` component page for ways to keep your db data down to a size that won't cause issues. Note the keep days, purge interval, and include/exclude options. <https://www.home-assistant.io/components/recorder/>

When the restore is complete, you will lose connection to the UI and it will return just as though you had restarted Home Assistant. It can be a good idea to do an additional full reboot as well especially if add-ons appear to be missing from the restore. You can reboot from the Supervisor > System > Host card in the UI.

### Creating snapshots using the cli
1. `ha sn list` - lists snapshots and their slugnames
2. `ha sn restore slugname` - restores a specific snapshot
3. `ha sn new --name nameofsnapshot` - create a snapshot

Use `ha help` to see more info.

## More automation and usage examples can be found [here](https://community.home-assistant.io/t/hassio-0-61-snapshot-service/39690/3?u=cogneato)

## Remove your snapshots to another location!

The snapshots will do you no good if they are on the device which you cannot access! Copy them off in batches manually from /backup on occasion. Or even better, make use of an add-on like Google Drive backup or Dropbox Sync and automate it!

[Hass.io Google Drive Backup](https://github.com/sabeechen/hassio-google-drive-backup)

[Dropbox Sync](https://github.com/danielwelch/hassio-dropbox-sync)

[Remote Backup (uses scp)](https://github.com/overkill32/hassio-remote-backup)


## Working with Audio
