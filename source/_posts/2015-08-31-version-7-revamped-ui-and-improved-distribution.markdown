---
title: "0.7: Better UI and improved distribution"
description: "Home Assistant gains a version number and a face lift."
date: 2015-08-31 14:12 -0700
date_formatted: "August 31, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
og_image: /images/screenshots/ui2015.png
---

As Home Assistant is gaining more and more users we started to feel the pain from not having a proper release mechanism. We had no version numbering and required users to checkout the source using Git to get started. On top of that, as the number of devices that we support keeps raising, so did the number of dependencies that are used. That's why we decided to change the way we roll. From now on:

- Each release will have a version number, starting with version 0.7. This was chosen because it shows that we have been around for some time but are not considering ourselves to be fully stable.
- Each release will be pushed to PyPi. This will be the only supported method of distribution.
- Home Assistant is available after installation as a command-line utility `hass`.
- The default configuration location has been moved from `config` in the current working directory to `~/.homeassistant` (`%APPDATA%/.homeassistant` on Windows).
- Requirements for components and platforms are no longer installed into the current Python environment (being virtual or not) but will be installed in `<config-dir>/lib`.

A huge shout out to [Ryan Kraus](https://github.com/rmkraus) for making this all possible. Please make sure you read [the full blog post][self] for details on how to migrate your existing setup.

[self]: /blog/2015/08/31/version-7-revamped-ui-and-improved-distribution/#read-more

And while Ryan was fixing distribution, I have been hard at work in giving Home Assistant a face lift. We already looked pretty good but lacked proper form of organization for users with many devices. The new UI moves away from a card per entity and has cards per group and domain instead. [The demo](/demo/) has been updated so give it a spin.

<p class='img'>
  <a href='/demo/'>
    <img src='/images/screenshots/ui2015.png' />
  </a>
  Screenshots of the new UI
</p>

<!--more-->

## Migration to version 0.7

For this example, let's say we have an old Home Assistant installation in `/home/paulus/home-assistant`.

If you want to migrate your existing configuration to be used as the default configuration:

```bash
cp -r /home/paulus/home-assistant ~/.homeassistant
```

It If you want to have the configuration in a different location, for example `/home/paulus/home-assistant-config`, you will have to point Home Assistant at this configuration folder when launching:

```bash
hass --config /home/paulus/home-assistant-config
```

## New platforms

And last, but not least: new platforms!

__MQTT Sensors and Switches__
<img src='/images/supported_brands/mqtt.png' style='border:none; box-shadow: none; float: right;' height='50' /> [@sfam](https://github.com/sfam) has blessed us with two more MQTT platforms to extend our integration with MQTTT: [sensor][mqtt-sensor] and [switch][mqtt-switch]. Both platforms require the MQTT component to be connected to a broker.

[mqtt-sensor]: /integrations/sensor.mqtt/
[mqtt-switch]: /integrations/switch.mqtt/

```yaml
# Example configuration.yaml entry
sensor:
  platform: mqtt
  name: "MQTT Sensor"
  state_topic: "home/bedroom/temperature"
  unit_of_measurement: "°C"

switch:
  platform: mqtt
  name: "Bedroom Switch"
  state_topic: "home/bedroom/switch1"
  command_topic: "home/bedroom/switch1/set"
  payload_on: "ON"
  payload_off: "OFF"
  optimistic: false
```

__Actiontec MI424WR Verizon FIOS Wireless router__
<img src='/images/supported_brands/actiontec.png' style='border:none; box-shadow: none; float: right;' height='50' /> [Nolan](https://github.com/nkgilley) has contributed support for Actiontec wireless routers.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: actiontec
  host: YOUR_ROUTER_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```

__DHT temperature and humidity sensors__
@MakeMeASandwich has contributed support for DHT temperature and humidity sensors. It allows you to get the current temperature and humidity from a DHT11, DHT22, or AM2302 device.

```yaml
# Example configuration.yaml entry
sensor:
  platform: dht
  sensor: DHT22
  pin: 23
  monitored_conditions:
    - temperature
    - humidity
```

__Aruba device tracker__
[Michael Arnauts](https://github.com/michaelarnauts) has contributed support for Aruba wireless routers for presence detection.

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: aruba
  host: YOUR_ACCESS_POINT_IP
  username: YOUR_ADMIN_USERNAME
  password: YOUR_ADMIN_PASSWORD
```
