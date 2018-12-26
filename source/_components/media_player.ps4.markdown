---
layout: page
title: "Sony Playstation 4"
description: "Instructions on how to integrate a Sony Playstation 4 into Home Assistant."
date: 2018-12-16 12:02
sidebar: true
comments: false
sharing: true
footer: true
logo: ps4.png
ha_category: Media Player
ha_release: 0.86
ha_iot_class: "Local Polling"
---

The `ps4` component allows you to control a
[Sony Playstation 4 console](httpswww.playstation.com/en-us/explore/ps4/).

Requirements:
- Android or iOS device
- [PS4 Second Screen App](https://play.google.com/store/apps/details?id=com.playstation.mobile2ndscreen&hl=en_US) 

After adding PS4 component to configuration.yaml, a configuration entity will be added to the frontend. This will fetch the credentials needed to allow Home Assistant to control the PS4.
You will need to use the Second Screen app to do this.
After credentials are fetched, a second configuration entity will be shown which allows you to pair Home Assistant to your PS4. 

## {% linkable_title Granting Port Access %}

The PS4 component requires the use of priveleged ports to work correctly. Depending on your OS of your Home Assistant instance you may need to manually allow usage of priveleged ports.
Home Assistant installed on a Debian-type OS for example, such as Hassbian, Rassbian, and Armbian may require configuration.
There are varying methods to perform this, dependent on your OS running Home Assistant.

- Note: Hass.io on HassOS does not require additional configuration.

- Example for Debian:
`sudo setcap 'cap_net_bind_service=+ep' /usr/bin/python3.5`
Replace "/usr/bin/python3.5" with your path to Python that is running Home Assistant.


## {% linkable_title Configuration %}

Add the following to your configuration.yaml file to add the PS4 component.

```yaml
# Example configuration.yaml entry
media_player:
  platform: ps4
    host: 192.168.0.11
```
{% configuration %}
host: 
  description: IP of the PS4 eg. `192.168.0.11`.
  required: true
  type: string
name:
  description: Name for PS4 entity.
  required: false
  type: string
  default: Playstation 4
{% endconfiguration %}
