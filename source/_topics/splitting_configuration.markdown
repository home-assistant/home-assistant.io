---
layout: page
title: "Splitting up the configuration"
description: "Splitting the configuration.yaml into several files."
date: 2016-03-25 23:30
sidebar: false
comments: false
sharing: true
footer: true
---

So you've been using Home Assistant (HA, hass, or any number of other abbreviations) for a while now and your [configuration.yaml file brings people to tears](https://home-assistant.io/cookbook/configuration_yaml_from_bassclarinetl2/) or you simply want to start off with the distributed approach, here's how to "split the configuration.yaml" into more manageable (read: husmanly readable) pieces.

First off, several community members have sanitized (read: without api keys/passwords etc) versions of their configurations available for viewing:

- [bassclarinetl2](https://github.com/bassclarinetl2/HASS)
- [happyleavesaoc](https://github.com/happyleavesaoc/my-home-automation/tree/master/homeassistant)

As commenting code doesn't always happen, please read on for the details.

Now despite the logical assumption that the configuration.yaml will be replaced by this process it will in fact remain all be it in a much less cluttered form.

In this lighter version we will still need what could be called the core snippet:

```yaml
homeassistant:
  # Name of the location where Home Assistant is running
  name: My Hass Instance
  # Location required to calculate the time the sun rises and sets
  latitude: 37
  longitude: -121
  # C for Celcius, F for Fahrenheit
  temperature_unit: F
  # Pick yours from here: http://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  time_zone: America/Los_Angeles
  customize: !include customize.yaml
```

Note that each line after `homeassistant:` is indented two (2) spaces.  Since the configuration files in Home Assistant are based on the YAML "language", indentation and spacing are important. Also note that seemingly strange entry under `customize:`.

`!include filename.yaml` is the statement that tells Home Assistant to insert the contents of `filename.yaml` at that point.  This is how we are going to break a monolithic and hard to read file (when it gets big) into more manageable chunks.

Now before we start splitting out the different components, let's look at the other components (in our example) that will stay in the base file:

```yaml
#discovery:
sun:
#updater:
history:
#conversation:
frontend:
logbook:
http:
  api_password: ImNotTelling!
  server_port: 8123
  ssl_certificate: /etc/letsencrypt/live/example.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/example.com/privkey.pem

ifttt:
  key: [nope]

wink:
  access_token: [wouldn't you]
  refresh_token: [like to know]

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
  username: user
  password: password
```
As with the core snippet, indentation makes a difference.  The component headers (`mqtt:`) should be fully left aligned (aka no indent), and the parameters (`port:`) should be indented two (2) spaces.

While some of these components can technically be moved to a separate file they are so small or "one off's" where splitting them off is superfluous.   Also, you'll notice the # symbol (hash/pound).  This represents a "comment" as far as the commands are interpreted. Put another way, any line prefixed with a `#` will be ignored.  This makes breaking up files for human readability really convenient , not to mention turning off features while leaving the entry intact. (Look at the `zigbee:` entry above and the sensors entry further down)

Now, lets assume that a blank file has been created in the hass configuration directory for each of the following:

```text
groups.yaml
zones.yaml
automation.yaml
notifications.yaml
sensors.yaml
switches.yaml
scripts.yaml
media_player.yaml
device_tracker.yaml
customize.yaml
```

`automation.yaml` will hold all the automation component details
`zones.yaml` will hold the zone component details and so forth. These files can be called anything but giving them names that match their function will make things easier to keep track of.

Inside the base configuration file add the following entries:

```yaml
group: !include groups.yaml
zone: !include zones.yaml
automation: !include automation.yaml
notifications: !include notifications.yaml
sensor: !include sensors.yaml
switch: !include switches.yaml
scripts: !include: scripts.yaml
media_player: !include media_player.yaml
device_tracker: !include device_tracker.yaml
```

Note that there can only be one `!include:` for each component so chaining them isn't going to work.  If that sounds like greek, don't worry about it.

Alright, so we've got the single components and the include statements in the base file, what goes in those extra files?

Let's look at the `device_tracker.yaml` file from our example:

```yaml
- platform: owntracks
- platform: nmap_tracker
  hosts: 192.168.2.0/24
  home_interval: 3

  track_new_devices: yes
  interval_seconds: 40
  consider_home: 120
```

This small example illustrates how the "split" files work.  In this case, we start with a "comment block" identifying the file followed by two (2) device tracker entries (owntracks and nmap).   These files follow "style 2"  that is to say a fully left aligned leading entry (`- platform: owntracks`) followed by the parameter entries indented two (2) spaces. 

This (large) sensor configuration gives us another example:

```yaml
### sensors.yaml
###
###
###
##############################################################
### METEOBRIDGE                                           ####
### http://meteobridge.com/wiki/index.php/Add-On_Services ####
### Live Data as Plain text                               ####
##############################################################

- platform: tcp
  name: 'Outdoor Temp (Meteobridge)'
  host: 192.168.2.82
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"   
  value_template: "{{value.split (' ')[2]}}"
  unit: C
- platform: tcp
  name: 'Outdoor Humidity (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[3]}}"
  unit: Percent
- platform: tcp
  name: 'Outdoor Dewpoint (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[4] }}"
  unit: C
- platform: tcp
  name: 'Wind Direction (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[7]}}"
  unit: Degrees
- platform: tcp
  name: 'Wind Gust (Meteohub)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[8]}}"
  unit: m/s
- platform: tcp
  name: 'Wind Speed (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[9]}}"
  unit: m/s
- platform: tcp
  name: 'Wind Chill (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[10]}}"
  unit: C
- platform: tcp
  name: 'Precip Rate (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charset=UTF-8\n\n"
  value_template: "{{value.split (' ')[13]}}"
  unit: mm/hr
- platform: tcp
  name: 'Precip Total (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{{value.split (' ')[14]}}"
  unit: mm
- platform: tcp
  name: 'Precip Change (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{{value.split (' ')[15]}}"
  unit: mm
- platform: tcp
  name: 'Indoor Temp (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{{value.split (' ')[18]}}"
  unit: C
- platform: tcp
  name: 'Indoor Humidity (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{{value.split (' ')[19]}}"
  unit: percent
- platform: tcp
  name: 'Indoor Dewpoint (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{{value.split (' ')[20]}}"
  unit: C
- platform: tcp
  name: 'Barometric Pressure (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{{value.split (' ')[21]}}"
  unit: mb
- platform: tcp
  name: 'Sea Level Pressure (Meteobridge)'
  host: 192.168.2.82
  port: 5556
  timeout: 6
  payload: "Content-type: text/xml; charaset=UTF-8\n\n"
  value_template: "{{value.split (' ')[22]}}"
  unit: mb
###################################
#### STEAM FRIENDS            ####
##################################

- platform: steam_online
  api_key: [not telling]
  accounts:
      - 76561198012067051

##################################
####     TIME/DATE            ####
##################################

- platform: time_date
  display_options:
      - 'time'
      - 'date'
- platform: worldclock
  time_zone: Etc/UTC
  name: 'UTC'
- platform: worldclock
  time_zone: America/New_York
  name: 'Ann Arbor'
- platform: worldclock
  time_zone: Europe/Vienna
  name: 'Innsbruck'
- platform: worldclock
  time_zone: America/New_York
  name: 'Ann Arbor'
```

You'll notice that this example includes a secondary parameter section (under the steam section) as well as a better example of the way comments can be used to break down files into sections.

That about wraps it up.

If you have issues checkout `home-assistant.log` in the configuration directory as well as your indentations.  If all else fails, head over to the gitter.im chat and ask away.

