---
title: "Configuration Backup to USB drive"
description: "Instructions on how backup your Home Assistant configuration to USB drive"
---

This will step you through the process of setting up a backup of your Home Assistant configuration to a USB device. This is a good method if you don't want to mask all of your passwords since the backup is kept locally at your home/residence.

### Requirements

First, you need a USB drive. It should be formatted properly for your device and connected to your device before beginning. Any type of partition will work, but Linux filesystems are preferred so that you can set permissions.
Once connected you want to mount the drive. To find the path where it is located, you can use the `dmesg` command. 

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

The device here is `sda` and our partition is `sda1`. So our partition is located here `/dev/sda1`. 

Mount the drive (as root) to `/media`

```bash
# sudo mount /dev/sda1 /media/
```

### Prepare the USB Device

Change to the `/media` directory and create a folder called `hassbackup`. Change the ownership to the user that runs Home Assistant. In this example case, the user and group are both `homeassistant`.

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

### Install Dependency

The script in the next section uses zip to preserve space on your drive. So we will install zip next.

```bash
/media# apt-get install zip
Reading package lists... Done
Building dependency tree
[...]
Setting up zip (3.0-8) ...
```

### Download and Run Script

Become the `homeassistant` user (or whatever user runs Home Assistant). Change to whatever directory you would like the [script](https://gist.github.com/riemers/041c6a386a2eab95c55ba3ccaa10e7b0) placed into and run the following command.

```bash
# wget https://gist.githubusercontent.com/riemers/041c6a386a2eab95c55ba3ccaa10e7b0/raw/86727d4e72e9757da4f68f1c9d784720e72d0e99/usb_backup.sh
```

Make the downloaded script executable.

```bash
# chmod +x usb_backup.sh
```

Edit the script file using your preferred text editor (use nano if you are not advanced). Change the paths to reflect your configuration, then simply run `./usb_backup.sh`.

```bash
$ .homeassistant/extraconfig/shell_code/usb_backup.sh
[i] Creating backup
[i] Backup complete: /media/hassbackup/hass-config_20170429_112728.zip
[i] Keeping all files no prunning set
```

### Set Up Crontab

To automatically backup your configuration on a schedule, you can add a crontab for it as the `homeassistant` user.
Change the path below to the directory where you placed the `usb_backup.sh` and run the following line. This will backup every night at 3 am.

```bash
(crontab -l 2>/dev/null; echo "0 3 * * * /home/homeassistant/.homeassistant/extraconfig/shell_code/usb_backup.sh") | crontab -
```

### Auto Mount the USB Device

NOTE: This does not automatically mount your USB drive at boot. You will need to manually mount your drive after each boot or add a line to your `/etc/fstab` file.

To manually mount a USB drive located at `/dev/sda1`, run the following line: 

```bash
# mount /dev/sda1 /media
```

Alternatively, auto-mount the drive by adding the following entry to your `/etc/fstab`:

```text
/dev/sda1  /media               ext4    defaults,noatime  0       1
```
