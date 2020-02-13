---
title: "Enable i2c on the Home Assistant Operating System"
description: "Instructions on how to enable I2C on a Raspberry PI"
---

Home Assistant using the Home Assistant Operating System, is a managed environment.
Which means you can't use existing methods to enable the I2C bus on a Raspberry Pi.

If you're attempting to add an external sensor, you will have to [enable the I2C interface in the Home Assistant configuration](https://github.com/home-assistant/hassos/blob/dev/Documentation/boards/raspberrypi.md#i2c) using a USB stick.

## Step by step instructions

You will need:

- USB drive
- A way to add files to the USB drive
- A way to connect the drive to your Raspberry Pi

### Step 1 - Prepare the USB drive

Connect the USB drive to a device capable of adding and editing files to the USB drive.

Format a USB stick with FAT32/EXT4/NTFS and name the drive `CONFIG` (uppercase).

### Step 2 - Add files to enable I2C

- In the root of the USB drive add a folder called `/modules`.
- Inside that folder add a text file called `rpi-i2c.conf` with the following contents:
  ```txt
  i2c-bcm2708
  i2c-dev
  ```
- In the root of the USB drive add a file called `config.txt` with the following contents:
  ```txt
  dtparam=i2c1=on 
  dtparam=i2c_arm=on
  ```

### Step 3 - Load the new USB configuration

- Insert the USB drive into your Raspberry Pi.
- Now go to your Home Assistant web interface, in the sidebar click **Supervisor** > **System**.
- Now click `Import from USB`.
- This will restart your Home Assistant instance, and load the new USB configuration.

When the service has restarted, you will have a working I2C interface.
