---
layout: page
title: "Configuration Backup to USB drive"
description: "Instructions how backup your Home Assistant configuration to USB drive"
date: 2017-04-29 08:00
sidebar: true
comments: false
sharing: true
footer: true
---

Backing up your Home Assistant configuration to USB drive. A good plus side is that you don't need to mask all your passwords since the backup is locally at your home/residence.

### {% linkable_title Requirements %}
First you need a USB drive. Once you have one you need to prepare it to be used on your device. 
Once connected you want to format/work with the drive. To know what path it is in, you can check with `dmesg`. 

```bash
# dmesg | grep sd
[    0.909712] sdhci: Secure Digital Host Controller Interface driver
[    0.916414] sdhci: Copyright(c) Pierre Ossman
[    0.923366] sdhost: log_buf @ bac07000 (fac07000)
[    0.989001] mmc0: sdhost-bcm2835 loaded - DMA enabled (>1)
[    1.049095] sdhci-pltfm: SDHCI platform and OF driver helper
[726257.743301] sd 0:0:0:0: Attached scsi generic sg0 type 0
[726259.184810] sd 0:0:0:0: [sda] 124846080 512-byte logical blocks: (63.9 GB/59.5 GiB)
[726259.185603] sd 0:0:0:0: [sda] Write Protect is off
[726259.185613] sd 0:0:0:0: [sda] Mode Sense: 23 00 00 00
[726259.186432] sd 0:0:0:0: [sda] No Caching mode page found
[726259.186445] sd 0:0:0:0: [sda] Assuming drive cache: write through
[726259.206085]  sda: sda1
[726259.209004] sd 0:0:0:0: [sda] Attached SCSI removable disk
```

Here we see we have a drive on `/dev/sda1`. We assume you created a partition on the drive to start with. This can be any type of partition. Preferred is a Linux filesystem type so you can set permissions!

Mount the drive (as root) to `/media`

```bash
# mount /dev/sda1 /media/
```

### {% linkable_title Prepare USB Stick %}
Change into it and create a folder called `hassbackup` and change the ownership to the user that runs Home Assistant. In my case group and user are both `homeassistant`.

```bash
# cd /media/
/media# mkdir hassbackup
/media# chown homeassistant:homeassistant hassbackup/
/media# ls -al
total 28
drwxr-xr-x  4 root          root           4096 Apr 29 10:36 .
drwxr-xr-x 22 root          root           4096 Mar 22 18:37 ..
drwxr-xr-x  2 homeassistant homeassistant  4096 Apr 29 10:36 hassbackup
drwx------  2 root          root          16384 Apr 29 10:18 lost+found
```
You can ignore 'lost+found'.

### {% linkable_title Install Dependency %}

In order to preserve space on your drive we use zip. Install that too.

```bash
/media# apt-get install zip
Reading package lists... Done
Building dependency tree
[...]
Setting up zip (3.0-8) ...
```

### {% linkable_title Install and run script %}

Become the `homeassistant` user and place the following [script](https://gist.github.com/riemers/041c6a386a2eab95c55ba3ccaa10e7b0) to a place of your liking.

```bash
# wget https://gist.githubusercontent.com/riemers/041c6a386a2eab95c55ba3ccaa10e7b0/raw/86727d4e72e9757da4f68f1c9d784720e72d0e99/usb_backup.sh
```

Make the downloaded script executable.

```bash
# chmod +x usb_backup.sh
```

Open up the file and change the paths you want to use, then simply run the `./usb_backup.sh`.

```bash
$ .homeassistant/extraconfig/shell_code/usb_backup.sh
[i] Creating backup
[i] Backup complete: /media/hassbackup/hass-config_20170429_112728.zip
[i] Keeping all files no prunning set
```

### {% linkable_title Crontab %}
In order for this to automatically make a backup every night at 3 am, you can add a crontab for it as the `homeassistant` user.
Change below path to where you placed the `usb_backup.sh` and run the following line.

```bash
(crontab -l 2>/dev/null; echo "0 3 * * * /home/homeassistant/.homeassistant/extraconfig/shell_code/usb_backup.sh") | crontab -
```

### {% linkable_title Auto mount %}

This does not automatically mount your USB drive at boot. You need to do that manually or add a line to your `/etc/fstab` file.

If your drive is on `/dev/sda1`, you could add a entry to your `/etc/fstab` like so:

```text
/dev/sda1  /media               ext4    defaults,noatime  0       1
```

Manual step to mount the USB drive: 

```bash
# mount /dev/sda1 /media
```
