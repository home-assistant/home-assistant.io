## Enable I2C

Home Assistant using the {% term "Home Assistant Operating System" %} which is a managed environment, which means you can't use existing methods to enable the I2C bus on a Raspberry Pi. In order to use I2C devices you will have to 
- Enable I2C for the Home Assistant Operating System 
- Setup I2C devices e.g. sensors

### Enable I2C with an SD card reader

#### Access the boot partition

You will need:
- SD card reader
- SD card with {% term "Home Assistant Operating System" %} flashed on it

Shutdown/turn-off your Home Assistant installation and unplug the SD card.
Plug the SD card into an SD card reader and find a drive/file system named
`hassos-boot`. The file system might be shown/mounted automatically. If not,
use your operating systems disk management utility to find the SD card reader
and make sure the first partition is available.

#### Add files to enable I2C

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

#### Start with the new OS configuration

- Insert the SD card back into your Raspberry Pi.
- On startup, the `hassos-config.service` will automatically pickup the new
  `rpi-i2c.conf` configuration.
- Another reboot might be necessary to make sure the just imported `rpi-i2c.conf` is
  present at boot time.

### Enable I2C via Home Assistant Operating System Terminal

Alternatively, by attaching a keyboard and screen to your device, you can access the physical terminal to the {% term "Home Assistant Operating System" %}.

You can enable I2C via this terminal:

- Login as `root`.
- Type `login` and press enter to access the shell.
- Type the following to enable I2C, you may need to replace `sda1` with `sdb1` or `mmcblk0p1` depending on your platform:

  ```shell
  mkdir /tmp/mnt
  mount /dev/sda1 /tmp/mnt
  mkdir -p /tmp/mnt/modules
  echo -ne i2c-dev>/tmp/mnt/modules/rpi-i2c.conf
  echo dtparam=i2c_vc=on >> /tmp/mnt/config.txt
  echo dtparam=i2c_arm=on >> /tmp/mnt/config.txt
  sync
  reboot
  ```
### Troubleshooting

After rebooting the host there should be `i2c-0` and similar device files in `/dev`. If such device files are missing, enabling I2C failed for some reason. You can check the status of I2C kernel modules by using `lsmod | grep i2c` in the terminal. If they are loaded, you should find at least the entry `i2c_dev`. Active usage of the modules is indicated by a number, e.g. `i2c_dev 20480 2` would indicate two active I2C device files.

An active I2C can also be checked with a multi meter showing 3.3 V on the I2C pins GPIO2 and GPIO3. 
  
