---
title: "Bootstrapping your setup with Discovery"
description: "Home Assistant can now auto detect and setup certain devices in your network."
date: 2015-01-11 21:49:08 0000
date_formatted: January 11, 2015
author: Paulus Schoutsen
author_twitter: balloob
categories:
- Release-Notes
- Core
---

Most people do not like configuring things. Things just have to work, out of the box. Reaching this scenario is the goal of what we are about to introduce: our new discovery component.

The discovery component will scan the WiFi network from time to time for connected zeroconf/mDNS and uPnP devices. The initial introduction is mainly focussed on getting the right architecture in place and discovers Belkin WeMo switches and Google Chromecasts connected to your network. When found, it will load and notify the appropritate component and it will be ready to use within seconds.

Most devices still require some sort of interaction from the user after being discovered - be it a button being pressed or some sort of authentication. This is a challenge that will be solved in the future.

To enable the discovery component, add the following to your `home-assistant.conf`:

```conf
[discovery]
```

A new [discovery section](/developers/add_new_platform/#discovery) has been added to the Adding a new platform page with instructions how to make your platform discoverable.
