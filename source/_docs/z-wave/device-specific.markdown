---
title: "Z-Wave Device Specific Settings"
description: "Notes for specific Z-Wave devices."
---

## Device Categories

### Motion or alarm sensors

In order for Home Assistant to recognize the sensor properly, you will need to change its configuration from `Basic Set (default)` to `Binary Sensor report` or `Alarm report`.
These devices will either show as a binary sensor or a sensor called `Alarm xxxx` and will report a numeric value. Test to see what value is what. Sometimes this is noted in the device manual.

You can set the settings of the Z-Wave device through the Z-Wave control panel.

### Locks and other secure devices

These devices require a network key to be set for the Z-Wave network before they are paired, using the **Add Node Secure** option.

Home Assistant stores logs from Z-Wave in `OZW_log.txt` in the Home Assistant configuration directory, when you pair a secure device you should see communication from the node with lines starting with `info: NONCES` in `OZW_log.txt` when the device is paired successfully with a secure connection.

### Specific Devices

### Aeotec Z-Stick

It's totally normal for your Z-Wave stick to cycle through its LEDs (Yellow, Blue and Red) while plugged into your system. If you don't like this behavior it can be turned off.

Use the following example commands from a terminal session on your Pi where your Z-Wave stick is connected.

**Note:** You should only do this when Home Assistant has been stopped.

Turn off "Disco lights":

```bash
echo -e -n "\x01\x08\x00\xF2\x51\x01\x00\x05\x01\x51" > /dev/serial/by-id/usb-0658_0200-if00
```

Turn on "Disco lights":

```bash
echo -e -n "\x01\x08\x00\xF2\x51\x01\x01\x05\x01\x50" > /dev/serial/by-id/usb-0658_0200-if00
```

If the above two commands give errors about not having that device, you should try replacing the `/dev/serial/by-id/usb-0658_0200-if00` with `/dev/ttyACM0` or `/dev/ttyACM1` (depending on which tty your Aeotec stick is addressed to).

On some systems, such as macOS, you need to pipe the output of the `echo` command, rather than redirecting to the serial device, to something like `cu` (replacing `/dev/zstick` acccordingly) to properly set the baud rate to 115200 bps:

```bash
echo -e -n "...turn on/off string from examples above..." | cu -l /dev/zstick -s 115200
```

### Razberry Board

