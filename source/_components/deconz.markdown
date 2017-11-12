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

deCONZ by Dresden Elektronik is a software that communicates with Conbee/Raspbee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

deCONZ REST API verified from v2.04.86.

The minimum amount of configuration for deCONZ is the IP ADDRESS, if you don't have the API key. You can then generate an API key through the deCONZ service generate_api_key[generate_api_key](#deconz/generate_api_key).

You must configure deCONZ by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
deconz:
  host: IP ADDRESS
```

Configuration variables:

## {% linkable_title Configuration variables %}

- **host** (*Required*): The IP address to your deCONZ server.
- **api-key** (*Optional*): The username to your Axis device. Default is 'root'.
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

Remote controls (ZHASwitch category) will be exposed as events named 'deconz_event' with a payload of 'id' and 'event'. Id will be the device name from deCONZ and Event will be the momentary state of the switch.

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
