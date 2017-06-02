---
layout: page
title: "Configuration.yaml by bassclarinetl2"
description: ""
date: 2016-03-24 17:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Example configuration.yaml
---

```yaml
homeassistant:
  # Name of the location where Home Assistant is running
  name: example.com
  # Location required to calculate the time the sun rises and sets
  latitude: 37
  longitude: -121
  # 'metric' for Metric, 'imperial' for Imperial
  unit_system: imperial
  # Pick yours from here: http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  time_zone: America/Los_Angeles
  customize:
    switch.aeon_labs_smart_energy_switch_switch_2:
      friendly_name: Mac Switch-Meter
    switch.leviton_unknown_type1a02_id0334_switch_3:
      friendly_name: W Nightstand
      entity_picture: /local/zwvapl.jpg
    switch.hub_switch:
      friendly_name: Wink Hub Switch
      entity_picture: /local/wemoswitch.jpg
    switch.leviton_unknown_type1a02_id0334_switch_4:
      friendly_name: Christmas Tree
      entity_picture: /local/zwvapl.jpg
    switch.leviton_unknown_type1a02_id0334_switch_5:
      friendly_name: Roof Lights
      entity_picture: /local/zwvapl.jpg

    light.w_bedroom_ceiling_:
      friendly_name: Will's Bedroom Ceiling Lights (Wink)
      entity_picture: /local/casetta.jpg
    light.living_room_wall_:
      friendly_name: Living Room Couch Lights (Wink)
      entity_picture: /local/casetta.jpg

    media_player.my_shield_android_tv:
      friendly_name: Dalek (Cast)
      entity_picture: /local/shieldtv.jpg
    media_player.chromecast:
      friendly_name: Jeff chromecast
      entity_picture: /local/chromecast.jpg
    media_player.kodi:
      friendly_name: Tardis-Win7 (Kodi)
      entity_picture: /local/kodi.png
    media_player.kodi_2:
      friendly_name: Dalek (Kodi)
    media_player.roku_2_xd__12a18n045363:
      friendly_name: Parents Roku
      entity_picture: /local/roku2xd.jpg

    sensor.aeon_labs_smart_energy_switch_power_2:
      friendly_name: Mac Usage (W)
    sensor.aeon_labs_smart_energy_switch_previous_reading_2:
      friendly_name: Mac Usage Previous (W)
      hidden: true
    sensor.aeon_labs_smart_energy_switch_energy_2:
      friendly_name: Mac Usage (kWh)
      hidden: true

#####################
## GROUPS
#####################
group:
  w_bedroom:
   - switch.leviton_unknown_type1a02_id0334_switch_3
   - light.w_bedroom_ceiling_
  christmas:
   - switch.leviton_unknown_type1a02_id0334_switch_4
   - switch.leviton_unknown_type1a02_id0334_switch_5
  almanac:
   - sensor.date
   - sensor.time
   - sensor.time_utc
   - sun.sun
  tracker:
   - device_tracker.will_wnexus
#  OpenWeatherMap:
#   - sensor.weather_temperature
#   - sensor.weather_humidity
#   - sensor.weather_pressure
#   - sensor.weather_rain
#   - sensor.weather_wind_speed
#   - sensor.weather_cloud_coverage
#   - sensor.weather_forecast
  Meteobridge:
   - sensor.outdoor_temp_meteobridge
   - sensor.outdoor_humidity_meteobridge
   - sensor.outdoor_dewpoint_meteobridge
   - sensor.precip_rate_meteobridge
   - sensor.wind_direction_meteobridge
   - sensor.wind_gust_meteohub
   - sensor.wind_chill_meteobridge
   - sensor.wind_speed_meteobridge
   - sensor.indoor_dewpoint_meteobridge
   - sensor.indoor_humidity_meteobridge
   - sensor.indoor_temp_meteobridge
   - sensor.precip_change_meteobridge
   - sensor.precip_total_meteobridge
   - sensor.sea_level_pressure_meteobridge
   - sensor.barometric_pressure_meteobridge

####################
## ZONES
####################
zone:
  name: Home
  latitude: 37
  longitude: -121  
  radius: 200
  icon: mdi:home

zone 2:
  name: Barracuda_(SJ)
  latitude: 37
  longitude: -121
  radius: 100

zone 3:
  name: SFC
  latitude: 37
  longitude: -122
  radius: 95

####################
## NOTIFICATIONS
####################


####################
## AUTOMATION
####################
automation:
#- alias: 'W_at_work' 
#  trigger:
#    - platform: zone
#      entity_id: device_tracker.will_wnexus
#      zone: zone.barracuda_sj
#      event: enter
#    - platform: time
#      at: '07:15'
#      before: '09:00'
#  action:
#    service: ifttt.trigger
#    data: {"event":"hassnotification_dadsms", "value1": "Will's at Work"}
- alias: "Update_Update"
  trigger:
    platform: state
    entity_id: updater.updater
  action:
    service: ifttt.trigger
    data: {"event":"hassnotification_willsms","value1":"HASS has an update"}
- alias: 'Christmas Roof ON'
  trigger:
    platform: sun
    event: sunset
    offset: '-01:00:00'
  action:
    service: homeassistant.turn_on
    entity_id: switch.leviton_unknown_type1a02_id0334_switch_5
- alias: 'Christmas Roof OFF'
  trigger:
    platform: time
    hours: 1
    minutes: 0
    seconds: 0
  action:
    service: homeassistant.turn_off
    entity_id: switch.leviton_unknown_type1a02_id0334_switch_5
- alias: 'Christmas Tree ON'
  trigger:
    platform: time
    hours: 8
    minutes: 0
    seconds: 0
  action:
    service: homeassistant.turn_on
    entity_id: switch.leviton_unknown_type1a02_id0334_switch_4
- alias: 'Christmas Tree (OFF)'
  trigger:
    platform: time
    hours: 23
    minutes: 0
    seconds: 0
  action:
    service: homeassistant.turn_off
    entity_id: switch.leviton_unknown_type1a02_id0334_switch_4
#- alias: test notify
#  trigger:
#    platform: time
#    minutes: '/5' #every 5 min
#  action:
#    service: notify.pushEtta
#    data: 
#      message: 5 Min Test


#################################
###       COMPONENTS          ###
#################################
#discovery:
sun:
#updater:
history:
#conversation:
frontend:
logbook:

http:
  api_password: [password goes here]
  server_port: 8123
  ssl_certificate: /etc/letsencrypt/live/example.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/example.com/privkey.pem

ifttt:
  key: [redacted]

media_player 1:
  platform: plex
#media_player 2:  
#  platform: squeezebox
#  host: 192.168.2.80
#  port: 9000
media_player 3:
  platform: cast
media_player 4:
  platform: kodi
  url: http://192.168.2.129:8080/jsonrpc
  user: kodi
  password: kodi
media_player 5:
  platform: plex
media_player 6:
  platform: kodi
  url: http://192.168.2.165/jsonrpc
media_player 7:
  platform: samsungtv
  host: 192.168.2.90
  name: Parents TV

wink:
  access_token: [redacted]
  refresh_token: [redacted]

zwave:
  usb_path: /dev/ttyUSB0
  config_path: /usr/local/share/python-openzwave/config
  polling_interval: 10000

#zigbee:
#  device: /dev/ttyUSB1
#  baud: 115200

mqtt:
  broker: 127.0.0.1
  port: 8883
  username: [redacted]
  password: [redacted]

device_tracker 1:
  platform: owntracks

  track_new_devices: yes
  interval_seconds: 40
  consider_home: 120 

device_tracker 2:
  platform: nmap_tracker
  hosts: 192.168.2.0/24
  home_interval: 3

#sensor:
#  platform: openweathermap
#  api_key: [redacted]
#  forecast: 1
#  monitored_conditions:
#    - temperature
#    - wind_speed
#    - humidity
#    - pressure
#    - clouds
#    - rain

sensor 2:
  platform: time_date
  display_options:
    - 'time'
    - 'date'
    - 'time_utc'

### BEGIN METEO SENSORS ###
sensor 3:
  platform: tcp
  name: Outdoor Temp (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"   
  value_template: "{% raw %}{{value.split (' ')[2]}}{% endraw %}"
  unit: C

sensor 4:
  platform: tcp
  name: Outdoor Humidity (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[3]}}{% endraw %}"
  unit: Percent

sensor 5:
  platform: tcp
  name: Outdoor Dewpoint (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[4] }}{% endraw %}"
  unit: C

sensor 6:
  platform: tcp
  name: Wind Direction (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[7]}}{% endraw %}"
  unit: Degrees

sensor 7:
  platform: tcp
  name: Wind Gust (Meteohub)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[8]}}{% endraw %}"
  unit: m/s

sensor 8:
  platform: tcp
  name: Wind Speed (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[9]}}{% endraw %}"
  unit: m/s

sensor 9:
  platform: tcp
  name: Wind Chill (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[10]}}{% endraw %}"
  unit: C

sensor 10:
  platform: tcp
  name: Precip Rate (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[13]}}{% endraw %}"
  unit: mm/hr

sensor 11:
  platform: tcp
  name: Precip Total (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[14]}}{% endraw %}"
  unit: mm

sensor 12:
  platform: tcp
  name: Precip Change (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[15]}}{% endraw %}"
  unit: mm

sensor 13:
  platform: tcp
  name: Indoor Temp (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[18]}}{% endraw %}"
  unit: C

sensor 14:
  platform: tcp
  name: Indoor Humidity (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[19]}}{% endraw %}"
  unit: percent

sensor 15:
  platform: tcp
  name: Indoor Dewpoint (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[20]}}{% endraw %}"
  unit: C

sensor 16:
  platform: tcp
  name: Barometric Pressure (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[21]}}{% endraw %}"
  unit: mb

sensor 17:
  platform: tcp
  name: Sea Level Pressure (Meteobridge)
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{% raw %}{{value.split (' ')[22]}}{% endraw %}"
  unit: mb

sensor 18:
  platform: steam_online
  api_key: [Redact]
  accounts:
    - 76561198012067051

switch:
  platform: wemo
```
