---
layout: page
title: "HTTP Light"
description: "Instructions on how to setup the HTTP light component within Home Assistant."
date: 2018-7-07 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: httplight.png
ha_category: Light
ha_release: 0.73
ha_iot_class: "Local Polling"
---


The `httplight` platform lets you control HTTP lights from within Home Assistant.

To add HTTP Lights to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: httplight
    name: Light
    host: 10.1.1.1
    type: color
```

Configuration variables:

- **name** (*Required*): Name of the light.
- **host** (*Required*): The IP Address of the light.
- **type** (*Required*): The type of HTTP Light. Valid options are `color`, `dimmable` and `simple`.

## {% linkable_title Different Light Types %}

### {% linkable_title Color %}

If you have a HTTP Light that supports color use the color type.
The HTTP Light component uses hex values to communicate color. Your device should be configured to return a hex value when `http://IP_ADDRESS/color` is called. Your device should change it's color when it recieves `http://IP_ADDRESS/set/HEX_VALUE_HERE`.

Example configuration for adding a color light to Home Assistant:
```yaml
# Example configuration.yaml entry for HTTP Light with color.
light:
- platform: httplight
  name: Color Light
  host: IP_ADDRESS
  type: color
```
### {% linkable_title Dimmable %}

If you have a HTTP Light that supports brightness but not color use the dimmable type.
Your device should be configured to return a brightness value from 0-100 when `http://IP_ADDRESS/brightness` is called. Your device should change the lights brightness when it recieves `http://IP_ADDRESS/set/BRIGHTNESS_HERE`.

Example configuration for adding a dimmable light to Home Assistant:
```yaml
# Example configuration.yaml entry for HTTP Light that is dimmable.
light:
- platform: httplight
  name: Dimmable Light
  host: IP_ADDRESS
  type: color
```
### {% linkable_title Simple %}

If you have a HTTP Light that only supports `ON/OFF` commands, use the simple type.
Your device should be configured to return either `on` or `off` when `http://IP_ADDRESS/state` is called. Your device should turn on when it recieves `http://IP_ADDRESS/on`, and off when it recieves `http://IP_ADDRESS/off`

Example configuration for adding a simple light to Home Assistant:
```yaml
# Example configuration.yaml entry for HTTP Light that is dimmable.
light:
- platform: httplight
  name: Simple Light
  host: IP_ADDRESS
  type: simple
```
See an example of how to use the HTTP Light component with an ESP8266 here: [https://github.com/Priva28/HTTP-Light](https://github.com/Priva28/HTTP-Light/)
