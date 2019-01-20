---
layout: page
title: "KNX automation and interaction with other systems"
description: "General KNX setup and communication with other systems like Philips Hue."
date: 2019-01-20 22:00 +0100
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

Attention, this is work in progress of a HA beginner. Please contribute and improve.

# KNX automation and interaction with other systems

General KNX setup and communication with other systems like Philips Hue.

### General KNX setup
config.yaml
```
knx:
  # This is all you need to get the KNX component up and running.
  # Auto config works nicely and usually no config data for your knx ip tunnel is needed. 
  # If the KNX router is not found automatically, check the docs and add the ip config here.

# get some sensor data from KNX to HA
sensor:
  - platform: knx
    name: Helligkeit Treppe oben
    address: '6/1/0'
    type: 'illuminance'
    # The entity_id of this sensor will be generated from the name by a slug function.
    # In this case it will be sensor.helligkeit_treppe_oben
    # See dev tools' state page (icons at the bottom of left side menu) for a list of all entity_ids

light:
  # See "sensor" remarks above for an explanation of the resulting entity_ids
  - platform: knx
    # switched light
    name: 'Eltern Decke'
    address: '1/2/10'
    state_address: '1/2/11'
    
  - platform: knx
    # dimmed light
    name: 'Eltern Bett'
    address: '1/2/12'
    state_address: '1/2/15'
    brightness_address: '1/2/13'
    brightness_state_address: '1/2/16' 

cover:
  # KNX Covers are roller shutters and blinds.
  # These items currently expose a bug with the invert_position setting:
  # Either you will get 100% for an open shutter and 0% for a closed one
  # or you will get the function of up and down arrows exchanged wrongly.
  # Hope this is resolved soon.
  # ---
  # See "sensor" remarks above for an explanation of the resulting entity_ids
  - platform: knx
    name: "Eltern"
    move_long_address: '3/2/0'
    move_short_address: '3/2/1'
    position_address: '3/2/3'
    position_state_address: '3/2/2'
    travelling_time_up: 23
    travelling_time_down: 21
    invert_position: true
    
  - platform: knx
    name: "Büro"
    move_long_address: '3/2/4'
    move_short_address: '3/2/5'
    position_address: '3/2/7'
    position_state_address: '3/2/6'
    travelling_time_up: 23
    travelling_time_down: 21
    invert_position: true
```

### Using some values from HA within KNX
config.yaml
```
sensor:
# Register with Dark Sky to retrieve current environment data.
# Registration is free for the amount of requests we need here.
- platform: openweathermap
    name: OpenWeather
    language: de
    api_key: YOUR_API_KEY
    monitored_conditions:
      - weather
      - temperature
      - wind_speed
      - wind_bearing
      - humidity
      - pressure
      - clouds
      - rain
      - snow
      - weather_code

knx: 
  # Expose the above sensor data from HA to KNX group addresses.
  # To find the right "type" setting for each parameter, create a group address in ETS, 
  # add a consuming actor for this kind of parameter to it and check the properties pane. 
  # ETS will show you a data type (DPT) that you can compare to the available DPTs in the 
  # documentation of the HA KNX component.
  expose:
  - type: 'temperature'
    entity_id: 'sensor.dark_sky_temperature'
    address: '0/1/10'
  - type: 'humidity'
    entity_id: 'sensor.dark_sky_humidity'
    address: '0/1/11'
  - type: 'temperature'
    entity_id: 'sensor.dark_sky_pressure'
    address: '0/1/12'
  - type: 'DPT-9'
    entity_id: 'sensor.dark_sky_wind_speed'
    address: '0/1/13'
  - type: 'DPT-14'
    entity_id: 'sensor.dark_sky_wind_bearing'
    address: '0/1/14'
```

### Coming soon:
* Basic KNX automation
* Controlling Philips Hue from KNX switches and sensors
