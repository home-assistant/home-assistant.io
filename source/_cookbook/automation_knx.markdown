---
layout: page
title: "KNX automation and interaction with other systems"
description: "General KNX set up and communication with other systems like the Philips Hue."
date: 2019-01-20 22:00 +0100
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---

This cookbook shows a general KNX set up and communication with other systems like the Philips Hue.

## {% linkable_title General KNX setup %}

``` yaml
knx:
  # This is all you need to get the KNX component up and running.
  # Auto config works nicely and usually no config data for your KNX ip tunnel is needed. 
  # If the KNX router is not found automatically, check the docs and add the IP config here.

# get some sensor data from KNX to HA
sensor:
  - platform: knx
    name: Helligkeit Treppe oben
    address: '6/1/0'
    type: 'illuminance'
    # The entity_id of this sensor will be generated from the name by a slug function.
    # In this case, it will be sensor.helligkeit_treppe_oben
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

## {% linkable_title Using some values from HA within KNX %}

``` yaml
# configuration.yaml example
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

## {% linkable_title Basic KNX automation %}

This example uses an automation that is activated by a KNX switch.

The automation then triggers a script that controls a KNX light and dims it down in 5 steps from 80% to 0% over a time span of 5 minutes.

Care must be taken to stop the script, when the light is otherwise switched (i.e., by its normal on/off KNX switch). If we don't do that, the light will first switch correctly, but then the script will continue to run in the background and after the next delay has passed it will kick in again and activate its next dim level.

```yaml
knx: 

switch:
- platform: knx
  # The normal on/off switch for the light
  name: "Licht, Eltern Bett"
  address: '1/2/12'
- platform: knx
  # The switch that triggers the dim script
  # This switch must be configured in ETS to send on when pressed and off when released
  name: "Licht, Eltern Bett, Fadeout"
  address: '1/2/17'

light:
  # This is the light that we want to dim (more precisely it is the dimming actuator of the light).
  # It is directly controlled through the first switch above.
  # (Note that the switch shares its group address with this light and thus controls it over the KNX bus.)
  - platform: knx
    name: 'Eltern Bett'
    address: '1/2/12'
    state_address: '1/2/15'
    brightness_address: '1/2/13'
    brightness_state_address: '1/2/16' 

automation:
# start the dim script, if the dim switch is pressed
- id: light_eltern_bett_fadeout
  alias: Licht Eltern Bett Fade-Out
  trigger:
  - entity_id: switch.licht_eltern_bett_fadeout
    platform: state
    to: 'on'
  condition: []
  action:
  # in case the script was already running, we first stop it
  - service: script.turn_off
    entity_id: script.light_eltern_bett_fadeout
  - service: script.turn_on
    entity_id: script.light_eltern_bett_fadeout

# stop the dim script, if light is switched manually
- id: light_eltern_bett_fadeout_stop
  alias: Licht Eltern Bett Fade-Out STOP
  trigger:
  - entity_id: switch.licht_eltern_bett
    platform: state
    # no argument here = trigger with ANY state change
  condition: []
  action:
  - service: script.turn_off
    entity_id: script.light_eltern_bett_fadeout

script:
  light_eltern_bett_fadeout:
    alias: Licht Eltern Bett Fade-Out
    sequence:
      - service: light.turn_on
        entity_id: light.eltern_bett
        data:
          brightness_pct: 80
      - delay: '00:01:00'
      - service: light.turn_on
        entity_id: light.eltern_bett
        data:
          brightness_pct: 60
      - delay: '00:01:00'
      - service: light.turn_on
        entity_id: light.eltern_bett
        data:
          brightness_pct: 40
      - delay: '00:01:00'
      - service: light.turn_on
        entity_id: light.eltern_bett
        data:
          brightness_pct: 20
      - delay: '00:01:00'
      - service: light.turn_on
        entity_id: light.eltern_bett
        data:
          brightness_pct: 10
      - delay: '00:01:00'
      - service: light.turn_off
        entity_id: light.eltern_bett
```

## {% linkable_title Use KNX switches to control Philips Hue or Ikea Trådfri %}

In this example we will use two KNX switches to control the brightness and the color temperature of some Hue White Ambiance bulbs. We will also switch an Osram Smart+ (AKA Lightify) on-off-plug together with the Hues. This code is gerneric and should also work with other Zigbee based systems like Ikea Trådfri.

