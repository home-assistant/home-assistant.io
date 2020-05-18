---
title: "Configuration Backup to Dropbox"
description: "Instructions on how backup your Home Assistant configuration to Dropbox"
redirect_from: /cookbook/dropboxbackup/
---

Backing up and regularly syncing your Home Assistant configuration to [Dropbox](http://dropbox.com) is similar to [GitHub Backup](/docs/ecosystem/backup/backup_github/)

## Requirements

You need two parts in order to get it working correctly.

Become the user that run Home Assistant.

- A separate Python script that syncs a specific folder. Which can be found [here](https://gist.github.com/riemers/31e3350041fd3e47e489cbc811209d6f)
- The excellent [dropbox uploader script](https://github.com/andreafabrizi/Dropbox-Uploader/blob/master/dropbox_uploader.sh) you can grab the .sh file only.

Download those files to a folder of your liking, after that edit both files and change paths accordingly.

In the Python script you can specify which files and directories should be excluded. This allows you to skip `secrets.yaml` or the `deps` folder.

### Step 1: Linking your Dropbox account

```bash
chmod +x dropbox_uploader.sh
./dropbox_uploader.sh
```

Follow the instructions you see on your screen.

### Step 2: Running the Dropbox uploader

Go to the folder you have placed `dropbox.py`.

- **Option A:**
  Copy file `dropbox_uploader.sh` to : `.homeassistant/extraconfig/shell_code/` (so the full path would be similar to: `/home/homeassistant/.homeassistant/extraconfig/shell_code/dropbox_uploader.sh`)
- **Option B:**
  Edit `dropbox.py`:
  Change the following line:

  ```txt
  uploader = "/home/homeassistant/.homeassistant/extraconfig/shell_code/dropbox_uploader.sh"
  ```

  to where you placed your file: (for example):

  ```txt
  uploader = "/home/homeassistant/MyFolder/dropbox_uploader.sh"
  ```

```bash
python dropbox.py
```

The first time can take a lot of time since it will upload all your files!
Do note, this will **backup your passwords to Dropbox**.

### Automate the backup

So you just made a full backup, next time you want it to be done automatically. Since your database can change and so do other files over time.
Add it to your crontab, edit the **path/to** part.

```bash
(crontab -l 2>/dev/null; echo "0 3 * * * python /path/to/dropbox.py") | crontab -
```
