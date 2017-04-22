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

The `tradfri` component supports for the IKEA Trådfri (Tradfri) gateway. The gateway can control lights connected to it.

For this to work, you need to install a modified lib-coap library:

```bash
$ sudo apt-get install libtool
$ sudo apt-get install autoconf

$ git clone --depth 1 --recursive -b dtls https://github.com/home-assistant/libcoap.git
$ cd libcoap
$ ./autogen.sh
$ ./configure --disable-documentation --disable-shared --without-debug CFLAGS="-D COAP_DEBUG_FD=stderr"
$ make
$ make install
```

To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tradfri:
  host: IP_ADDRESS
  api_key: API_KEY
```

Configuration variables:

 - **host** (*Required*): The IP address or hostname of your Trådfri gateway.
 - **api_key** (*Required*): Can be found on the back of the Trådfri gateway.
