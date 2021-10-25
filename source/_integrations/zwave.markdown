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

If you discover that you need to [invert the operation](#invert_openclose_buttons) of open/close for a particular device, you may change this behavior in your Z-Wave section of your `configuration.yaml` file as follows, in addition you can also [invert percent position](#invert_percent):

```yaml
zwave:
  device_config:
    cover.my_cover:
      invert_openclose_buttons: true
      invert_percent: true
```

### Lock

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

Then the problem is that you're missing `libudev-dev` (or the equivalent for your distribution), please [install it](#linux-with-home-assistant-core).

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

## Adding and removing devices

### Adding Devices

To add a [Z-Wave device](/docs/z-wave/devices/):

1. Go to the [Z-Wave control panel](/integrations/zwave/#control-panel).
2. Click **Add Node** in the *Z-Wave Network Management* card, or **Add Node Secure** for secure devices like locks. This puts your [Z-Wave controller](/docs/z-wave/controllers/) in "inclusion" mode.
3. Activate your device by following the instructions provided with it. Usually, this involves pressing a button.
4. Make sure the device is in its final location, then click **Heal Network**. This is optional but helps optimize network speed.

When you add a device, it may initially appear without a specific entity ID (e.g., `zwave.__`) or other identifying information. *Heal Network* should speed the process of populating this information. You *might* need to restart Home Assistant for the entity ID to appear.

<div class='note warning'>

Some Z-Wave USB sticks have a physical "inclusion" button to add devices; **don't use it**. Likewise, don't add devices directly through other tools like [OpenZWave control panel](https://github.com/OpenZWave/open-zwave-control-panel). Many devices only send capabilities information at the time you add them, so if you add them outside of Home Assistant this information will be missing.

</div>

<div class='note warning'>
Secure devices require additional bandwidth; too many secure devices can slow down your Z-Wave network. We recommend only using secure inclusion for devices that require it, like locks or garage door openers.
</div>

### Removing Devices

To remove a [Z-Wave device](/docs/z-wave/devices/):

1. Go to the [Z-Wave control panel](/integrations/zwave/#control-panel).
2. Click **Remove Node** in the *Z-Wave Network Management* card. This puts your [Z-Wave controller](/docs/z-wave/controllers/) in "exclusion" mode.
3. Activate your device by following the instructions provided with it. Usually, this involves pressing a button.
4. The device should now be removed, but that won't show until you restart Home Assistant. Look for a confirmation signal on the device if available, or confirm in the Home Assistant logs.
5. Click **Heal Network**. This is optional but helps optimize network speed.

If your device isn't responding to this process, possibly because you've factory reset it or it has failed, you can remove it using **Remove Failed Node**.

### Already Added

If your device was previously added to another controller but not removed from it, **you must remove it before adding it to Home Assistant**.

1. **Remove the device from the old controller**, if possible. If your device was added to a different system (SmartThings, Wink, etc.) follow that system's instructions to remove the device. Then try adding the device to Home Assistant again.
2. If you can't remove it from the old controller, **try removing the device using Home Assistant**. Follow the instructions in [Removing Devices](#removing-devices); even though it hasn't been added to Home Assistant yet, most Z-Wave devices will respond to exclusion mode from *any* controller. Then try adding the device to Home Assistant again. (Secure devices with a theft protection feature may not allow this.)
3. If removing the device doesn't help, **try a factory reset** as a last resort. Check your device's manual for instructions.

### Range Issues

Normally you can add and remove devices as long as they are within range of any Z-Wave Plus device in your network, using a feature called [network-wide inclusion](https://z-wavealliance.org/z-wave_plus_certification/).

If you are using older non-Z-Wave Plus devices, your device may need to be within the range of your [controller](/docs/z-wave/controllers/) to be added or removed. If you cannot move the device (e.g., wall switches), you can try temporarily relocating your controller to be near your device. See the [Z-Wave Alliance documentation on Z-Wave Plus](https://z-wavealliance.org/z-wave_plus_certification/) for more information on how to determine if your devices support Z-Wave Plus.

### Forcibly Removing Devices

You can use the **Remove Failed Node** button to remove a failed device (e.g., because it is broken). In rare cases, you may want to remove a device that has *not* failed. This is not recommended but can help when a device has not been recognized as failed.

1. Go to the *States* menu under *Developer tools* in the Home Assistant frontend
2. Click on the name of the `zwave.` entity you want to remove
3. Make note of the entity's "node_id" value as you will need to re-add the "node_id" attribute and value in step 4.
4. At the top, edit the JSON attributes to replace `false` with `true` for `"is_failed": false,` so that it reads `"is_failed": true.` Also add the "node_id" value to the number listed in the entity's attribute. The YAML attributes should look something like below:

    ```yaml
    node_id: 6
    is_failed: true
    ```

5. Click **Set State**
6. Go to the [Z-Wave control panel](/integrations/zwave/#control-panel)
7. Click **Remove Failed Node** in the *Z-Wave Node Management* card
8. The device will now be removed, but that won't show until you restart Home Assistant

## Control panel

The Z-Wave control panel is available via **Configuration** &rarr; **Integrations** &rarr; **Z-Wave** &rarr; **Configure**.

- **No Z-Wave integration?** Follow the [set up instructions](/docs/z-wave/installation/) to enable it.
- **Missing the *Configuration* button?** See the [configuration documentation](/integrations/config/) for instructions on enabling it.

### Z-Wave Network Management

Here is where you [include and exclude](/integrations/zwave/#adding-removing-devices) Z-Wave devices from your network.

- **Add Node** puts the controller into inclusion mode, so you can include (add) a device to your Z-Wave network
- **Add Node Secure** puts the controller into secure inclusion mode (this requires that you've created a [security key](/integrations/zwave/#network-key))
- **Remove Node** puts the controller into exclusion mode, so you can exclude (remove) a device. Note that you can exclude a non-secure device that's been added to another network
- **Cancel Command** cancels any of the above

- **Heal Network** tells the controller to "heal" the Z-Wave network. Basically asks the nodes to tell the controller all of their neighbors so the controller can recompute optimal routing.
- **Start Network** starts the Z-Wave network
- **Stop Network** stops the Z-Wave network
- **Soft Reset** tells the controller to do a "soft reset." This is not supposed to lose any data, but different controllers can behave differently to a "soft reset" command, and may cause the Z-Wave network to hang.
- **Test Network** tells the controller to send no-op commands to each node and measure the time for a response. In theory, this can also bring back nodes which have been marked "presumed dead".
- **Save Configuration** Saves the current cache of the network to `zwcfg_[home_id].xml`.

### Z-Wave Node Management

- **Refresh Node** refreshes the information on the node and its entities. If used on a battery powered device, the device will first need to wake for this to work.
- **Remove Failed Node** will remove a failed node from the network. The node needs to be on the controller's Failed Node List (marked as `is_failed: true`), otherwise this command will fail. You can trick OpenZWave into thinking the node is failed by selecting the `zwave` entity in the *States* menu, under *Developer tools*, and changing `"is_failed": false,` to `"is_failed": true,` then selecting *Set State*.
- **Replace Failed Node** will replace a failed device with another. If the node is not in the controller's Failed Node List, or the node responds, this command will fail.
- **Print Node** prints all state of Z-Wave node to the console log

- **Heal Node** starts healing of the node.(Update neighbor list and update return routes)

- **Test Node** sends no_op test messages to the node. This could in theory bring back a dead node.

- **Node Information** this will display the Z-Wave entity card with information about the node:

- **averageRequestRTT** The average Round Trip Time (RTT) of requests sent to the node, in milliseconds. A value of 250, for example, is a quarter of a second.
- **averageResponseRTT** The average Round Trip Time of responses to requests
- **battery_level** *Battery powered devices only* - the battery level, which may be rounded to the nearest 10
- **capabilities** A comma separated list of the capabilities of the device
- **friendly_name** The name you specified to be displayed
- **is_awake** Whether the device is awake or not
- **is_failed** Whether the device has been marked as failed. The controller won't try to contact failed devices.
- **is_info_received** True once the controller has received the node information from the node.
- **is_ready** When you start the network (or Home Assistant) it will take a short while before all devices are ready, this shows which aren't yet ready.
- **is_zwave_plus** True for any Z-Wave Plus devices (note that controllers always report *false*, regardless of whether they are Plus devices or not)
- **lastRequestRTT** The Round Trip Time of the last request
- **lastResponseRTT** The Round Trip Time of the response to the last request
- **manufacturer_name** The name of the manufacturer, as supplied by OpenZWave
- **max_baud_rate** The maximum bandwidth the device supports, most modern devices will support 40,000 or higher
- **node_id** The unique node ID of this node
- **node_name** The base name of this node, this is used to build the entity ID of all entities of this node
- **product_name** The product name of the device, as supplied by OpenZWave
- **query_stage** The query stage for this device (see [here](/docs/z-wave/query-stage/) for details)
- **receivedCnt** The number of messages received from the device
- **receivedDups** The number of duplicate messages received from the device
- **receivedTS** The date and time the last message was received from the devices
- **receivedUnsolicited** How many unsolicited messages were received
- **retries** How many retries have been made to send messages to this node
- **sentCnt** How many messages have been sent to the node
- **sentFailed** How many messages that were sent weren't acknowledged
- **sentTS** The date and time the last message was sent to the node
- **wake_up_interval** *Battery powered devices only* - the wakeup interval of the device, in seconds

<div class='note'>
Battery powered devices need to be awake before you can use the Z-Wave control panel to update their settings. How to wake your device is device specific, and some devices will stay awake for only a couple of seconds. Please refer to the manual of your device for more details.
</div>

#### Entities of this node

This is a dropdown where you can select all the entities of this node. Once selected you can then use:

- **Refresh Entity** to refresh just that entity's values
- **Entity Information** to display the attributes of that entity (e.g., its friendly name, the ID of the node, etc)

Here you can mark a device as requiring polling so the controller is aware of changes because the device doesn't send updates itself. Do see the information on [polling here](/docs/z-wave/devices/#polling), since excessive polling can break your Z-Wave network.

The **Polling intensity** says how many poll intervals this device is polled on. For example, if you set 2 then it's polled on every second interval.

You can also exclude a Z-Wave devices from Home Assistant. You can do that if you have a device that you need to have on the Z-Wave network, but you don't want it to appear in Home Assistant, or if you've got a device that's failed and you're unable to exclude it.

Renaming Z-Wave entities is done with the same [customization options](/docs/configuration/customizing-devices/) as any other entity in Home Assistant.

#### Node Values

Contains a list of available values of the selected node, and it's instances.

#### Node group associations

Where the device supports the *Association* command class, this will allow you to associate the device with another. OpenZWave will automatically associate the device with the controller, to provide instant updates when the device doesn't support the *Hail* command class.

You can use this to enable one device to directly control another. This is primarily useful for remote controls that operate lights or switches, or where you want to have multiple devices operate as one.

There may be multiple groups, that are used for different purposes. The manual of your device will explain what each group is for.

##### Broadcast group

Some Z-Wave devices may associate themselves with the broadcast node (node 255). You'll be able to tell if this has happened if opening a door (or triggering a motion sensor) causes lights to come on, and closing the door (or the motion sensor going clear) causes lights to run off. You can get rid of this by selecting any target node. If the group has node 255 in it, a *Remove broadcast* button will appear. You can also use the `zwave.change_association` service:

```json
{"association": "remove", "node_id": 3, "group": 1, "target_node_id": 255}
```

That would remove the broadcast group from association group 1 of the device with node_id 3.

#### Node configuration options

You can set the *wakeup* interval (in seconds) of the device, this is shown for all devices that can be battery powered, even if they are currently mains powered. The wakeup interval only applies when those devices are battery powered.

<div class='note'>
The wakeup interval has no impact on the device's ability to report sensor changes. This is purely for how often the Z-Wave chip will check in with the controller. That activity consumes a lot of battery power compared to reporting sensor changes and if you reduce it you'll be reducing the battery life of your device.
</div>

Underneath that you can select any supported configuration parameter to see the current setting. You can then change this and select **Set Configuration Parameter** to updated it. Battery powered devices will be updated the next time they wake.

#### Node protection

If your node has the protection commandclass, you can change the protection level of the node.
Check your device manual on how to use this setting, as it is different between manufacturers.
Set the new selection by pressing the **Set Protection** button.

### Node user codes

If your node has user codes, you can set and delete them. The format is raw hex ASCII code. Below the input you will see your actual code. For normal nodes this is as follows:

```yaml
\x30 = 0
\x31 = 1
\x32 = 2
\x33 = 3
\x34 = 4
\x35 = 5
\x36 = 6
\x37 = 7
\x38 = 8
\x39 = 9
```

Some non compliant device like tag readers, have implemented to use raw hex code.
Please refer to a [hex ASCII table](https://www.asciitable.com/) to set your code.

Here is a small Python program than will take numbers on the command line and print the correct sequence for compliant devices:

```python
#! /usr/bin/python3
import sys

translations = {}

for x in range(0, 10):
    translations["%s" % x] = "\\x3%s" % x

for c in sys.argv[1]:
    print(translations[c], end="")
```

### OZW Log

If you want to only retrieve some lines at the end of the log, you can specify that with the selection field. Max is the last 1000 lines and minimum is 0 which equals the whole log. If this is not specified, you will retrieve the whole log.
Select **Load** to open a new window with the static log.
Select **Tail** to open a new window with a tailing log with the last specified lines of the log. This is a self updating window.
