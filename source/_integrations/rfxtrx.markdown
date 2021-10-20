---
title: RFXCOM RFXtrx
description: Instructions on how to integrate RFXtrx into Home Assistant.
ha_category:
  - Hub
  - Cover
  - Light
  - Switch
  - Binary Sensor
  - Sensor
ha_iot_class: Local Push
ha_release: pre 0.7
ha_config_flow: true
ha_codeowners:
  - '@danielhiversen'
  - '@elupus'
  - '@RobBie1221'
ha_domain: rfxtrx
ha_platforms:
  - binary_sensor
  - cover
  - light
  - sensor
  - switch
---

The RFXtrx integration supports RFXtrx devices by [RFXCOM](http://www.rfxcom.com), which communicate in the frequency range of 433.92 MHz.

There is currently support for the following device types within Home Assistant:

- [Cover](#covers)
- [Light](#lights)
- [Switch](#switches)
- [Sensor](#sensors)
- [Binary Sensor](#binary-sensors)

{% include integrations/config_flow.md %}

## Debug logging

To receive debug logging from the RFXCOM device, add the following lines to `configuration.yaml`:

```yaml
logger:
  logs:
    RFXtrx: debug
```

**Please note**: `RFXtrx` is case-sensitive.

## Supported protocols

Not all protocols as advertised are enabled on the initial setup of your transceiver. Enabling all protocols is not recommended either. Your 433.92 product not showing in the logs? Visit the RFXtrx website to [download RFXmgmr](http://www.rfxcom.com/epages/78165469.sf/en_GB/?ViewObjectPath=%2FShops%2F78165469%2FCategories%2FDownloads) and enable the required protocol.

## ser2net

You can host your device on another computer by setting up ser2net and example configuration for ser2net looks like this and then using host/port in your Home Assistant configuration.

```text
50000:raw:0:/dev/ttyUSB0:38400 8DATABITS NONE 1STOPBIT
```

## Settings options

To configure options for RFXtrx integration go to **Configuration** >> **Integrations** and press **Options** on the RFXtrx card.

<img src='/images/integrations/rfxtrx/options.png' />

### Automatic add

In the options menu, select *Enable automatic add* to enable automatic addition of detected devices. This is the easiest way to detect binary sensors, sensors or switches from a physical device. Once automatic add is enabled, newly detected devices are automatically added and can be found by clicking devices on the RFXtrx integration card.

#### Covers

The RFXtrx integration supports Siemens/LightwaveRF and RFY roller shutters that communicate in the frequency range of 433.92 MHz.

#### Lights

The RFXtrx integration support lights that communicate in the frequency range of 433.92 MHz.

Make sure you trigger a dimming command to get switches detected as lights otherwise, they will show up as switches.

#### Switches

The RFXtrx integration support switches that communicate in the frequency range of 433.92 MHz.

#### Sensors

The RFXtrx integration support sensors that communicate in the frequency range of 433.92 MHz.

Also, several switches and other devices will also expose sensor entities with battery status as well as the signal level.

#### Binary Sensors

The RFXtrx integration support binary sensors that communicate in the frequency range of 433.92 MHz. The RFXtrx binary sensor integration provides support for them. Many cheap sensors available on the web today are based on a particular RF chip called *PT-2262*. Depending on the running firmware on the RFXcom box, some of them may be recognized under the X10 protocol, but most of them are recognized under the *Lighting4* protocol. The RFXtrx binary sensor integration provides some special options for them, while other RFXtrx protocols should work too.

### Add a device by event code

To manually add a device, in the options window, an event code can be added in the field *Enter event code to add*.

See [Generate codes](#generate-codes) how to generate event codes.

#### RFY

The [RFXtrx433e](http://www.rfxcom.com/RFXtrx433E-USB-43392MHz-Transceiver/en) is required for RFY support, however, it does not support receive for the RFY protocol - as such devices cannot be automatically added. Instead, configure the device in the [rfxmngr](http://www.rfxcom.com/downloads.htm) tool. Make a note of the assigned ID and Unit Code and then add a device to the configuration with the following id `071a0000[id][unit_code]`. E.g., if the id was `0a` `00` `01`, and the unit code was `01` then the fully qualified id would be `071a00000a000101`, if you set your id/code to single digit in the rfxmngr, e.g., id: `1` `02` `04` and unit code: `1` you will need to add `0` before, so `102031` becomes `071a000001020301`.

#### Convert switch event to dimming event

To convert a standard switch to a light, use the [Light Switch](/integrations/light.switch/) component.

To convert a switch to a dimmable light, make sure the event contains a dimming command. You can usually convert a command by changing one byte.

<img src='/images/integrations/rfxtrx/switch_light.png' />

Copy the event code from the state attribute of the switch, which shows up on the bottom of the window when clicking on the switch entity. Examples of byte changes:

*ARC:*<br>
0b11000248bc0cfe09 **01** 0f70<br>
0b11000248bc0cfe09 **02** 0f70

*LightwaveRF:*<br>
0a14000101f20302 **01** 0080<br>
0a14000101f20302 **10** 0080

*Waveman:*<br>
710030e4102 **01** 50<br>
710030e4102 **02** 50

### Configure device options

To configure device options, select a device from the list under *Select device to configure*. After pressing *Submit* a window with device options are presented based on the device type.

<div class='note warning'>
If a device is missing from the list, close the options window and either make sure the device sents a command or manually re-add the device by event code.
</div>

#### Signal repetitions

Because the RFXtrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the RFXtrx device to try to send each signal repeatedly.

#### Device events

To enable device events, use the checkbox *Enable device event*. See [Events](#events) for more information about device events.

#### Off Delay

Binary sensors have only two states - "on" and "off". Many door or window opening sensors will send a signal each time the door/window is open or closed. However, depending on their hardware or on their purpose, some sensors are only able to signal their "on" state:

- Most motion sensors send a signal each time they detect motion. They stay "on" for a few seconds and go back to sleep, ready to signal other motion events. Usually, they do not send a signal when they go back to sleep.
- Some doorbells may also only send "on" signals when their toggle switch is pressed, but no "off" signal when the switch is released.

For those devices, use the *off_delay* parameter. It defines a delay after, which a device will go back to an "Off" state. That "Off" state will be fired internally by Home Assistant, just as if the device fired it by itself. If a motion sensor can only send signals once every 5 seconds, sets the *off_delay* parameter to *seconds: 5*.

#### Venetian blind mode

Available only for RFY cover devices. Enables tilt control of venetian blind slats.

Venetian blind motors that control slats tilt can be configured in one of two modes - US (short press of up/down buttons opens/closes the blind, long-press controls tilt angle), or European (short press of up/down buttons controls tilt angle, long-press opens/closes the blind). You can select one of the following settings depending on your blinds:

- **Unknown** - default, tilt control is not enabled. Leave if the cover is not a venetian blind.
- **US** - tilt control enabled for blinds in US tilt mode.
- **EU** - tilt control enabled for blinds in European tilt mode.

#### Options for PT-2262 devices under the Lighting4 protocol

When a data packet is transmitted by a PT-2262 device using the Lighting4 protocol, there is no way to automatically extract the device identifier and the command from the packet. Each device has its own id/command length combination and the field lengths are not included in the data. One device that sends 2 different commands will be seen as 2 devices on Home Assistant. For such cases, the following options are available in order to circumvent the problem:

- **data_bits**
- **command_on**
- **command_off**

Let's try to add a new PT-2262 sensor using the "automatic_add" option and have a look at Home Assistant system log.

Have your sensor trigger the "On" state for the first time.
Some messages will appear:

```text
INFO (Thread-6) [homeassistant.components.binary_sensor.rfxtrx] Added binary sensor 0913000022670e013970 (Device_id: 22670e Class: LightingDevice Sub: 0)
```

Here the sensor has the id *22670e*.

Now have your sensor trigger the "Off" state and look for the following message in the Home Assistant log. You should see that your device has been detected as a *new* device when triggering its "Off" state:

```text
INFO (Thread-6) [homeassistant.components.binary_sensor.rfxtrx] Added binary sensor 09130000226707013d70 (Device_id: 226707 Class: LightingDevice Sub: 0)
```

Here the device id is *226707*, which is almost similar to the *22670e* we had on the "On" event a few seconds ago.

From those two values, you can guess that the actual id of your device is *22670*, and that *e* and *7* are commands for "On" and "Off" states respectively. As one hexadecimal digit uses 4 bits, we can conclude that the device is using 4 data bits.

So, here is the actual configuration section for the binary sensor:

```yaml
data_bits: 4
command_on: 0xe
command_off: 0x7
```

The *automatic_add* option makes the RFXtrx binary sensor integration calculate
and display the configuration options for you in the Home Assistant logs:

```text
INFO (Thread-6) [homeassistant.components.rfxtrx] rfxtrx: found possible device 226707 for 22670e with the following configuration:
data_bits=4
command_on=0xe
command_off=0x7
INFO (Thread-6) [homeassistant.components.binary_sensor.rfxtrx] Found possible matching deviceid 22670e.
```

This automatic guess should work most of the time, but there is no guarantee on that. You should activate it only when you want to configure your new devices and leave it off otherwise. 

#### Replace device

Some battery-powered devices send commands or data with a randomly generated id. When batteries are replaced, the id changes. In order to use the device, it needs to be re-added either through automatic add or manually. This will create a new device. To transfer user-configured names and entity ids of the old device, select the old device in the options menu under *Select device to configure*. In the device options menu, select from the *Select device to replace* menu the new device and press *Submit*. The names and ids of the old device will be transferred to the new device and the old device will be automatically deleted.

### Delete device

To delete device(s) from the configuration, select one or more devices under *Select device to delete*. Press *Submit* to delete the selected devices.

## Events

The RFXtrx integration will signal an event on the reception of messages from and RFXtrx device on the following form. For the signal to be available, the `fire_event` parameter must be set on the device in configuration.

*Signal from a byron doorbell button:*

```yaml
packet_type: 22
sub_type: 0
type_string: "Byron SX"
id_string: "00:90"
data: "0716000100900970"
values:
  Sound: 9
  Battery numeric: 0
  Rssi numeric: 7
```

*Event data from a Nexa wall socket switch:*

```yaml
packet_type: 16
sub_type: 1
type_string: 'ARC'
id_string': 'C3'
data: '0710010143030170'
values': 
  Command: "On"
  Rssi numeric': 7
```

You can set up automations to react to these events. When you do, don't include more fields than needed. Always include the device identifying fields, `packet_type`, `sub_type` and `id_string`.

So, for example, to trigger an action when somebody presses the doorbell, you would set up an automation with the following trigger:

*Automation trigger:*

```yaml
- platform: event
  event_type: rfxtrx_event
  event_data:
    packet_type: 22
    sub_type: 0
    id_string: "00:90"
    values:
      Sound: 9
```

*A more complete example with scene activation:*

```yaml
light:
  platform: demo

scene:
  name: WelcomeScene
  entities:
    light.bed_light: on
    light.ceiling_lights: off

automation:
  - alias: "Use doorbell button to trigger scene"
    trigger:
    - platform: event
      event_type: rfxtrx_event
      event_data:
        packet_type: 22
        sub_type: 0
        id_string: "00:90"
        values:
          Sound: 9
    action:
      service: scene.turn_on
      target:
        entity_id: scene.welcomescene
```

## Services

- `rfxtrx.send`: Send a custom event using the RFXtrx device.

### Service: Send

Simulate a button being pressed:

```yaml
...
action:
  service: rfxtrx.send
  data:
    event: 0b1111e003af16aa10000060
```

## Generate codes

If you need to generate codes for switches and lights, you can use a template (useful, for example, COCO switches).

- Go to home-assistant-IP:8123/dev-template
- Use the following codes to generate an event:

### Switch: ARC

{% raw %}

```yaml
0b11000{{ range(100,700) | random | int }}bc0cfe0{{ range(0,10) | random | int }}010f70
```

{% endraw %}

### Light: ARC

{% raw %}

```yaml
0b11000{{ range(100,700) | random | int }}bc0cfe0{{ range(0,10) | random | int }}020f70
```

{% endraw %}

### Light: Lightwave RF

{% raw %}

```yaml
0a14000{{ range(100,700) | random | int }}bc0cf{{ range(0,10) | random | int }}100f70
```

{% endraw %}

- Use this code to add a new switch in the options menu.
- Launch your Home Assistant and go to the website.
- Enable learning mode on your switch (i.e., push learn button or plug it in a wall socket)
- Toggle your new switch in the Home Assistant interface

## Configuration import

When RFXtrx integration is configured in `configuration.yaml`, the configuration will be imported once. After import, the configuration can be removed from `configuration.yaml`.

{% configuration %}
device:
  description: "The path to your device, e.g., `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0` or `/dev/ttyUSB0`. Required if you are using a locally connected USB device."
  required: false
  type: string
host:
  description: "The hostname the remote RFXtrx is available on if connecting via TCP. If this is set, a port is required."
  required: false
  type: string
port:
  description: "The TCP port the remote RFXtrx is available on. If this is set, a host is required."
  required: false
  type: integer
debug:
  description: "If you want to receive debug output."
  required: false
  default: false
  type: boolean
devices:
  description: A list of devices.
  required: false
  type: map
  keys:
    EVENT_CODE:
      description: An code string describing the device. It may include state, but state will be ignored.
      required: true
      type: map
      keys:
        device_class:
          description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
          required: false
          type: device_class
        fire_event:
          description: Fires an event even if the state is the same as before. Can be used for automations.
          required: false
          type: boolean
          default: false
        off_delay:
          description: For binary sensors that only sends 'On' state updates, this variable sets a delay after which the binary sensor state will be updated back to 'Off'.
          required: false
          type: integer
        data_bits:
          description: Defines how many bits are used for commands inside the data packets sent by the device.
          required: false
          type: integer
        command_on:
          description: Defines the data bits value that is sent by the device upon an 'On' command.
          required: false
          type: string
        command_off:
          description: Defines the data bits value that is sent by the device upon an 'Off' command.
          required: false
          type: string
        signal_repetitions:
          description: Because the RFXtrx device sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the RFXtrx device to try to send each signal repeatedly.
          required: false
          type: integer
automatic_add:
  description: To enable the automatic addition of new binary sensors.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

<div class='note warning'>
If a device ID consists of only numbers, please make sure to surround it with quotes.
This is a known limitation in YAML, because the device ID will be interpreted as a number otherwise.
</div>
