---
title: "Home Assistant meets IFTTT"
description: "Announcing new integration with IFTTT and some samples to get started."
date: 2015-09-13 09:28 -0700
date_formatted: "September 13, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories: How-To Release-Notes
og_image: /images/blog/2015-09-ifttt/og_facebook.png
---

Today we announce the release of Home Assistant v0.7.2 which includes brand new support by [@sfam][github-sfam] to integrate with [IFTTT][ifttt]. IFTTT stands for If This, Then That and is a webservice that integrates with almost every possible webservice out there. Adding Home Assistant to this mix means Home Assistant can connect with all via IFTTT.

It is now possible to disable your irregation system if it is going to be cloudy tomorrow or tweet if your smoke alarm goes off.

[github-sfam]: https://github.com/sfam
[ifttt]: https://ifttt.com

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/splash.png'>
</p>

Head over to the [setup instructions](/integrations/ifttt/) to get started with IFTTT. Click the read more button for some example recipes.

<!--more-->

In each of the following examples, make sure to replace the XXX in the URL with your correct host address and API password.

## Turn off irregation system when not needed

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-weather.png' />
</p>

Maker channel setup:

| Field | Value |
| ----- | ----- |
| URL   |  `http://xxx.xxx.xxx.xxx:8123/api/services/switch/turn_off?api_password=xxxxxxxx`
| METHOD | POST
| CONTENT TYPE | application/json
| BODY | { "entity_id": "switch.irrigation" }

## Tweet when important events happen

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-twitter.png' />
</p>

This will tweet a message when an MQTT message is received that the smoke alarm has been triggered. Setup Maker channel with event name `HA_FIRE_ALARM` and Twitter channel to tweet the message in `value1`.

```yaml
# Configuration.yaml entry
automation:
- alias: "Post a tweet when fire alarm is triggered"
  trigger:
    platform: mqtt
    mqtt_topic: home/alarm/fire
    mqtt_payload: "on"

  action:
    service: ifttt.trigger
    data: {"event":"HA_FIRE_ALARM", "value1":"The fire alarm just triggered!"}
```

## Turn on lights when I get home

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-geo.png' />
</p>

Maker channel setup:

| Field | Value |
| ----- | ----- |
| URL   |  `http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx`
| METHOD | POST
| CONTENT TYPE | application/json
| BODY | { "entity_id": "light.kitchen" }

## Flash lights when a new PR comes in for Home Assistant

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-github.png' />
</p>

Maker channel setup:

| Field | Value |
| ----- | ----- |
| URL   |  `http://xxx.xxx.xxx.xxx:8123/api/services/light/turn_on?api_password=xxxxxxxx`
| METHOD | POST
| CONTENT TYPE | application/json
| BODY | { "entity_id": "group.all_lights", "flash":"yes" }

## Fire events when pressing the DO button

<p class='img'>
  <img src='/images/blog/2015-09-ifttt/recipe-do.png' />
</p>

Maker channel setup:

| Field | Value |
| ----- | ----- |
| URL   |  http://xxx.xxx.xxx.xxx:8123/api/events/do_button_pressed?api_password=xxxxxxxx
| METHOD | POST
| CONTENT TYPE | application/json
