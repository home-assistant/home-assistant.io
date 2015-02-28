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

Home Assistant can discover and automatically configure zeroconf/mDNS and uPnP devices on your network. Currently the `discovery` component can detect:

 * Google Chromecast
 * Belkin WeMo switches
 * Philips Hue

It will be able to add Google Chreomcasts and Belkin WeMo switches automatically, for Philips Hue it will require some configuration from the user.

To load this component, add the following lines to your `configuration.yaml`:

```
discovery:
```

If you are developing a new platform, please read [how to make your platform discoverable]({{site_root}}/developers/add_new_platform.html#discovery).
