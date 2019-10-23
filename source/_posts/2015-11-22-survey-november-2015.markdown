---
title: "Survey November 2015"
description: "Results from our survey about usage of various parts of Home Assistant."
date: 2015-11-22 15:51:18 +0100
date_formatted: "November 22, 2015"
author: Fabian Affolter
categories: Survey
og_image: /images/blog/2015-11-survey/releases.png
---

<img src='/images/blog/2015-11-survey/releases.png' style='float: right; margin-left: 8px; margin-bottom: 8px;' height='120'/>Around a week ago we started with the first survey. Now 30 people have participated. Thank you very much if you did. We think that's enough time to have some "only partially representative" data. It's hard to tell how many Home Assistant users are out there. Currently there are 215 members on our [Discord chat server](https://discord.gg/c5DvZ4e) and last week [PyPI](https://pypi.python.org/pypi/homeassistant/) counted 5063 downloads.

The idea was to anonymously collect some details about the usage of the different parts of Home Assistant and a little bit about the environment its running in.

<!--more-->
Thanks to Python, users are running Home Assistant on the most popular Linux distributions and other operating systems including OS X and Microsoft Windows. One quarter of the operating systems are unknown which leads to the assumption that it is possible to run Home Assistant on most of the available operation systems today. We hope that *BSD users have fun too. The Hardware platform of choice seems to be x86_64 and ARM.

Of course most users are running with the [automation](/getting-started/automation/) component otherwise it would make much sense to use Home Assistant. The [sun](/integrations/sun/) component is used a lot too. We hope that this is not because this component is enabled by default.

The [Alarm control panels](/integrations/alarm_control_panel/) and the [camera component](/integrations/camera/) are both used by around one third of the participants of the survey. It's safe to say that they cover a niche, but they will gain momentum when people discover how they can build alarm systems with Home Assistant.

[Philips Hue](/integrations/hue) is the "winner" in the light category closely followed by [MQTT lights](/integrations/light.mqtt/). [Google Cast](/integrations/cast) and [ Plex](/integrations/plex#media-player) are the top media player platforms. [Pushbullet](/integrations/pushbullet) is by far the most-used [notification platform](/integrations/notify/). If you followed the recent efforts to improve this platform it's comprehensible.

It's interesting to see that most of the sensor, switch, and thermostat platforms are used. A lot of people seem to be interested in the weather data provided by the [Forecast sensor](/integrations/darksky). The MQTT sensors and switches are deployed in almost 50% of all Home Assistant setups.


<p class='img'>
  <img src='/images/blog/2015-11-survey/releases.png' />
  Home Assistant releases
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/os.png' />
  Operating systems
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/platforms.png' />
  Hardware platforms
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/components.png' />
  Components
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/alarm-cameras.png' />
  Alarm Control Panels and Cameras
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/trackers.png' />
  Device trackers
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/lights.png' />
  Lights
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/players.png' />
  Media players
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/notifications.png' />
  Notifications
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/sensors.png' />
  Sensors
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/switches.png' />
  Switches
</p>

<p class='img'>
  <img src='/images/blog/2015-11-survey/thermostats.png' />
  Thermostats
</p>

The conclusion is that [MQTT](http://mqtt.org/) is popular in almost every section from Alarm Control Panel, presence detection with [owntracks](http://owntracks.org/), sensors and switches, and now even for lights.

The interpretation of the data is up to you. Again, thanks for participating in this survey.
