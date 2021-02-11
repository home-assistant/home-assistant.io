## Enable I2C

Home Assistant using the Home Assistant Operating System is a managed environment, which means you can't use existing methods to enable the I2C bus on a Raspberry Pi.

### Step by step instructions

You will need:

- SD card reader
- SD card with Home Assistant Operating System flashed on it

#### Step 1 - Access the Home Assistant Operating System boot partition

Shutdown/turn-off your Home Assistant installation and unplug the SD card.
Plug the SD card into an SD card reader and find a drive/file system named
`hassos-boot`. The file system might be shown/mounted automatically. If not,
use your operating systems disk management utility to find the SD card reader
and make sure the first partition is available.

#### Step 2 - Add files to enable I2C

- In the root of the `hassos-boot` partition, add a new folder called `CONFIG`.
- In the `CONFIG` folder, add another new folder called `modules`.
- Inside the `modules` folder add a text file called `rpi-i2c.conf` with the following content:
  ```txt
  i2c-dev
  ```
- In the root of the `hassos-boot` partition, edit the file called `config.txt` add two lines
  to it:
  ```txt
  dtparam=i2c_vc=on
  dtparam=i2c_arm=on
  ```

#### Step 3 - Start with the new configuration

- Insert the SD card back into your Raspberry Pi.
- On startup, the `hassos-config.service` will automatically pickup the new
  `rpi-i2c.conf` configuration.
- Another reboot might be necessary to make sure the just imported `rpi-i2c.conf` is
  present at boot time.

The I2C devices should now be present under /dev.

### From Home Assistant Operating System Terminal

Alternatively, by attaching a keyboard and screen to your device, you can access the physical terminal to the Home Assistant Operating System.

You can enable i2c via this terminal:

- Login as `root`.
- Type `login` and press enter to access the shell.
- Type the following to enable i2c, you may need to replace `sda1` with `sdb1` or `mmcblk0p1` depending on your platform:

  ```shell
  mkdir /tmp/mnt
  mount /dev/sda1 /tmp/mnt
  mkdir -p /tmp/mnt/CONFIG/modules
  echo -ne i2c-dev>/tmp/mnt/CONFIG/modules/rpi-i2c.conf
  echo dtparam=i2c_vc=on >> /tmp/mnt/CONFIG/config.txt
  echo dtparam=i2c_arm=on >> /tmp/mnt/CONFIG/config.txt
  sync
  reboot
  ```
