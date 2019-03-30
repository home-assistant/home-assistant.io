---
layout: page
title: "Netgear LTE"
description: "Instructions on how to integrate your Netgear LTE modem within Home Assistant."
date: 2018-06-06 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: netgear.png
ha_release: 0.72
ha_category:
  - Network
  - Notifications
  - Sensor
ha_iot_class: Local Polling
redirect_from:
  - /components/notify.netgear_lte/
  - /components/sensor.netgear_lte/
---

The Netgear LTE integration for Home Assistant allows you to observe and control [Netgear LTE modems](https://www.netgear.com/home/products/mobile-broadband/lte-modems/default.aspx), currently only tested with LB2120.

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)
- [Sensor](#sensor)

The integration provides:

* a notify service that will send an SMS
* a sensor with the number of unread SMS messages in the inbox
* a sensor with data usage

## {% linkable_title Configuration %}

To enable the component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
netgear_lte:
  - host: IP_ADDRESS
    password: SECRET
```

{% configuration %}
host:
  description: The IP address of the modem web interface.
  required: true
  type: string
password:
  description: The password used for the modem web interface.
  required: true
  type: string
{% endconfiguration %}

## {% linkable_title Notifications %}

The `netgear_lte` platform allows you to use a Netgear LTE modem for notifications from Home Assistant. The message will be sent as an SMS text message.

```yaml
# Example configuration.yaml entry
notify:
  - platform: netgear_lte
    name: sms
    target: "+15105550123"
```

{% configuration %}
target:
  description: The phone number of a default recipient or a list with multiple recipients.
  required: true
  type: string, list
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created.
  required: false
  default: notify
  type: string
host:
  description: The modem to use. Not needed if you only have one.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Sensor %}

The `netgear_lte` sensor platform allows you to monitor your Netgear LTE modem.

To enable the sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: netgear_lte
    sensors:
      - sms
      - usage
```

{% configuration %}
sensors:
  description: Sensor types to create.
  required: true
  type: list
  keys:
    sms:
      description: Number of unread SMS messages in the modem inbox.
    usage:
      description: Amount of data transferred.
host:
  description: The modem to use. Not needed if you only have one.
  required: false
  type: string
{% endconfiguration %}
