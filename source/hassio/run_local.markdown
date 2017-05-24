---
layout: page
title: "Run local things"
description: "Instructions on how-to run local script for HomeAssistant."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

On a normal installation you have access to base machine and can install or add every things of script they you can call with a `command_line` sensor/switch. Since Hass.IO use docker and every application is strict limited to other, you can not use this old way to perform local stuff. For first view it look very limited but if you look better to that conecpt you will see that make all very stable and a wrong thing can not break your system. It will also warrenty that your system is in every time clear to eatch running thing.

If you need run a script to read data for a sensor or switch commands to other device, you can do that with a add-on or on HomeAssistant container with a custom component. We look now to do that in a modern way inside a add-on. For custom component you can look into other site.

Before you read more on that page, please read the add-on turtorial. Now you can resize your horizen to new way to do things safe.

First you need install a MQTT server. You can use our mqtt add-on. Make sure you use logins and disable anonymos access if you want control sensible systems. We provide no Hass.IO way to exchange data, that will be not realy good for security and is also to slow to exchange data between containers or stop and go stuff.

### {% linkable_title Sensors %}

Short story of that caption: We loop in our script to fetch data push to mqtt and wait until next processing is ready. Here is a basic example and struct for that process.

```bash

```

### {% linkable_title Commands %}



[Etcher]: https://etcher.io/
[resinos-network]: https://docs.resin.io/deployment/network/2.0.0/
[pi1]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-raspberrypi.img.bz2
[pi2]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-raspberrypi2.img.bz2
[pi3]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-raspberrypi3.img.bz2
[nuc]: https://github.com/home-assistant/hassio-build/releases/download/0.8/resinos-hassio-0.8-intel-nuc.img.bz2
[linux]: https://github.com/home-assistant/hassio-build/tree/master/install#install-hassio
[local]: http://hassio.local:8123