You need to disable the on-board Bluetooth since the board requires the use of the hardware UART (and there's only one on the Pi3). You do this by adding the following to the end of `/boot/config.txt`:

For both processes below you will need to insert your SD card into your PC and open the `/boot/config.txt` file with your favorite text editor.

#### Raspberry Pi 4 procedure

Add the following paramaters to the bottom of the `/boot/config.txt` file.

```text
dtoverlay=disable-bt
enable_uart=1
```

Reboot your Pi 4 without the Razberry Z-Wave hat first. Then shutdown, add the hat back, and boot again.

#### Raspberry Pi 3 procedure

Add the following parameters to the bottom of the `/boot/config.txt` file.

```text
dtoverlay=disable-bt
```

Reboot your Pi 3.

For Home Assistant OS this should be everything you need to do. You should now be able to use Razberry Z-Wave from `/dev/ttyAMA0`.

For other operating systems such as Raspberry Pi OS you will also have to run the following command:

```bash
sudo systemctl disable hciuart
```

You should also check the README for details on the overlays. You might find it in `/boot/overlays/README` on your SD-card. If it is not there you can find [the official version here](https://github.com/raspberrypi/firmware/blob/master/boot/overlays/README).

<div class='note'>

  It is possible to keep a limited Bluetooth functionality while using Razberry Z-Wave. Check `boot/overlays/README` on `miniuart-bt`.

</div>

<div class='note'>

  `disable-bt` was previously known as `pi3-disable-bt`. If your OS is old, you might need to use this instead.

</div>

<div class='note'>

  If you've installed the Z-Way software, you'll need to ensure you disable it before you install Home Assistant or you won't be able to access the board. Do this with `sudo /etc/init.d/z-way-server stop; sudo update-rc.d z-way-server disable`.

</div>

### Aeon Minimote

Here's a handy configuration for the Aeon Labs Minimote that defines all possible button presses. Put it into `automation.yaml`.

```yaml
  - id: mini_1_pressed
    alias: "Minimote Button 1 Pressed"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 1
  - id: mini_1_held
    alias: "Minimote Button 1 Held"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 2
  - id: mini_2_pressed
    alias: "Minimote Button 2 Pressed"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 3
  - id: mini_2_held
    alias: "Minimote Button 2 Held"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 4
  - id: mini_3_pressed
    alias: "Minimote Button 3 Pressed"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 5
  - id: mini_3_held
    alias: "Minimote Button 3 Held"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 6
  - id: mini_4_pressed
    alias: "Minimote Button 4 Pressed"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 7
  - id: mini_4_held
    alias: "Minimote Button 4 Held"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 8
```

### Zooz Toggle Switches

Some models of the Zooz Toggle switches ship with an instruction manual with incorrect instruction for Z-Wave inclusion/exclusion. The instructions say that the switch should be quickly switched on-off-on for inclusion and off-on-off for exclusion. However, the correct method is on-on-on for inclusion and off-off-off for exclusion.

### Inovelli Light/Fan Combo (LZW36)
Follow the [instructions](https://support.inovelli.com/portal/kb/articles/installation-setup-lzw36-fan-light-red-series-gen-2-home-assistant-hass-io) provided by Inovelli. You will need to uncomment command class 38 in the imported configuration file.

```xml
  <CommandClass id="38">
    <Instance index="1" label="Fan/Light" />
    <Instance index="2" endpoint="1" label="Light" />
    <Instance index="3" endpoint="2" label="Fan" />
  </CommandClass>
```

## Central Scene configuration

To provide Central Scene support you need to **stop your Z-Wave network** and modify your `zwcfg_*.xml` file according to the following guides. Start your Z-Wave network again after editing `zwcfg_*.xml`.

### Inovelli Scene Capable On/Off and Dimmer Wall Switches

For Inovelli switches, you'll need to update (or possibly add) the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg_*.xml` file with the following:

```xml
      <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
        <Instance index="1" />
        <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
        <Value type="int" genre="user" instance="1" index="1" label="Bottom Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
        <Value type="int" genre="user" instance="1" index="2" label="Top Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
      </CommandClass>
```

For Inovelli LZW30-SN and LZW31-SN switches with a third button for configuration, you'll need to add a third scene for that under the COMMAND_CLASS_CENTRAL_SCENE CommandClass:

```xml
        <Value type="int" genre="user" instance="1" index="3" label="Config Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
```

Once this is complete, `zwave.scene_activated` events will fire according to which button press you perform. For information on what button press corresponds to what scene_id and scene_data in the event, see [Inovelli Knowledge Base > How To: Setting Up Scenes In Home Assistant](https://support.inovelli.com/portal/en/kb/articles/how-to-setting-up-scenes-in-home-assistant).

### Zooz Scene Capable On/Off and Dimmer Wall Switches (Zen21v3 & Zen22v2 - Firmware 3.0+, Zen26 & Zen27 - Firmware 2.0+, Zen30 Double Switch, Zen32 Scene Controller, Zen34 Remote Switch)

Many Zooz switches that have been sold do not have the latest firmwares. Contact Zooz to obtain the over the air firmware update instructions and new user manual for the switches.

Once the firmware is updated, the the new configuration parameters will have to be added to the `zwcfg` file. Replace the existing `COMMAND_CLASS_CONFIGURATION` with the one of the following options (depending on your model of switch):

Zen21v3 (On/Off Switch):

```xml
<CommandClass id="112" name="COMMAND_CLASS_CONFIGURATION" version="1">
  <Instance index="1" />
  <Value type="list" genre="config" instance="1" index="1" label="Paddle Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="0" size="1">
    <Help>Normal mode: Upper paddle turns the light on, lower paddle turns the light off. Reverse mode: Upper paddle turns the light off, lower paddle turns the light on. Toggle mode: Either paddle toggles the light.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Toggle" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="2" label="LED Indication Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="3" vindex="1" size="1">
    <Help>LED Indication light function. Normal has the LED Indication on when the switch is off, off when the switch is on.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Always Off" value="2" />
    <Item label="Always On" value="3" />
  </Value>
  <Value type="list" genre="config" instance="1" index="3" label="Enable Auto Turn-Off Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="4" label="Auto Turn-Off Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Time, in minutes, for auto-off timer delay.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="5" label="Enable Auto Turn-On Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="6" label="Auto Turn-On Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Set the time (in minutes) after which you want the switch to automatically turn on once it has been turned off.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="7" label="Association Reports" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="15" vindex="15" size="1">
    <Help>Choose which physical and Z-Wave triggers should prompt the switch to send a status change report to associated devices.</Help>
    <Item label="none" value="0" />
    <Item label="physical tap on ZEN21 only" value="1" />
    <Item label="physical tap on connected 3-way switch only" value="2" />
    <Item label="physical tap on ZEN21 or connected 3-way switch" value="3" />
    <Item label="Z-Wave command from hub" value="4" />
    <Item label="physical tap on ZEN21 or Z-Wave command from hub" value="5" />
    <Item label="physical tap on connected 3-way switch or Z-Wave command from hub" value="6" />
    <Item label="physical tap on ZEN21 / connected 3-way switch or Z-Wave command from hub" value="7" />
    <Item label="timer only" value="8" />
    <Item label="physical tap on ZEN21 or timer" value="9" />
    <Item label="physical tap on connected 3-way switch or timer" value="10" />
    <Item label="physical tap on ZEN21 / connected 3-way switch or timer" value="11" />
    <Item label="Z-Wave command from hub or timer" value="12" />
    <Item label="physical tap on ZEN21, Z-Wave command from hub, or timer" value="13" />
    <Item label="physical tap on ZEN21 / connected 3-way switch, Z-Wave command from hub, or timer" value="14" />
    <Item label="all of the above. (default)" value="15" />
  </Value>
  <Value type="list" genre="config" instance="1" index="8" label="On Off Status After Power Failure" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="1" size="1">
    <Help>Status after power failure. Off: always turn light off. On: always turn light on. Restore: remember the latest state and restore that state.</Help>
    <Item label="Off" value="0" />
    <Item label="On" value="1" />
    <Item label="Restore" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="9" label="Enable/Disable Scene Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Enable or Disable scene control functionality for quick double tap triggers (Available for select hubs only).</Help>
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="11" label="Smart Bulb Mode: Enable/Disable Paddle / Z-Wave Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="0" size="1">
    <Help>Enable or disable local on/off control. If enabled, you’ll only be able to control the connected light via Z-Wave. Scenes and other functionality will still be available through paddles.</Help>
    <Item label="physical paddle control disabled" value="0" />
    <Item label="physical paddle control enabled (default)" value="1" />
    <Item label="physical paddle and Z-Wave control disabled" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="12" label="3-Way Switch Type" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Help>Choose the type of 3-way switch you want to use with this dimmer in a 3-way set-up. Changing this setting can allow you to control brightness and dim the light from both 3-way locations. Use a regular momentary switch (like the Zooz ZAC99 accessory switch) if value is set to 2.</Help>
    <Item label="regular mechanical 3-way on/off switch(default)" value="0" />
    <Item label="momentary switch, click once to change status (light on or off)" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="13" label="Reporting behavior with disabled physical control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Set reporting behavior for disabled physical control.</Help>
    <Item label="switch reports on/off status and changes LED indicator state even if physical and Z-Wave control is disabled (default)" value="0" />
    <Item label="switch doesn&apos;t report on/off status or change LED indicator state when physical (and Z-Wave) control is disabled" value="1" />
  </Value>
</CommandClass>
```

Zen22v2 (Dimmer):

```xml
<CommandClass id="112" name="COMMAND_CLASS_CONFIGURATION" version="1">
  <Instance index="1" />
  <Value type="list" genre="config" instance="1" index="1" label="Paddle Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="0" size="1">
    <Help>Normal mode: Upper paddle turns the light on, lower paddle turns the light off. Reverse mode: Upper paddle turns the light off, lower paddle turns the light on. Toggle mode: Either paddle toggles the light.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Toggle" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="2" label="LED Indication Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="3" vindex="1" size="1">
    <Help>LED Indication light function. Normal has the LED Indication on when the switch is off, off when the switch is on.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Always Off" value="2" />
    <Item label="Always On" value="3" />
  </Value>
  <Value type="list" genre="config" instance="1" index="3" label="Enable Auto Turn-Off Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="4" label="Auto Turn-Off Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Time, in minutes, for auto-off timer delay.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="5" label="Enable Auto Turn-On Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="6" label="Auto Turn-On Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Set the time (in minutes) after which you want the switch to automatically turn on once it has been turned off.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="7" label="Association Reports" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="15" vindex="15" size="1">
    <Help>Choose which physical and Z-Wave triggers should prompt the switch to send a status change report to associated devices.</Help>
    <Item label="none" value="0" />
    <Item label="physical tap on ZEN22 only" value="1" />
    <Item label="physical tap on connected 3-way switch only" value="2" />
    <Item label="physical tap on ZEN22 or connected 3-way switch" value="3" />
    <Item label="Z-Wave command from hub" value="4" />
    <Item label="physical tap on ZEN22 or Z-Wave command from hub" value="5" />
    <Item label="physical tap on connected 3-way switch or Z-Wave command from hub" value="6" />
    <Item label="physical tap on ZEN22 / connected 3-way switch or Z-Wave command from hub" value="7" />
    <Item label="timer only" value="8" />
    <Item label="physical tap on ZEN22 or timer" value="9" />
    <Item label="physical tap on connected 3-way switch or timer" value="10" />
    <Item label="physical tap on ZEN22 / connected 3-way switch or timer" value="11" />
    <Item label="Z-Wave command from hub or timer" value="12" />
    <Item label="physical tap on ZEN22, Z-Wave command from hub, or timer" value="13" />
    <Item label="physical tap on ZEN22 / connected 3-way switch, Z-Wave command from hub, or timer" value="14" />
    <Item label="all of the above. (default)" value="15" />
  </Value>
  <Value type="list" genre="config" instance="1" index="8" label="On Off Status After Power Failure" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="1" size="1">
    <Help>Status after power failure. Off: always turn light off. On: always turn light on. Restore: remember the latest state and restore that state.</Help>
    <Item label="Off" value="0" />
    <Item label="On" value="1" />
    <Item label="Restore" value="2" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="9" label="Ramp Rate Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="99" value="0">
    <Help>Adjust the physical ramp rate for your dimmer (fade-in / fade-out effect for on / off operation). Values correspond to the number of seconds it take for the dimmer to reach full brightness or turn off when operated manually. This setting is for physical taps only, see parameter 17 to adjust Z-Wave ramp rate. Values: 1 – 99 (seconds). 0 – instant on/off. Default: 1</Help>
  </Value>
  <Value type="byte" genre="config" instance="1" index="10" label="Minimum Brightness" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="99" value="1">
    <Help>Set the minimum brightness level (in %) for your dimmer. You won’t be able to dim the light below the set value. Default: 1</Help>
  </Value>
  <Value type="byte" genre="config" instance="1" index="11" label="Maximum Brightness" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="99" value="99">
    <Help>Set the maximum brightness level (in %) for your dimmer. You won’t be able to add brightness to the light beyond the set value. Note: if Parameter 12 is set to value 0, Parameter 11 is automatically disabled. Default: 99</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="12" label="Double Tap Function" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Help>Double Tap action. When set to Full, turns light on to 100%. If set to Maximum Level, turns light on to % set in Parameter 11.</Help>
    <Item label="Full" value="0" />
    <Item label="Maximum Level" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="13" label="Enable/Disable Scene Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Enable or Disable scene control functionality for quick double tap triggers.</Help>
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="14" label="Enable/Disable Double-tap" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="2" size="1">
    <Help>Enables/Disables the double-tap fucntion and assign brightness to single tap. Last level: single tap returns to last brightness level. Full/Max level: single tap returns to full/max level</Help>
    <Item label="Enabled" value="0" />
    <Item label="Disabled (last level)" value="1" />
    <Item label="Disabled (full/max level)" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="15" label="Smart Bulb Mode: Enable/Disable Paddle / Z-Wave Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="1" size="1">
    <Help>Enable or disable local on/off control. If enabled, you’ll only be able to control the connected light via Z-Wave. Scenes and other functionality will still be available through paddles.</Help>
    <Item label="physical paddle control disabled" value="0" />
    <Item label="physical paddle control enabled (default)" value="1" />
    <Item label="physical paddle and Z-Wave control disabled" value="2" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="16" label="Physical Dimming Speed" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="99" value="4">
    <Help>Set the time it takes to get from 0% to 100% brightness when pressing and holding the paddle (physical dimming). The number entered as value corresponds to the number of seconds. Default: 4</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="17" label="Zwave Ramp Rate Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Choose if you want to set the Z-Wave ramp rate independently of the physical ramp rate (using an appropriate command in your hub) or if you want them to match.</Help>
    <Item label="Z-Wave ramp rate matches the physical ramp rate set in parameter 9" value="0" />
    <Item label="Z-Wave ramp rate is set independently using appropriate Z-Wave commands (default)" value="1" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="18" label="Custom Brightness Level On" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="99" value="0">
    <Help>Set the custom brightness level (instead of the last set brightness level) you want the dimmer to come on to when you single tap the upper paddle. Default: 0 - last brightness level</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="19" label="3-Way Switch Type" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="3" vindex="0" size="1">
    <Help>Choose the type of 3-way switch you want to use with this dimmer in a 3-way set-up. Changing this setting can allow you to control brightness and dim the light from both 3-way locations. Use a regular momentary switch (like the Zooz ZAC99 accessory switch) if value is set to 2.</Help>
    <Item label="regular mechanical 3-way on/off switch, use the connected 3-way switch to turn the light off or on to the last brightness level, dimming only available from the Zooz Z-Wave dimmer and from the hub (or through voice control if smart speaker is integrated with your Z-Wave hub) (default)" value="0" />
    <Item label="regular mechanical 3-way on/off switch, tap the paddles once to change state (light on or off), tap the paddles twice quickly to turn light on to full brightness, tap the paddles quickly 3 times to enable a dimming sequence (the light will start dimming up and down in a loop) and tap the switch again to set the selected brightness level" value="1" />
    <Item label="momentary switch, click once to change status (light on or off), click twice quickly to turn light on to full brightness, press and hold to adjust brightness (dim up / dim down in sequence)" value="2" />
    <Item label="momentary switch, click once to change status (light on or off), click twice quickly to turn light on to full brightness, press and hold to adjust brightness (dim up / dim down in sequence but always reduce brightness after double click)" value="3" />
  </Value>
  <Value type="list" genre="config" instance="1" index="20" label="Zwave tap and hold Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Help>Choose how you&apos;d like the dimmer to report when paddles are tapped and held and physical / Z-Wave control is enabled or disabled.</Help>
    <Item label="report each brightness level to hub when physical / Z-Wave control is disabled for physical dimming (final level only reported if physical / Z-Wave control is enabled)" value="0" />
    <Item label="report final brightness level only for physical dimming, regardless of the physical / Z-Wave control mode" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="21" label="Reporting behavior with disabled physical control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Set reporting behavior for disabled physical control.</Help>
    <Item label="switch reports on/off status and changes LED indicator state even if physical and Z-Wave control is disabled (default)" value="0" />
    <Item label="switch doesn&apos;t report on/off status or change LED indicator state when physical (and Z-Wave) control is disabled" value="1" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="22" label="Night Light Mode" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="99" value="0">
    <Help>Set the brightness level the dimmer will turn on to when off and when lower paddle is held DOWN for a second. Default: 20</Help>
  </Value>
</CommandClass>
```

Zen26 (On/Off Switch):

```xml
<CommandClass id="112" name="COMMAND_CLASS_CONFIGURATION" version="1">
  <Instance index="1" />
  <Value type="list" genre="config" instance="1" index="1" label="Paddle Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="0" size="1">
    <Help>Normal mode: Upper paddle turns the light on, lower paddle turns the light off. Reverse mode: Upper paddle turns the light off, lower paddle turns the light on. Toggle mode: Either paddle toggles the light.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Toggle" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="2" label="LED Indication Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="3" vindex="1" size="1">
    <Help>LED Indication light function. Normal has the LED Indication on when the switch is off, off when the switch is on.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Always Off" value="2" />
    <Item label="Always On" value="3" />
  </Value>
  <Value type="list" genre="config" instance="1" index="3" label="Enable Auto Turn-Off Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="4" label="Auto Turn-Off Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Time, in minutes, for auto-off timer delay.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="5" label="Enable Auto Turn-On Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="6" label="Auto Turn-On Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Set the time (in minutes) after which you want the switch to automatically turn on once it has been turned off.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="7" label="Association Reports" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="15" vindex="15" size="1">
    <Help>Choose which physical and Z-Wave triggers should prompt the switch to send a status change report to associated devices.</Help>
    <Item label="none" value="0" />
    <Item label="physical tap on ZEN26 only" value="1" />
    <Item label="physical tap on connected 3-way switch only" value="2" />
    <Item label="physical tap on ZEN26 or connected 3-way switch" value="3" />
    <Item label="Z-Wave command from hub" value="4" />
    <Item label="physical tap on ZEN26 or Z-Wave command from hub" value="5" />
    <Item label="physical tap on connected 3-way switch or Z-Wave command from hub" value="6" />
    <Item label="physical tap on ZEN26 / connected 3-way switch or Z-Wave command from hub" value="7" />
    <Item label="timer only" value="8" />
    <Item label="physical tap on ZEN26 or timer" value="9" />
    <Item label="physical tap on connected 3-way switch or timer" value="10" />
    <Item label="physical tap on ZEN26 / connected 3-way switch or timer" value="11" />
    <Item label="Z-Wave command from hub or timer" value="12" />
    <Item label="physical tap on ZEN26, Z-Wave command from hub, or timer" value="13" />
    <Item label="physical tap on ZEN26 / connected 3-way switch, Z-Wave command from hub, or timer" value="14" />
    <Item label="all of the above. (default)" value="15" />
  </Value>
  <Value type="list" genre="config" instance="1" index="8" label="On Off Status After Power Failure" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="1" size="1">
    <Help>Status after power failure. Off: always turn light off. On: always turn light on. Restore: remember the latest state and restore that state.</Help>
    <Item label="Off" value="0" />
    <Item label="On" value="1" />
    <Item label="Restore" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="10" label="Enable/Disable Scene Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Enable or Disable scene control functionality for quick double tap triggers (Available for select hubs only).</Help>
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="11" label="Smart Bulb Mode: Enable/Disable Paddle / Z-Wave Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="0" size="1">
    <Help>Enable or disable local on/off control. If enabled, you’ll only be able to control the connected light via Z-Wave. Scenes and other functionality will still be available through paddles.</Help>
    <Item label="physical paddle control disabled" value="0" />
    <Item label="physical paddle control enabled (default)" value="1" />
    <Item label="physical paddle and Z-Wave control disabled" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="13" label="Reporting behavior with disabled physical control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Set reporting behavior for disabled physical control.</Help>
    <Item label="switch reports on/off status and changes LED indicator state even if physical and Z-Wave control is disabled (default)" value="0" />
    <Item label="switch doesn&apos;t report on/off status or change LED indicator state when physical (and Z-Wave) control is disabled" value="1" />
  </Value>
</CommandClass>
```

Zen27 (Dimmer):

```xml
<CommandClass id="112" name="COMMAND_CLASS_CONFIGURATION" version="1">
  <Instance index="1" />
  <Value type="list" genre="config" instance="1" index="1" label="Paddle Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="0" size="1">
    <Help>Normal mode: Upper paddle turns the light on, lower paddle turns the light off. Reverse mode: Upper paddle turns the light off, lower paddle turns the light on. Toggle mode: Either paddle toggles the light.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Toggle" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="2" label="LED Indication Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="3" vindex="1" size="1">
    <Help>LED Indication light function. Normal has the LED Indication on when the switch is off, off when the switch is on.</Help>
    <Item label="Normal" value="0" />
    <Item label="Reverse" value="1" />
    <Item label="Always Off" value="2" />
    <Item label="Always On" value="3" />
  </Value>
  <Value type="list" genre="config" instance="1" index="3" label="Enable Auto Turn-Off Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="4" label="Auto Turn-Off Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Time, in minutes, for auto-off timer delay.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="5" label="Enable Auto Turn-On Timer" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="int" genre="config" instance="1" index="6" label="Auto Turn-On Timer Duration" units="minutes" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="65535" value="60">
    <Help>Set the time (in minutes) after which you want the switch to automatically turn on once it has been turned off.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="7" label="Association Reports" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="15" vindex="15" size="1">
    <Help>Choose which physical and Z-Wave triggers should prompt the switch to send a status change report to associated devices.</Help>
    <Item label="none" value="0" />
    <Item label="physical tap on ZEN27 only" value="1" />
    <Item label="physical tap on connected 3-way switch only" value="2" />
    <Item label="physical tap on ZEN27 or connected 3-way switch" value="3" />
    <Item label="Z-Wave command from hub" value="4" />
    <Item label="physical tap on ZEN27 or Z-Wave command from hub" value="5" />
    <Item label="physical tap on connected 3-way switch or Z-Wave command from hub" value="6" />
    <Item label="physical tap on ZEN27 / connected 3-way switch or Z-Wave command from hub" value="7" />
    <Item label="timer only" value="8" />
    <Item label="physical tap on ZEN27 or timer" value="9" />
    <Item label="physical tap on connected 3-way switch or timer" value="10" />
    <Item label="physical tap on ZEN27 / connected 3-way switch or timer" value="11" />
    <Item label="Z-Wave command from hub or timer" value="12" />
    <Item label="physical tap on ZEN27, Z-Wave command from hub, or timer" value="13" />
    <Item label="physical tap on ZEN27 / connected 3-way switch, Z-Wave command from hub, or timer" value="14" />
    <Item label="all of the above. (default)" value="15" />
  </Value>
  <Value type="list" genre="config" instance="1" index="8" label="On Off Status After Power Failure" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="2" size="1">
    <Help>Status after power failure. Off: always turn light off. On: always turn light on. Restore: remember the latest state and restore that state.</Help>
    <Item label="Off" value="0" />
    <Item label="On" value="1" />
    <Item label="Restore" value="2" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="9" label="Ramp Rate Control" units="seconds" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="99" value="1">
    <Help>Adjust the physical ramp rate for your dimmer (fade-in / fade-out effect for on / off operation). Values correspond to the number of seconds it take for the dimmer to reach full brightness or turn off when operated manually. This setting is for physical taps only, see parameter 17 to adjust Z-Wave ramp rate. Values: 1 – 99 (seconds). 0 – instant on/off. Default: 1</Help>
  </Value>
  <Value type="byte" genre="config" instance="1" index="10" label="Minimum Brightness" units="%" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="99" value="1">
    <Help>Set the minimum brightness level (in %) for your dimmer. You won&apos;t be able to dim the light below the set value.</Help>
  </Value>
  <Value type="byte" genre="config" instance="1" index="11" label="Maximum Brightness" units="%" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="99" value="99">
    <Help>Set the maximum brightness level (in %) for your dimmer. You won&apos;t be able to add brightness to the light beyond the set value. Note: if Parameter 12 is set to value &quot;Full&quot;, Parameter 11 is automatically disabled.</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="12" label="Double Tap Function" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Help>Double Tap action. When set to Full, turns light on to 100%. If set to Maximum Level, turns light on to % set in Parameter 11.</Help>
    <Item label="Full" value="0" />
    <Item label="Maximum Level" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="13" label="Enable/Disable Scene Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Enable or Disable scene control functionality for quick double tap triggers.</Help>
    <Item label="Disabled" value="0" />
    <Item label="Enabled" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="14" label="Enable/Disable Double-tap" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="0" size="1">
    <Help>Enables/Disables the double-tap function and assign brightness to single tap. Last level: single tap returns to last brightness level. Full/Max level: single tap returns to full/max level</Help>
    <Item label="Enabled" value="0" />
    <Item label="Disabled (last level)" value="1" />
    <Item label="Disabled (full/max level)" value="2" />
  </Value>
  <Value type="list" genre="config" instance="1" index="15" label="Smart Bulb Mode: Enable/Disable Paddle / Z-Wave Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="2" vindex="1" size="1">
    <Help>Enable or disable local on/off control. If enabled, you’ll only be able to control the connected light via Z-Wave. Scenes and other functionality will still be available through paddles.</Help>
    <Item label="physical paddle control disabled" value="0" />
    <Item label="physical paddle control enabled (default)" value="1" />
    <Item label="physical paddle and Z-Wave control disabled" value="2" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="16" label="Physical Dimming Speed" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="1" max="99" value="4">
    <Help>Set the time it takes to get from 0% to 100% brightness when pressing and holding the paddle (physical dimming). The number entered as value corresponds to the number of seconds. Default: 4</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="17" label="Zwave Ramp Rate Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
    <Help>Choose if you want to set the Z-Wave ramp rate independently of the physical ramp rate (using an appropriate command in your hub) or if you want them to match.</Help>
    <Item label="Z-Wave ramp rate matches the physical ramp rate set in parameter 9" value="0" />
    <Item label="Z-Wave ramp rate is set independently using appropriate Z-Wave commands (default)" value="1" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="18" label="Custom Brightness Level On" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="99" value="0">
    <Help>Set the custom brightness level (instead of the last set brightness level) you want the dimmer to come on to when you single tap the upper paddle. Default: 0 - last brightness level</Help>
  </Value>
  <Value type="list" genre="config" instance="1" index="20" label="Zwave tap and hold Control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Help>Choose how you&apos;d like the dimmer to report when paddles are tapped and held and physical / Z-Wave control is enabled or disabled.</Help>
    <Item label="report each brightness level to hub when physical / Z-Wave control is disabled for physical dimming (final level only reported if physical / Z-Wave control is enabled)" value="0" />
    <Item label="report final brightness level only for physical dimming, regardless of the physical / Z-Wave control mode" value="1" />
  </Value>
  <Value type="list" genre="config" instance="1" index="21" label="Reporting behavior with disabled physical control" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="0" size="1">
    <Help>Set reporting behavior for disabled physical control.</Help>
    <Item label="switch reports on/off status and changes LED indicator state even if physical and Z-Wave control is disabled (default)" value="0" />
    <Item label="switch doesn&apos;t report on/off status or change LED indicator state when physical (and Z-Wave) control is disabled" value="1" />
  </Value>
  <Value type="byte" genre="config" instance="1" index="22" label="Night Light Mode" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="99" value="0">
    <Help>Set the brightness level the dimmer will turn on to when off and when lower paddle is held DOWN for a second. Default: 20</Help>
  </Value>
</CommandClass>
```

Zen30 (Double Switch):

```xml
<CommandClass id="112">
  <Value type="list" genre="config" index="1" label="LED Indicator Mode for Dimmer" size="1" min="0" max="3" value="0">
    <Help>LED Indicator Mode for Dimmer.  Normal has the dimmer (top) LED indication on when the switch is off, off when the switch is on.  Default: Normal</Help>
    <Item label="Normal" value="0"/>
    <Item label="Reverse" value="1"/>
    <Item label="Always Off" value="2"/>
    <Item label="Always On" value="3"/>
  </Value>
  <Value type="list" genre="config" index="2" label="LED Indicator Mode for Relay" size="1" min="0" max="3" value="0">
    <Help>LED Indicator Mode for Relay.  Normal has the relay (bottom) LED indication on when the switch is off, off when the switch is on.  Default: Normal</Help>
    <Item label="Normal" value="0"/>
    <Item label="Reverse" value="1"/>
    <Item label="Always Off" value="2"/>
    <Item label="Always On" value="3"/>
  </Value>
  <Value type="list" genre="config" index="3" label="LED Indicator Color for Dimmer" size="1" min="0" max="3" value="0">
    <Help>LED Indicater color for Dimmer.  White, Blue, Green or Red.  Default: White</Help>
    <Item label="white" value="0"/>
    <Item label="blue" value="1"/>
    <Item label="green" value="2"/>
    <Item label="red" value="3"/>
  </Value>
  <Value type="list" genre="config" index="4" label="LED Indicator Color for Relay" size="1" min="0" max="3" value="0">
    <Help>LED Indicater color for Relay.  White, Blue, Green or Red.  Default: White</Help>
    <Item label="white" value="0"/>
    <Item label="blue" value="1"/>
    <Item label="green" value="2"/>
    <Item label="red" value="3"/>
  </Value>
  <Value type="list" genre="config" index="5" label="LED Indicator Brightness for Dimmer" size="1" min="0" max="2" value="1">
    <Help>LED Indicater Brightness for Dimmer.  Bright (100%), Medium (60%) or Low (30%).  Default: Medium</Help>
    <Item label="bright" value="0"/>
    <Item label="medium" value="1"/>
    <Item label="low" value="2"/>
  </Value>
  <Value type="list" genre="config" index="6" label="LED Indicator Brightness for Relay" size="1" min="0" max="2" value="1">
    <Help>LED Indicater Brightness for Relay.  Bright (100%), Medium (60%) or Low (30%).  Default: Medium</Help>
    <Item label="bright" value="0"/>
    <Item label="medium" value="1"/>
    <Item label="low" value="2"/>
  </Value>
  <Value type="list" genre="config" index="7" label="LED Indicator Mode for Scene Control" size="1" min="0" max="1" value="1">
    <Help>LED Indicator Mode for Scene Control.  Enable/Disable LED indicators next to the dimmer lighting up when a scene is selected.  Default: disabled</Help>
    <Item label="enabled" value="0"/>
    <Item label="disabled" value="1"/>
  </Value>
  <Value type="int" genre="config" index="8" label="Auto Turn-Off Timer for Dimmer" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-Off Timer for Dimmer.  Sets the time (in minutes) after which you want the dimmer to automatically turn off once it has been turned on.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="9" label="Auto Turn-On Timer for Dimmer" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-On Timer for Dimmer.  Sets the time (in minutes) after which you want the dimmer to automatically turn on once it has been turned off.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="10" label="Auto Turn-Off Timer for Relay" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-Off Timer for Relay.  Sets the time (in minutes) after which you want the relay to automatically turn off once it has been turned on.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="11" label="Auto Turn-On Timer for Relay" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-On Timer for Relay.  Sets the time (in minutes) after which you want the relay to automatically turn on once it has been turned off.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="list" genre="config" index="12" label="On Off Status After Power Failure" size="1" min="0" max="8" value="3">
    <Help>On Off Status After Power Failure.  Default: Restore both to prior state</Help>
    <Item label="Both forced off" value="0"/>
    <Item label="Dimmer off/Relay on" value="1"/>
    <Item label="Dimmer on/Relay off" value="2"/>
    <Item label="Restore both to prior state" value="3"/>
    <Item label="Restore Dimmer/Relay On" value="4"/>
    <Item label="Restore Dimme/Relay Off" value="5"/>
    <Item label="Dimmer On/Restore Relay" value="6"/>
    <Item label="Dimmer Off/Restore Relay" value="7"/>
    <Item label="Both forced on" value="8"/>
  </Value>
  <Value type="byte" genre="config" index="13" label="Ramp Rate Control for Dimmer" size="1" min="0" max="99" value="1" units="seconds">
    <Help>Ramp Rate Control for Dimmer.  Adjust the ramp rate for your dimmer (fade-in / fade-out effect for on / off operation). Values correspond to the number of seconds it take for the dimmer to reach full brightness or turn off when operated manually. Note that 0 is instant.  Default: 1</Help>
  </Value>
  <Value type="byte" genre="config" index="14" label="Minimum Brightness" size="1" min="1" max="99" value="1" units="%">
    <Help>Minimum Brightness.  Set the minimum brightness level (in %) for your dimmer. You won't be able to dim the light below the set value.  Default: 1</Help>
  </Value>
  <Value type="byte" genre="config" index="15" label="Maximum Brightness" size="1" min="1" max="99" value="99" units="%">
    <Help>Maximum Brightness.  Set the maximum brightness level (in %) for your dimmer. You won't be able to add brightness to the light beyond the set value.  Default: 99</Help>
  </Value>
  <Value type="list" genre="config" index="17" label="Double Tap Function for Dimmer" size="1" min="0" max="1" value="0">
    <Help>Double Tap Function for Dimmer.  When set to full, turns light on to 100%.  If set to maximum level, turns light on to % set in Parameter 15.  Default: full</Help>
    <Item label="full" value="0"/>
    <Item label="maximum level" value="1"/>
  </Value>
  <Value type="list" genre="config" index="18" label="Enable/Disable Double-tap for Dimmer" size="1" min="0" max="2" value="0">
    <Help>Enable/Disable Double-tap for Dimmer.  Enables/Disables the double-tap fucntion and assign brightness to single tap.  enabled: single tap turns on to maximum brightness level.  disabled (last level): single tap returns to last brightness level.  disabled (full/max level): single tap returns to full brightmess.  Default: enabled</Help>
    <Item label="enabled" value="0"/>
    <Item label="disabled (last level)" value="1"/>
    <Item label="disabled (full/max level)" value="2"/>
  </Value>
  <Value type="list" genre="config" index="19" label="Enable/Disable Load Control for Dimmer" size="1" min="0" max="2" value="1">
    <Help>Enable/Disable Load Control for Dimmer (Smart Bulb Setting).  Enable or disable direct manual and Z-Wave control of the connected light (works great for smart bulb control).  If disabled, the dimmer will no longer control the connected bulb directly but will still send on/off and brightness reports to the hub so you cn use them to create automations for your smart bulbs or other switches.  Scenes and other functionality will still be available through the paddles.  Default: manual disabled</Help>
    <Item label="manual disabled" value="0"/>
    <Item label="manual enabled" value="1"/>
    <Item label="manual and z-wave disabled" value="2"/>
  </Value>
  <Value type="list" genre="config" index="20" label="Enable/Disable Load Control for Relay" size="1" min="0" max="2" value="1">
    <Help>Enable/Disable Load Control for Relay (Smart Bulb Setting).  Enable or disable direct manual and Z-Wave control of the connected light (works great for smart bulb control).  If disabled, the relay will no longer control the connected bulb directly but will still send on/off and brightness reports to the hub so you cn use them to create automations for your smart bulbs or other switches.  Scenes and other functionality will still be available through the paddles.  Default: manual disabled</Help>
    <Item label="manual disabled" value="0"/>
    <Item label="manual enabled" value="1"/>
    <Item label="manual and z-wave disabled" value="2"/>
  </Value>
  <Value type="byte" genre="config" index="21" label="Manual Dimming Speed" size="1" min="1" max="99" value="4" units="seconds">
    <Help>Choose how many seconds it takes for the dimmer to go from 0% to 100% brightness when pressing and holding the paddle.  Default: 4.</Help>
  </Value>
  <Value type="byte" genre="config" index="23" label="Default Brightness Level On for Dimmer" size="1" min="0" max="99" value="0" units="%">
    <Help>Default Brightness Level On for Dimmer.  Set custom brightness level (in %) for the dimmer to come on to at single tap.  Choose 0 for last brightness level.  Default: 0.</Help>
  </Value>
  <Value type="list" genre="config" index="24" label="Behavior of the dimmer when physical control is disabled" size="1" min="0" max="1" value="0">
    <Help>Sets behavior of the dimmer when physical control is disabled</Help>
    <Item label="Reports on/off and multilevel values back to the hub when buttons are pressed, changes LED indicator to indicate status (default)" value="0"/>
    <Item label="Doesn't report on/off or multilevel status back to the hub and doesn't change LED indicator status when physical control for the dimmer is disabled" value="1"/>
  </Value>
  <Value type="list" genre="config" index="25" label="Behavior of the relay when physical control is disabled" size="1" min="0" max="1" value="0">
    <Help>Sets behavior of the relay when physical control is disabled</Help>
    <Item label="Reports on/off and multilevel values back to the hub when buttons are pressed, changes LED indicator to indicate status (default)" value="0"/>
    <Item label="Doesn't report on/off or multilevel status back to the hub and doesn't change LED indicator status when physical control for the dimmer is disabled" value="1"/>
  </Value>
  <Value type="byte" genre="config" index="26" label="Night Light Mode" units="" min="0" max="99" value="20">
    <Help>Set the brightness level the dimmer will turn on to when off and when lower paddle is held DOWN for a second. Default: 20</Help>
  </Value>
  <Value type="list" genre="config" index="27" label="Paddle Control" size="1" min="0" max="2" value="0">
    <Help>Normal mode: Upper paddle turns the light on, lower paddle turns the light off.  Reverse mode: Upper paddle turns the light off, lower paddle turns the light on.  Toggle mode: Either paddle toggles the light.</Help>
    <Item label="Normal" value="0"/>
    <Item label="Reverse" value="1"/>
    <Item label="Toggle" value="2"/>
  </Value>
</CommandClass>
```
Zen32 Scene Controller:

```xml
<CommandClass id="112">
  <Value type="list" genre="config" index="1" label="LED indicator mode for relay" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="LED on when relay off, LED off when relay on" value="0"/>
    <Item label="LED on when relay on, LED off when relay off" value="1"/>
    <Item label="LED always off" value="2"/>
    <Item label="LED always on" value="3"/>
  </Value>
  <Value type="list" genre="config" index="2" label="LED indicator mode for Button 1" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="LED on when dimmer off, LED off when dimmer on" value="0"/>
    <Item label="LED on when dimmer on, LED off when dimmer off" value="1"/>
    <Item label="LED always off" value="2"/>
    <Item label="LED always on" value="3"/>
  </Value>
  <Value type="list" genre="config" index="3" label="LED indicator mode for Button 2" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="LED on when dimmer off, LED off when dimmer on" value="0"/>
    <Item label="LED on when dimmer on, LED off when dimmer off" value="1"/>
    <Item label="LED always off" value="2"/>
    <Item label="LED always on" value="3"/>
  </Value>
  <Value type="list" genre="config" index="4" label="LED indicator mode for Button 3" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="LED on when dimmer off, LED off when dimmer on" value="0"/>
    <Item label="LED on when dimmer on, LED off when dimmer off" value="1"/>
    <Item label="LED always off" value="2"/>
    <Item label="LED always on" value="3"/>
  </Value>
  <Value type="list" genre="config" index="5" label="LED indicator mode for Button 4" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="LED on when dimmer off, LED off when dimmer on" value="0"/>
    <Item label="LED on when dimmer on, LED off when dimmer off" value="1"/>
    <Item label="LED always off" value="2"/>
    <Item label="LED always on" value="3"/>
  </Value>
  <Value type="list" genre="config" index="6" label="LED indicator color for relay" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="white" value="0"/>
    <Item label="blue" value="1"/>
    <Item label="green" value="2"/>
    <Item label="red" value="3"/>
  </Value>
  <Value type="list" genre="config" index="7" label="LED indicator color for Button 1" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="white" value="0"/>
    <Item label="blue" value="1"/>
    <Item label="green" value="2"/>
    <Item label="red" value="3"/>
  </Value>
  <Value type="list" genre="config" index="8" label="LED indicator color for Button 2" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="white" value="0"/>
    <Item label="blue" value="1"/>
    <Item label="green" value="2"/>
    <Item label="red" value="3"/>
  </Value>
  <Value type="list" genre="config" index="9" label="LED indicator color for Button 3" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="white" value="0"/>
    <Item label="blue" value="1"/>
    <Item label="green" value="2"/>
    <Item label="red" value="3"/>
  </Value>
  <Value type="list" genre="config" index="10" label="LED indicator color for Button 4" size="1" min="0" max="3" value="0">
    <Help></Help>
    <Item label="white" value="0"/>
    <Item label="blue" value="1"/>
    <Item label="green" value="2"/>
    <Item label="red" value="3"/>
  </Value>
  <Value type="list" genre="config" index="11" label="LED indicator brightness for relay" size="1" min="0" max="2" value="0">
    <Help></Help>
    <Item label="bright (100%)" value="0"/>
    <Item label="medium (60%)" value="1"/>
    <Item label="low (30%)" value="2"/>
  </Value>
  <Value type="list" genre="config" index="12" label="LED indicator brightness for Button 1" size="1" min="0" max="2" value="0">
    <Help></Help>
    <Item label="bright (100%)" value="0"/>
    <Item label="medium (60%)" value="1"/>
    <Item label="low (30%)" value="2"/>
  </Value>
  <Value type="list" genre="config" index="13" label="LED indicator brightness for Button 2" size="1" min="0" max="2" value="0">
    <Help></Help>
    <Item label="bright (100%)" value="0"/>
    <Item label="medium (60%)" value="1"/>
    <Item label="low (30%)" value="2"/>
  </Value>
  <Value type="list" genre="config" index="14" label="LED indicator brightness for Button 3" size="1" min="0" max="2" value="0">
    <Help></Help>
    <Item label="bright (100%)" value="0"/>
    <Item label="medium (60%)" value="1"/>
    <Item label="low (30%)" value="2"/>
  </Value>
  <Value type="list" genre="config" index="15" label="LED indicator brightness for Button 4" size="1" min="0" max="2" value="0">
    <Help></Help>
    <Item label="bright (100%)" value="0"/>
    <Item label="medium (60%)" value="1"/>
    <Item label="low (30%)" value="2"/>
  </Value>
  <Value type="int" genre="config" index="16" label="Auto turn-off timer for relay" size="4" min="0" max="65535" value="0" units="minutes">
     <Help>Set the time (in minutes) after which you want the switch to automatically turn off once it has been turned on.</Help>
  </Value>
  <Value type="int" genre="config" index="17" label="Auto turn-on timer for relay" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Set the time (in minutes) after which you want the switch to automatically turn on once it has been turned off.</Help>
  </Value>
  <Value type="list" genre="config" index="18" label="State after power failure" size="1" min="0" max="2" value="0">
    <Help></Help>
    <Item label="Relay and buttons remember and restore last state" value="0"/>
    <Item label="Relay and buttons forced to off after power failure" value="1"/>
    <Item label="Relay and buttons forced to on after power failure" value="2"/>
  </Value>
  <Value type="list" genre="config" index="19" label="Disable / enable control on the relay" size="1" min="0" max="2" value="1">
    <Help></Help>
    <Item label="Disable local / physical control (from the button), enable Z-Wave control" value="0"/>
    <Item label="Enable local / physical control (from the button), enable Z-Wave control" value="1"/>
    <Item label="Disable local / physical control (from the button), disable Z-Wave control" value="2"/>
  </Value>
  <Value type="list" genre="config" index="20" label="Relay behavior with disabled local / Z-Wave control" size="1" min="0" max="1" value="1">
    <Help></Help>
    <Item label="report on/off status when button is pressed and change LED indicator status if Parameter 19 is set to value 0 or 2" value="0"/>
    <Item label="DON’T report on/off status when button is pressed and DON’T change LED indicator status if Parameter 19 is set to value 0 or 2 (but the relay will always send central scene command)" value="1"/>
  </Value>
  <Value type="list" genre="config" index="21" label="3-way switch type" size="1" min="0" max="1" value="0">
    <Help>Choose the type of 3-way switch you want to use with this switch in a 3-way set-up.</Help>
    <Item label="regular mechanical 3-way on/off switch, use the connected 3-way switch to turn the light on or off (default)" value="0"/>
    <Item label="momentary switch, click once to change status (light on or off)" value="1"/>
  </Value>
</CommandClass>
```

Zen34 Remote Switch:

```xml
<CommandClass id="112">
 <Value type="list" index="1" genre="config" label="LED indicator mode" units="" min="0" max="3" value="1" size="1">
     <Help>Choose the LED indicator mode for your Remote Switch</Help>
        <Item label="LED always off" value="0" />
        <Item label="LED on when button is pressed to indicate scene activation or association command" value="1" />
	<Item label="LED always on in color specific under parameter 2" value="2" />
	<Item label="LED always on in color specific under parameter 3" value="3" />
 </Value>
 <Value type="list" index="2" genre="config" label="LED indicator color for upper paddle triggers" units="" min="0" max="6" value="0" size="1">
    <Help>Choose the LED indicator color for the upper paddle remote controle triggers</Help>
        <Item label="White" value="0" />
        <Item label="Blue" value="1" />
   	<Item label="Green" value="2" />
	<Item label="Red" value="3" />
	<Item label="Magenta" value="4" />
	<Item label="Yellow" value="5" />
	<Item label="Cyan" value="6" />
 </Value>
 <Value type="list" index="3" genre="config" label="LED indicator color for lower paddle triggers" units="" min="0" max="6" value="0" size="1">
    <Help>Choose the LED indicator color for the lower paddle remote control triggers</Help>
      <Item label="White" value="0" />
      <Item label="Blue" value="1" />
      <Item label="Green" value="2" />
      <Item label="Red" value="3" />
      <Item label="Magenta" value="4" />
      <Item label="Yellow" value="5" />
      <Item label="Cyan" value="6" />
 </Value>
</CommandClass>
```
For Zooz switches, you'll need to update (or possibly add) the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
  <Instance index="1" />
  <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
  <Value type="int" genre="user" instance="1" index="1" label="Bottom Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
  <Value type="int" genre="user" instance="1" index="2" label="Top Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
</CommandClass>
```

For the Zooz Zen30 Double Switch, you'll need to add the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
  <Instance index="1" />
  <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
  <Value type="int" genre="user" instance="1" index="1" label="Bottom Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
  <Value type="int" genre="user" instance="1" index="2" label="Top Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
  <Value type="int" genre="user" instance="1" index="3" label="Relay Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
</CommandClass>
```

For the Zooz Zen32 Scene Controller, you'll need to add the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
  <Instance index="1" />
  <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
  <Value type="int" genre="user" instance="1" index="1" label="Top Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
  <Value type="int" genre="user" instance="1" index="2" label="Small Button 1 Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
  <Value type="int" genre="user" instance="1" index="3" label="Small Button 2 Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
  <Value type="int" genre="user" instance="1" index="4" label="Small Button 3 Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
  <Value type="int" genre="user" instance="1" index="5" label="Small Button 4 Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
</CommandClass>
</CommandClass>
```

Go to the Z-Wave Network Management section in the Home Assistant Configuration, select the node which has just been updated and enable the scene support configuration parameter.

Once this is complete, you should see the following `zwave.scene_activated` events:

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Single tap off|1|7680
Single tap on|2|7680
Double tap off|1|7860
Double tap on|2|7860
Triple tap off|1|7920
Triple tap on|2|7920
4x tap off|1|7980
4x tap on|2|7980
5x tap off|1|8040
5x tap on|2|8040
Held off|1|7800
Held on|2|7800
Released off|1|7740
Released on|2|7740

The Zooz ZEN34 Remote Switch has shown inverted `scene_id` values compared to other Zooz switches as well as different `scene_data` values depending on production run:

Recent production runs have appeared with:

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
1x tap on|1|7680
1x tap off|2|7680
2x tap on|1|7860
2x tap off|2|7860
3x tap on|1|7920
3x tap off|2|7920
4x tap on|1|7980
4x tap off|2|7980
5x tap on|1|8040
5x tap off|2|8040
Held on|1|7800
Held off|2|7800
Released on|1|7740
Released off|2|7740

Early production runs have appeared with:

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
1x tap on|1|0
1x tap off|2|0
2x tap on|1|3
2x tap off|2|3
3x tap on|1|4
3x tap off|2|4
4x tap on|1|5
4x tap off|2|5
5x tap on|1|6
5x tap off|2|6
Held on|1|2
Held off|2|2
Released on|1|1
Released off|2|1

### HomeSeer Switches

For the HomeSeer devices specifically, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
  <Instance index="1" />
  <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false"   verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
  <Value type="int" genre="user" instance="1" index="1" label="Top Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="user" instance="1" index="2" label="Bottom Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
</CommandClass>
```

Below is a table of the action/scenes for the HomeSeer devices (as a reference for other similar devices):

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Single tap on|1|0
Single tap off|2|0
Double tap on|1|3
Double tap off|2|3
Triple tap on|1|4
Triple tap off|2|4
Tap and hold on|1|2
Tap and hold off|2|2

Some installations will see those details:

**Top button ID: 1, Bottom ID: 2**

**Action**|**scene\_data**
:-----:|:-----:
Single Press|7800
Hold Button|7740
2x Tap|7860
3x Tap|7920
4x Tap|7980
5x Tap|8040

### Fibaro Button FGPB-101-6 v3.2

<!-- from https://hastebin.com/esodiweduq.cs -->

For the Button, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
      <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
        <Instance index="1" />
          <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
          <Value type="int" genre="system" instance="1" index="1" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
      </CommandClass>
```

Below is a table of the action/scenes for the Button (as a reference for other similar devices):

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Single tap on|1|0
Double tap on|1|3
Triple tap on|1|4

Tap and hold wakes up the Button.

### Fibaro Keyfob FGKF-601

For the Fibaro Keyfob, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
      <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="6">
  <Instance index="1" />
  <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="6" />
  <Value type="int" genre="user" instance="1" index="1" label="Square" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="user" instance="1" index="2" label="Circle" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="user" instance="1" index="3" label="X" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="user" instance="1" index="4" label="Triangle" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="user" instance="1" index="5" label="Minus" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="user" instance="1" index="6" label="Plus" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
</CommandClass>
```

Below is a table of the action/scenes for the Keyfob (as a reference for other similar devices):

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Button one (Square) single tap|1|7680
Button one (Square) hold|1|7800
Button one (Square) release|1|7740
Button two (Circle) single tap|2|7680
Button two (Circle) hold|2|7800
Button two (Circle) release|2|7740
Button three (X) single tap|3|7680
Button three (X) hold|3|7800
Button three (X) release|3|7740
Button four (Triangle) single tap|4|7680
Button four (Triangle) hold|4|7800
Button four (Triangle) release|4|7740
Button five (Minus) single tap|5|7680
Button five (Minus) hold|5|7800
Button five (Minus) release|5|7740
Button six (Plus) single tap|6|7680
Button six (Plus) hold|6|7800
Button six (Plus) release|6|7740

Press circle and plus simultaneously to wake up the device.

### Aeotec NanoMote Quad

<!-- from https://products.z-wavealliance.org/products/2817 -->

Once you've added the NanoMote to your Z-Wave network, you'll need to update your `zwcfg_*.xml` file with the below XML data. Stop Home Assistant and open your `zwcfg_*.xml` file (located in your configuration folder). Find the NanoMote device section and then its corresponding `CommandClass` section with id="91". Replace the entire CommandClass section with the below XML data. Save the file and restart Home Assistant.  

```xml
    <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
        <Instance index="1" />
        <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="1" label="Button One" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="2" label="Button Two" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="3" label="Button Three" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="4" label="Button Four" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
    </CommandClass>
```

Below is a table of the action/scenes for the NanoMote Quad:

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Button one single tap|1|7680
Button one hold|1|7800
Button one release|1|7740
Button two single tap|2|7680
Button two hold|2|7800
Button two release|2|7740
Button three single tap|3|7680
Button three hold|3|7800
Button three release|3|7740
Button four single tap|4|7680
Button four hold|4|7800
Button four release|4|7740

Example Event:

```yaml
    "event_type": "zwave.scene_activated",
    "data": {
        "entity_id": "zwave.nanomote",
        "scene_id": 2,
        "scene_data": 7680
    }
```

### Aeotec Wallmote

<!-- from https://hastebin.com/esodiweduq.cs -->

For the Aeotec Wallmote, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
      <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="5" innif="true" scenecount="0">
        <Instance index="1" />
          <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
          <Value type="int" genre="system" instance="1" index="1" label="Button One" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
          <Value type="int" genre="system" instance="1" index="2" label="Button Two" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
          <Value type="int" genre="system" instance="1" index="3" label="Button Three" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
          <Value type="int" genre="system" instance="1" index="4" label="Button Four" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
          <Value type="int" genre="system" instance="1" index="5" label="Other" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      </CommandClass>
```

Below is a table of the action/scenes for the Wallmote (as a reference for other similar devices):

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Button one single tap|1|0
Button one hold|1|2
Button one release|1|1
Button two single tap|2|0
Button two hold|2|2
Button two release|2|1
Button three single tap|3|0
Button three hold|3|2
Button three release|3|1
Button four single tap|4|0
Button four hold|4|2
Button four release|4|1

### WallC-S Switch

Use the same configuration as for the Aeotec Wallmote.

### HANK One-key Scene Controller HKZN-SCN01/HKZW-SCN01

For the HANK One-key Scene Controller, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
      <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="1" innif="true" scenecount="0">
        <Instance index="1" />
        <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="1" label="Button One" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      </CommandClass>
```

Below is a table of the action/scenes for the Button (as a reference for other similar devices):

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Button single tap|1|0
Button hold|1|2
Button release|1|1

### HANK Four-key Scene Controller HKZN-SCN04

For the HANK Four-key Scene Controller, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
      <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="5" innif="true" scenecount="0">
        <Instance index="1" />
        <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="1" label="Button One" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="2" label="Button Two" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="1" />
        <Value type="int" genre="system" instance="1" index="3" label="Button Three" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="1" />
        <Value type="int" genre="system" instance="1" index="4" label="Button Four" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="1" />
        <Value type="int" genre="system" instance="1" index="5" label="Other" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      </CommandClass>
```

Below is a table of the action/scenes for the Buttons and associated Pictogram:

**Action**|**Pictogram**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:|:-----:
Button one tap|Moon and Star|1|0
Button one hold|Moon and Star|1|2
Button one release|Moon and Star|1|1
Button two tap|People|2|0
Button two hold|People|2|2
Button two release|People|2|1
Button three tap|Circle|3|0
Button three hold|Circle|3|2
Button three release|Circle|3|1
Button four tap|Circle with Line|4|0
Button four hold|Circle with Line|4|2
Button four release|Circle with Line|4|1

### Remotec ZRC-90 Scene Master

To get the ZRC-90 Scene Master working in Home Assistant, you must first edit the `COMMAND_CLASS_CENTRAL_SCENE` in your `zwcfg` file.

1. Go the Z-Wave control panel in Home Assistant and make a note of the node number your ZRC-90 has been assigned.
2. *Stop* Home Assistant.
3. Make a backup of your `zwfcg` file, just in case.
4. In the `zwcfg` file, find the `Node id` that corresponds to the number you noted in the first step.
5. Within the `Node id` you identified, highlight everything between `<CommandClass id="91"` and `</CommandClass>` (inclusive) and paste in the following:

    ```xml
    <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="5" innif="true" scenecount="0">
      <Instance index="1" />
      <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="system" instance="1" index="1" label="Scene 1" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
      <Value type="int" genre="system" instance="1" index="2" label="Scene 2" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="system" instance="1" index="3" label="Scene 3" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="system" instance="1" index="4" label="Scene 4" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="1" />
      <Value type="int" genre="system" instance="1" index="5" label="Scene 5" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="system" instance="1" index="6" label="Scene 6" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="system" instance="1" index="7" label="Scene 7" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="system" instance="1" index="8" label="Scene 8" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="system" instance="1" index="9" label="Other" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
    </CommandClass>
    ```

6. Save the changes you made the `zwcfg` file and start Home Assistant back up.

Button presses will trigger `zwave.scene_activated` with the following:

- `node_id`: the node of your Scene Master (useful if you have more than one)
- `scene_id`: the number button you press (1-8)
- `scene_data`: the type of press registered (see below)

The Scene Master has eight buttons which can send four actions.
The type of action is reflected in the `scene_data` parameter:

**Action**|**scene\_data**
:-----:|:-----:
Single press | 0
Long press (2s) | 1
Release from hold | 2
Double-press | 3

Let's see how this works in an automation for a Scene Master that's assigned as Node 7:

```yaml
- id: "1234567890"
  alias: "Double-press Button 2 to toggle all lights"
  trigger:
  - platform: event
    event_type: zwave.scene_activated
    event_data:
      node_id: 7
      scene_id: 2
      scene_data: 3  
  condition: []
  action:
  - data:
    service: light.toggle
      target:
        entity_id: group.all_lights
```

### RFWDC Cooper 5-button Scene Control Keypad

For the RFWDC Cooper 5-button Scene Control Keypad, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="5" innif="true" scenecount="0">
  <Instance index="1" />
  <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="system" instance="1" index="1" label="Button One" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="system" instance="1" index="2" label="Button Two" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="system" instance="1" index="3" label="Button Three" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="system" instance="1" index="4" label="Button Four" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
  <Value type="int" genre="system" instance="1" index="5" label="Button Five" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
</CommandClass>
```

Below is a table of the action/scenes for the Buttons:

**Action**|**scene\_id**
:-----:|:-----:
Button one tap|1
Button two tap|2
Button three tap|3
Button four tap|4
Button five tap|5

When a button turns off, the controller sends `basic_set` in a generic `node_event` and does not specify which button was pressed. The status of the buttons is encoded into the `indicator` value, so in order to determine the status of each button, you need to refresh the indicator value. You can also control the LEDs for each button by setting the indicator value. For responsiveness, automations should be triggered with `zwave.scene_activated` events rather than the switch status.

Here is an example configuration needed for the scene controller:

{% raw %}

```yaml
automation:
  - alias: "Sync the indicator value on button events"
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.scene_contrl
      - platform: event
        event_type: zwave.node_event
        event_data:
          entity_id: zwave.scene_contrl
    action:
      - service: zwave.refresh_node_value
        data:
          node_id: 3
          value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
switch:
  - platform: template
    switches:
      button_1_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(1) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 1 }}"
        turn_off:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 1 }}"
      button_2_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(2) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 2 }}"
        turn_off:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 2 }}"
      button_3_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(4) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 4 }}"
        turn_off:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 4 }}"
      button_4_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(8) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 8 }}"
        turn_off:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 8 }}"
      button_5_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(16) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 16 }}"
        turn_off:
          service: zwave.set_node_value
          data:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 16 }}"
```

### HeatIt/ThermoFloor Z-Push Button 2/8 Wall Switch

To get the Z-Push Button 2 or the Z-Push Button 8 working in Home Assistant, you must first edit the `COMMAND_CLASS_CENTRAL_SCENE` in your `zwcfg` file.

1. Go the Z-Wave control panel in Home Assistant and make a note of the node number your wall switch has been assigned.
2. *Stop* Home Assistant.
3. Make a backup of your `zwfcg` file, just in case.
4. In the `zwcfg` file, find the `Node id` that corresponds to the number you noted in the first step.
5. Within the `Node id` you identified, highlight everything between `<CommandClass id="91"` and `</CommandClass>` (inclusive) and paste in the following:
    - 5.1 For the Z-Push Button 2:

    ```xml
        <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">				<Instance index="1" />
      <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="1" label="Button 1" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="2" label="Button 2" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        </CommandClass>
    ```

    - 5.2 For the Z-Push Button 4:

    ```xml
        <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">				<Instance index="1" />
      <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="1" label="Button 1" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="2" label="Button 2" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="3" label="Button 3" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="4" label="Button 4" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        </CommandClass>
    ```
    
    - 5.3 For the Z-Push Button 8:

    ```xml
        <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">				<Instance index="1" />
      <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="1" label="Button 1" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="2" label="Button 2" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="3" label="Button 3" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="4" label="Button 4" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="5" label="Button 5" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="6" label="Button 6" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="7" label="Button 7" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
      <Value type="int" genre="user" instance="1" index="8" label="Button 8" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        </CommandClass>
    ```

6. Save the changes you made the `zwcfg` file and start Home Assistant back up.

Button presses will trigger `zwave.scene_activated` with the following:

- `scene_id`: the number of the button you press from top left (1) to bottom right (8)

{% endraw %}

### Logicgroup ZDB5100 Matrix

<!-- from https://products.z-wavealliance.org/products/3399/ -->

Once you've added the ZDB5100 to your Z-Wave network, you'll need to update your `zwcfg_*.xml` file with the below XML data. Stop Home Assistant and open your `zwcfg_*.xml` file (located in your configuration folder). Find the ZDB5100 device section and then its corresponding `CommandClass` section with id="91". Replace the entire CommandClass section with the below XML data. Save the file and restart Home Assistant.  

```xml
    <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
        <Instance index="1" />
        <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="1" label="Button One" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="2" label="Button Two" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="3" label="Button Three" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="4" label="Button Four" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
    </CommandClass>
```

Below is a table of the action/scenes for the ZDB5100 Matrix:

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Button one single tap|1|7680
Button one double tap|1|7860
Button one triple tap|1|7920
Button one hold|1|7800
Button one release|1|7740
Button two single tap|2|7680
Button two double tap|2|7860
Button two triple tap|2|7920
Button two hold|2|7800
Button two release|2|7740
Button three single tap|3|7680
Button three double tap|3|7860
Button three triple tap|3|7920
Button three hold|3|7800
Button three release|3|7740
Button four single tap|4|7680
Button four double tap|4|7860
Button four triple tap|4|7920
Button four hold|4|7800
Button four release|4|7740

Example Event:

```yaml
- alias: "MatrixButton2"
  trigger:
    - event_type: zwave.scene_activated
      platform: event
      event_data:
        node_id: 2
        scene_id: 2
        scene_data: 7680
  action:
    - service: switch.toggle
      target:
        entity_id: switch.office_fan
```

### Zooz S2 MultiRelay (Zen16)

Contact Zooz to obtain the over the air firmware update instructions and new user manual for the MultiRelay.

Once the firmware is updated, the the new configuration parameters will have to be added to the `zwcfg` file. Replace the existing `COMMAND_CLASS_CONFIGURATION` with the one of the following options:

```xml
<CommandClass id="112">
  <Value type="list" genre="config" index="1" label="On Off Status After Power Failure" size="1" min="0" max="4" value="1">
    <Help>On Off Status After Power Failure.  Default: all relays restore to previous state</Help>
    <Item label="all relays forced off" value="0"/>
    <Item label="all relays restore to previous state" value="1"/>
    <Item label="all relays forced on" value="2"/>
    <Item label="relays 1/2 restore, 3/4 forced off" value="3"/>
    <Item label="relays 1/2 restore, 3/4 forced on" value="4"/>
  </Value>
  <Value type="list" genre="config" index="2" label="Switch Type for Relay 1 (Sw1)" size="1" min="0" max="3" value="2">
    <Help>Switch Type for Relay 1 (Sw1).  Choose the wall switch type you want to connect to the Sw1 terminal.  Default: toggle switch (state changes whenever the switch is toggled)</Help>
    <Item label="momentary switch" value="0"/>
    <Item label="toggle switch (light on when switch is up/off when down)" value="1"/>
    <Item label="toggle switch (state changes whenever the switch is toggled)" value="2"/>
    <Item label="garage door (momentary mode for Z-Wave control)" value="3"/>
  </Value>
  <Value type="list" genre="config" index="3" label="Switch Type for Relay 2 (Sw2)" size="1" min="0" max="3" value="2">
    <Help>Switch Type for Relay 2 (Sw2).  Choose the wall switch type you want to connect to the Sw2 terminal.  Default: toggle switch (state changes whenever the switch is toggled)</Help>
    <Item label="momentary switch" value="0"/>
    <Item label="toggle switch (light on when switch is up/off when down)" value="1"/>
    <Item label="toggle switch (state changes whenever the switch is toggled)" value="2"/>
    <Item label="garage door (momentary mode for Z-Wave control)" value="3"/>
  </Value>
  <Value type="list" genre="config" index="4" label="Switch Type for Relay 3 (Sw3)" size="1" min="0" max="3" value="2">
    <Help>Switch Type for Relay 3 (Sw3).  Choose the wall switch type you want to connect to the Sw3 terminal.  Default: toggle switch (state changes whenever the switch is toggled)</Help>
    <Item label="momentary switch" value="0"/>
    <Item label="toggle switch (light on when switch is up/off when down)" value="1"/>
    <Item label="toggle switch (state changes whenever the switch is toggled)" value="2"/>
    <Item label="garage door (momentary mode for Z-Wave control)" value="3"/>
  </Value>
  <Value type="list" genre="config" index="5" label="LED Indicator Control" size="1" min="0" max="3" value="0">
    <Help>LED Indicator Control.  Choose if you want the LED indicator to turn on when any of the relays are on or if all of them are off, or if you want it to remain on or off at all times.  Default: On when all relays are off</Help>
    <Item label="On when all relays are off" value="0"/>
    <Item label="On when any relays are on" value="1"/>
    <Item label="Always Off" value="2"/>
    <Item label="Always On" value="3"/>
  </Value>
  <Value type="int" genre="config" index="6" label="Auto Turn-Off Timer for Relay 1" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-Off Timer for Relay 1.  Sets the time (in minutes) after which you want relay 1 to automatically turn off once it has been turned on.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="7" label="Auto Turn-On Timer for Relay 1" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-On Timer for Relay 1.  Sets the time (in minutes) after which you want relay 1 to automatically turn on once it has been turned off.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="8" label="Auto Turn-Off Timer for Relay 2" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-Off Timer for Relay 2.  Sets the time (in minutes) after which you want relay 2 to automatically turn off once it has been turned on.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="9" label="Auto Turn-On Timer for Relay 2" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-On Timer for Relay 2.  Sets the time (in minutes) after which you want relay 2 to automatically turn on once it has been turned off.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="10" label="Auto Turn-Off Timer for Relay 3" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-Off Timer for Relay 3.  Sets the time (in minutes) after which you want relay 3 to automatically turn off once it has been turned on.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="int" genre="config" index="11" label="Auto Turn-On Timer for Relay 3" size="4" min="0" max="65535" value="0" units="minutes">
    <Help>Auto Turn-On Timer for Relay 3.  Sets the time (in minutes) after which you want relay 3 to automatically turn on once it has been turned off.  Range: 1-65535.  Default: 0 (disabled)</Help>
  </Value>
  <Value type="list" genre="config" index="12" label="Enable/Disable Manual Control for SW1" size="1" min="0" max="2" value="1">
    <Help>Enable/Disable Manual Control for SW1.  Default: enabled</Help>
    <Item label="disabled" value="0"/>
    <Item label="enabled" value="1"/>
    <Item label="local control disabled with enable on/off reports" value="2"/>
  </Value>
  <Value type="list" genre="config" index="13" label="Enable/Disable Manual Control for SW2" size="1" min="0" max="2" value="1">
    <Help>Enable/Disable Manual Control for SW2.  Default: enabled</Help>
    <Item label="disabled" value="0"/>
    <Item label="enabled" value="1"/>
    <Item label="local control disabled with enable on/off reports" value="2"/>
  </Value>
  <Value type="list" genre="config" index="14" label="Enable/Disable Manual Control for SW3" size="1" min="0" max="2" value="1">
    <Help>Enable/Disable Manual Control for SW3.  Default: enabled</Help>
    <Item label="disabled" value="0"/>
    <Item label="enabled" value="1"/>
    <Item label="local control disabled with enable on/off reports" value="2"/>
  </Value>
  <Value type="list" genre="config" index="15" label="Auto Turn-Off Timer Unit for Relay 1" size="1" min="0" max="2" value="0">
    <Help>Choose between second, minutes, and hours as the unit for Auto Turn-Off time for Relay 1.  Default: minutes</Help>
    <Item label="minutes" value="0"/>
    <Item label="seconds" value="1"/>
    <Item label="hours" value="2"/>
  </Value>
  <Value type="list" genre="config" index="16" label="Auto Turn-On Timer Unit for Relay 1" size="1" min="0" max="2" value="0">
    <Help>Choose between second, minutes, and hours as the unit for Auto Turn-On time for Relay 1.  Default: minutes</Help>
    <Item label="minutes" value="0"/>
    <Item label="seconds" value="1"/>
    <Item label="hours" value="2"/>
  </Value>
  <Value type="list" genre="config" index="17" label="Auto Turn-Off Timer Unit for Relay 2" size="1" min="0" max="2" value="0">
    <Help>Choose between second, minutes, and hours as the unit for Auto Turn-Off time for Relay 2.  Default: minutes</Help>
    <Item label="minutes" value="0"/>
    <Item label="seconds" value="1"/>
    <Item label="hours" value="2"/>
  </Value>
  <Value type="list" genre="config" index="18" label="Auto Turn-On Timer Unit for Relay 2" size="1" min="0" max="2" value="0">
    <Help>Choose between second, minutes, and hours as the unit for Auto Turn-On time for Relay 2.  Default: minutes</Help>
    <Item label="minutes" value="0"/>
    <Item label="seconds" value="1"/>
    <Item label="hours" value="2"/>
  </Value>
  <Value type="list" genre="config" index="19" label="Auto Turn-Off Timer Unit for Relay 3" size="1" min="0" max="2" value="0">
    <Help>Choose between second, minutes, and hours as the unit for Auto Turn-Off time for Relay 3.  Default: minutes</Help>
    <Item label="minutes" value="0"/>
    <Item label="seconds" value="1"/>
    <Item label="hours" value="2"/>
  </Value>
  <Value type="list" genre="config" index="20" label="Auto Turn-On Timer Unit for Relay 3" size="1" min="0" max="2" value="0">
    <Help>Choose between second, minutes, and hours as the unit for Auto Turn-On time for Relay 3.  Default: minutes</Help>
    <Item label="minutes" value="0"/>
    <Item label="seconds" value="1"/>
    <Item label="hours" value="2"/>
  </Value>
</CommandClass>
```

### Zooz S2 Outdoor Motion Sensor v2.0 (ZSE29)

The configuration parameters will have to be added to the `zwcfg` file. Replace the existing `COMMAND_CLASS_CONFIGURATION` with the one of the following options:

```xml
<CommandClass id="112">
  <Value type="byte" genre="config" index="1" label="Basic Set Report Value Sent to Associated Devices" size="1" min="0" max="99" value="99">
    <Help> Set the value of basic set report sent to the light associated with the sensor in Group 2 (so the light turns on to the selected brightness level). 99 is the equivalent of full brightness in Z-Wave terms.
    default: 99
    </Help>
  </Value>
  <Value type="list" genre="config" index="2" label="Enable / Disable Motion Reports" size="1" min="0" max="1" value="1">
    <Help>Enable or disable motion reports completely. If motion sensor is disabled, the device will not report motion at all to your hub.</Help>
    <Item label="Disabled" value="0"/>
    <Item label="Enabled (default)" value="1"/>
  </Value>
  <Value type="byte" genre="config" index="3" label="Motion Sensitivity" size="1" min="1" max="10" value="10">
    <Help>Adjust motion sensitivity where 10 is the most sensitive setting.
    default: 10
    </Help>
  </Value>
  <Value type="short" genre="config" index="4" label="Lux Level Trigger" size="2" min="0" max="900" value="0">
    <Help>Set lux level trigger with 10 being the lowest reported value. The sensor will report motion to the hub and associated devices only if lux level is below the set value.
    0 - set manually by lux knob; (default)
    1 - ignore lux and always report motion;
    </Help>
  </Value>
  <Value type="short" genre="config" index="5" label="Motion Re-trigger Time" size="2" min="0" max="720" value="0" units="seconds">
    <Help>Set motion re-trigger time for the delay before the sensor reports no motion to the hub and associated devices after detecting the last motion activity.
    0 - set manually by timer knob; (default)
    5-720 (seconds) - set customer re-trigger time;
    </Help>
  </Value>
  <Value type="short" genre="config" index="6" label="Lux Reporting Frequency" size="2" min="1" max="1440" value="30" units="minutes">
    <Help>Set lux reporting frequency to decide how often the snesor will measure and send brightness level data to the hub and associated devices.
    default: 30 (minutes)
    </Help>
  </Value>
</CommandClass>
```

### Jasco 2 Button Remote (37792/ZW5307)

<!-- from https://products.z-wavealliance.org/products/2930/ -->

Once you've added the remote to your Z-Wave network, you'll need to update your `zwcfg_*.xml` file with the below XML data. Stop Home Assistant and open your `zwcfg_*.xml` file (located in your configuration folder). Find the remote's device section and then its corresponding `CommandClass` section with id="91". Replace the entire CommandClass section with the below XML data. Save the file and restart Home Assistant.  

```xml
    <CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
        <Instance index="1" />
        <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="1" label="Button One" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
        <Value type="int" genre="system" instance="1" index="2" label="Button Two" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="0" />
    </CommandClass>
```

Below is a table of the action/scenes for the Jasco remote:

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Button one single tap|1|0
Button one double tap|1|3
Button one triple tap|1|4
Button two single tap|2|0
Button two double tap|2|3
Button two triple tap|2|4

Example Event:

```yaml
- alias: "JascoButton1"
  trigger:
    - event_type: zwave.scene_activated
      platform: event
      event_data:
        node_id: 2
        scene_id: 1
        scene_data: 0
  action:
    - service: switch.toggle
      target:
        entity_id: switch.office_fan
```

### EATON On/Off & Dimmer (RF9501/RF9540-N/RF9640-N/RF9601-N)

Once you've added the remote to your Z-Wave network, you'll need to update your `zwcfg_*.xml` file with the below XML data. Stop Home Assistant and open your `zwcfg_*.xml` file (located in your configuration folder). Find the remote's device section and then its corresponding `CommandClass` section with id="112". Insert the snippet below into the CommandClass section with the below XML data. Save the file and restart Home Assistant.

```xml
<Value type="list" genre="config" instance="1" index="10" label="Notify Accessory" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="0" max="1" vindex="1" size="1">
	<Help>Ensures that changes to the master node automatically notify accessory switches</Help>
	<Item label="disable" value="0" />
	<Item label="enable" value="1" />
</Value>
```
