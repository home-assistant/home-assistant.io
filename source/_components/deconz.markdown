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
ha_release: "0.59"
ha_iot_class: "Local Push"
---

[deCONZ](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/) by [Dresden Elektronik](https://www.dresden-elektronik.de) is a software that communicates with Conbee/Raspbee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

[deCONZ REST API](http://dresden-elektronik.github.io/deconz-rest-doc/) verified from v2.04.89.

The minimum amount of configuration for deCONZ is the IP ADDRESS. If you don't have the API key, the component will automatically try to generate an API key for deCONZ. If you've changed the username and password you can specify those when you configure deCONZ in configuration.yaml. If you prefer to use the one-click functionality similar to Philips Hue, you can go to Menu->Settings->Unlock Gateway in deCONZ and then use the deCONZ configurator in HASS GUI to create an API key. In all cases where you've generated the API key from HASS the API key will be stored in deconz.conf inside the home-assistant folder.

You must configure deCONZ by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
deconz:
  host: IP ADDRESS
```

#### {% linkable_title Supported Device types %}

- [Zigbee Lights](/components/light/deconz/)
- [Humidity Sensors](/components/sensor/deconz/)
- [Light Level Sensors](/components/sensor/deconz/)
- [OpenClose Detectors](/components/binary_sensor/deconz/)
- [Presence Detectors](/components/binary_sensor/deconz/)
- [Pressure Sensors](/components/sensor/deconz/)
- [Switches (Remote Controls)](/components/sensor/deconz/)
- [Temperature Sensors](/components/sensor/deconz/)

## {% linkable_title Configuration variables %}

- **host** (*Required*): The IP address to your deCONZ server.
- **api-key** (*Optional*): The API key to your deCONZ server.
- **port** (*Optional*): Configure port deCONZ web server is accessible from. Default is 80.
- **username** (*Optional*): If you need to generate an API key. Default is 'delight'.
- **password** (*Optional*): If you need to generate an API key. Default is 'delight'.

A full configuration could look like this:

```yaml
# Example configuration.yaml entry
deconz:
  host: 127.0.0.1
  api_key: 0123456789
  port: 80
```

## {% linkable_title Device services %}
Available services: `configure`.

#### {% linkable_title Service `deconz/configure` %}
Set attribute of device in Deconz using [Rest API](http://dresden-elektronik.github.io/deconz-rest-doc/rest/).

| Parameter | Description                                             |
|-----------|---------------------------------------------------------|
| `field`   | String representing a specific device in deCONZ.        |
| `data`    | Data is a json object with what data you want to alter. |

{ "field": "/lights/1", "data": {"name": "light2"} }

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

## {% linkable_title Examples %}

### {% linkable_title Step up and step down input number with wireless dimmer %}

```yaml
automation:
  - alias: 'Toggle lamp from dimmer'
    initial_state: 'on'
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: remote_control_1
        event: 1002
    action:
      service: light.toggle
      entity_id: light.lamp

  - alias: 'Increase brightness of lamp from dimmer'
    initial_state: 'on'
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: remote_control_1
        event: 2002
    action:
      - service: light.turn_on
        data_template:
          entity_id: light.lamp
          brightness: {% raw %}>
            {% set bri = states.light.lamp.attributes.brightness | int %}
            {{ [bri+30, 249] | min }}{% endraw %}

  - alias: Decrease brightness of lamp from dimmer
    initial_state: 'on'
    trigger:
      platform: event
      event_type: deconz_event
      event_data:
        id: remote_control_1
        event: 3002
    action:
      - service: light.turn_on
        data_template:
          entity_id: light.lamp
          brightness: {% raw %}>
            {% set bri = states.light.lamp.attributes.brightness | int %}
            {{ [bri-30, 0] | max }}{% endraw %}
```
