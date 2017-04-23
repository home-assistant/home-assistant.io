---
layout: page
title: "Wink Lock"
description: "Instructions how to setup the Wink locks within Home Assistant."
date: 2015-11-20 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Lock
ha_release: 0.9
---


The Wink lock platform allows you to control your [Wink](http://www.wink.com/) locks.

The requirement is that you have setup [Wink](/components/wink/).


### Supported lock devices

- Kwikset
- Schlage
- Generic Z-wave

<p class='note'>
If supported by your lock, a binary sensor will be created for each user key code you have defined. These key codes will turn on when the code is entered and automatically turn off after a few seconds.
</p>
