---
layout: page
title: "EtherRain Switch"
description: "How to turn on/off your irrigation valves"
date: 2017-08-09 06:16
sidebar: true
comments: false
sharing: true
footer: true
logo: etherrain.jpg
ha_category: Switch
ha_release: 0.31
ha_iot_class: "Local Polling"
---


The `etherrain` switch platform allows you to turn individual [EtherRain](http://www.quicksmart.com/qs_etherrain.html) irrigation valves on/off

<p class='note'>
You must have the [EtherRain component](/components/etherrain/) configured to use this.
</p>

To enable this switch, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: etherrain
    valve_id: 1
    name: "Side Beds"
    duration: 20
```

Configuration variables:

- **valve_id** (*Required*): The valve port on the EtherRain [1-8]
- **name** (*Required*): The name of your irrigation zone
- **duration** (*Optional*): How long to run this valve in minutes (default: 60)


## Notes and Limitations
- The maximum runtime of any one valve is 60 minutes in the EtherRain firmware.  So if you want to water for more than 60 minutes, you must schedule multiple activations sequentially.
- If duration is specified, then your automation does not need to specify an 'off' event as the water will turn itself off automatically after this time.  If duration is not specified, then the valve will be on for 60 minutes.
- If a valve is currently on and your automation issues an 'off' event for another valve, then all valves will be turned off.
