---
layout: page
title: "Z-Wave Device Specific Settings"
description: "Notes for specific Z-Wave devices."
date: 2016-03-24 08:49 -0700
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /getting-started/z-wave-device-specific/
---

## {% linkable_title Device Categories %}

### {% linkable_title Motion or alarm sensors %}

In order for Home Assistant to recognize the sensor properly, you will need to change its configuration from `Basic Set (default)` to `Binary Sensor report` or `Alarm report`.
These devices will either show as a binary sensor or a sensor called `Alarm xxxx` and will report a numeric value. Test to see what value is what. Sometimes this is noted in the device manual.

You can set the settings of the Z-Wave device through the Z-Wave control panel.

### {% linkable_title Locks and other secure devices %}

These devices require a network key to be set for the Z-Wave network before they are paired, using the **Add Node Secure** option.

Home Assistant stores logs from Z-Wave in `OZW_log.txt` in the Home Assistant config directory, when you pair a secure device you should see communication from the node with lines starting with `info: NONCES` in `OZW_log.txt` when the device is paired successfully with a secure connection.

### {% linkable_title Specific Devices %}

### {% linkable_title Aeotec Z-Stick %}

It's totally normal for your Z-Wave stick to cycle through its LEDs (Yellow, Blue and Red) while plugged into your system. If you don't like this behaviour it can be turned off.

Use the following example commands from a terminal session on your Pi where your Z-Wave stick is connected.

Turn off "Disco lights":

```bash
$ echo -e -n "\x01\x08\x00\xF2\x51\x01\x00\x05\x01\x51" > /dev/serial/by-id/usb-0658_0200-if00
```

Turn on "Disco lights":

```bash
$ echo -e -n "\x01\x08\x00\xF2\x51\x01\x01\x05\x01\x50" > /dev/serial/by-id/usb-0658_0200-if00
```

### {% linkable_title Razberry Board %}

You need to disable the on-board Bluetooth since the board requires the use of the hardware UART (and there's only one on the Pi3). You do this by adding the following to the end of `/boot/config.txt`:

```
dtoverlay=pi3-disable-bt
```

Then disable the Bluetooth modem service:

```bash
$ sudo systemctl disable hciuart
```

Finally, reboot to make those changes active. It's been reported that this is also required on the Pi2.

<p class='note'>
  If you've installed the Z-Way software, you'll need to ensure you disable it before you install Home Assistant or you won't be able to access the board. Do this with `sudo /etc/init.d/z-way-server stop; sudo update-rc.d z-way-server disable`.
</p>

### {% linkable_title Aeon Minimote %}

Here's a handy configuration for the Aeon Labs Minimote that defines all possible button presses. Put it into `automation.yaml`.

```yaml
  - id: mini_1_pressed
    alias: 'Minimote Button 1 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 1
  - id: mini_1_held
    alias: 'Minimote Button 1 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 2
  - id: mini_2_pressed
    alias: 'Minimote Button 2 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 3
  - id: mini_2_held
    alias: 'Minimote Button 2 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 4
  - id: mini_3_pressed
    alias: 'Minimote Button 3 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 5
  - id: mini_3_held
    alias: 'Minimote Button 3 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 6
  - id: mini_4_pressed
    alias: 'Minimote Button 4 Pressed'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 7
  - id: mini_4_held
    alias: 'Minimote Button 4 Held'
    trigger:
      - platform: event
        event_type: zwave.scene_activated
        event_data:
          entity_id: zwave.aeon_labs_minimote_1
          scene_id: 8
```

### {% linkable_title HomeSeer Switches %}

For the HomeSeer devices specifically, you may need to update the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
			<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
				<Instance index="1" />
                <Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
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

### {% linkable_title Fibaro Button FGPB-101-6 v3.2 %}

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

### {% linkable_title Aeotec Wallmote %}

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
Button one single tap|1|TBC
Button two single tap|2|TBC
Button three single tap|3|TBC
Button four single tap|4|TBC

### {% linkable_title Zooz Toggle Switches %}

Some models of the Zooz Toggle switches ship with an instruction manual with incorrect instruction for Z-Wave inclusion/exclusion. The instructions say that the switch should be quickly switched on-off-on for inclusion and off-on-off for exclusion. However, the correct method is on-on-on for inclusion and off-off-off for exclusion.
