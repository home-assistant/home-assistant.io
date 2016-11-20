---
layout: page
title: "Harmony Hub Remote"
description: "Instructions how to integrate Harmony Hub remotes into Home Assistant."
date: 2016-11-05 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: logitech.png
ha_category: Remote
ha_iot_class: "Local Polling"
ha_release: "0.33"
---


The `harmony` remote platform allows you to control the state of your [Harmony Hub Device](http://www.logitech.com/en-us/product/harmony-hub).

Supported units:

- Harmony Hub
- Harmony Companion
- Harmony Pro
- Harmony Elite


To use your Harmony remote in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
remote:
  - platform: harmony
    name: Bedroom
    username: !secret username
    password: !secret password
    host: 10.168.1.13
    port: 5222
    activity: BedroomTV
    scan_interval: 45
  - platform: harmony
    name: Family Room
    username: !secret username
    password: !secret password
    host: 10.168.1.16
    port: 5222
    activity: Kodi
    scan_interval: 60
```

**Configuration variables**:

- **name** (*Required*): The hub's name to display in the front end.
- **username** (*Required*): The email address used to login to the Harmony website.
- **password** (*Required*): The password used to login to the Harmony website.
- **host** (*Required*): The Harmony device's IP address.
- **port** (*Required*): The Harmony device's port, 5222 is default.
- **activity** (*Optional*): Activity to use when turnon service is called without any data.
- **scan_interval** (*Optional*): Amount in seconds in between polling for device's current activity, defaults to 30 seconds
**Configuration File**: 
Upon startup one file will be written to your HASS configuration directory per device in the following format: harmony_REMOTENAME.conf.  The file will contain:

- List of all programmed activity names and ID numbers
- List of all programmed device names and ID numbers
- List of all available commands per programmed device



**Supported services**:

- **Turn Off**: Turn off all devices that were switched on from the start of the current activity

- **Turn On**: Start an activity, will start the default activity from configuration.yaml if no activity is specified.  The specified activity can either be the activity name or the activity ID from the configuration file written to your HASS config directory.  The service will respond faster if the activity ID is passed instead of the name

- **Send Command**: Send a command to one device, device ID and available commands are written to the configuration file at startup

- **Sync**: Synchronizes the Harmony device with the Harmony web service if any changes are made from the web portal or app


**Examples**

- *Template sensors can be utilized to display current activity in the frontend.*

```yaml
sensor:
  - platform: template
    sensors:
      family_room:
        value_template: {% raw %}'{{ states.remote.family_room.attributes.current_activity }}'{% endraw %}
        friendly_name: 'Family Room'
      bedroom:
        value_template: {% raw %}'{{ states.remote.bedroom.attributes.current_activity }}'{% endraw %}
        friendly_name: 'bedroom'
```


- *The example below shows how to control an `input_boolean` switch using the Harmony remote's current activity.  The switch will turn on when the remote's state changes and the Kodi activity is started and off when the remote's state changes and the current activity is PowerOff.*

```yaml
automation:
- alias: "Watch TV started from harmony hub"
  trigger:
    platform: state
    entity_id: remote.family_room
  condition:
    condition: template
    value_template: {% raw %}'{{ trigger.to_state.attributes.current_activity == "Kodi" }}'{% endraw %}
  action:
    service: input_boolean.turn_on
    entity_id: input_boolean.notify
- alias: "PowerOff started from harmony hub"
  trigger:
    platform: state
    entity_id: remote.family_room
  condition:
    condition: template
    value_template: {% raw %}'{{ trigger.to_state.attributes.current_activity == "PowerOff" }}'{% endraw %}
  action:
    service: input_boolean.turn_off
    entity_id: input_boolean.notify
````
