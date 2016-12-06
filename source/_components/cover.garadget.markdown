---
layout: page
title: "Garadget Cover"
description: "Instructions how to integrate Garadget covers within Home Assistant."
date: 2016-10-24 14:25
sidebar: true
comments: false
sharing: true
footer: true
logo: garadget_logo.jpg
ha_category: Cover
ha_release: 0.32
---


The `garadget` cover platform lets you control [Garadget](http://www.garadget.com/) garage door futurizers through Home Assistant.

To enable Garadget Covers in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  platform: garadget
  covers:
      190028001947343412342341:
        username:  UseYourLogin@garadget.com
        password:  abc123
        name:  Left Garage Door
      4c003f001151353432134214:
        access_token: df4cc785ff818f2b01396c44142342fccdef
```

Configuration variables:

- **covers** array (*Required*): List of your doors.
  - **device**  (*Required*): This is the device id from your Garadget portal.
  - Either:
    - **username** (*Required*): Your Garadget account username.
    - **password** (*Required*): Your Garadget account password.
  - Or: 
    - **access_token**   (*Required*): A generated access_token from your garadget account
  - **name** (*Optional*): Name to use in the Frontend, will use name configured in Garadget otherwise.


If provided, the **access_token** will be used, otherwise the **username** and **password** will be used to automatically generate an access token at start time.


**Example with more detail:**
<p class='img'>
  <img src='{{site_root}}/images/components/garadget/cover_garadget_details.png' />
</p>

```yaml
# Related configuration.yaml entry
cover:
  platform: garadget
  covers:
    190028001947343412342341:
      access_token: !secret garadget_access_token
      name:  Garage door

sensor:
  platform: template
  sensors:
    garage_door_status:
      friendly_name: 'State of the door'
      value_template: {% raw %}'{{ states.cover.garage_door.state }}'{% endraw %}
    garage_door_time_in_state:
      friendly_name: 'Since'
      value_template: {% raw %}'{{ states.cover.garage_door.attributes["time in state"] }}'{% endraw %}
    garage_door_wifi_signal_strength:
      friendly_name: 'WiFi strength'
      value_template: {% raw %}'{{ states.cover.garage_door.attributes["wifi signal strength (dB)"] }}'{% endraw %}
      unit_of_measurement: 'dB'

group:
  garage_door:
    name: Garage door
    entities:
      - cover.garage_door
      - sensor.garage_door_status
      - sensor.garage_door_time_in_state
      - sensor.garage_door_wifi_signal_strength

customize:
  sensor.garage_door_time_in_state:
    icon: mdi:timer-sand
  sensor.garage_door_wifi_signal_strength:
    icon: mdi:wifi
```

Some of the Garadget sensors can create a lot of clutter in the logbook.  Use this section of code in your `configuration.yaml` to exclude those entries.

```yaml
logbook:
  exclude:
    entities:
      - sensor.garage_door_time_in_state
      - sensor.garage_door_wifi_signal_strength
```
