---
layout: page
title: "FRITZ!Box"
description: "Instructions how to integrate a phone call monitor for AVM FRITZ!Box routers into Home Assistant."
date: 2017-03-07 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: System Monitor
ha_release: 0.27
ha_iot_class: "Local Polling"
---


The `fritzbox_callmonitor` sensor monitors the call monitor exposed by [AVM Fritz!Box](http://avm.de/produkte/fritzbox/) routers
on TCP port 1012. It will assume the values `idle`, `ringing`, `dialing`, or `talking` with the phone numbers involved contained in the state attributes.
It can also access the internal phone book of the router to look up the names corresponding to the phone numbers and store them in the state attributes.

To activate the call monitor on your Fritz!Box, dial #96\*5\* from any phone connected to it.

To use the Fritz!Box call monitor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fritzbox_callmonitor
```

Configuration variables:

- **host** (*Optional*): The IP address of your router, eg. 192.168.1.1. It is optional since every fritzbox is also reachable by using the IP address 169.254.1.1.
- **port** (*Optional*): The TCP port of the call monitor. There is usually no reason to change this.
- **username** (*Optional*): Fritz!Box user's user name. This is required to use the phone book lookup feature. The user needs to have the "voice message, fax message, Fritz!App Fon and call list" permission.
- **password** (*Optional*): Fritz!Box user's user password. This is required to use the phone book lookup feature.
- **phonebook** (*Optional*): Numerical ID identifying the phonebook to be used. If there is just one phonebook, this is usually 0.
- **prefixes** (*Optional*): In case of a local call, the phone number seen by the router might differ from the one stored in the phone book by an area code, similarly for the international prefix. To remedy this, a list of prefixes, that can be appended to the phone number in case it is not found in the phone book, can be given.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this lock.

### {% linkable_title Full configuration %}

The example below shows a full configuration for a call monitor with phone book support.

```yaml
# Example configuration.yml entry
sensor:
  - platform: fritzbox_callmonitor
    name: Phone
    username: my_username
    password: my_password
    phonebook: 0
    prefixes:
      - '+49'
      - '+4989'
      - '089'
```
