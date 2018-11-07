---
layout: page
title: "IDTECK Prox Card Reader"
description: "How to use IDTECK proximity card readers."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: idteck.jpg 
ha_category: Sensor
featured: false
ha_release: 0.01
ha_iot_class: "Local Push"
---

[IDTECK](http://www.idteck.com) makes ID systems used to control access and identify users.  This component works with [Proximity Readers](http://www.idteck.com/en/products/proximity-reader-__-card-%26-tag-__125khz) (RFID card readers). The device is connected to Home Assistant through a serial to ethernet converter (NPort).

A `keycard` event is dispatched whenever a card or key sequence has been entered.  The event contains 'card' - the card/key sequence, and the 'entity_id' of the card reader.  Checking 'card' against known card numbers can be used as the basis of an entry control system.

## {% linkable_title Configuration %}

``` yaml
# Example configuration.yaml entry
sensor:
  - platform: idteck_prox
    host: HOST_NAME
    port: 4001
  - platform: idteck_prox
    host: ANOTHER_HOST_NAME
    port: 4001
```

{% configuration %}
host:
  description: The host name or IP address of the ethernet to serial adapter that is connected to the proximity reader.  It is assumed that the adapter has been preconfigured.
  required: true
  type: string
port:
  description: The port of the ethernet to serial adapter
  required: true
  type: port
{% endconfiguration %}
