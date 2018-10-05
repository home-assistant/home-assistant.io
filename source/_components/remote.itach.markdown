---
layout: page
title: "iTach Remote"
description: "Instructions on how to integrate a Global Caché iTach IP2IR gateway into Home Assistant."
date: 2017-2-12 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: globalcache.png
ha_category: Remote
ha_iot_class: "Assumed State"
ha_release: 0.39
---


The `itach` remote platform allows you to control IR devices with a [Global Caché iTach Device](https://www.globalcache.com/products/itach/ip2irspecs) and GC-100 devices. The Global Cache IR API are similar across their product line. See API documentation links at the end of this page.

In order to utilize the digital input (binary sensor) and relay (switch) features of your Global Cache device you will need to use the [gc100 component](/components/gc100) and associated platforms.

To use your iTach remote in your installation, you will need to know the IR commands for your devices in Pronto hex format and add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
remote:
  - platform: itach
    name: Living Room
    host: itach023fdc
    devices:
      - name: TV
        connaddr: 2
        commands:
          - name: "ON"
            data: "0000 006D 0000 0022 00AC 00AC 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0015 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0689"
          - name: "OFF"
            data: "0000 006D 0000 0022 00AC 00AC 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0040 0015 0040 0015 0015 0015 0015 0015 0040 0015 0040 0015 0015 0015 0689"
```

Configuration variables:
- **name** (*Optional*): The iTach's name to display in the front end.
- **host** (*Required*): The iTach's IP address.
- **port** (*Optional*): The iTach's port. 4998 is default.
- **devices** array (*Required*): Devices controlled by the iTach.
  - **name** (*Required*): Name of the device.
  - **modaddr** (*Optional*): iTach module address for the IR emitter. 1 is default.
  - **connaddr** (*Required*): iTach connection location for the IR emitter. (Note connaddr is a misleading label. Do not put the connection address here. Technically the connection address is the combination of the module address plus the connection location).
  - **commands** array (*Required*): Commands available to send to the device.
    - **name** (*Required*): Command name.
    - **data** (*Required*): Hex command data.

An example to call the component from developer tools using the `remote.send_command` service: `{ "entity_id":"remote.tv", "command":"menu" }`

Note: Global Cache devices expect data in their own format of "sendir...". This component converts hex code to Global Cache IR form.

API Docs:
- [iTach](https://www.globalcache.com/files/docs/API-iTach.pdf)
- [GC-100](http://www.globalcache.com/files/docs/API-GC-100.pdf)
