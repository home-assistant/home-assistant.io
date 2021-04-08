---
title: "Setting up presence detection"
description: "Instructions on how to setup presence detection within Home Assistant."
---

Presence detection detects if people are home, which is the most valuable input for automation. Knowing who is home or where they are, will open a whole range of other automation options:

- Send me a notification when my child arrives at school
- Turn on the AC when I leave work

<p class='img'>
<img src='/images/screenshots/map.png' />
Screenshot of Home Assistant showing a school, work and home zone and two people.
</p>

### Adding presence detection

There are different ways of setting up presence detection using the official intergrations. Usually the easiest way to detect presence is by checking which devices are connected to the network. You can do that if you have one of our [supported routers][routers] which will provide information on which devices are connected. By leveraging what your router already knows, you can easily detect if people are at home. One thing to consider is that some devices drop of the network to save battery, which could lead to false state changes.

It's also possible to run an app on your phone to provide detailed location information to your Home Assistant instance. For iOS and Android, we suggest using the [Home Assistant Companion app][companion]. The easiest way to configure remote access is to subscribe to [Nabu casa][nabu-casa]. This service removes the need to handle router settings, SSL certificates, and so much more.

During the setup of Home Assistant Companion on your mobile device, the app will ask for permission to allow the device's location to be provided to Home Assistant. Allowing this will create a `device_tracker` entity for that device which can be used in automations and conditions.

### Room based presence detection

Presence detetion is not limited to tell if a you are home or not. You can use PIR motion sensors which is provided by brands several brands. The sensor will be exposed as a [binary sensor][binary-sensor] inside Home Assistant and can then be used to trigger all kinds of cool automations. The most basic would be to turn on the lights when motion is detected. 

### Zones

<img src='/images/screenshots/badges-zone.png' style='float: right; margin-left: 8px; height: 100px;'>

Zones allow you to name areas on a map. These areas can then be used to name the location a tracked user is, or use entering/leaving a zone as an automation [trigger] or [condition]. Zones can be set up from configuration screen.

<div class='note'>
The map view will hide all devices that are home.
</div>

[binary-sensor] https://www.home-assistant.io/integrations/binary_sensor/
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
[nabu-casa]: https://www.nabucasa.com/

{% include getting-started/next_step.html step="Join the Community" link="/getting-started/join-the-community/" %}
