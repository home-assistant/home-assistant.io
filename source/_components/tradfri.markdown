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

**CAUTION:**
This component does **not** work on Windows, as the modified lib-coap doesn't exists for Windows.

**NOTE:** If you are using [Hass.io](/hassio/) then just move forward to the configuration as all requirements are already fulfilled.

**NOTE:** Newer versions of tradfri has [async support](https://github.com/ggravlingen/pytradfri/pull/34), which as of [version 2.2.2](https://github.com/ggravlingen/pytradfri/releases/tag/2.2.2) requires installing [tinydtls and aiocoap](https://github.com/ggravlingen/pytradfri#1-installation) from source. Additionally aiocoap itself is in turn [dependent on python >= 3.4.4](https://github.com/chrysn/aiocoap#dependencies)

Linux:

Synchronous [version](https://github.com/ggravlingen/pytradfri/blob/master/script/install-coap-client.sh):
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
Asynchrounous [version](https://github.com/ggravlingen/pytradfri/blob/master/script/install-aiocoap.sh):
```bash
# dependencies
python3 -m pip install --upgrade pip setuptools cython

# tinydtls
git clone --depth 1 https://git.fslab.de/jkonra2m/tinydtls.git
cd tinydtls
autoreconf
./configure --with-ecc --without-debug
cd cython
python3 setup.py install

# aiocoap
cd ../..
git clone https://github.com/chrysn/aiocoap
cd aiocoap
git reset --hard 3286f48f0b949901c8b5c04c0719dc54ab63d431
python3 -m pip install .
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
If you see an "Unable to connect" message, restart the gateway and try again. Don't forget to assign a permanent IP to your Trådfri gateway.
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
 - **allow_tradfri_groups** (*Optional*): (true/false) Enable this to stop Home Assistant from importing the groups defined on the Trådfri bridge.
