---
layout: page
title: "Keyboard"
description: "Instructions how to simulate key presses with Home Assistant."
date: 2015-01-24 14:39
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/keyboard.png' class='brand pull-right' />
The `keyboard` component simulates key presses on the host machine. It currently offers the following Buttons as a Service (BaaS):

 * `keyboard/volume_up`
 * `keyboard/volume_down`
 * `keyboard/volume_mute`
 * `keyboard/media_play_pause`
 * `keyboard/media_next_track`
 * `keyboard/media_prev_track`

To load this component, add the following lines to your `configuration.yaml`:

```
keyboard:
```
