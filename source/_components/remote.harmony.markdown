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
ha_release: "0.34"
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
    host: 10.168.1.13
```

Configuration variables:

- **name** (*Required*): The hub's name to display in the front end.
- **host** (*Required*): The Harmony device's IP address.
- **port** (*Optional*): The Harmony device's port. 5222 is default.
- **activity** (*Optional*): Activity to use when turnon service is called without any data.
- **scan_interval** (*Optional*): Amount in seconds in between polling for device's current activity. Defaults to 30 seconds.

Configuration file:

Upon startup one file will be written to your Home Assistant configuration directory per device in the following format: `harmony_REMOTENAME.conf`. The file will contain:

- List of all programmed activity names and ID numbers
- List of all programmed device names and ID numbers
- List of all available commands per programmed device

Supported services:

- **Turn Off**: Turn off all devices that were switched on from the start of the current activity
- **Turn On**: Start an activity, will start the default activity from configuration.yaml if no activity is specified.  The specified activity can either be the activity name or the activity ID from the configuration file written to your HASS config directory.  The service will respond faster if the activity ID is passed instead of the name
- **Send Command**: Send a command to one device, device ID and available commands are written to the configuration file at startup
- **Sync**: Synchronizes the Harmony device with the Harmony web service if any changes are made from the web portal or app


### {% linkable_title Examples %}

A template switch can be used to display and control the state of an activity in the frontend.

```yaml
switch:
  - platform: template
    switches:
      tv:
        value_template: "{% raw %}{% if is_state('remote.family_room', 'on') %}on{% else %}off{% endif %}{% endraw %}"
        turn_on:
          service: remote.turn_on
          entity_id: remote.family_room
        turn_off:
          service: remote.turn_off
          entity_id: remote.family_room
```

Template sensors can be utilized to display current activity in the frontend.

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


The example below shows how to control an `input_boolean` switch using the Harmony remote's current activity.  The switch will turn on when the remote's state changes and the Kodi activity is started and off when the remote's state changes and the current activity is PowerOff.

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

The automation example below shows how to send a command via the harmony remote using the `send_command` service to send the 'Pause' command to the hub, which is already defined as an IR code for each device to be used via the Harmony app. It is checking for the activity name as exposed through the sensor in the harmony remote component using Jinga if statements to set the device_id, sending the correct Pause command for the given activity. This requires checking your activity list and device_id from the `harmony_REMOTENAME.conf` file created when you start the component. In this example, the harmony hub is named bedroom.
```yaml
automation:
  - alias: Harmony Pause contextual for activity
    trigger:
    # trigger happens to be from a flic button - could be any valid event
      platform: event
      event_type: flic_click
      event_data:
        button_name: flic_80e4da70bbb1
        click_type: double
    action:
      service: remote.send_command
      data_template:
      # using a data template to have if brances for relavant device
        # Always the same entity_id - the harmony hub
        entity_id: remote.bedroom 
        # Always the same command - the Pause key
        command: Pause
        # select device based upon the activity being undertaken.
        device: >
          # when in WATCH TV activity, the pause key relates to a TiVo, which is device 22987101 
          {% raw %}{% if is_state("sensor.bedroom", "WATCH TV") %}{% raw %}
            22987101
          # when in WATCH APPLE TV activity, the pause key relates to an Apple TV, which is device 23002316
          {% raw %}{% elif is_state("sensor.bedroom", "WATCH APPLE TV") %}{% endraw %}
            23002316
          {% raw %}{% elif is_state("sensor.bedroom", "PLEX") %}{% endraw %}
            23048786
          {% raw %}{% elif is_state("sensor.bedroom", "WATCH BLU RAY") %}{% endraw %}
            23043122
          {% raw %}{% endif %}{% endraw %}

````
