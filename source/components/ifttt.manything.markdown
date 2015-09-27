---
layout: page
title: "IFTTT - ManyThing Channel"
description: "Instructions how to setup ManyThing support with IFTTT."
date: 2015-09-07 18:00
sidebar: false
comments: false
sharing: true
footer: true
---
<img src='/images/supported_brands/manything.png' class='brand pull-right' />
[Manything](https://manything.com) is a smart app that turns your iPhone, iPod, or iPad into a wifi 
camera for monitoring your home, your pets, anything! Comes with live streaming, motion activated alerts, cloud video recording, and more.

<p>To get manything support, HA will use IFTTT's [Maker Channel](https://ifttt.com/maker) and the [ManyThing Channel](https://ifttt.com/manything).
Use the [IFTTT Setup instructions] (/components/ifttt.html) to activate the IFTTT Platform.

After setting up IFTTT, Maker Channel and ManyThing Channel, you can use the following examples to configure Home Assistant.

```yaml
# Example configuration.yaml entry
 
automation:
- alias: 'ManyThing Recording ON'
# This calls an IFTTT recipe to turn on recording of the ManyThing Camera when we leave the house during the day.
  trigger:
   - platform: state
     entity_id: group.all_devices
     state: 'not_home'

  condition:
   - platform: state
     entity_id: sun.sun
     state: 'above_horizon'

  action:
     service: ifttt.trigger
     data: {"event":"anything_on"}

- alias: 'ManyThing Recording OFF'
# This calls an IFTTT recipe to turn off recording of the ManyThing Camera when we are home except at night.
  trigger:
   - platform: state
     entity_id: group.all_devices
     state: 'home'
   - platform: state
     entity_id: sun.sun
     state: 'below_horizon'


  condition: use_trigger_values

  action:
     service: ifttt.trigger
     data: {"event":"anything_off"}

```

### {% linkable_title Testing your trigger %}

You can use the developer tools to test your [Maker Channel](https://ifttt.com/maker) trigger. To do this, open the Home Assistant UI, open the sidebar, click on the first icon in the developer tools. This should get you to the 'Call Service' screen. Fill in the following values:

Field | Value
----- | -----
domain | `ifttt`
service | `trigger`
Service Data | `{"event": "manything_on"}`

### {% linkable_title Setting up a recipe %}

<p class='img'>
<img src='/images/components/ifttt/IFTTT_manything_trigger.png' />
You need to setup a unique trigger for each event you sent to IFTTT.
For ManyThing support, you need to set up an <code>on</code> and <code>off</code> event.
</p>

