---
title: "Static website"
description: "Serving a static website with Home Assistant."
date: 2016-04-07 06:28:00
date_formatted: "April 7, 2016"
author: Fabian Affolter
author_twitter: fabaff
categories: How-To
og_image: /images/blog/2016-04-display/ha-display.png
---

The frontend of Home Assistant is served with the help of a local web server. If you have [customized](/getting-started/devices/#customizing-devices-and-services) your installation you already use this functionality. The content of your folder `www` in your Home Assistant configuration directory (`.homeassistant`) is available under `/local` (eg. `https://localhost:8123/local/index.html` for an `index.html` file).

But there is more you can do! You can not only host images for customization there but HTML files or even web applications including CSS and Javascript. 

<p class='img'>
<img src='/images/blog/2016-04-display/ha-display.png' />
</p>

<!--more-->

In the past the buzz word "Smart mirror" was used a couple of times in our [chatroom](https://discord.gg/c5DvZ4e) and even made it into the [issue tracker](https://github.com/home-assistant/home-assistant/issues/1392). The existing solutions ([Smart mirror](https://docs.smart-mirror.io/), [MagicMirror](https://michaelteeuw.nl/tagged/magicmirror), and [HomeMirror](https://github.com/HannahMitt/HomeMirror)) seems to be overkill if you already have Home Assistant running somewhere in your house or apartment. Why not simple display a web page served by Home Assistant on the tablet? No app and no Raspberry Pi running in the background.

There are plenty of ways to achieve this...[RESTful API](/developers/rest_api/), ~~Python API~~, or one of the [history components](/integrations/#history). If it is to be a web page I'm using the [MQTT Eventstream component](/integrations/mqtt_eventstream/) and [Eclipse Paho JavaScript Client](https://www.eclipse.org/paho/clients/js/).

The [HBMQTT](https://pypi.org/pypi/hbmqtt) broker provides websockets support for MQTT and mqttws31.js included in web page gives you access to the MQTT messages. It's a matter of minutes. OK, it took a little longer because I'm not a Javascript guy to create the software part that will show details about your environment. The source is available at [https://github.com/fabaff/home-assistant-display](https://github.com/fabaff/home-assistant-display) and the screenshot above shows the result. I guess that every person who is familiar with Javascript would be able to reduce the amount of code and to make it more flexible. Well, it's only a prototype and showcase to include an image in this blog post. 

I hope that this little article could give you an idea of extending Home Assistant in an unconventional way.
