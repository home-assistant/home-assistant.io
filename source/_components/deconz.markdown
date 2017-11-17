---
layout: page
title: "deCONZ"
description: "Instructions on how to setup Conbee/Raspbee devices with deCONZ from Dresden Elektronik within Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Hub
ha_release: "0.58"
ha_iot_class: "Local Push"
---

[deCONZ](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/) by [Dresden Elektronik](https://www.dresden-elektronik.de) is a software that communicates with Conbee/Raspbee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

[deCONZ REST API](http://dresden-elektronik.github.io/deconz-rest-doc/) verified from v2.04.86.

The minimum amount of configuration for deCONZ is the IP ADDRESS, if you don't have the API key. The component will automatically generate an API key for deCONZ. You can later find the API key in deconz.conf inside the home-assistant folder. If you've changed the username and password you can specify those when you configure deconz in configuration.yaml.

You must configure deCONZ by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
deconz:
  host: IP ADDRESS
```

#### {% linkable_title Supported Device types %}

- Zigbee lights
- Humidity sensors
- Light Level sensors
- OpenClose detectors
- Presence detectors
- Pressure sensors
- Switches (remote controls)
- Temperature sensors

## {% linkable_title Configuration variables %}

- **host** (*Required*): The IP address to your deCONZ server.
- **api-key** (*Optional*): The API key to your deCONZ server.
- **port** (*Optional*): Configure port deCONZ web server is accessible from. Default is 80.

A full configuration could look like this:

```yaml
# Example configuration.yaml entry
deconz:
  host: 127.0.0.1
  api_key: 0123456789
  port: 80
```

## {% linkable_title Remote control devices%}

Remote controls (ZHASwitch category) will be exposed as events named 'deconz_event' with a payload of 'id' and 'event'. Id will be the device name from deCONZ and Event will be the momentary state of the switch. An extra entity battery sensor will be created to show battery levels of switch.

Typical values for switches, the event codes are 4 numbers where the first and last number are of interest here.

| Switch code | Description             |
|-------------|-------------------------|
| 1XXX        | Button #1 up to #8      |
| XXX1        | Button hold             |
| XXX2        | Button short release    |
| XXX3        | Button long release     |

Where for example on a Philips Hue Dimmer, 2001 would be holding the dim up button.

## {% linkable_title Device services %}
Available services: `generate_api_key`.

#### {% linkable_title Service `deconz/generate_api_key` %}
Generate API key needed by component to communicate with deCONZ. The Key will be stored in a config file named deconz.conf.

| Service data attribute    | Optional | Description                               |
|---------------------------|----------|-------------------------------------------|
| `username`                |      yes | Username to deCONZ. Default is `delight`. |
| `password`                |      yes | Password to deCONZ. Default is `delight`. |

## {% linkable_title Examples %}

### {% linkable_title Step up and step down input number with wireless dimmer %}

```yaml
automation:
  - alias: step_up
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: tradfri_wireless_dimmer_
        event: 2002
    action:
      service: input_number.increment
      entity_id: input_number.slider1

  - alias: step_down
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: tradfri_wireless_dimmer_
        event: 3002
    action:
      service: input_number.decrement
      entity_id: input_number.slider1
```