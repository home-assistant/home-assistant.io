---
layout: page
title: "Apple TV"
description: "Instructions how to integrate Apple TV devices into Home Assistant."
date: 2017-02-08 07:11
sidebar: true
comments: false
sharing: true
footer: true
logo: apple.png
ha_category: Media Player
ha_iot_class: "Local Push"
ha_release: 0.38
featured: true
---

The `apple_tv` platform allows you to control an Apple TV (3rd and 4th generation).

<p class='note'>
Currently you must have Home Sharing enabled for this to work. Support for pairing Home Assistant with your device will be supported in a later release.
</p>

If you want to automatically discover new devices, just make sure you have `discovery:` in your `configuration.yaml` file. To manually add an Apple TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: apple_tv
    host: IP_ADDRESS
    login_id: LOGIN_ID
    start_off: false
    credentials: CREDENTIALS
```

Configuration variables:

- **host** (*Required*): The IP-address of the device
- **login_id** (*Required*): An identifier used to login to the device, see below
- **name** (*Optional*): The name of the device used in the frontend
- **start_off** (*Optional*): Set to true if device should start in fake standby
- **credentials** (*Optional*): Credentials used for AirPlay playback

In order to connect to the device you need a *login id*. The easiest way to obtain this identifier is to use the application ``atvremote``. It should be available in the same environment as you installed Home-Assistant. To install this utility, run ``pip3 install --upgrade pyatv``.  The run atvremote scan for all devices (try again if a device is missing):

```bash
$ atvremote scan
Found Apple TVs:
 - Apple TV at 10.0.10.22 (login id: 00000000-1234-5678-9012-345678901234)

Note: You must use 'pair' with devices that have home sharing disabled
```

Just copy and paste the login id from the device you want to add. For more details about `atvremote`, see: [this page](http://pyatv.readthedocs.io/en/master/atvremote.html).

## {% linkable_title Guides %}

### {% linkable_title My Apple TV turns on when I restart Home Assistant %}

The Apple TV will automatically turn on if a request is sent to it, e.g. if a button is pressed, something is streamed to it via AirPlay or if current state (currently playing) is accessed. This is how Apple has designed it and it will cause problems if you are using HDMI CEC. Every time Home Assistant is started, a new request is sent to the device to figure out what is currently playing. When using CEC, this will wake up your TV and other devices you have configured.

So, if your TV is randomly turning on, this is probably the reason. As stated, this is by design and there is no real fix for it. There's also no known way to turn off the Apple TV via the procotol used for communication. You basically have the following options:

- Do not use this platform
- Disable HDMI CEC on your Apple TV
- Use "fake standby"

The first two points are quite obvious. Fake standby is a concept implemented in this platform that disables all requests to the device and make it appear as being "off" in the web interface. This will make sure that the device is not woken up, but it will of course not show any information or allow you to control it. It is however easy to turn it on (or off) in the web interface or using an automation with `turn_on`. To make it more useful, you can write automations that turns it on or off depending on some other device, like the input source on your receiver.

To put a device into fake standby when starting Home Assistant, add `start_off: true` to your configuration.

<p class='note warning'>
Turning the device on/off in the user interface will *not* turn the physical device on/off according to description above.
</p>


### {% linkable_title Setting up device authentication %}

If you, when playing media with `play_url`, get the following error message:

*“This AirPlay connection requires iOS 7.1 or later, OS X 10.10 or later, or iTunes 11.2 or later.”*

then device authentication is required. Press the icon in the upper left corner and select the leftmost icon according to the image below:

<img src='/images/screenshots/developer-tools.png' />

Select `apple_tv` as domain, `apple_tv_authenticate` as service and enter `{"entity_id": "XXX"}` into "Service Data", but replace XXX with the entity id of your device (e.g. `media_player.apple_tv`). Press the button and hopefully you are presented with an input dialog asking for a pin code:

<img src='/images/components/apple_tv/authenticate.png' />

If no dialog appears, go back to the states view and show it from there. A PIN code should now be visible on your TV, just enter it into the dialog and press "Confirm". You should see if it succeeded in the state view:

<img src='/images/components/apple_tv/credentials.png' />

Copy the credentials and insert it into your configuration (make sure you copy everything, it should be 81 characters):

```yaml
# Example configuration.yaml entry
media_player:
  - platform: apple_tv
    host: 10.0.0.20
    login_id: 00000000-1234-5678-9012-345678901234
    credentials: 1B8C387DDB59BDF6:CF5ABB6A2C070688F5926ADB7C010F6DF847252C15F9BDB6DA3E09D6591E90E5
```

Restart Home Assistant and now you should be able to use `play_url` as before.

## {% linkable_title Services %}

### {% linkable_title Service `apple_tv_authenticate` %}

In order to play media on an Apple TV with device authentication enabled (e.g. ATV4 with tvOS 10.2+), Home Assistant must properly authenticated. This method starts the process and presents the credentials needed for playback as a persistent notification. Please see guide above for usage.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of Apple TVs.

### {% linkable_title Service `apple_tv_press_buttons` %}

Send one or more button presses to the device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s of Apple TVs.
| `buttons` | no | List of buttons. Supported buttons are: `up`, `down`, `left`, `right`, `menu`, `top_menu` and `select`.

## {% linkable_title Notes and Limitations %}

- Pairing is currently not supported
- Updates is sometimes not propagated correctly on ATV4
