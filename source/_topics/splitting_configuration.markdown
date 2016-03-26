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

So you've been using Home Assistant for a while now and your [configuration.yaml file brings people to tears](https://home-assistant.io/cookbook/configuration_yaml_from_bassclarinetl2/) or you simply want to start off with the distributed approach, here's how to "split the configuration.yaml" into more manageable (read: humanly readable) pieces.

First off, several community members have sanitized (read: without api keys/passwords etc) versions of their configurations available for viewing, you can see a list of them [here](https://home-assistant.io/cookbook/#example-configurationyaml).

As commenting code doesn't always happen, please read on for the details.

Now despite the logical assumption that the `configuration.yaml` will be replaced by this process it will in fact remain all be it in a much less cluttered form.

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

Note that each line after `homeassistant:` is indented two (2) spaces. Since the configuration files in Home Assistant are based on the YAML language, indentation and spacing are important. Also note that seemingly strange entry under `customize:`.

`!include filename.yaml` is the statement that tells Home Assistant to insert the contents of `filename.yaml` at that point. This is how we are going to break a monolithic and hard to read file (when it gets big) into more manageable chunks.

Now before we start splitting out the different components, let's look at the other components (in our example) that will stay in the base file:

```yaml
history:
frontend:
logbook:
http:
  api_password: ImNotTelling!

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
```
As with the core snippet, indentation makes a difference. The component headers (`mqtt:`) should be fully left aligned (aka no indent), and the parameters (`port:`) should be indented two (2) spaces.

While some of these components can technically be moved to a separate file they are so small or "one off's" where splitting them off is superfluous. Also, you'll notice the # symbol (hash/pound). This represents a "comment" as far as the commands are interpreted. Put another way, any line prefixed with a `#` will be ignored. This makes breaking up files for human readability really convenient, not to mention turning off features while leaving the entry intact. (Look at the `zigbee:` entry above and the b entry further down)

Now, lets assume that a blank file has been created in the hass configuration directory for each of the following:

```text
automation.yaml
zones.yaml
sensors.yaml
switches.yaml
device_tracker.yaml
customize.yaml
```

`automation.yaml` will hold all the automation component details. `zones.yaml` will hold the zone component details and so forth. These files can be called anything but giving them names that match their function will make things easier to keep track of.

Inside the base configuration file add the following entries:

```yaml
automation: !include automation.yaml
zone: !include zones.yaml
sensor: !include sensors.yaml
switch: !include switches.yaml
device_tracker: !include device_tracker.yaml
```

Note that there can only be one `!include:` for each component so chaining them isn't going to work. If that sounds like greek, don't worry about it.

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

This small example illustrates how the "split" files work. In this case, we start with a "comment block" identifying the file followed by two (2) device tracker entries (`owntracks` and `nmap`). These files follow ["style 2"](/getting-started/devices/#style-2-list-each-device-separately) that is to say a fully left aligned leading entry (`- platform: owntracks`) followed by the parameter entries indented two (2) spaces. 

This (large) sensor configuration gives us another example:

```yaml
### sensors.yaml
##############################################################
### METEOBRIDGE                                           ####
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

If you have issues checkout `home-assistant.log` in the configuration directory as well as your indentations. If all else fails, head over to the [Gitter Chatroom](https://gitter.im/balloob/home-assistant) and ask away.

