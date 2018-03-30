---
layout: page
title: "deCONZ"
description: "Instructions on how to setup Conbee/Raspbee devices with deCONZ from Dresden Elektronik within Home Assistant."
date: 2017-11-12 16:30
sidebar: true
comments: false
sharing: true
footer: true
logo: deconz.jpeg
ha_category: Hub
ha_release: "0.61"
ha_iot_class: "Local Push"
---

[deCONZ](https://www.dresden-elektronik.de/funktechnik/products/software/pc/deconz/) by [Dresden Elektronik](https://www.dresden-elektronik.de) is a software that communicates with Conbee/Raspbee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

[deCONZ REST API](http://dresden-elektronik.github.io/deconz-rest-doc/).

### {% linkable_title Supported device types %}

- [Zigbee Lights](/components/light.deconz/)
- [Consumption Sensors](/components/sensor.deconz/)
- [Humidity Sensors](/components/sensor.deconz/)
- [Light Level Sensors](/components/sensor.deconz/)
- [OpenClose Detectors](/components/binary_sensor.deconz/)
- [Power Sensors](/components/sensor.deconz/)
- [Presence Detectors](/components/binary_sensor.deconz/)
- [Pressure Sensors](/components/sensor.deconz/)
- [Switches (Remote Controls)](/components/sensor.deconz/)
- [Temperature Sensors](/components/sensor.deconz/)

## {% linkable_title Configuration %}

Home Assistant will automatically discover deCONZ presence on your network, if `discovery:` is present in your `configuration.yaml` file.

If you don't have the API key, you can generate an API key for deCONZ by using the one-click functionality similar to Philips Hue. Go to **Menu** -> **Settings** -> **Unlock Gateway** in deCONZ and then use the deCONZ configurator in Home Assistant frontend to create an API key. When you've generated the API key from Home Assistant, the API key will be stored in `deconz.conf` inside the `.homeassistant` folder.

You can add the following to your configuration.yaml file if you are not using the `discovery:` component:

```yaml
# Example configuration.yaml entry
deconz:
  host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP address of your deCONZ web server.
  required: false
  type: string
api_key:
  description: The API key to access your deCONZ web server.
  required: false
  type: string
port:
  description: Configure port deCONZ web server is accessible from.
  required: false
  default: 80
  type: int
{% endconfiguration %}

A full configuration could look like this:

```yaml
# Example configuration.yaml entry
deconz:
  host: 127.0.0.1
  api_key: 0123456789
  port: 80
```

## {% linkable_title Debugging component %}

If you have problems with deCONZ or the component you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    pydeconz: debug
    homeassistant.components.deconz: debug
```

## {% linkable_title Device services %}

Available services: `configure`.

#### {% linkable_title Service `deconz.configure` %}

Set attribute of device in Deconz using [Rest API](http://dresden-elektronik.github.io/deconz-rest-doc/rest/).

| Service data attribute | Optional | Description |
|-----------|----------|-------------|
| `field` | No | String representing a specific device in deCONZ. |
| `entity` | No | String representing a specific HASS entity of a device in deCONZ. |
| `data` | No | Data is a JSON object with what data you want to alter. |

Field and entity are exclusive, i.e you can only use one in a request.

{ "field": "/lights/1", "data": {"name": "light2"} }

{ "entity": "light.light1", "data": {"name": "light2"} }

{ "field": "/config", "data": {"permitjoin": 60} }

## {% linkable_title Remote control devices %}

Remote controls (ZHASwitch category) will be not be exposed as a regular entity, but as events named 'deconz_event' with a payload of 'id' and 'event'. Id will be the device name from deCONZ and Event will be the momentary state of the switch. However, a sensor entity will be created that shows the battery level of the switch as reported by deCONZ, named sensor.device_name_battery_level.

Typical values for switches, the event codes are 4 numbers where the first and last number are of interest here.

| Switch code | Description |
|-------------|-------------|
| 1XXX | Button #1 up to #8 |
| XXX1 | Button hold |
| XXX2 | Button short release |
| XXX3 | Button long release |

Where for example on a Philips Hue Dimmer, 2001 would be holding the dim up button.

For the IKEA Tradfri remote, 1 is the middle button, 2 is up, 3 is down, 4 is left, and 5 is right.

## {% linkable_title Examples %}

### {% linkable_title Step up and step down input number with wireless dimmer %}

{% raw %}
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
          brightness: >
            {% set bri = states.light.lamp.attributes.brightness | int %}
            {{ [bri+30, 249] | min }}

  - alias: 'Decrease brightness of lamp from dimmer'
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
          brightness: >
            {% set bri = states.light.lamp.attributes.brightness | int %}
            {{ [bri-30, 0] | max }}
```
{% endraw %}
