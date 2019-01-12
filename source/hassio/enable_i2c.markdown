---
layout: page
title: "Enable HassOS i2c"
description: "Instructions on how to enable i2c on a Raspberry PI for Hass.io."
date: 2018-01-11 20:08
sidebar: true
comments: false
sharing: true
footer: true
---

Hass.io is a managed environment, which means you can't use existing methods to enable the I2C bus on a Raspberry Pi.

If you're attempting to add an external sensor, you will have to enable the I2C interface in the hass.io configuration via the USB Configuration prompt. *note*: this will not work via an ssh connection.

You will need: 
* USB drive
* A way to add files to the USB drive
* A way to connect the drive to your Raspberry Pi

### Step 1 - Prepare the USB drive.
Connect the USB drive to a device capable of adding and editing files to the USB drive. Format a USB stick with FAT32/EXT4/NTFS and name the drive `CONFIG`. *Do not* skip this step. 

### Step 2 - Add files to enable I2C.
In the root of the USB drive add a folder called /modules. Inside that folder add a text file called `rpi-i2c.conf`. Open that file and add these two lines:
```
i2c-bcm2708
i2c-dev
```

In the root of the USB drive add a file called `config.txt`. Open that file and add these lines:
```
dtparam=i2c1=on 
dtparam=i2c_arm=on
```

### Step 3 - Load the new USB config.
Insert the USB drive into your Raspberry PI. Now go to the admin page http://hassio.local:8123/states, then in the sidebar click Hass.io > System.
Now click `Import from USB`. This will restart your Hass.io instance, and load the new USB configuration. When the service has restarted, you will have an working I2C interface.

