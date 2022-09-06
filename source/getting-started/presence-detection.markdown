---
title: "Setting up presence detection"
description: "Instructions on how to setup presence detection within Home Assistant."
---

Presence detection detects if people are home, which is the most valuable input for automation. Knowing who is home or where they are, will open a whole range of other automation options:

- Send me a notification when my child arrives at school
- Turn on the AC when I leave work

![Screenshot of Home Assistant showing a school, work and home zone and two people.](/images/screenshots/map.png)

### Adding presence detection

There are different ways of setting up presence detection. Usually the easiest way to detect presence is by checking which devices are connected to the network. You can do that if you have one of our [supported routers][routers]. By leveraging what your router already knows, you can easily detect if people are at home.

It's also possible to run an app on your phone to provide detailed location information to your Home Assistant instance. For iOS and Android, we suggest using the [Home Assistant Companion app][companion].

During the setup of Home Assistant Companion on your mobile device, the app will ask for permission to allow the device's location to be provided to Home Assistant. Allowing this will create a `device_tracker` entity for that device which can be used in automations and conditions.


### Zones
![Map with zones](/images/screenshots/badges-zone.png)

Zones allow you to name areas on a map. These areas can then be used to name the location a tracked user is, or use entering/leaving a zone as an automation [trigger] or [condition]. See [Zones integration](/integrations/zone/) page for more details like creating zones.

<div class='note'>
The map view will hide all devices that are home.
</div>

[routers]: /integrations/#presence-detection
[nmap]: /integrations/nmap_tracker
[ha-bluetooth]: /integrations/bluetooth_tracker
[ha-bluetooth-le]: /integrations/bluetooth_le_tracker
[ha-locative]: /integrations/locative
[ha-gpslogger]: /integrations/gpslogger
[ha-presence]: /integrations/#presence-detection
[mqtt-self]: /integrations/mqtt/#run-your-own
[mqtt-cloud]: /integrations/mqtt/#cloudmqtt
[zone]: /integrations/zone/
[trigger]: /getting-started/automation-trigger/#zone-trigger
[condition]: /getting-started/automation-condition/#zone-condition
[ha-map]: /integrations/map/
[companion]: https://companion.home-assistant.io/

{% include getting-started/next_step.html step="Join the Community" link="/getting-started/join-the-community/" %}
