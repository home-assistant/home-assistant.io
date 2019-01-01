---
layout: page
title: "Pencom"
description: "How to use Pencom Designs 8 channel relay boards."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: pencom.png
ha_category: Switch 
ha_release: 0.85
ha_iot_class: "Local Polling"
---

[Pencom Design](http://www.pencomdesign.com/) is a manufacturer of computer controlled relay, I/O and custom boards for commercial and industrial applications.  This interface to [Pencom's Relay Control Boards](https://www.pencomdesign.com/relay-boards/) is designed to work over an ethernet to serial adapter (NPort).  Each switch (relay) can be turned on/off, and the state of the relay can be read.

## {% linkable_title Configuration %}

The Pencom relays can be daisychained to allow for up to 8 boards.

``` yaml
# Example configuration.yaml entry
switch:
  - platform: pencom
    host: host.domain.com
    port: 4001
    boards: 2 
    relays:
      - name: "Irrigation"
        addr: 0 
      - name: "Upper Entry Door"
        addr: 1
      - name: "Fountain"
        addr: 0
        board: 2
```

{% configuration %}
host:
  description: The IP address of the ethernet to serial adapter.  It is assumed that the adapter has been preconfigured.
  required: true
  type: string
port:
  description: The port of the ethernet to serial adapter.
  required: true
  type: port (positive integer between 1-65535)
boards:
  description: Number of boards daisychained together (default is 1).
  required: false
  type: int between 1 and 8
relays:
  description: List of relays. 
  required: true
  type: list 
  keys:
    name:
      description: The name of the switch (component).
      required: true
      type: string
    addr:
      description: The relay on the board starting with 0.
      required: true
      type: int
    board:
      description: The board number (defaults to 1).
      required: false
      type: int between 1 and 8
{% endconfiguration %}
