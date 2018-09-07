---
layout: page
title: "Configuration Backup to Dropbox"
description: "Instructions on how backup your Home Assistant configuration to Dropbox"
date: 2017-04-24 18:00
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /cookbook/dropboxbackup/
---

Backing up and regularly syncing your Home Assistant configuration to [Dropbox](http://dropbox.com) similar to [Github Backup](/docs/ecosystem/backup/backup_github/)

### {% linkable_title Requirements %}

You need two parts in order to get it working correctly.

Become the user that run Home Assistant.

- A separate Python script that syncs a specific folder. Which can be found [here](https://gist.github.com/riemers/31e3350041fd3e47e489cbc811209d6f)
- The excellent [dropbox uploader script](https://github.com/andreafabrizi/Dropbox-Uploader/blob/master/dropbox_uploader.sh) you can grab the .sh file only.

Download those files to a folder of your liking, after that edit both files and change paths accordingly.

In the Python script you can specify which files and directories should be excluded. This allows you to skip `secrets.yaml` or the `deps` folder.

### {% linkable_title Step 1: Linking your Dropbox account %}

```bash
$ chmod +x dropbox_uploader.sh
$ ./dropbox_uploader.sh
```
Follow the instructions you see on your screen.

### {% linkable_title Step 2: Running the Dropbox uploader %}

Go to the folder you have placed `dropbox.py`.

```bash
$ python dropbox.py
```

The first time can take a lot of time since it will upload all your files!
Do note, this will **backup your passwords to Dropbox**.

### {% linkable_title Automate the backup %}

So you just made a full backup, next time you want it to be done automatically. Since your database can change and so do other files over time.
Add it to your crontab, edit the **path/to** part.

```bash
$ (crontab -l 2>/dev/null; echo "0 3 * * * python /path/to/dropbox.py") | crontab -
```
