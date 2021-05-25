---
title: Nobø Ecohub
description: Instructions on how to integrate Nobø Ecohub into Home Assistant.
ha_category: Climate
ha_release: 2021.6
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
- '@echoromeo'
- '@oyvindwe'
ha_domain: nobo_hub
ha_platforms:
- climate
---

Integrates [Nobø Ecohub](https://www.glendimplex.no/produkter/varmestyring/11123610/noboe-hub/c-77/p-330)
into Home Assistant.

To configure the integration, you need the 3 last digits of the serial number of your hub. These are located
on the back of the hub. If the hub is on a different local network than Home Assistant, you also need the
IP address of the hub.

As for now you can see and change operation and preset for zones and set eco/comfort temperatures if you have
a supported thermostat.

The possible operation modes are as follows:

- "Auto" - In this mode, the zone is in the normal setting and preset shows which state the zone is in right now
  (according to calendar setup).
- "Heat" - In this mode the zone in the override setting and in the state selected by preset ("Away", "Eco"
  or "Comfort").
- "Off" - In this optional mode the zone is in the normal setting and will configure it to use a week profile that
  turns the heater(s) in the zone completely off (more info below).

This can be utilized the following ways:

- Changing preset to "Away", "Eco", or "Comfort" will automatically change operation to "Heat".
- Changing preset to none will automatically change operation to "Auto" and update preset.
- Changing operation to "Auto" will automatically update preset.
- Changing operation to "Heat" will set preset to "Comfort".
- Changing operation to "Off" will change operation to "Auto" and change the week profile to the predefined
  "completely off" profile.


## There is no override in Nobø Ecohub for "completely off", but there is a workaround

Nobø heaters can normally not be set to override "off". This is not a limitation in the integration, but a
safety-mechanism in the Nobø system (maybe they don't want you to accidentally turn off all your heaters and get
frozen pipes). However, it is possible to create a week profile that makes the heaters stay off all the time. And then
you can configure the system to switch a zone to this week profile to be able to turn the heater(s) off.

If you configure the integration with the name of the "off" week profile and the name for the normal ("on") week
profile for your each of your zones, you can use this module to turn off (and on) your heaters. The week profiles
must already exist in your Nobø system, and you need to list the "on" week profile for each zone in the Nobø Ecohub
configuration. Use the Nobø app to create them and configure them correctly.

If you don't configure any "off" or "on" week profiles, then turning off heaters will not be supported (and this may
be fine for your use).
