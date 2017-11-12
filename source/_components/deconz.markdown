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
ha_iot_class: "Local Polling"
---

deCONZ by Dresden Elektronik is a software that communicates with Conbee/Raspbee Zigbee gateways and exposes Zigbee devices that are connected to the gateway.

deCONZ REST API verified from v2.04.86.

The minimum amount of configuration for deCONZ is the IP ADDRESS, if you don't have the API key. You can then generate an API key through the deCONZ service generate_api_key.

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

## {% linkable_title Device services %}
Available services: `generate_api_key`.

#### {% linkable_title Service `deconz/generate_api_key` %}
Generate API key needed by component to communicate with deCONZ. Key will be stored in config file deconz.conf.

| Service data attribute    | Optional | Description                               |
|---------------------------|----------|-------------------------------------------|
| `username`                |      yes | Username to deCONZ. Default is `delight`. |
| `password`                |      yes | Password to deCONZ. Default is `delight`. |
