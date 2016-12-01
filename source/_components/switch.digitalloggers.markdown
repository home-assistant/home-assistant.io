---
layout: page
title: "Digital Loggers Switch"
description: "Instructions how to integrate Digital Loggers DIN III relays into Home Assistant."
date: 2016-10-02 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: digitalloggers.png
ha_category: Switch
---


The `digitalloggers` switch platform allows you to control the state of your [Digital Loggers](http://www.digital-loggers.com/dinfaqs.html) switches. 

To use your digitalloggers switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: digitalloggers
    host: 192.168.1.43
    password: SuperSecret123!!
    name: FantasticRelayDevice

```

Configuration variables:

- **host** (*Required*): The IP address of your DIN III relay, eg. `192.168.1.32`.
- **name** (*Optional*): The name to use when controlling this relay.  Default: `DINRelay` 
- **username** (*Optional*): Credentials for controlling this relay. Default: `admin`
- **password** (*Optional*): Credentials for controlling this relay. Default: `admin`
- **timeout** (*Optional*): Default timeout as set by the underlying python-dlipower library is `20` seconds.  Override it if you need to.  Valid range is 1 to 600.
- **cycletime** (*Optional*): Minimum default relay cycle time is `3` seconds. Override it if you need to.  Valid range is 1 to 600.


Your relays will be available in the form `switch.fantasticrelaydevice.relaynumberXname`
