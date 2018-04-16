---
layout: page
title: "Alfawise Humidifier"
description: "Control your humidifier."
date: 2018-04-16 01.28
sidebar: true
comments: false
sharing: true
footer: true
logo: alfawise.png
ha_category: Fan
ha_iot_class: "Local Push"
ha_release: "0.68"
---

The `alfawise` fan allows you to control [Alfawise Humidifier](https://www.alfawise.com/copy-of-kitchen-shrter-1) 
connected device.

To use your Alfawise humidifier in your installation, add the following to 
your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

fan:
  - platform: alfawise
    devices:
      192.168.1.101:
        name: Living Room
        mac: AABBCCDDEEFF
      192.168.1.102:
        name: Bathroom
        mac: GGHHIIJJKKLL
```

Configuration variables:

- **ip** (*Required*): IP(s) of your device
- **name** (*Required*): A friendly name for the device.
- **mac** (*Required*): The mac addres of your device (you can find it in 
your router interface or in the Alfawise smartphone app).

<p class='note warning'>
Note : the python library that handel the device is still in beta development, and have only been tested with the SJ-07A model..
</p>
