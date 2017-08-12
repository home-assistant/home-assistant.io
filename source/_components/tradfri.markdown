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

The `tradfri` component supports for the IKEA Trådfri (Tradfri) gateway. The gateway can control lights connected to it and Home Assistant will automatically discover its presence on your network. 

For this to work, you need to install a modified lib-coap library.

<p class='note'>
If you are using [Hass.io](/hassio/) then just move forward to the configuration as all requirements are already fullfilled.
</p>

Linux:

```bash
$ sudo apt-get install libtool
$ sudo apt-get install autoconf

$ git clone --depth 1 --recursive -b dtls https://github.com/home-assistant/libcoap.git
$ cd libcoap
$ ./autogen.sh
$ ./configure --disable-documentation --disable-shared --without-debug CFLAGS="-D COAP_DEBUG_FD=stderr"
$ make
$ sudo make install
```

macOS:

```bash
$ brew install libtool
$ brew install autoconf
$ brew install automake
$ git clone --depth 1 --recursive -b dtls https://github.com/home-assistant/libcoap.git
$ cd libcoap
$ ./autogen.sh
$ ./configure --disable-documentation --disable-shared --without-debug CFLAGS="-D COAP_DEBUG_FD=stderr"
$ make
$ make install
```
You will be prompted to configure the gateway through the Home Assistant interface, Enter the security key when prompted and click configure

<p class='note'>
If you see an "Unable to connect" message, restart the gateway and try again.
</p>

The gateway can also be manually configured by adding the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
tradfri:
  host: IP_ADDRESS
  api_key: API_KEY
```

Configuration variables:

 - **host** (*Required*): The IP address or hostname of your Trådfri gateway.
 - **api_key** (*Required*): Can be found listed as Security Key on the back of the Trådfri gateway.
 - **allow_tradfri_groups** (*Optional*): (true/false) Enable this to stop Home Assistant from importing the groups defined on the Tradfri bridge.
