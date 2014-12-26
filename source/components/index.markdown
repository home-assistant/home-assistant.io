---
layout: page
title: "Components"
date: 2014-12-21 13:35
sidebar: false
comments: false
sharing: true
footer: true
---

### sun
Tracks the state of the sun and when the next sun rising and setting will occur.

Depends on: config variables common/latitude and common/longitude

 * Maintains state of `weather.sun` including attributes `next_rising` and `next_setting`

### device_tracker
Keeps track of which devices are currently home.

 * Sets the state per device and maintains a combined state called `all_devices`. 
 * Keeps track of known devices in the file `config/known_devices.csv`.

Supported platforms:

 * `netgear` for Netgear routers that support their SOAP API
 * `luci` for routers running OpenWRT
 * `tomato` for routers running Tomato
 * `nmap` for using nmap to scan IP ranges on the network

### light
Keeps track which lights are turned on and can control the lights. It has [4 built-in light profiles](https://github.com/balloob/home-assistant/blob/master/homeassistant/components/light/light_profiles.csv) which you're able to extend by putting a light_profiles.csv file in your config dir.

 * Maintains a state per light and a combined state `all_light`.
 * Registers services `light/turn_on` and `light/turn_off` to control the lights.

Optional service data:

  - `entity_id` - only act on specified lights. Else targets all.
  - `transition_seconds` - seconds to take to switch to new state.
  - `profile` - which light profile to use.
  - `xy_color` - two comma seperated floats that represent the color in XY
  - `rgb_color` - three comma seperated integers that represent the color in RGB
  - `brightness` - integer between 0 and 255 for how bright the color should be
  - `flash` - tell light to flash, can be either value `short` or `long`

Supported platforms:

 * `hue` for Philips Hue

### switch
Keeps track which switches are in the network, their state and allows you to control them.

 * Maintains a state per switch and a combined state `all_switches`.
 * Registers services `switch/turn_on` and `switch/turn_off` to control switches.

Optional service data:

 - `entity_id` - only act on specific switch. Else targets all.

Supported platforms:

 * `wemo` for Belkin WeMo switches
 * `tellstick` for Tellstick switches

### device_sun_light_trigger
Turns lights on or off using a light control component based on state of the sun and devices that are home.

Depends on: light control, track_sun, device_tracker

 * Turns lights off when all devices leave home.
 * Turns lights on when a device is home while sun is setting.
 * Turns lights on when a device gets home after sun set.

### chromecast
Registers 7 services to control playback on a Chromecast: `turn_off`, `volume_up`, `volume_down`, `media_play_pause`, `media_play`, `media_pause`, `media_next_track`.

Registers three services to start playing YouTube video's on the ChromeCast.

Service `chromecast/play_youtube_video` starts playing the specified video on the YouTube app on the ChromeCast. Specify video using `video` in service_data.

Service `chromecast/start_fireplace` will start a YouTube movie simulating a fireplace and the `chromecast/start_epic_sax` service will start playing Epic Sax Guy 10h version.

### keyboard
Registers services that will simulate key presses on the keyboard. It currently offers the following Buttons as a Service (BaaS): `keyboard/volume_up`, `keyboard/volume_down` and `keyboard/media_play_pause`
This actor depends on: PyUserInput

### downloader
Registers service `downloader/download_file` that will download files. File to download is specified in the `url` field in the service data.

### browser
Registers service `browser/browse_url` that opens `url` as specified in event_data in the system default browser.

### tellstick_sensor
Shows the values of that sensors that is connected to your Tellstick.

### simple_alarm
Will provide simple alarm functionality. Will flash a light shortly if a known device comes home. Will flash the lights red if the lights turn on while no one is home.

Depends on device_tracker, light.

Config options:
known_light: entity id of the light/light group to target to flash when a known device comes home
unknown_light: entity if of the light/light group to target when a light is turned on while no one is at home.
