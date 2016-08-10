---
layout: post
title: "0.26: New unit system"
description: "Frontend became blazing fast and extensible. DirecTV support added."
date: 2016-08-09 10:00:00 +0000
date_formatted: "August 09, 2016"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Release-Notes
---

It's time for 0.26! The biggest change in this release is a new unit system. Instead of picking Celsius or Fahrenheit you'll have to pick imperial or metric now. This influences the units for your temperature, distance, and weight. This will simplify any platform or component that needs to know this information. Big thanks to [@Teagan42] for her hard work on this!

<img src='/images/supported_brands/foursquare.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/ohmconnect.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' /><img src='/images/supported_brands/directv.png' style='clear: right; margin-left: 5px; border:none; box-shadow: none; float: right; margin-bottom: 16px;' width='150' />

- Core: Introduce notion of unit system (deprecates temperature unit option) ([@Teagan42])
- Front end: Speed improvements ([@balloob])
- Front end: Improve layout of state dev tool ([@balloob])
- Proximity: Allow definition of unit of measurement ([@Teagan42])
- Flux: Add mired and kelvin mode ([@HBDK])
- Thermostat - Proliphix: Support for cooling ([@sdague])
- Media Player - LG Netcast TV: Show [screenshot] of what is currently playing ([@shmuelzon])
- Z-Wave improvements ([@jnewland], [@turbokongen])
- Thermostat - heat control: now also able to control an AC ([@mtreinish])
- Thermostat - heat control: allow specifying a minimum duration before switching ([@mtreinish])
- InfluxDB: [Whitelist] entities option added ([@tchellomello])
- Sensor: Serial [particulate matters][particulate] sensors now supported ([@open-homeautomation])
- Sensor - Fitbit: Fix unit system ([@tchellomello])
- Light - Flux LED: Add support for [color and brightness][color] ([@Danielhiversen])
- Media Player - Plex: Now able to report on music ([@abcminiuser])
- Alarm Control Panel - Verisure: Now able to see who [changed] the alarm ([@persandtrom])
- Thermostat - Honeywell: Add option to read and control HVAC mode ([@Teagan42])
- [Foursquare] component to receive instant notifications of checkins ([@robbiet480])
- Camera: New [FFMPEG] platform allows to stream anything through front end ([@pvizeli])
- New command line script to manage keyring entries ([@kellerza])
- Notify - SMTP: Allow embedding of [images][images] ([@partofthething])
- Sensor: [OhmConnect] is now supported ([@robbiet480])
- [panel_custom] component allows the registering of new panels ([@balloob])
- Light: New [mqtt_json] platform for working with JSON payload ([@corbanmailloux])


### {% linkable_title Breaking changes %}

 - A new unit system has superseded the temperature unit option in the core configuration. For now it is backwards compatible, but you should update soon:

```yaml
# Configuration.yaml example
homeassistant:
  # 'metric' for the metric system, 'imperial' for the imperial system
  unit_system: metric
```

[@abcminiuser]: https://github.com/abcminiuser
[@balloob]: https://github.com/balloob
[@corbanmailloux]: https://github.com/corbanmailloux
[@Danielhiversen]: https://github.com/Danielhiversen
[@HBDK]: https://github.com/HBDK
[@jnewland]: https://github.com/jnewland
[@kellerza]: https://github.com/kellerza
[@mtreinish]: https://github.com/mtreinish
[@open-homeautomation]: https://github.com/open-homeautomation
[@partofthething]: https://github.com/partofthething
[@persandtrom]: https://github.com/persandtrom
[@pvizeli]: https://github.com/pvizeli
[@robbiet480]: https://github.com/robbiet480
[@sdague]: https://github.com/sdague
[@shmuelzon]: https://github.com/shmuelzon
[@tchellomello]: https://github.com/tchellomello
[@Teagan42]: https://github.com/Teagan42
[@turbokongen]: https://github.com/turbokongen

[Foursquare]: /components/foursquare/
[OhmConnect]: /components/sensor.ohmconnect/
[FFMPEG]: /components/camera.ffmpeg/
[images]: /components/notify.smtp/
[panel_custom]: /components/panel_custom/
[changed]: /components/alarm_control_panel.verisure/
[color]: /components/light.flux_led/
[Whitelist]: /components/influxdb/
[particulate]: /components/sensor.particulate_matter/
[screenshot]: /components/media_player.lg_netcast/
[mqtt_json]: 
