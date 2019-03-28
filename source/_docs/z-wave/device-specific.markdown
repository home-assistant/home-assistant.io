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

It's totally normal for your Z-Wave stick to cycle through its LEDs (Yellow, Blue and Red) while plugged into your system. If you don't like this behavior it can be turned off.

Use the following example commands from a terminal session on your Pi where your Z-Wave stick is connected.

Turn off "Disco lights":

```bash
$ echo -e -n "\x01\x08\x00\xF2\x51\x01\x00\x05\x01\x51" > /dev/serial/by-id/usb-0658_0200-if00
```

Turn on "Disco lights":

```bash
$ echo -e -n "\x01\x08\x00\xF2\x51\x01\x01\x05\x01\x50" > /dev/serial/by-id/usb-0658_0200-if00
```

If the above two commands give errors about not having that device, you should try replacing the `/dev/serial/by-id/usb-0658_0200-if00` with `/dev/ttyACM0` or `/dev/ttyACM1` (depending on which tty your aeotec stick is addressed to).  

### {% linkable_title Razberry Board %}

You need to disable the on-board Bluetooth since the board requires the use of the hardware UART (and there's only one on the Pi3). You do this by adding the following to the end of `/boot/config.txt`:

```text
dtoverlay=pi3-disable-bt
```

Then disable the Bluetooth modem service:

```bash
$ sudo systemctl disable hciuart
```

Once Bluetooth is off, enable the serial interface via the `raspi-config` tool. After reboot run:

```bash
$ sudo systemctl mask serial-getty@ttyAMA0.service
```

so that your serial interface looks like:

```text
crw-rw---- 1 root dialout 204, 64 Sep  2 14:38 /dev/ttyAMA0
```
at this point simply add your user (homeassistant) to the dialout group:

```bash
$ sudo usermod -a -G dialout homeassistant
```

Finally, reboot again to make those changes active. It's has been tested on hassbian and has been reported that this is also required on the Pi2.

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

### {% linkable_title Zooz Toggle Switches %}

Some models of the Zooz Toggle switches ship with an instruction manual with incorrect instruction for Z-Wave inclusion/exclusion. The instructions say that the switch should be quickly switched on-off-on for inclusion and off-on-off for exclusion. However, the correct method is on-on-on for inclusion and off-off-off for exclusion.

## {% linkable_title Central Scene configuration %}

To provide Central Scene support you need to shut Home Assistant down and modify your `zwcfg_*.xml` file according to the following guides.

### {% linkable_title Inovelli Scene Capable On/Off and Dimmer Wall Switches %}

For Inovelli switches, you'll need to update (or possibly add) the `COMMAND_CLASS_CENTRAL_SCENE` for each node in your `zwcfg` file with the following:

```xml
			<CommandClass id="91" name="COMMAND_CLASS_CENTRAL_SCENE" version="1" request_flags="4" innif="true" scenecount="0">
				<Instance index="1" />
				<Value type="int" genre="system" instance="1" index="0" label="Scene Count" units="" read_only="true" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="2" />
				<Value type="int" genre="user" instance="1" index="1" label="Bottom Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
				<Value type="int" genre="user" instance="1" index="2" label="Top Button Scene" units="" read_only="false" write_only="false" verify_changes="false" poll_intensity="0" min="-2147483648" max="2147483647" value="3" />
			</CommandClass>
```

Once this is complete, you should see the follow `zwave.scene_activated` events:

**Action**|**scene\_id**|**scene\_data**
:-----:|:-----:|:-----:
Double tap off|1|3
Double tap on|2|3
Triple tap off|1|4
Triple tap on|2|4
4x tap off|1|5
4x tap on|2|5
5x tap off|1|6
5x tap on|2|6

### {% linkable_title HomeSeer Switches %}

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

### {% linkable_title Fibaro Keyfob FGKF-601 %}


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
Button five (Triangle) single tap|5|7680
Button five (Triangle) hold|5|7800
Button five (Triangle) release|5|7740
Button six (Triangle) single tap|6|7680
Button six (Triangle) hold|6|7800
Button six (Triangle) release|6|7740

Press circle and plus simultaneously to wake up the device.

### {% linkable_title Aeotec NanoMote Quad %}

<!-- from https://products.z-wavealliance.org/products/2817 -->

Once you've added the NanoMote to your z-wave network, you'll need to update your zwcfg*.xml file with the below xml data.  Stop Home Assistant and open your zwcfg*.xml file (located in your config folder).  Find the NanoMote device section and then its corresponding `CommandClass` section with id="91".  Replace the entire CommandClass section with the below xml data.  Save the file and restart Home Assistant.  

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

### {% linkable_title WallC-S Switch %}

Use the same configuration as for the Aeotec Wallmote.

### {% linkable_title HANK One-key Scene Controller HKZN-SCN01 %}

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

### {% linkable_title HANK Four-key Scene Controller HKZN-SCN04 %}

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

### {% linkable_title Remotec ZRC-90 Scene Master %}

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
- id: '1234567890'
  alias: Double-press Button 2 to toggle all lights
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
      entity_id: group.all_lights
```

### {% linkable_title RFWDC Cooper 5-button Scene Control Keypad %}

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
  - alias: Sync the indicator value on button events
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
        data_template: 
          node_id: 3
          value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
switch:
  - platform: template
    switches:
      button_1_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(1) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 1 }}"
        turn_off:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 1 }}"
      button_2_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(2) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 2 }}"
        turn_off:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 2 }}"
      button_3_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(4) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 4 }}"
        turn_off:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 4 }}"
      button_4_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(8) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states(scene_contrl_indicator)|int + 8 }}"
        turn_off:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 8 }}"
      button_5_led:
        value_template: "{{ states('sensor.scene_contrl_indicator')|int|bitwise_and(16) > 0 }}"
        turn_on:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int + 16 }}"
        turn_off:
          service: zwave.set_node_value
          data_template:
            node_id: 3
            value_id: "{{ state_attr('sensor.scene_contrl_indicator','value_id') }}"
            value: "{{ states('sensor.scene_contrl_indicator')|int - 16 }}"
```
{% endraw %}
