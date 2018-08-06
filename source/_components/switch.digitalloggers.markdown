---
layout: page
title: "Digital Loggers Switch"
description: "Instructions on how to integrate Digital Loggers DIN III relays into Home Assistant."
date: 2016-10-02 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: digitalloggers.png
ha_category: Switch
ha_release: 0.35
ha_iot_class: "Local Polling"
---


The `digitalloggers` switch platform allows you to control the state of your [Digital Loggers](http://www.digital-loggers.com/dinfaqs.html) switches. 

To use your digitalloggers switch in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: digitalloggers
    host: 192.168.1.43
```

Configuration variables:

- **host** (*Required*): The IP address or FQDN of your DIN III relay, eg. `192.168.1.32` or `myrelay.example.com`.
- **name** (*Optional*): The name to use when controlling this relay.  Default: `DINRelay`.
- **username** (*Optional*): Credentials for controlling this relay. Default: `admin`.
- **password** (*Optional*): Credentials for controlling this relay. Default: `admin`.
- **timeout** (*Optional*): Default timeout as set by the underlying python-dlipower library is `20` seconds.  Override it if you need to.  Valid range is 1 to 600.
- **cycletime** (*Optional*): This is the delay enforced by the library when you send multiple commands to the same device.  The default relay cycle time is `2` seconds. Override it if you need to.  Valid range is 1 to 600. A delay is a recommendation of Digital Loggers: 
>Many loads draw more power when they are initially switched on. Sequencing prevents circuit overloads when loads devices are attached to a single circuit. 


Your relays will be available in the form `switch.fantasticrelaydevice_individualrelayname`

**Note:** There is currently a limitation of the [dlipower library](https://github.com/dwighthubbard/python-dlipower) used by the `digitalloggers` component that communication is only available over port 80.
