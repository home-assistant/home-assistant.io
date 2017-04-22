---
layout: page
title: "IKEA Trådfri (Tradfri)"
description: "Access and control your ZigBee-based IKEA Trådfri (Tradfri) devices."
date: 2017-04-12 22.04
sidebar: true
featured: true
comments: false
sharing: true
footer: true
logo: ikea.svg
ha_category: Hub
ha_iot_class: "Local Polling"
ha_release: 0.43
---

Support for the IKEA Trådfri (Tradfri) gateway. The gateway can control lights connected to it.

NB: for this to work, you need to install a modified lib-coap library:

```bash
apt-get install libtool

git clone --depth 1 --recursive -b dtls https://github.com/home-assistant/libcoap.git
cd libcoap
./autogen.sh
./configure --disable-documentation --disable-shared --without-debug CFLAGS="-D COAP_DEBUG_FD=stderr"
make
make install
```

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tradfri:
  host: 192.168.0.129
  api_key: <on back of gateway>
```
