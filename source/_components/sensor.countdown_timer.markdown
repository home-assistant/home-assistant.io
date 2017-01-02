---
layout: page
title: "Countdown Timer"
description: "Countdown Time for Home Assistant"
date: 2016-12-20 22:00
sidebar: true
comments: false
sharing: true
footer: true
---


**Description:**
Countdown Timer for [Home Assistant](https://github.com/home-assistant/home-assistant)

Combines one or more binary_sensors (typically PIR sensors) 
and a switch to provide a switch that automatically
turns off after a specified delay time. 

Creates a sensor that displays the time remaining before the
switch is turned off. 

If the sensors detect activity while the switch is on then the timer is
restarted.

The can be accomplished otherwise in Home Assistant. However this component reduces
the user configuration from dozens of lines of automation and scripting
to just a few lines in the configuration.yaml file.

````yaml
# Example configuration.yaml entry
sensor countdown_timer:
  platform: countdown_timer
  timers:
    lr_light:
      sensors: binary_sensor.lr_pir1
      switch:  switch.lr_light_switch
````

- **timers** (*Required*): The array that contains all timers.
  - **identifier ** (*Required*): Name of the timer. Multiple entries are possible.  
    - **sensors** (*Required*): One or more binary sensor (comma separated).
    - **switch** (*Required*): Light (or other) switch.
    - **delay** (*Optional*): delay time. default: 20 seconds.
    - **restart** (*Optional*): True/False, restart timer when HA is restarted. Default: False

**My hardware:**

- [GE Lighting Control On/Off Switch, Z-Wave, In-Wall Switch](http://amzn.to/2ho17cN)
- [Ecolink Z-Wave PIR Motion Detector, Pet Immune - PIRZWAVE2-ECO](http://amzn.to/2il7FHH)

**My Config:**
```yaml
# My configuration.yaml entry

sensor countdown_timer:
  platform: countdown_timer
  timers:
    lr_timed_light:
      sensors:    binary_sensor.lr_pir_sensor_7_0
      switch:     switch.lr_wall_light_switch_4_0
    fr_timed_light:
      sensors:    binary_sensor.fr_pir_sensor_9_0 #,binary_sensor.fr_pir_2_sensor_10_0
      switch:     switch.fr_light_switch_19_0
      restart:    True
    garage_timed_light:
      sensors:    binary_sensor.garage_side_pir_sensor_14_0 #,binary_sensor.garage_back_pir_sensor_13_0
      switch:     switch.garage_light_switch_12_0
      restart:    True
```
**Suggestions:**
```yaml
#In group.yaml something like this:

  Living Room Light:
    entities:
      - binary_sensor.lr_pir_sensor_7_0
      - switch.lr_wall_light_switch_4_0
      - sensor.lr_timed_light

  Living Room:
    view: yes
    entities:
      - sensor.lr_temp
      - group.nest_thermostat
      - climate.homelr
      - group.living_room_light
      - group.media
      - camera.living_room
```
**Screenshot:**

<p class='img'>
  <img src='{{site_root}}/images/components/sensor/countdown-timer.png' />
</p>
