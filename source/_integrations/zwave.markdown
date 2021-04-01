---
title: Z-Wave (deprecated)
description: Instructions on how to integrate your existing Z-Wave within Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Climate
  - Cover
  - Fan
  - Light
  - Lock
  - Sensor
  - Switch
featured: false
ha_iot_class: Local Push
ha_release: 0.7
ha_config_flow: true
ha_codeowners:
  - '@home-assistant/z-wave'
ha_domain: zwave
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - lock
  - sensor
  - switch
---

<div class='note warning'>

This integration is deprecated. We recommend using [the Z-Wave JS integration](/integrations/zwave_js).

The Z-Wave integration will no longer receive any updates. It will not be removed unless it becomes incompatible with a future version of Python.

</div>

The [Z-Wave](https://www.z-wave.com/) integration for Home Assistant allows you to observe and control connected Z-Wave devices.

## Quick start

To add Z-Wave to your installation, plug the Z-Wave stick into the device that runs Home Assistant. Then Go to Configuration >> Integrations in the UI. Click the "Add integration" button in the bottom right and from the list of integrations, select "Z-Wave" and follow the instructions shown.

For more information, please see the [detailed installation instructions](#detailed-installation-instructions).

## Device support

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- [Climate](#climate)
- [Cover](#cover)
- Fan
- Light
- [Lock](#lock)
- Sensor
- Switch

### Climate

To get your Z-Wave thermostat or HVAC unit working with Home Assistant, follow the instructions for the general [Z-Wave component](/getting-started/z-wave/).

<div class='note'>

Thermostats with support for fan modes or different operating modes, will be handled like a HVAC device and will also be detected as one.

If the thermostat supports different operating modes, you will get one thermostat entity for each mode.

</div>

Once enabled, any Z-Wave climate devices will be available to Home Assistant. Multiple entities may be created. The following entities are created for a Remotec ZXT-120.

- `climate.remotec_zxt120_heating_1_id`: Allows you to control the connected device. See below for examples.
- `sensor.remotec_zxt120_temperature_38`: A sensor which returns the current temperature set on the attached device.

#### Automating Z-Wave Climate Devices

The following examples will instruct a Remotec ZXT-120 to turn the attached device mode to Heating, and set the temperature at 24 degrees after 8pm. Add it to `automation.yaml`.

```yaml
automation:
  - alias: "Turn on Heater at 8pm"
    trigger:
      - platform: time
        at: "20:00:00"
    action:
      - service: climate.set_hvac_mode
        target:
          entity_id: climate.remotec_zxt120_heating_1_id
        data:
          hvac_mode: Heat
      - service: climate.set_temperature
        target:
          entity_id: climate.remotec_zxt120_heating_1_39
        data:
          temperature: 24
```

Generally, in Home Assistant, you can use the `homeassistant.turn_off` service to turn devices off. For the Remotec ZXT-120, you must instead make a service call like the following.

```yaml
automation:
  - alias: "Turn off Heater at 9pm"
    trigger:
      - platform: time
        at: "21:00:00"
    action:
      - service: climate.set_hvac_mode
        target:
          entity_id: climate.remotec_zxt120_heating_1_id
        data:
          hvac_mode: "Off"
```

**Note:** In the example above, the word `Off` is encased in single quotes to be valid YAML.

#### Test if it works

A simple way to test if your Z-Wave climate device is working is to use **Developer Tools** -> **Services**. Choose the applicable Climate service from the list of **Available services:** and enter something like the sample below into the **Service Data** field and then press **CALL SERVICE**.

```yaml
entity_id: climate.remotec_zxt120_heating_1_id
hvac_mode: Heat
```

### Cover

Z-Wave garage doors, blinds, and roller shutters are supported as cover in Home Assistant.

To get your Z-Wave covers working with Home Assistant, follow the instructions for the general [Z-Wave component](#configuration).

If you discover that you need to [invert the operation](/docs/z-wave/installation/#invert_openclose_buttons) of open/close for a particular device, you may change this behavior in your Z-Wave section of your `configuration.yaml` file as follows, in addition you can also [invert percent position](/docs/z-wave/installation/#invert_percent):

```yaml
zwave:
  device_config:
    cover.my_cover:
      invert_openclose_buttons: true
      invert_percent: true
```

### Lock

To get your Z-Wave locks working with Home Assistant, follow the instructions for the general [Z-Wave component](#configuration).

Z-Wave locks will expose three services under the lock domain to manage usercodes if the lock supports it:

| Service        | Description                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| clear_usercode | Clears a usercode at code_slot X. Valid code_slots are 1-254, but max is defined by the lock.          |
| get_usercode   | Get a usercode from the lock at code_slot. Valid code_slots are 1-254, but max is defined by the lock. |
| set_usercode   | Sets usercode to X at code_slot Y. Valid usercodes are at least 4 digits, and max defined by the lock. |

### Device specific support

For more information about device specific support please visit [this page](/docs/z-wave/device-specific)

## Detailed installation instructions

Z-Wave can be configured using the Z-Wave *Integration* in the *Configuration* menu, or manually using an entry in `configuration.yaml`

### Configuration

```yaml
# Example configuration.yaml entry
zwave:
  usb_path: /dev/ttyACM0
  device_config: !include zwave_device_config.yaml
```

{% configuration Z-Wave %}
usb_path:
  description: The port where your device is connected to your Home Assistant host. Z-Wave sticks will generally be `/dev/ttyACM0` and GPIO hats will generally be `/dev/ttyAMA0`.
  required: false
  type: string
  default: /zwaveusbstick
network_key:
  description: The 16-byte network key in the form `"0x01, 0x02..."` used in order to connect securely to compatible devices. It is recommended that a network key is configured as security enabled devices may not function correctly if they are not added securely.
  required: false
  type: string
  default: None
config_path:
  description: The path to the Python OpenZWave configuration files.
  required: false
  type: string
  default: the 'config' that is installed by python-openzwave
polling_interval:
  description: The time period in milliseconds between polls of a nodes value. Be careful about using polling values below 30000 (30 seconds) as polling can flood the Z-Wave network and cause problems.
  required: false
  type: integer
  default: 60000
debug:
  description: Print verbose Z-Wave info to log.
  required: false
  type: boolean
  default: false
autoheal:
  description: Allows enabling auto Z-Wave heal at midnight. Warning, this is inefficient and [should not be used](https://github.com/home-assistant/architecture/issues/81#issuecomment-478444085).
  required: false
  type: boolean
  default: false
device_config / device_config_domain / device_config_glob:
  description: "This attribute contains node-specific override values. NOTE: This needs to be specified if you are going to use any of the following options. See [Customizing devices and services](/docs/configuration/customizing-devices/) for the format."
  required: false
  type: [string, list]
  keys:
    ignored:
      description: Ignore this entity completely. It won't be shown in the Web Interface and no events are generated for it.
      required: false
      type: boolean
      default: false
    polling_intensity:
      description: Enables polling of a value and sets the frequency of polling (0=none, 1=every time through the list, 2=every other time, etc). If not specified then your device will not be polled.
      required: false
      type: integer
      default: 0
    refresh_value:
      description: Enable refreshing of the node value. Only the light integration uses this.
      required: false
      type: boolean
      default: false
    delay:
      description: Specify the delay for refreshing of node value. Only the light integration uses this.
      required: false
      type: integer
      default: 5
    invert_openclose_buttons:
      description: Inverts function of the open and close buttons for the cover domain. This will not invert the position and state reporting.
      required: false
      type: boolean
      default: false
    invert_percent:
      description: Inverts the percentage of the position for the cover domain. This will invert the position and state reporting.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

#### Network Key

Security Z-Wave devices require a network key before being added to the network using the Add Secure Node button in the Z-Wave Network Management card. You must set the *network_key* configuration variable to use a network key before adding these devices.

An easy script to generate a random key:

```bash
cat /dev/urandom | tr -dc '0-9A-F' | fold -w 32 | head -n 1 | sed -e 's/\(..\)/0x\1, /g' -e 's/, $//'
```

You can also use sites like [this one](https://www.random.org/cgi-bin/randbyte?nbytes=16&format=h) to generate the required data, just remember to put `0x` before each pair of characters and a `,` between them:

```yaml
# Example configuration.yaml entry for network_key
zwave:
  network_key: "0x2e, 0xcc, 0xab, 0x1c, 0xa3, 0x7f, 0x0e, 0xb5, 0x70, 0x71, 0x2d, 0x98, 0x25, 0x43, 0xee, 0x0c"
```

Ensure you keep a backup of this key. If you have to rebuild your system and don't have a backup of this key, you won't be able to reconnect to any security devices. This may mean you have to do a factory reset on those devices, and your controller, before rebuilding your Z-Wave network.

### First Run

On platforms other than Home Assistant and Docker, the compilation and installation of python-openzwave happens when you first enable the Z-Wave component, and can take half an hour or more on a Raspberry Pi. When you upgrade Home Assistant and python-openzwave is also upgraded, this will also result in a delay while the new version is compiled and installed.

The first run after adding a device is when the `zwave` integration will take time to initialize the entities, some entities may appear with incomplete names. Running a network heal may speed up this process.

### Platform specific instructions

#### Home Assistant

You do not need to install any software to use Z-Wave.

If the path of `/dev/ttyACM0` doesn't work, look in the *System* section of the *Supervisor* menu. There you'll find a *Hardware* button which will list all the hardware found.

You can also check what hardware has been found using the [`ha` command](/hassio/commandline/#hardware):

```bash
ha hardware info
```

If you did an alternative install of Home Assistant on Linux (e.g.,  installing Ubuntu, then Docker, then Home Assistant Supervised) then the `modemmanager` package will interfere with any Z-Wave (or Zigbee) stick and should be removed or disabled in the host OS. Failure to do so will result in random failures of those components, e.g.,  dead or unreachable Z-Wave nodes, most notably right after Home Assistant restarts. Connect to your host OS via SSH, then you can disable with `sudo systemctl disable ModemManager` and remove with `sudo apt-get purge modemmanager` (commands are for Debian/Ubuntu).

#### Docker

You do not need to install any software to use Z-Wave.

To enable access to the Z-Wave stick, add `--device=/dev/ttyACM0` to the `docker` command that starts your container, for example:

```bash
docker run -d --name="home-assistant" -v /home/pi/homeassistant:/config -v /etc/localtime:/etc/localtime:ro --net=host --device=/dev/ttyACM0 homeassistant/raspberrypi3-homeassistant
```

If the path of `/dev/ttyACM0` doesn't work then you can find the path of the stick by disconnecting and then reconnecting it, and running the following in the Docker host:

```bash
ls -1tr /dev/tty*|tail -n 1
```

The `modemmanager` package will interfere with any Z-Wave (or Zigbee) stick and should be removed or disabled. Failure to do so will result in random failures of those components. For example you can disable with `sudo systemctl disable ModemManager` and remove with `sudo apt-get purge modemmanager`

#### Community install methods

##### Raspberry Pi specific

On the Raspberry Pi you will need to enable the serial interface in the `raspi-config` tool before you can add Z-Wave to Home Assistant. Make sure to reboot the Raspberry Pi for the setting to take effect.

##### Linux with Home Assistant Core

On Debian Linux platforms there are dependencies you will need to have installed ahead of time (included in `systemd-devel` on Fedora/RHEL systems):

```bash
sudo apt-get install libudev-dev build-essential
```

You may also have to install the Python development libraries for your version of Python. For example `libpython3.6-dev`, and possibly `python3.6-dev` if you're using Python 3.6.

###### Finding the controller path

To find the path of your Z-Wave USB stick, disconnect it and then reconnect it to your system and run:

```bash
ls -ltr /dev/tty*|tail -n 1
```

That will give you a line that looks something like this:

```bash
crw-rw---- 1 root dialout 204, 64 Sep 21 10:25 /dev/ttyACM0
```

Where the date and time displayed is approximately the time you connected the USB stick or module (it may also be something like `/dev/ttyAMA0` or `/dev/ttyUSB0`). The number will be zero for the first device connected, and higher numbers for later devices.

Or, if there is no result, try to find detailed USB connection info with:

```bash
dmesg | grep USB
```

If Home Assistant (`hass`) runs with another user (e.g., `homeassistant`) you need to give access to the stick with:

```bash
sudo usermod -aG dialout homeassistant
```

The output from `ls -ltr` above contains the following information:

- The device type is `c` (character special).
- The permissions are `rw-rw----`, meaning only the owner and group can read and write to it.
- There is only `1` link to the file.
- It is owned by `root` and can be accessed by members of the group `dialout`.
- It has a major device number of `204`, and a minor device number of `64`.
- The device was connected at `10:25` on `21 September`.
- The device is `/dev/ttyUSB0`.

##### macOS

When installing on macOS you may have to also run the command below ahead of time, replace "x.x" with the version of Python (`$ python3 --version`) you have installed.

```bash
sudo /Applications/Python\ x.x/Install\ Certificates.command
```

On macOS you can find the USB stick with:

```bash
ls /dev/cu.usbmodem*
```

### Troubleshooting

#### Device path changes

If your device path changes when you restart, see [this guide](http://hintshop.ludvig.co.nz/show/persistent-names-usb-serial-devices/) on fixing it.

#### Random unreachable Z-Wave nodes: ModemManager interference

If this applies to your situation:

- Some or all Z-Wave nodes are unreachable after restarting Home Assistant; not necessarily after every restart but seemingly random.
- The Z-Wave stick stops responding, needs to be re-plugged or Home Assistant needs a restart to get Z-Wave back.
- Your host OS is Debian-based/Ubuntu (for example: you installed Ubuntu, then Docker, then Hass.io).

Then chances are high that the ModemManager in the host OS is causing the issue, claiming or interfering with the USB Z-Wave stick like the much used Aeotec ones. In this case you need to disable ModemManager.

Connect to your host OS (e.g.,  Ubuntu) through SSH, then execute the following command on your host system to disable the ModemManager:

 ```bash
systemctl disable ModemManager.service
```

#### Component could not be set up

Sometimes the device may not be accessible and you'll get an error message upon startup about not being able to set up Z-Wave. Run the following command for your device path (here we're using `/dev/ttyAMA0` for our Razberry board):

```bash
ls -l /dev/ttyAMA0
```

You should then see something like this:

```txt
crw-rw---- 1 root dialout 204, 64 Apr  1 12:34 /dev/ttyAMA0
```

The important pieces are the first piece `crw-rw----` and the group `dialout`. If those are different then, for your device path, run:

```bash
sudo chgrp dialout /dev/ttyAMA0
sudo chmod g+rw /dev/ttyAMA0
```

Check too that the account you're running Home Assistant as is in the `dialout` group. For instance, if you're using `homeassistant`:

```bash
groups homeassistant
```

That should include `dialout`, if it doesn't then:

```bash
sudo usermod -aG dialout homeassistant
```

#### Unable to install Python Openzwave

If you're getting errors like:

```txt
openzwave-embed/open-zwave-master/libopenzwave.a: No such file or directory
```

Then the problem is that you're missing `libudev-dev` (or the equivalent for your distribution), please [install it](/docs/z-wave/installation/#linux).

#### Random failures

If you're having random failures of the mesh, devices going missing, things randomly not working, check your `OZW_Log.txt` for the following messages:

```txt
WARNING: 500ms passed without reading the rest of the frame...aborting frame read
WARNING: Out of frame flow! (0xfe).  Sending NAK
WARNING: Checksum incorrect - sending NAK
```

If you see any of these messages repeated in the log then _probably_ you've got something else running that's also using the Z-Wave controller. That might mean you've also got the OpenZ-Wave control panel (ozwcp) running, a second instance of Home Assistant or something else. You need to stop that other process to resolve this.

#### Changing device paths

Configurations using `udev` can experience race conditions in creating device paths such that they change on reboot. This can cause a device to appear to change between `/dev/ttyACM0` and `/dev/ttyACM1` after reboot. In this case using the symlinks created for device IDs can ensure the correct device is used, for example: `/dev/serial/by-id/usb-0658_0200-if00` for Aeotec Z-Stick.