My personal setup uses two switches programmed on an MDT Glass Push Buttons II Smart device. Both switches are programmed to circle through a set of percent values with each push. One switch sends percent values for the brightness of the Hues (0, 1, 50, 100%), and the other one sends percent values for three different color temperatures (0, 50, 100%), which are mapped to warmest, medium, and coldest light temperature of the Hues. The MDT devices do in fact offer specialized controls to softly dim up and down through brightness and color, but I very much prefer fast switching between some predefined values.

Before you start, make sure that you have activated the Hue integration in HA, paired HA with your Hue bridge and that your Hue bulbs appear in HA's overview page. In the example below the Hues have the entity_ids `light.hue_couch_1`, `...2`, `...3`. These entity_ids are derived from the names that you store in the Hue bridge through the Hue app. As always, use the dev tools' state page (icons at the bottom of the left side menu) to check the available entity_ids in your own system.

```yaml
knx: 

sensor:
  - platform: knx
    name: "Licht, Couch DimAbs"
    address: '1/1/52'
    type: "percent"    
  - platform: knx
    name: "Licht, Couch FarbTemp"
    address: '1/1/54'
    type: "percent"

automation:
# handle brightness values > 0
- id: light_knx_to_hue_couch_percent
  alias: Licht Couch KNX an Hue PROZENT
  initial_state: 'on'
  trigger:
  - platform: state
    entity_id: sensor.licht_couch_dimabs
  condition:
  - condition: template
    value_template: "{{ float(trigger.to_state.state) > 0 }}"
  action:
  # turn on / set brightness for the Hue bulbs
  - service: light.turn_on
    data_template:
      entity_id: light.hue_couch_1, light.hue_couch_2, light.hue_couch_3
      brightness: '{{ (float(trigger.to_state.state) * 255 / 100) | round(0) }}'
  # turn on the Osram on-off-plug
  - service: light.turn_on
    entity_id: light.steckdosenschalter_couch

# handle brightness value == 0  (which means OFF)
- id: light_knx_to_hue_couch_percent_off
  alias: Licht Couch KNX an Hue PROZENT AUS
  initial_state: 'on'
  trigger:
  - platform: state
    entity_id: sensor.licht_couch_dimabs
    to: '0'
  condition:
  action:
  - service: light.turn_off
    entity_id: light.hue_couch_1, light.hue_couch_2, light.hue_couch_3, light.steckdosenschalter_couch

# Handle color temp values
- id: light_knx_to_hue_couch_color
  alias: Licht Couch KNX an Hue FARBE
  initial_state: 'on'
  trigger:
  - platform: state
    entity_id: sensor.licht_couch_farbtemp
  condition:
  action:
  - service: light.turn_on
    data_template:
      entity_id: light.hue_couch_1, light.hue_couch_2, light.hue_couch_3
      # Do some math to convert 0...100% into the min/medium/max color temperature of your bulbs.
      # The color temperature is defined in Mireds instead of Kelvin (Mired = 1,000,000 / Kelvin).
      # The lowest and highest available Mired value is read from the attributes of one of the bulbs, 
      # so this works with Hue as well as Trådfri. 
      color_temp: '{{ ((1 - float(trigger.to_state.state) / 100) * (states.light.hue_couch_1.attributes.max_mireds - states.light.hue_couch_1.attributes.min_mireds) + states.light.hue_couch_1.attributes.min_mireds) | round(0) }}'
```

**Remarks:**

It would have been nicer to use numeric_state triggers instead of state triggers for these automations. But I did not have any luck with numeric_state. I guess this is because the percentage values from the KNX bus are read into HA as strings rather than integers. As we cannot use numeric_state, we have to do checks like `above: 0` through conditions and value templates. This makes the automation blocks a bit more complex. On the other hand value templates are much more flexible, if you want to implement more complex behavior.

Instead of naming all of your single bulbs again and again in the above code, you can also group them into a "room" in the Hue app and use the entity_id of that room. This will shorten the code:

```yaml
  ...
    data_template:
      entity_id: light.hue_raum_couch
  ...
  - service: light.turn_off
    entity_id: light.hue_raum_couch, light.steckdosenschalter_couch
  ...
    data_template:
      entity_id: light.hue_raum_couch
      color_temp: '{{ ((1 - float(trigger.to_state.state) / 100) * (states.light.hue_raum_couch.attributes.max_mireds - states.light.hue_raum_couch.attributes.min_mireds) + states.light.hue_raum_couch.attributes.min_mireds) | round(0) }}'
```
