---
title: IDTECK Proximity Reader
description: How to use IDTECK proximity card readers.
ha_category:
  - Other
ha_release: 0.85
ha_iot_class: Local Push
ha_domain: idteck_prox
ha_integration_type: integration
ha_quality_scale: legacy
---

[IDTECK](https://www.idteck.com/) makes ID systems used to control access and identify users.  This integration works with [Proximity Readers](https://www.idteck.com/en/products/rfid-reader-__-card-%26-tag-__idteck-credential-format-(idc)) (RFID card readers). The device is connected to Home Assistant through a serial to ethernet converter (NPort).

An `idteck_prox_keycard` event is fired whenever a card or key sequence has been entered.  The event contains 'card' - the card/key sequence, and the 'name' of the card reader.  Checking 'card' against known card numbers can be used as the basis of an entry control system, or as part of a check-in/check-out system.

## Configuration

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
  type: integer
name:
  description: The name of the prox card reader
  required: true
  type: string
{% endconfiguration %}
