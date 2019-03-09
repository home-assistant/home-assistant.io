---
layout: page
title: "IDTECK Prox Card Reader"
description: "How to use IDTECK proximity card readers."
date: 2018-11-14 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: idteck.jpg 
ha_category: Other
featured: false
ha_release: 0.85
ha_iot_class: "Local Push"
---

[IDTECK](http://www.idteck.com) makes ID systems used to control access and identify users.  This component works with [Proximity Readers](http://www.idteck.com/en/products/proximity-reader-__-card-%26-tag-__125khz) (RFID card readers). The device is connected to Home Assistant through a serial to ethernet converter (NPort).

An `idteck_prox_keycard` event is fired whenever a card or key sequence has been entered.  The event contains 'card' - the card/key sequence, and the 'name' of the card reader.  Checking 'card' against known card numbers can be used as the basis of an entry control system, or as part of a check-in/check-out system.

## {% linkable_title Configuration %}

``` yaml
# Example configuration.yaml entry
idteck_prox:
  - host: host1.domain.com
    port: 4001
    name: "Lower Door"
  - host: host2.domain.com
    port: 4001
    name: "Upper Door"
```

{% configuration %}
host:
  description: The hostname or IP address of the ethernet to serial adapter that is connected to the proximity reader.  It is assumed that the adapter has been preconfigured.
  required: true
  type: string
port:
  description: The port of the ethernet to serial adapter
  required: true
  type: port
name:
  description: The name of the prox card reader
  required: true
  type: string
{% endconfiguration %}
