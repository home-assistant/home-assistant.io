---
title: "Configuration Backup to Google Drive"
description: "Instructions on how backup your HASS.IO configuration to Google Drive"
---

Backing up and regularly syncing your HASS.IO configuration to [Google Drive](http://drive.google.com), similar to [Github Backup](/docs/ecosystem/backup/backup_github/)

### Requirements

You need to be running HASS.IO in order to get this working, since it is a HASS.IO add-on

### Features

- Automatically creates new snapshots on a configurable schedule.
- Automatically uploads snapshot to Drive, even the ones it didn't create.
- Automatically cleans up old snapshots in HASS.IO and Google drive so you don't run out of space.
- Lets you upload snapshots directly from Google Drive, which makes restoring from a fresh install very easy.
- Integrates with Home Assistant Notifications, and provides sensors you can trigger off of.
- Simple UI focused on clarity, usability and getting out of your way because you have more important things to worry about.

### Installation

1. Go to your Hass.io menu item > "Add-on" page in Home Assistant and add this repository: https://github.com/sabeechen/hassio-google-drive-backup

2. Scroll down the page to find the new repository, and click the new add-on named "Hass.io Google Drive Backup"

3. Click "Install" and give it a few minutes to finish downloading.

4. Click "Start", give it a few seconds to spin up, and then click the "Open Web UI" button that appears. 

5. The "Getting Started" page will tell you how many snapshots you have and what it will do with them once you connect it to Google Drive. You can click "Settings" to change those options through the add-on (takes effect immediately), or update them from the page where you installed the add-on as shown below (restart the add-on for them to take effect).

- max_snapshots_in_hassio: the number of snapshots the add-on will allow HASS.IO to store locally before old ones are deleted.
- max_snapshots_in_google_drive: the number of snapshots the add-on will keep in Google Drive before old ones are deleted. Google Drive gives you 15GB of free storage (at the time of writing) so plan accordingly if you know how big your snapshots are.
- days_between_snapshots: How often a new snapshot should be scheduled, eg "1" for daily and "7" for weekly.
- use_ssl: determines if the add-on's webpage should only expose its interface over ssl. If you use the Duck DNS Add-on with the default settings then "use_ssl": true

6. Click the "Authenticate with Drive" button to link the add-on with your Google Drive account. Alternatively, you can generate your own Google API credentials.

7. You should be redirected automatically to the backup status page. Here you can make a new snapshot, see the progress of uploading to Google Drive, etc. You're done!

### Extra configuration options

For more information, visit the author's page at https://github.com/sabeechen/hassio-google-drive-backup
