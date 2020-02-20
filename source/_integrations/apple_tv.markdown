---
title: Apple TV
description: Instructions on how to integrate Apple TV devices into Home Assistant.
ha_category:
  - Multimedia
  - Media Player
  - Remote
ha_iot_class: Local Push
ha_release: 0.49
ha_domain: apple_tv
---

The `apple_tv` integration allows you to control an Apple TV (any generation). See the
[remote platform](/integrations/apple_tv#remote) if you want to send remote control buttons,
e.g., arrow keys.

There is currently support for the following device types within Home Assistant:

- Media Player
- [Remote](#remote)

## Configuration

You can setup a new Apple TV either the old fashioned way in `configuration.yaml` or just
follow a simple configuration flow ("Normal Setup"). Instructions for both methods are below.
If you are unsure about which method to use, go for "Normal Setup".

### Depdendencies

This component depends on a few Python packages that require additional system packages to be
installed. If you are running Home Assistant, i.e. not plain Home Assistant Core, you can skip
this step as everything is already included by default.

On a Debian/Ubuntu system, you install the necessary packages like this:

```shell
sudo apt-get install build-essential libssl-dev libffi-dev python-dev
```

The process is similar in other Linux distributions. Feel free to extend the list above if
you know how to install on other distributions.

### Normal Setup

Just navigate to `Configuration -> Integrations`, press the add button in the bottom right
corner and select Apple TV. You will be guided through the setup process. Nothing
further is needed.

In case Home Assistant automatically discovers your Apple TVs, you will be notified
about this.

### Manual Setup

To add one or more Apple TVs to your system, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
apple_tv:
  - address: IP
    name: NAME
    identifier: ID
    protocol: PROTOCOL
    start_off: START_OFF
    credentials:
      dmap: DMAP_CREDENTIALS
      mrp: MRP_CREDENTIALS
      airplay: AIRPLAY_CREDENTIALS
```

{% configuration %}
address:
  description: The IP address of the device.
  required: true
  type: string
name:
  description: The name of the device used in the frontend.
  required: false
  type: string
identifier:
  description: A unique identifier used to identify the device, see instructions below.
  required: true
  type: string
protocol:
  description: Protocol used to connect, either DMAP or MRP. Credentials must be provided for the selected protocol. See instructions below.
  required: true
  type: string
start_off:
  description: Set to true if the device should start in fake standby.
  required: false
  type: boolean
  default: false
credentials:
  type: map
  description: Credentials for protocols.
  keys:
    dmap:
      description: Credentials used for DMAP protocol (Apple TV 3 and earlier).
      required: false
      type: string
    mrp:
      description: Credentials used for AirPlay protocol (Apple TV 4 or later).
      required: false
      type: string
    airplay:
      description: Credentials used for AirPlay protocol.
      required: false
      type: string
{% endconfiguration %}

To find `identifier` you can use the `atvremote` command, which is bundled with `pyatv` (the library
used to implement this integration). How to install `pyatv` is out of scope of these instructions,
please refer to the [pyatv documentation](https://postlund.github.io/pyatv//getting-started/).

Running `atvremote scan` yields output similar to this:

```shell
$ atvremote scan
========================================
       Name: Living Room
    Address: 10.0.0.10
Identifiers:
 - 01234567-89AB-CDEF-0123-4567890ABCDE
 - 00:11:22:33:44:55
Services:
 - Protocol: MRP, Port: 49152, Credentials: None
 - Protocol: AirPlay, Port: 7000, Credentials: None
```

Just pick the first identifer and use that as `identifier`, i.e. 01234567-89AB-CDEF-0123-4567890ABCDE.
This output also reveals which protocols that are supported by the device (MRP and AirPlay). You
should thus set the `protocol` option to `MRP` and provide credentials for both MRP and AirPlay.

To get credentials for MRP, you simply run:

```shell
$ atvremote --id 01234567-89AB-CDEF-0123-4567890ABCDE --protocol mrp pair
Enter PIN on screen: 1234
Pairing seems to have succeeded, yey!
You may now use these credentials: 1650c36b816812561ee1a2ce55441c4d59aeee8287d3d0b90ad41e221c2ccc9b:eb6d47687f82327501d26e77bc3ee8b752034ad397c80cba37d91132717a1721:61383462633431372d383336362d346464632d386533622d333964356265303932663132:39376263616162332d356330652d343136362d623634302d326438656135616161636237
```

Then do the same thing again, but change mrp to airplay. The final configuration might then look
something like this:

```yaml
# Example configuration.yaml entry
apple_tv:
  - address: 10.0.0.10
    name: Living Room
    identifier: 01234567-89AB-CDEF-0123-4567890ABCDE
    protocol: MRP
    start_off: false
    credentials:
      mrp: 1650c36b816812561ee1a2ce55441c4d59aeee8287d3d0b90ad41e221c2ccc9b:eb6d47687f82327501d26e77bc3ee8b752034ad397c80cba37d91132717a1721:61383462633431372d383336362d346464632d386533622d333964356265303932663132:39376263616162332d356330652d343136362d623634302d326438656135616161636237
      airplay: D9B75D737BE2F0F1:6A26D8EB6F4AE2408757D5CA5FF9C37E96BEBB22C632426C4A02AD4FA895A85B
```

## FAQ

### My Apple TV does not turn on/off when I press on/off in frontend

That is correct, it only toggles power state in Home Assistant. Turning the device on or off is
currently not supported, mainly due to a good solution for doing so does not exist (as far we
know). Some work is being done to add experimental support for this for devices running tvOS,
but it will not be ready for some time.

### My Apple TV/Television/Receiver turns on when I restart Home Assistant

The Apple TV will automatically turn on if a request is sent to it, e.g., if a button is pressed,
something is streamed to it via AirPlay or if current state (currently playing) is accessed. This
is how Apple has designed it, and it will cause problems if you are using HDMI-CEC. Every time
Home Assistant is started, a new request is sent to the device to figure out what is currently
playing. When using CEC, this will wake up your TV and other devices you have configured.

So, if your TV is randomly turning on, this is probably the reason. As stated, this is by design,
and there is no real fix for it. There's also no known way to turn off the Apple TV via the
protocol used for communication (work is ongoing to provide experimental support for tvOS however).
You have the following options:

- Do not use this integration
- Disable HDMI-CEC on your Apple TV
- Use "fake standby"

The first two points are quite obvious. Fake standby is a concept implemented in this integration
that disables all requests to the device and makes the entity appear as being "off" in the web
interface. This will make sure that the device is not woken up, but it will of course not show
any information or allow you to control it. It is however easy to turn it on (or off) in the web
interface or to use an automation with `turn_on`. To make it more useful, you can write
automations that turn it on or off depending on some other device, like the input source on your
receiver.

If you have setup your Apple TV via `configuration.yaml`, add `start_off: true` to your configuration
to enable fake standby. Otherwise go to `Configuration -> Integrations`, select your Apple TV from
the list and click the settings icon in the top right corner. You will have the setting to enble
fake standby there.

<div class='note warning'>
Turning the device on/off in the user interface will *not* turn the physical device on/off
according to the description above.
</div>

### Is it possible to see if a device is on without interacting with it

No

### When adding a new device, a PIN code is requested but none is shown on the screen

This can happen when pairing the AirPlay protocol in case the access settings are wrong. On your
Apple TV, navigate to Settings, find the AirPlay menu and make sure that the access setting
is set to "Everyone on the same network" and try again.

### The buttons (play, pause, etc.) does not work

The apps in tvOS themselves decides what commands they support and when they support
them. It is very likely that the app you are using does not support the action you are trying
to perform. Before writing an issue about this, verify if the same action is possible with the
Remote app in iOS. If that is the case, please write a bug in
[pyatv](https://github.com/postlund/pyatv/issues/new?assignees=&labels=bug&template=bug_report.md&title=)
and include logs (see Debugging below).

### I'm trying to play a stream via AirPlay but it doesn't work

The Apple TV is quite picky when it comes to which formats it plays. Best bet is MP4. If it doesn't
work it's likely because of the media format. 

## Services

This integration has no additional services.

## Remote

The `apple_tv` remote platform allows you to send remote control buttons to an Apple TV. It is
automatically setup when an Apple TV is configured.

At the moment, the following buttons are available (but not necessarily supported by all devices):

- up
- down
- left
- right
- menu
- top_menu
- select
- volume_up
- volume_down
- home
- home_hold

A typical service call for press several buttons looks like this.

```yaml
service: remote.send_command
data:
  entity_id: remote.apple_tv
  command:
    - left
    - left
    - menu
    - select
```

## Debugging

If you have any problems and intend to write an issue, make sure you have the
relevant logs included. For this component, you can enable them like this:

```yaml
logger:
  logs:
    pyatv: debug
    homeassistant.components.apple_tv: debug
```

Without logs you will most likely not get any help.
