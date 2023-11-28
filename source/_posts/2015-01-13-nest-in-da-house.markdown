---
title: "Nest in the house!"
description: "Home Assistant has added Nest to its list of supported products."
date: 2015-01-13 08:29:04 -0800
date_formatted: January 13, 2015
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

For thet majority of its existence, Home Assistant primary focus was on presence detection, lights and switches. But not anymore as we're expanding the supported devices. Today, we're proud to introduce Nest Thermostat integration for Home Assistant contributed by [Stefano Fiorini](https://github.com/sfiorini)!

<p class='img'>
  <img src='/images/screenshots/nest-thermostat-card.png' />
</p>

The new integration exists out of two parts: a generic thermostat component and a Nest platform implementation. The initial version implements provides a read-only card and services to control it. The plan is in the future to add temperature and away mode controls from the thermostat card and more info dialog. Internally, we are using the Python package [python-nest by jkoelker](https://github.com/jkoelker/python-nest) to talk to the Nest.

If you own a Nest thermostat, add the following lines to your `home-assistant.conf`:

```conf
[thermostat]
platform=nest
username=YOUR_USERNAME
password=YOUR_PASSWORD
```
