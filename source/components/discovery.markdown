---
layout: page
title: "Discovery"
description: "Instructions how to setup Home Assistant to discover new devices."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/system-search.png' class='brand pull-right' />
Home Assistant can discover and automatically configure zeroconf/mDNS and uPnP devices on your network. Currently the `discovery` component can detect:

 * Google Chromecast
 * Belkin WeMo switches
 * Philips Hue
 * Netgear routers

It will be able to add Google Chreomcasts and Belkin WeMo switches automatically, for Philips Hue it will require some configuration from the user.

To load this component, add the following lines to your `configuration.yaml`:

```
discovery:
```

If you are developing a new platform, please read [how to make your platform discoverable]({{site_root}}/developers/add_new_platform.html#discovery).

<p class='note warning'>
There is currently a <a href='https://bitbucket.org/al45tair/netifaces/issues/17/dll-fails-to-load-windows-81-64bit'>known issue</a> with running this playform on a 64-bit version of Python.
</p>
