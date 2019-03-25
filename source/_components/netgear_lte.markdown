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

The Netgear LTE integration for Home Assistant allows you to observe and control [Netgear LTE modems](https://www.netgear.com/home/products/mobile-broadband/lte-modems/default.aspx).

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)
- [Sensor](#sensor)

The integration provides:

* a notify service that will send an SMS
* a sensor with the number of unread SMS messages in the inbox
* a sensor with data usage

## {% linkable_title Configuration %}

To enable the integration, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
netgear_lte:
  - host: IP_ADDRESS
    password: SECRET
    notify:
      - name: sms
        recipient: "+15105550123"
    sensor:
      monitored_conditions:
        - usage
        - sms

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
notify:
  description: A list of notification services connected to this specific host.
  required: false
  type: list
  keys:
    recipient:
      description: The phone number of a default recipient or a list with multiple recipients.
      required: false
      type: string, list
    name:
      description: The name of the notification service.
      required: false
      default: notify
      type: string
sensor:
  description: Configuration options for sensors.
  required: false
  type: map
  keys:
    monitored_conditions:
      description: Sensor types to create.
      required: false
      default: usage
      type: list
      keys:
        sms:
          description: Number of unread SMS messages in the modem inbox.
        usage:
          description: Amount of data transferred.
{% endconfiguration %}

## {% linkable_title Notifications %}

The `netgear_lte` integration allows you to use a Netgear LTE modem for notifications from Home Assistant. The message will be sent as an SMS text message.

If you do not supply `notify` configuration, a default notification service with no default recipient is created.

## {% linkable_title Sensor %}

The `netgear_lte` integration allows you to monitor your Netgear LTE modem.

If you do not supply `sensor` configuration, a default set of sensors is created.
