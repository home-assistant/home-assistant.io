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


The `itach` remote platform allows you to control IR devices with a [Global Caché iTach Device](https://www.globalcache.com/products/itach/ip2irspecs)

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
- **name** (*Required*): The iTach's name to display in the front end.
- **host** (*Required*): The iTach's IP address.
- **port** (*Optional*): The iTach's port. 4998 is default.
- **devices** array (*Required*): Devices controlled by the iTach.
  - **name** (*Required*): Name of the device.
  - **modaddr** (*Optional*): iTach module address for the IR emitter. 1 is default.
  - **connaddr** (*Required*): iTach connection address for the IR emitter.
  - **commands** array (*Required*): Commands available to send to the device.
    - **name** (*Required*): Command name.
    - **data** (*Required*): Hex command data.
