## Enable I2C

Home Assistant using the Home Assistant Operating System is a managed environment, which means you can't use existing methods to enable the I2C bus on a Raspberry Pi. In order to enable I2C devices you will have to 
- Enable I2C for the Home Assistant Operating System 
- Enable Raspberry Hats including the I2C integration
- Setup I2C sensors

### Step by step instructions to enable I2C for the Home Assistant Operating System

#### Use SD Card/Step 1 - Access the Home Assistant Operating System boot partition

You will need:
- SD card reader
- SD card with Home Assistant Operating System flashed on it

Shutdown/turn-off your Home Assistant installation and unplug the SD card.
Plug the SD card into an SD card reader and find a drive/file system named
`hassos-boot`. The file system might be shown/mounted automatically. If not,
use your operating systems disk management utility to find the SD card reader
and make sure the first partition is available.

#### Use SD Card/Step 2 - Add files to enable I2C

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

#### Use SD Card/Step 3 - Start with the new OS configuration

- Insert the SD card back into your Raspberry Pi.
- On startup, the `hassos-config.service` will automatically pickup the new
  `rpi-i2c.conf` configuration.
- Another reboot might be necessary to make sure the just imported `rpi-i2c.conf` is
  present at boot time.

### Alternative to SD Card via Home Assistant Operating System Terminal

By attaching a keyboard and screen to your device, you can access the physical terminal to the Home Assistant Operating System.

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
#### Check I2C activation on OS level

After the reboot of the host, the I2C activation should now be visible under /dev. You may check by using the add-on `Terminal & SSH` and list the directory `/dev`. If `ls` shows an entry `i2c-1` or similar, your I2C config might work. You can check the status of I2C kernel modules by entering `lsmod | grep i2c`. If they are loaded, you should find at least the entry `i2c_dev`. Active usage of the modules is indicated by a number, e.g. `i2c_dev 20480 2` would indicate two active I2C data sources (e.g. a BMP280 temperature & pressure sensor) 

An active I2C can also be check with a multi meter showing 3.3 V on the I2C pins GPIO2 and GPIO3. 

#### Configuration of the Home Assistant to enable a BME280 sensor 
  
Connect a I2C device to the GPIO2 (SDA1), GPIO3 (SCL) and VCC/GND as needed. Ensure that this wiring is working (e.g by using a Raspberry OS with configured I2C) and note the I2C address of the  device. For a BMP280 this might be 0x76.  

Edit the `configuration.yaml` e.g. via the add-on `File Editor`. You need to activate the  binary sensor plattform `raspihats` to enable I2C for the Home Assistant core. The I2C sensor needs and additional entry. A working entry may look like this:

```shell
# Enable Raspihats
binary_sensor:
  - platform: raspihats

# Enable BMP 280 sensor
sensor:
  - platform: bmp280
    i2c_address: 0x76
```

After a reboot of host, you can find the sensor listed in `Developer Tools` in the tab `States`as `sensor.bmp280_temperature`and `sensor.bmp280_pressure`. 
  
