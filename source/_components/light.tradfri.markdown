---
layout: page
title: "Tradfri (Trådfri) Gateway"
description: "Access and control your ZigBee-based IKEA Tradfri (Trådfri) Lights."
date: 2017-04-12 22.04
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
ha_release: 0.43
---

Support for the IKEA Tradfri (Trådfri) gateway. The gateway can control lights connected to it.

NB: for this to work, you need to install the lib-coap library:
```
$ apt-get install libtool

$ git clone --recursive https://github.com/obgm/libcoap.git
$ cd libcoap
$ git checkout dtls
$ git submodule update --init --recursive
$ ./autogen.sh
$ ./configure --disable-documentation --disable-shared
$ make
$ sudo make install
```

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: tradfri
    host: 192.168.0.129
    api_key: <on back of gateway>
```
