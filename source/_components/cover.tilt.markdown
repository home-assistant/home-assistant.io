---
layout: page
title: "Tilt Cover"
description: "Tilt Cover for Home Assistant"
date: 2016-12-20 22:00
sidebar: true
comments: false
sharing: true
footer: true
---


**Description:**
Tilt Cover for [Home Assistant](https://github.com/home-assistant/home-assistant)

Combines a tilt sensor and a relay switch to control a garage door opener or motorized gate.
When this switch is turned on it will toggle the relay to activate the garage door if it is
not already open. The reverse will happen when it is turned off.


````yaml
# Example configuration.yaml entry
cover tilt:
  platform: tilt
  covers:
    front_garage_door:
      tilt_sensor:   binary_sensor.my_tilt_switch
      switch:        switch.my_relay_switch
      contact_delay: 1 
      run_time:      10
````

- **covers** (*Required*): The array that contains all tilt covers.
  - **identifier ** (*Required*): Name of the tilt cover. Multiple entries are possible.  
    - **tilt_sensor** (*Required*): Binary Tilt Sensor.
    - **switch** (*Required*): Relay switch that activates opener.
    - **contact_delay** (*Optional*): on time for switch to simulate button press. default: 1 second.
    - **run_time** (*Optional*): run time for the opener. default: 10 seconds.

**My hardware:**

[Ecolink z-wave tilt sensor](http://amzn.to/2ebYPgU)

[Z-wave relay Switch](http://amzn.to/2ec29bK)

Screenshot:
<p class='img'>
  <img src='{{site_root}}/images/components/tilt/tilt-cover-screen.png' />
</p>
